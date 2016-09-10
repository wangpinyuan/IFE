function Calendar(){
	var date = new Date();
	var that = this;
	this.year = date.getFullYear();
	this.month = date.getMonth()+1;
	// this.day = 1;
	this.week = date.getDay();
	this.today = date.getDate();
   // 界面中显示的月份  初始为当月
	this.nowMonth = date.getMonth()+1;
   // 这个月的总天数
	this.numDay = this.getNumDay(this.year,this.month);
   // 这个月第一天是周几
	this.firstDay = this.getFirstWeekDay(this.year,this.month);
	this.selectedDay ;
};
Calendar.prototype = {

renderDatas:function(firstDay){
 	that = this;
	var mainbody = document.getElementById("mainbody");
	this.clearData();
   this.clearId();
   //改标题 
   var dateTitle = document.getElementById("date");
   dateTitle.innerHTML = this.year+"年"+this.month+"月";
   //创建span 
   for (var i = 0; i < 49; i++) {
      var span = document.createElement("span");
      mainbody.appendChild(span);
   }
   var spans = document.getElementById("mainbody").getElementsByTagName("span");
   //初始化星期
   var datas = ["日","一","二","三","四","五","六"];
   for (var i = 0; i < 7; i++) {
      spans[i].innerHTML = datas[i];
   }

   //显示上个月的天数
   var preDay = this.getNumDay(this.year,this.month-1);
   for (var i = this.firstDay + 6; i > 6 ; i--) {
      spans[i].innerHTML = preDay;
      preDay--;
      spans[i].className = "prenext"
      spans[i].addEventListener("click",this.showPre,false);
   }
   //本月天数
   var day =1;
   for (var i = 7+this.firstDay; i < this.numDay+this.firstDay+7; i++) {
      //添加响应事件
      spans[i].addEventListener("click",this.showThis,false);
      //显示数据      
      spans[i].innerHTML = day;
      spans[i].className = "now";
      //周末特殊颜色
      var nowDay = this.getWeekDay(this.year,this.month,day);
      if (nowDay ==0||nowDay ==6){
         spans[i].className = "weekend"
      }
      day++;
   }
   //显示下个月的天数
   var nextDay = 1;
      for (var i = this.numDay+this.firstDay+7; i <spans.length; i++) {
         spans[i].innerHTML = nextDay;
         nextDay++;
         spans[i].className = "prenext"
         spans[i].addEventListener("click",this.showNext,false);
      }
   //
   //today样式
   console.log(this.firstDay)
   if(this.month == this.nowMonth){
      spans[6+this.today+this.firstDay].id = "selected";
   }
   //添加事件
   var pre = document.getElementById("pre");
   var next = document.getElementById("next");
   // that = this;
   pre.addEventListener("click",this.showPre,false)
   next.addEventListener("click",this.showNext,false)
},

getFirstWeekDay:function(year,month){
   var date = new Date(year,month,0);
    date.setDate(1);
    date = date.getDay();
    return date;
},

getNumDay:function (year,month){
   var d = new Date(year,month,0);
    return d.getDate();
},

clearData:function (){
   var mainbody = document.getElementById("mainbody");
   mainbody.innerHTML = "";
	
},

clearId:function (){
	var spans = document.getElementById("mainbody").getElementsByTagName("span");
	for (var i = 7; i < spans.length; i++) {
		spans[i].id = "";
	}
},

getWeekDay:function (year,month,day){
	var date = new Date();
	date.setFullYear(year);
   date.setMonth(month-1);
   date.setDate(day);
   date = date.getDay();
	return date;
},

showThis:function(){
	that.clearId();		
	this.id = "selected"
	//
   	// console.log(this)
   	// console.log(that)
   that.selectedDay = this.innerHTML;
	that.changeInput();

},

showNext:function(){
	that.month++;
	if (that.month > 12) {
		that.year++;
		that.month = 1;
	}
	that.numDay = that.getNumDay(that.year,that.month);
	that.firstDay = that.getFirstWeekDay(that.year,that.month);
	that.renderDatas(that.firstDay);
},

showPre:function(){
	that.month--;
	if (that.month < 1) {
		that.year--;
		that.month = 12;
	}
	that.numDay = that.getNumDay(that.year,that.month);
	that.firstDay = that.getFirstWeekDay(that.year,that.month);
	that.renderDatas(that.firstDay);
},

inputClick:function(){
   var input = document.getElementById("input");
   var calendar = document.getElementById("calendar");
   calendar.style.display = "none";
   	input.onclick = function(){
   	   if (calendar.style.display == "none") {
   	      calendar.style.display = "block";
   	   }else{
   	      calendar.style.display = "none";
   	   }
   	}
},

changeInput:function (){
		input.value = this.year+"-"+this.month+"-"+this.selectedDay;
	}

};
(function(){
	var calendar = new Calendar();
	calendar.renderDatas(this.firstDay);
	calendar.inputClick();
})();







	

















