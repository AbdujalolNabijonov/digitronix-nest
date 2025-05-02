import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from "@nestjs/config";
import { GraphQLModule } from "@nestjs/graphql";
import { ApolloDriver } from "@nestjs/apollo"
import { ComponentsModule } from './components/components.module';
import { DatabaseModule } from './database/database.module';
import { SocketModule } from './socket/socket.module';
import AppResolver from './app.resolver';

@Module({
  imports: [
    ConfigModule.forRoot(
      {
        envFilePath: process.env.NODE_ENV === "production" ? ".env.production" : ".env.development",
        isGlobal: true
      }
    ),
    GraphQLModule.forRoot({
      driver: ApolloDriver,
      playground: true,
      autoSchemaFile: true,
      uploads: false,
      // introspection: process.env.NODE_ENV === "production" ? true : false,
      formatError: (error: any) => {
        const graphqlFormattedError = {
          code: error?.extensions.code,
          message: error.extensions?.execption?.response?.message || error.extensions.originalError?.message || error?.extensions?.response?.message || error?.message
        }
        return graphqlFormattedError;
      }
    }),
    ComponentsModule,
    DatabaseModule,
    SocketModule,
  ],
  controllers: [AppController],
  providers: [AppService, AppResolver],
})
export class AppModule { }
