// task43.js
window.onload = function(){
	var pics = document.getElementsByClassName("pics")[0];
	var number = pics.children.length;
	var btn1 = document.getElementsByTagName("button")[0];
	btn1.addEventListener("click",addPicture,false);
	// 
	var text = pics.innerHTML;
	function addPicture(event){
		getNumber();
		console.log("当前"+number);
		if (number < 6) {
			var	color =  Math.floor(Math.random() * 0xFFFFFF).toString(16);
			text+= "<img id=\"pic"+(number+1)+"\" src=\"http://placehold.it/500x300\\"+color+"\""+">"
			pics.innerHTML = text;
			getNumber();
			pics.id = "pics-"+number;
			event.preventDefault();
		}
	}
	function getNumber(){
		 number = pics.children.length;
	}


















}