import { BadRequestException, CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { GqlContextType } from "@nestjs/graphql";
import { Message } from "apps/digitronix/src/libs/common";
import { Observable } from "rxjs";
import { AuthService } from "../auth.service";

@Injectable()
export class WithoutGuards implements CanActivate {
    constructor(
        private readonly authService: AuthService
    ) { }
    public async canActivate(context: ExecutionContext): Promise<boolean> {
        const requestType = context.getType<GqlContextType>();
        if (requestType === "graphql") {
            const request = context.getArgByIndex(2).req;

            const barearToken = request.headers.authorization;
            if (barearToken) {
                const token = barearToken.split(" ")[1];
                const authMember = await this.authService.jwtVerify(token);
                console.log("memberNick[ROLES]=> ", authMember.memberNick);

                request.body.authMember = authMember
            } else {
                request.body.authMember = null
            }

            return true
        }
    }
}