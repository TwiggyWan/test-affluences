export class BadRequestError extends Error {
    constructor(msg: string) {
        super(msg);
        Object.setPrototypeOf(this, BadRequestError.prototype);
    }
}
