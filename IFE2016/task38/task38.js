function tableData(sort,index,data){
	this.sort = sort;
	this.index = index;
	this.data = data;
}
tableData.prototype = {
	showData:function(){
		var tbody = document.getElementsByTagName("tbody")[0];
		tbody.innerHTML = "";
		for (var i = 0; i < data.length; i++) {
			var tr = document.createElement("tr");
			for (var j = 0; j < data[i].length; j++) {
				var td = document.createElement("td");
				var tdText = document.createTextNode(data[i][j]);
				td.appendChild(tdText);
				tr.appendChild(td);
			}
			tbody.appendChild(tr);
		}		
	},
	triClick:function (){	
		var triangle = document.getElementsByClassName("triangle");
		for (var i = 0; i < triangle.length; i++) {
			triangle[i].index = i;
			var that = this;
			triangle[i].onclick = function(){
					index = this.index;
					that.sortData();
			}
		}
	},
	sortData:function (){
		for (var i = 0; i < this.data.length; i++) {
			this.sort?this.data.sort(this.compare1):this.data.sort(this.compare2);
		}
			this.showData();
			this.sort = !this.sort;
	},
	compare1:function (value1,value2){

		return value1[index+1] - value2[index+1];
	},
	compare2:function (value1,value2){

		return value2[index+1] - value1[index+1];
	},
	scrollEvent:function(){
		var table = document.getElementsByTagName("table")[0];
		var thead = document.getElementsByTagName("thead")[0];
		var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
		console.log(table.offsetTop+table.offsetHeight)
		console.log(scrollTop)
		if (table.offsetTop <= scrollTop) {
			thead.style.position = 'fixed';
			thead.style.top = '0';	
		if (table.offsetTop +table.offsetHeight+thead.offsetHeight <= scrollTop) {
			thead.style.position = 'absolute';
			thead.style.top = '';
		 }
		}else{
			thead.style.position = 'relative';
			thead.style.top = '';
		}
	
	}
}
var data = [
["王大",55,28],
["王二",22,51],
["王三",95,65],
["王唔",33,64],
["王六",25,59],
["王七",35,16],
["王爸",53,86],
];
(function(){
	var table = new tableData(true,0,data);
	table.showData();
	table.triClick();
	window.onscroll = table.scrollEvent;
})();
