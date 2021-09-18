import { Module, ValidationPipe } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_PIPE } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ExchangesController } from './exchanges/exchanges.controller';
import { ExchangesService } from './exchanges/exchanges.service';
import { OrdersModule } from './orders/orders.module';
import { ProductsModule } from './products/products.module';
import { Order } from './shared/entities/order.entity';
import { Product } from './shared/entities/product.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env.development',
    }),
    ProductsModule,
    OrdersModule,
    TypeOrmModule.forRoot({
      database: 'metestdb',
      type: 'postgres',
      entities: [Order, Product],
      synchronize: true,
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PW,
    }),
  ],
  controllers: [AppController, ExchangesController],
  providers: [
    AppService,
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({ whitelist: true }),
    },
    ExchangesService,
  ],
})
export class AppModule {}
