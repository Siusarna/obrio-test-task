import {
  type ArgumentsHost,
  Catch,
  type ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { type FastifyReply } from 'fastify';

@Catch()
export class ErrorHandler implements ExceptionFilter {
  constructor(private readonly logger: Logger) {}
  async catch(exception: any, host: ArgumentsHost): Promise<any> {
    const res = host.switchToHttp().getResponse<FastifyReply>();

    if (exception instanceof HttpException) {
      const responseBody = exception.getResponse();

      const resBody = {
        status: 0,
        error: responseBody,
      };
      await res.status(exception.getStatus()).send(resBody);

      this.logger.error(
        `${exception.message}: ${JSON.stringify(responseBody)}`,
      );

      return;
    }

    if (exception instanceof Error) {
      this.logger.error(exception.message, {
        stack: exception.stack,
      });
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
        status: 0,
        error: {
          code: 'UNKNOWN_ERROR',
          message: 'Internal server error',
        },
      });
    }
  }
}
