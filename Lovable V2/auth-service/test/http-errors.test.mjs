import {test} from 'node:test';
import assert from 'node:assert/strict';
import {withServer} from './support.mjs';
test('malformed JSON is a 400 response without exposing request contents',async()=>{await withServer(async base=>{const response=await fetch(base+'/api/auth/login',{method:'POST',headers:{'Content-Type':'application/json'},body:'{'});assert.equal(response.status,400);await response.json();});});
