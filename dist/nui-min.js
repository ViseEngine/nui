!function(e,t,n){if(!e.Nui){var r=e.Nui={version:"1.0.1",type:function(e,t){if(null===e||void 0===e)return!1;if(a("Array")(t)){var n=!1;return r.each(t,function(t){if(a(t)(e))return n=!0,!1}),n}return a(t)(e)},each:function(e,t){var n;if(r.type(e,"Array")){var o=e.length;for(n=0;n<o&&t(e[n],n)!==!1;n++);}else for(n in e)if(t(e[n],n)===!1)break},trim:function(e,t){e=e||"";var n=/^\s+|\s+$/g;return"l"===t?n=/^\s+/:"r"===t?n=/\s+$/:"all"===t&&(n=/\s+/g),e.replace(n,"")},browser:function(){var e=navigator.userAgent.toLowerCase(),t=/(edge)[ \/]([\w.]+)/.exec(e)||/(chrome)[ \/]([\w.]+)/.exec(e)||/(webkit)[ \/]([\w.]+)/.exec(e)||/(opera)(?:.*version|)[ \/]([\w.]+)/.exec(e)||/(msie) ([\w.]+)/.exec(e)||e.indexOf("compatible")<0&&/(mozilla)(?:.*? rv:([\w.]+)|)/.exec(e)||[],n=t[1]||"",r=t[2]||"0",o={};return"mozilla"===n&&/trident/.test(e)&&(n="msie",r="11.0"),n&&(o[n]=!0,o.version=r),o.chrome||o.edge?o.webkit=!0:o.webkit&&(o.safari=!0),o}()};if(r.bsie6=r.browser.msie&&r.browser.version<=6,r.bsie7=r.browser.msie&&r.browser.version<=7,r.bsie7&&t.execCommand("BackgroundImageCache",!1,!0),"undefined"!=typeof jQuery){var o={};r.$=function(e){return"string"==typeof e?o[e]||(o[e]=jQuery(e)):jQuery(e)},r.win=jQuery(e),r.doc=jQuery(t)}var i=function(e){var t=[],n={};return r.each(e,function(e){n[e]||(n[e]=!0,t.push(e))}),t},a=function(e){return function(t){return{}.toString.call(t)==="[object "+e+"]"}},u=function(){var e,t,n,o,i,a,s=arguments[0]||{},l=1,f=arguments.length,p=!1;for("boolean"==typeof s&&(p=s,s=arguments[1]||{},l=2),"object"==typeof s||r.type(s,"Function")||(s={}),f===l&&(s={},--l);l<f;l++)if(null!=(i=arguments[l]))for(o in i)e=s[o],n=i[o],s!==n&&(p&&n&&(c(n)||(t=r.type(n,"Array")))?(t?(t=!1,a=e&&r.type(e,"Array")?e:[]):a=e&&c(e)?e:{},s[o]=u(p,a,n)):void 0!==n&&(s[o]=n));return s},c=function(e){return!(!e||!r.type(e,"Object")||e.nodeType)},s=function(e){var t;for(t in e)return!1;return!0},l=function(){};"undefined"==typeof console&&(e.console={log:l,debug:l,error:l,info:l});var f,p,d=location.protocol+"//"+location.host,h=function(){var e=(d+location.pathname).replace(/\\/g,"/"),t=e.lastIndexOf("/");return e.substr(0,t+1)}(),g=function(){return"_module_"+y++},v=t.head||t.getElementsByTagName("head")[0]||t.documentElement,m="onload"in t.createElement("script"),y=0,b={},$={},x=[],_={paths:{},alias:{}};if(r.browser.msie&&r.browser.version<=9)var O,w=function(){return p||(O&&"interactive"===O.readyState?O:(r.each(v.getElementsByTagName("script"),function(e){if("interactive"===e.readyState)return O=e,!1}),O))};var N=function(e,t){var n=this;n.deps=t||[],n.alldeps=n.deps,n.depmodules={},n.id=e[0],n.name=e[1],n.parameter="",n.suffix=e[2],n.uri=n.id.substr(0,n.id.lastIndexOf("/")+1)};N.prototype.load=function(){var e=this;if(e.loaded||/_module_\d+$/.test(e.id))return e.onload();var n=t.createElement("script");return e.url=e.id+e.suffix+".js"+e.parameter,n.src=e.url,n.id=e.id,p=n,v.appendChild(n),p=null,m?n.onload=n.onerror=e.onload(n):n.onreadystatechange=function(){/loaded|complete/.test(n.readyState)&&e.onload(n)()},e.resolve()},N.prototype.resolve=function(){var e=this;return e.alldeps.length&&s(e.depmodules)&&r.each(e.alldeps,function(t){var n=N.getModule(t,[],e.uri);n.parameter=e.parameter,e.depmodules[t]=n.loaded?n:n.load()}),e},N.prototype.onload=function(e){var t=this;return e?function(){if(f=e.moduleData||f,e.onload=e.onerror=e.onreadystatechange=null,v.removeChild(e),e=null,t.loaded=!0,f)return r.each(f,function(e,n){e&&(t[n]=e)}),f=null,t.resolve().runcallback()}:(t.loaded=!0,t.resolve().runcallback())},N.prototype.runcallback=function(){var e=this,t=e.getloaded();return t&&r.each(t,function(e){e.root.callback&&e.root.callback(e.modules)}),e},N.prototype.getModules=function(e){var t=this;return e||(e=[]),e.unshift(t.id),t.alldeps.length&&r.each(t.depmodules,function(t){e=t.getModules(e)}),e},N.prototype.getloaded=function(){var e=[],t=[];r.each(x,function(n){var r=i(n.getModules());t=t.concat(r),e.push({root:n,modules:r})}),t=i(t);for(var n;n=t.shift();)if(!b[n].loaded)return!1;return e},N.prototype.setFactory=function(){var e=this,t=e.factory;return t.require=function(t,n){return N.require(e.depmodules[t],n)},t.extend=function(e,n,o){var i;if(e){if("string"==typeof e){var a=t.require(e);if(void 0===a)return e;e=a}return r.type(e,"Array")?(i=u(!0,[],e),o===!0&&(r.type(n,"Array")?i=i.concat(n):i.push(n))):i=r.type(e,"Function")?e.exports?u(!0,{},e.exports,n):u(!0,l,e,n):r.type(e,"Object")?u(!0,{},e,n):e,r.type(o,"Array")&&r.type(i,["Object","Function"])&&r.each(o,function(e){if(e.method&&e.content){for(var t,n,o=e.method.split("->"),a=o[o.length-1];(n=o.shift())&&(t=t||i,n!==a);)t=t[n];var u=t[a];if(r.type(u,"Function")){var c=u.toString().replace(/(\})$/,";"+e.content+"$1");u=new Function("return "+c),t[a]=u()}}}),i}},t.imports=l,t.renders=function(e){return e},t},N.prototype.exec=function(){var e=this;if(!e.module&&r.type(e.factory,"Function")){var t=e.setFactory(),n=[];r.each(e.deps,function(e){n.push(t.require(e))});var o=t.apply(t,n);if("component"!==e.name&&r.type(o,"Object")&&r.type(o._init,"Function")){var i={static:{},attr:{},proto:{}};r.each(o,function(e,t){"static"===t?i[t]=e:r.type(e,"Function")?i.proto[t]=e:i.attr[t]=e});var a=e.name.substr(e.name.lastIndexOf("/")+1).replace(/\{[^\{\}]+\}/g,"");i.static._componentname_=a;var u=e.module=N.createClass(e,i);u.exports=o,r.each(["$","$fn","$ready"],function(e){u(e,a,u)})}else e.module=o}return e},N.prototype.loadcss=function(){var e=this;return e.styles&&e.styles.length&&r.each(e.styles,function(n){var r=N.getAttrs(n,e.uri)[0];if(!$[r]){$[r]=!0,r=r+".css"+e.parameter;var o=t.createElement("link");o.rel="stylesheet",o.href=r,v.appendChild(o)}}),e},N.replacePath=function(e){e=e.replace(/([^:])\/{2,}/g,"$1/"),e=e.replace(/\.{2,}/g,"..");var t=function(e){return/([\w]+\/?)(\.\.\/)/g.test(e)?(e=e.replace(/([\w]+\/?)(\.\.\/)/g,function(e,t,n){return e==t+n?"":e}),t(e)):e};return e=t(e),e.replace(/([\w]+)\/?(\.\/)+/g,"$1/")},N.createClass=function(e,t){var n=function(e){var r=this;u(!0,r,t.attr,{index:n._index++,_eventArray:[]}),r.options=u(!0,{},r.options,n._options,e||{}),r.optionsCache=u(r.options),n._instances[r.index]=r,r.static=null,r._init()};return u(!0,n,t.static),u(!0,n.prototype,t.proto),function(){var e=arguments,t=e[0];if("string"!=typeof t)return new n(t);if(0!==t.indexOf("_")){var r=n[t];return"function"==typeof r?r.apply(n,Array.prototype.slice.call(e,1)):r}}},N.require=function(e,t){if(e){var n=e.module;return r.type(t,"Object")?n(factory):r.type(t,"String")?n[factory]:n}},N.setPath=function(e){var t=/\{([^\{\}]+)\}/.exec(e);if(t){var n=_.paths[t[1]];n&&(e=e.replace(t[0],n).replace(/(\.(js|css))?(\?[\s\S]*)?$/g,""))}return e},N.getAttrs=function(e,t){var n,r=e.replace(/(\.(js|css))?(\?[\s\S]*)?$/g,""),o=r.match(/(-debug|-min)$/g),i="";return o&&(r=r.replace(/(-debug|-min)$/g,""),i=o[0]),e=N.setPath(_.alias[r]||r),/^(https?|file):\/\//.test(e)||(n=N.replacePath(h+e),e=(t||h)+e),e=N.replacePath(e),[e,r,i,n]},N.getModule=function(e,t,n){var r=N.getAttrs(e,n),o=r[0];return b[r[1]]||b[o]||b[r[3]]||(b[o]=new N(r,t))},N.load=function(e,t,n){if(r.type(e,"String")&&r.trim(e)){var o=e.match(/(\?[\s\S]+)$/),i=b[N.getAttrs(e)[0]]||N.getModule(n,[e]);o&&(i.parameter=o[0]),x.push(i),i.callback=function(e){var o=i,a=i.suffix;i.name===n&&r.each(i.depmodules,function(e){o=e,a=e.suffix}),r.each(e,function(e){var t=b[e].exec();a||t.loadcss()}),r.type(t,"Function")&&t.call(r,o.module),delete i.callback},i.load()}},N.getdeps=function(e){var t=[],n=[],o=e.match(/(require|extend|imports)\(('|")[^'"]+\2/g);return o&&r.each(o,function(e){/^(require|extend)/.test(e)?t.push(e.replace(/^(require|extend)|[\('"]/g,"")):n.push(e.replace(/^imports|[\('"]/g,""))}),[i(t),i(n)]},N.define=function(e,t,n){r.type(e,"Function")?(n=e,e=void 0,t=[]):r.type(t,"Function")&&(n=t,r.type(e,"String")?t=[]:(t=e,e=void 0));var o=N.getdeps(n.toString()),i=t.concat(o[0]),a=o[1];if(e&&!b[e]&&!b[N.getAttrs(e)[0]]){var u=N.getModule(e,i);u.deps=t,u.styles=a,u.factory=n,u.loaded=!0,u.load()}if(f={name:e,deps:t,styles:a,alldeps:i,factory:n},void 0!==w){var c=w();c&&(c.moduleData=f)}},r.load=function(e,t){return N.load(e,t,g()),r},r.define=function(){var e=arguments,t=e.length,n=[];!t||1===t&&!r.type(e[0],"Function")?n.push(function(){return e[0]}):2===t&&!r.type(e[1],"Function")||3==t&&!r.type(e[2],"Function")?(n.push(e[0]),n.push(function(){return e[1]})):2===t&&!r.type(e[0],["Array","String"])&&r.type(e[1],"Function")?n.push(e[1]):3===t&&!r.type(e[1],"Array")&&r.type(e[2],"Function")?(n.push(e[0]),n.push(e[2])):n=e,N.define.apply(N,n)},r.config=function(e,t){r.type(e,"Object")?u(!0,_,e):r.type(e,"String")&&t&&u(!0,_[e],t);var n=_.paths.base||"";/^(https?|file):\/\//.test(n)||(n=_.paths.base=d+n),r.each(_.paths,function(e,t){"base"===t||/^(https?|file):\/\//.test(e)||(_.paths[t]=n+"/"+e)})}}}(this,document),Nui.define("util",{regex:{mobile:/^0?(13|14|15|17|18)[0-9]{9}$/,tel:/^[0-9-()（）]{7,18}$/,email:/^\w+((-w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/,idcard:/^\d{17}[\d|x]|\d{15}$/,cn:/^[\u4e00-\u9fa5]+$/,taxnum:/^[a-zA-Z0-9]{15,20}$/},getParam:function(e,t){var n=decodeURI(t||location.href),r={};if(startIndex=n.indexOf("?"),startIndex++>0){var o,i=n.substr(startIndex).split("&");$.each(i,function(e,t){o=t.split("="),r[o[0]]=o[1]})}return"string"==typeof e&&e&&(r=void 0!==(o=r[e])?o:""),r},setParam:function(e,t,n){var r;if($.isPlainObject(e))r=t||location.href,$.each(e,function(e,t){t&&($.isPlainObject(t)&&(t=tools.getJSON(t)),r=tools.setParam(e,t,r))});else if(r=n||location.href,r.indexOf("?")===-1&&(r+="?"),$.isPlainObject(t)&&(t=tools.getJSON(t)),r.indexOf(e+"=")!==-1){var o=new RegExp("("+e+"=)[^&]*");r=r.replace(o,"$1"+t)}else{var i="";r.indexOf("=")!==-1&&(i="&"),r+=i+e+"="+t}return r},supportCss3:function(e){var t,n=["webkit","Moz","ms","o"],r=[],o=document.documentElement.style,i=function(e){return e.replace(/-(\w)/g,function(e,t){return t.toUpperCase()})};for(t in n)r.push(i(n[t]+"-"+e));r.push(i(e));for(t in r)if(r[t]in o)return!0;return!1},supportHtml5:function(e,t){return e in document.createElement(t)},jumpUrl:function(e,t){e&&$('<a href="'+e+'"'+(t?'target="'+(t||"_self")+'"':"")+"><span></span></a>").appendTo("body").children().click().end().remove()},formatDate:function(e,t){if(e=parseInt(e)){if(!t)return e;var n=new Date(e),r={"M":n.getMonth()+1,"d":n.getDate(),"h":n.getHours(),"m":n.getMinutes(),"s":n.getSeconds()};return t=t.replace(/([yMdhms])+/g,function(e,t){var o=r[t];return void 0!==o?(e.length>1&&(o="0"+o,o=o.substr(o.length-2)),o):"y"===t?(n.getFullYear()+"").substr(4-e.length):e})}return"-"},getJSON:function(e){if("undefined"!=typeof JSON){var t=JSON.stringify(e);return Nui.browser.msie&&"8.0"==Nui.browser.version?t.replace(/\\u([0-9a-fA-F]{2,4})/g,function(e,t){return String.fromCharCode(parseInt(t,16))}):t}if($.isArray(e)){var n=[];return $.each(e,function(e,t){n.push(tools.getJSON(t))}),"["+n.join(",")+"]"}if($.isPlainObject(e)){var r=[];return $.each(e,function(e,t){r.push('"'+e+'":'+tools.getJSON(t))}),"{"+r.join(",")+"}"}return'"'+e+'"'},getData:function(e){var t={result:{},total:0,voidTotal:0},n=e.serializeArray(),r=n.length,o=0;for(o;o<r;o++){var i=$.trim(n[o].value);t.all++,i||t.voidTotal++,t.result[n[o].name]=i}return t}}),Nui.define("template",["util"],function(e){var t=function(e,t){if(e){if(n[e])return i(n[e],t,e);var r=document.getElementById(e);if(r&&"SCRIPT"===r.nodeName&&"text/html"===r.type)return i(n[e]=r.innerHTML,t,e)}return""},n={},r={openTag:"{{",closeTag:"}}"},o={trim:Nui.trim,formatDate:e.formatDate,setParam:e.setParam},i=function(e,n,c){var s=this;if("string"==typeof e){var l=r.openTag,f=r.closeTag,p=l.replace(/([^\s])/g,"\\$1"),d=f.replace(/([^\s])/g,"\\$1");if(e=e.replace(new RegExp(p+"\\s*include\\s+['\"]([^'\"]*)['\"]\\s*"+d,"g"),function(e,n){if(n){var r=s[n];return"function"==typeof r&&(r=r()),"string"==typeof r?i.call(s,r):t(n)}return""}),"object"==typeof n){Nui.type(n,"Array")&&(n={$list:n});var h="";e=e.replace(/[\r\n]+/g,""),Nui.each(e.split(l),function(e,t){e=e.split(f),t>=1?h+=u(Nui.trim(e[0]),!0):e[1]=e[0],h+=u(e[1].replace(/'/g,"\\'").replace(/"/g,'\\"'))}),Nui.each(n,function(e,t){h=h.replace(new RegExp("([^\\w\\.'\"]+)"+t.replace(/\$/g,"\\$"),"g"),"$1data."+t)});var g=new Function("data",'var that=this, line=1; this.code=""; try{'+h+";}catch(e){that.error(e, line)};");g.prototype.methods=o,g.prototype.error=a(h,n,c),g.prototype.out=function(){return this.code},e=new g(n).out(),g=null}return e}return""},a=function(e,t,n){return function(r,o){var i="\n",a=[];e=e.split("\n"),Nui.each(e,function(e,t){a.push(t+1+"      "+e.replace("line += 1;",""))}),i+="code\n",i+=a.join("\n")+"\n\n",void 0!==typeof JSON&&(i+="data\n",i+=JSON.stringify(t)+"\n\n"),n&&(i+="templateid\n",i+=n+"\n\n"),i+="line\n",i+=o+"\n\n",i+="message\n",i+=r.message,console.error(i)}},u=function(e,t){var n;return e?(t?(n=c(e,"if"))!==!1?"if("+n+"){":(n=c(e,"elseif"))!==!1?"\n}\nelse if("+n+"){":e.indexOf("else ")!==-1?"\n}\nelse{":e.indexOf("/if")!==-1?"}":(n=c(e,"each ",/\s+/))!==!1?"Nui.each("+n[0]+", function("+(n[1]||"$value")+","+(n[2]||"$index")+"){":e.indexOf("/each")!==-1?"});":(n=c(e," | ",/\s*,\s*/))!==!1?"that.code+=that.methods."+n[0]+"("+n.slice(1).toString()+");":0===e.indexOf("var ")?e+";":"that.code+="+e+";":"that.code+='"+e+"';")+"\nline += 1;":""},c=function(e,t,n){if(0===e.indexOf(t)||" | "===t&&e.indexOf(t)>0){var r="";return" | "===t&&(r=","),e=e.replace(t,r).replace(/^\s+/,""),n?e.split(n):e}return!1};return t.method=function(e,t){o[e]||(o[e]=t)},t.config=function(){var e=arguments;Nui.type(e[0],"Object")?Nui.each(e[0],function(e,t){r[t]=e}):e.length>1&&"string"==typeof e[0]&&(r[e[0]]=e[1])},t.render=i,t}),Nui.define("component",["template"],function(tpl){return{static:{_index:0,_instances:{},_options:{},_getSize:function(e,t,n){var r=0;if(n=n||"border",t=t||"tb","all"===n)return this._getSize(e,t)+this._getSize(e,t,"padding");var o={l:["Left"],r:["Right"],lr:["Left","Right"],t:["Top"],b:["Bottom"],tb:["Top","Bottom"]},i=[{border:{l:["LeftWidth"],r:["RightWidth"],lr:["LeftWidth","RightWidth"],t:["TopWidth"],b:["BottomWidth"],tb:["TopWidth","BottomWidth"]}},{padding:o},{margin:o}];return $.each(i,function(o,i){i[n]&&$.each(i[n][t],function(t,o){var i=parseInt(e.css(n+o));r+=isNaN(i)?0:i})}),r},$:function(e,t){$[e]=function(e){if(e)return t(e)}},$fn:function(e,t){$.fn[e]=function(){var n=arguments,r=n[0];return this.each(function(){var o=this;o.nui||(o.nui={});var i=($(o),o.nui[e]);if(!i){var a=r;Nui.type(a,"Object")?r.target=o:a={target:o},i=o.nui[e]=t(a)}if("string"==typeof r&&0!==r.indexOf("_"))if("options"===r)"object"==typeof n[1]?i.set(n[1]):"string"==typeof n[1]&&i.set(n[1],n[2]);else{var u=i[r];"function"==typeof u&&u.apply(i,Array.prototype.slice.call(n,1))}})}},$ready:function(name,module){var attr="options-"+name,_$fn=$.fn[name],_$=$[name];$("["+attr+"]").each(function(index,item){var ele=$(item),options=ele.attr(attr);options=options?eval("("+ele.attr(attr)+")"):{},options.target=item,_$fn?ele[name](options):_$?$[name](options):module(options)})},options:function(e,t){Nui.type(e,"Object")?$.extend(!0,this._options,e):Nui.type(e,"String")&&(this._options[e]=t)}},options:{target:null,theme:""},_init:$.noop,_exec:$.noop,_getTarget:function(){return this.target||(this.options.target?$(this.options.target):null)},_on:function(e,t,n,r){var o=this;return t.on(e,n),r===!0&&t[e](),o._eventArray.push({target:t,type:e,callback:n}),o},_off:function(){var e=this;return $.each(e._eventArray,function(e,t){t&&t.target.off(t.type,t.callback)}),e._eventArray=[],e},_delete:function(){var e=this,t=e.constructor,n=e.target[0];n&&n.nui&&(n.nui[e.constructor._componentname_]=null,delete n.nui[e.constructor._componentname_]),t._instances[e.index]=null,delete t._instances[e.index]},_reset:function(){var e=this;return e._off(),e.elem&&e.elem.remove(),e},_tpl2html:function(e,t){return tpl.render.call(this,e,t)},set:function(e,t){var n=this;return n._reset(),(e||t)&&($.isPlainObject(e)?n.options=$.extend(!0,n.options,e):n.options[e]=t,n._exec()),n},get:function(e){var t=this;return e?t.options[e]:t.options},reset:function(){return this.set(that.optionsCache)},destroy:function(){var e=this;e._reset(),e._delete()}}});