import { Injectable, NotFoundException } from '@nestjs/common';
import { MailerService as NestMailerService } from "@nestjs-modules/mailer"
import * as otpGenerator from 'otp-generator';
import { Model } from 'mongoose';
import { OTPModel } from '../../libs/dto/otp/otp';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class MailerService {
    constructor(
        private readonly mailerService: NestMailerService,
        @InjectModel("OTP") private readonly otpModel: Model<OTPModel>
    ) { };

    public async verifyEmailOpt(email: string): Promise<string> {
        try {
            const otp = otpGenerator.generate(6, {
                digits: true,
                lowerCaseAlphabets: false,
                upperCaseAlphabets: false,
                specialChars: false,
            })
            await this.mailerService.sendMail({
                to: email,
                subject: 'Verify your email',
                text: `Your One time pass code is ${otp}. It will expire in 10 minutes.`,
            })
            await this.otpModel.create({ email, otp })
            return otp;
        } catch (err: any) {
            throw err
        }
    }

    public async checkOTPConfirmation(otp:string):Promise<OTPModel>{
        try {
            const existOTP = await this.otpModel.findOne({otp});
            if(!existOTP){
                throw new NotFoundException("Invalid email otp code")
            }else{
                return await this.otpModel.findOneAndDelete({otp}).exec()
            }
        } catch (err: any) {
            throw err
        }
    }
}
