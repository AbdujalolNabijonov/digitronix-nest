import { CallHandler, ExecutionContext, Logger, NestInterceptor } from "@nestjs/common";
import { GqlContextType, GqlExecutionContext } from "@nestjs/graphql";
import { Observable, tap } from "rxjs";

class LoggingInterceptor implements NestInterceptor {
    private readonly logger: Logger = new Logger()
    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> {
        const recordTime = Date.now();
        const requestType = context.getType<GqlContextType>();

        if (requestType === "http") {

        } else if (requestType === "graphql") {
            const graphqlContext = GqlExecutionContext.create(context)
            this.logger.log(`${this.stringify(graphqlContext.getContext().req.body)}`, "REQUEST")
            return next
                .handle()
                .pipe(
                    tap(
                        (context) => {
                            const responseTime = Date.now() - recordTime
                            this.logger.log(`${this.stringify(context)} - ${responseTime}ms\n\n`, "RESPONSE")
                        }
                    )
                )
        }
    }
    private stringify(context: ExecutionContext) {
        return JSON.stringify(context)?.slice(0, 75)
    }
}

export default LoggingInterceptor