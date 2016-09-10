window.onload = function(){
	var treeRoot = document.getElementsByTagName("div")[0];
	var btn = document.getElementsByTagName("button");
	// 数组用来存放改变顺序   用来加载changeColor
	var dataList = new Array;

	btn[0].addEventListener("click",preO,false);
	btn[1].addEventListener("click",inO,false);
	btn[2].addEventListener("click",postO,false);
	//前序遍历
	function preO(){
		dataList =[];
		preOrder(treeRoot);
		changeColor();
	}
	function preOrder(treeRoot){
		if(!(treeRoot == null)){
			dataList.push(treeRoot);
			preOrder(treeRoot.children[0]);
			preOrder(treeRoot.children[1]);
		}
	}
	//中序遍历
	function inO(){
		dataList =[];
		inOrder(treeRoot);
		changeColor();
	}
	function inOrder(treeRoot){
		if(!(treeRoot == null)){
			inOrder(treeRoot.children[0]);
			dataList.push(treeRoot);
			inOrder(treeRoot.children[1]);
		}
	}
	//后序遍历
	function postO(){
		dataList =[];
		postOrder(treeRoot);
		changeColor();
	}
	function postOrder(treeRoot){
		if(!(treeRoot == null)){
			postOrder(treeRoot.children[0]);
			postOrder(treeRoot.children[1]);
			dataList.push(treeRoot);
		}
	}
	//改变颜色	
	function changeColor(){
		var i =0;
		dataList[i].style.background = "red";
		timer = setInterval(function(){
			i++;
			console.log(dataList.length);
			console.log(i);
			if (i < dataList.length) {
				dataList[i-1].style.backgroundColor = '#fff';
				dataList[i].style.backgroundColor = 'red';
			} else {
				dataList[dataList.length-1].style.backgroundColor = '#fff';
				clearInterval(timer);	
			}
		},500);
	}
}