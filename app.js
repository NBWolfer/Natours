/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable prettier/prettier */
const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const path = require('path');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const AppError = require('./Utils/appError');
const globalErrorHandler = require('./Controllers/errorController');
const tourRouter = require('./Routes/tourRoutes');
const userRouter = require('./Routes/userRoutes');
const reviewRouter = require('./Routes/reviewRoutes');
const viewRouter = require('./Routes/viewRoutes');
const bookingRouter = require('./Routes/bookingRoutes');

const app = express();
app.use(cors({ origin: true, credentials: true }));
app.use(
  helmet({ crossOriginResourcePolicy: false, crossOriginEmbedderPolicy: false })
);

app.set('view engine', 'pug');
app.set('Views', path.join(__dirname, 'Views'));
// Serving static files
// app.use(express.static(`${__dirname}/public`));
app.use(express.static(path.join(__dirname, 'public')));

// 1) Global Middlewares

// Set security HTTP Headers

const scriptSrcUrls = [
  'https://unpkg.com/',
  'https://tile.openstreetmap.org',
  'https://*.cloudflare.com/',
  'https://cdnjs.cloudflare.com/ajax/libs/axios/',
  'https://*.stripe.com',
  'https://js.stripe.com/',
  'https:',
  'data:',
];
const styleSrcUrls = [
  'https://unpkg.com/',
  'https://tile.openstreetmap.org',
  'https://fonts.googleapis.com/',
  'https:',
];
const connectSrcUrls = [
  'https://unpkg.com',
  'https://tile.openstreetmap.org',
  'https://*.cloudflare.com/',
  'http://127.0.0.1:3000',
  'https://*.stripe.com',
  'http://127.0.0.1:3000/api/v1/bookings/checkout-session/',
  'https://js.stripe.com/v3/',
];
const fontSrcUrls = [
  'fonts.googleapis.com',
  'fonts.gstatic.com',
  'https:',
  'data:',
];
const frameSrcUrls = ['https://*.stripe.com'];

app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'", 'data:', 'blob:'],
      baseUri: ["'self'"],
      fontSrc: ["'self'", ...fontSrcUrls],
      scriptSrc: ["'self'", ...scriptSrcUrls],
      frameSrc: ["'self'", ...frameSrcUrls],
      objectSrc: ["'none'"],
      styleSrc: ["'self'", "'unsafe-inline'", ...styleSrcUrls],
      workerSrc: ["'self'", 'data:', 'blob:', 'https://*.stripe.com'],
      childSrc: ["'self'", 'blob:'],
      imgSrc: ["'self'", 'blob:', 'data:', 'https:', 'https://*.stripe.com'],
      formAction: ["'self'"],
      connectSrc: ["'self'", ...connectSrcUrls],
      upgradeInsecureRequests: [],
    },
  })
);

// Development logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Limit request from same IP
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000, // 1 hour
  message: 'Too many requests from this IP, please try again in an hour!',
});
app.use('/api', limiter);

// Body parser, reading data from body into req.body
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
app.use(cookieParser());

// Data sanitization NoSQL query injection
app.use(mongoSanitize());

// Data sanitization against XSS
app.use(xss());

// Prevent parameter pollution
app.use(
  hpp({
    whitelist: [
      'duration',
      'ratingsQuantity',
      'ratingsAverage',
      'maxGroupSize',
      'difficulty',
      'price',
    ],
  })
);

// Test middleware
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  // eslint-disable-next-line no-console
  // console.log(req.headers);
  // eslint-disable-next-line no-console
  // console.log(req.cookies);
  next();
});
app.use((req, res, next) => {
  // eslint-disable-next-line no-console
  console.log(req.body);
  next();
});
// 3) Routes
app.use('/', viewRouter);
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/reviews', reviewRouter);
app.use('/api/v1/bookings', bookingRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
