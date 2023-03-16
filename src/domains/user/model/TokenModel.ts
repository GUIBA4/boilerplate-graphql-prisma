import {
	Field,
	ObjectType,
} from "type-graphql";
import { Users } from "./UserModel";

@ObjectType()
export class UserWithToken {
	@Field()
	user: Users;

	@Field()
	token: string;
}