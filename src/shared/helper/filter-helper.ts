import {
	Field,
	InputType,
  registerEnumType,
} from "type-graphql";

@InputType()
export class DateFilter {
  @Field(type => Date)
  initialDate?: Date;

  @Field(type => Date)
  finalDate?: Date
};

// eslint-disable-next-line no-shadow
export enum OrderByMode {
  ASC = 'asc',
  DESC = 'desc',
}

registerEnumType(OrderByMode, {
  name: "OrderByMode",
});

export interface OrderByFilterDTO {
  property?: string;
  mode?: OrderByMode;
}

@InputType()
export class OrderByFilter {
  @Field(type => String, { defaultValue:'createdAt', nullable:true })
  property: string;

  @Field(type => OrderByMode, { defaultValue:'asc', nullable:true } )
  mode: OrderByMode;
}
