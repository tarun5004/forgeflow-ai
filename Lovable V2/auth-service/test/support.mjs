import { randomBytes } from 'node:crypto';
import { once } from 'node:events';
Object.assign(process.env,{NODE_ENV:'test',PORT:'14000',MONGODB_URI:'mongodb://127.0.0.1:1/unused',ACCESS_TOKEN_SECRET:randomBytes(32).toString('hex'),REFRESH_TOKEN_SECRET:randomBytes(32).toString('hex'),ACCESS_TOKEN_EXPIRY:'15m',REFRESH_TOKEN_EXPIRY:'7d'});
export const {createApp}=await import('../src/app/app.ts');
export const {User}=await import('../src/models/user.model.ts');
export async function withServer(run){
 const server=createApp().listen(0,'127.0.0.1');await once(server,'listening');
 try{await run(`http://127.0.0.1:${server.address().port}`);}finally{await new Promise(r=>server.close(r));}
}
// Replace only persistence I/O; actual controllers, Mongoose documents and crypto run.
export function memoryUsers(t){
 const users=new Map();
 const hydrate=record=>record?User.hydrate({...record}):null;
 t.mock.method(User,'findOne',filter=>({exec:async()=>hydrate([...users.values()].find(x=>x.email===filter.email))}));
 t.mock.method(User,'findById',id=>({exec:async()=>hydrate(users.get(id.toString()))}));
 t.mock.method(User,'create',async input=>{const user=new User(input);await user.validate();users.set(user.id,user.toObject());return user;});
 t.mock.method(User,'findByIdAndUpdate',(id,update)=>({exec:async()=>{const row=users.get(id.toString());if(!row)return null;Object.assign(row,update.$set??update);return hydrate(row);}}));
 t.mock.method(User,'findOneAndUpdate',(filter,update)=>({exec:async()=>{const row=users.get(filter._id.toString());if(!row||('refreshTokenHash'in filter&&row.refreshTokenHash!==filter.refreshTokenHash))return null;Object.assign(row,update.$set??update);return hydrate(row);}}));
 return users;
}
export async function request(base,path,body,headers={}){
 const response=await fetch(base+path,{method:'POST',headers:{'Content-Type':'application/json',...headers},body:body===undefined?undefined:JSON.stringify(body)});
 return {response,body:response.headers.get('content-type')?.includes('json')?await response.json():await response.text()};
}
export const account={name:'Demo User',email:'demo@example.invalid',password:'local-test-password'};
