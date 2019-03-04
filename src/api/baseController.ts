export class BaseController {
    public sendResponse(data, message = "OK", statusCode = 200, status = true) {
        return { data, message, statusCode, status };
    }
}
