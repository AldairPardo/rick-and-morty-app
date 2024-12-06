import { Request, Response, NextFunction } from 'express';

const requestLogger = (req: Request, res: Response, next: NextFunction) => {
  const start = Date.now();

  // Info to log
  const log = () => {
    const duration = Date.now() - start;
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl} - ${duration}ms`);
  };

  res.on('finish', log); // Log when the response is sent
  res.on('close', log); // log when the connection is closed

  next(); // Continue with the request
};

export default requestLogger;
