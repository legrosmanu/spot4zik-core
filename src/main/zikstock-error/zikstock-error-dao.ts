export class ZikStockErrorDAO {

    messages: Map<string, string>;

    constructor() { // For now, the messages are here before being the database
        this.messages = new Map();
        this.messages.set("400-1", "ZikResource validation failed: must have at least a title and a url.");
        this.messages.set("400-2", "ZikResource validation failed: can't have more than 10 tags.");
        this.messages.set("404-1", "The ZikResource doesn't exist.");
        this.messages.set("500-2", "Error during the insertion into the database.");
        this.messages.set("500-3", "Error during the update of the zikresource.");
        this.messages.set("500-4", "The zikresource has not been deleted.");
    }

    getMessage(code:string): string {
        let message = this.messages.get(code);
        if (!message) {
            message = "Unknown error";
        }
        return message;
    }

}