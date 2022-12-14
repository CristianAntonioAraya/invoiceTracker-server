declare global {
    namespace Express {
        interface Request {
            id?: Record<string>;
            userName?: Record<string>;
        }
    }
}
interface FullUser {
    userName: string;
    password: string;
    email: string;
}

interface createdUser extends FullUser {
    _id: string;
    createdAt: Date;
    updatedAt: Date;
    __v: number;
}
interface jwtPayload {
    id: string;
    userName: string;
}
interface payloadInvoice {
    clientName: string;
    description: string;
    totalAmount: number;
    linkToPay: number;
}


type InfoUser = Omit<IUser, 'userName'>;

export { FullUser, InfoUser, createdUser, jwtPayload, payloadInvoice };
