// task24.js
window.onload = function(){
	var treeRoot = document.getElementsByTagName("div")[0];
	var btn = document.getElementsByTagName("button");
	var input = document.getElementsByTagName("input")[0];
	var addInput = document.getElementsByTagName("input")[1];
	var divs = document.getElementsByTagName("div");
	// 数组用来存放改变顺序   用来加载changeColor
	var dataList = new Array;

	btn[0].addEventListener("click",depthO,false);
	btn[1].addEventListener("click",breadthO,false);
	btn[2].addEventListener("click",depthS,false);
	btn[3].addEventListener("click",breadthS,false);
	btn[4].addEventListener("click",deleteElement,false);
	btn[5].addEventListener("click",addElement,false);

	
	whichClick();
	var nowDiv ;//存放当前div

	// 清除当前DIV信息
	function clearDivColor(){
		for (var i = 0; i < divs.length; i++) {
			divs[i].style.backgroundColor = "#fff";
		}
	}
	//选中当前DIV
	function whichClick(){
		for (var i = 0; i < divs.length; i++) {
			divs[i].onclick = function(event){
				for (var i = 0; i < divs.length; i++) {
					divs[i].style.backgroundColor = "#fff";
				}
				nowDiv = this;
				this.style.backgroundColor = "#ccc";
				event.stopPropagation();//阻止冒泡
			}
		}
	}
	//删除节点
	function deleteElement(){
		nowDiv.parentNode.removeChild(nowDiv);
		whichClick();
		clearDivColor();
		reset();
	}
	//增加节点
	function addElement(){
		var div = document.createElement("div");
		var text = document.createTextNode(addInput.value);
		div.appendChild(text);
		nowDiv.appendChild(div);
		whichClick();
		clearDivColor();
		reset();
	}


	//深度优先遍历
	function depthO(){
		dataList =[];
		depthOrder(treeRoot);
		changeColor();
		
	}
	function depthOrder(treeRoot){
		if(treeRoot){
			 dataList.push(treeRoot);
			 depthOrder(treeRoot.firstElementChild);
			 depthOrder(treeRoot.nextElementSibling);
		}
	}

	//广度优先遍历
	function breadthO(){
		dataList =[];
		breadthSearch(treeRoot);
		changeColor();

	}
	var a = [];
	function breadthOrder(treeRoot){
		if (treeRoot) {
			dataList.push(treeRoot);
			a.push(treeRoot);
			breadthOrder(treeRoot.nextElementSibling);
			b = a.shift();
			breadthOrder(b.firstElementChild);
		}
	}

	//深度优先查询
	function depthS(){
		reset();
		depthSearch(treeRoot);
		changeColor();
	}
	var find = [];

	function depthSearch(treeRoot){
		if(treeRoot){
			if (treeRoot.firstChild.nodeValue.trim() == input.value){
				find = treeRoot;
				console.log(find)
			}
			dataList.push(treeRoot);
			depthSearch(treeRoot.firstElementChild);
			depthSearch(treeRoot.nextElementSibling);
		}
	}


	//广度优先查询
	function breadthS(){
		reset();
		breadthSearch(treeRoot);
		changeColor();

	}
	var a = [];
	function breadthSearch(treeRoot){
		if (treeRoot) {
				if (treeRoot.firstChild.nodeValue.trim() == input.value){
				find = treeRoot;
			}
			dataList.push(treeRoot);
			a.push(treeRoot);
			breadthSearch(treeRoot.nextElementSibling);
			b = a.shift();
			breadthSearch(b.firstElementChild);
		}
	}
	function clearColor(){
		for (var i = 0; i < dataList.length; i++) {
			dataList[i].style.backgroundColor = '#fff';
		}
	}
	// 初始化数据
	function reset(){
		clearColor();
		find = [];
		dataList =[];
		nowDiv = "";	
	}

	// 改变颜色	
	function changeColor(){		
		var i =0;
		dataList[i].style.background = "red";
		timer = setInterval(function(){
			i++;
			if (i < dataList.length) {
				dataList[i-1].style.backgroundColor = '#fff';
				dataList[i].style.backgroundColor = 'red';
				if(dataList[i] == find){
					clearInterval(timer);
					find.style.backgroundColor = 'blue';
				}
			} else {
				clearInterval(timer);
				dataList[dataList.length-1].style.backgroundColor = '#fff';
			}
		},500);
	}
}