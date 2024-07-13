import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from "bcryptjs"
import { MemberInput } from '../../libs/dto/member/member.input';
import { T } from '../../libs/types/general';
import { Member } from '../../libs/dto/member/member';

@Injectable()
export class AuthService {
    constructor(private readonly jwtService: JwtService) { }

    //Hashing Password
    public async hashPassword(psw: string): Promise<string> {
        const getSalt = await bcrypt.genSalt();
        const hashedPassord: string = await bcrypt.hash(psw, getSalt);
        return hashedPassord
    }

    public async comparePassword(password: string, hashedPassord: string): Promise<boolean> {
        return await bcrypt.compare(password, hashedPassord);
    }

    //Generating JWT
    public async jwtGenerator(member: Member): Promise<string> {
        const payload: T = {};
        Object.keys(member["_doc"] ? member["_doc"] : member).map((ele) => {
            payload[ele] = member[ele]
        })
        delete payload["memberPassword"];
        return await this.createJwt(payload)
    }

    private async createJwt(payload: T): Promise<string> {
        const token: string = await this.jwtService.signAsync(payload)
        return token
    }

}
