import rpA from 'request-promise';
class indexModel{
    constructor(ctx){
        this.ctx = ctx;
    };
    getList(){
        const option = {
            uri: 'http://localhost/getcourses.php',
            method: 'GET'
        };
        return new Promise((resolve,reject)=>{
            rpA(option).then(res=>{
                resolve(res);
            })
        })
    }
}
export default indexModel;