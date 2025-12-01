import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import notFound from './app/middlewares/notFound.js';
import globalErrorHandler from './app/middlewares/globalErrorHandler.js';
import cookieParser from 'cookie-parser';
import Coffee from './app/interface/coffee.js';
const app: Application = express();

// middleware
app.use(cors());
app.use(express.json());
// ✅ Use cookie-parser middleware
app.use(cookieParser());
app.get('/', async (req: Request, res: Response) => {
  res.send('Hello World!');
});

// post api
app.post('/coffee', async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const createdCoffeeData = await Coffee.create(data);
    console.log(createdCoffeeData, 'last one');
    res.json({
      success : true,
      message : "added coffee data to db successfully",
      data : createdCoffeeData
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'post operation failed',
      error,
    });
  }
});

// student routes 👇
// app.use('/api/v1', router);

app.use(notFound);
app.use(globalErrorHandler);
export default app;
