import {
  type FastifyInstance,
  type FastifyReply,
  type FastifyRequest,
} from 'fastify';
import { Logger } from '@nestjs/common';

export function applyRequestLogger(
  fastifyInstance: FastifyInstance,
  appLogger: Logger,
) {
  const requestLogFn = requestLogMiddleware(appLogger);

  fastifyInstance.addHook('onResponse', (request, reply, done) => {
    requestLogFn(request, reply);
    done();
  });
}
function requestLogMiddleware(logger: Logger) {
  return function (req: FastifyRequest, res: FastifyReply) {
    logger.log({
      remoteIp: req.ip,
      method: req.method,
      url: req.originalUrl,
      statusCode: res.statusCode,
      request: formatRequestLog(req),
    });
  };
}

function formatRequestLog(req: FastifyRequest) {
  return {
    body: formatRequestBodyToLog(req),
    query: formatRequestQueryToLog(req),
  };
}

function formatRequestBodyToLog(req: FastifyRequest): string {
  try {
    const contentType = (req.headers['content-type'] as string)?.toLowerCase();

    if (!contentType?.includes('application/json')) {
      return '[is not a json]';
    }

    const bodyObj = {
      ...(req.body as Record<string, any>),
    };

    return JSON.stringify(bodyObj);
  } catch (e) {
    return `Error during parsing body: ${e}`;
  }
}

function formatRequestQueryToLog(req: FastifyRequest): string {
  try {
    const queryObj = {
      ...(req.query as Record<string, any>),
    };

    return JSON.stringify(queryObj);
  } catch (e) {
    return `Error during parsing query: ${e}`;
  }
}
