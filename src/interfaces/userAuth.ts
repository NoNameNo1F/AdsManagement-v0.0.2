import { UUID } from "crypto";

export default interface IUserAuth {
    userId: UUID;
    token: string;
}