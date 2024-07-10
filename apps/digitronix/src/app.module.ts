import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from "@nestjs/config";
import { GraphQLModule } from "@nestjs/graphql";
import { ApolloDriver } from "@nestjs/apollo"
import { ComponentsModule } from './components/components.module';
import AppResolver from './app.resolver';

@Module({
  imports: [
    ConfigModule.forRoot(),
    GraphQLModule.forRoot({
      driver: ApolloDriver,
      playground: true,
      autoSchemaFile:true,
      uploads:false,
      formatError:(err:any)=>{
        console.log("Graphql error", err)
      }
    }),
    ComponentsModule,
  ],
  controllers: [AppController],
  providers: [AppService, AppResolver],
})
export class AppModule { }
