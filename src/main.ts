import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as os from 'os';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const porta = 3333;

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
      ` \n ⚠️  Servidor rodando na porta ${porta}, IP: ${IP} 🟢🆗 \n`,
    ),
  );
}
bootstrap();
