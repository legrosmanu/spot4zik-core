import { ZikresourceModule } from './zikresource/zikresource.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Zikresource } from './zikresource/dto/zikresource.dto';

@Module({
  imports: [
    ZikresourceModule,
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mongodb',
      url: process.env.MONGODB_CONNECTION_URL,
      database: process.env.MONGODB_DATABASE,
      entities: [Zikresource],
      synchronize: false,
      useUnifiedTopology: true,
      useNewUrlParser: true,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
