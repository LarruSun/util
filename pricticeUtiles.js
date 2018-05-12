/**
 * Created by zenghaoming on 2018/1/08/0008.
 */

//LarrsySun命名空间
var LarrySun={};


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
