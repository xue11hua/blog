var router=require('koa-router')();
// 处理数据库（之前已经写好，在mysql.js）
var userModel=require('../lib/mysql.js');
// 加密
var md5=require('md5')
// get '/singin'登录页面
router.get('/singin',async (ctx,next)=>{
    await ctx.render('singin',{
        session:ctx.session,
    })
})
// POST '/singin' 登录页面
router.post('/singin',async (ctx,next)=>{
    console.log(ctx.request.body)
    var user={
        name:ctx.request.body.name,
        pass:ctx.request.body.password
       
    }
    await userModel.findDataByName(user.name)
            .then(result=>{
                // var res=JSON.parse(JSON.stringify(reslut))
                 var res=JSON.parse(JSON.stringify(result))
                console.log(result);
                console.log(res)  
                if(res[0].name==user.name && md5(res[0].name)){
                       ctx.body='true';
                      
                        ctx.session.user=res[0].name
                        ctx.session.id=res[0].id
                       
                        console.log('session',ctx.session)
                        console.log('登录成功')
                }

            }).catch(err=>{
                ctx.body='false'
                console.log('用户名或密码错误!')
                // ctx.redirect('/signin')重定向
            })

})
module.exports=router