Nui.define("{cpns}/router",function(){return this.extend("component",{static:{_trigger:!1,_routers:{},_alias:{},_replace:function(t){return t.replace(/^\#\!?/,"").replace(/\/{2,}/g,"//").replace(/^\/*|\/*$/g,"")},alias:function(t){this._alias=t},_change:function(){var t=this,e=t._replace(location.hash),n=t._routers;$.isEmptyObject(n)||(Nui.each(n,function(n){if(0===e.indexOf(n.path)){var r=e.replace(n.path,"").replace(/^\//,"");if(r=r?r.split("/"):[],r.length===n.params.length){var a={};return Nui.each(n.params,function(t,e){a[t]=r[e]}),n.render(n.target,{path:n.path,param:a}),t._trigger=!0,!1}}}),t._trigger||Nui.each(t._instances,function(e){if(!0===e.options.enter)return e.target.eq(0).trigger("click"),t._trigger=!0,!1}))},_bindHashchange:function(){var t=this;if("onhashchange"in window)Nui.win.on("hashchange",function(){t._change()});else{var e=function(e){var n=location.hash;return t._oldhash!==n&&(t._oldhash=n,!e)};setInterval(function(){e()&&t._change()},100),e(!0)}},$ready:null},options:{path:"",enter:!1,onBefore:null,onRender:null},_init:function(){var t=this,e=t.constructor;t._exec(),e._trigger||(e._bind||(e._bind=!0,e._bindHashchange()),e._change())},_exec:function(){var t=this,e=t.options,n=t.constructor;t.path=t._setpath(e.path),t.target=t._getTarget(),e.path&&t.target&&(n._routers[t.path]=t._getpath(),t._event())},_setpath:function(t){var e=this.constructor;return(t=Nui.trim(t))&&Nui.each(e._alias,function(e,n){t=t.replace(new RegExp("{"+n+"}","g"),e)}),e._replace(t)},_getpath:function(){var t=this,e=t.path,n=t.options,r=e.indexOf("/:"),a={target:t.target,params:[]};return-1!==r?(a.params=e.substr(r+2).split("/:"),a.path=e.substr(0,r)):a.path=e,a.render="function"==typeof n.onRender?n.onRender:$.noop,a},_sethash:function(t){t=this.constructor._replace(t),location.hash="#!"+t},_event:function(){var t=this,e=t.options;t._on("click",t.target,function(n){if("function"==typeof e.onBefore&&!1===e.onBefore())return!1;var r=$(this);return t._sethash(r.attr("href")),!1})},_reset:function(){var t=this;return t._off(),delete t.constructor._routers[t.path],t}})}),Nui.define("./script/page",["{cpns}/router","util","template"],function(t,e,n){var r=this.renders,a=function(t,e){e.text=t.text(),$(".content").html(n.render(r("这是<% text %> ，页面url是<% path %>，传递的参数是 <% each param %><% $index %>：<% $value %>，<% /each %>"),e))};t({target:"#home",path:"/home/",enter:!0,onRender:a}),t({target:"#news",path:"/news/:newsid/",onRender:a}),t({target:"#photo",path:"/photo/:pid/:type/",onRender:a}),t({target:"#about",path:"/about/:id/",onRender:a})});