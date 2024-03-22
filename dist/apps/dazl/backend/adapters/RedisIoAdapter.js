"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RedisIoAdapter = void 0;
const platform_socket_io_1 = require("@nestjs/platform-socket.io");
const redis_adapter_1 = require("@socket.io/redis-adapter");
const redis_1 = require("redis");
const dotenv = require("dotenv");
const process = require("process");
dotenv.config();
class RedisIoAdapter extends platform_socket_io_1.IoAdapter {
    async connectToRedis() {
        try {
            console.log('Connecting to Redis...');
            console.log(process.env.REDIS_URL);
            const pubClient = (0, redis_1.createClient)({
                url: process.env.REDIS_URL,
            });
            const subClient = pubClient.duplicate();
            await pubClient.connect();
            await subClient.connect();
            this.adapterConstructor = (0, redis_adapter_1.createAdapter)(pubClient, subClient, {
                key: 'dazl',
            });
        }
        catch (error) {
            console.error(error);
        }
    }
    createIOServer(port, options) {
        const server = super.createIOServer(port, options);
        server.adapter(this.adapterConstructor);
        return server;
    }
}
exports.RedisIoAdapter = RedisIoAdapter;
//# sourceMappingURL=RedisIoAdapter.js.map