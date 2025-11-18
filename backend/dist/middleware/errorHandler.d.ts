declare const errorHandler: (err: any, req: Request, res: Response, next: NextFunction) => Promise<void>;
export default errorHandler;
