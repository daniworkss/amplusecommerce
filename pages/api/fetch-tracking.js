// pages/api/get-tracking.js
import { Firebase_db } from '@/config/firebase';
import { doc, getDoc, collection, query, where, getDocs } from 'firebase/firestore';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { trackingNumber, orderId, email } = req.query;

    // Must provide either tracking number or order ID + email
    if (!trackingNumber && (!orderId || !email)) {
      return res.status(400).json({
        error: 'Please provide either a tracking number or order ID with email address',
        required: {
          option1: ['trackingNumber'],
          option2: ['orderId', 'email']
        }
      });
    }

    let orderData = null;

    // Search by tracking number (most direct method)
    if (trackingNumber) {
      const docRef = doc(Firebase_db, 'orders', trackingNumber);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        orderData = { id: docSnap.id, ...docSnap.data() };
      }
    }
    // Search by order ID and email (fallback method)
    else if (orderId && email) {
      const orderIndexRef = doc(Firebase_db, 'orderIndex', orderId);
      const indexSnap = await getDoc(orderIndexRef);
      
      if (indexSnap.exists()) {
        const indexData = indexSnap.data();
        
        // Verify email matches
        if (indexData.customerEmail.toLowerCase() === email.toLowerCase()) {
          const docRef = doc(Firebase_db, 'orders', indexData.trackingNumber);
          const docSnap = await getDoc(docRef);
          
          if (docSnap.exists()) {
            orderData = { id: docSnap.id, ...docSnap.data() };
          }
        } else {
          return res.status(404).json({
            error: 'Order not found or email does not match'
          });
        }
      }
    }

    if (!orderData) {
      return res.status(404).json({
        error: 'Order not found',
        message: 'Please check your tracking number or order details'
      });
    }

    // Format response data
    const response = {
      success: true,
      data: {
        trackingNumber: orderData.trackingNumber,
        orderId: orderData.orderId,
        status: orderData.status,
        customer: {
          name: `${orderData.customerInfo.firstName} ${orderData.customerInfo.lastName}`,
          email: orderData.customerInfo.email
        },
        shipping: {
          address: orderData.customerInfo.address,
          city: orderData.customerInfo.city,
          state: orderData.customerInfo.state,
          postalCode: orderData.customerInfo.postalCode
        },
        order: {
          total: orderData.orderDetails.total,
          itemCount: orderData.orderDetails.itemCount,
          items: orderData.orderDetails.cart || []
        },
        tracking: {
          currentStatus: orderData.status,
          estimatedDelivery: orderData.estimatedDelivery,
          history: orderData.trackingHistory || []
        },
        dates: {
          orderDate: orderData.createdAt,
          lastUpdate: orderData.updatedAt
        }
      }
    };

    res.status(200).json(response);

  } catch (error) {
    console.error('Error retrieving tracking:', error);
    res.status(500).json({
      error: 'Internal server error',
      message: 'Unable to retrieve tracking information'
    });
  }
}

