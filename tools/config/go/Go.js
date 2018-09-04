require("./GoTemp");

function changeNameToNameS(name) {
    return ('' + name.charAt(0)).toLocaleLowerCase() + name.slice(1,name.length);
}

function getClassName(name) {
    return ('' + name.charAt(0)).toLocaleUpperCase() + name.slice(1,name.length) + "Config";
}

function getAttributeName(name) {
    return ('' + name.charAt(0)).toLocaleUpperCase() + name.slice(1,name.length);
}

function changeAttribute(name) {
    return "C_item_" + getAttributeName(name);
}

function changeAttributeToSave(name) {
    return "c_item_" + getAttributeName(name);
}

function getGetFunctionName(className,name) {
    return "Get" + className +  "By" + getAttributeName(name);
}

var version = 1.0;

class GoFile {

    constructor(fileName,types,names) {
        this.fileName = fileName;
        this.types = types;
        this.names = names;
    }

    getClassDefine() {
        /**
         type HitPoint struct {
        id int32
        x int32
        y int32
        r int32
    }
    
    type HitPointTable struct {
        HitPoint [] HitPoint
    }
    
    func DecodeHitPoint() []HitPoint {
        v := HitPointTable{}
        Load(tableURL + "HitPoint.json", &v)
        return v.HitPoints
    }

    func GetHitPoint(value int) HitPointConfig {
        for k, v := range tables.HitPoint {
            if(v.id == value) return v
        }
        return nil
    }

    func GetHitPointByX(value int) HitPointConfig {
        for k, v := range tables.HitPoint {
            if(v.X == value) return v
        }
        return nil
    }
         */
        let content = "type " + getClassName(this.fileName) + " struct {\n";
        for(let i = 0; i < this.types.length; i++) {
            if(this.types[i].isClass) {
                content += "  " + changeAttribute(this.names[i]) + " " + this.getTypeString2(this.types[i]) + "\n";
            }
            content += "  " + getAttributeName(this.names[i]) + " " + this.getTypeString(this.types[i]) + "\n";
        }
        content += "}\n\n"
        content += "type " + this.getTableName() + " struct {\n"
        content += "    " + this.getClassName() + " []" + getClassName(this.fileName) + "\n"
        content += "}\n\n";

        content += "func " + this.getFunctionName() + "() {\n";
        content += "  v := " + this.getTableName() + "{}\n";
        content += "  Load(tableURL + \"" + this.fileName + ".json\", &v)\n";
        content += "  tables." + this.getClassName() + " = v." + this.getClassName() + "\n";
        content += "}\n\n";

        let linkContent = "";
        let hasLink = false;
        linkContent += "func " + this.getLinkFunctionName() + "() {\n";
        linkContent += "    for k, _ := range tables." + this.getClassName() + " {\n";
        linkContent += "        var v *" + getClassName(this.fileName) + " = &tables." + this.getClassName() + "[k]\n"
        for(let i = 0; i < this.types.length; i++) {
            if(this.types[i].isClass) {
                hasLink = true;
                if(this.types[i].isArray) {
                    linkContent += "        for k2, v2 := range v." + changeAttribute(this.names[i]) + " {\n";
                    linkContent += "            v." + getAttributeName(this.names[i]) + "[k2] = " + getGetFunctionName(this.types[i].className,"id") + "(v2)\n";
                    linkContent += "        }\n";
                } else {
                    linkContent += "        v." + getAttributeName(this.names[i]) + " = " + getGetFunctionName(this.types[i].className,"id") + "(v." + changeAttribute(this.names[i]) + ")\n";
                }
            }
        }
        linkContent += "    }\n";
        linkContent += "}\n\n";
        if(!hasLink) linkContent = "";
        this.hasLink = hasLink;
        content += linkContent;

        for(let i = 0; i < this.types.length; i++) {
            if(this.types[i].isArray) continue;
            if(this.types[i].isClass) {
                
            } else {
                content += "func " + getGetFunctionName(this.getClassName(),this.names[i]) 
                + " (value " + this.getBaseType(this.types[i].baseType) + ") *" + getClassName(this.fileName) + " {\n";
                content += "    for k, _ := range tables." + this.getClassName() + " {\n";
                content += "        if(tables." + this.getClassName() + "[k]." + getAttributeName(this.names[i]) + " == value) {\n";
                content += "            return &tables." + this.getClassName() + "[k]\n";
                content += "        }\n";
                content += "    }\n";
                content += "    var tmp " + getClassName(this.fileName) + "\n";
                content += "    return &tmp\n";
                content += "}\n\n";
            }
        }
        return content;
    }

    getDecodeTable() {
        /**
         *  DecodeHitPoint()
         */
        return "    " + this.getFunctionName() + "()\n";
    }

    getLinkTable() {
        /**
         *  DecodeHitPoint()
         */
        return this.hasLink?"    " + this.getLinkFunctionName() + "()\n":"";
    }

    getTableName() {
        return this.getClassName() + "Table";
    }

    getFunctionName() {
        return "Decode" + this.getClassName();
    }

    getLinkFunctionName() {
        return "Link" + this.getClassName();
    }

    getClasses() {
        /**
         * HitPoint [] HitPointConfig
         */
        return "  " + this.getClassName() + " []" + getClassName(this.fileName) + "\n";
    }

    getClassName() {
        let str = changeNameToNameS(this.fileName);
        return ('' + str.charAt(0)).toLocaleUpperCase() + str.slice(1,str.length);
    }

    getTypeString(type) {
        if(type.isArray) {
            if(type.isClass) return "[]*" + getClassName(type.className);
            else return "[]" + this.getBaseType(type.baseType);
        } else if(type.isClass) {
            return "*" + getClassName(type.className);
        } else {
            return this.getBaseType(type.baseType);
        }
    }

    getTypeString2(type) {
        if(type.isArray) {
            return "[]" + this.getBaseType(type.baseType);
        } else {
            return this.getBaseType(type.baseType);
        }
    }

    getTableConfig() {
        let name = this.fileName;
        return ('' + name.charAt(0)).toLocaleUpperCase() + name.slice(1,name.length);
    }

    getBaseType(t) {
        if(t == "int" || t == "int32") return "int32";
        if(t == "int64") return "int64";
        if(t == "uint" || t == "uint32") return "uint32";
        if(t == "uint64") return "uint64";
        if(t == "number" || t == "float" || t == "float32") return "float32";
        if(t == "float64") return "float64";
        if(t == "string") return "string";
    }
}



class Go {
    constructor() {
        this.files = [];
    }

    printGo(params,fileOut,packageName="main") {
        let classDefine = "";
        let classes = "";
        let decodeTable = "";
        let linkTable = "";
        for(let i = 0; i < this.files.length; i++) {
            classDefine += this.files[i].getClassDefine();
            classes += this.files[i].getClasses();
            decodeTable += this.files[i].getDecodeTable();
            linkTable += this.files[i].getLinkTable();
        }
        let content = GetGoTemp(params.package||"main",classDefine,classes,decodeTable,linkTable);
        (new File(FilePath.join(params.goout||params.out,"config.go"))).save(content);
    }

    addPage(params, fileName, pageName, list) {
        let outURL = params.out;
        if (list.length < 3) return;
        let types = list[0];
        let names = list[1];
        let descs = list[2];
        let res = [];
        for (let i = 0; i < types.length; i++) types[i] = new Type(types[i]);
        this.files.push(new GoFile(fileName,types,names));
        this.printGo(params);
        for (let i = 3; i < list.length; i++) {
            let items = list[i];
            let item = {};
            for (let t = 0; t < types.length; t++) {
                let name = names[t];
                if (types[t].isClass) {
                    name = changeAttributeToSave(name);
                    if (types[t].isArray) {
                        if (typeof items[t] == "string") {
                            if (items[t].indexOf("[") >= 0) {
                                items[t] = JSON.stringify(JSON.parse(items[t]));
                                items[t] = StringDo.replaceString(items[t], "[", "");
                                items[t] = StringDo.replaceString(items[t], "]", "");
                            }
                        }
                        if (items[t]) {
                            if (types[t].isString()) {
                                if (typeof items[t] == "number") {
                                    item[name] = ["" + items[t]];
                                } else {
                                    let str = items[t];
                                    let sp = "$$$$$__$$$$$";
                                    str = StringDo.replaceString(str, "\\,", sp);
                                    item[name] = str.split(",");
                                    for (let f = 0; f < item[name].length; f++) {
                                        item[name][f] = StringDo.replaceString(item[name][f], sp, ",");
                                    }
                                }
                            } else if (types[t].isNumber()) {
                                // console.log(items[t],typeof items[t]);
                                if (typeof items[t] == "number") {
                                    item[name] = [items[t]];
                                } else {
                                    item[name] = items[t].split(",");
                                    // console.log(name,item[name],items[t],items[t].split(","),items[t].split("0"));
                                }
                                if (item[name]) {
                                    for (let f = 0; f < item[name].length; f++) {
                                        // console.log(item[name][f]);
                                        item[name][f] = parseFloat(item[name][f]);
                                    }
                                }
                                // console.log(item[name]);
                            }
                        } else {
                            item[name] = [];
                        }
                        item[names[t]] = [];
                        for(let d = 0; d < item[name].length; d++) {
                            item[names[t]][d] = null;
                        }
                    } else {
                        if (items[t]) {
                            item[name] = items[t];
                        } else {
                            if (types[t].isString()) {
                                item[name] = "";
                            } else if (types[t].isNumber()) {
                                item[name] = 0;
                            }
                        }
                    }
                } else if (types[t].isArray) {
                    if (items[t]) {
                        if (types[t].isString()) {
                            let str = items[t];
                            let sp = "$$$$$__$$$$$";
                            str = StringDo.replaceString(str, "\\,", sp);
                            item[name] = str.split(",");
                            for (let f = 0; f < item[name].length; f++) {
                                item[name][f] = StringDo.replaceString(item[name][f], sp, ",");
                            }
                        } else if (types[t].isNumber()) {
                            item[name] = items[t].split(",");
                            for (let f = 0; f < item[name].length; f++) {
                                item[name][f] = parseFloat(item[name][f]);
                            }
                        }
                    } else {
                        item[name] = [];
                    }
                } else {
                    if (items[t]) {
                        item[name] = items[t];
                    } else {
                        if (types[t].isString()) {
                            item[name] = "";
                        } else if (types[t].isNumber()) {
                            item[name] = 0;
                        }
                    }
                }
            }
            res.push(item);
        }
        (new File(FilePath.join(outURL, fileName + ".json"))).save("{\"" + changeNameToNameS(fileName) + "\":" + JSON.stringify(res) + ",\"version\":\"" + version + "\"}");
    }
}

global.Go = Go;