import rpA from 'request-promise';
class indexModel{
    constructor(ctx){
        this.ctx = ctx;
    };
    getList(limit){
        const option = {
            uri: 'http://localhost/getcourses.php',
            qs: {
                limit:limit || 35
            },
            method: 'GET'
        };
        return new Promise((resolve,reject)=>{
            rpA(option).then(res=>{
                resolve(res);
            })
        })
    };
    setList(body){
        const options = {
            method: 'POST',
            uri: 'http://localhost/setcourses.php',
            body,
            json: true
        };
        rpA(options)
            .then((parsedBody)=>{
                console.log('write2DB=>'+Date.now())
            })
            .catch((err)=>{
                console.log(err)
            });
    }
}
export default indexModel;