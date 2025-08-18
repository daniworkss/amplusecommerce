// Additional endpoint for updating order status (for admin use)
// pages/api/update-tracking.js
import { doc, updateDoc, arrayUnion, getDoc } from 'firebase/firestore';
import { Firebase_db } from '@/config/firebase';
export default async function updateTrackingHandler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { trackingNumber, status, description, location = '' } = req.body;

    if (!trackingNumber || !status || !description) {
      return res.status(400).json({
        error: 'Missing required fields',
        required: ['trackingNumber', 'status', 'description']
      });
    }

    // Verify order exists
    const orderRef = doc(Firebase_db, 'orders', trackingNumber);
    const orderSnap = await getDoc(orderRef);
    
    if (!orderSnap.exists()) {
      return res.status(404).json({
        error: 'Order not found'
      });
    }

    // Create new tracking history entry
    const trackingEntry = {
      status,
      description,
      location,
      timestamp: new Date().toISOString()
    };

    // Update order with new status and tracking history
    await updateDoc(orderRef, {
      status,
      updatedAt: new Date().toISOString(),
      trackingHistory: arrayUnion(trackingEntry)
    });

    res.status(200).json({
      success: true,
      message: 'Tracking updated successfully',
      data: {
        trackingNumber,
        newStatus: status,
        timestamp: trackingEntry.timestamp
      }
    });

  } catch (error) {
    console.error('Error updating tracking:', error);
    res.status(500).json({
      error: 'Internal server error',
      message: 'Unable to update tracking information'
    });
  }
}