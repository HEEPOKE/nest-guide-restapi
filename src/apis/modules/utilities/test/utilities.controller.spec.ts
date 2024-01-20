import { StatusCodeModel } from '../../../../constants/constant';
import { TestingModule, Test } from '@nestjs/testing';
import { HttpException } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { UtilitiesController } from '../utilities.controller';
import { cacheManagerServiceMock } from '../../../../mocks/services/cache.service.mock';

describe('UtilitiesController', () => {
  let controller: UtilitiesController;
  let cacheManager: Cache;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UtilitiesController],
      providers: [
        {
          provide: CACHE_MANAGER,
          useValue: cacheManagerServiceMock,
        },
      ],
    }).compile();

    controller = module.get<UtilitiesController>(UtilitiesController);
    cacheManager = module.get<Cache>(CACHE_MANAGER);
  });

  it('should get value from cache', async () => {
    const testKey = 'testKey';
    const testValue = 'testValue';
    jest.spyOn(cacheManager, 'get').mockResolvedValue(testValue);

    const result = await controller.getValue(testKey);

    expect(result.data).toEqual(testValue);
    expect(cacheManager.get).toHaveBeenCalledWith(testKey);
  });

  it('should throw an exception when getting value fails', async () => {
    const testKey = 'testKey';
    jest.spyOn(cacheManager, 'get').mockRejectedValue(new Error('Cache error'));

    await expect(controller.getValue(testKey)).rejects.toThrow(HttpException);
  });

  it('should set value in cache', async () => {
    const testKey = 'testKey';
    const testValue = 'testValue';
    const body = { key: testKey, value: testValue };
    jest.spyOn(cacheManager, 'set').mockResolvedValue(undefined);

    const result = await controller.setValue(body);

    expect(result.status.code).toEqual(StatusCodeModel.SUCCESS.code);
    expect(cacheManager.set).toHaveBeenCalledWith(
      testKey,
      testValue,
      expect.any(Number),
    );
  });

  it('should throw an exception when setting value fails', async () => {
    const testKey = 'testKey';
    const testValue = 'testValue';
    const body = { key: testKey, value: testValue };
    jest.spyOn(cacheManager, 'set').mockRejectedValue(new Error('Cache error'));

    await expect(controller.setValue(body)).rejects.toThrow(HttpException);
  });

  it('should delete key from cache', async () => {
    const testKey = 'testKey';
    jest.spyOn(cacheManager, 'del').mockResolvedValue(undefined);

    const result = await controller.deleteKey(testKey);

    expect(result.status.code).toEqual(StatusCodeModel.SUCCESS.code);
    expect(cacheManager.del).toHaveBeenCalledWith(testKey);
  });

  it('should throw an exception when deleting key fails', async () => {
    const testKey = 'testKey';
    jest.spyOn(cacheManager, 'del').mockRejectedValue(new Error('Cache error'));

    await expect(controller.deleteKey(testKey)).rejects.toThrow(HttpException);
  });
});
