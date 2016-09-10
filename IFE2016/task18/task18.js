window.onload = function(){
	var btn = document.getElementsByTagName("button");
	var show = document.getElementById("show");
	var input = document.getElementsByTagName("input")[0];
	var a = [];
	var text =""; 
	
	btn[0].addEventListener("click",unShiftDate,false);
	btn[1].addEventListener("click",pushDate,false);
	btn[2].addEventListener("click",shiftDate,false);
	btn[3].addEventListener("click",popDate,false);


	function unShiftDate(){
		a.unshift(input.value);
			console.log(a);
		showDate();

	}
	function pushDate(){
		a.push(input.value);
			console.log(a);
		showDate();
	}
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
	function showDate(){
		text = "";
		for (var i = 0; i < a.length; i++) {
			text +="<span>"+a[i]+"</span>";
		}
		show.innerHTML = text;
		deletDate();
		input.value = "";
	}

	function deletDate(){
		for (var i = 0; i < a.length; i++) {
			show.childNodes[i].index=i;
			show.childNodes[i].onclick = function(){
				a.splice(this.index,1);
				showDate();
			}
		}
	}


}