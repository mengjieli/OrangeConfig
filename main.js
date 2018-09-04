const child_process = require('child_process');

var args = process.argv;
var ps = [];

for(let i = 0; i < args.length; i++) {
    let param = args[i];
    if(param.slice(0,2) == "--") {
        if(param.indexOf("=") >= 0) {
            let paramName = param.slice(2,param.indexOf("="));
            let paramValue = param.slice(param.indexOf("=")+1,param.length);
            if(paramName && paramValue) {
                ps.push(param);
            }
        }
    }
}

var workerProcess = child_process.spawn('node', ["./tools/config/Main.js"].concat(ps));
 
workerProcess.stdout.on('data', function (data) {
   console.log(data+'');
});

workerProcess.stderr.on('data', function (data) {
   console.log(data+'');
});

// workerProcess.on('close', function (code) {
//    console.log('子进程已退出，退出码 '+code);
// });