/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alert';

const stripe = Stripe(
  'pk_test_51H3qPuCDQVNUOdceOkE8xx4HCRxLILDxMcg60AcPlCvEINBgg3PHKkdW7NCJkDsF5WuoLTwD1mM9KFKQJbH8r7HU00sg0OBHYP'
);

export const bookTour = async (tourId) => {
  try {
    //1. Get checkout session from API
    const session = await axios(
      `http://127.0.0.1:3000/api/v1/bookings/checkout-session/${tourId}`
    );

    // 2 Create checkout form + charge credit card
    await stripe.redirectToCheckout({
      sessionId: session.data.session.id,
    });
  } catch (error) {
    showAlert('error', err.message);
  }
};
