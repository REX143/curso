import { MailerService } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { User } from 'src/auth/entities/auth.entity';

@Module({})
export class EmisionModule {

    constructor(private readonly mailerService: MailerService) {}

    @OnEvent('user.created')
    handleUserCreatedEvent(userAuth: User){
        //procesos al emitirse una creación de usuarios
        this.mailerService
      .sendMail({
        to: userAuth.email, // list of receivers
        // from: 'noreply@nestjs.com', // sender address=> esta configurado
        subject: 'Testing Nest MailerModule ✔', // Subject line
        // text: 'welcome', // plaintext body
        // html: '<b>welcome</b>', // HTML body content
        template: 'welcome',
        context:{
            username: userAuth.username
        }
      })
    }
    
}
