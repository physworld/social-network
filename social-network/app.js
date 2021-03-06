const express = require('express');
const morgan = require('morgan');
const userRouter = require('./routes/userRoutes');
const globalErrorHandler = require('./controllers/errorController');
const AppError = require('./utils/appError');
const app = express();

/******************************
 MIDDLEWARES
 */
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}
app.use(express.json());
app.use(express.static(`${__dirname}/public`)); //All css and html in public folder

/**************************
 *
 * ROUTES
 */

app.use('/api/v1/users', userRouter);

app.all('*', (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

app.use(globalErrorHandler);

module.exports = app;