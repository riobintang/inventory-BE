type userAuth = {
  id: string;
  isAdmin: boolean;
};

type dtoUser = {
  id?: string;
  username: string;
  name: string;
  password?: string;
};

export { userAuth, dtoUser };

declare global {
  namespace Express {
    export interface Request {
      userauth: userAuth;
    }
  }
}
