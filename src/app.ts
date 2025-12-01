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

app.get('/coffees', async (req: Request, res: Response) => {
  try {
    const result = await Coffee.find({});
    res.json({
      success: true,
      message: 'All coffees data retrieved successfully',
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'post operation failed',
      error,
    });
  }
});

// get one coffee
app.get('/coffee/:id', async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const result = await Coffee.findById(id);
    res.json({
      success: true,
      message: 'Coffee data retrieved successfully',
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'get One Coffee operation failed',
      error,
    });
  }
});

// post api
app.post('/coffee', async (req: Request, res: Response) => {
  try {
    console.log('Hello');
    const data = req.body;
    console.log('data', data);
    const createdCoffeeData = await Coffee.create(data);
    console.log(createdCoffeeData, 'last one');
    res.json({
      success: true,
      message: 'added coffee data to db successfully',
      data: createdCoffeeData,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'post operation failed',
      error,
    });
  }
});

// update coffee
app.put('/coffee/:id', async (req: Request, res: Response) => {
  try {
    console.log("from update");
    const id = req.params.id;
    const updateData = req.body;

    const result = await Coffee.findByIdAndUpdate(id, updateData, {
      new: true, // return updated doc
    });

    res.json({
      success: true,
      message: 'Coffee updated successfully',
      data: result,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Update operation failed',
      error,
    });
  }
});

// delete coffee
app.delete('/coffees/:id', async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const result = await Coffee.findByIdAndDelete(id);
    console.log(result, id, 'both');
    res.json({
      success: true,
      message: 'Coffee deleted successfully',
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Delete operation failed',
      error,
    });
  }
});

// student routes 👇
// app.use('/api/v1', router);

app.use(notFound);
app.use(globalErrorHandler);
export default app;
