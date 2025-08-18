import { transporter } from "@/config/nodemailer";
import { createOrderSummaryEmail } from "@/config/ordersummary";


export default async function sendOrderSummary(req, res) {
  const companyEmail = 'daniworkss8@gmail.com'
  
  if(req.method === "POST"){
    console.log('sending mail to client')
    
    try {
      const { formdata, total, cart, trackingNumber, orderId } = req.body
      console.log('Customer email data:', {
        customerEmail: formdata?.email,
        orderId,
        trackingNumber,
        itemCount: cart?.length,
        total
      })
      
      const mailOption = {
        from: companyEmail,
        to: formdata.email
      }

      await transporter.sendMail({
        ...mailOption,
        html: createOrderSummaryEmail(cart, total, formdata, trackingNumber, orderId),
        subject: `Order Confirmation #${orderId} - Amplus Fashion`,
      });
      
      console.log('Customer email sent successfully')

      res.status(200).json({ 
        success: true,
        message: 'Customer confirmation sent',
        orderId,
        trackingNumber
      })
      
    } catch (error) {
      console.error('Failed to send customer email:', error.message)
      res.status(400).json({
        success: false,
        error: error.message
      })
    }
  }
}