
namespace config {

  export class AI {
    public id:number
    public type:number
    public value1:number
    public value2:number
    public value3:number

    public static list:Array<AI> = [];

    public static getById(value:number):AI {
      let list = AI.list;
      for(let i = 0; i < list.length; i++) {
        if(list[i].id == value) return list[i];
      }
      return null;
    }

    public static getByType(value:number):AI {
      let list = AI.list;
      for(let i = 0; i < list.length; i++) {
        if(list[i].type == value) return list[i];
      }
      return null;
    }

    public static getByValue1(value:number):AI {
      let list = AI.list;
      for(let i = 0; i < list.length; i++) {
        if(list[i].value1 == value) return list[i];
      }
      return null;
    }

    public static getByValue2(value:number):AI {
      let list = AI.list;
      for(let i = 0; i < list.length; i++) {
        if(list[i].value2 == value) return list[i];
      }
      return null;
    }

    public static getByValue3(value:number):AI {
      let list = AI.list;
      for(let i = 0; i < list.length; i++) {
        if(list[i].value3 == value) return list[i];
      }
      return null;
    }

    public static decode(list:Array<any>) {
      AI.list.length = 0;
      for(let i = 0; i < list.length; i++) {
        let item = new AI();
          for(let k in list[i]) {
            item[k] = list[i][k];
          }
          AI.list.push(item);
      }
    }

  }

  export class Avatar {
    public id:number
    public type:number
    public url:string
    public url2:string

    public static list:Array<Avatar> = [];

    public static getById(value:number):Avatar {
      let list = Avatar.list;
      for(let i = 0; i < list.length; i++) {
        if(list[i].id == value) return list[i];
      }
      return null;
    }

    public static getByType(value:number):Avatar {
      let list = Avatar.list;
      for(let i = 0; i < list.length; i++) {
        if(list[i].type == value) return list[i];
      }
      return null;
    }

    public static getByUrl(value:string):Avatar {
      let list = Avatar.list;
      for(let i = 0; i < list.length; i++) {
        if(list[i].url == value) return list[i];
      }
      return null;
    }

    public static getByUrl2(value:string):Avatar {
      let list = Avatar.list;
      for(let i = 0; i < list.length; i++) {
        if(list[i].url2 == value) return list[i];
      }
      return null;
    }

    public static decode(list:Array<any>) {
      Avatar.list.length = 0;
      for(let i = 0; i < list.length; i++) {
        let item = new Avatar();
          for(let k in list[i]) {
            item[k] = list[i][k];
          }
          Avatar.list.push(item);
      }
    }

  }

  export class Common {
    public id:number
    public value1:number
    public value2:string
    public desc:string
    public ints:Array<number>
    public strings:Array<string>

    public static list:Array<Common> = [];

    public static getById(value:number):Common {
      let list = Common.list;
      for(let i = 0; i < list.length; i++) {
        if(list[i].id == value) return list[i];
      }
      return null;
    }

    public static getByValue1(value:number):Common {
      let list = Common.list;
      for(let i = 0; i < list.length; i++) {
        if(list[i].value1 == value) return list[i];
      }
      return null;
    }

    public static getByValue2(value:string):Common {
      let list = Common.list;
      for(let i = 0; i < list.length; i++) {
        if(list[i].value2 == value) return list[i];
      }
      return null;
    }

    public static getByDesc(value:string):Common {
      let list = Common.list;
      for(let i = 0; i < list.length; i++) {
        if(list[i].desc == value) return list[i];
      }
      return null;
    }

    public static decode(list:Array<any>) {
      Common.list.length = 0;
      for(let i = 0; i < list.length; i++) {
        let item = new Common();
          for(let k in list[i]) {
            item[k] = list[i][k];
          }
          Common.list.push(item);
      }
    }

  }

  export class Example {
    public id:number
    public item2:number
    public item3:number
    public item4:number
    public item5:string
    public item6:Array<number>
    public item7:Array<string>
    public player:Role
    public enemies:Array<Role>

    public static list:Array<Example> = [];

    public static getById(value:number):Example {
      let list = Example.list;
      for(let i = 0; i < list.length; i++) {
        if(list[i].id == value) return list[i];
      }
      return null;
    }

    public static getByItem2(value:number):Example {
      let list = Example.list;
      for(let i = 0; i < list.length; i++) {
        if(list[i].item2 == value) return list[i];
      }
      return null;
    }

    public static getByItem3(value:number):Example {
      let list = Example.list;
      for(let i = 0; i < list.length; i++) {
        if(list[i].item3 == value) return list[i];
      }
      return null;
    }

    public static getByItem4(value:number):Example {
      let list = Example.list;
      for(let i = 0; i < list.length; i++) {
        if(list[i].item4 == value) return list[i];
      }
      return null;
    }

    public static getByItem5(value:string):Example {
      let list = Example.list;
      for(let i = 0; i < list.length; i++) {
        if(list[i].item5 == value) return list[i];
      }
      return null;
    }

    public static decode(list:Array<any>) {
      Example.list.length = 0;
      for(let i = 0; i < list.length; i++) {
        let item = new Example();
          for(let k in list[i]) {
            item[k] = list[i][k];
          }
          Example.list.push(item);
      }
    }

    public static link() {
      let list = Example.list;
      for(let i = 0; i < list.length; i++) {
        let item = list[i];
        item.player = Role.getById(item["c_item_player"]);
        delete item["c_item_player"];
        for(let n = 0; n < item["c_item_enemies"].length; n++) {
          item.enemies[n] = Role.getById(item["c_item_enemies"][n]);
        }
        delete item["c_item_enemies"];
      }
      return null;
    }

  }

  export class HitPoint {
    public id:number
    public x:number
    public y:number
    public r:number

    public static list:Array<HitPoint> = [];

    public static getById(value:number):HitPoint {
      let list = HitPoint.list;
      for(let i = 0; i < list.length; i++) {
        if(list[i].id == value) return list[i];
      }
      return null;
    }

    public static getByX(value:number):HitPoint {
      let list = HitPoint.list;
      for(let i = 0; i < list.length; i++) {
        if(list[i].x == value) return list[i];
      }
      return null;
    }

    public static getByY(value:number):HitPoint {
      let list = HitPoint.list;
      for(let i = 0; i < list.length; i++) {
        if(list[i].y == value) return list[i];
      }
      return null;
    }

    public static getByR(value:number):HitPoint {
      let list = HitPoint.list;
      for(let i = 0; i < list.length; i++) {
        if(list[i].r == value) return list[i];
      }
      return null;
    }

    public static decode(list:Array<any>) {
      HitPoint.list.length = 0;
      for(let i = 0; i < list.length; i++) {
        let item = new HitPoint();
          for(let k in list[i]) {
            item[k] = list[i][k];
          }
          HitPoint.list.push(item);
      }
    }

  }

  export class Level {
    public id:number
    public player:Role
    public enemies:Array<Role>
    public color:number
    public color1:number
    public scale:number

    public static list:Array<Level> = [];

    public static getById(value:number):Level {
      let list = Level.list;
      for(let i = 0; i < list.length; i++) {
        if(list[i].id == value) return list[i];
      }
      return null;
    }

    public static getByColor(value:number):Level {
      let list = Level.list;
      for(let i = 0; i < list.length; i++) {
        if(list[i].color == value) return list[i];
      }
      return null;
    }

    public static getByColor1(value:number):Level {
      let list = Level.list;
      for(let i = 0; i < list.length; i++) {
        if(list[i].color1 == value) return list[i];
      }
      return null;
    }

    public static getByScale(value:number):Level {
      let list = Level.list;
      for(let i = 0; i < list.length; i++) {
        if(list[i].scale == value) return list[i];
      }
      return null;
    }

    public static decode(list:Array<any>) {
      Level.list.length = 0;
      for(let i = 0; i < list.length; i++) {
        let item = new Level();
          for(let k in list[i]) {
            item[k] = list[i][k];
          }
          Level.list.push(item);
      }
    }

    public static link() {
      let list = Level.list;
      for(let i = 0; i < list.length; i++) {
        let item = list[i];
        item.player = Role.getById(item["c_item_player"]);
        delete item["c_item_player"];
        for(let n = 0; n < item["c_item_enemies"].length; n++) {
          item.enemies[n] = Role.getById(item["c_item_enemies"][n]);
        }
        delete item["c_item_enemies"];
      }
      return null;
    }

  }

  export class Role {
    public id:number
    public readyTime:number
    public ai:AI
    public avatar:Avatar
    public hitPoints:Array<HitPoint>
    public scale:number

    public static list:Array<Role> = [];

    public static getById(value:number):Role {
      let list = Role.list;
      for(let i = 0; i < list.length; i++) {
        if(list[i].id == value) return list[i];
      }
      return null;
    }

    public static getByReadyTime(value:number):Role {
      let list = Role.list;
      for(let i = 0; i < list.length; i++) {
        if(list[i].readyTime == value) return list[i];
      }
      return null;
    }

    public static getByScale(value:number):Role {
      let list = Role.list;
      for(let i = 0; i < list.length; i++) {
        if(list[i].scale == value) return list[i];
      }
      return null;
    }

    public static decode(list:Array<any>) {
      Role.list.length = 0;
      for(let i = 0; i < list.length; i++) {
        let item = new Role();
          for(let k in list[i]) {
            item[k] = list[i][k];
          }
          Role.list.push(item);
      }
    }

    public static link() {
      let list = Role.list;
      for(let i = 0; i < list.length; i++) {
        let item = list[i];
        item.ai = AI.getById(item["c_item_ai"]);
        delete item["c_item_ai"];
        item.avatar = Avatar.getById(item["c_item_avatar"]);
        delete item["c_item_avatar"];
        for(let n = 0; n < item["c_item_hitPoints"].length; n++) {
          item.hitPoints[n] = HitPoint.getById(item["c_item_hitPoints"][n]);
        }
        delete item["c_item_hitPoints"];
      }
      return null;
    }

  }



  export function decodeConfig(tables) {
    for(let k in tables) {
      if(k == "AI") AI.decode(tables[k].aI);
      if(k == "Avatar") Avatar.decode(tables[k].avatar);
      if(k == "Common") Common.decode(tables[k].common);
      if(k == "Example") Example.decode(tables[k].example);
      if(k == "HitPoint") HitPoint.decode(tables[k].hitPoint);
      if(k == "Level") Level.decode(tables[k].level);
      if(k == "Role") Role.decode(tables[k].role);
    }
    Example.link();
    Level.link();
    Role.link();
  }
}
