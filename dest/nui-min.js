!function(e,t,n){if(!e.Nui){var r=e.Nui={version:"1.0.1",type:function(e,t){if(null===e||e===n)return!1;if(o("Array")(t)){var i=!1;return r.each(t,function(t){if(o(t)(e))return i=!0,!1}),i}return o(t)(e)},each:function(e,t){var n;if(r.type(e,"Array")){var o=e.length;for(n=0;n<o&&t(e[n],n)!==!1;n++);}else for(n in e)if(t(e[n],n)===!1)break},trim:function(e){return(e||"").replace(/^\s+|\s+$/g,"")},unique:function(e){var t=[],n={};return r.each(e,function(e){n[e]||(n[e]=!0,t.push(e))}),t},browser:function(){var e=navigator.userAgent.toLowerCase(),t=/(edge)[ \/]([\w.]+)/.exec(e)||/(chrome)[ \/]([\w.]+)/.exec(e)||/(webkit)[ \/]([\w.]+)/.exec(e)||/(opera)(?:.*version|)[ \/]([\w.]+)/.exec(e)||/(msie) ([\w.]+)/.exec(e)||e.indexOf("compatible")<0&&/(mozilla)(?:.*? rv:([\w.]+)|)/.exec(e)||[],n=t[1]||"",r=t[2]||"0",o={};return"mozilla"===n&&/trident/.test(e)&&(n="msie",r="11.0"),n&&(o[n]=!0,o.version=r),o.chrome||o.edge?o.webkit=!0:o.webkit&&(o.safari=!0),o}()};r.bsie6=r.browser.msie&&r.browser.version<=6,r.bsie7=r.browser.msie&&r.browser.version<=7,r.bsie7&&t.execCommand("BackgroundImageCache",!1,!0),"undefined"!=typeof jQuery&&(r.win=jQuery(e),r.doc=jQuery(t));var o=function(e){return function(t){return{}.toString.call(t)==="[object "+e+"]"}},i=function(){var e,t,o,u,c,s,l=arguments[0]||{},f=1,p=arguments.length,d=!1;for("boolean"==typeof l&&(d=l,l=arguments[1]||{},f=2),"object"==typeof l||r.type(l,"Function")||(l={}),p===f&&(l={},--f);f<p;f++)if(null!=(c=arguments[f]))for(u in c)e=l[u],o=c[u],l!==o&&(d&&o&&(a(o)||(t=r.type(o,"Array")))?(t?(t=!1,s=e&&r.type(e,"Array")?e:[]):s=e&&a(e)?e:{},l[u]=i(d,s,o)):o!==n&&(l[u]=o));return l},a=function(e){return!(!e||!r.type(e,"Object")||e.nodeType)},u=function(e){var t;for(t in e)return!1;return!0},c=function(){};"undefined"==typeof console&&(e.console={log:c,debug:c,error:c,info:c});var s,l,f=location.protocol+"//"+location.host,p=function(){var e=(f+location.pathname).replace(/\\/g,"/"),t=e.lastIndexOf("/");return e.substr(0,t+1)},d=p(),h=function(){return"_module_"+m++},g=t.head||t.getElementsByTagName("head")[0]||t.documentElement,y="onload"in t.createElement("script"),m=0,v={},b={},$=[],x={paths:{},alias:{}};if(r.browser.msie&&r.browser.version<=9)var _,w=function(){return l?l:_&&"interactive"===_.readyState?_:(r.each(g.getElementsByTagName("script"),function(e){if("interactive"===e.readyState)return _=e,!1}),_)};var O=function(e,t){var n=this;n.deps=t||[],n.alldeps=n.deps,n.depmodules={},n.id=e[0],n.name=e[1],n.parameter="",n.suffix=e[2],n.uri=n.id.substr(0,n.id.lastIndexOf("/")+1)};O.prototype.load=function(){var e=this;if(e.loaded||/_module_\d+$/.test(e.id))return e.onload();var n=t.createElement("script");return e.url=e.id+e.suffix+".js"+e.parameter,n.src=e.url,n.id=e.id,l=n,g.appendChild(n),l=null,y?n.onload=n.onerror=e.onload(n):n.onreadystatechange=function(){/loaded|complete/.test(n.readyState)&&e.onload(n)()},e.resolve()},O.prototype.resolve=function(){var e=this;return e.alldeps.length&&u(e.depmodules)&&r.each(e.alldeps,function(t){var n=O.getModule(t,[],e.uri);n.parameter=e.parameter,e.depmodules[t]=n.loaded?n:n.load()}),e},O.prototype.onload=function(e){var t=this;return e?function(){if(s=e.moduleData||s,e.onload=e.onerror=e.onreadystatechange=null,g.removeChild(e),e=null,t.loaded=!0,s)return r.each(s,function(e,n){e&&(t[n]=e)}),s=null,t.resolve().runcallback()}:(t.loaded=!0,t.resolve().runcallback())},O.prototype.runcallback=function(){var e=this,t=e.getloaded();return t&&r.each(t,function(e){e.root.callback&&e.root.callback(e.modules)}),e},O.prototype.getModules=function(e){var t=this;return e||(e=[]),e.unshift(t.id),t.alldeps.length&&r.each(t.depmodules,function(t){e=t.getModules(e)}),e},O.prototype.getloaded=function(){var e=[],t=[];r.each($,function(n){var o=r.unique(n.getModules());t=t.concat(o),e.push({root:n,modules:o})}),t=r.unique(t);for(var n;n=t.shift();)if(!v[n].loaded)return!1;return e},O.prototype.setFactory=function(){var e=this,t=e.factory;return t.require=function(t,n){return O.require(e.depmodules[t],n)},t.extends=function(e,o,a){var u;if(e){if("string"==typeof e){var s=t.require(e);if(s===n)return e;e=s}return r.type(e,"Array")?(u=i(!0,[],e),a===!0&&(r.type(o,"Array")?u=u.concat(o):u.push(o))):u=r.type(e,"Function")?e.exports?i(!0,{},e.exports,o):i(!0,c,e,o):r.type(e,"Object")?i(!0,{},e,o):e,r.type(a,"Array")&&r.type(u,["Object","Function"])&&r.each(a,function(e){if(e.method&&e.content){for(var t,n,o=e.method.split("->"),i=o[o.length-1];(n=o.shift())&&(t=t||u,n!==i);)t=t[n];var a=t[i];if(r.type(a,"Function")){var c=a.toString().replace(/(\})$/,";"+e.content+"$1");a=new Function("return "+c),t[i]=a()}}}),u}},t.imports=c,t.renders=function(e){return e},t},O.prototype.exec=function(){var e=this;if(!e.module&&r.type(e.factory,"Function")){var t=e.setFactory(),n=[];r.each(e.deps,function(e){n.push(t.require(e))});var o=t.apply(t,n);if("component"!==e.name&&r.type(o,"Object")&&r.type(o._init,"Function")){var i={static:{},attr:{},proto:{}};r.each(o,function(e,t){"static"===t?i[t]=e:r.type(e,"Function")?i.proto[t]=e:i.attr[t]=e});var a=e.name.substr(e.name.lastIndexOf("/")+1).replace(/\{[^\{\}]+\}/g,"");i.static._componentname_=a;var u=e.module=O.createClass(e,i);u.exports=o,r.each(["$","$fn","$ready"],function(e){u(e,a,u)})}else e.module=o}return e},O.prototype.loadcss=function(){var e=this;return e.styles&&e.styles.length&&r.each(e.styles,function(n){var r=O.getAttrs(n,e.uri)[0];if(!b[r]){b[r]=!0,r=r+".css"+e.parameter;var o=t.createElement("link");o.rel="stylesheet",o.href=r,g.appendChild(o)}}),e},O.replacePath=function(e){e=e.replace(/([^:])\/{2,}/g,"$1/"),e=e.replace(/\.{2,}/g,"..");var t=function(e){return/([\w]+\/?)(\.\.\/)/g.test(e)?(e=e.replace(/([\w]+\/?)(\.\.\/)/g,function(e,t,n){return e==t+n?"":e}),t(e)):e};return e=t(e),e.replace(/([\w]+)\/?(\.\/)+/g,"$1/")},O.createClass=function(e,t){var n=function(e){var r=this;i(!0,r,t.attr,{index:n._index++,_eventArray:[]}),r.options=i(!0,{},r.options,n._options,e||{}),r.optionsCache=i(r.options),n._instances[r.index]=r,r.static=null,r._init()};return i(!0,n,t.static),i(!0,n.prototype,t.proto),function(){var e=arguments,t=e[0];if("string"!=typeof t)return new n(t);if(0!==t.indexOf("_")){var r=n[t];return"function"==typeof r?r.apply(n,Array.prototype.slice.call(e,1)):r}}},O.require=function(e,t){if(e){var n=e.module;return r.type(t,"Object")?n(factory):r.type(t,"String")?n[factory]:r.type(n,"Object")?i(n):r.type(n,"Array")?i([],n):n}},O.setPath=function(e){var t=/\{([^\{\}]+)\}/.exec(e);if(t){var n=x.paths[t[1]];n&&(e=e.replace(t[0],n).replace(/(\.(js|css))?(\?[\s\S]*)?$/g,""))}return e},O.getAttrs=function(e,t){var n,r=e.replace(/(\.(js|css))?(\?[\s\S]*)?$/g,""),o=r.match(/(-debug|-min)$/g),i="";return o&&(r=r.replace(/(-debug|-min)$/g,""),i=o[0]),e=O.setPath(x.alias[r]||r),/^(https?|file):\/\//.test(e)||(n=O.replacePath(d+e),e=(t||d)+e),e=O.replacePath(e),[e,r,i,n]},O.getModule=function(e,t,n){var r=O.getAttrs(e,n),o=r[0];return v[r[1]]||v[o]||v[r[3]]||(v[o]=new O(r,t))},O.load=function(e,t,n){if(r.type(e,"String")&&r.trim(e)){var o=e.match(/(\?[\s\S]+)$/),i=v[O.getAttrs(e)[0]]||O.getModule(n,[e]);o&&(i.parameter=o[0]),$.push(i),i.callback=function(e){var o=i,a=i.suffix;i.name===n&&r.each(i.depmodules,function(e){o=e,a=e.suffix}),r.each(e,function(e){var t=v[e].exec();a||t.loadcss()}),r.type(t,"Function")&&t.call(r,o.module),delete i.callback},i.load()}},O.getdeps=function(e){var t=[],n=[],o=e.match(/(require|extends|imports)\(('|")[^'"]+\2/g);return o&&r.each(o,function(e){/^(require|extends)/.test(e)?t.push(e.replace(/^(require|extends)|[\('"]/g,"")):n.push(e.replace(/^imports|[\('"]/g,""))}),[r.unique(t),r.unique(n)]},O.define=function(e,t,o){r.type(e,"Function")?(o=e,e=n,t=[]):r.type(t,"Function")&&(o=t,r.type(e,"String")?t=[]:(t=e,e=n));var i=O.getdeps(o.toString()),a=t.concat(i[0]),u=i[1];if(e&&!v[e]&&!v[O.getAttrs(e)[0]]){var c=O.getModule(e,a);c.deps=t,c.styles=u,c.factory=o,c.loaded=!0,c.load()}if(s={name:e,deps:t,styles:u,alldeps:a,factory:o},"undefined"!=typeof w){var l=w();l&&(l.moduleData=s)}},r.load=function(e,t){return O.load(e,t,h()),r},r.define=function(){var e=arguments,t=e.length,n=[];!t||1===t&&!r.type(e[0],"Function")?n.push(function(){return e[0]}):2===t&&!r.type(e[1],"Function")||3==t&&!r.type(e[2],"Function")?(n.push(e[0]),n.push(function(){return e[1]})):2===t&&!r.type(e[0],["Array","String"])&&r.type(e[1],"Function")?n.push(e[1]):3===t&&!r.type(e[1],"Array")&&r.type(e[2],"Function")?(n.push(e[0]),n.push(e[2])):n=e,O.define.apply(O,n)},r.config=function(e,t){r.type(e,"Object")?i(!0,x,e):r.type(e,"String")&&t&&i(!0,x[e],t);var n=x.paths.base||"";/^(https?|file):\/\//.test(n)||(n=x.paths.base=f+n),r.each(x.paths,function(e,t){"base"===t||/^(https?|file):\/\//.test(e)||(x.paths[t]=n+"/"+e)})}}}(this,document),Nui.define("util",{regex:{mobile:/^0?(13|14|15|17|18)[0-9]{9}$/,tel:/^[0-9-()（）]{7,18}$/,email:/^\w+((-w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/,idcard:/^\d{17}[\d|x]|\d{15}$/,cn:/^[\u4e00-\u9fa5]+$/,taxnum:/^[a-zA-Z0-9]{15,20}$/},getParam:function(e,t){var n=decodeURI(t||location.href),r={};if(startIndex=n.indexOf("?"),startIndex++>0){var o,i=n.substr(startIndex).split("&");$.each(i,function(e,t){o=t.split("="),r[o[0]]=o[1]})}return"string"==typeof e&&e&&(r=void 0!==(o=r[e])?o:""),r},setParam:function(e,t,n){var r;if($.isPlainObject(e))r=t||location.href,$.each(e,function(e,t){t&&($.isPlainObject(t)&&(t=tools.getJSON(t)),r=tools.setParam(e,t,r))});else if(r=n||location.href,r.indexOf("?")===-1&&(r+="?"),$.isPlainObject(t)&&(t=tools.getJSON(t)),r.indexOf(e+"=")!==-1){var o=new RegExp("("+e+"=)[^&]*");r=r.replace(o,"$1"+t)}else{var i="";r.indexOf("=")!==-1&&(i="&"),r+=i+e+"="+t}return r},supportCss3:function(e){var t,n=["webkit","Moz","ms","o"],r=[],o=document.documentElement.style,i=function(e){return e.replace(/-(\w)/g,function(e,t){return t.toUpperCase()})};for(t in n)r.push(i(n[t]+"-"+e));r.push(i(e));for(t in r)if(r[t]in o)return!0;return!1},supportHtml5:function(e,t){return e in document.createElement(t)},jumpUrl:function(e,t){e&&$('<a href="'+e+'"'+(t?'target="'+(t||"_self")+'"':"")+"><span></span></a>").appendTo("body").children().click().end().remove()},formatDate:function(e,t){if(e=parseInt(e)){if(!t)return e;var n=new Date(e),r={"M":n.getMonth()+1,"d":n.getDate(),"h":n.getHours(),"m":n.getMinutes(),"s":n.getSeconds()};return t=t.replace(/([yMdhms])+/g,function(e,t){var o=r[t];return void 0!==o?(e.length>1&&(o="0"+o,o=o.substr(o.length-2)),o):"y"===t?(n.getFullYear()+"").substr(4-e.length):e})}return"-"},getJSON:function(e){if("undefined"!=typeof JSON){var t=JSON.stringify(e);return $.browser.msie&&"8.0"==$.browser.version?t.replace(/\\u([0-9a-fA-F]{2,4})/g,function(e,t){return String.fromCharCode(parseInt(t,16))}):t}if($.isArray(e)){var n=[];return $.each(e,function(e,t){n.push(tools.getJSON(t))}),"["+n.join(",")+"]"}if($.isPlainObject(e)){var r=[];return $.each(e,function(e,t){r.push('"'+e+'":'+tools.getJSON(t))}),"{"+r.join(",")+"}"}return'"'+e+'"'},getData:function(e){var t={result:{},total:0,voidTotal:0},n=e.serializeArray(),r=n.length,o=0;for(o;o<r;o++){var i=$.trim(n[o].value);t.all++,i||t.voidTotal++,t.result[n[o].name]=i}return t}}),Nui.define("template",["util"],function(e){var t=function(e,t){if(e&&n[e])return i(n[e],t);var r=document.getElementById(e);return r&&"SCRIPT"===r.nodeName&&"text/html"===r.type?i(n[e]=r.innerHTML,t):""},n={},r={openTag:"{{",closeTag:"}}"},o={trim:Nui.trim,formatDate:e.formatDate,setParam:e.setParam},i=function(e,n){var u=this;if("string"==typeof e){var c=r.openTag,s=r.closeTag,l=c.replace(/([^\s])/g,"\\$1"),f=s.replace(/([^\s])/g,"\\$1");if(e=e.replace(new RegExp(l+"\\s*include\\s+['\"]([^'\"]*)['\"]\\s*"+f,"g"),function(e,n){if(n){var r=u[n];return"function"==typeof r&&(r=r()),"string"==typeof r?i.call(u,r):t(n)}return""}),"object"==typeof n){Nui.type(n,"Array")&&(n={$list:n});var p="";e=e.replace(/[\r\n]+/g,""),Nui.each(e.split(c),function(e,t){e=e.split(s),t>=1?p+=a(Nui.trim(e[0]),!0):e[1]=e[0],p+=a(e[1].replace(/'/g,"\\'").replace(/"/g,'\\"'))}),Nui.each(n,function(e,t){p=p.replace(new RegExp("([^\\w\\.'\"]+)"+t.replace(/\$/g,"\\$"),"g"),"$1that.data."+t)});var d=new Function('var that=this, code="";'+p+";that.echo=function(){return code}");d.prototype=o,d.prototype.each=Nui.each,d.prototype.data=n,e=(new d).echo(),d=null}return e}return""},a=function(e,t){var n,r;return n=t?(r=u(e,"if"))!==!1?"if("+r+"){":(r=u(e,"elseif"))!==!1?"\n}\nelse if("+r+"){":e.indexOf("else")!==-1?"\n}\nelse{":e.indexOf("/if")!==-1?"\n}":(r=u(e,"each",/\s+/))!==!1?"that.each("+r[0]+", function("+(r[1]||"$value")+","+(r[2]||"$index")+"){":e.indexOf("/each")!==-1?"\n});":(r=u(e,"|",/\s*,\s*/))!==!1?"code+=that."+r[0]+"("+r.slice(1).toString()+");":"code+="+e+";":"code+='"+e+"';",n+"\n"},u=function(e,t,n){if(0===e.indexOf(t)||"|"===t&&e.indexOf(t)>0){var r="";return"|"===t&&(r=","),e=e.replace(t,r).replace(/^\s+/,""),n?e.split(n):e}return!1};return t.method=function(e,t){o[e]||(o[e]=t)},t.config=function(){var e=arguments;Nui.type(e[0],"Object")?Nui.each(e[0],function(e,t){r[t]=e}):e.length>1&&"string"==typeof e[0]&&(r[e[0]]=e[1])},t.render=i,t}),Nui.define("component",["template"],function(tpl){return{static:{_index:0,_instances:{},_options:{},_getSize:function(e,t,n){var r=0;if(n=n||"border",t=t||"tb","all"===n)return this._getSize(e,t)+this._getSize(e,t,"padding");var o={l:["Left"],r:["Right"],lr:["Left","Right"],t:["Top"],b:["Bottom"],tb:["Top","Bottom"]},i=[{border:{l:["LeftWidth"],r:["RightWidth"],lr:["LeftWidth","RightWidth"],t:["TopWidth"],b:["BottomWidth"],tb:["TopWidth","BottomWidth"]}},{padding:o},{margin:o}];return $.each(i,function(o,i){i[n]&&$.each(i[n][t],function(t,o){var i=parseInt(e.css(n+o));r+=isNaN(i)?0:i})}),r},$:function(e,t){$[e]=function(e){if(e)return t(e)}},$fn:function(e,t){$.fn[e]=function(){var n=arguments,r=n[0];return this.each(function(){var o=this;o.nui||(o.nui={});var i=($(o),o.nui[e]);if(!i){var a=r;Nui.type(a,"Object")?r.target=o:a={target:o},i=o.nui[e]=t(a)}if("string"==typeof r&&0!==r.indexOf("_"))if("options"===r)"object"==typeof n[1]?i.set(n[1]):"string"==typeof n[1]&&i.set(n[1],n[2]);else{var u=i[r];"function"==typeof u&&u.apply(i,Array.prototype.slice.call(n,1))}})}},$ready:function(name,module){var attr="options-"+name,_$fn=$.fn[name],_$=$[name];$("["+attr+"]").each(function(index,item){var ele=$(item),options=ele.attr(attr);options=options?eval("("+ele.attr(attr)+")"):{},options.target=item,_$fn?ele[name](options):_$?$[name](options):module(options)})},options:function(e,t){Nui.type(e,"Object")?$.extend(!0,this._options,e):Nui.type(e,"String")&&(this._options[e]=t)}},options:{target:null,theme:""},_init:$.noop,_exec:$.noop,_getTarget:function(){return this.options.target?$(this.options.target):null},_on:function(e,t,n,r){var o=this;return t.on(e,n),r===!0&&t[e](),o._eventArray.push({target:t,type:e,callback:n}),o},_off:function(){var e=this;return $.each(e._eventArray,function(e,t){t&&t.target.off(t.type,t.callback)}),e._eventArray=[],e},_delete:function(){var e=this,t=e.constructor,n=e.target[0];n&&n.nui&&(n.nui[e.constructor._componentname_]=null,delete n.nui[e.constructor._componentname_]),t._instances[e.index]=null,delete t._instances[e.index]},_reset:function(){var e=this;return e._off(),e.elem&&e.elem.remove(),e},_tpl2html:function(e,t){return tpl.render.call(this,e,t)},set:function(e,t){var n=this;return n._reset(),(e||t)&&($.isPlainObject(e)?n.options=$.extend(!0,n.options,e):n.options[e]=t,n._exec()),n},get:function(e){var t=this;return e?t.options[e]:t.options},reset:function(){return this.set(that.optionsCache)},destroy:function(){var e=this;e._reset(),e._delete()}}});