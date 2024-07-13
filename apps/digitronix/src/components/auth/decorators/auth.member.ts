import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { GqlContextType } from "@nestjs/graphql";

export const AuthMember = createParamDecorator((data: string, conetxt: ExecutionContext) => {
    let request: any;
    const requestType = conetxt.getType<GqlContextType>();
    if (requestType === "graphql") {
        request = conetxt.getArgByIndex(2).req;
        if (request.body.authMember) {
            request.body.authMember.authorization = request.body.headers.authorization
        }
    } else request = conetxt.switchToHttp().getRequest();

    const member = request.body.authMember;

    if (data) return data ? member?.[data] : member
    else return null
})