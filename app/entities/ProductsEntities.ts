import { ObjectType, Field, ID } from "type-graphql";
import { prop as Property, getModelForClass } from "@typegoose/typegoose";
import { __Type } from "graphql";

@ObjectType({ description: "The Product model" })
export  class Product {
    @Field(() => ID)
    id: String; 

    @Field()
    @Property()
    title: String;

    @Field()
    @Property()
    price: number;


    @Field()
    @Property()
    image: String;

}

export const ProductModel = getModelForClass(Product);