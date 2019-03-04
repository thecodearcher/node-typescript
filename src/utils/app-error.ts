export class AppError extends Error {

    public message: string;
    public statusCode: number;
    public isOperational: boolean;
    public data: any;
    constructor(message: string, data: any = null, statusCode: number = 400, isOperational: boolean = true) {
       super(message);
       Error.captureStackTrace(this, AppError);
       this.message = message;
       this.statusCode = statusCode;
       this.isOperational = isOperational;
       this.data = data;
    }

}
