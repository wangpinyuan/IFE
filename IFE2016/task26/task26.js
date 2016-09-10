// 中介
var mediator = {
    ships:[null,null,null,null],
    // 添加飞船
    addShip:function(ship,index){
        this.ships[index] = ship;
    },
    // 接受消息
    receive:function(signal){
        var self = this;
        if(signal.length == 16){
            DC.receive(signal);
        }else{
            var ships = self.ships;
            self.publish(signal);
            // console.log(signal.substring(4))
            if (signal.substring(4) == "1100") {
                ships[parseInt(signal.substring(0,4),2)-1] = null;
            }
        }
    },
    // 消息发送给  !所有! 飞船
    publish:function(signal){
        for(var i in this.ships){
            if(this.ships[i] && this.ships[i] instanceof Ship){
                this.ships[i].receive(signal);
            }
        }
    }
};
// 飞船
function Ship(index){
    // 编号(1-4)
    this.index = index;
    // transform角度
    this.rotate = 0;
    // 能源
    this.power = 100;
    // 飞船速度(deg)
    this.speed = 2;
    // 能源消耗速度
    this.consume = -5;
    // 能源恢复速度
    this.restore = 2;
    // 飞船状态,0为停止1为飞行
    this.state = 0;
    // 飞船DOM对象
    this.ship;
    // 控制台对象
    this.controlBar;
    // 时间间隔
    this.timer;
    //广播
    this.publisher;
};
Ship.prototype = {
createSelf:function(signal) {
    // 创建飞船
    // console.log(signal)
    var earth = document.getElementById("box");
    var ship = document.createElement("div");
    ship.id = "ship"+this.index;
    ship.innerHTML = parseInt(this.power)+"%";
    earth.appendChild(ship);
    // 创建控制按钮
    var cmd = document.getElementById("buttons");
    var controlBar = document.createElement("div");
    var number = document.createElement("span");
    var startBtn = document.createElement("button");
    var stopBtn = document.createElement("button");
    var destroyBtn = document.createElement("button");
    number.innerHTML = this.index+"号飞船";
    startBtn.innerHTML   = "开始飞行";
    stopBtn.innerHTML    = "停止飞行";
    destroyBtn.innerHTML = "销毁";
    cmd.appendChild(controlBar);
    controlBar.appendChild(number);
    controlBar.appendChild(startBtn);
    controlBar.appendChild(stopBtn);
    controlBar.appendChild(destroyBtn);

    this.ship = ship;
    this.controlBar = controlBar;
    this.speed      = parseInt(signal.speed);
    this.restore    = parseInt(signal.restore);
    this.consume    = parseInt(signal.consume);
    consoleText.addText("创建"+this.index+"号飞船");
    // 向太空发送状态
    var self = this;
    this.publisher  = setInterval(function () {
        self.publish();
    }, 1000);
},
fly:function(){
    if (this.state == 1) {
        return false;
    }
    this.state = 1;
    var self = this;
    //控制div移动
    clearInterval(this.timer);
    this.timer = setInterval(function(){
        if(self.power < 1) {
            self.stop();
            return ;
        }
    //fly状态下 能量和角度 的改变
    self.power += (self.consume + self.restore)/10;

    self.ship.innerHTML = parseInt(self.power)+"%";
    self.rotate += self.speed;
    if(self.rotate>=360){
        self.rotate = 0;
    }
    self.ship.style.transform = "rotate("+self.rotate+"deg)";//控制div角度改变
    },80);
    // 
    consoleText.addText(self.index+"号飞船开始飞行");
},
stop:function(){
    console.log("stop")
    if (this.state == 0) {
        return false;
    }
    this.state = 0;
    var self = this;
    // 停止状态下 开始恢复能量
    clearInterval(self.timer);
    this.timer = setInterval(function(){
        self.power += self.restore/10;
        self.ship.innerHTML = parseInt(self.power)+"%";
        if(self.power>=100){
            self.power = 100;
            clearInterval(self.timer);
            return ;
        }
    },80);
    // 
    consoleText.addText(self.index+"号飞船停止飞行");

},
// 
destroySelf:function() {
    var earth = document.getElementById("box");
    this.stop();
    this.state = 1100;
    // 飞船不再发送状态
    var self = this;
    setTimeout(function(){
        clearInterval(self.publisher);
        earth.removeChild(self.ship);
        consoleText.addText(self.index+"号飞船已销毁");
    },1000);
},
// 所有飞船接受消息   index相同的获取消息
receive:function(signal) {
    signal = this.adapter(signal);
	if (this.index != signal.index) {
		return false;
	}
	var command = signal.command;
	switch(command){
		case 'fly':
			this.fly();
			break;
		case 'stop':
			this.stop();
			break;
		case 'destroy':
			this.destroySelf();
			break;
	}
},
// 接收 - 指令 二进制转化为JSON
// 发送 - 指令 JSON 转化为二进制
adapter:function(signal,p){
    if(p){
        // console.log("执行飞船的adapter")
        switch(signal.index){
            case 1:
                var index = "0001";
                break;
            case 2:
                var index = "0010";
                break;
            case 3:
                var index = "0011";
                break;
            case 4:
                var index = "0100";
                break;
        };
        switch(signal.state){
            case 1:
                var state = "0001";
                break;
            case 0:
                var state = "0010";
                break;
            case 1100:
                var state = "1100";
                break;
        };
        // 保证能量为八位！
        var patch = "00000000";
        patch = patch.slice(0,patch.length - parseInt(signal.power.toString(2)).toString().length)
        var power = patch+parseInt(signal.power.toString(2));

        return index+state+power;
    }else{
        var result = {};
        switch(signal.substring(4)){
            case "0001":
                result.command = "fly";
                break;
            case "0010":
                result.command = "stop";
                break;
            case "1100":
                result.command = "destroy";
                break;
        }
        result.index = parseInt(signal.substring(0,4),2);
        return result;
    }
},
// 发送信息
publish:function(signal){
    var signal = {
        index:this.index,
        state:this.state,
        power:this.power

    };
    var result = this.adapter(signal,1);
    mediator.receive(result); 
}
};
// 指挥官
var Commander = function(){};
// 
Commander.prototype = {
command:function(signal){
	mediator.receive(this.adapter(signal));
},
// 指令 JSON转化为二进制
adapter:function(signal){
    signal.index = signal.index.toString(2);
    var patch = "0000";
    patch = patch.substring(0,patch.length - signal.index.length);
    switch(signal.command){
        case"fly":
            var command = "0001";
            break;
        case"stop":
            var command = "0010";
            break;
        case"destroy":
            var command = "1100";
            break;
    }
    return patch+signal.index+command;
}
};

// 控制台
var consoleText = {
addText:function(text){
	var consoleText = document.getElementById("console-text");
	var date = new Date();
	var time = date.getFullYear()+"-"+getTime(date.getMonth()+1)+"-"+getTime(date.getDate())+" "+getTime(date.getHours())+":"+getTime(date.getMinutes())+":"+getTime(date.getSeconds())+" ";
	consoleText.innerHTML += "<p>"+time+text+"</p>";
    consoleText.scrollTop = consoleText.scrollHeight;
	// 
	function getTime(data){
		if (data<10) {
			return "0"+data;
		}else{
			return data;
		}
	}
	//
},
move:function(){ 
    var startX = 0;
    var startY = 0;
    var draging = false;
    var title = document.getElementById("console-title");
    var consoleDiv = document.getElementById("console");
    addHandler(title,"mousedown",function(event){
        startX = event.pageX - consoleDiv.offsetLeft;
        startY = event.pageY - consoleDiv.offsetTop;
        draging = true;
    });

    addHandler(document,"mousemove",function(event){
        var nowMouseX = event.pageX;
        var nowMouseY = event.pageY;
        var nowDivX = 0;
        var nowDivY = 0;
        if (draging === true) {
            nowDivX = nowMouseX - startX;
            nowDivY = nowMouseY - startY;
            var scrollW = document.documentElement.clientWidth;
            var scrollH = document.documentElement.clientHeight;
            var divW = consoleDiv.offsetWidth;
            var divH = consoleDiv.offsetHeight;
            var maxX = scrollW - divW - 2;
            var maxY = scrollH - divH - 2;

            nowDivX = Math.min( maxX , Math.max(0,nowDivX));
            nowDivY = Math.min( maxY , Math.max(0,nowDivY));

            consoleDiv.style.left = nowDivX + "px";
            consoleDiv.style.top = nowDivY  + "px";
        }
    },false);

    addHandler(title,"mouseup",function(){
        draging = false;

    });
}
};
// 地面接收信息
var DC = {
    adapter:function(signal){
        switch(signal.substring(0,4)){
            case "0001":
                var index = 1;
                break;
            case "0010":
                var index = 2;
                break;
            case "0011":
                var index = 3;
                break;
            case "0100":
                var index = 4;
                break;
        }
        switch(signal.substring(4,8)){
            case "0001":
                var state = "飞行状态";
                break;
            case "0010":
                var state = "停止状态";
                break;
            case "1100":
                var state = "已摧毁";
                break;
        }
        var power = parseInt(signal.substring(8).substring(1),2);
        var result = {index:index,state:state,power:power};
        this.show(result);
    },
    receive:function(signal){
        this.adapter(signal);
    },
    show:function(signal){
        var tr = document.getElementById("table").getElementsByTagName("tr");
        var td = tr[signal.index].getElementsByTagName("td");
        td[3].innerHTML = signal.state;
        td[4].innerHTML = signal.power;
    }
};



(function(){
	var commander = new Commander();
	var cmd = document.getElementById("buttons");
	// 获取按钮事件
	addHandler(cmd,"click",function(event){
        // 飞船型号选择
        var radio1 = document.getElementById("speed").getElementsByTagName("input");
        var radio2 = document.getElementById("restore").getElementsByTagName("input");
        var speed = 0;
        var consume = 0;
        var restore = 0;
        // 按钮事件
        var btn = event.target;
        var cmdBar = btn.parentNode;
        var index = -1;
        var commands = ["fly","stop","destroy"];
        //创建飞船
        if (btn.id == "createShip") {
            // 型号选择
            for (var i = 0; i < radio1.length; i++) {
                if(radio1[i].checked){
                    speed = radio1[i].dataset.speed;
                    consume = radio1[i].dataset.consume;
                }
            }
            for (var i = 0; i < radio2.length; i++) {
                if(radio2[i].checked){
                    restore = radio2[i].dataset.restore;
                }
            }
            //创建飞船 
            for (var i = 0; i < 4; i++) {
                if(!mediator.ships[i]){
                    console.log("创建新飞船");
                    ship = new Ship(i+1);
                    ship.createSelf({
                        speed:speed,
                        consume:consume,
                        restore:restore
                    });
                    mediator.addShip(ship,i);
                    //创建飞船状态表格
                    var table = document.getElementById("table");
                    var trSum = table.getElementsByTagName("tr").length;
                    if (trSum <= 4) {
                        var tr = document.createElement("tr");
                        for (var j = 0; j < 5; j++) {
                            var td = document.createElement("td");
                            tr.appendChild(td);
                        }
                        table.appendChild(tr);
                    }
                    var tds = table.getElementsByTagName("tr")[ship.index].getElementsByTagName("td");
                    switch(ship.speed){
                    	case 2:
                    		var speed = "前进号";
                    		break;
                    	case 4:
                    		var speed = "奔腾号";
                    		break;
                    	case 6:
                    		var speed = "超越号";
                    		break;
                    }
                    switch(ship.restore){
                    	case 2:
                    		var restore = "劲量型";
                    		break;
                    	case 3:
                    		var restore = "光能型";
                    		break;
                    	case 4:
                    		var restore = "永久型";
                    		break;
                    }
                    tds[0].innerHTML = ship.index + "号";
                    tds[1].innerHTML = speed;
                    tds[2].innerHTML = restore;
                    break;
                }
            }
            
        }else if(btn.tagName == "BUTTON"){//绑定事件
            // 根据index向BUS发送不同指令
            switch(btn.innerHTML){
            	case '开始飞行':
            		index = 0;
            		break;
            	case '停止飞行':
            		index = 1;
            		break;
            	case '销毁':
            		index = 2;
            		break;
            }
            // 移除对应按钮
			if (index == 2) {
                cmd.removeChild(btn.parentNode);

			}
			// 消息发送给 太空中介
            commander.command({
                index: parseInt(cmdBar.getElementsByTagName("span")[0].innerHTML.substr(0, 1)),
                command: commands[index]
            });
		}
	});
    consoleText.move();
})();
// 
function addHandler(element, type, handler) {
    if(element.addEventListener) {
        addHandler = function(element, type, handler) {
            element.addEventListener(type, handler, false);
        };
    } else if (element.attachEvent) {
        addHandler = function(element, type, handler) {
            element.attachEvent("on"+type, handler);
        };
    } else {
        addHandler = function(element, type, handler) {
            element["on"+type] = handler;
        };
    }
    return addHandler(element, type, handler);
};