import {
  type CallHandler,
  type ExecutionContext,
  Injectable,
  type NestInterceptor,
} from '@nestjs/common';
import { map, type Observable } from 'rxjs';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  constructor() {}

  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<any> | Promise<Observable<any>> {
    return next.handle().pipe(
      map(async (responseBody) => {
        const data = await responseBody;

        if (!data) {
          return {
            status: 1,
            data: {},
          };
        }

        if (!data.status && data.error) {
          return {
            status: 0,
            error: data.error,
          };
        }

        return {
          status: 1,
          data,
        };
      }),
    );
  }
}
