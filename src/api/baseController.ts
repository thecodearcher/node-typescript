export class BaseController {
    public sendResponse(data, message = "Ok") {
        return { data, message };
    }
}
