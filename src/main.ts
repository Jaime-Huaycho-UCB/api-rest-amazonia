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
		const swaggerConfig = new DocumentBuilder()
			.setTitle('Kaa Iya — Backend API')
			.setDescription(
				'API REST de la plataforma **Kaa Iya** ("Espíritu del Bosque"), para gestionar y visibilizar iniciativas sostenibles en la Amazonía boliviana.\n\n' +
				'**Base URL:** `/api`\n\n' +
				'**Autenticación:** Bearer JWT. Obtén tu token en `POST /auth/login` e inclúyelo en todas las peticiones protegidas: `Authorization: Bearer <token>`'
			)
			.setVersion('1.0')
			.addBearerAuth(
				{
					type: 'http',
					scheme: 'bearer',
					bearerFormat: 'JWT',
					description: 'Ingresa el token JWT obtenido de POST /auth/login',
				},
				'access-token',
			)
			.addTag(
				'Auth — Público',
				'Endpoints accesibles sin autenticación.\n\n' +
				'Usar para iniciar sesión (`POST /auth/login`) o solicitar acceso como investigador (`POST /auth/solicitar-acceso`).\n\n' +
				'El token JWT devuelto en `/auth/login` debe incluirse en todas las peticiones posteriores como:\n`Authorization: Bearer <token>`\n\n' +
				'**Rate limiting:** los endpoints de autenticación tienen límite por IP para prevenir ataques de fuerza bruta.',
			)
			.addTag(
				'Auth — Usuario Autenticado',
				'Endpoints disponibles para cualquier usuario con sesión activa, independientemente del rol.\n\n' +
				'**Requieren header:** `Authorization: Bearer <token>`\n\n' +
				'Devuelven `401` si el token está ausente, expirado o es inválido.\n\n' +
				'**Roles que pueden acceder:** Superadmin, Admin, Investigador.',
			)
			.addTag(
				'Auth — Admin',
				'Endpoints de gestión exclusivos para administradores (rol Admin o Superadmin).\n\n' +
				'Devuelven `403` para cualquier rol que no sea Admin o Superadmin.\n\n' +
				'**Operaciones disponibles:**\n' +
				'- Crear usuarios administradores (`POST /auth/register`)\n' +
				'- Listar y gestionar todos los usuarios (`GET /auth/usuarios`)\n' +
				'- Revisar y aprobar/rechazar solicitudes de acceso de investigadores\n\n' +
				'⚠️ **Nota:** `DELETE /auth/usuarios/:id` requiere rol **Superadmin** exclusivamente.\n\n' +
				'⚠️ Desactivar un usuario (`activo: false`) impide su login inmediatamente.',
			)
			.addTag(
				'Dashboard',
				`Endpoints de solo lectura que exponen métricas agregadas y listados filtrados ` +
				`de los proyectos amazónicos registrados en la plataforma Kaa Iya.\n\n` +
				`**Flujo recomendado de integración:**\n` +
				`1. Llamar a \`GET /dashboard/filtros-disponibles\` para obtener los valores válidos ` +
				`de cada filtro (departamentos, tipos, áreas, ODS…) y construir los selectores del UI.\n` +
				`2. Llamar a \`GET /dashboard/resumen\` para los KPIs del encabezado.\n` +
				`3. Usar \`GET /dashboard/proyectos\` con filtros dinámicos para tablas y vistas detalladas.\n` +
				`4. Usar \`GET /dashboard/por-region\`, \`/por-tipo\` y \`/timeline\` para los gráficos.\n\n` +
				`**Caché:** todos los endpoints tienen caché en memoria en el servidor. ` +
				`Los datos se actualizan automáticamente cuando se registran nuevos proyectos, ` +
				`empresas u organizaciones (triggers automáticos en PostgreSQL).`,
			)
			.build();
		const document = SwaggerModule.createDocument(app, swaggerConfig);
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
