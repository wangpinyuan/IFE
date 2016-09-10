// 2016/8/25 By Y
function Form(label,type,validator,rules,success,fail){
	this.label = label;
	this.type = type;
	this.validator = validator;//验证规则
	this.rules = rules;//规则提示
	this.success = success;
	this.fail = fail;

}
Form.prototype = {
	createInput:function(){
		var name = textname.value;//
		var labelText = document.createTextNode(this.label);//
		var spanText = document.createTextNode(this.rules);//
		var div = document.createElement("div");
		var label = document.createElement("label");
		var input = document.createElement("input");
		var span = document.createElement("span");
		
		input.setAttribute("type",this.type);//
		input.setAttribute("name",this.validator);//

		div.appendChild(label);
		label.appendChild(labelText);
		span.appendChild(spanText);
		mainform.appendChild(div);
		insertAfter(input,label);
		insertAfter(span,input);
		// console.log(this)
		this.Validator();

	},
	createRadio:function(b){
		var name = textname.value;
		var div = document.createElement("div");
		div.innerHTML = "<label>"+name+"</label>";	
		for (var i = 0; i < b.length; i++) {
			var labelText = document.createTextNode(b[i]);
			var label = document.createElement("label");	
			var input = document.createElement("input");
			//设置input
			input.setAttribute("type","radio");
			input.setAttribute("name",name);
			//
			label.appendChild(labelText);
			div.appendChild(label);
			label.parentElement.insertBefore(input,label);
		}
		mainform.appendChild(div);

	},

	createCheckbox:function (b){
	var name = textname.value;
	var div = document.createElement("div");
	div.innerHTML = "<label>"+name+"</label>";		
	for (var i = 0; i < b.length; i++) {
		var labelText = document.createTextNode(b[i]);
		var label = document.createElement("label");	
		var input = document.createElement("input");
		input.setAttribute("type","checkbox");
		input.setAttribute("name",name);
		label.appendChild(labelText);
		div.appendChild(label);
		label.parentElement.insertBefore(input,label);
	}
	mainform.appendChild(div);

	},

	createSelect:function (b){
		var name = textname.value;
		var div = document.createElement("div");
		var select = document.createElement("select");
		div.innerHTML = "<label>"+name+"</label>";		
		for (var i = 0; i < b.length; i++) {
			var optionText = document.createTextNode(b[i]);
			var option = document.createElement("option");	
			option.appendChild(optionText);
			select.appendChild(option);
			console.log(option.value)
		}
		div.appendChild(select);
		mainform.appendChild(div);

	},
	Validator:function(){	
	var inputs = mainform.getElementsByTagName("input");
	for (var i = 0; i < inputs.length; i++) {
		inputs[i].onblur = function(e){
			switch(this.name){
				case 'text':
			// flag = /^[a-zA-Z0-9_]{4,16}$/.test(this.value.trim().replace(/[^x00-xff]/g,"nn"));
					if(/^[a-zA-Z0-9_]{4,16}$/.test(this.value.trim().replace(/[^x00-xff]/g,"nn"))){
						this.nextSibling.innerHTML = "格式正确";
						this.nextSibling.style.color = "green";
					}else{
						this.nextSibling.innerHTML = "格式错误";
						this.nextSibling.style.color = "red";
					}
					break;
				case 'email':
					if(/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(this.value)){
						this.nextSibling.innerHTML = "邮箱格式正确";
						this.nextSibling.style.color = "green";
					}else{
						this.nextSibling.innerHTML = "邮箱格式错误";
						this.nextSibling.style.color = "red";
					}
					break;
				case 'password1':
					var nowPassword  = this.value;
					if(/^\S{6,12}$/.test(this.value)){
						this.nextSibling.innerHTML = "密码格式正确";
						this.nextSibling.style.color = "green";
					}else{
						this.nextSibling.innerHTML = "密码格式错误";
						this.nextSibling.style.color = "red";
					}
					break;
				case 'password2':
					if(this.value == nowPassword){
						this.nextSibling.innerHTML = "密码正确";
						this.nextSibling.style.color = "green";
					}else{
						this.nextSibling.innerHTML = "与原密码不一致";
						this.nextSibling.style.color = "red";
					}
					break;
				case 'phone':
					if(/^[1][0-9]{10}$/.test(this.value)){
						this.nextSibling.innerHTML = "手机号码正确";
						this.nextSibling.style.color = "green";
					}else{
						this.nextSibling.innerHTML = "格式错误";
						this.nextSibling.style.color = "red";
					}
					break;
				case 'qq':
					if(/^[1-9][0-9]{4,8}$/){
						this.nextSibling.innerHTML = "格式正确";
						this.nextSibling.style.color = "green";
					}else{
						this.nextSibling.innerHTML = "格式错误";
						this.nextSibling.style.color = "red";
					}
					break;
			}
		}
	}
	}
};
(function(){
var submitBtn = document.getElementById("button");//提交按钮
var mainform = document.getElementById("mainform");
var textname = document.getElementById("textname");//名称
var texttype = document.getElementById("texttype");//类型
// 
submitBtn.addEventListener("click",function(event){
	switch(type.selectedIndex){
		case 0:	
			switch(texttype.selectedIndex){
				case 0:
					var text = new Form(textname.value,"text","text","请输入"+textname.value+",4-16个字符","格式正确","格式错误");
					text.createInput();
					break;
				case 1:
					var email = new Form("邮箱","text","email","请确认邮箱","邮箱格式正确","格式错误");		
					email.createInput();
					break;
				case 2:
					var password1 = new Form("密码","password","password1","请输入密码,6-12位","密码格式正确","密码格式不规范");
					var password2 = new Form("密码确认","password","password2","请确认密码","密码正确","与原密码不一致");
					password1.createInput();
					password2.createInput();
					break;
				case 3:
					var phone = new Form("电话","text","phone","请输入电话","格式正确","格式错误");
					phone.createInput();
					break;
				case 4:
					var qq = new Form("QQ","text","qq","请输入QQ","格式正确","格式错误");
					qq.createInput();
					break;
			}
			break;
		case 1:	
			if(!options.getOptions().length){
				alert("选项不能为空！")
			}else{
				var radio = new Form(textname.value);
				radio.createRadio(options.getOptions());
			}
			break;
		case 2:	
			if(!options.getOptions().length){
				alert("选项不能为空！")
			}else{
				var checkbox = new Form();
				checkbox.createCheckbox(options.getOptions());
			}
			break;
		case 3:	
			if(!options.getOptions().length){
				alert("选项不能为空！")
			}else{
				var select = new Form();
				select.createSelect(options.getOptions());
			}
			break;
	}
	event.preventDefault();
},false);

//aside textarea的
var textarea = document.getElementsByTagName("textarea")[0];
var showOptions = document.getElementById("options");
var btn = document.getElementsByTagName("button")[0];
btn.addEventListener("click",function(event){
	options.pushDatas();
	event.preventDefault();
},false);	
// 
var options = {
	b : [],
	c : [],

	pushDatas:function (){
	// console.log(this)
		var text = this.check();
		for (var i = 0; i < text.length; i++) {
			this.b.push(text[i]);
		}
		this.equal();
		this.showDatas();
	},
	showDatas:function (){
		var	text = "";
		for (var i = 0; i < this.b.length; i++) {
			text +="<span>"+this.b[i]+"</span>";
		}
		showOptions.innerHTML = text;
		this.deleteDatas();
	},
	deleteDatas:function (){
		that = this;
		for (var i = 0; i < this.b.length; i++) {
			showOptions.childNodes[i].index=i;
			showOptions.childNodes[i].onclick = function(){
				that.b.splice(this.index,1);
				that.showDatas();
			}
		}
	},
	check:function (){
		var text = textarea.value.trim().split(/,|\r|\s|、/g);
		if(this.b.length == 10){
			this.b.shift();
			this.check();
		}
		for (var i = 0; i < text.length; i++) {
			this.c.push(text[i]);
		}

		for (var i = 0; i < this.c.length-1; i++) {
			for (var j = i+1; j < this.c.length; j++) {
				if(this.c[i] == this.c[j]){
					this.equal();
					alert("不可重复输入");
					return false;
				}
			}
		}
		this.equal();
		return text;
	},
	equal:function (){
		this.c = [];
		for (var i = 0; i < this.b.length; i++) {
			this.c[i] = this.b[i];
		}
	},
	getOptions:function(){
		return this.b;
	}
};
})();
(function(){
	var type = document.getElementById("type");
	var divTexttype = document.getElementById("divTexttype");
	var divOptions = document.getElementById("divOptions");
	type.addEventListener("change",function(){
		if(type.selectedIndex == 0){
			divTexttype.style.display = "block";
			divOptions.style.display = "none";
		}else{
			divTexttype.style.display = "none";
			divOptions.style.display = "block";
		}
	});	
})();
// 
function insertAfter(newElement,targetElement){
	var parent = targetElement.parentNode;
	if(parent.lastChild == targetElement){
		parent.appendChild(newElement);
	}else{
		parent.insertBefore(newElement,targetElement.nextSibling)
	}
}
