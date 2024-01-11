import { Module } from '@nestjs/common';
import { AuthGdriveService } from './auth-gdrive.service'; // Importe o serviço aqui
import { AuthGdriveController } from './auth-gdrive.controller';
import { ConfigModule } from '@nestjs/config';


@Module({
    controllers: [AuthGdriveController],
    providers: [AuthGdriveService], 
    exports: [AuthGdriveService],
  
})
export class AuthGdriveModule {}


