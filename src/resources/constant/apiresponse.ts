class ApiResponse {
    static readonly SUCCESS = { code: 200, message: 'Success' };
    static readonly BAD_REQUEST = { code: 400, message: 'Bad Request' };
    static readonly NOT_FOUND = { code: 404, message: 'Not Found' };
    static successWithData(data: any) {
        return { code: 200, message: 'Success', data };
    }
}
export default ApiResponse;
