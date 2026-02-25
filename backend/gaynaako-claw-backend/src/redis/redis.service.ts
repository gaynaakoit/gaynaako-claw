import { Injectable } from '@nestjs/common';
import Redis from 'ioredis';

@Injectable()
export class RedisService {
  private client: Redis;
  constructor() {
    this.client = new Redis({
      host: process.env.REDIS_HOST || 'localhost',
      port: 6379,
    });
  }

  async set(key: string, value: any) {
    await this.client.set(key, JSON.stringify(value));
  }

  async get(key: string) {
    const data = await this.client.get(key);
    return data ? JSON.parse(data) : null;
  }

  // ✅ Nouvelle méthode pour récupérer toutes les clés correspondantes
  async keys(pattern: string): Promise<string[]> {
    return this.client.keys(pattern);
  }
}
