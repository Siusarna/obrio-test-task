import { type FastifyInstance, type FastifyReply, type FastifyRequest } from 'fastify';
import { Logger } from "@nestjs/common";

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
function requestLogMiddleware(
	logger: Logger,
) {
	return function (req: FastifyRequest, res: FastifyReply) {
		let duration: number | string = 'unknown';

		logger.log(formatLogMessage(req, res, duration), {
			httpRequest: {
				remoteIp: req.ip,
				method: req.method,
				duration,
				url: req.originalUrl,
				statusCode: res.statusCode,
				request: formatRequestLog(req),
			},
		});
	};
}

function formatLogMessage(
	req: FastifyRequest,
	res: FastifyReply,
	duration: number | string,
) {
	return `[${req.method}] ${req.originalUrl} - return ${res.statusCode} in ${duration} ms`;
}

function formatRequestLog(
	req: FastifyRequest,
) {
	return {
		body: formatRequestBodyToLog(req),
		query: formatRequestQueryToLog(req),
	};
}

function formatRequestBodyToLog(
	req: FastifyRequest,
): string {
	try {
		const contentType = (req.headers['content-type'] as string)?.toLowerCase();

		if (!contentType?.includes('application/json')) {
			return '[is not a json]';
		}

		let bodyObj = {
			...(req.body as Record<string, any>),
		};

		return JSON.stringify(bodyObj);
	} catch (e) {
		return `Error during parsing body: ${e}`;
	}
}

function formatRequestQueryToLog(
	req: FastifyRequest,
): string {
	try {
		let queryObj = {
			...(req.query as Record<string, any>),
		};

		return JSON.stringify(queryObj);
	} catch (e) {
		return `Error during parsing query: ${e}`;
	}
}
