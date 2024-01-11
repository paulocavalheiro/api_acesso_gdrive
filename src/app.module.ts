import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AuthGdriveModule } from './auth-gdrive/auth-gdrive.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthGdriveModule
  ],  
  controllers: [],
  providers: [],
})
export class AppModule {}
