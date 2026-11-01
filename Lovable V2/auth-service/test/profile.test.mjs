import {test} from 'node:test';
import assert from 'node:assert/strict';
import {withServer,memoryUsers,request,account} from './support.mjs';
test('profile rejects missing authorization',async()=>{await withServer(async base=>{const response=await fetch(base+'/api/auth/me');assert.equal(response.status,401);await response.text();});});
test('profile returns the user identified by the access token',async t=>{memoryUsers(t);await withServer(async base=>{const session=await request(base,'/api/auth/register',account);const response=await fetch(base+'/api/auth/me',{headers:{Authorization:`Bearer ${session.body.accessToken}`}});assert.equal(response.status,200);const user=await response.json();assert.equal(user.email,account.email);assert.ok(!('passwordHash'in user));});});
