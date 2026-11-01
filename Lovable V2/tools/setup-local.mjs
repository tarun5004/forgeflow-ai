import { randomBytes } from 'node:crypto';
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { parseEnv } from 'node:util';

const root = path.resolve(import.meta.dirname, '..');
const target = path.join(root, '.env');
if (!existsSync(target)) {
  const values = ['LOCAL_DB_PASSWORD', 'LOCAL_BROKER_PASSWORD', 'LOCAL_REDIS_PASSWORD', 'LOCAL_S3_PASSWORD', 'ACCESS_TOKEN_SECRET', 'REFRESH_TOKEN_SECRET'];
  writeFileSync(target, values.map(name => `${name}=${randomBytes(32).toString('hex')}`).join('\n') + '\n', { flag: 'wx' });
}
const config = parseEnv(readFileSync(target, 'utf8'));
for (const service of ['auth-service', 'project-service', 'ai-service']) {
  const folder = path.join(root, service);
  const envPath = path.join(folder, '.env');
  if (!existsSync(folder) || existsSync(envPath)) continue;
  const values = {
    NODE_ENV: 'development',
    PORT: service === 'auth-service' ? '14000' : service === 'ai-service' ? '13001' : '13000',
    MONGODB_URI: `mongodb://demo:${config.LOCAL_DB_PASSWORD}@127.0.0.1:17017/${service.replaceAll('-', '_')}?authSource=admin`,
    ACCESS_TOKEN_SECRET: config.ACCESS_TOKEN_SECRET,
    REFRESH_TOKEN_SECRET: config.REFRESH_TOKEN_SECRET,
    ACCESS_TOKEN_EXPIRY: '15m', REFRESH_TOKEN_EXPIRY: '7d',
    REDIS_URL: `redis://:${config.LOCAL_REDIS_PASSWORD}@127.0.0.1:16379`,
    MESSAGE_BROKER_URL: `amqp://demo:${config.LOCAL_BROKER_PASSWORD}@127.0.0.1:15673`,
    LANGSMITH_TRACING: 'false',
    ...(service === 'ai-service' && config.MISTRAL_API_KEY ? { MISTRAL_API_KEY: config.MISTRAL_API_KEY } : {}),
  };
  writeFileSync(envPath, Object.entries(values).map(([name, value]) => `${name}=${value}`).join('\n') + '\n', { flag: 'wx' });
}
console.log('Local environment files are ready; existing files were preserved.');
