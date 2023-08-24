/* eslint-disable*/
const bookTour = async (tourId) => {
  try {
    const stripe = Stripe(
      'pk_test_51NazMhGBbopVJQUr9JEbQTyv8a3WTAZhRARn0bK7rMhjqXLL28CRxvo8HjFR5U3z2rZG2LyyupHj7m4D6YubObkH002pyMve1e'
    );

    const session = await axios({
      method: 'GET',
      url: `http://127.0.0.1:3000/api/v1/bookings/checkout-session/${tourId}`,
    });
    await stripe.redirectToCheckout({
      sessionId: session.data.session.id,
    });
    window.location.replace(session.url);
    console.log('Response:', session.data);
  } catch (error) {
    console.error('Request Error:', error);
    showAlert('error', error);
  }
};

document.addEventListener('DOMContentLoaded', () => {
  const bookBtn = document.getElementById('book-tour');

  if (bookBtn) {
    bookBtn.addEventListener('click', (e) => {
      e.target.textContent = 'Processing...';
      const { tourId } = e.target.dataset;
      e.target.textContent = 'Done!';
      bookTour(tourId);
    });
  }
});
