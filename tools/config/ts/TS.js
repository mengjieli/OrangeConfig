require("./TSTemp");

function changeNameToNameS(name) {
    return ('' + name.charAt(0)).toLocaleLowerCase() + name.slice(1, name.length);
}

function getClassName(name) {
    return ('' + name.charAt(0)).toLocaleUpperCase() + name.slice(1, name.length);
}

function getAttributeName(name) {
    return name;
}

function getAttributeFunctionName(name) {
    return ('' + name.charAt(0)).toLocaleUpperCase() + name.slice(1, name.length);
}


function changeAttribute(name) {
    return "C_item_" + getAttributeName(name);
}

function changeAttributeToSave(name) {
    return "c_item_" + getAttributeName(name);
}

function getGetFunctionName(className, name) {
    return "Get" + className + "By" + getAttributeName(name);
}

var version = 1.0;

class TSFile {

    constructor(fileName, types, names) {
        this.fileName = fileName;
        this.types = types;
        this.names = names;
    }

    getClassDefine() {
        /**
    export class HitPoint {

        public id:number;
        public x:number;
        public y:number;
        public r:number;
        public role:Role;
        
        public static list:Array<HitPoint> = [];

        public static getById(value:number) {
            let list = HitPoint.list;
            for(let i = 0; i < list.length; i++) {
                if(list[i].id == value) return list[i];
            }
            return null;
        }

        public static decode(list:Array<any>) {
            HitPoint.list.length = 0;
            for(let i = 0; i < list.length; i++) {
                let item = new HitPoint();
                for(let k in list[i]) {
                    item[k] = list[i];
                }
                HitPoint.list.push(item);
            }
        }

        public static link() {
            HitPoint.list.length = 0;
            let list = HitPoint.list;
            for(let i = 0; i < list.length; i++) {
                let item = list[i];
                item.role = Role.getById(item["c_item_role"])
            }
            return null;
        }
    }
         */
        let content = "";
        this.hasLink = false;
        content += "  export class " + getClassName(this.fileName) + " {\n";
        for (let i = 0; i < this.types.length; i++) {
            content += "    public " + getAttributeName(this.names[i]) + ":" + this.getTypeString(this.types[i]) + "\n";
        }
        content += "\n    public static list:Array<" + getClassName(this.fileName) + "> = [];\n\n";
        let linkContent = "";
        linkContent += "    public static link() {\n";
        linkContent += "      let list = " + getClassName(this.fileName) + ".list;\n";
        linkContent += "      for(let i = 0; i < list.length; i++) {\n";
        linkContent += "        let item = list[i];\n";
        for (let i = 0; i < this.types.length; i++) {
            if (!this.types[i].isArray) {
                if (this.types[i].isClass) {
                } else {
                    content += "    public static getBy" + getAttributeFunctionName(this.names[i]) + "(value:" + this.getTypeString(this.types[i]) + "):" + getClassName(this.fileName) + " {\n";
                    content += "      let list = " + getClassName(this.fileName) + ".list;\n";
                    content += "      for(let i = 0; i < list.length; i++) {\n";
                    content += "        if(list[i]." + getAttributeName(this.names[i]) + " == value) return list[i];\n";
                    content += "      }\n";
                    content += "      return null;\n";
                    content += "    }\n\n";
                }
            }
            if (this.types[i].isClass) {
                this.hasLink = true;
                if (this.types[i].isArray) {
                    linkContent += "        for(let n = 0; n < item[\"" + changeAttributeToSave(this.names[i]) + "\"].length; n++) {\n";
                    linkContent += "          item." + getAttributeName(this.names[i]) + "[n] = "
                        + getClassName(this.types[i].className) + ".getById(item[\""
                        + changeAttributeToSave(this.names[i]) + "\"][n]);\n";
                    linkContent += "        }\n";
                    linkContent += "        delete item[\"" + changeAttributeToSave(this.names[i]) + "\"];\n";
                } else {
                    linkContent += "        item." + getAttributeName(this.names[i]) + " = "
                        + getClassName(this.types[i].className) + ".getById(item[\""
                        + changeAttributeToSave(this.names[i]) + "\"]);\n";
                    linkContent += "        delete item[\"" + changeAttributeToSave(this.names[i]) + "\"];\n";
                }
            }
        }
        linkContent += "      }\n";
        linkContent += "      return null;\n";
        linkContent += "    }\n\n";

        content += "    public static decode(list:Array<any>) {\n";
        content += "      " + getClassName(this.fileName) + ".list.length = 0;\n";
        content += "      for(let i = 0; i < list.length; i++) {\n";
        content += "        let item = new " + getClassName(this.fileName) + "();\n";
        content += "          for(let k in list[i]) {\n"
        content += "            item[k] = list[i][k];\n";
        content += "          }\n";
        content += "          " + getClassName(this.fileName) + ".list.push(item);\n"
        content += "      }\n";
        content += "    }\n\n";

        if(this.hasLink) content += linkContent;
        content += "  }\n\n";
        return content;
    }

    getDecodeTable() {
        /**
         * for(let k in tables) {
            if(k == "HitPoint") {
                HitPoint.decode(tables[k]);
            }
        }
         */
        return "      if(k == \"" + getClassName(this.fileName) + "\") " + getClassName(this.fileName) + ".decode(tables[k]." + changeNameToNameS(this.fileName) + ");\n";
    }

    getLinkTable() {
        /**
         *  DecodeHitPoint()
         */
        return this.hasLink ? "    " + getClassName(this.fileName) + ".link();\n" : "";
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
        return ('' + str.charAt(0)).toLocaleUpperCase() + str.slice(1, str.length);
    }

    getTypeString(type) {
        if (type.isArray) {
            if (type.isClass) return "Array<" + getClassName(type.className) + ">";
            else return "Array<" + this.getBaseType(type.baseType) + ">";
        } else if (type.isClass) {
            return getClassName(type.className);
        } else {
            return this.getBaseType(type.baseType);
        }
    }

    getTypeString2(type) {
        if (type.isArray) {
            return "[]" + this.getBaseType(type.baseType);
        } else {
            return this.getBaseType(type.baseType);
        }
    }

    getTableConfig() {
        let name = this.fileName;
        return ('' + name.charAt(0)).toLocaleUpperCase() + name.slice(1, name.length);
    }

    getBaseType(t) {
        if (t == "int" || t == "int32") return "number";
        if (t == "int64") return "number";
        if (t == "uint" || t == "uint32") return "number";
        if (t == "uint64") return "number";
        if (t == "number" || t == "float" || t == "float32") return "number";
        if (t == "float64") return "number";
        if (t == "string") return "string";
    }
}



class TS {
    constructor() {
        this.files = [];
    }

    printGo(params, fileOut, packageName = "main") {
        let classDefine = "";
        let decodeTable = "";
        let linkTable = "";
        for (let i = 0; i < this.files.length; i++) {
            classDefine += this.files[i].getClassDefine();
            decodeTable += this.files[i].getDecodeTable();
            linkTable += this.files[i].getLinkTable();
        }
        let content = GetTSTemp(params.package || "main", classDefine, decodeTable, linkTable);
        (new File(params.tsout ? params.tsout : FilePath.join(params.out, "Config.ts"))).save(content);
    }

    addPage(params, fileName, pageName, list) {
        let outURL = params.out;
        if (list.length < 3) return;
        let types = list[0];
        let names = list[1];
        let descs = list[2];
        let res = [];
        for (let i = 0; i < types.length; i++) types[i] = new Type(types[i]);
        this.files.push(new TSFile(fileName, types, names));
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
                        for (let d = 0; d < item[name].length; d++) {
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

global.TS = TS;