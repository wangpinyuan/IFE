/* 数据格式演示
var aqiSourceData = {
  "北京": {
    "2016-01-01": 10,
    "2016-01-02": 10,
    "2016-01-03": 10,
    "2016-01-04": 10
  }
};
*/

// 以下两个函数用于随机模拟生成测试数据
function getDateStr(dat) {
  var y = dat.getFullYear();
  var m = dat.getMonth() + 1;
  m = m < 10 ? '0' + m : m;
  var d = dat.getDate();
  d = d < 10 ? '0' + d : d;
  return y + '-' + m + '-' + d;
}
function randomBuildData(seed) {
  var returnData = {};
  var dat = new Date("2016-01-01");
  var datStr = '';
  for (var i = 1; i < 92; i++) {
    datStr = getDateStr(dat);
    returnData[datStr] = Math.ceil(Math.random() * seed);
    dat.setDate(dat.getDate() + 1);
}
	return returnData;
}

var aqiSourceData = {
  "北京": randomBuildData(500),
  "上海": randomBuildData(300),
  "广州": randomBuildData(200),
  "深圳": randomBuildData(100),
  "成都": randomBuildData(300),
  "西安": randomBuildData(500),
  "福州": randomBuildData(100),
  "厦门": randomBuildData(100),
  "沈阳": randomBuildData(500)
};

// 用于渲染图表的数据
var chartData = {};

// 记录当前页面的表单选项
var pageState = {
  nowSelectCity:"",
  nowGraTime: "day"
}

/**
 * 渲染图表
 */	
 function renderChart() {
  var bar="";
 	
  for(key in chartData){
  	var	color = '#' + Math.floor(Math.random() * 0xFFFFFF).toString(16);
  	bar += "<div class='aqi-bar' title='"+key+":"+chartData[key]+"' style='height:"+chartData[key]+"px;background-color:"+color+"'></div>";
  }
  var wrap = document.getElementsByClassName("aqi-chart-wrap")[0];
  wrap.innerHTML = bar;
 }
/**
 * 日、周、月的radio事件点击时的处理函数
 */
 function graTimeChange() {
  // 确定是否选项发生了变化 
	var radioSelect = document.getElementsByTagName("input");			
  for (var i = 0; i < radioSelect.length; i++) {
  	 if(radioSelect[i].checked == true){
  		 pageState.nowGraTime = radioSelect[i].value;
  	 }
  }
  // 设置对应数据
  initAqiChartData();
  // 调用图表渲染函数
  renderChart();
}

/**
 * select发生变化时的处理函数
 */
 function citySelectChange() {
  // 确定是否选项发生了变化 
  // 设置对应数据
	initAqiChartData();
  // 调用图表渲染函数
  renderChart();
}

/**
 * 初始化日、周、月的radio事件，当点击时，调用函数graTimeChange
 */
 function initGraTimeForm() {
 		var radioSelect = document.getElementsByTagName("input");
 		for (var i = 0; i < radioSelect.length; i++) {
 			radioSelect[i].onchange = graTimeChange;
 		}
 }

/**
 * 初始化城市Select下拉选择框中的选项
 */
 function initCitySelector() {
  // 读取aqiSourceData中的城市，然后设置id为city-select的下拉列表中的选项
  var citySelect = document.getElementById("city-select");
  for(var key in aqiSourceData){
  	var option =document.createElement("option");
  	option.innerHTML= key;
  	citySelect.appendChild(option);
  }
  // 给select设置事件，当选项发生变化时调用函数citySelectChange
  citySelect.onchange = citySelectChange;
}

/**
 * 初始化图表需要的数据格式
 */
 function initAqiChartData() {
  // 将原始的源数据处理成图表需要的数据格式
  // 处理好的数据存到 chartData 中
  // 初始化数据 1选择日时的数据 2用来作为 周 月 的基础数据
  var citySelect = document.getElementById("city-select");
  pageState.nowSelectCity = citySelect.children[citySelect.selectedIndex].childNodes[0].nodeValue;
  var nowCityData = aqiSourceData[pageState.nowSelectCity];
  if (pageState.nowGraTime == "day") {
  	chartData = nowCityData;
  } 	
	//选择 周 时
	if (pageState.nowGraTime == "week") {
		chartData = {};
		var countSum=0, daySum=0, week=0;
		for (var key in nowCityData) {
			countSum += nowCityData[key];
			daySum ++;
			// 判断星期日 为一周  计算平均数据 清零 
			if ((new Date(key)).getDay() == 0 ) {
				week ++;
				chartData['第'+week+'周'] = Math.floor(countSum/daySum);;
				countSum = 0;
				daySum = 0;
			}
		}
		//保证最后一周若不满也能算一周
		if (daySum!=0) {
			week ++;
			chartData['第'+week+'周'] = Math.floor(countSum/daySum);
		}
	}
	//当选择 月 时
	if (pageState.nowGraTime == 'month') {
		chartData = {};
		var countSum=0, daySum=0, month=0;
		for (var key in nowCityData) {
			countSum += nowCityData[key];
			daySum ++;
			// 当月份改变时  计算上个月的数据 清零
			if ((new Date(key)).getMonth() !== month) {
				month ++;
				chartData['第'+month+'月'] = Math.floor(countSum/daySum);
				countSum = 0
				daySum = 0;
			}
		}
		if (daySum != 0) {
			month ++;
			chartData['第'+month+'月'] = Math.floor(countSum/daySum);
    }
  }

}

/**
 * 初始化函数
 */
 function init() {
  initGraTimeForm()
  initCitySelector();
  initAqiChartData();
}

init();
