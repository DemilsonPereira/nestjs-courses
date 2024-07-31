import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as os from 'os';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const porta = 3333;

  const networkInfo = os.networkInterfaces();
  let IP: string | null = null;

  if (networkInfo.ens32) {
    // Linux
    const ens32Interface = networkInfo.ens32.find(
      (intf) => intf.family === 'IPv4' && !intf.internal,
    );
    if (ens32Interface) {
      IP = ens32Interface.address;
    }
  } else if (networkInfo['Ethernet']) {
    // Windows
    const ethernetInterface = networkInfo['Ethernet'].find(
      (intf) => intf.family === 'IPv4' && !intf.internal,
    );
    if (ethernetInterface) {
      IP = ethernetInterface.address;
    }
  } else {
    // Se nenhuma das interfaces acima estiver disponível, tente obter a primeira interface IPv4 não interna
    for (const interfaceName of Object.keys(networkInfo)) {
      for (const intf of networkInfo[interfaceName]!) {
        if (intf.family === 'IPv4' && !intf.internal) {
          IP = intf.address;
          break;
        }
      }
      if (IP) break;
    }
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
