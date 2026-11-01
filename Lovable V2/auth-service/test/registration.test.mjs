import {test} from 'node:test';
import assert from 'node:assert/strict';
import bcrypt from 'bcryptjs';
import {withServer,memoryUsers,request,account} from './support.mjs';
test('registration stores a password hash and returns a public session',async t=>{
 const users=memoryUsers(t);await withServer(async base=>{
  const {response,body}=await request(base,'/api/auth/register',account);assert.equal(response.status,201);assert.equal(body.user.email,account.email);assert.ok(!('passwordHash'in body.user));
  const stored=users.get(body.user.id);assert.ok(await bcrypt.compare(account.password,stored.passwordHash));assert.ok(await bcrypt.compare(body.refreshToken,stored.refreshTokenHash));assert.match(response.headers.get('set-cookie'),/HttpOnly/i);
 });
});
test('registration rejects duplicate email addresses',async t=>{memoryUsers(t);await withServer(async base=>{await request(base,'/api/auth/register',account);const {response}=await request(base,'/api/auth/register',account);assert.equal(response.status,409);});});
test('registration rejects malformed input',async()=>{await withServer(async base=>{const {response}=await request(base,'/api/auth/register',{name:'A',email:'bad',password:'short'});assert.equal(response.status,400);});});
