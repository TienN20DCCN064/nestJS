import { Module } from '@nestjs/common';
import { AppController } from '@/app.controller';
import { AppService } from '@/app.service';
import { UsersModule } from '@/modules/users/users.module';
import { PagesModule } from '@/modules/pages/pages.module';
import { PostsModule } from '@/modules/posts/posts.module';
import { ProceduresModule } from '@/modules/procedures/procedures.module';
import { DepartmentsModule } from '@/modules/departments/departments.module';
import { StaffsModule } from '@/modules/staffs/staffs.module';
import { CategoriesModule } from './modules/categories/categories.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '@/auth/auth.module';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { JwtAuthGuard } from './auth/passport/jwt-auth.guard';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { TransformInterceptor } from '@/core/transform.interceptor';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    PostsModule,
    PagesModule,
    ProceduresModule,
    DepartmentsModule,
    StaffsModule,
    CategoriesModule,
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        try {
          console.log('--- DATABASE ENV ---');
          console.log('DB_HOST =', configService.get('DB_HOST'));
          console.log('DB_PORT =', configService.get('DB_PORT'));
          console.log('DB_USERNAME =', configService.get('DB_USERNAME'));
          console.log('DB_PASSWORD =', configService.get('DB_PASSWORD') ? '***' : undefined);
          console.log('DB_DATABASE =', configService.get('DB_DATABASE'));
          return {
            type: 'mysql',
            host: configService.get<string>('DB_HOST'),
            port: Number(configService.get<string>('DB_PORT')),
            username: configService.get<string>('DB_USERNAME'),
            password: configService.get<string>('DB_PASSWORD'),
            database: configService.get<string>('DB_DATABASE'),
            autoLoadEntities: true,
            synchronize: true,
          };
        } catch (err) {
          console.error('TypeORM config error:', err);
          throw err;
        }
      },
    }),
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        try {
          console.log('--- MAILER ENV ---');
          console.log('MAIL_USER =', configService.get('MAIL_USER'));
          console.log('MAIL_PASSWORD =', configService.get('MAIL_PASSWORD') ? '***' : undefined);
          return {
            transport: {
              host: "smtp.gmail.com",
              port: 465,
              secure: true,
              // ignoreTLS: true,
              // secure: false,
              auth: {
                user: configService.get<string>('MAIL_USER'),
                pass: configService.get<string>('MAIL_PASSWORD'),
              },
            },
            defaults: {
              from: '"No Reply" <no-reply@localhost>',
            },
            // preview: true,
            template: {
              dir: process.cwd() + '/src/mail/templates/',
              adapter: new HandlebarsAdapter(), // or new PugAdapter() or new EjsAdapter()
              options: {
                strict: true,
              },
            },
          };
        } catch (err) {
          console.error('Mailer config error:', err);
          throw err;
        }
      },
      inject: [ConfigService],
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformInterceptor,
    }
  ],
})
export class AppModule { }
