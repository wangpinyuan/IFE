window.onload = function(){
	var showTag = document.getElementById("tag");
	var input = document.getElementsByTagName("input")[0];
	var a = [];

	//input的
	//键盘触发事件
	input.onkeydown = function(event){
		if (event.keyCode == 32||event.keyCode == 188||event.keyCode == 13){
			//不能重复
			for (var i = 0; i < a.length; i++) {
				if(a[i] == input.value){
					alert("请勿重复输入");
					return false;
				}			
			}
			//MAX长度为10
			if(a.length == 10){
				shift();
			}
			pushDate();		
			setTimeout(function(){input.value = "";},10)
		}
	}
	//输入
	function pushDate(){
		var text = input.value.trim();
		a.push(text);
		showData();
	}
	// 顶踢掉前面的
	function shift(){
		a.shift();
		showData();
	}
	// show
	function showData(){
		var text = "";
		for (var i = 0; i < a.length; i++) {
			text +="<span>"+a[i]+"</span>";
		}
		showTag.innerHTML = text;
		deletData();
		addText();
	}
	//鼠标放上事件
	function addText(){
		var text = "";
		for (var i = 0; i < a.length; i++) {
			showTag.children[i].index = i;
			showTag.children[i].onmouseover = function(){
				 text = showTag.children[this.index].innerHTML;
				showTag.children[this.index].innerHTML = "点击删除"+text;
			}
			showTag.children[i].onmouseout = function(){
				showTag.children[this.index].innerHTML = text;
			}
		}
	}
	// 删除
	function deletData(){
		for (var i = 0; i < a.length; i++) {
			showTag.childNodes[i].index=i;
			showTag.childNodes[i].onclick = function(){
				a.splice(this.index,1);
				showData();
			}
		}
	}
	//textarea的
	var textarea = document.getElementsByTagName("textarea")[0];
	var showHabit = document.getElementById("habit");
	var btn = document.getElementsByTagName("button")[0];
	btn.addEventListener("click",pushDatas,false);
	var b = [];
	var c = [];

	function pushDatas(){
		// var text = textarea.value.trim().split(/,|\r|\s|、/g);
		var text = check();
		console.log("text"+text);
		for (var i = 0; i < text.length; i++) {
			b.push(text[i]);
		}
		equal();
		console.log("c"+c)
		console.log("b"+b)
		showDatas();
	}
	function showDatas(){
		var	text = "";
		for (var i = 0; i < b.length; i++) {
			text +="<span>"+b[i]+"</span>";
		}
		showHabit.innerHTML = text;
		deleteDatas();
	}
	function deleteDatas(){
		for (var i = 0; i < b.length; i++) {
			showHabit.childNodes[i].index=i;
			showHabit.childNodes[i].onclick = function(){
				b.splice(this.index,1);
				showDatas();
			}
		}
	}
	function check(){
		var text = textarea.value.trim().split(/,|\r|\s|、/g);
		if(b.length == 10){
			b.shift();
			check();
		}
		for (var i = 0; i < text.length; i++) {
			c.push(text[i]);
		}

		for (var i = 0; i < c.length-1; i++) {
			for (var j = i+1; j < c.length; j++) {
				if(c[i] == c[j]){
					equal();
					console.log(i)
					console.log(j)
					alert("不可重复输入");
					return false;
				}
			}
		}
		equal();
		return text;
	}
	function equal(){
		c = [];
		for (var i = 0; i < b.length; i++) {
			c[i] = b[i];
		}
	}


}