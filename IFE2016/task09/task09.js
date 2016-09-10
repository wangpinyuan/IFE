function tabSelected(){
var tabs = document.getElementsByClassName("tab-title")[0].getElementsByTagName("li");
var divs = document.getElementsByClassName("tab-content-table");
	for (var i = 0; i < tabs.length; i++) {
		tabs[i].index = i;
		tabs[i].onmouseover = function(){
			clear(tabs);
			clear(divs);
			this.id = "titleSelected";
			divs[this.index].id = "divSelected";
			tdSelected();
		}
	}
}
function tdSelected(){
	var tds = document.getElementById("divSelected").getElementsByTagName("td");
	for (var i = 0; i < tds.length; i++) {
		tds[i].onmouseover = function(){
		clear(tds);
		this.id = "tdSelected";
		}
	}	
}
// section5
function trSelected(){	
	var trs = document.getElementsByClassName("section5-contant")[0].getElementsByTagName("tr");
	for (var i = 0; i < trs.length; i++) {
		trs[i].onmouseover = function(){
			clear(trs);
			this.id = "trSelected";
		}
	}
}
//
function clear(group){
	for (var i = 0; i < group.length; i++) {
		group[i].id = "";
	}
}
function init(){
	tabSelected();
	tdSelected();
	trSelected();
}
init();
var calendar = document.getElementById("calendar-ul");
for (var i = 1; i <=30; i++) {
	calendar.innerHTML += "<li><span>"+i+"</span></li>"
}