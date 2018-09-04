/**
 * 
 * @param {*} classDefine 
 * type HitPoint struct {
        id int32
        x int32
        y int32
        r int32
    }
    
    type HitPointTable struct {
        hitPoints [] HitPoint
    }
    
    func DecodeHitPoint() []HitPoint {
        v := HitPointTable{}
        Load(tableURL + "HitPoint.json", &v)
        return v.hitPoints
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
 * 
 * @param {*} classes 
 * 
        HitPoint []HitPoint
 * @param {*} decodeTable 
 * 
        c.HitPoint = DecodeHitPoint()
 */
global.GetGoTemp = function(package,classDefine,classes,decodeTable,linkTable) {
    return `package ${package}

import (
    "io/ioutil"
    "encoding/json"
)
    
var tableURL = "./"
    
var tables Configs
    
${classDefine}
    
type Configs struct {
${classes}}
    
func DecodeAllConfig(url string) Configs {
    tableURL = url
    tables = Configs{}
${decodeTable}${linkTable}    return tables
}

// func main() {
//     DecodeAllConfig()
//     fmt.Println("hello")
//     fmt.Println(GetRoleById(1))
// }
    
func Load(filename string, v interface{}) {
    //ReadFile函数会读取文件的全部内容，并将结果以[]byte类型返回
    data, err := ioutil.ReadFile(filename)
    if err != nil {
        return
    }
    //读取的数据为json格式，需要进行解码
    err = json.Unmarshal(data, v)
    if err != nil {
        return
    }
}
`;
}