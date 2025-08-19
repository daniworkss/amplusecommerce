import { doc, getDoc } from "firebase/firestore";
import { Firebase_db } from "@/config/firebase";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: `Method ${req.method} not allowed` });
  }

  const { id } = req.body;

  if (!id) {
    return res.status(400).json({ error: "Product ID is required" });
  }

  try {
    const docRef = doc(Firebase_db, "products", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const product = {
        id: docSnap.id,
        ...docSnap.data(),
      };
      res.status(200).json({ product });
    } else {
      res.status(404).json({ error: "Product not found" });
    }
  } catch (error) {
    console.log(error.message, "error fetching product");
    res.status(500).json({ error: "Error fetching product" });
  }
}
