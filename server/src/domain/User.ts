interface User {
  id: number;
  name: string;
  email: string;
  profilePictureURL: string;
}

export type UserToInsert = Omit<User, "id">;

export interface CreateUserPayload {
  name: string;
  email: string;
  fileString: string;
}

export default User;
