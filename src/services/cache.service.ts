import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';

@Injectable()
export class CacheService {
    constructor(@Inject(CACHE_MANAGER) private readonly cacheManager: Cache) { }

    public async get<T>(key: string): Promise<T | null> {
        return await this.cacheManager.get<T>(key);
    }

    public async set<T>(key: string, value: T, ttl: number): Promise<void> {
        await this.cacheManager.set(key, value, ttl);
    }

    public async del(key: string): Promise<void> {
        await this.cacheManager.del(key);
    }

    public async invalidateMultiple(keys: string[]): Promise<void> {
        for (const key of keys) {
            await this.cacheManager.del(key);
        }
    }

    public generateCacheKey(entity: string, identifier: string | number): string {
        return `${entity}_${identifier}`;
    }

    public generateListCacheKey(entity: string): string {
        return `${entity}_cache_key`;
    }
}
