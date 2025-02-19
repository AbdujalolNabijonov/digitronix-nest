import { Logger, Module } from '@nestjs/common';
import { Connection } from "mongoose"
import { InjectConnection, MongooseModule } from "@nestjs/mongoose"

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: () => ({
        uri: process.env.MONGO_DB
      })
    })
  ],
})
export class DatabaseModule {
  private readonly logger: Logger = new Logger("MongoDB Connection")
  constructor(@InjectConnection() readonly connection: Connection) {
    if (connection.readyState === 1) {
      this.logger.log(`MongoDB connected into ${process.env.NODE_ENV === "production" ? "production db" : "development db"}`)
    } else {
      this.logger.error("MongoDB connection is failed")
    }
  }
}