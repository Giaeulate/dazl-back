"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const RedisIoAdapter_1 = require("./apps/dazl/backend/adapters/RedisIoAdapter");
console.log('Starting server...', __dirname);
async function main() {
    try {
        console.log('Starting server...');
        console.log(process.env.DB_HOST);
        console.log(process.env.DB_PORT);
        const app = await core_1.NestFactory.create(app_module_1.AppModule, { cors: true });
        app.useGlobalPipes(new common_1.ValidationPipe());
        const configService = app.get(config_1.ConfigService);
        const redisIoAdapter = new RedisIoAdapter_1.RedisIoAdapter(app);
        await redisIoAdapter.connectToRedis();
        app.useWebSocketAdapter(redisIoAdapter);
        await app.listen(configService.get('PORT'));
    }
    catch (error) {
        console.error(error);
    }
}
main().then(() => console.log(`Server is running on port ${process.env.PORT}`));
//# sourceMappingURL=main.js.map