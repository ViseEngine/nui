Nui.define('./script/template/page',['template'],function(e){function t(e,t,i){var c=(new Date).getTime();t();var r=(new Date).getTime(),s=r-c;n.yAxis.data.unshift(e),n.series[0].data.unshift(s),a.setOption(n),setTimeout(function(){i&&i()},500)}var renders=this.renders,a=echarts.init(document.getElementById('data')),i=function(){return{xAxis:{type:'value',name:'毫秒'},yAxis:{type:'category',data:[]},series:[{type:'bar',itemStyle:{normal:{color:function(e){return['#AA4744','#4673A7','#89A54F','#806A9B','#3E96AE','#DB843E'][e.dataIndex]},label:{show:!0,position:'right'}}},data:[]}]}},n=i();a.setOption(n),$('.input').blur(function(){var e=this.value.replace(/[^\d]+/g,''),t=100;$(this).hasClass('count')&&(t=1e4),this.value=e||t}),Nui.bsie7&&$('.piece').val(300);var c=function(){for(var e=$('.piece').val(),t=$('.count').val(),a=[],i={},n=0;n<t;n++)i['index'+n]='value'+n;for(var n=0;n<e;n++)a.push(i);return{list:a}};$('#start').click(function(){var a=c();n=i();var r=$(this);r.hide(),t('nuiTemplate',function(){e.render(renders('<%a?? ? \'1\' : \'2\'%><%a1%>'),a)},function(){t('dot',function(){doT.compile(renders('{{~it.list :val:key}}{{ for(var k in val) { }}{{=k}}:{{=val[k]}}{{ } }}{{~}}'))(a)},function(){t('artTemplate',function(){template.render(renders('{{each list as val key}}{{each val as v k}}{{k}}:{{v}}{{/each}}{{/each}}'))(a)},function(){t('baiduTemplate',function(){baidu.template(renders('<%for(var i=0;i<list.length;i++){%><%for(var j in list[i]){%><%=j%>:<%=list[i][j]%><%}%><%}%>'),a)},function(){t('juicer',function(){juicer(renders('{@each list as item, key}{@each item as v, k}${k}:${v}{@/each}{@/each}'),a)},function(){t('handlebars',function(){Handlebars.compile(renders('{{#each list}}{{#each this}}{{@key}}:{{this}}{{/each}}{{/each}}'))(a)},function(){r.show()})})})})})})})});
//# sourceMappingURL=page-min.js.map?v=e029a61