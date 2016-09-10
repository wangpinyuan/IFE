window.onload = function(){
	var btn = document.getElementsByTagName("button");
	var show = document.getElementById("show");
	var input = document.getElementsByTagName("textarea")[0];
	var searchInput = document.getElementsByTagName("input")[0];
	var a = [];
	var text =""; 
	
	btn[0].addEventListener("click",unShiftDate,false);
	btn[1].addEventListener("click",pushDate,false);
	btn[2].addEventListener("click",shiftDate,false);
	btn[3].addEventListener("click",popDate,false);
	btn[4].addEventListener("click",randomDate,false);
	btn[5].addEventListener("click",search,false);

	function randomDate(){
		for (var i = 0; i < 10; i++) {
			a[i] = Math.floor(Math.random()*21 + 0);
			showDate();
		}
	}
	//四种方法
	//输入
	function unShiftDate(){
		var text = input.value.trim().split(/[,，、/ \n]/g).reverse();
		for (var i = 0; i < text.length; i++) {
			a.unshift(text[i]);
		}		
		showDate();

	}
	function pushDate(){
		var text = input.value.trim().split(/[,，、/ \n]/g);
		for (var i = 0; i < text.length; i++) {
			a.push(text[i]);
		}		
		showDate();
	}
	//输出
	function shiftDate(){
		alert("左侧出"+a[0]);
		a.shift();
			console.log(a);
		showDate();
	}
	function popDate(){
		alert("右侧出"+a[a.length-1]);
		a.pop();
			console.log(a);
		showDate();
	}
	// show
	function showDate(){
		text = "";
		for (var i = 0; i < a.length; i++) {
			text +="<span>"+a[i]+"</span>";
		}
		show.innerHTML = text;
		deletDate();
	}
	// 删除
	function deletDate(){
		for (var i = 0; i < a.length; i++) {
			show.childNodes[i].index=i;
			show.childNodes[i].onclick = function(){
				a.splice(this.index,1);
				showDate();
			}
		}
	}
	// 匹配查询
	var aSpan = document.getElementsByTagName("span");
	function search(){
		clearColor();
		for (var i = 0; i < aSpan.length; i++) {
			var text = aSpan[i].firstChild.nodeValue;
			var pattern = text.indexOf(searchInput.value);
			if (pattern == -1) {
				pattern = 0;
			}else{
				pattern = 1;
			}
			if(pattern){
				aSpan[i].style.color = "blue";
			}
		}
	}
	function clearColor(){
		console.log("clear");
		console.log(aSpan.length);
		for (var i = 0; i < aSpan.length; i++) {
			aSpan[i].style.color = "#000";
		}
	}


}