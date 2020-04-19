export interface IResponse {
    isOk: boolean,
    statusCode: number,
    message: string,
    result: any,
    code: string,
    redirectUrl: string,
    param: any,
    email: string,
    token: string,
    expires_in: number,
    refresh_token: string,
};