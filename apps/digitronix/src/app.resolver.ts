import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { AppService } from "./app.service";

@Resolver()
class AppResolver {
    constructor(private readonly appService: AppService) { };

    @Query(returns => String)
    public greeting(
        @Args("input") propertyId: string
    ): string {
        const msg = `This is GraphQL API ${propertyId}`
        return msg
    }
}

export default AppResolver