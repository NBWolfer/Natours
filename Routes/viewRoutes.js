const express = require('express');
const viewController = require('../Controllers/viewController');
const authController = require('../Controllers/authController');
const bookingController = require('../Controllers/bookingController');

const router = express.Router();

router.get('/', authController.isLoggedIn, viewController.getOverview);
router.get('/tour/:slug', authController.isLoggedIn, viewController.getTour);

// /login
router.get('/login', viewController.getLoginForm);

// /me
router.get('/me', authController.protect, viewController.getAccount);

// /my-tours
router.get(
  '/my-tours',
  authController.protect,
  bookingController.createBookingCheckout,
  viewController.getMyTours
);

router.post(
  '/submit-user-data',
  authController.protect,
  viewController.updateUserData
);

module.exports = router;
