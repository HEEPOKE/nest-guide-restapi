import { Test, TestingModule } from '@nestjs/testing';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { UtilitiesService } from '../utilities.service';
import { cacheManagerServiceMock } from '../../../../mocks/services/cache.service.mock';

describe('UtilitiesService', () => {
  let service: UtilitiesService;
  let cacheManager: Cache;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UtilitiesService,
        {
          provide: CACHE_MANAGER,
          useValue: cacheManagerServiceMock,
        },
      ],
    }).compile();

    service = module.get<UtilitiesService>(UtilitiesService);
    cacheManager = module.get<Cache>(CACHE_MANAGER);
  });

  it('should set cache correctly', async () => {
    const key = 'testKey';
    const value = 'testValue';
    const ttl = 3600;

    await service.setCache(key, value, ttl);

    expect(cacheManager.set).toHaveBeenCalledWith(key, value, ttl);
  });

  it('should get cache correctly', async () => {
    const key = 'testKey';

    await service.getCache(key);

    expect(cacheManager.get).toHaveBeenCalledWith(key);
  });

  it('should clear cache correctly', async () => {
    const key = 'testKey';

    await service.clearCache(key);

    expect(cacheManager.del).toHaveBeenCalledWith(key);
  });
});
