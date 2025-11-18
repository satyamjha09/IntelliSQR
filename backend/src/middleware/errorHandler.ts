import { ErrorLog } from '../models/ErrorLog';

const errorHandler = async (err: any, req: Request, res: Response, next: NextFunction) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  try {
    await ErrorLog.create({
      message,
      stack: err.stack,
      statusCode,
      userId: (req as any).userId,
      endpoint: req.path,
      method: req.method
    });
  } catch (logError) {
    console.log('Failed to log error:', logError);
  }

  res.status(statusCode).json({ error: message });
};

export default errorHandler;