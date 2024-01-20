import { Inject, Injectable } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Injectable()
export class UtilitiesService {
  constructor(@Inject(CACHE_MANAGER) private readonly cacheManager: Cache) {}

  async setCache(key: string, value: any, ttl?: number) {
    await this.cacheManager.set(key, value, ttl);
  }

  async getCache<T>(key: string): Promise<T | null> {
    const result = await this.cacheManager.get<T>(key);
    return result;
  }

  async clearCache(key: string): Promise<void> {
    await this.cacheManager.del(key);
  }
}
