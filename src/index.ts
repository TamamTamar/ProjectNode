import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import configDevEnv from '../config';
import connectDB from './db/connection';
import errorHandler from './middleware/error-handler';
import notFound from './middleware/not-found';
import { analyticsRouter } from './routes/analytics-router';
import { cartRouter } from './routes/cart-router';
import { messageRouter } from './routes/message-router';
import { orderRouter } from './routes/order-router';
import { productRouter } from './routes/products-router';
import usersRouter from './routes/users-router';
import path from 'path';

configDevEnv();
connectDB(); // התחברות למסד הנתונים

const app = express();

app.use(express.json());
app.use(morgan('dev'));
app.use(cors({
  origin: 'https://finalproject-store.onrender.com',
  methods: 'GET,POST,PUT,DELETE',
  credentials: true,
}));

app.use('/api/v1/cart', cartRouter);
app.use('/api/v1/users', usersRouter);
app.use('/api/v1/products', productRouter);
app.use('/api/v1/analytics', analyticsRouter);
app.use('/api/v1/orders', orderRouter);
app.use('/api/v1/messages', messageRouter);

app.use(express.static('public'));

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
});

app.use(errorHandler);
app.use(notFound);

app.listen(8080, () => {
  console.log('Server is running on https://finalproject-store.onrender.com/');
  console.log(`App is running in ${process.env.NODE_ENV} mode`);
});
