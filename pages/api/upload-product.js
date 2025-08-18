import { IncomingForm } from "formidable";
import { Firebase_storage, Firebase_db } from "@/config/firebase";
import { ref, uploadBytes } from "firebase/storage";
import { addDoc, collection } from "firebase/firestore";
import fs from "fs";

export const config = {
  api: {
    bodyParser: false, 
  },
};

export default function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: `Method ${req.method} not allowed` });
  }

  return new Promise((resolve) => {
    const form = new IncomingForm({ keepExtensions: true });

    form.parse(req, async (err, fields, files) => {
      if (err) {
        res.status(500).json({ error: "Error parsing form data" });
        return resolve();
      }

      try {
        const {
          name,
          description, // This is now the specifications array
          price,
          prevprice,
          stock,
          sizeInventory, // Size-based inventory (used when single color or no colors)
          colorInventory, // Color-based inventory (used when multiple colors selected)
          category, // Should be "outfits"
          colors,
          sizes,
        } = fields;
        console.log("Received files:", files);

        // Normalize image files array
        const imageFilesArray = Array.isArray(files.images)
        ? files.images
        : files.images
        ? [files.images]
        : [];

        if (imageFilesArray.length === 0) {
          res.status(400).json({ error: "No image files uploaded" });
          return resolve();
        }

        // Upload images in parallel
        const uploadPromises = imageFilesArray.map(async (imageFile) => {
            if (!imageFile.filepath) throw new Error("Invalid image file");
  
            const fileExtension = imageFile.originalFilename
              ? imageFile.originalFilename.split(".").pop()
              : "jpg";
  
            const fileName = `outfitss/${Date.now()}-${Math.random()
              .toString(36)
              .slice(2)}.${fileExtension}`;
  
            const storageRef = ref(Firebase_storage, fileName);
  
            // Read file as a buffer (streaming would be possible but firebase SDK prefers buffers for `uploadBytes`)
            const imageBuffer = await fs.promises.readFile(imageFile.filepath);
  
            const metadata = {
              contentType: imageFile.mimetype || "image/jpeg",
              cacheControl: "public, max-age=31536000",
            };
  
            await uploadBytes(storageRef, imageBuffer, metadata);
            const { getDownloadURL } = await import("firebase/storage");
            return await getDownloadURL(storageRef);
          });
  

        const imageUrls = await Promise.all(uploadPromises);

        // Parse JSON fields safely
        const parsedColors = colors ? JSON.parse(colors.toString()) : [];
        const parsedSizes = sizes ? JSON.parse(sizes.toString()) : [];
        const parsedSpecifications = description ? JSON.parse(description.toString()) : [];
        
        // Parse inventory data - prioritize colorInventory if it exists (multiple colors selected)
        let inventoryData = {};
        let inventoryType = 'simple'; // simple, size, color
        
        if (colorInventory) {
          inventoryData.colorInventory = JSON.parse(colorInventory.toString());
          inventoryType = 'color';
        } else if (sizeInventory) {
          inventoryData.sizeInventory = JSON.parse(sizeInventory.toString());
          inventoryType = 'size';
        }

        const productData = {
          name: name.toString(),
          category: category.toString(), 
          specifications: parsedSpecifications,
          prevprice: prevprice ? parseFloat(prevprice.toString()) : null,
          price: parseFloat(price.toString()),
          colors: parsedColors,
          sizes: parsedSizes,
          stock: stock ? parseInt(stock.toString(), 10) : 0,
          inventoryType: inventoryType, // Track which inventory system is being used
          ...inventoryData, // This will add either sizeInventory or colorInventory
          images: imageUrls,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };

        // Log the inventory data for debugging
        console.log("Inventory type:", inventoryType);
        console.log("Inventory data:", inventoryData);

        const docRef = await addDoc(
          collection(Firebase_db, "products"),
          productData
        );

        res.status(201).json({
          message: "Outfit added successfully",
          id: docRef.id,
          product: productData
        });
      } catch (error) {
        console.error("Upload error:", error);
        res.status(500).json({ 
          error: "Failed to upload dress", 
          details: error.message 
        });
      }
      resolve();
    });
  });
}