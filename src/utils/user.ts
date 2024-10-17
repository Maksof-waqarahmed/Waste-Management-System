export type UserSchema = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  role: "USER" | "ADMIN"
};
