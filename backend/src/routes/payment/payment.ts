
import Stripe from 'stripe';
import { Request, Response } from 'express';

export const payment = async (req: Request, res: Response) => {
    const { price, productId, productName, productImage } = req.body;
    const email = req.session.user?.email
    if(!process.env.STRIPE_SECRET_KEY) return
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
    try {
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [{
          price_data: {
            currency: 'eur',
            product_data: {
              name: productName, 
              // images: [productImage]
            },
            unit_amount: price, 
          },
          quantity: 1,
        }],
        mode: 'payment',
        customer_email: email,
        success_url: `${req.headers.origin}/shop/${productId}?sucess=true`,
        cancel_url: `${req.headers.origin}/shop/${productId}?sucess=false`,
      });
      res.send({ session: session });
    } catch (error) {
      res.status(500).send({ error: error });
    }
  };
  