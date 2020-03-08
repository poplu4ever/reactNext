const Koa = require('koa');
const next = require('next');
const Router = require('koa-router');
const session = require('koa-session');
const Redis = require('ioredis');
const auth = require('./server/auth');

const RedisSessionStore = require('./server/session-store');

//check development environment
const dev = process.env.NODE_ENV != 'production';
const app = next({dev});
const handle = app.getRequestHandler();

//create a redis client object
const redis = new Redis;

app.prepare().then(()=>{
    const server = new Koa();
    const router = new Router();

    //setting session and cookie
    server.keys = ['Neo is very good'];
    const SESSION_CONFIG = {
        key:'jid',
        store:new RedisSessionStore(reids)
    }

    server.use(session(SESSION_CONFIG,server));

    //配置处理github OAUTH的登陆
    auth(server)
    
    //router mapping 路由映射
    router.get('/a/:id',async (ctx)=>{
        const id = ctx.params.id;
        await handle(ctx.req,ctx.res,{
            pathname:'/a',
            query:{id}
        });
        ctx.response = false;
    })

    router.get('/set/user',async (ctx)=>{
        ctx.session.user = {
            name: 'Neo',
            age = 18
        }
        ctx.body = 'set session success';
    })

    router.get('/delete/user',async (ctx)=>{
        ctx.session = null;
        ctx.body = 'delete session success';
    })

    server.user(router.routes());

    router.get('/api/user/info',async (ctx)=>{
        const user = ctx.session.userInfo;
        if(!user){
            ctx.status = 401,
            ctx.body = 'Need Login'
        }else{
            ctx.body = user;
            ctx.set('Content-Type','application/json');
        }
    })

    server.use(async(ctx,next)=>{
        ctx.req.session = ctx.session;
        await handle(ctx.req,ctx,res);
        ctx.response = false
    })
})
