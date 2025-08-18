// pages/api/create-tracking.js
import { Firebase_db } from '@/config/firebase'; // Adjust import path based on your Firebase setup
import { collection, addDoc, doc, setDoc } from 'firebase/firestore';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const {
      trackingNumber,
      orderId,
      customerInfo,
      orderDetails
    } = req.body;

    // Validate required fields
    if (!trackingNumber || !orderId || !customerInfo || !orderDetails) {
      return res.status(400).json({
        error: 'Missing required fields',
        required: ['trackingNumber', 'orderId', 'customerInfo', 'orderDetails']
      });
    }

    // Create tracking document
    const trackingData = {
      trackingNumber,
      orderId,
      customerInfo: {
        firstName: customerInfo.firstName,
        lastName: customerInfo.lastName,
        email: customerInfo.email,
        phone: customerInfo.phone,
        address: customerInfo.address,
        city: customerInfo.city,
        state: customerInfo.state,
        postalCode: customerInfo.postalCode
      },
      orderDetails: {
        cart: orderDetails.cart,
        total: orderDetails.total,
        itemCount: orderDetails.cart?.length || 0
      },
      status: 'confirmed',
      trackingHistory: [
        {
          status: 'confirmed',
          description: 'Order confirmed and payment received',
          timestamp: new Date().toISOString(),
          location: 'Processing Center'
        },
        {
          status: 'processing',
          description: 'Order is being prepared for shipment',
          timestamp: new Date().toISOString(),
          location: 'Fulfillment Center'
        }
      ],
      estimatedDelivery: calculateEstimatedDelivery(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    // Store in Firebase using tracking number as document ID
    await setDoc(doc(Firebase_db, 'orders', trackingNumber), trackingData);

    // Also create an index by orderId for easy lookup
    await setDoc(doc(Firebase_db, 'orderIndex', orderId), {
      trackingNumber,
      orderId,
      customerEmail: customerInfo.email,
      createdAt: new Date().toISOString()
    });

    console.log('Order tracking created:', trackingNumber);

    res.status(201).json({
      success: true,
      message: 'Tracking information created successfully',
      data: {
        trackingNumber,
        orderId,
        status: 'confirmed',
        estimatedDelivery: trackingData.estimatedDelivery
      }
    });

  } catch (error) {
    console.error('Error creating tracking:', error);
    res.status(500).json({
      error: 'Internal server error',
      message: error.message
    });
  }
}

// Helper function to calculate estimated delivery (5-7 business days)
function calculateEstimatedDelivery() {
  const now = new Date();
  const businessDays = 7; // Estimate 7 business days
  let deliveryDate = new Date(now);
  let daysAdded = 0;
  
  while (daysAdded < businessDays) {
    deliveryDate.setDate(deliveryDate.getDate() + 1);
    // Skip weekends (0 = Sunday, 6 = Saturday)
    if (deliveryDate.getDay() !== 0 && deliveryDate.getDay() !== 6) {
      daysAdded++;
    }
  }
  
  return deliveryDate.toISOString();
}

// Export helper functions for use in other parts of your app
export const trackingHelpers = {
  generateTrackingNumber: () => {
    const timestamp = Date.now().toString(36).toUpperCase();
    const randomStr = Math.random().toString(36).substring(2, 8).toUpperCase();
    return `TRK${timestamp}${randomStr}`;
  },
  
  generateOrderId: () => {
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 10000);
    return `ORD${timestamp}${random}`;
  },
  
  updateOrderStatus: async (trackingNumber, newStatus, description, location = '') => {
    try {
      const orderRef = doc(Firebase_db, 'orders', trackingNumber);
      const updateData = {
        status: newStatus,
        updatedAt: new Date().toISOString(),
        trackingHistory: arrayUnion({
          status: newStatus,
          description,
          timestamp: new Date().toISOString(),
          location
        })
      };
      
      await updateDoc(orderRef, updateData);
      return { success: true };
    } catch (error) {
      console.error('Error updating order status:', error);
      return { success: false, error: error.message };
    }
  }
};