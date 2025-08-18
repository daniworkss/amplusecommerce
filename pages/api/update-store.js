import { updateDoc, doc, getDoc } from "firebase/firestore";
import { arrayUnion } from "firebase/firestore";
import { Firebase_db } from "@/config/firebase";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { cart, total, orderId, trackingNumber, formdata } = req.body;

    const storeRef = doc(Firebase_db, "storeData", "rslMgWpcSQ9PWgSF2K3u");
    const storeSnap = await getDoc(storeRef);

    if (!storeSnap.exists()) {
      return res.status(404).json({ error: "Store data not found" });
    }

    const { totalRevenue = 0, totalOrders = 0 } = storeSnap.data();

    const orderData = {
      cart,
      total,
      orderId,
      trackingNumber,
      username: `${formdata.firstName} ${formdata.lastName}`,
      email:  formdata.email,
      address: `${formdata.address} ${formdata.city} ${formdata.postalCode} ${formdata.state}`, 
      phone: formdata.phone,
      createdAt: new Date().toISOString()
    };

    await updateDoc(storeRef, {
      totalOrders: totalOrders + 1,
      totalRevenue: Number(totalRevenue) + Number(total),
      orders: arrayUnion(orderData),
    });

    return res.status(200).json({ message: "Store updated successfully" });
  } catch (error) {
    console.error(error.message, "this is an error");
    return res.status(500).json({ error: "Failed to update store" });
  }
}
