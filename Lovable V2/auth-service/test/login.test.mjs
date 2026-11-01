import {test} from 'node:test';
import assert from 'node:assert/strict';
import jwt from 'jsonwebtoken';
import {withServer,memoryUsers,request,account} from './support.mjs';
test('login verifies the password and returns a signed access token',async t=>{memoryUsers(t);await withServer(async base=>{const created=await request(base,'/api/auth/register',account);const {response,body}=await request(base,'/api/auth/login',{email:account.email,password:account.password});assert.equal(response.status,200);const claims=jwt.verify(body.accessToken,process.env.ACCESS_TOKEN_SECRET);assert.equal(claims.sub,created.body.user.id);assert.equal(body.user.email,account.email);});});
test('login rejects an incorrect password',async t=>{memoryUsers(t);await withServer(async base=>{await request(base,'/api/auth/register',account);const {response}=await request(base,'/api/auth/login',{email:account.email,password:'wrong-password'});assert.equal(response.status,401);});});
