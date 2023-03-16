import { Field, ObjectType, ID } from "type-graphql";
import { IsEmail } from "class-validator";

@ObjectType()
export class Users {
	@Field((type) => ID)
	id: string;

	@Field()
	@IsEmail()
	email: string;

	@Field()
	password: string;

	@Field()
	nick: string;

	@Field(() => String, { nullable: true })
	photo: string;

	@Field(() => String, {nullable: true})
	description: string;

	@Field((type) => Date)
	createdAt: Date;
}
