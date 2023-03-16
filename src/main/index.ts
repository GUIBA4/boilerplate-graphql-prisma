import path from 'path'
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from "type-graphql";
import "reflect-metadata";
import { UserResolver } from '../domains/user/resolver';
import express, { Express } from 'express';
import {config} from 'dotenv'

async function main() {
  config();
  const schema = await buildSchema({
    resolvers:[
      UserResolver
    ],
    validate:{ forbidUnknownValues:false },
    emitSchemaFile:path.resolve(__dirname, 'schema.gql')
  })

  const server = new ApolloServer({
    schema,
  })

  const app: Express = express();
  const PORT = process.env.API_PORT;

  await server.start();

  server.applyMiddleware({app});


  app.listen({ port: PORT }, () =>
    console.log(`🚀 Server ready at http://localhost:5000/graphql`)
  );

}

main().catch((err) => console.error(err))