import { Resolver, Mutation, Arg, Query } from "type-graphql";
import { Product, ProductModel } from "../entities/ProductsEntities";
import { ProductInput } from "./types/product-input"


@Resolver(_of => Product)
export class ProductResolver {

    @Query(_returns => Product, { nullable: false})
    async returnSingleProduct(@Arg("id") id: string){
      return await ProductModel.findById({_id:id});
    };

    @Query(() => [Product])
    async returnAllProduct(){
      return await ProductModel.find();
    };

    @Mutation(() => Product)
    async createProduct(@Arg("data"){title, price, image}: ProductInput): Promise<Product> { 
      const product = (await ProductModel.create({      
          title,
          price,
          image   
      })).save();
      return product;
  };
  
  @Mutation(() => Product)
    async updateProduct(@Arg("id") id: string, @Arg("data") data: ProductInput): Promise<Product> { 
    const product = await ProductModel.findById({ _id: id });
    
    if (!product) throw new Error("Book not found!");

    Object.assign(product, data);
    await product.save();
    return product;
  };

   @Mutation(() => Boolean)
   async deleteProduct(@Arg("id") id: string) {
    await ProductModel.deleteOne({id});
    return true;
  }
}