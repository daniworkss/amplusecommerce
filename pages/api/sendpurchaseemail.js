import { transporter } from "@/config/nodemailer";
import { CreateAdminOrderNotificationEmail } from "@/config/order-alert";
export default async function SendPurchaseEmail(req, res) {
  const companyEmail = 'daniworkss8@gmail.com';
  
  if (req.method === "POST") {
    console.log('Sending order notification to admin');
    
    try {
      const { 
        formdata, 
        total, 
        cart, 
        trackingNumber, 
        orderId 
      } = req.body;
      
      console.log('Admin notification data:', {
        customerName: `${formdata?.firstName} ${formdata?.lastName}`,
        orderId,
        trackingNumber,
        itemCount: cart?.length,
        total
      });
      
      const mailOption = {
        from: companyEmail,
        to: 'bolloms95@gmail.com' // admin email
      };


      await transporter.sendMail({
        ...mailOption,
        html: CreateAdminOrderNotificationEmail(cart, total, formdata, trackingNumber, orderId),
        subject: `🛍️ New Order #${orderId} - ${formdata?.firstName} ${formdata?.lastName} - $${total.toFixed(2)}`,
      });

      console.log('Admin notification email sent successfully');
      
      res.status(200).json({ 
        success: true, 
        message: 'Admin notification sent',
        orderId,
        trackingNumber
      });

    } catch (error) {
      console.error('Failed to send admin notification:', error.message);
      res.status(400).json({ 
        success: false, 
        error: error.message 
      });
    }
  }
};