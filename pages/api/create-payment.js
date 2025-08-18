
import Stripe from 'stripe';

const stripe = new Stripe(process.env.PAYMENT_KEY);
export default async function createPayment(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { amount } = req.body;
    console.log(req.body,'this is the request body')
    if (amount < 0.5) { // Minimum 50 cents for USD
      return res.status(400).json({ message: 'Amount must be at least $0.50' });
    }
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100),
      currency: 'usd',
      payment_method_types: ['card'],
    });
    console.log( paymentIntent.client_secret, 'secret')

    res.status(200).json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: error.message });
  }
}