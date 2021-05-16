import { IsNotEmpty, IsOptional, MaxLength } from 'class-validator';
import { Column, Entity, ObjectID, ObjectIdColumn } from 'typeorm';
import { Tag } from './tag.dto';

@Entity('zikresources')
export class Zikresource {
  @ObjectIdColumn()
  _id: ObjectID;

  @Column()
  @IsNotEmpty()
  url: string;

  @Column()
  @IsNotEmpty()
  title: string;

  @Column()
  @IsOptional()
  type?: string;

  @Column()
  @IsOptional()
  artist?: string;

  @Column()
  @IsOptional()
  @MaxLength(10)
  tags?: Tag[];

  @Column()
  @IsOptional()
  addedBy?: any;

  constructor(data?: Partial<Zikresource>) {
    Object.assign(this, data);
  }
}
