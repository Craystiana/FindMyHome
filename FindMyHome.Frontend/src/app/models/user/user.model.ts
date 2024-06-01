import { UserRole } from "src/app/common/user-role";

export interface UserModel {
    email: string;
    firstName: string;
    lastName: string;
    userRole: UserRole;
    token: string;
}