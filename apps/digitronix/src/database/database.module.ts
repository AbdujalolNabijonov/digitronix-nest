import { Logger, Module } from '@nestjs/common';
import { Connection } from "mongoose"
import { InjectConnection, MongooseModule } from "@nestjs/mongoose"

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: () => ({
        uri: process.env.NODE_ENV === "production" ? process.env.MONGO_PROD : process.env.MONGO_DEV
      })
    })
  ],
})
export class DatabaseModule {
  private readonly logger: Logger = new Logger("MongoDB Connection")
  constructor(@InjectConnection() private readonly connection: Connection) {
    if (connection.readyState === 1) {
      this.logger.log(`MongoDB connected into ${process.env.NODE_ENV === "poduction" ? "production db" : "development db"}`)
    } else {
      this.logger.error("MongoDB connection is failed")
    }
  }
}
