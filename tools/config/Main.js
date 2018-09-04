////////////////////////Readme////////////////////////////
//目前支持的语言有  ts  go
//语言参数 --l=ts
//输出目录 --out=./ts
//配置文件目录  --dir=./config
//配置文件 --file=./config/item.xlsx
//////////////////////////////////////////////////////////
require("./../../lib/com/requirecom");
require("./Type");
require("./go/Go");
require("./ts/TS");



var xlsx = require('node-xlsx');

var args = process.argv;

var Language = new Enum(["ts","go"]);
var language = "";
var outURL = "./";
var flag = true;
var files = [];
var params = {};

// console.log(args);

for(let i = 0; i < args.length; i++) {
    let param = args[i];
    if(param.slice(0,2) == "--") {
        if(param.indexOf("=") >= 0) {
            let paramName = param.slice(2,param.indexOf("="));
            let paramValue = param.slice(param.indexOf("=")+1,param.length);
            params[paramName] = paramValue;
            if(paramName == "l") {
                language = paramValue;
                if(!Language.assert(language)) {
                    flag = false;
                    console.log("[Error Param Language] support language is: " + Language)
                    break;
                }
            } else if(paramName == "out") {
                outURL = paramValue;
            } else if(paramName == "dir") {
                files = (new File(paramValue)).readFilesWidthEnd("xlsx");
            } else if(paramName == "file") {
                files = (new File(paramValue));
            } else {
                // flag = false;
                // console.log("[Error Param] " + paramName)
                // break;
            }
        }
    }
}

if(flag) {
    let parser;
    for(let i = 0; i < files.length; i++) {
        var contents = xlsx.parse(files[i].url);
        var content = "";
        let list = contents[0].data;
        if(language == "ts") {
            if(!parser) {
                parser = new TS();
            }
            parser.addPage(params,files[i].name,contents[0].name,contents[0].data);
        } else if(language == "go") {
            if(!parser) {
                parser = new Go();
            }
            parser.addPage(params,files[i].name,contents[0].name,contents[0].data);
        }
    }
}