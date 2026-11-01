import { test } from 'node:test';
import assert from 'node:assert/strict';
import { randomBytes } from 'node:crypto';
Object.assign(process.env,{NODE_ENV:'test',PORT:'14000',MONGODB_URI:'mongodb://127.0.0.1:1/unused',ACCESS_TOKEN_SECRET:randomBytes(32).toString('hex'),REFRESH_TOKEN_SECRET:randomBytes(32).toString('hex'),ACCESS_TOKEN_EXPIRY:'15m',REFRESH_TOKEN_EXPIRY:'7d'});
const {createApp}=await import('../src/app/app.ts');
test('application exposes its liveness route without requiring a database connection',async()=>{
 const server=createApp().listen(0,'127.0.0.1'); await new Promise(r=>server.once('listening',r));
 try {const response=await fetch(`http://127.0.0.1:${server.address().port}/_status/healthz`);assert.equal(response.status,200);assert.deepEqual(await response.json(),{ok:true,service:'auth-service'});}
 finally {await new Promise(r=>server.close(r));}
});
