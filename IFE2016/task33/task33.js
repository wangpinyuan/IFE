// 2016-8-30 By Y
var Block = {

	block : document.getElementById("block"),
	direction:"up",
	//接受指令
	getCommand:function(instruction,distance){
			switch(instruction){
		 		case "go":
		 			this.move(distance);
		 			break;
		 		case "turn left":
		 			this.turnLeft();
		 			break;
		 		case "turn right":
		 			this.turnRight();
		 			break;
		 		case "turn back":
		 			this.turnBack();
		 			break;
		 		case "build":
		 			this.buildWall();
		 			break;
		 		case "bru":
		 			this.bruWall(distance);
		 			break;
		 		case "move":
		 			this.moveTo(distance);
		 			break;
	 		}	
	},
	// 获取当前方向
	getDeg:function(){
		var nowDeg = parseInt(block.style.transform.match(/[-]{0,1}\d+/g)[0]);
		return nowDeg;
	},
	// 转向
	turnLeft:function (){
		// console.log("left")
		block.style.transform = "rotate("+(this.getDeg()-90)+"deg)";
	},
	turnRight:function (){
		block.style.transform = "rotate("+(this.getDeg()+90)+"deg)";
	},
	turnBack:function(){
		block.style.transform = "rotate("+(this.getDeg()+180)+"deg)";
	},
	// 移动
	move:function(distance){
		switch(this.getDeg()%360){
			case 0:
			case -0:
				this.moveup(distance);
				break;
			case 90:
			case -270:
				this.moveright(distance);
				break;
			case 180:
			case -180:
				this.movedown(distance);
				break;
			case 270:
			case -90:
				this.moveleft(distance);
				break;
		}
	},
	moveleft:function (distance){
		if (distance == 0){
			dis = 0;
		}else if(distance > 0){
			var dis = distance;
		}else{
			var dis = 1;
		}
		var nowX = parseInt(block.style.left)/30+1;
		var nowY = parseInt(block.style.top)/30+1;
		var next = document.getElementById("row"+nowY+"-"+"col"+(nowX-1));

		if(dis > 0 && (next && next.className != "build") && nowX > 1){
			block.style.left = parseInt(block.style.left) - 30 + "px";
			dis--;
			this.moveleft(dis);
		}else{
			return false;
		}
	},
	moveright:function (distance){
		if (distance == 0){
			dis = 0;
		}else if(distance > 0){
			var dis = distance;
		}else{
			var dis = 1;
		}
		var nowX = parseInt(block.style.left)/30+1;
		var nowY = parseInt(block.style.top)/30+1;
		var next = document.getElementById("row"+nowY+"-"+"col"+(nowX+1));

		if(dis > 0 && (next &&next.className != "build") && nowX < 10){
			block.style.left = parseInt(block.style.left) + 30 + "px";
			dis--;
			this.moveright(dis);
		}else{
			return false;
		}
	},
	moveup:function (distance){
		if (distance == 0){
			dis = 0;
		}else if(distance > 0){
			var dis = distance;
		}else{
			var dis = 1;
		}
		var nowX = parseInt(block.style.left)/30+1;
		var nowY = parseInt(block.style.top)/30+1;
		var next = document.getElementById("row"+(nowY-1)+"-"+"col"+nowX);

		if(dis > 0 && (next &&next.className != "build") && nowY > 1){
			block.style.top = parseInt(block.style.top) - 30 + "px";
			dis--;
			this.moveup(dis);
		}else{
			return false;
		}
	},
	movedown:function (distance){
		if (distance == 0){
			dis = 0;
		}else if(distance > 0){
			var dis = distance;
		}else{
			var dis = 1;
		}
		var nowX = parseInt(block.style.left)/30+1;
		var nowY = parseInt(block.style.top)/30+1;
		var next = document.getElementById("row"+(nowY+1)+"-"+"col"+nowX);

		if(dis > 0 && (next &&next.className != "build") && nowY < 10){
			block.style.top = parseInt(block.style.top) + 30 + "px";
			dis--;
			this.movedown(dis);
		}else{
			return false;
		}
	},
	// 面前的那面墙
	getDirection:function(){
		var nowX = parseInt(block.style.left)/30+1;
		var nowY = parseInt(block.style.top)/30+1;
		switch(this.getDeg()%360){
			case 0:
			case -0:
				var next = document.getElementById("row"+(nowY-1)+"-"+"col"+nowX);
				this.direction = "up";
				break;
			case 90:
			case -270:
				var next = document.getElementById("row"+nowY+"-"+"col"+(nowX+1));
				this.direction = "right";
				break;
			case 180:
			case -180:
				var next = document.getElementById("row"+(nowY+1)+"-"+"col"+nowX);
				this.direction = "down";
				break;
			case 270:
			case -90:
				this.direction = "left";
				var next = document.getElementById("row"+nowY+"-"+"col"+(nowX-1));
				break;
		}
		return next;
	},
	//修墙
	buildWall:function(){
		var next = this.getDirection();
		if (next && (next &&next.className != "build")) {
			next.className = "build";
		}else{
			console.log("这里不能修墙了！");
		}
	},
	// 刷墙
	bruWall:function(color){
		var next = this.getDirection();
		if (next && next.className == "build") {
			next.style.backgroundColor = color;
		}else{
			console.log("没有可以刷的墙！");
		}
	},
	moveTo:function(distance){
		var endX = parseInt(distance.split(",")[0]);
		var endY = parseInt(distance.split(",")[1]);
		var nowX = parseInt(block.style.left)/30+1;
		var nowY = parseInt(block.style.top)/30+1;
		var result = searchRoad(nowX,nowY,endX,endY);
		var index = 0;
		var self = this;
		if (result.length > 0) {
			clearInterval(timer1);
			var timer2 = setInterval(function(){
				self.getDirection();
				switch(result[index].go){
					case "moveup":

						switch(self.direction){
							case "up":
								self.moveup();
								break;
							case "down":
								self.turnBack();
								self.moveup();
								break;
							case "left":
								self.turnRight();
								self.moveup();
								break;
							case "right":
								self.turnLeft();
								self.moveup();
								break;
						}
						break;
					case "moveright":
						switch(self.direction){
							case "up":
								self.turnRight();
								self.moveright();
								break;
							case "down":
								self.turnLeft();
								self.moveright();
								break;
							case "left":
								self.turnBack();
								self.moveright();
								break;
							case "right":
								self.moveright();
								break;
						}
						break;
					case "movedown":
						switch(self.direction){
							case "up":
								self.turnBack();
								self.movedown();
								break;
							case "down":
								self.movedown();
								break;
							case "left":
								self.turnLeft();
								self.movedown();
								break;
							case "right":
								self.turnRight();
								self.movedown();
								break;
						}
						break;
					case "moveleft":
						switch(self.direction){
							case "up":
								self.turnLeft();
								self.moveleft();
								break;
							case "down":
								self.turnRight();
								self.moveleft();
								break;
							case "left":
								self.moveleft();
								break;
							case "right":
								self.turnBack();
								self.moveleft();
								break;
						}
						break;
				}
				index++;
				if (index == result.length) {
					clearInterval(timer2);
					timer1 = setInterval(Command.func1,1000);
				}
			},1000);
		}
	}

};

// 传给 block之前 判断指令
// 解析指令
var Command = {
	// 接受指令s 分条检验 
	instructions:"",
	command:function(instruction){
		index = 0;
		this.instructions = instruction.split(/\n/g);
		self = this;
		// 每秒传入一条指令
		// 传给judgeCommand判断
		this.clearColor();
		timer1 = setInterval(self.func1,1000);
	},
	// 循环函数
	// 单独定义 因为要在moveTo开启他
	func1:function(){
		if(!self.instructions[index]){clearInterval(timer1);return false;}
		self.judgeCommand(self.instructions[index].trim(),index);
		index++;
		if(index == self.instructions.length){
			clearInterval(timer1);
		}
	},
	// 判断指令
	judgeCommand:function(instruction,index){
		var re = /^go(\s\d)*$|^turn right$|^turn back$|^turn left$|^build$|^bru|move to ([1-9]|10),([1-9]|10)$/g;
		var controlLi = document.getElementById("control-row").getElementsByTagName("div");
		// 判断语句
		// 判断语句正误
		// 判断go的距离
		// 传递给Block
		if(re.test(instruction)){
			this.clearColor();
			if(controlLi[index]){controlLi[index].id = "running"};
			var distance = instruction.match(/[0-9]+|#[0-9 a-z]+$/g);
			if (distance) {
				var x = instruction.match(/^[a-z]+/g);
				Block.getCommand(x.join(),distance.join());
			}else{
				Block.getCommand(instruction);
			}
		}else{
			this.clearColor();
			if(controlLi[index]){controlLi[index].id = "wrong"};
			clearInterval(timer1);
			console.log("第"+(index+1)+"行有错")
		}
	},
	// 清除颜色
	clearColor:function(){
		var controlLi = document.getElementById("control-row").getElementsByTagName("div");
		for (var i = 0; i < controlLi.length; i++) {
			controlLi[i].id = "";
		}
	}
};



(function(){
	// 建立表格
	var content = document.getElementById("content");
	var text = "";
	for (var i = 1; i <= 10; i++) {
		for (var j = 1; j <= 10; j++) {
			text += "<div id=\"row"+i+"-"+"col"+j+"\"></div>"
		}
	}
	content.innerHTML = text;

	// 控制台
	var textarea = document.getElementById("control").getElementsByTagName("textarea")[0];
	var controlRow = document.getElementById("control-row");
	// 指令内容区域 
	addHandler(textarea,"keyup",function(){
		var rowText = "";
		var text = textarea.value.split(/\n/g);
		for (var i = 1; i <= text.length; i++) {
			rowText += "<div>"+i+"</div>";
		}
		controlRow.innerHTML = rowText;
		// 与内容区域 对其
		controlRow.scrollTop = textarea.scrollTop;
	});
	// 与内容区域 对其
	addHandler(textarea,"scroll",function(){
		controlRow.scrollTop = textarea.scrollTop;
	});
	// 获取textarea指令
	var btnRun = document.getElementById("run");
	addHandler(btnRun,"click",function(){
		var instruction = textarea.value.toLowerCase().trim();
		// 将指令 传给Command
		Command.command(instruction);
		var rowText = "";
		var text = textarea.value.split(/\n/g);
		for (var i = 1; i <= text.length; i++) {
			rowText += "<div>"+i+"</div>";
		}
		controlRow.innerHTML = rowText;
		// 与内容区域 对其
		controlRow.scrollTop = textarea.scrollTop;
	});
	// 重置指令
	var btnReset = document.getElementById("reset");
	addHandler(btnReset,"click",function(){
		controlRow.innerHTML = "";
		textarea.value = "";
	});
	// 随机造墙
	var btnBuild = document.getElementById("build");
	btnBuild.onclick = function(){
		var x = parseInt(Math.random()*10+1);
		var y = parseInt(Math.random()*10+1);
		while(true){
			var cell = document.getElementById("row"+y+"-"+"col"+x);
			if (cell.className == "build") {
				var x = parseInt(Math.random()*10+1);
				var y = parseInt(Math.random()*10+1);
			}else{
				cell.className = "build";
				break;
			}
		}

	}
	// //键盘事件 
	// document.onkeydown = function(event){
	//     var e = event || window.event;
	//     switch(e.keyCode){
	//     	case 37:
	//     		Block.turnLeft();
	//     		// e.preventDefault();
	//     		break;
	//     	case 38:
	//     		Block.move();
	//     		e.stopPropagation();
	//     		// e.preventDefault();// 防止有滚动条的情况下
	//     		break;
	//     	case 39:
	//     		Block.turnRight();
	//     		// e.preventDefault();
	//     		break;
	//     	case 40:
	//     		Block.turnBack();
	//     		// e.preventDefault();
	//     		break;
	//     }
	// }
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
})();