import {
	Field,
	InputType,
  registerEnumType,
} from "type-graphql";


export interface PaginationDTO {
  take?: number;
  skip?: number;
}


@InputType()
export class Pagination {
  @Field(type => Number, { nullable:true })
  take?: number;

  @Field(type => Number, { defaultValue: 0, nullable:true })
  skip: number;
}
