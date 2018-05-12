/**
 * Created by zenghaoming on 2018/1/08/0008.
 */

//LarrsySun�����ռ�
var LarrySun={};


//�ӿ���  name �ӿ�����  methods ���ܷ������Ƶļ���
LarrySun.Interface=function(name,methods){
    //�жϽӿڵ�canshugeshu
    if(arguments.length != 2){
        throw new Error('LarrySun:this instance interface constructor must be 2 length!!')
    }
    this.name=name;
    this.methods=[];//����һ�����õĿ��������ȴ�����methods�����Ԫ��
    for(var i= 0,len=methods.length;i<len;i++){//��var i=0;i<methods.length;i++һ����
        if(typeof  methods[i] !=='string'){
            throw  new Error('LarrySun:theInterface method name is error!!');
        }
        this.methods.push(methods[i]);
    }
};




//����ӿ�����ķ���,���ͨ�������κβ�������ͨ�����׳��쳣
//���������Ŀ�ľ��Ǽ��鷽��
LarrySun.Interface.ensureImplements=function(object){
    //�����ⷽ�����ܵĲ���С��2 ��������ʧ��
    if(arguments.length<2){
        throw new Error('LarrySun:_Interface.ensureImplements method constructor argument must be >=2!!');
    }
    //��ýӿ�ʵ������
    for(var i= 1,len=arguments.length;i<len;i++){
        var instanceInterface=arguments[i];
        //�жϲ����Ƿ��ǽӿ��������
        if(instanceInterface.constructor!==LarrySun.Interface){
            throw new Error('LarrySun_The arguments  constructor not be Interface Class!!');
        }
        //ѭ���ӿ�ʵ�����������ÿһ������
        for(var j=0;j<instanceInterface.methods.length;j++){
            //��һ����ʱ��������ÿһ�����������֣�ע�����ַ�����
            var methodName=instanceInterface.methods[j];
            if(!object[methodName]||typeof object[methodName] !=='function'){
                throw new Error('LarrySun_The method name: "'+ methodName + '" is not found!!');
            }
        }
    }
};



//��ϼ̳�   ȱ��̳������θ����ģ�壬һ��ԭ��
LarrySun.extend=function(sub,sup){
    //Ŀ�ģ��̳и����ԭ�Ͷ���
    //1����һ���պ���������ת
    var F=new Function();

    F.prototype=sup.prototype;//ʵ�ֿպ�����ԭ�Ͷ���ͳ����ת��
    sub.prototype=new F();//ԭ�ͼ̳�
    //FΪ��ģ�壬����ȴ�̳���sup��ԭ�ͣ����subֻ�̳���һ��F�Ŀ�ģ���F�Ŀ�ģ�壬���ʵ����֮�̳�һ�顣
    sub.prototype.constructor=sub//��ԭ����Ĺ�����
    //�����¸����ԭ�Ͷ���һ���淽����һ���淽���ø����ԭ�Ͷ���
    sub.superClass=sup.prototype;//�Զ���һ������ľ�̬���Խ��ܸ����ԭ�Ͷ���
    //�жϸ����ԭ�Ͷ���Ĺ��������ӱ��գ���ֹд��ԭ�͵�ʱ��©дconstructor:Person,//�ù�������ԭ�����Լ�

    if(sup.prototype.constructor==Object.prototype.constructor){
        sup.prototype.constructor=sup;
    }
};
