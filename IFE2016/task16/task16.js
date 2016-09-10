window.onload = function(){
/**
 * aqiData，存储用户输入的空气指数数据
 * 示例格式：
 * aqiData = {
 *    "北京": 90,
 *    "上海": 40
 * };
 */
var aqiData = {};
var cities =[];
var i = 0;
/**
 * 从用户输入中获取数据，向aqiData中增加一条数据
 * 然后渲染aqi-list列表，增加新增的数据
 */
function addAqiData() {
	//写在函数里 每次都调用
	var city = document.getElementById("aqi-city-input").value.trim();
	var value = document.getElementById("aqi-value-input").value.trim();
	
	if(!(/^[a-z\u4e00-\u9fa5]+$/i.test(city))){alert("城市名必须为中英文字符");}
	else if(!(/^[0-9]+$/i.test(value))){alert("空气质量指数必须为整数");}
	else{aqiData[city] = value;}
}

/**
 * 渲染aqi-table表格
 */
function renderAqiList() {
	var table = document.getElementById("aqi-table");
	var tr = "<tr><td>城市</td><td>空气质量</td><td>操作</td></tr>";
	
	for (var city in aqiData) {
		tr += "<tr><td>"+city+"</td><td>"+aqiData[city]+"</td><td><button class='delBtn'>删除</button></td></tr>";
	}
		table.innerHTML = tr;
}

/**
 * 点击add-btn时的处理逻辑
 * 获取用户输入，更新数据，并进行页面呈现的更新
 */
function addBtnHandle() {
	addAqiData();
	renderAqiList();	
}

/**
 * 点击各个删除按钮的时候的处理逻辑
 * 获取哪个城市数据被删，删除数据，更新表格显示
 */
function delBtnHandle(event) {
	// do sth.
	var target = event.target.parentNode.parentNode.childNodes[0].innerHTML;
	delete aqiData[target];
  	renderAqiList();
}

function init() {
	var btn = document.getElementById("add-btn");
	// 在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandle函数
	btn.onclick = addBtnHandle;
	// 想办法给aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函数
	var delBtn = document.getElementsByClassName("delBtn");
	var table = document.getElementById("aqi-table");
	 	table.onclick = function(event){
			delBtnHandle(event);
		}
}
init();
}