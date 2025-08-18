import { Firebase_db } from "@/config/firebase";
import { getDoc,doc,updateDoc,increment } from "firebase/firestore";

export default async function updateStock(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }
  
  try {
    const { cart } = req.body;
    console.log('Processing stock updates for cart items:', cart?.length);
    
    // DEBUG: Log the entire cart structure
    console.log('Full cart data:', JSON.stringify(cart, null, 2));
    
    if (!cart || !Array.isArray(cart)) {
      return res.status(400).json({ message: 'Invalid request body - cart must be an array' });
    }
    
    // DEBUG: Log each cart item structure
    cart.forEach((item, index) => {
      console.log(`Cart item ${index}:`, {
        availableKeys: Object.keys(item),
        productId: item.productId,
        id: item.id, // might be using 'id' instead of 'productId'
        quantity: item.quantity,
        name: item.name,
        selectedColor: item.selectedColor,
        selectedSize: item.selectedSize
      });
    });
    
    // Track update results
    const updateResults = {
      successful: [],
      failed: []
    };
    
    // Process each cart item
    const updates = cart.map(async (item) => {
      try {
        // Try different possible field names for productId
        const productId = item.productId || item.id || item._id || item.product_id;
        const quantity = item.quantity || item.qty;
        const cartItemId = item.cartItemId || item.id || item._id;
        
        const { 
          selectedColor, 
          selectedSize, 
          name
        } = item;
        
        console.log(`Processing item: ${name}`, {
          productId,
          quantity,
          selectedColor,
          selectedSize,
          originalItem: item
        });
        
        if (!productId || !quantity) {
          throw new Error(`Missing productId (${productId}) or quantity (${quantity}) for item: ${name || 'Unknown'}`);
        }
        
        const productRef = doc(Firebase_db, 'products', productId);
        
        // Get current product data to understand inventory structure
        const productSnap = await getDoc(productRef);
        
        if (!productSnap.exists()) {
          throw new Error(`Product not found: ${productId}`);
        }
        
        const productData = productSnap.data();
        const { inventoryType, colorInventory, sizeInventory, stock } = productData;
        
        console.log(`Updating stock for ${name} (${productId}):`, {
          quantity,
          selectedColor,
          selectedSize,
          inventoryType,
          currentStock: stock,
          colorInventory,
          sizeInventory
        });
        
        let updateData = {};
        
        // Handle different inventory types
        if (inventoryType === 'color' && colorInventory) {
          // Color-based inventory with optional size variants
          if (selectedSize && colorInventory[selectedColor] && typeof colorInventory[selectedColor] === 'object') {
            // Color + Size combination (nested object)
            updateData[`colorInventory.${selectedColor}.${selectedSize}`] = increment(-quantity);
          } else if (selectedColor && colorInventory[selectedColor] !== undefined) {
            // Color only (simple number)
            updateData[`colorInventory.${selectedColor}`] = increment(-quantity);
          } else {
            throw new Error(`Color variant '${selectedColor}' not found for product ${name}`);
          }
          
        } else if (inventoryType === 'size' && sizeInventory) {
          // Size-based inventory
          if (!selectedSize || sizeInventory[selectedSize] === undefined) {
            throw new Error(`Size variant '${selectedSize}' not found for product ${name}`);
          }
          
          updateData[`sizeInventory.${selectedSize}`] = increment(-quantity);
          
        } else {
          // Simple stock (no variants)
          updateData.stock = increment(-quantity);
        }
        
        console.log(`Update data for ${name}:`, updateData);
        
        // Perform the update
        await updateDoc(productRef, updateData);
        
        // Log successful update
        updateResults.successful.push({
          cartItemId,
          productId,
          name,
          quantity,
          selectedColor,
          selectedSize,
          updateType: inventoryType || 'simple'
        });
        
        console.log(`✅ Successfully updated stock for ${name}`);
        
      } catch (itemError) {
        console.error(`❌ Failed to update stock for item:`, itemError.message);
        console.error('Item that failed:', JSON.stringify(item, null, 2));
        
        updateResults.failed.push({
          cartItemId: item.cartItemId || item.id,
          productId: item.productId || item.id,
          name: item.name,
          error: itemError.message,
          originalItem: item
        });
      }
    });
    
    // Wait for all updates to complete
    await Promise.all(updates);
    
    // Determine response based on results
    const hasFailures = updateResults.failed.length > 0;
    const hasSuccesses = updateResults.successful.length > 0;
    
    if (hasFailures && !hasSuccesses) {
      // All updates failed
      console.error('All stock updates failed');
      return res.status(400).json({
        message: 'All stock updates failed',
        success: false,
        results: updateResults
      });
    } else if (hasFailures && hasSuccesses) {
      // Partial success - log but continue
      console.warn(`Partial success: ${updateResults.failed.length} failures out of ${cart.length} items`);
      return res.status(200).json({
        message: `Stock update completed with some failures`,
        success: true,
        partialFailure: true,
        results: updateResults,
        successCount: updateResults.successful.length,
        failureCount: updateResults.failed.length
      });
    } else {
      // All successful
      console.log(`All ${updateResults.successful.length} items updated successfully`);
      return res.status(200).json({
        message: `Stock updated successfully for all ${updateResults.successful.length} items`,
        success: true,
        results: updateResults
      });
    }
    
  } catch (error) {
    console.error('Error in stock update process:', error);
    return res.status(500).json({
      message: 'Failed to update stock - server error',
      success: false,
      error: error.message
    });
  }
}