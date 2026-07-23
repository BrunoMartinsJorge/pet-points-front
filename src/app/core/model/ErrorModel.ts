export interface ErrorModel {
    status: number;
    message: string;
    path: string;
    timestamp: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    error: any;
}