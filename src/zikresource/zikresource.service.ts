import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository, ObjectID } from 'typeorm';
import { Zikresource } from './dto/zikresource.dto';

@Injectable()
export class ZikresourceService {
  constructor(
    @InjectRepository(Zikresource)
    private readonly zikresourcesRepository: MongoRepository<Zikresource>,
  ) {}

  async createZikresource(zikresource: Zikresource): Promise<Zikresource> {
    return await this.zikresourcesRepository.save(zikresource);
  }

  async getZikresources(): Promise<Zikresource[]> {
    return await this.zikresourcesRepository.find();
  }

  async getZikresourceById(id: ObjectID): Promise<Zikresource> {
    return await this.zikresourcesRepository.findOne({ _id: id });
  }

  async getUserZikresource(addedBy: string): Promise<Zikresource[]> {
    return await this.zikresourcesRepository.find({ addedBy: addedBy });
  }

  async updateZikresource(
    id: ObjectID,
    zikresource: Partial<Zikresource>,
  ): Promise<Zikresource> {
    // TODO: ensure the zikresource is from the authenticated user
    const zikresourceUpdated = new Zikresource(zikresource);
    await this.zikresourcesRepository.update(id, zikresourceUpdated);
    return zikresourceUpdated;
  }

  async deleteZikresource(id: ObjectID): Promise<void> {
    // TODO: ensure the zikresource is from the authenticated user
    await this.zikresourcesRepository.delete({ _id: id });
  }
}
