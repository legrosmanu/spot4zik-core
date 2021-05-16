import { ZikresourceService } from './zikresource.service';
import { ZikresourceController } from './zikresource.controller';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Zikresource } from './dto/zikresource.dto';

@Module({
  imports: [TypeOrmModule.forFeature([Zikresource])],
  controllers: [ZikresourceController],
  providers: [ZikresourceService],
})
export class ZikresourceModule {}
