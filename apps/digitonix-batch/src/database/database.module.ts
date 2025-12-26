import { Logger, Module } from '@nestjs/common';
import { InjectConnection, MongooseModule } from '@nestjs/mongoose';
import { Connection } from 'mongoose';

@Module({
    imports: [
        MongooseModule.forRootAsync({
            useFactory: () => ({ uri: String(process.env.MONGO_DB) })
        })
    ],
    exports: [MongooseModule]
})
export class DatabaseModule {
    readonly logger = new Logger("Mongodb Connection")
    constructor(@InjectConnection() readonly connection: Connection) {
        if (connection.readyState === 1) {
            this.logger.verbose("Mongodb conneted successfully!")
        } else {
            this.logger.error("Mongodb connection failed!")
        }
    }
}
