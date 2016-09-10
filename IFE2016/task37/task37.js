// task37.js
var btn = document.getElementsByTagName("button")[0];
btn.addEventListener("click",addMask,false)

function addMask(){
	var body = document.getElementsByTagName("body")[0];
	body.style.overflow = "hidden";

	var scrollH = document.documentElement.clientHeight;
	var oMask = document.createElement("div");
	oMask.style.cssText = "position:absolute;top:0;left:0;height:"+scrollH+"px;width:100%;background-color:#000;opacity:0.6;z-index:1000;";
	document.body.appendChild(oMask);

	var float = document.createElement("div");
	float.id = "float";
	float.style.cssText = "position:absolute;top:50%;left:50%;height:200px;width:400px;transform:translate(-50%,-50%);background-color:#ccc;z-index:1001;";
	document.body.appendChild(float);

	oMask.onclick = function(){
		document.body.removeChild(oMask);
		document.body.removeChild(float);
		body.style.overflow = "auto";
	}
	drag();
}
var mouseOffsetX = 0;
var mouseOffsetY = 0;
var draging = false;
function drag(){
	var float = document.getElementById("float");

	float.addEventListener("mousedown",function(event){
		mouseOffsetX = event.pageX - float.offsetLeft;
		mouseOffsetY = event.pageY - float.offsetTop;
		draging = true;
	},false);

	document.addEventListener("mousemove",function(event){
		var mouseX = event.pageX;
		var mouseY = event.pageY;
		var moveX = 0;
		var moveY = 0;
		if (draging === true) {
			moveX = mouseX - mouseOffsetX;
			moveY = mouseY - mouseOffsetY;
			
			var scrollW = document.documentElement.clientWidth;
			var scrollH = document.documentElement.clientHeight;
			var divW = float.offsetWidth;
			var divH = float.offsetHeight;
			var maxX = scrollW - divW/2;
			var maxY = scrollH - divH/2;

			moveX = Math.min( maxX , Math.max(divW/2,moveX) );
			moveY = Math.min( maxY , Math.max(divH/2,moveY) );

			float.style.left = moveX + "px";
			float.style.top = moveY + "px";
		}
	},false);

	float.addEventListener("mouseup",function(){
		draging = false;
	},false);
}