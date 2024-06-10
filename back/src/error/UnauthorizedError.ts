export class UnauthorizedError extends Error {
    constructor(message = 'Accesso não autorizado') {
        super(message);
        this.name = 'AuthError';
    };
};