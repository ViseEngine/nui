Nui.define("./script/template/page",["template"],function(e){function t(e,t){var a=(new Date).getTime();t();var n=(new Date).getTime(),r=n-a;l.yAxis.data.push(e),l.series[0].data.push(r),i.setOption(l)}var a=this.renders,i=echarts.init(document.getElementById("data")),n=function(){return{xAxis:{},yAxis:{data:[]},series:[{type:"bar",data:[]}]}},l=n();i.setOption(l),Nui.$(".input").blur(function(){var e=this.value.replace(/[^\d]+/g,""),t=100;$(this).hasClass("count")&&(t=1e4),this.value=e||t});var r=function(){for(var e=$(".piece").val(),t=$(".count").val(),a=[],i=[],n=0;n<e;n++)a.push(n);for(var n=0;n<t;n++)i.push(a);return{list:i}};$("#start").click(function(){var i=r();l=n(),t("nuiTemplate",function(){e.render(a("{{each list val key}}{{key}}:{{each val v k}}{{k}}:{{v}}{{/each}}{{/each}}"),i)}),t("artTemplate",function(){template.render(a("{{each list as val key}}{{key}}:{{each val as v k}}{{k}}:{{v}}{{/each}}\n{{/each}}"))(i)}),t("baiduTemplate",function(){baidu.template(a("<%for(var i=0;i<list.length;i++){%><%=i%>:<%for(var j=0;j<list[i].length;j++){%><%=j%>:<%=list[i][j]%><%}%><%}%>"),i)}),t("tmpl",function(){$.tmpl(a("{{each(key, val) list}}${key}:{{each(k, v) val}}${k}:${v}{{/each}}{{/each}}"),i)})})});