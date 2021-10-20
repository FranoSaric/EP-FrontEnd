import { apiProvider } from "./provider";

export class ApiCore {
    constructor(options) {
        if (options.post) {
            this.post = (apiMethod, model) => {
                return apiProvider.post(options.url + apiMethod, model);
            };
        }

        if (options.postLogger) {
            this.postLogger = (apiMethod, model) => {
                return apiProvider.postLogger(options.url + apiMethod, model);
            };
        }

		if (options.postNoModel) {
            this.post = (apiMethod) => {
                return apiProvider.post(apiMethod);
            };
        }

        if (options.get) {
            this.get = (apiMethod) => {
                return apiProvider.get(apiMethod);
            };
        }
    }
}
