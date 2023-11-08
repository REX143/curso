import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import * as path from 'path';


@Module({
    imports:[
        MailerModule.forRootAsync({
            useFactory: () => {
                console.log('host:', process.env.MAILER_HOST)
                console.log('ruta', path.resolve(__dirname, '..','..', '..', '\src\\modules\\email\\templates'))
                return {
                    transport : { 
                        host: process.env.MAILER_HOST,
                        port: process.env.MAILER_PORT,
                        auth: { user: process.env.MAILER_USER, pass: process.env.MAILER_PASS}
                    }, 
                    defaults: { from: `"nest-modules" <${process.env.MAILER_FROM}>`},                    
                    template: {
                        dir: path.resolve(__dirname, '..','..', '..', '\src\\modules\\email\\templates'), // Ruta relativa a src//dir: __dirname + '/templates',
                        adapter: new HandlebarsAdapter(),
                        options: { strict: true,},
                    },
                }
            },
        }),
             
    ]
})
export class EmailModule {}
