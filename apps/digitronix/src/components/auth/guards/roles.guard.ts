import { BadRequestException, CanActivate, ExecutionContext, ForbiddenException, Injectable } from "@nestjs/common";
import { AuthService } from "../auth.service";
import { Reflector } from "@nestjs/core";
import { GqlContextType } from "@nestjs/graphql";
import { Message } from "apps/digitronix/src/libs/common";

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(
        private readonly authService: AuthService,
        private readonly reflector: Reflector
    ) { }

    public async canActivate(context: ExecutionContext): Promise<boolean> {

        const roles = this.reflector.get<string[]>("roles", context.getHandler())
        if (!roles) return false;
        const requestType = context.getType<GqlContextType>()

        if (requestType === "graphql") {
            const barearToken = context.getArgByIndex(2).req.headers.authorization;
            if (!barearToken) throw new BadRequestException(Message.TOKEN_NOT_EXIST);
            const token = barearToken.split(" ")[1];
            const authMember = await this.authService.jwtVerify(token);
            const hasPermission = roles.indexOf(authMember.memberType) > -1;
            if (!authMember || !hasPermission) throw new ForbiddenException(Message.ONLY_SPECIFIC_ROLES_ALLOWED);
            console.log("memberNick[roles] => ", authMember.memberNick)
            context.getArgByIndex(2).req.body.authMember = authMember;
            return true;
        }
    }
}