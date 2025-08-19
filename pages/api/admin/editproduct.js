import { IncomingForm } from "formidable";
import { Firebase_storage, Firebase_db } from "@/config/firebase";
import { ref, uploadBytes, deleteObject } from "firebase/storage";
import { doc, updateDoc, getDoc } from "firebase/firestore";
import { getDownloadURL } from "firebase/storage";
import fs from "fs";

export const config = {
  api: {
    bodyParser: false, 
  },
};

export default function handler(req, res) {
  if (req.method !== "PUT") {
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
          id, // Product ID to update
          name,
          description, // This is the specifications array
          price,
          prevprice,
          stock,
          sizeInventory, // Size-based inventory
          colorInventory, // Color-based inventory
          category,
          colors,
          sizes,
          existingImages, // Current images to keep
          imagesToDelete, // Images to delete from storage
        } = fields;

        console.log("Updating product with ID:", id?.toString());

        if (!id) {
          res.status(400).json({ error: "Product ID is required" });
          return resolve();
        }

        // Get the current product data
        const productRef = doc(Firebase_db, "products", id.toString());
        const productSnap = await getDoc(productRef);

        if (!productSnap.exists()) {
          res.status(404).json({ error: "Product not found" });
          return resolve();
        }

        const currentProduct = productSnap.data();

        // Handle image deletions
        const imagesToDeleteArray = imagesToDelete ? JSON.parse(imagesToDelete.toString()) : [];
        
        if (imagesToDeleteArray.length > 0) {
          const deletePromises = imagesToDeleteArray.map(async (imageUrl) => {
            try {
              // Extract the file path from the URL
              const urlParts = imageUrl.split('/');
              const fileName = urlParts[urlParts.length - 1].split('?')[0];
              const filePath = decodeURIComponent(fileName);
              
              const imageRef = ref(Firebase_storage, filePath);
              await deleteObject(imageRef);
              console.log("Deleted image:", filePath);
            } catch (deleteError) {
              console.error("Error deleting image:", deleteError);
              // Continue even if deletion fails
            }
          });
          
          await Promise.all(deletePromises);
        }

        // Handle new image uploads
        const newImageFiles = files.newImages ? (Array.isArray(files.newImages) ? files.newImages : [files.newImages]) : [];
        
        let newImageUrls = [];
        if (newImageFiles.length > 0) {
          const uploadPromises = newImageFiles.map(async (imageFile) => {
            if (!imageFile.filepath) throw new Error("Invalid image file");

            const fileExtension = imageFile.originalFilename
              ? imageFile.originalFilename.split(".").pop()
              : "jpg";

            const fileName = `outfitss/${Date.now()}-${Math.random()
              .toString(36)
              .slice(2)}.${fileExtension}`;

            const storageRef = ref(Firebase_storage, fileName);

            // Read file as a buffer
            const imageBuffer = await fs.promises.readFile(imageFile.filepath);

            const metadata = {
              contentType: imageFile.mimetype || "image/jpeg",
              cacheControl: "public, max-age=31536000",
            };

            await uploadBytes(storageRef, imageBuffer, metadata);
            return await getDownloadURL(storageRef);
          });

          newImageUrls = await Promise.all(uploadPromises);
        }

        // Combine existing images (that weren't deleted) with new images
        const existingImagesArray = existingImages ? JSON.parse(existingImages.toString()) : [];
        const finalImages = [...existingImagesArray, ...newImageUrls];

        // Parse JSON fields safely
        const parsedColors = colors ? JSON.parse(colors.toString()) : [];
        const parsedSizes = sizes ? JSON.parse(sizes.toString()) : [];
        const parsedSpecifications = description ? JSON.parse(description.toString()) : [];
        
        // Parse inventory data - prioritize colorInventory if it exists
        let inventoryData = {};
        let inventoryType = 'simple';
        
        if (colorInventory) {
          inventoryData.colorInventory = JSON.parse(colorInventory.toString());
          inventoryType = 'color';
          // Clear size inventory if using color inventory
          inventoryData.sizeInventory = null;
        } else if (sizeInventory) {
          inventoryData.sizeInventory = JSON.parse(sizeInventory.toString());
          inventoryType = 'size';
          // Clear color inventory if using size inventory
          inventoryData.colorInventory = null;
        } else {
          // Clear both if neither is provided
          inventoryData.sizeInventory = null;
          inventoryData.colorInventory = null;
        }

        // Prepare updated product data
        const updatedProductData = {
          name: name?.toString() || currentProduct.name,
          category: category?.toString() || currentProduct.category,
          specifications: parsedSpecifications,
          prevprice: prevprice ? parseFloat(prevprice.toString()) : null,
          price: price ? parseFloat(price.toString()) : currentProduct.price,
          colors: parsedColors,
          sizes: parsedSizes,
          stock: stock ? parseInt(stock.toString(), 10) : 0,
          inventoryType: inventoryType,
          ...inventoryData,
          images: finalImages,
          updatedAt: new Date().toISOString(),
          // Keep original createdAt
          createdAt: currentProduct.createdAt,
        };

        // Log for debugging
        console.log("Inventory type:", inventoryType);
        console.log("Final inventory data:", inventoryData);
        console.log("Final images:", finalImages);

        // Update the document
        await updateDoc(productRef, updatedProductData);

        res.status(200).json({
          message: "Product updated successfully",
          id: id.toString(),
          product: updatedProductData
        });

      } catch (error) {
        console.error("Update error:", error);
        res.status(500).json({ 
          error: "Failed to update product", 
          details: error.message 
        });
      }
      resolve();
    });
  });
}