export class AuthTokenError extends Error {
    constructor() {
        super('Error while authenticating token');
    }
}