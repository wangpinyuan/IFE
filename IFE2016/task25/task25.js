// tesk25.js
// 2016-8-28夜 修改
(function(){

	var spans = document.getElementsByTagName("span");
	var lis = document.getElementsByTagName("li");
	var input = document.getElementsByTagName("input")[0];
	var btn = document.getElementsByTagName("button");
	var selected;

	btn[0].addEventListener("click",addDiv,false);
	btn[1].addEventListener("click",deleteDiv,false);
	btn[2].addEventListener("click",depthS,false);

	// 展开
	function out(index){
		lis[index].firstElementChild.className = "out";
		if(lis[index].children[2]){
			lis[index].children[2].style.display = "block";
		}
	}
	// 闭合
	function inf(index){
		lis[index].firstElementChild.className = "in";
		if(lis[index].children[2]){
			lis[index].children[2].style.display = "none";
		}
		var childLi = lis[index].getElementsByTagName("li");
		for (var i = 0; i < childLi.length; i++) {
			childLi[i].firstElementChild.className = "in";
			if (childLi[i].children[2]) {
				childLi[i].children[2].style.display = "none";
			}
		}
	}
	// 展开 闭合
	function tigger(){
		for (var i = 0; i < lis.length; i++) {
			lis[i].index = i;
			lis[i].children[0].onclick = function(){
				if(this.className == "in"){
					out(this.parentElement.index);
			    }
			else{
					inf(this.parentElement.index);
		 		}
			}
		}
	}

//删除
function deleteDiv(){
	selected.parentElement.parentElement.removeChild(selected.parentElement);
}
// 添加
function addDiv(){
	var text = "";	
	selected.previousSibling.className = "out";		
	if(selected.nextElementSibling){
		text = "<li><div class='in'></div><span>"+input.value+"</span></li>"
		selected.nextElementSibling.innerHTML += text;
		
	}else{
		var ul = document.createElement("ul");
		text = "<li><div class='in'></div><span>"+input.value+"</span></li>"
		selected.parentElement.appendChild(ul);
		ul.innerHTML += text;
	}
	selectDiv();
	tigger();
}
//标识选中Div
function selectDiv(){

	for (var i = 0; i < spans.length; i++) {
		spans[i].onclick = function(event){
			clearColor();
			this.style.backgroundColor = "#ccc";
			selected = this;//this->span
			event.stopPropagation();
		}
	}
	tigger();
}
//清除颜色
function clearColor(){
	for (var i = spans.length - 1; i >= 0; i--) {
		spans[i].style.backgroundColor = "";
	}
}
//深度优先 搜索
function depthS(){
	var treeRoot = lis[0];
		depthSearch(treeRoot);
		changeColor();
	}
	// 有多个结果  将所有结果存入数组
	var find = [];
	function depthSearch(treeRoot){
		if(treeRoot){
			if (treeRoot.children[1].innerHTML.trim() == input.value){
				// 当找到结果 存入数组
				find.push(treeRoot.children[1]);
			}
			if (treeRoot.children[2]) {
				depthSearch(treeRoot.children[2].firstElementChild);
			}
			depthSearch(treeRoot.nextElementSibling);
			}
	}
	function changeColor(){
		clearColor();
		for (var i = 0; i < find.length; i++) {
			find[i].style.backgroundColor = "red";
		}
		open();
		// 查找结束 初始化数组
		find.length = 0;
	}
	//查找到的DIV展开
	function open(){
		for (var i = 0; i < spans.length; i++) {
			if(spans[i].style.backgroundColor == "red"){
				parentOut(i);
			}
		}
	}
	// 打开 查找到的数据的父节点
	function parentOut(index){
		var parentIndex = lis[index].parentElement.parentElement.index;
		out(parentIndex);

	}

	tigger();
	selectDiv();

})();
