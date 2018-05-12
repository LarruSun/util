/**
 * Created by zenghaoming on 2018/1/09/0009.
 */
var LarrySun={};

/***********************************************************************************************
 ************************************************************************************************
 *************************************************************************************************/
/*
 1、 从数组arr中查找最值，flag值为true时求最小值，fals为最大值  省略为false；
 如：从数组arr中求最大值：MMValue(arr,flase)或MMValue(arr)；从数组arr中求最小值：MMValue(arr,true)
 */
LarrySun.MMValue=function(arr, flag) {
    if(!(arr &&  typeof arr==='object' && Array==arr.constructor)){

    }
    var result = arr[0];
    for (var i = 0; i < arr[i]; i++) {
        if (flag) {
            if (arr[i] < result)
                result = arr[i];
        }
        else {
            if (arr[i] > result)
                result = arr[i];
        }
    }
    return result;
};
/***********************************************************************************************
 ************************************************************************************************
 *************************************************************************************************/
/*
 2、 检查str内容是否符合要求，QQ号码的输入是否合法
 如：从数组arr中求最大值：MMValue(arr,flase)或MMValue(arr)；从数组arr中求最小值：MMValue(arr,true)
 */
 LarrySun.checksNum=function(str) {
     if(typeof str!="string"){
         throw  new Error('LarrySun:The argument must be typeof string!!');
     }
    if (str == '') {
        alert('请输入QQ号码');
        return;
    }
    if (isNaN(str)) {
        alert('请输入数字');
        return;
    }
    if (parseInt(str) != parseFloat(str)) {
        alert('请输入整数');
        return;
    }
    if (str.substr(0, 1) == 0) {
        alert('不能用数字开头！')
        return;
    }
    if ((str.length < 5) || (str.length > 10)) {
        alert('必须在5到10位！')
        return;
    }
};
/***********************************************************************************************
 ***********************************************************************************************
 ***********************************************************************************************/
/*
 3、 取随机数，（1）star表示要取值范围的最小值，（2）end表示最大值，（3）count表示要取值的个数，（4）noInteger=false（或省略）则
     表示取整， true表示不取整返回数组，（5）noRepear=FALSE（或省略）表示取重复项，TRUE表示不取重复项
 如：LarrySun.myRandom(1,20,18,'','true')//表示取出18个1到20的随机数 取整不取重复项
 */
LarrySun.myRandom=function (star, end, count, noInteger, noRepeat) {
    var result = [];
    var num;
    var myFlag=false;
    //参数检测
    if(star>=end)
    throw  new Error('LarrySun_The star value must be less than the value of end!!!');
    if(count<=0)
    throw  new Error('LarrySun_The random number must be greater than zero!!!');
    if(parseInt(count)!=count)
    throw new Error('LarrySun_The random number must be integer!!!');
    //生成随机数
    for (var i = 0; i < count; i++) {
        if (!noInteger)
            num = Math.round(Math.random() * (end - star) + star);
        else
             num = Math.random() * (end - star) + star;
    //去重
        if(noRepeat){
            if(end-star<count && !noInteger){
                throw new Error('LarrySun_The number of Random to much!!!');
            }
            for (var j = 0; j <i; j++) {
                if (num == result[j]) {
                    myFlag = true;
                    break;
                }
                myFlag = false;
            }
            if(myFlag){
                i--;
                continue;
            }
        }
        result.push(num);
    }
    return result;
};

/***********************************************************************************************
 ***********************************************************************************************
 ***********************************************************************************************/
/*
 4、 让文字逐个显示，模拟打字机效果，str为要模拟的文字，showDiv为显示内容盒子的ID名，timers为间隔多少毫秒打出一个字
 如： <span id="div1"></span>  typerShow(str,'div1',100);则表示在span上显示str文本内容，每间隔100毫秒出现一个字
 */
LarrySun.typerShow=function (str, showDiv, timers) {
    var myShowDiv = document.getElementById(showDiv);
    var arr = str.split('');
    clearInterval(timer);
    //清除定时器
    var timer = setInterval(function () {
        myShowDiv.innerHTML += arr.shift();//将 arr数组在前面删除一个元素，返回删除的元素
        if (arr.length == 0) {
            clearInterval(timer);
        }
    }, timers);
};

/***********************************************************************************************
 ***********************************************************************************************
 ***********************************************************************************************/
/*
 5、 用于获取行内css样式div1为要获取的盒子ID，strr为要获取的样式，若找不到该样式则返回null;
 如： getStyle('div1','height');获取ID为div1盒子的高度
 */
LarrySun.getStyle=function(div1,sttr){
    var div=document.getElementById('div1');
    if(window.getComputedStyle){
        if(getComputedStyle(div)[sttr] == 'auto'){
            //var str= '没有找到该ID号为 ' +div1 + ' 盒子的 ' + sttr +  ' 属性';
            //alert(str);
            return null;
        }
        else
            return getComputedStyle(div)[sttr];
    }
    else{
        if(currentStyle(div)[sttr]=='auto'){
            //var str= '没有找到该ID号为 ' +div1 + ' 盒子的 ' + sttr +  ' 属性';
            //alert(str);
            return null;
        }
        else
            return currentStyle(div)[sttr];//IE8及其一下版本
    }
};

/***********************************************************************************************
 ***********************************************************************************************
 ***********************************************************************************************/
/*
 6、 用于设置css样式div1为要设置盒子的ID，strr为要设置的属性，sttrNum为属性的值
 如：   setStyle('div2','backgroundColor','red');设置ID为div2盒子的背景颜色为red
 */
LarrySun.setStyle=function (div1 ,sttr,sttrNum ){
    var mydiv=document.getElementById('div1');
    mydiv['style'][sttr]=sttrNum;
};

/***********************************************************************************************
 ***********************************************************************************************
 ***********************************************************************************************/
/*
 7、 用于通过class选择元素的兼容性写法， myID接收父级节点ID 如果没有父级节点则直接传入document， sClass 子节点的className。返回数组
 如： arr= myGetByClassName('div2','asd')或arr= myGetByClassName('document','asd')（没有父级节）
 获取ID为div2或document下面所有class为asd的元素；并保存到数组arr中
 */
LarrySun.myGetByClassName=function (myID,sClass){
    //判断时传入document
    if(myID=='document'){
        var elem = document.getElementsByTagName('*');//所有标签
    }else{
        var myIDs = document.getElementById(  myID );
        var elem = myIDs.getElementsByTagName('*');
    }

    var arr =[];
    for(var i=0;i<elem.length;i++){
        if(elem[i].className == sClass){
            //将找到的classname = sClass 元素保存到 arr中
            arr.push(elem[i]);
        }
    }
    return arr;
};

/***********************************************************************************************
 ***********************************************************************************************
 ***********************************************************************************************/
/*
 8、 用于获取窗口可视区的高度，直接返回高度
 如： height= viewH()直接返回可视区的高度并赋值给height
 */
LarrySun.viewH=function (){
    return document.documentElement.clientHeight;
};

/***********************************************************************************************
 ***********************************************************************************************
 ***********************************************************************************************/
/*
 9、 设置滚动高度的兼容性写法（ document.documentElement.scrollTop ie浏览器 ， document.body.scrollTop  火狐或chrome）
 如： setScroll(100)直接把滚动的高度赋值为100，即把滚动条滚到距离顶部100的位置处
 */
LarrySun.setScroll=function (num){
    document.documentElement.scrollTop = document.body.scrollTop = num;
    //document.documentElement.scrollTop ie浏览器     document.body.scrollTop  火狐或chrome
};

/***********************************************************************************************
 ***********************************************************************************************
 ***********************************************************************************************/
/*
 10、 获取滚动高度
 如： height=getgetScroll直接把滚动条当前的高赋值给height
 */
LarrySun.getScroll=function (){
    return window.pageYOffset || document.documentElement.scrollTop;
    //document.documentElement.scrollTop ie浏览器     document.body.scrollTop  火狐或chrome
};
/***********************************************************************************************
 ***********************************************************************************************
 ***********************************************************************************************/
/*
 11、第一个子节点的兼容性写法，obj为父容器的对象
 如：var myLi = firstNode(myUl) 找到myUl下的第一个li赋值给myLi
 */
LarrySun.firstNode=function (obj){
    return obj.firstElementChild || obj.firstChild;//firstElementChild在ie6-8 不兼容  firstChild会计算空白符
};
/***********************************************************************************************
 ***********************************************************************************************
 ***********************************************************************************************/
/*
 12、最后一个节点的兼容性写法，obj为父容器的对象
 如：var myLi = lastNode(myUl) 找到myUl下的最后一个li赋值给myLi
 */
LarrySun.lastNode=function (obj){
    return obj.lastElementChild || obj.lastChild;//firstElementChild在ie6-8 不兼容
};

/***********************************************************************************************
 ***********************************************************************************************
 ***********************************************************************************************/
/*
 13、下一个节点，obj为容器的对象
 如：var myLis = nextNode(myLi) 找到myLl下的下一个li赋值给myLis
 */
LarrySun.nextNode=function (obj){
    return obj.nextElementSibling || obj.nextSibling;//lastElementChild在ie6-8 不兼容
};
/***********************************************************************************************
 ***********************************************************************************************
 ***********************************************************************************************/
/*
 14、上一个节点，obj为容器的对象
 如：var myLis = previousNode(myLi) 找到myLl下的上一个li赋值给myLis
 */
LarrySun.previousNode=function (obj){
    return obj.previousElementSibling || obj.previousSibling;//previousElementSibling在ie6-8 不兼容
};

/***********************************************************************************************
 ***********************************************************************************************
 ***********************************************************************************************/
/*
 15、判断浏览器信息，直接返回数值，返回0表示IE  1表示谷歌  2表示火狐，3表示其他浏览器
 如：var mun=browserType();则mun为0表示IE  1表示谷歌  2表示火狐，3表示其他浏览器
 */
LarrySun.browserType=function (){
    if(window.navigator.userAgent.indexOf('IE') !=-1){
        return 0;
    }else if(window.navigator.userAgent.indexOf('Chrome') !=-1){
        return 1;
    }else if(window.navigator.userAgent.indexOf('Firefox') !=-1){
        return 2;
    }
    else{
        return 3;
    }
};
/***********************************************************************************************
 ***********************************************************************************************
 ***********************************************************************************************/
/*
 16、even事件的兼容写法，点击事件中直接返回ev对象
 如：div.onclick=function(ev){
 var ev=myEvent(ev);//ev的兼容性，吧div的ev传入myEvent事件进行兼容性处理，返回一个可兼容的ev对象
 var X=ev.clineX();//调用ev对象里面的clienX方法
 }
 */
LarrySun.myEvent=function (ev){
    return ev || window.event;
}
/***********************************************************************************************
 ***********************************************************************************************
 ***********************************************************************************************/
/*
 17、阻止冒泡兼容写法，ev事件形参里面的参数ev，当大盒子套着小盒子且两个盒子都有点击事件是直接在小盒子的点击事件里面调用即可
 如：大盒子divBig有点击事件，小盒子divSmall也有点击事件
 则：divSmall.onclick=function(ev){stopProp(ev);}即可
 *///（次方法有使用到方法16）
LarrySun.stopProp=function (ev){       //（次方法有使用到方法16）
    ev = myEvent();//兼容even事件
    if(typeof ev.stopPropagation  == 'undefined'){
        ev.cancelBubble = true;	//ie8及以下
    }else{
        ev.stopPropagation() ;//除了ie8及以下的所有浏览器都支持
    }
}

//18、计算两个日期的差
LarrySun.dateDiff=function(sDate1,sDate2){
    var aDate,oDate1,oDate2,iDays;

    aDate=sDate1.split('-');
    oDate1=new Date(aDate[1]+'-'+aDate[2]+'-'+aDate[0]);

    aDate=sDate2.split('-');
    oDate2=new Date(aDate[1]+'-'+aDate[2]+'-'+aDate[0]);

    iDays=parseInt(Math.abs(oDate1-oDate2)/1000/60/60/24);


    return iDays;




}

//18转驼峰函数定义
LarrySun.changeTuofeng=function(str) {
    var arr = str.split('-');
    console.log(arr);
    for(var i=0;i<arr.length;i++){
        arr[i] = arr[i].substring(0,1).toUpperCase() + arr[i].substring(1);

    }
    return arr.join('');//将数组连接成字符串

}

//19.时间戳转换
LarrySun.getTime=function(){
    var oDate = new Date();//当前日期时间指定日期为var oDate = new Date(value)
    console.log(oDate);
    var iYear = oDate.getFullYear();//获取年
    var iMonth = oDate.getMonth()+1;//获取月  ,获取的月份从0开始
    var iDate = oDate.getDate();//获取日
	//保存星期数据
	var arr=['星期天','星期一','星期二','星期三','星期四','星期五','星期六']
	var week=arr[oDate.getDay()];//获取星期

    //获取时分秒
    var iHour = oDate.getHours();
    var iMinute = oDate.getMinutes();
    var iSecond = oDate.getSeconds() ;

    var nowTime=`${iYear}年${iMonth}月${iDate}日${week}---${iHour}时${iMinute}分${iSecond}秒`
		return nowTime
}



//20:继承
//接口类  name 接口名称  methods 接受方法名称的集合
LarrySun.Interface=function(name,methods){
    //判断接口的canshugeshu
    if(arguments.length != 2){
        throw new Error('LarrySun:this instance interface constructor must be 2 length!!')
    }
    this.name=name;
    this.methods=[];//定义一个内置的空数组对象等待接受methods里面的元素
    for(var i= 0,len=methods.length;i<len;i++){//和var i=0;i<methods.length;i++一样的
        if(typeof  methods[i] !=='string'){
            throw  new Error('LarrySun:theInterface method name is error!!');
        }
        this.methods.push(methods[i]);
    }
};
//检验接口里面的方法,如果通过则不做任何操作，不通过则抛出异常
//这个方法的目的就是检验方法
LarrySun.Interface.ensureImplements=function(object){
    //如果检测方法接受的参数小与2 参数传递失败
    if(arguments.length<2){
        throw new Error('LarrySun:_Interface.ensureImplements method constructor argument must be >=2!!');
    }
    //获得接口实例对象
    for(var i= 1,len=arguments.length;i<len;i++){
        var instanceInterface=arguments[i];
        //判断参数是否是接口类的类型
        if(instanceInterface.constructor!==LarrySun.Interface){
            throw new Error('LarrySun_The arguments  constructor not be Interface Class!!');
        }
        //循环接口实例对象里面的每一个方法
        for(var j=0;j<instanceInterface.methods.length;j++){
            //用一个临时变量接受每一个方法的名字（注意是字符串）
            var methodName=instanceInterface.methods[j];
            if(!object[methodName]||typeof object[methodName] !=='function'){
                throw new Error('LarrySun_The method name: "'+ methodName + '" is not found!!');
            }
        }
    }
};
//混合继承   缺点继承了两次父类的模板，一次原型
LarrySun.extend=function(sub,sup){
    //目的：继承父类的原型对象
    //1、用一个空函数进行中转
    var F=new Function();

    F.prototype=sup.prototype;//实现空函数的原型对象和超类的转换
    sub.prototype=new F();//原型继承
    //F为空模板，但是却继承了sup的原型，因此sub只继承了一个F的空模板和F的空模板，因此实现了之继承一遍。
    sub.prototype.constructor=sub//还原子类的构造器
    //保存下父类的原型对象，一方面方便解耦，一方面方便获得父类的原型对象
    sub.superClass=sup.prototype;//自定义一个子类的静态属性接受父类的原型对象
    //判断父类的原型对象的构造器（加保险）防止写简单原型的时候漏写constructor:Person,//让构造器还原等于自己

    if(sup.prototype.constructor==Object.prototype.constructor){
        sup.prototype.constructor=sup;
    }
};
//21:cookies的js操作
//写cookies
LarrySun.setCookie=function(key,value,minutes){
		var time = new Date();

        time.setTime(time.getTime() + 60 * minutes*1000);//过期时间 分钟转毫秒
        // console.log(time)
        if(minutes) document.cookie=`${key}=${value};expires=${time.toGMTString()}`;
        else document.cookie=`${key}=${value}`;
};
 
//读取cookies
LarrySun.getCookie=function(key){
    var arr,reg=new RegExp("(^| )"+key+"=([^;]*)(;|$)");
    if(arr=document.cookie.match(reg)) return (arr[2]);
    else return null;
};

//删除cookies
LarrySun.delCookie=function(key){
    var time = new Date();
    time.setTime(time.getTime() - 1);
    var cval=getCookie(key);
    if(cval!=null) document.cookie= key + "="+cval+";expires="+time.toGMTString();
};
//使用示例
// setCookie('textss','sss',1) //最后一个参数表示失效的分钟
// alert(getCookie("textss"));
// delCookie('username');


