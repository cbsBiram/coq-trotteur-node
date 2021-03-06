import { InputType, Field } from "type-graphql";
import { Length } from "class-validator";
import { Product } from "../../entities/Products";

@InputType()
export class ProductInput implements Partial<Product> {
  @Field()
  @Length(1, 255)
  title: String;

  @Field()
  price: number;

  @Field()
  @Length(1, 255)
  image: String;
}