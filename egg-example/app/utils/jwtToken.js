const md5 =require('md5')
module.exports=function(id){
    let obj={
        city:"bj",
        time:new Date().getTime(),
        id
    }
    return md5(JSON.stringify(obj))
}
// var jwt = require('jwt');
// module.exports= function(ind){
//     let payload = {
//         scope: 'client:outgoing?clientName=matt',
//         iss: 'APP_SID',
//         expires: Math.round((new Date().getTime()/1000)) + 3600
//     };
//     token = new jwt.WebToken(JSON.stringify(payload), JSON.stringify({typ:'JWT', alg:'HS256'}));
//     console.log(token.serialize('hmackey'));
//     return token.serialize('hmackey')
// }