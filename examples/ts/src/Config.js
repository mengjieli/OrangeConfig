var config;
(function (config) {
    var AI = /** @class */ (function () {
        function AI() {
        }
        AI.getById = function (value) {
            var list = AI.list;
            for (var i = 0; i < list.length; i++) {
                if (list[i].id == value)
                    return list[i];
            }
            return null;
        };
        AI.getByType = function (value) {
            var list = AI.list;
            for (var i = 0; i < list.length; i++) {
                if (list[i].type == value)
                    return list[i];
            }
            return null;
        };
        AI.getByValue1 = function (value) {
            var list = AI.list;
            for (var i = 0; i < list.length; i++) {
                if (list[i].value1 == value)
                    return list[i];
            }
            return null;
        };
        AI.getByValue2 = function (value) {
            var list = AI.list;
            for (var i = 0; i < list.length; i++) {
                if (list[i].value2 == value)
                    return list[i];
            }
            return null;
        };
        AI.getByValue3 = function (value) {
            var list = AI.list;
            for (var i = 0; i < list.length; i++) {
                if (list[i].value3 == value)
                    return list[i];
            }
            return null;
        };
        AI.decode = function (list) {
            AI.list.length = 0;
            for (var i = 0; i < list.length; i++) {
                var item = new AI();
                for (var k in list[i]) {
                    item[k] = list[i][k];
                }
                AI.list.push(item);
            }
        };
        AI.list = [];
        return AI;
    }());
    config.AI = AI;
    var Avatar = /** @class */ (function () {
        function Avatar() {
        }
        Avatar.getById = function (value) {
            var list = Avatar.list;
            for (var i = 0; i < list.length; i++) {
                if (list[i].id == value)
                    return list[i];
            }
            return null;
        };
        Avatar.getByType = function (value) {
            var list = Avatar.list;
            for (var i = 0; i < list.length; i++) {
                if (list[i].type == value)
                    return list[i];
            }
            return null;
        };
        Avatar.getByUrl = function (value) {
            var list = Avatar.list;
            for (var i = 0; i < list.length; i++) {
                if (list[i].url == value)
                    return list[i];
            }
            return null;
        };
        Avatar.getByUrl2 = function (value) {
            var list = Avatar.list;
            for (var i = 0; i < list.length; i++) {
                if (list[i].url2 == value)
                    return list[i];
            }
            return null;
        };
        Avatar.decode = function (list) {
            Avatar.list.length = 0;
            for (var i = 0; i < list.length; i++) {
                var item = new Avatar();
                for (var k in list[i]) {
                    item[k] = list[i][k];
                }
                Avatar.list.push(item);
            }
        };
        Avatar.list = [];
        return Avatar;
    }());
    config.Avatar = Avatar;
    var Common = /** @class */ (function () {
        function Common() {
        }
        Common.getById = function (value) {
            var list = Common.list;
            for (var i = 0; i < list.length; i++) {
                if (list[i].id == value)
                    return list[i];
            }
            return null;
        };
        Common.getByValue1 = function (value) {
            var list = Common.list;
            for (var i = 0; i < list.length; i++) {
                if (list[i].value1 == value)
                    return list[i];
            }
            return null;
        };
        Common.getByValue2 = function (value) {
            var list = Common.list;
            for (var i = 0; i < list.length; i++) {
                if (list[i].value2 == value)
                    return list[i];
            }
            return null;
        };
        Common.getByDesc = function (value) {
            var list = Common.list;
            for (var i = 0; i < list.length; i++) {
                if (list[i].desc == value)
                    return list[i];
            }
            return null;
        };
        Common.decode = function (list) {
            Common.list.length = 0;
            for (var i = 0; i < list.length; i++) {
                var item = new Common();
                for (var k in list[i]) {
                    item[k] = list[i][k];
                }
                Common.list.push(item);
            }
        };
        Common.list = [];
        return Common;
    }());
    config.Common = Common;
    var HitPoint = /** @class */ (function () {
        function HitPoint() {
        }
        HitPoint.getById = function (value) {
            var list = HitPoint.list;
            for (var i = 0; i < list.length; i++) {
                if (list[i].id == value)
                    return list[i];
            }
            return null;
        };
        HitPoint.getByX = function (value) {
            var list = HitPoint.list;
            for (var i = 0; i < list.length; i++) {
                if (list[i].x == value)
                    return list[i];
            }
            return null;
        };
        HitPoint.getByY = function (value) {
            var list = HitPoint.list;
            for (var i = 0; i < list.length; i++) {
                if (list[i].y == value)
                    return list[i];
            }
            return null;
        };
        HitPoint.getByR = function (value) {
            var list = HitPoint.list;
            for (var i = 0; i < list.length; i++) {
                if (list[i].r == value)
                    return list[i];
            }
            return null;
        };
        HitPoint.decode = function (list) {
            HitPoint.list.length = 0;
            for (var i = 0; i < list.length; i++) {
                var item = new HitPoint();
                for (var k in list[i]) {
                    item[k] = list[i][k];
                }
                HitPoint.list.push(item);
            }
        };
        HitPoint.list = [];
        return HitPoint;
    }());
    config.HitPoint = HitPoint;
    var Level = /** @class */ (function () {
        function Level() {
        }
        Level.getById = function (value) {
            var list = Level.list;
            for (var i = 0; i < list.length; i++) {
                if (list[i].id == value)
                    return list[i];
            }
            return null;
        };
        Level.getByColor = function (value) {
            var list = Level.list;
            for (var i = 0; i < list.length; i++) {
                if (list[i].color == value)
                    return list[i];
            }
            return null;
        };
        Level.getByColor1 = function (value) {
            var list = Level.list;
            for (var i = 0; i < list.length; i++) {
                if (list[i].color1 == value)
                    return list[i];
            }
            return null;
        };
        Level.getByScale = function (value) {
            var list = Level.list;
            for (var i = 0; i < list.length; i++) {
                if (list[i].scale == value)
                    return list[i];
            }
            return null;
        };
        Level.decode = function (list) {
            Level.list.length = 0;
            for (var i = 0; i < list.length; i++) {
                var item = new Level();
                for (var k in list[i]) {
                    item[k] = list[i][k];
                }
                Level.list.push(item);
            }
        };
        Level.link = function () {
            var list = Level.list;
            for (var i = 0; i < list.length; i++) {
                var item = list[i];
                item.player = Role.getById(item["c_item_player"]);
                for (var n = 0; n < item["c_item_enemies"].length; n++) {
                    item.enemies[n] = Role.getById(item["c_item_enemies"][n]);
                }
            }
            return null;
        };
        Level.list = [];
        return Level;
    }());
    config.Level = Level;
    var Role = /** @class */ (function () {
        function Role() {
        }
        Role.getById = function (value) {
            var list = Role.list;
            for (var i = 0; i < list.length; i++) {
                if (list[i].id == value)
                    return list[i];
            }
            return null;
        };
        Role.getByReadyTime = function (value) {
            var list = Role.list;
            for (var i = 0; i < list.length; i++) {
                if (list[i].readyTime == value)
                    return list[i];
            }
            return null;
        };
        Role.getByScale = function (value) {
            var list = Role.list;
            for (var i = 0; i < list.length; i++) {
                if (list[i].scale == value)
                    return list[i];
            }
            return null;
        };
        Role.decode = function (list) {
            Role.list.length = 0;
            for (var i = 0; i < list.length; i++) {
                var item = new Role();
                for (var k in list[i]) {
                    item[k] = list[i][k];
                }
                Role.list.push(item);
            }
        };
        Role.link = function () {
            var list = Role.list;
            for (var i = 0; i < list.length; i++) {
                var item = list[i];
                item.ai = AI.getById(item["c_item_ai"]);
                item.avatar = Avatar.getById(item["c_item_avatar"]);
                for (var n = 0; n < item["c_item_hitPoints"].length; n++) {
                    item.hitPoints[n] = HitPoint.getById(item["c_item_hitPoints"][n]);
                }
            }
            return null;
        };
        Role.list = [];
        return Role;
    }());
    config.Role = Role;
    function decodeConfig(tables) {
        for (var k in tables) {
            if (k == "AI")
                AI.decode(tables[k].aI);
            if (k == "Avatar")
                Avatar.decode(tables[k].avatar);
            if (k == "Common")
                Common.decode(tables[k].common);
            if (k == "HitPoint")
                HitPoint.decode(tables[k].hitPoint);
            if (k == "Level")
                Level.decode(tables[k].level);
            if (k == "Role")
                Role.decode(tables[k].role);
        }
        Level.link();
        Role.link();
    }
    config.decodeConfig = decodeConfig;
})(config || (config = {}));
global.config = config;