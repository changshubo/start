/**
 * 生成验证码
 * 参数{ 
 *		 size:表示验证码的位数 
 *	   } 
 * 例： createCheckCode(5); 生成5位长度的验证码
 */
function createCheckCode(size){
	var list = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z',0,1,2,3,4,5,6,7,8,9];
	var temp = [];
	for(var i=0; i<size; i++){
		temp.push( list[parseInt(Math.random()*list.length)] );
	}
	return temp.join("").toUpperCase();
}

/**
	根据指定的范围大小生成一个随机整数
	参数 min表示下限  max表示上限
	例： randomInt(5,18); 生成一个5-18的随机数，包含5和18
*/
function randomInt(min, max){
	return Math.round(Math.random()*(max-min)) + min;
}

/**
	将一个日期对象转换成一个字符串
	参数：
		d 日期对象
		sep 转换字符串以后的分隔符
	例：date2String(new Date(2008,12,9), "/")
	结果： 返回字符串 "2008/12/09 00:00:00"
*/
function date2string(d, sep){
	sep = sep || "-";
	function toDouble(num){
		return num<10?"0"+num:num;
	}
	return d.getFullYear()+sep+ toDouble(d.getMonth()+1) + sep + toDouble(d.getDate()) + " " + toDouble(d.getHours()) + ":" + toDouble(d.getMinutes()) + ":" + toDouble(d.getSeconds());
}

/**
	将一个日期字符串转成一个日期对象
	参数:
		datestr 日期字符串
		sep 日期字符串使用的分隔符
	例： string2Date("1989.5.26",".");
	结果： 返回一个日期对象
*/
function string2date(datestr,sep) {
	//2016-08-09 || 2016/09/12
	var str = datestr.replace(new RegExp(sep,"g"),"-");
	return new Date(str);
}

/**
	计算N天以后的日期
	参数: 
		n 天数  number类型
	返回日期对象
	例： afterNday(7)
*/
function afterNday(n){
	var now = new Date();
	now.setDate( now.getDate()+n );
	return now;
}

/**
	计算两个日期之间的间隔
	参数：
		start 日期对象
		end 日期对象
	返回 两个日期相隔的天数
	例：between(new Date("2016-11-09"), new Date("2046-10-05"))
*/
function between(start, end){
	return Math.abs(start.getTime() - end.getTime())/(24*60*60*1000);
}


function randomColor(){
	var R = Math.round(Math.random()*255).toString(16);
	var G = Math.round(Math.random()*255).toString(16);
	var B = Math.round(Math.random()*255).toString(16);
	return "#"+(R.length<2?"0"+R:R)+(G.length<2?"0"+G:G)+(B.length<2?"0"+B:B);
}

function getElementsByClassName4IE(classname){
	var alldom = document.getElementsByTagName("*");
	var arr = [];
	for(var i=0; i<alldom.length; i++){
		var arr1=alldom[i].className.split(" ");
		for(var j in arr1){
			if(arr1[j]==classname){
			arr.push(alldom[i]);
			}
		}
	}
	return arr;
}

function getChildren(ele) {
	//
}

/**
 * 
 * @param {Object} obj 目标对象
 * @param {Object} json 要改变的属性
 * @param {Object} extend {buffer,callback} 当buffer为true时为弹性运动
 *  callback会在运动结束时，被执行
 * animate(obj, {top:500, left: 300}, {callback:function(){}, buffer: "elasitic"})
 */
function animate(obj, json, extend){
	if(obj.isMoving){
		return;
	} else {
		stop();
		obj.isMoving = true;
	}
	
	obj.timerlist = {};
	//为每一个属性添加一个定时器
	for(var attr in json){
		(function(attr){
			obj.timerlist[attr] = {speed:0};
			obj.timerlist[attr].timer = setInterval(function(){
				//首先得到当前值
				var iNow = 0;
				if(attr == "opacity"){
					iNow = parseFloat( parseFloat(getStyle(obj, attr)) * 100 ); 
				} else {
					iNow = parseFloat( getStyle(obj, attr) );
				}
				var speed = obj.timerlist[attr].speed;
				//根据目标值，计算需要的速度
				if(extend && extend.buffer=="elasitic"){
					speed += (json[attr] - iNow)/5;
					speed *= 0.75;
				} else {
					speed = (json[attr] - iNow)/5;
				}
				//speed > 0 ? speed=Math.ceil(speed) : speed=Math.floor(speed);
				//当无限接近目标值时，停止定时器
				if(Math.abs(iNow - json[attr]) < 0.1){
					//直接等于目标值
					if(attr == "opacity") {
						obj.style.opacity = json[attr]/100;
						obj.style.filter = "alpha(opacity="+json[attr]+")";
					} else {
						obj.style[attr] = json[attr]+"px";
					}
					clearInterval(obj.timerlist[attr].timer);
					delete obj.timerlist[attr];
					if(getObjLength(obj.timerlist)==0){//所有定时器已停止
						stop();
						(extend && extend.callback) ? extend.callback() : "";
					}
				} else {
					//根据速度，修改当前值
					if(attr == "opacity"){
						obj.style.opacity = (iNow+speed)/100;
						obj.style.filter = 'alpha(opacity=' + parseFloat(iNow+speed) + ')';			
					} else {
						obj.style[attr] = iNow+speed+"px";
					}
					obj.timerlist[attr].speed = speed;
				}
			}, 30);
		})(attr);
	}
	
	function clearTimer(){
		for(var i in obj.timerlist){
			clearInterval(obj.timerlist[i]);
		}
	}
	function getStyle(obj, attr){
		if(obj.currentStyle){
			return isNaN(parseFloat(obj.currentStyle[attr])) ? obj.style[attr]=0 : obj.currentStyle[attr];
		} else {
			return isNaN(parseFloat(getComputedStyle(obj, null)[attr])) ? obj.style[attr]=0 : getComputedStyle(obj, null)[attr];
		}
	}
	function getObjLength(obj){
		var n = 0;
		for(var i in obj){
			n++;
		}
		return n;
	}
	function stop(){
		clearTimer();//清除所有定时器
		obj.isMoving = false;
	}
}








