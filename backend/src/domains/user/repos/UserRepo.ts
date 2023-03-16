import {
	Field,
	InputType,
} from "type-graphql";


@InputType()
export class Keys {
	@Field()
	email: string;

	@Field()
	password: string;
}

@InputType()
export class SingUp {
	@Field()
	email: string;

	@Field()
	password: string;

	@Field()
	nick: string;

	@Field({nullable: true})
	photo: string;

	@Field({nullable: true})
	description: string;
}

@InputType()
export class UserData {

	@Field({nullable: true})
	email: string;

	@Field({nullable: true})
	password: string;

	@Field({nullable: true})
	nick: string;

	@Field({nullable: true})
	photo: string;

	@Field({nullable: true})
	description: string;
}