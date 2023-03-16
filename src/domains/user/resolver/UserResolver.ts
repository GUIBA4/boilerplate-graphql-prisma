import {
	Arg,
	Mutation,
	Query,
	Resolver,
	ObjectType,
	Field,
} from "type-graphql";
import { Users, UserWithToken } from "../model";
import { hash, compare } from "bcryptjs";
import { v4 as uuid } from "uuid";
import { PrismaClient, User } from "@prisma/client";
import { prismaConnector, PrismaFormatter , PrismaException } from "../../../shared/infra/prisma";
import { Keys, SingUp, UserData } from '../repos'
import{ OrderByFilter, Pagination } from '../../../shared/helper'

@ObjectType()
export class getAll {
	@Field((type) => [Users])
	users: User[];

	@Field((type) => Number)
	count: number;
}

@Resolver()
export class UserResolver {

	private prismaConnection: PrismaClient;

	constructor() {
	  this.prismaConnection = prismaConnector.connect();
	}

	@Query((returns) => Users, { nullable: true,name:"getById" })
	async getById(
		@Arg("id") id: string,
	): Promise<User | null> {
		const user = await this.prismaConnection.user.findUnique({where:{id}})

		return user;
	}

	@Query((returns) => getAll, { nullable: true,name:"getByFilters" })
	async getByFilters(
		@Arg("data")data: UserData,
		@Arg("orderBy", { nullable:true })orderBy: OrderByFilter,
		@Arg("pagination", { nullable:true })pagination: Pagination,
	): Promise<{ users:User[], count:number }> {

		const filtersFormated = PrismaFormatter.formatFilter(data);

		const users = await this.prismaConnection.user.findMany({
			where:filtersFormated,
			orderBy: { [orderBy.property]: orderBy.mode },
			take: pagination.take,
			skip: pagination.skip
		});

		const usersCount = await this.prismaConnection.user.count({
			where:filtersFormated,
		});

		return {users, count:usersCount};
	}



	@Mutation((results) => Users, {name:"singUp"})
	async singUp(@Arg("data")data: SingUp): Promise<User | null> {
		try {
			const mappedProperties = Object.entries({email:data.email, nick:data.nick}).map(
				([key, value]) => ({ [key]: value }),
			  );

			  const userAlreadyExist = await this.prismaConnection.user.findMany({
				where: {
				  OR: mappedProperties,
				},
			  });

			if (userAlreadyExist.length) {
				throw new Error("user-already-exist");
			}

			const hashedPassword = await hash(data.password, 10);

			const user = await this.prismaConnection.user.create({ data:{...data, password: hashedPassword} })

			return user;

		}catch(err){
			throw new PrismaException(err);
		}
	}

	@Mutation((results) => Users, {name:"delete"})
	async delete( @Arg("keys") keys: Keys, @Arg("id") id: string): Promise<User> {
		try {

			const user = await this.prismaConnection.user.findUnique({where:{id}})

			if (!user) throw new Error("user-not-found");

			const validation = await compare(keys.password, user.password);

			if (!validation) throw new Error("email-or-password-are-not-valid");

			const userDeleted = await this.prismaConnection.user.delete({where:{id}})
			console.log("🚀 ~ file: UserResolver.ts:130 ~ UserResolver ~ delete ~ userDeleted:", userDeleted)

			if (!userDeleted) throw new Error("email-or-password-are-not-valid");

			return userDeleted
		}catch(err){
			throw new PrismaException(err);
		}
	}

	@Mutation((returns) => UserWithToken,{ name:"login" })
	async login(
		@Arg("data") data: Keys,
	): Promise<{ user: User; token: string } | null> {
		const user = await this.prismaConnection.user.findUnique({
			where: { email: data.email },
		});

		if (!user) throw new Error("email-or-password-are-not-valid");

		const validation = await compare(data.password, user.password);

		if (!validation) throw new Error("email-or-password-are-not-valid");

		const tokenCode = uuid();

		const token = await this.prismaConnection.tokens.create({
			data: { token: tokenCode, user: { connect: { id: user.id } } },
		});

		return { user, token: token.token };
	}

	@Mutation((returns) => Users,{ name:"update" })
	async update(
		@Arg("id") id: string,
		@Arg("data") data: UserData,
	): Promise<User> {

		try {
			const userExist = await this.prismaConnection.user.findUnique({where:{id}})

			if (!userExist) throw new Error("user-not-exist");


			const hashedPassword = await hash(data.password, 10);

			const userUpdated = await this.prismaConnection.user.update({
				where:{ id },
				data:{...data, password: data.password && hashedPassword},
			})

			return userUpdated
		} catch (err) {

			throw new PrismaException(err);
		}
	}
}