"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
const crypto = require("crypto");
if (typeof globalThis.crypto === 'undefined') {
    globalThis.crypto = crypto.webcrypto || crypto;
}
if (typeof globalThis.crypto.randomUUID === 'undefined') {
    globalThis.crypto.randomUUID = () => crypto.randomUUID();
}
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors();
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
    }));
    let port = parseInt(process.env.PORT) || 3001;
    const maxAttempts = 10;
    let attempt = 0;
    while (attempt < maxAttempts) {
        try {
            await app.listen(port);
            console.log(`Application is running on: http://localhost:${port}`);
            break;
        }
        catch (err) {
            if (err.code === 'EADDRINUSE') {
                console.warn(`Port ${port} is in use, trying ${port + 1}...`);
                port++;
                attempt++;
            }
            else {
                throw err;
            }
        }
    }
    if (attempt === maxAttempts) {
        console.error(`Could not find an available port after ${maxAttempts} attempts.`);
        process.exit(1);
    }
}
bootstrap();
//# sourceMappingURL=main.js.map