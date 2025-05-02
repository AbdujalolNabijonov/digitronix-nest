import { Module } from '@nestjs/common';
import { MailerService } from './mailer.service';
import { MailerModule as MailerProvider } from "@nestjs-modules/mailer"
import { MongooseModule } from '@nestjs/mongoose';
import otpSchema from '../../schema/OTP.model';

@Module({
    imports: [
        MongooseModule.forFeature([{ schema: otpSchema, name: "OTP" }]),
        MailerProvider.forRoot({
            transport: {
                service: "gmail",
                auth: {
                    user: "digitronixspace@gmail.com",
                    pass: "kvrx vfsr pkxt yopn"
                }
            }
        }),
    ],
    providers: [MailerService],
    exports: [MailerService],
})
export class MailerModule {
}
