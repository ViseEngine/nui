!function(e,t,n){if(!e.Nui){var r=e.Nui={type:function(e,t){if(null===e||e===n)return!1;if(o(t)){var a=!1;return r.each(t,function(t){if(i(t)(e))return a=!0,!1}),a}return i(t)(e)},each:function(e,t){var n;if(o(e)){var r=e.length;for(n=0;n<r&&t(e[n],n)!==!1;n++);}else for(n in e)if(t(e[n],n)===!1)break},browser:function(){var e=navigator.userAgent.toLowerCase(),t=/(edge)[ \/]([\w.]+)/.exec(e)||/(chrome)[ \/]([\w.]+)/.exec(e)||/(webkit)[ \/]([\w.]+)/.exec(e)||/(opera)(?:.*version|)[ \/]([\w.]+)/.exec(e)||/(msie) ([\w.]+)/.exec(e)||e.indexOf("compatible")<0&&/(mozilla)(?:.*? rv:([\w.]+)|)/.exec(e)||[],n=t[1]||"",r=t[2]||"0",i={};return"mozilla"===n&&/trident/.test(e)&&(n="msie",r="11.0"),n&&(i[n]=!0,i.version=r),i.chrome||i.edge?i.webkit=!0:i.webkit&&(i.safari=!0),i}()},i=function(e){return function(t){return{}.toString.call(t)==="[object "+e+"]"}},o=r.isArray=Array.isArray||i("Array");r.each({trim:/^\s+|\s+$/g,trimLeft:/^\s+/g,trimRight:/\s+$/g},function(e,t){r[t]=function(){return String.prototype[t]?function(e){return e[t]()}:function(t){return t.replace(e,"")}}()});var a=function(){};if(e.console=e.console||{log:a,debug:a,error:a,info:a},r.bsie6=r.browser.msie&&r.browser.version<=6,r.bsie7=r.browser.msie&&r.browser.version<=7,r.bsie7&&t.execCommand("BackgroundImageCache",!1,!0),"undefined"!=typeof jQuery){var u={};r.$=function(e){return"string"==typeof e?u[e]||(u[e]=jQuery(e)):jQuery(e)},r.win=jQuery(e),r.doc=jQuery(t)}var c,s,l=function(e){var t=[],n={};return r.each(e,function(e){n[e]||(n[e]=!0,t.push(e))}),t},f=function(){var e,t,i,a,u,c,s=arguments[0]||{},l=1,d=arguments.length,h=!1;for("boolean"==typeof s&&(h=s,s=arguments[1]||{},l=2),"object"==typeof s||r.type(s,"Function")||(s={}),d===l&&(s={},--l);l<d;l++)if(null!=(u=arguments[l]))for(a in u)e=s[a],i=u[a],s!==i&&(h&&i&&(p(i)||(t=o(i)))?(t?(t=!1,c=e&&o(e)?e:[]):c=e&&p(e)?e:{},s[a]=f(h,c,i)):i!==n&&(s[a]=i));return s},p=function(e){return!(!e||!r.type(e,"Object")||e.nodeType)},d=function(e){var t;for(t in e)return!1;return!0},h=location.protocol+"//"+location.host,g=function(){var e=(h+location.pathname).replace(/\\/g,"/"),t=e.lastIndexOf("/");return e.substr(0,t+1)},m=g(),v=function(){return"_module_"+$++},y=t.head||t.getElementsByTagName("head")[0]||t.documentElement,b="onload"in t.createElement("script"),$=0,x={},_={},N=[],w={paths:{},alias:{}};if(r.browser.msie&&r.browser.version<=9)var O,j=function(){return s?s:O&&"interactive"===O.readyState?O:(r.each(y.getElementsByTagName("script"),function(e){if("interactive"===e.readyState)return O=e,!1}),O)};var S=function(e,t){var n=this;n.deps=t||[],n.alldeps=n.deps,n.depmodules={},n.id=e[0],n.name=e[1],n.parameter="",n.suffix=e[2],n.uri=n.id.substr(0,n.id.lastIndexOf("/")+1)};S.prototype.load=function(){var e=this;if(e.loaded||/_module_\d+$/.test(e.id))return e.onload();var n=t.createElement("script");return e.url=e.id+e.suffix+".js"+e.parameter,n.src=e.url,n.id=e.id,s=n,y.appendChild(n),s=null,b?n.onload=n.onerror=e.onload(n):n.onreadystatechange=function(){/loaded|complete/.test(n.readyState)&&e.onload(n)()},e.resolve()},S.prototype.resolve=function(){var e=this;return e.alldeps.length&&d(e.depmodules)&&r.each(e.alldeps,function(t){var n=S.getModule(t,[],e.uri);n.parameter=e.parameter,e.depmodules[t]=n.loaded?n:n.load()}),e},S.prototype.onload=function(e){var t=this;return e?function(){if(c=e.moduleData||c,e.onload=e.onerror=e.onreadystatechange=null,y.removeChild(e),e=null,t.loaded=!0,c)return r.each(c,function(e,n){e&&(t[n]=e)}),c=null,t.resolve().runcallback()}:(t.loaded=!0,t.resolve().runcallback())},S.prototype.runcallback=function(){var e=this,t=e.getloaded();return t&&r.each(t,function(e){e.root.callback&&e.root.callback(e.modules)}),e},S.prototype.getModules=function(e){var t=this;return e||(e=[]),e.unshift(t.id),t.alldeps.length&&r.each(t.depmodules,function(t){e=t.getModules(e)}),e},S.prototype.getloaded=function(){var e=[],t=[];r.each(N,function(n){var r=l(n.getModules());t=t.concat(r),e.push({root:n,modules:r})}),t=l(t);for(var n;n=t.shift();)if(!x[n].loaded)return!1;return e},S.prototype.setFactory=function(){var e=this,t=e.factory;return t.require=function(t,n){return S.require(e.depmodules[t],n)},t.extend=function(e,i,u){var c;if(e){if("string"==typeof e){var s=t.require(e);if(s===n)return e;e=s}return o(e)?(c=f(!0,[],e),u===!0&&(o(i)?c=c.concat(i):c.push(i))):c=r.type(e,"Function")?e.exports?f(!0,{},e.exports,i):f(!0,a,e,i):r.type(e,"Object")?f(!0,{},e,i):e,o(u)&&r.type(c,["Object","Function"])&&r.each(u,function(e){if(e.method&&e.content){for(var t,n,i=e.method.split("->"),o=i[i.length-1];(n=i.shift())&&(t=t||c,n!==o);)t=t[n];var a=t[o];if(r.type(a,"Function")){var u=a.toString().replace(/(\})$/,";"+e.content+"$1");a=new Function("return "+u),t[o]=a()}}}),c}},t.imports=a,t.renders=function(e){return e},t},S.prototype.exec=function(){var e=this;if(!e.module&&r.type(e.factory,"Function")){var t=e.setFactory(),n=[];r.each(e.deps,function(e){n.push(t.require(e))});var i=t.apply(t,n);if("component"!==e.name&&r.type(i,"Object")&&r.type(i._init,"Function")){var o={static:{},attr:{},proto:{}};r.each(i,function(e,t){"static"===t?o[t]=e:r.type(e,"Function")?o.proto[t]=e:o.attr[t]=e});var a=e.name.substr(e.name.lastIndexOf("/")+1).replace(/\{[^\{\}]+\}/g,"");o.static._componentname_=a;var u=e.module=S.createClass(e,o);u.exports=i,r.each(["$","$fn","$ready"],function(e){u(e,a,u)})}else e.module=i}return e},S.prototype.loadcss=function(){var e=this;return e.styles&&e.styles.length&&r.each(e.styles,function(n){var r=S.getAttrs(n,e.uri)[0];if(!_[r]){_[r]=!0,r=r+".css"+e.parameter;var i=t.createElement("link");i.rel="stylesheet",i.href=r,y.appendChild(i)}}),e},S.replacePath=function(e){e=e.replace(/([^:])\/{2,}/g,"$1/"),e=e.replace(/\.{2,}/g,"..");var t=function(e){return/([\w]+\/?)(\.\.\/)/g.test(e)?(e=e.replace(/([\w]+\/?)(\.\.\/)/g,function(e,t,n){return e==t+n?"":e}),t(e)):e};return e=t(e),e.replace(/([\w]+)\/?(\.\/)+/g,"$1/")},S.createClass=function(e,t){var n=function(e){var r=this;f(!0,r,t.attr,{index:n._index++,_eventArray:[]}),r.options=f(!0,{},r.options,n._options,e||{}),r.optionsCache=f(r.options),n._instances[r.index]=r,r.static=null,r._init()};return f(!0,n,t.static),f(!0,n.prototype,t.proto),function(){var e=arguments,t=e[0];if("string"!=typeof t)return new n(t);if(0!==t.indexOf("_")){var r=n[t];return"function"==typeof r?r.apply(n,Array.prototype.slice.call(e,1)):r}}},S.require=function(e,t){if(e){var n=e.module;return r.type(t,"Object")?n(factory):r.type(t,"String")?n[factory]:n}},S.setPath=function(e){var t=/\{([^\{\}]+)\}/.exec(e);if(t){var n=w.paths[t[1]];n&&(e=e.replace(t[0],n).replace(/(\.(js|css))?(\?[\s\S]*)?$/g,""))}return e},S.getAttrs=function(e,t){var n,r=e.replace(/(\.(js|css))?(\?[\s\S]*)?$/g,""),i=r.match(/(-debug|-min)$/g),o="";return i&&(r=r.replace(/(-debug|-min)$/g,""),o=i[0]),e=S.setPath(w.alias[r]||r),/^(https?|file):\/\//.test(e)||(n=S.replacePath(m+e),e=(t||m)+e),e=S.replacePath(e),[e,r,o,n]},S.getModule=function(e,t,n){var r=S.getAttrs(e,n),i=r[0];return x[r[1]]||x[i]||x[r[3]]||(x[i]=new S(r,t))},S.load=function(e,t,n){if(r.type(e,"String")&&r.trim(e)){var i=e.match(/(\?[\s\S]+)$/),o=x[S.getAttrs(e)[0]]||S.getModule(n,[e]);i&&(o.parameter=i[0]),N.push(o),o.callback=function(e){var i=o,a=o.suffix;o.name===n&&r.each(o.depmodules,function(e){i=e,a=e.suffix}),r.each(e,function(e){var t=x[e].exec();a||t.loadcss()}),r.type(t,"Function")&&t.call(r,i.module),delete o.callback},o.load()}},S.getdeps=function(e){var t=[],n=[],i=e.match(/(require|extend|imports)\(('|")[^'"]+\2/g);return i&&r.each(i,function(e){/^(require|extend)/.test(e)?t.push(e.replace(/^(require|extend)|[\('"]/g,"")):n.push(e.replace(/^imports|[\('"]/g,""))}),[l(t),l(n)]},S.define=function(e,t,i){r.type(e,"Function")?(i=e,e=n,t=[]):r.type(t,"Function")&&(i=t,r.type(e,"String")?t=[]:(t=e,e=n));var o=S.getdeps(i.toString()),a=t.concat(o[0]),u=o[1];if(e&&!x[e]&&!x[S.getAttrs(e)[0]]){var s=S.getModule(e,a);s.deps=t,s.styles=u,s.factory=i,s.loaded=!0,s.load()}if(c={name:e,deps:t,styles:u,alldeps:a,factory:i},"undefined"!=typeof j){var l=j();l&&(l.moduleData=c)}},r.load=function(e,t){return S.load(e,t,v()),r},r.define=function(){var e=arguments,t=e.length,n=[];!t||1===t&&!r.type(e[0],"Function")?n.push(function(){return e[0]}):2===t&&!r.type(e[1],"Function")||3==t&&!r.type(e[2],"Function")?(n.push(e[0]),n.push(function(){return e[1]})):2===t&&!r.type(e[0],["Array","String"])&&r.type(e[1],"Function")?n.push(e[1]):3===t&&!o(e[1])&&r.type(e[2],"Function")?(n.push(e[0]),n.push(e[2])):n=e,S.define.apply(S,n)},r.config=function(e,t){r.type(e,"Object")?f(!0,w,e):r.type(e,"String")&&t&&f(!0,w[e],t);var n=w.paths.base||"";/^(https?|file):\/\//.test(n)||(n=w.paths.base=h+n),r.each(w.paths,function(e,t){"base"===t||/^(https?|file):\/\//.test(e)||(w.paths[t]=n+"/"+e)})}}}(this,document),Nui.define("util",{regex:{mobile:/^0?(13|14|15|17|18)[0-9]{9}$/,tel:/^[0-9-()（）]{7,18}$/,email:/^\w+((-w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/,idcard:/^\d{17}[\d|x]|\d{15}$/,cn:/^[\u4e00-\u9fa5]+$/,taxnum:/^[a-zA-Z0-9]{15,20}$/},getParam:function(e,t){var n=decodeURI(t||location.href),r={};if(startIndex=n.indexOf("?"),startIndex++>0){var i,o=n.substr(startIndex).split("&");Nui.each(o,function(e){i=e.split("="),r[i[0]]=i[1]})}return"string"==typeof e&&e&&(r=void 0!==(i=r[e])?i:""),r},setParam:function(e,t,n){var r;if(Nui.type(e,"Object"))r=t||location.href,Nui.each(e,function(e,t){e&&(Nui.type(e,"Object")&&(e=tools.getJSON(e)),r=tools.setParam(t,e,r))});else if(r=n||location.href,r.indexOf("?")===-1&&(r+="?"),Nui.type(t,"Object")&&(t=tools.getJSON(t)),r.indexOf(e+"=")!==-1){var i=new RegExp("("+e+"=)[^&]*");r=r.replace(i,"$1"+t)}else{var o="";r.indexOf("=")!==-1&&(o="&"),r+=o+e+"="+t}return r},supportCss3:function(e){var t,n=["webkit","Moz","ms","o"],r=[],i=document.documentElement.style,o=function(e){return e.replace(/-(\w)/g,function(e,t){return t.toUpperCase()})};for(t in n)r.push(o(n[t]+"-"+e));r.push(o(e));for(t in r)if(r[t]in i)return!0;return!1},supportHtml5:function(e,t){return e in document.createElement(t)},jumpUrl:function(e,t){e&&$('<a href="'+e+'"'+(t?'target="'+(t||"_self")+'"':"")+"><span></span></a>").appendTo("body").children().click().end().remove()},formatDate:function(e,t){if(e=parseInt(e)){if(!t)return e;var n=new Date(e),r={"M":n.getMonth()+1,"d":n.getDate(),"h":n.getHours(),"m":n.getMinutes(),"s":n.getSeconds()};return t=t.replace(/([yMdhms])+/g,function(e,t){var i=r[t];return void 0!==i?(e.length>1&&(i="0"+i,i=i.substr(i.length-2)),i):"y"===t?(n.getFullYear()+"").substr(4-e.length):e})}return"-"},getJSON:function(e){if("undefined"!=typeof JSON){var t=JSON.stringify(e);return Nui.browser.msie&&"8.0"==Nui.browser.version?t.replace(/\\u([0-9a-fA-F]{2,4})/g,function(e,t){return String.fromCharCode(parseInt(t,16))}):t}if(Nui.isArray(e)){var n=[];return Nui.each(e,function(e){n.push(tools.getJSON(e))}),"["+n.join(",")+"]"}if(Nui.type(e,"Object")){var r=[];return Nui.each(e,function(e,t){r.push('"'+t+'":'+tools.getJSON(e))}),"{"+r.join(",")+"}"}return'"'+e+'"'},getData:function(e){var t={result:{},total:0,voidTotal:0},n=e.serializeArray(),r=n.length,i=0;for(i;i<r;i++){var o=$.trim(n[i].value);t.all++,o||t.voidTotal++,t.result[n[i].name]=o}return t}}),Nui.define("template",["util"],function(e){var t=function(e,t,r){if(this.tplid=e){if(n[e])return f.call(this,n[e],t,r);var i=document.getElementById(e);if(i&&"SCRIPT"===i.nodeName&&"text/html"===i.type)return f.call(this,n[e]=i.innerHTML,t,r)}return""},n={},r={openTag:"<%",closeTag:"%>"},i={trim:Nui.trim,formatDate:e.formatDate,setParam:e.setParam},o=!!"".trim,a=";that.out = function(){return code";a=(o?'""'+a:"[]"+a+'.join("")')+"}";var u=function(e){return o?e?function(e){return"code += "+e+";"}:function(e,t){return e+=t}:e?function(e){return"code.push("+e+");"}:function(e,t){return e.push(t),e}},c=u(!0),s=u(),l=function(e,n,r,i){var o=this,a=n.replace(/([^\s])/g,"\\$1"),u=r.replace(/([^\s])/g,"\\$1");return e.replace(new RegExp(a+"\\s*include\\s+['\"]([^'\"]*)['\"]\\s*"+u,"g"),function(e,n){if(n){var r=o[n];return"function"==typeof r&&(r=r()),"string"==typeof r?f.call(o,r,null,i):t(n,null,i)}return""})},f=function(e,t,n){var u=this;if("string"==typeof e){n=n||{};var c=n.openTag||r.openTag,f=n.closeTag||r.closeTag;if(e=l.call(u,e,c,f),t&&"object"==typeof t){Nui.isArray(t)&&(t={$list:t});var h=o?"":[];Nui.each(e.split(c),function(e,t){e=e.split(f),t>=1?h=s(h,d(Nui.trim(e[0]),!0)):e[1]=e[0],h=s(h,d(e[1].replace(/'/g,"\\'").replace(/"/g,'\\"')))}),o||(h=h.join("")),Nui.each(t,function(e,t){h=h.replace(new RegExp("([^\\w\\.'\"]+)"+t.replace(/\$/g,"\\$"),"g"),"$1data."+t)});try{var g=new Function("data","var that=this, line=1, code="+a+";try{"+h+";}catch(e){that.error(e, line)};");g.prototype.methods=i,g.prototype.error=p(h,t,u.tplid),e=new g(t).out(),g=null}catch(e){p(h,t,u.tplid)(e)}}return e}return""},p=function(e,t,n){return function(r,i){var o="\n",a=[];e=e.split("\n"),Nui.each(e,function(e,t){a.push(t+1+"      "+e.replace("line++;",""))}),o+="code\n",o+=a.join("\n")+"\n\n",void 0!==typeof JSON&&(o+="data\n",o+=JSON.stringify(t)+"\n\n"),n&&(o+="templateid\n",o+=n+"\n\n"),i&&(o+="line\n",o+=i+"\n\n"),o+="message\n",o+=r.message,console.error(o)}},d=function(e,t){if(!e)return"";var n,r;return n=t?void 0!==(r=h(e,"if"))?"if("+r+"){":void 0!==(r=h(e,"elseif"))?"\n}\nelse if("+r+"){":"else"===e?"\n}\nelse{":"/if"===e?"}":void 0!==(r=h(e,"each ",/\s+/))?"Nui.each("+r[0]+", function("+(r[1]||"$value")+","+(r[2]||"$index")+"){":"/each"===e?"});":void 0!==(r=h(e," | ",/\s*,\s*/))?c("that.methods."+r[0]+"("+r.slice(1).toString()+")"):0===e.indexOf("var ")?e+";":c(e):c("'"+e+"'"),n+"\nline++;"},h=function(e,t,n){var r;if(0===e.indexOf(t)?r="":" | "===t&&e.indexOf(t)>0&&(r=","),void 0!==r)return e=Nui.trimLeft(e.replace(t,r)),n?e.split(n):e};return t.method=function(e,t){i[e]||(i[e]=t)},t.config=function(){var e=arguments;Nui.type(e[0],"Object")?Nui.each(e[0],function(e,t){r[t]=e}):e.length>1&&"string"==typeof e[0]&&(r[e[0]]=e[1])},t.render=f,t}),Nui.define("component",["template"],function(tpl){return{static:{_index:0,_instances:{},_options:{},_getSize:function(e,t,n){var r=0;if(n=n||"border",t=t||"tb","all"===n)return this._getSize(e,t)+this._getSize(e,t,"padding");var i={l:["Left"],r:["Right"],lr:["Left","Right"],t:["Top"],b:["Bottom"],tb:["Top","Bottom"]},o=[{border:{l:["LeftWidth"],r:["RightWidth"],lr:["LeftWidth","RightWidth"],t:["TopWidth"],b:["BottomWidth"],tb:["TopWidth","BottomWidth"]}},{padding:i},{margin:i}];return $.each(o,function(i,o){o[n]&&$.each(o[n][t],function(t,i){var o=parseInt(e.css(n+i));r+=isNaN(o)?0:o})}),r},$:function(e,t){$[e]=function(e){if(e)return t(e)}},$fn:function(e,t){$.fn[e]=function(){var n=arguments,r=n[0];return this.each(function(){var i=this;i.nui||(i.nui={});var o=($(i),i.nui[e]);if(!o){var a=r;Nui.type(a,"Object")?r.target=i:a={target:i},o=i.nui[e]=t(a)}if("string"==typeof r&&0!==r.indexOf("_"))if("options"===r)"object"==typeof n[1]?o.set(n[1]):"string"==typeof n[1]&&o.set(n[1],n[2]);else{var u=o[r];"function"==typeof u&&u.apply(o,Array.prototype.slice.call(n,1))}})}},$ready:function(name,module){var attr="options-"+name,_$fn=$.fn[name],_$=$[name];$("["+attr+"]").each(function(index,item){var ele=$(item),options=ele.attr(attr);options=options?eval("("+ele.attr(attr)+")"):{},options.target=item,_$fn?ele[name](options):_$?$[name](options):module(options)})},options:function(e,t){Nui.type(e,"Object")?$.extend(!0,this._options,e):Nui.type(e,"String")&&(this._options[e]=t)}},options:{target:null,theme:""},_init:$.noop,_exec:$.noop,_getTarget:function(){return this.target||(this.options.target?$(this.options.target):null)},_on:function(e,t,n,r){var i=this;return t.on(e,n),r===!0&&t[e](),i._eventArray.push({target:t,type:e,callback:n}),i},_off:function(){var e=this;return $.each(e._eventArray,function(e,t){t&&t.target.off(t.type,t.callback)}),e._eventArray=[],e},_delete:function(){var e=this,t=e.constructor,n=e.target[0];n&&n.nui&&(n.nui[e.constructor._componentname_]=null,delete n.nui[e.constructor._componentname_]),t._instances[e.index]=null,delete t._instances[e.index]},_reset:function(){var e=this;return e._off(),e.elem&&e.elem.remove(),e},_tpl2html:function(e,t){return tpl.render.call(this,e,t)},set:function(e,t){var n=this;return n._reset(),(e||t)&&($.isPlainObject(e)?n.options=$.extend(!0,n.options,e):n.options[e]=t,n._exec()),n},get:function(e){var t=this;return e?t.options[e]:t.options},reset:function(){return this.set(that.optionsCache)},destroy:function(){var e=this;e._reset(),e._delete()}}});