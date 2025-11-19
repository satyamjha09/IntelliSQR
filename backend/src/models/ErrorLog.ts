import { Schema, model, Document } from 'mongoose';

interface IErrorLog extends Document {
  message: string;
  stack?: string;
  statusCode: number;
  userId?: string;
  endpoint: string;
  method: string;
  timestamp: Date;
}

const errorLogSchema = new Schema<IErrorLog>(
  {
    message: { 
      type: String, 
      required: true 
    },
    stack: {
      type: String,
      default: null
    },
    statusCode: { 
      type: Number, 
      required: true 
    },
    userId: {
      type: String,
      default: null
    },
    endpoint: { 
      type: String, 
      required: true 
    },
    method: { 
      type: String, 
      required: true 
    },
    timestamp: { 
      type: Date, 
      default: Date.now,
      index: true
    }
  }
);

export const ErrorLog = model<IErrorLog>('ErrorLog', errorLogSchema);