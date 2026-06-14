import { NestFactory } from '@nestjs/core';
import helmet from 'helmet';
import { AppModule } from './app.module';
import { SwaggerModule } from '@nestjs/swagger';
import { buildValidationPipe } from './shared/validation/validation-pipe.config';
import { buildSwaggerConfig } from './shared/swagger/swagger.config';
import { MyServerConfig } from './infrastructure/config/services/server.config';
import { EnviromentEnum } from './shared/enums/enviroment.enum';
import { environmentConfig } from './infrastructure/config/services/enviroment.config';
import { getCorsOptions } from './infrastructure/config/services/cors.config';
import { logServerStatus } from './infrastructure/config/services/logger.config';

async function bootstrap() {
	const nodeEnv = process.env.NODE_ENV ?? EnviromentEnum.DEVELOPMENT;
	const isProd = nodeEnv === EnviromentEnum.PRODUCTION;
	const config = environmentConfig[nodeEnv]
	const app = await NestFactory.create(AppModule, {
		logger: config.logger
	});
	app.enableShutdownHooks();
	const myServer = app.get(MyServerConfig).get();

	// AUDIT-004: headers de seguridad (no hay Nginx en PaaS) y ocultar fingerprint.
	// La CSP por defecto de helmet (`upgrade-insecure-requests`) rompe Swagger UI sobre
	// http://localhost (dev). En producción (https) se mantiene la CSP completa y Swagger
	// funciona igual porque sus assets son same-origin ('self'). Por eso la CSP se
	// desactiva solo fuera de producción.
	app.use(helmet({
		contentSecurityPolicy: isProd ? undefined : false,
	}));
	app.getHttpAdapter().getInstance().disable('x-powered-by');

	app.setGlobalPrefix('api')

	if (config.swagger) {
		const document = SwaggerModule.createDocument(app, buildSwaggerConfig());
		SwaggerModule.setup('api/documentation', app, document);
	}

	const corsOptions = getCorsOptions(myServer.domainFrontend);
	app.enableCors(corsOptions);

	// AUDIT-002: validación estricta (whitelist + forbidNonWhitelisted).
	app.useGlobalPipes(buildValidationPipe());

	await app.listen(myServer.port);
	logServerStatus(myServer);
}
bootstrap();
