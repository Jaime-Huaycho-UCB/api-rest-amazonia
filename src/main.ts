import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { MyServerConfig } from './infrastructure/config/services/server.config';
import { EnviromentEnum } from './shared/enums/enviroment.enum';
import { environmentConfig } from './infrastructure/config/services/enviroment.config';
import { getCorsOptions } from './infrastructure/config/services/cors.config';
import { logServerStatus } from './infrastructure/config/services/logger.config';

async function bootstrap() {
	const config = environmentConfig[process.env.NODE_ENV ?? EnviromentEnum.DEVELOPMENT]
	const app = await NestFactory.create(AppModule, {
		logger: config.logger
	});
	app.enableShutdownHooks();
	const myServer = app.get(MyServerConfig).get();

	app.setGlobalPrefix('api')

	if (config.swagger) {
		const config = new DocumentBuilder()
			.setTitle('Backend de Amazonia')
			.setDescription('Documentación para el backend de la Amazonia')
			.setVersion('1.0')
			.addBearerAuth(
				{
					type: 'http',
					scheme: 'bearer',
					bearerFormat: 'JWT',
				},
				'access-token',
			)
			.build();
		const document = SwaggerModule.createDocument(app, config);
		SwaggerModule.setup('api/documentation', app, document);
	}

	const corsOptions = getCorsOptions(myServer.domainFrontend);
	app.enableCors(corsOptions);

	app.useGlobalPipes(new ValidationPipe({
		transform: true,
		transformOptions: {
			enableImplicitConversion: true,
		},
	}));

	await app.listen(myServer.port);
	logServerStatus(myServer);
}
bootstrap();
