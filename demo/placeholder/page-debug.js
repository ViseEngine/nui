Nui.define('./a',['./b'], function(b){
    return function(){
        
    }
})
Nui.define('./b',function(){
    this.importcss('./a00');
    return ({
        init:function(){
            alert(1)
        }
    })
})
Nui.define('{base}/demo/placeholder/page',function(){

    this.importcss('./a');

    var b = this.require('./b.js')
var a = this.require('./a.js')
    return this.exports(b, {
        show1:function(){
            alert(2)
        },
        show2:function(){
            alert(3)
        }
    }, [{
        method:'init',
        content:'this.show1()'
    }, {
        method:'init',
        content:'this.show2()'
    }])
})