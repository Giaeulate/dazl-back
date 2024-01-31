import { IoAdapter } from '@nestjs/platform-socket.io';
import { Server, ServerOptions } from 'socket.io';
import { createAdapter } from '@socket.io/redis-adapter';
import { createClient } from 'redis';
import * as dotenv from 'dotenv';
import * as process from 'process';

dotenv.config();
export class RedisIoAdapter extends IoAdapter {
  private adapterConstructor: ReturnType<typeof createAdapter>;
  async connectToRedis(): Promise<void> {
    try {
      console.log('Connecting to Redis...');
      console.log(process.env.REDIS_URL);
      const pubClient = createClient({
        url: process.env.REDIS_URL,
      });
      const subClient = pubClient.duplicate();
      await pubClient.connect();
      await subClient.connect();
      this.adapterConstructor = createAdapter(pubClient, subClient, {
        key: 'dazl',
      });
    } catch (error) {
      console.error(error);
    }
  }

  createIOServer(port: number, options?: ServerOptions): any {
    const server = super.createIOServer(port, options) as Server;
    server.adapter(this.adapterConstructor);
    return server;
  }
}
