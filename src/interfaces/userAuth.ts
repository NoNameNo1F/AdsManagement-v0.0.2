import { UUID } from "crypto";

export default interface IUserAuth {
    userId: UUID;
    userName: string;
    userRoles: string;
    token: string;
}