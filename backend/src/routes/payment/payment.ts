import Stripe from "stripe";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { jwtToken } from "../../constant";
import { UserJwtPayload } from "../../types";

export const payment = async (req: Request, res: Response) => {
  const { price, productId, productName, productImage } = req.body;

  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).send({ error: "Token not provided" });
  }
  //@ts-ignore
  const user: UserJwtPayload = jwt.verify(token, jwtToken);
  const email = user.email;

  if (!process.env.STRIPE_SECRET_KEY) {
    return res.status(500).send({ error: "Stripe secret key not found" });
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "eur",
            product_data: {
              name: productName,
              // images: [productImage]
            },
            unit_amount: price,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      customer_email: email,
      success_url: `myapp://shop/${productId}?success=true`,
      cancel_url: `myapp://shop/${productId}?success=false`,
    });
    res.send({ session: session });
  } catch (error) {
    res.status(500).send({ error: error });
  }
};
