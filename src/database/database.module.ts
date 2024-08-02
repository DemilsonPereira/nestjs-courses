import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { postgresProvider } from './postgres.providers';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Disponibiliza o ConfigService globalmente
    }),
    TypeOrmModule.forRootAsync(postgresProvider),
  ],
  exports: [TypeOrmModule],
})
export class DatabaseModule {}
