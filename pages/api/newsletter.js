import { collection, addDoc } from "firebase/firestore";
import { Firebase_db } from "@/config/firebase";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(400).json({ error: "invalid request method" });
  }

  const { email } = req.body;
  console.log(req.body, 'this is the request body') 

  try {
    await addDoc(collection(Firebase_db, "newslettersubscription"), {
      email: email,
      createdAt: new Date(),
    });

    return res.status(201).json({
      message: "user successfully added to mailing list",
    });
  } catch (error) {
    console.log("something went wrong", error.message);
    return res.status(500).json({ error: error.message });
  }
}
