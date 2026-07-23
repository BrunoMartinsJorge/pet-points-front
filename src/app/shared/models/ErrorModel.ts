export interface ErrorModel {
    status: number;
    message: string;
    path: string;
    timestamp: string;
    error: any;
}