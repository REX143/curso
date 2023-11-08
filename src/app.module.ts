import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { VideosModule } from './videos/videos.module';
import { ConfigModule} from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { EmisionModule } from './modules/emision/emision.module';
import { EmailModule } from './modules/email/email.module';
import { CacheInterceptor, CacheModule } from '@nestjs/cache-manager';
import { APP_INTERCEPTOR } from '@nestjs/core';

@Module({
  imports: [ 
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',//process.env.USER_MYSQL,
      password : 'N0meacuerd0!',//process.env.PASSWORD_MYSQL,
      database: 'curso',//process.env.DATABASE,
      entities: [__dirname + './**/**/*.entity{.ts,.js}' // Cargar todas las entidades
      
      ],
      autoLoadEntities: true,
      synchronize: true,
    }),
    ConfigModule.forRoot({
    isGlobal: true,
  }),
  
  ServeStaticModule.forRoot({
    rootPath: join(__dirname, '..', 'public')
  }),
  EventEmitterModule.forRoot(),
  CacheModule.register({
    ttl: 3600,
    max: 1000,
    isGlobal: true    
  })  
  ,VideosModule, AuthModule, EmisionModule, EmailModule],
  controllers: [AppController],
  providers: [AppService,
  {
    provide: APP_INTERCEPTOR,
    useClass: CacheInterceptor,
  },
  ],
})
export class AppModule {}
