//公用函数

//addLoadEvent函数
function  addLoadEvent(func){
	var oldonload=window.onload;
	if(typeof window.onload!='function'){
		window.onload=func;
	}else{
		window.onload=function(){
			oldonload();
			func();
		}
	}
}

//insertAfter函数
function insertAfter(newElement,targetElement){
	var parent=targetElement.parentNode;
	if(parent.lastChild==targetElement){
		parent.appendChild(newElement);
	}else{
		parent.insertBefore(newElement,targetElement.nextSibling);
	}
}

//addClass函数
function addClass(element,value){
	if(!element.className){
		element.className=value;
	}else{
		newClassName=element.className;
		newClassName+=" ";
		newClassName+=value;
		element.className=newClassName;
	}
}

//为当前页面的a添加class="here" 为body添加id="home"/"about"/"contact"...
function highlightPage(){
	if(!document.getElementsByTagName){return false;}
	var headers=document.getElementsByTagName("header");
	if(headers.length==0){return false;}
	var navs=headers[0].getElementsByTagName("nav");
	if(navs.length==0){return false;}
	var links=navs[0].getElementsByTagName("a");
	var linkurl;
	for(var i=0;i<links.length;i++){
		linkurl=links[i].getAttribute("href");
		if(window.location.href.indexOf(linkurl)!=-1){
			links[i].className="here";
			var linktext=links[i].lastChild.nodeValue.toLowerCase();
			document.body.setAttribute("id",linktext);
		}
	}
}
addLoadEvent(highlightPage);

//home开始

//moveElement函数
function moveElement(elementID,final_x,final_y,interval){
	if(!document.getElementById){return false;}
	if(!document.getElementById(elementID)){return false;}
	var elem=document.getElementById(elementID);
	if(elem.movement){
		clearTimeout(elem.movement);
	}
	if(!elem.style.left){
		elem.style.left="0px";
	}
	if(!elem.style.top){
		elem.style.top="0px";
	}
	var xpos=parseInt(elem.style.left);
	var ypos=parseInt(elem.style.top);
	if(xpos==final_x&&ypos==final_y){
		return true;
	}
	if(xpos<final_x){
		var dist=Math.ceil((final_x-xpos)/10);
		xpos+=dist;
	}
	if(xpos>final_x){
		var dist=Math.ceil((xpos-final_x)/10);
		xpos-=dist;
	}
	if(ypos<final_y){
		var dist=Math.ceil((final_y-ypos)/10);
		ypos+=dist;
	}
	if(ypos>final_y){
		var dist=Math.ceil((ypos-final_y)/10);
		ypos-=dist;
	}
	elem.style.left=xpos+"px";
	elem.style.top=ypos+"px";
	var repeat="moveElement('"+elementID+"',"+final_x+","+final_y+","+interval+")";
	elem.movement=setTimeout(repeat,interval);
}
//prepareSlideshow函数  用于插入图片
function prepareSlideshow(){
	if(!document.getElementById){return false;}
	if(!document.getElementsByTagName){return false;}
	if(!document.getElementById("intro")){return false;}
	var intro=document.getElementById("intro");
	var slideshow=document.createElement("div");
	slideshow.setAttribute("id","slideshow");
	var frame=document.createElement("img");
	frame.setAttribute("src","images/frame.gif");
	frame.setAttribute("alt","");
	frame.setAttribute("id","frame");
	slideshow.appendChild(frame);
	var preview=document.createElement("img");
	preview.setAttribute("src","images/slideshow.gif");
	preview.setAttribute("id","preview");
	slideshow.appendChild(preview);
	insertAfter(slideshow,intro);
	var links=document.getElementsByTagName("a");
	var destination;
	for(var i=0;i<links.length;i++){
		links[i].onmouseover=function(){
			destination=this.getAttribute("href");
			if(destination.indexOf("index.html")!=-1){
				moveElement("preview",0,0,5);
			}
			if(destination.indexOf("about.html")!=-1){
				moveElement("preview",-150,0,5);
			}
			if(destination.indexOf("photos.html")!=-1){
				moveElement("preview",-300,0,5);
			}
			if(destination.indexOf("live.html")!=-1){
				moveElement("preview",-450,0,5);
			}
			if(destination.indexOf("contact.html")!=-1){
				moveElement("preview",-600,0,5);
			}
		}
	}
}
addLoadEvent(prepareSlideshow);
//home结束


//about开始

//showSection函数  根据指定的id显示相应的section
function showSection(id){
	var sections=document.getElementsByTagName("section");
	for(var i=0;i<sections.length;i++){
		if(sections[i].getAttribute("id")!=id){
			sections[i].style.display="none";
		}else{
			sections[i].style.display="block";
		}
	}
}

//prepareInternalnav函数  
function prepareInternalnav(){
	var articles=document.getElementsByTagName("article");
	if(articles.length==0){return false;}
	var navs=articles[0].getElementsByTagName("nav");
	if(navs.length==0){return false;}
	var links=navs[0].getElementsByTagName("a");
	for(var i=0;i<links.length;i++){
		var sectionId=links[i].getAttribute("href").split("#")[1];
		if(!document.getElementById(sectionId)){continue;}
		document.getElementById(sectionId).style.display="none";
		links[i].destination=sectionId;
		links[i].onclick=function(){
			showSection(this.destination);
			return false;
		}
	}
}
addLoadEvent(prepareInternalnav);
//about结束


//photos开始

//创建img（图片占位符）和p（图片说明文字）元素
function preparePlaceholder(){
	if(!document.createElement){return false;}
	if(!document.createTextNode){return false;}
	if(!document.getElementById){return false;}
	if(!document.getElementById("imagegallery")){return false;}
	var placeholder=document.createElement("img");
	placeholder.setAttribute("id","placeholder");
	placeholder.setAttribute("src","images/placeholder.gif");
	placeholder.setAttribute("alt","my image gallery");
	var description=document.createElement("p");
	description.setAttribute("id","description");
	var desctext=document.createTextNode("Choose an image");
	description.appendChild(desctext);
	var gallery=document.getElementById("imagegallery");
	insertAfter(description,gallery);
	insertAfter(placeholder,description);
	
}

//用相应图片的链接替换占位符的链接
function showPic(whichpic){
	if(!document.getElementById("imagegallery")){return true;}
	var source=whichpic.getAttribute("href");
	var palceholder=document.getElementById("placeholder");
	palceholder.setAttribute("src",source);
	if(!document.getElementById("description")){return false;}
	if(whichpic.getAttribute("title")){
		var text=whichpic.getAttribute("title");
	}else{
		text="";
	}
	var description=document.getElementById("description");
	if(description.lastChild.nodeType==3){
		description.lastChild.nodeValue=text;
	}
	return false;//去除点击链接的默认行为
}

//为每个链接注册事件
function prepareGallery(){
	if(!document.getElementById){return false;}
	if(!document.getElementsByName){return false;}
	if(!document.getElementById("imagegallery")){return false;}
	var gallery=document.getElementById("imagegallery");
	var links=gallery.getElementsByTagName("a");
	for(var i=0;i<links.length;i++){
		links[i].onclick=function(){
			return showPic(this);
		}
	}
}

addLoadEvent(preparePlaceholder);
addLoadEvent(prepareGallery);
//photos结束


//live 开始

//单双行不同色
function stripeTables(){
	if(!document.getElementsByTagName){return false;}
	var tables=document.getElementsByTagName("table");
	for(var i=0;i<tables.length;i++){
		var odd=false;
		var rows=tables[i].getElementsByTagName("tr");
		for(var j=0;j<rows.length;j++){
			if(odd==true){
				addClass(rows[j],"odd");
				odd=false;
			}else{
				odd=true;
			}
		}
	}
}

//鼠标悬浮时 突出显示
function highlightRows(){
	if(!document.getElementsByTagName){return false;}
	var rows=document.getElementsByTagName("tr");
	for(var i=0;i<rows.length;i++){
	rows[i].oldClassName=rows[i].className;
	rows[i].onmouseover=function(){
		addClass(this,"highlight")
	}
	rows[i].onmouseout=function(){
		this.className=this.oldClassName;
	}
	}
}
addLoadEvent(stripeTables);
addLoadEvent(highlightRows);

//显示缩略词
function displayAbbreviations(){
	if(!document.getElementsByTagName ||!document.createElement ||!document.createTextNode){return false;}
	var abbreviations=document.getElementsByTagName("abbr");
	if(abbreviations.length<1){return false;}
	var defs=new Array();
	for(var i=0;i<abbreviations.length;i++){
		var current_abbr=abbreviations[i];
		if(current_abbr.childNodes.length<1){continue;}
		var defination=current_abbr.getAttribute("title");
		var key=current_abbr.lastChild.nodeValue;
		defs[key]=defination;
	}
	
	var dlist=document.createElement("dl");
	for( key in defs){
		var defination=defs[key];
		var dtitle=document.createElement("dt");
		var dtitle_text=document.createTextNode(key);
		dtitle.appendChild(dtitle_text);
		var ddesc=document.createElement("dd");
		var ddeesc_text=document.createTextNode(defination);
		ddesc.appendChild(ddeesc_text);
		dlist.appendChild(dtitle);
		dlist.appendChild(ddesc);
	}
	if(dlist.length<1){return false;}
	var header=document.createElement("h3");
	var header_text=document.createTextNode("Abbreviations");
	header.appendChild(header_text);
	var articles=document.getElementsByTagName("article");
	if(articles.length==0){return false;}
	var container=articles[0];
	container.appendChild(header);
	container.appendChild(dlist);
}

addLoadEvent(displayAbbreviations);
//live 结束


//contact开始

//点击 label 时，让其关联的表单获取焦点
function focusLabels(){
	if(!document.getElementsByTagName){return false;}
	var labels=document.getElementsByTagName("label");
	for(var i=0;i<labels.length;i++){
		if(!labels[i].getAttribute("for")){continue;}
		labels[i].onclick=function(){
			var id=labels[i].getAttribute("for");
			if(!document.getElementById(id)){return false;}
			var element=document.getElementById(id);
			element.focus();//让element获取焦点
		}
	}
}

addLoadEvent(focusLabels);

//占位符的值
function resetFields(whichfrom){
	if(Modernizr.input.placeholder){return;}
	for(var i=0;i<whichfrom.elements.length;i++){
		var element=whichfrom.elements[i];
		if(element.type=="submit"){continue;}
		var check=element.getAttribute("placeholder");
		if(!check){continue;}
		element.onfocus=function(){
			var text=this.getAttribute("placeholder");
			if(this.value==text){
				this.value="";
			}
			element.onblur=function(){
				if(this.value==""){
					this.value=this.getAttribute("placeholder");
				}
			}
		}
		element.onblur();
	}
}


//检查是否输入了内容
function isFilled(field){
	if(field.value.length==0){return false;}
	var placeholder=field.getAttribute("placeholder");
	return (field.value!=placeholder);
}

//检查是否是邮箱
function isEmail(field){
	return (field.value.indexOf("@")!=-1 && field.value.indexOf(".")!=-1);
}

//检查表单是否合法（调用isEmail()、isFilled()函数）
function validateForm(whichform){
	for(var i=0;i<whichform.elements.length;i++){
		var element=whichform.elements[i];
		if(element.getAttribute("required")=="required"){
			if(!isFilled(element)){
				alert("Please fill in the "+element.name+"field.");
				return false;
			}
		}
		if(element.getAttribute("type")=="email"){
			if(!isEmail(element)){
				alert("The "+element.name+"field must be a valid email adress.");
				return false;
			}
		}
	}
	return true;
}

//onsubmit事件处理函数
function prepareForms(){
	for(var i=0;i<document.forms.length;i++){
		var thisform=document.forms[i];
		resetFields(thisform);
		thisform.onsubmit=function(){
		if(!validateForm(this)){return false;}
		var article=document.getElementsByTagName("article")[0];
		if(submitFormwithAjax(this,article)){return false;}
		return true;
		}
	}
}


addLoadEvent(prepareForms);

//Ajax

//获得XMLHttpRequest对象
function getHTTPObject(){
	if(typeof XMLHttpRequest=="undefined"){
		XMLHttpRequest=function(){
		try{return new ActiveXObject("Msxml2.XMLHTTP.6.0");}
		catch(e){}
		try{return new ActiveXObject("Msxml2.XMLHTTP.3.0");}
		catch(e){}
		try{return new ActiveXObject("Msxml2.XMLHTTP");}
		catch(e){}
		return false;
		}
	}
	return new XMLHttpRequest();
}

//清空element元素的子元素，再将loading.gif添加到element中
function displayAjaxLoading(element){
	while(element.hasChildNodes()){
		element.removeChild(element.lastChild);
	}
	var content=document.createElement("img");
	content.setAttribute("src","images/loading.gif");
	content.setAttribute("alt","Loading...");
	element.appendChild(content);
}

//发送请求，并处理请求
function submitFormwithAjax(whichform,thetarget){
	var request=getHTTPObject();
	if(!request){return false;}
	displayAjaxLoading(thetarget);
	var dataParts=[];
	var element;
	for(var i=0;i<whichform.elements.length;i++){
		element=whichform.elements[i];
		dataParts[i]=element.name+ "=" +encodeURIComponent(element.value);
	}
	var data=dataParts.join("&");
	request.open("GET",whichform.getAttribute("action"),true);
//	request.setRequestHeader("Content-type","application/x-www-form-urlencoded");
	//处理函数
	request.onreadystatechange=function(){
		if(request.readyState==4){
		if(request.status==200||request.status==0){
			var matches=request.responseText.match(/<article>([\s\S]+)<\/article>/);
			if(matches.length>0){
				thetarget.innerHTML=matches[1];
			}else{
				thetarget.innerHTML="<p>Oops, there was an error.Sorry.</p>";
			}
		}else{
			thetarget.innerHTML="<p>"+request.statusText+"</p>";
		}
		}
	};
	request.send(data);
	return true;
}