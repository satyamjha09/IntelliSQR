interface IErrorLog {
  message: string;
  stack?: string;
  statusCode: number;
  userId?: string;
  endpoint: string;
  method: string;
  timestamp: Date;
}

const errorLogSchema = new Schema<IErrorLog>({
  message: { type: String, required: true },
  stack: String,
  statusCode: { type: Number, required: true },
  userId: String,
  endpoint: { type: String, required: true },
  method: { type: String, required: true },
  timestamp: { type: Date, default: Date.now }
});

export const ErrorLog = model<IErrorLog>('ErrorLog', errorLogSchema);