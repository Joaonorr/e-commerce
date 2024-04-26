import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategoryModule } from './category/category.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from 'dotenv';
import { ProductModule } from './product/product.module';

config();

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: `${process.env.DATABASE_HOST}`,
      port: +`${process.env.DATABASE_PORT}`,
      username: `${process.env.DATABASE_USERNAME}`,
      password: `${process.env.DATABASE_PASSWORD}`,
      // database: `${process.env.DATABASE_NAME}`,
      entities: [__dirname + "/**/*.entity{.ts,.js}"],
      // migrations: ["dist/src/migrations/*{.ts,.js}"],
      // Migration: [Category],
      synchronize: true,
      logging: true,
    }),
    CategoryModule,
    ProductModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
