const axios = require('axios');
const config  = require('../config');

const { client_id,client_secrect,request_token_url } = config.github;

module.exports = (server) => {
    server.use(async (ctx,next)=>{
        if(ctx.path === '/auth'){
            const code = ctx.query.code;
            if(!code){
                ctx.body = 'code does not exist';
                return;
            }

            const result = await axios({
                method:'POST',
                url: request_token_url,
                data:{
                    client_id,
                    client_secrect,
                    code
                },
                headers:{
                    Accept:'application/json'
                }
            })

            if(result.status === 200 && !(result.data && !result.data.error)){ 
                ctx.session.githubAuth = result.data; //修改session，添加新的属性值

                const { access_token,token_type } = result.data; 

                const userInfoResp = await axios({
                    method:'GET',
                    url:'https://api.github.com/user',
                    headers:{
                        "Authorization":`${token_type} ${access_token}`
                    }
                }) 

                console.log('Github Api Resp',userInfoResp.data);
                ctx.session.userInfo = userInfoResp.data;

                ctx.reidrect('/');
            }else{
                const errorMsg = result.data && result.data.error;
                ctx.body = `request token failure ${errorMsg}`;
            }
        }else{
            await next()
        }
    })
}