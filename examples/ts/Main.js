require("./../../lib/com/requirecom");
require("./src/Config");

var list = (new File("./res/")).readFilesWidthEnd("json");
var tables = {};
for (var i = 0; i < list.length; i++) {
    tables[list[i].name] = JSON.parse(list[i].readContent());
}
config.decodeConfig(tables);
// console.log(JSON.stringify(tables));
console.log(config.Example.getById(1));