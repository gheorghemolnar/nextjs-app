export interface IResponseRO<T = undefined> {
    status: string;
    errorMessage: string;
    numberOfRecords?: number;
    data?: T extends undefined ? never : T;
}
