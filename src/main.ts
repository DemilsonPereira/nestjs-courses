import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as os from 'os';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const porta = 3333;

  // Configurar o pipe de validação global
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // validação para passar somente os campos que estão definidos no DTO
      forbidNonWhitelisted: true, // proibir campos que não estão definidos no DTO
      transform: true, // transformar os tipos dos campos para os tipos definidos no DTO
    }),
  );

  // Configuração do Swagger
  const config = new DocumentBuilder()
    .setTitle('Cursos')
    .setDescription('Curso de NestJS - API de cursos')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  const networkInfo = os.networkInterfaces();
  let IP: string | null = null;

  for (const interfaceName of Object.keys(networkInfo)) {
    for (const intf of networkInfo[interfaceName]!) {
      if (intf.family === 'IPv4' && !intf.internal) {
        IP = intf.address;
        break;
      }
    }
    if (IP) break;
  }

  if (!IP) {
    throw new Error('Nenhum endereço IP válido foi encontrado.');
  }

  await app.listen(porta, IP, () =>
    console.log(
      ` \n 🟢👻🚀 Servidor rodando na porta ${porta}, IP: ${IP} 🚀👻🟢 \n`,
    ),
  );
}
bootstrap();
