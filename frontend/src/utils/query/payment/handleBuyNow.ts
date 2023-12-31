import { loadStripe } from '@stripe/stripe-js';
import { Preferences } from '@capacitor/preferences';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY || 'not_found');

export const handleBuyNow = async (price: number, productId: number, productName: string, productImage: string) => {
  const stripe = await stripePromise;
  if (!stripe) return;

  try {
    const { value: token } = await Preferences.get({ key: 'jwtToken' });

    const response = await fetch(`${process.env.SERVER_URL}/paiement`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ price: price * 100, productId, productName, productImage }),
    });

    const data = await response.json();
    if (data.session.id) {
      const result = await stripe.redirectToCheckout({ sessionId: data.session.id });
      if (result.error) {
        console.error(result.error.message);
      }
    } else {
      console.error('Session ID non reçu');
    }
  } catch (error) {
    console.error('Erreur de paiement', error);
  }
};
