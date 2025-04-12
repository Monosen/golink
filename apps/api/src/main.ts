import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { Logger, ValidationPipe } from '@nestjs/common'

async function bootstrap() {
    const app = await NestFactory.create(AppModule)
    const logger = new Logger('Bootstrap')

    app.setGlobalPrefix('api')

    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
            forbidNonWhitelisted: true
        })
    )

    // Configurar CORS
    app.enableCors({
        origin: 'http://localhost:4200', // URL de tu aplicación Angular
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
        credentials: true
    })

    await app.listen(process.env.PORT ?? 3000)
    logger.log(`App running on port ${process.env.PORT ?? 3000}`)
}
// eslint-disable-next-line @typescript-eslint/no-floating-promises
bootstrap()
