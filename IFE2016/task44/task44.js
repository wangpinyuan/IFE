window.onload = function(){
	waterfall('main','box');
	window.onscroll = function(event){
		if(checkScrollSlide()){
			var oParent = document.getElementById("main");
			var text = oParent.innerHTML;
			var height = Math.floor(Math.random()*201 + 100);
			var	color =  Math.floor(Math.random() * 0xFFFFFF).toString(16);
			var width = 200;

			text += "<div class=\"box\"><div class=\"pic\"><img src=\"http://placehold.it/"+width+"x"+height+"\\"+color+"\"></div></div>"
			oParent.innerHTML = text;
				
			waterfall('main','box');
		}
		event.preventDefault();
	}
}
function waterfall(parent,box){
	//main下box取出
	var oParent = document.getElementById("main");
	var oBoxs = getByClass(oParent,box);
	// 计算页面显示的列数
	var oBoxW = oBoxs[0].offsetWidth;
	var cols = 4;
	// var cols = Math.floor(document.documentElement.clientWidth/oBoxW);
	oParent.style.cssText = "width:"+cols*oBoxW+"px;margin:0 auto;"
	// 获取每一列高度
	var hArr = new Array();
	for (var i = 0; i < oBoxs.length; i++) {
		if(i < cols){
			hArr.push(oBoxs[i].offsetHeight);
		}else{
			var minH = Math.min.apply(null,hArr);
			// console.log(minH);
			var index = getMinhIndex(hArr,minH);
			oBoxs[i].style.position = "absolute";
			oBoxs[i].style.top = minH +"px";
			oBoxs[i].style.left = oBoxs[index].offsetLeft+"px";
			hArr[index] += oBoxs[i].offsetHeight; 
		}
	}
	//添加事件
	openPic();
}
function getByClass(parent,clsName){
	var boxArr = new Array();//存储class为box的元素
	oElements = parent.getElementsByTagName("*");
	for (var i = 0; i < oElements.length; i++) {
		if(oElements[i].className == clsName){
			boxArr.push(oElements[i]);
		}
	}
	return boxArr;
}
function getMinhIndex(hArr,minH){
	for (var i = 0; i < hArr.length; i++) {
		if(hArr[i] == minH){
			return i;
		}
	}
}
// 滚动是否加载图片
function checkScrollSlide(){
	var oParent = document.getElementById("main");
	var oBoxs = getByClass(oParent,"box");
	var lastBoxH = oBoxs[oBoxs.length-1].offsetTop + Math.floor(oBoxs[oBoxs.length-1].offsetHeight/2);
	var scrollTop = document.body.scrollTop||document.documentElement.scrollTop;
	var height = document.body.clientHeight||document.documentElement.clientHeight;
	
	return (lastBoxH < scrollTop+height)?true:false;
}
function openPic(){
	var oParent = document.getElementById("main");
	var oBoxs = getByClass(oParent,"box");
	for (var i = 0; i < oBoxs.length; i++) {
		oBoxs[i].onclick = function(){
			var src = this.getElementsByTagName("img")[0].src;
			createMask(src);
		}
	}
}
function createMask(src){
	var body = document.getElementsByTagName("body")[0];
	body.style.overflow = "hidden";
	var mask = document.createElement("div");
	var maskHeight = document.body.scrollHeight||document.documentElement.scrollHeight;
	var maskWidth = document.body.scrollWidth||document.documentElement.scrollWidth;
	mask.style.cssText = "width:"+maskWidth+"px;height:"+maskHeight+"px;opacity:0.7;background-color:#000;z-index:1000;"
	document.documentElement.appendChild(mask);

	var img = document.createElement("img");
	img.src = src;
	var imgWidth = img.width;
	var imgHeight = img.height;
	var imgH = document.body.clientHeight||document.documentElement.clientHeight;
	var imgW = document.body.clientWidth||document.documentElement.clientWidth;
	img.style.position = "fixed";
	img.style.cssText = "z-index:1001;position:fixed;top:"+(imgH/2-imgHeight/2)+"px;left:"+(imgW/2-imgWidth/2)+"px;)";
	document.documentElement.appendChild(img);
	mask.onclick = function(){
		document.documentElement.removeChild(mask);
		document.documentElement.removeChild(img);
		body.style.overflow = "auto";
	}
}