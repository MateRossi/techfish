export class PreconditionError extends Error {
    constructor(message = 'Condição não atendida para completar a operação') {
        super(message);
        this.name = 'PreconditionError';
    };
};