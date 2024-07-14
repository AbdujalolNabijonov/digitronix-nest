import { BadRequestException, CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { GqlContextType } from "@nestjs/graphql";
import { Message } from "apps/digitronix/src/libs/common";
import { AuthService } from "../auth.service";

@Injectable()
class AuthGuard implements CanActivate {
    constructor(private readonly authService: AuthService) { }

    public async canActivate(context: ExecutionContext): Promise<boolean> {
        const requestType = context.getType<GqlContextType>();
        if (requestType === "graphql") {
            const barearToken = context.getArgByIndex(2).req.headers.authorization;
            if (!barearToken) new BadRequestException(Message.TOKEN_NOT_EXIST);
            const token = barearToken.split(" ")[1]
            const member = await this.authService.jwtVerify(token);

            if (!member || !token) throw new BadRequestException(Message.NOT_AUTHENTICATED);

            context.getArgByIndex(2).req.body.authMember = member;
            return true
        }
    }
}

export default AuthGuard