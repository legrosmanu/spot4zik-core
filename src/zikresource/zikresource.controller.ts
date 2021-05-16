import {
  Body,
  Controller,
  Post,
  Get,
  Param,
  NotFoundException,
  Delete,
  UsePipes,
  ValidationPipe,
  Patch,
  HttpCode,
} from '@nestjs/common';
import { ObjectID } from 'typeorm';
import { Zikresource } from './dto/zikresource.dto';
import { ZikresourceService } from './zikresource.service';

@Controller('/api/zikresources')
export class ZikresourceController {
  constructor(private readonly zikresourceService: ZikresourceService) {}

  @Post()
  @UsePipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  )
  async createZikresource(
    @Body() zikresource: Zikresource,
  ): Promise<Zikresource> {
    // TODO: add data related to the user
    return this.zikresourceService.createZikresource(zikresource);
  }

  @Get(':id')
  async getZikresource(@Param('id') id: ObjectID): Promise<Zikresource> {
    const zikresource = await this.zikresourceService.getZikresourceById(id);
    if (zikresource != null) {
      return zikresource;
    } else {
      throw new NotFoundException();
    }
  }

  @Get()
  async getZikresources(): Promise<Zikresource[]> {
    // TODO: add query params like addedBy
    return await this.zikresourceService.getZikresources();
  }

  @Delete(':id')
  @HttpCode(204)
  async deleteZikresource(@Param('id') id: ObjectID): Promise<void> {
    await this.zikresourceService.deleteZikresource(id);
  }

  @Patch(':id')
  async updateZikresource(
    @Param('id') id: ObjectID,
    @Body() data: Partial<Zikresource>,
  ): Promise<Zikresource> {
    return await this.zikresourceService.updateZikresource(id, data);
  }
}
