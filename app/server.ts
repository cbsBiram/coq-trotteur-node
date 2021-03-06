import { ApolloServer } from "apollo-server-express";
import Express from "express";
import "reflect-metadata";
import { buildSchema } from "type-graphql";
import { connect } from "mongoose";

// resolvers
// import {UserResolver} from "./resolvers/User";
import {ProductResolver} from "./resolvers/Product";


const main = async () => {
const schema = await buildSchema({
    resolvers: [ProductResolver],
    emitSchemaFile: true,
    validate: false,
  });

// create mongoose connection
const mongoose = await connect('mongodb://localhost:27017/test', {useNewUrlParser: true});
await mongoose.connection;


const server = new ApolloServer({schema});
const app = Express();
server.applyMiddleware({app});
app.listen({ port: 5000 }, () =>
  console.log(`🚀 Server ready and listening at ==> http://localhost:3333${server.graphqlPath}`))
};
main().catch((error)=>{
    console.log(error, 'error');
})