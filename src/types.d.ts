interface FullUser {
    userName: string;
    password: string;
    email: string;
}

interface createdUser {
    _id: string;
    userName: string;
    password: string;
    email: string;
    createdAt: Date;
    updatedAt: Date;
    __v: number;
}

type InfoUser = Omit<IUser, 'userName'>;

export { FullUser, InfoUser, createdUser };
