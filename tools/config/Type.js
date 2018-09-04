class Type {

    constructor(str) {
        //int	int	(AI)int	(Avatar)int	(HitPoint)Array(int)	number
        str = StringDo.replaceString(str," ","");
        this.isArray = false;
        this.isClass = false;
        this.className = "";
        this.baseType = "";
        this.error = false;
        if(str.charAt(0) == "(") {
            this.isClass = true;
            this.className = str.slice(1,str.indexOf(")"));
            str = str.slice(str.indexOf(")") + 1,str.length);
        }
        if(str.indexOf("(") >= 0) {
            this.isArray = true;
            this.baseType = str.slice(str.indexOf("(") + 1,str.length-1);
        } else {
            this.baseType = str;
        }
        if(!this.isBaseType(this.baseType)) {
            console.log("错误的基本类型：" + this.baseType);
            this.error = true;
        }
    }

    isBaseType(type) {
        return type == "int" || type == "int32" || type == "int64" || type == "uint" || type == "uint32"   || type == "uint64" ||
        type == "number" || type == "float" || type == "float32" || type == "float64" ||
        type == "string" ? true : false;
    }

    isString() {
        return this.baseType=="string"?true:false;
    }

    isNumber() {
        let type = this.baseType;
        if(type == "int" || type == "int32" || type == "int64" || type == "uint" || type == "uint32"   || type == "uint64" ||
            type == "number" || type == "float" || type == "float32" || type == "float64") return true;
        return false;
    }

    getTypeString(type,language) {
        if(language == "ts") {
            if(type == "int" || type == "int32" || type == "int64" || type == "uint" || type == "uint32"   || type == "uint64" ||
            type == "number" || type == "float" || type == "float32" || type == "float64") return "number";
            if(type == "string") return "string";
        }
    }
}

global.Type = Type;