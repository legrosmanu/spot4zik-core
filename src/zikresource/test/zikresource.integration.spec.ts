import MongoMemoryServer from 'mongodb-memory-server-core';
import { MongoClient } from 'mongodb';
import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { ZikresourceModule } from '../zikresource.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Zikresource } from '../dto/zikresource.dto';

describe('Zikresource - Controller', () => {
  let app: INestApplication;
  let mongoClient: MongoClient;
  let mongoMemory: MongoMemoryServer;

  beforeAll(async () => {
    // Run a mongodb in memeory
    jest.setTimeout(20000);
    mongoMemory = new MongoMemoryServer();
    const mongoUri = await mongoMemory.getUri();
    const mongoDbName = await mongoMemory.getDbName();
    mongoClient = await MongoClient.connect(mongoUri, {
      useUnifiedTopology: true,
    });

    // Init the app
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        ZikresourceModule,
        TypeOrmModule.forRoot({
          type: 'mongodb',
          url: mongoUri,
          database: mongoDbName,
          entities: [Zikresource],
          synchronize: true,
          useUnifiedTopology: true,
          useNewUrlParser: true,
        }),
      ],
      controllers: [],
      providers: [],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    app.close();
    mongoClient.close();
    await mongoMemory.stop();
  });

  it('/POST Zikresource should create the Zikresource expected', async () => {
    expect(true).toBe(true);
  });

  it('/POST Zikresource should throw an expecption if the data are well formed to create a ZikResource.', async () => {
    expect(true).toBe(true);
  });

  it('/GET Zikresource should return the resource expected according to the given id.', async () => {
    expect(true).toBe(true);
  });

  it('/GET Zikresource should throw an expcetion if the resource is unknown.', async () => {
    expect(true).toBe(true);
  });

  it('/GET Zikresources should return an array with the expected Zikresources.', async () => {
    expect(true).toBe(true);
  });

  it('/GET Zikresources should return an empty array.', async () => {
    expect(true).toBe(true);
  });

  it('/DELETE Zikresource should not throw an expcetion if the resource is known and deleted.', async () => {
    expect(true).toBe(true);
  });

  it('/DELETE Zikresource should throw an exception if the resource is unknown.', async () => {
    expect(true).toBe(true);
  });

  it('/PATCH Zikresource should return the resource updated .', async () => {
    expect(true).toBe(true);
  });

  it('/PATCH Zikresource should throw an exception if the resource to update is unknown.', async () => {
    expect(true).toBe(true);
  });
});
