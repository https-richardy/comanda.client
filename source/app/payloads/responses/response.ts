/**
 * Represents a response from an API request.
 *
 * @remarks
 * This class is a generic representation of a response that includes the HTTP status code, 
 * a flag indicating success, an optional message, and optional data payload.
 */
export class Response<TData> {
    public statusCode: number;
    public data?: TData;
    public message?: string;
    public isSuccess: boolean;

    public constructor(statusCode: number, isSuccess: boolean, message?: string, data?: TData) {
        this.statusCode = statusCode;
        this.isSuccess = isSuccess;
        this.message = message;
        this.data = data;
    }
}

