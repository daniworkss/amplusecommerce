import { doc, deleteDoc } from "firebase/firestore"
import { Firebase_db } from "@/config/firebase"
export default async function handler(req,res){

    const {productId} = req.body
    try {
        const productref = doc(Firebase_db,'products',productId)
        await deleteDoc(productref)
        return res.status(200).json({message:'Product deleted successfully'})

    } catch (error) {
        console.log(error.message)
        return res.status(500).json({message:`Error somethingwent wrong while deleting. ${error.message}`})
    }
}