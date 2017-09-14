Nui.define('pages/components/router/script/options',function(){return{text:'1111',color:'#f60'}}),Nui.define('src/components/placeholder',['component'],function(t){return this.extend(t,{_options:{text:'',animate:!1,equal:!1,color:'#ccc'},_template:{list:'<%each style%><%$index%>:<%$value%>;<%/each%>',wrap:'<strong class="<% className %>" style="<%include \'list\'%>" />',elem:'<b style="<%include \'list\'%>"><%text%></b>'},_init:function(){this._exec()},_exec:function(){var t=this,e=t._getTarget();if(e){var a=t.deftext=e.attr('placeholder');!t.deftext&&t._options.text&&e.attr('placeholder',a=t._options.text),t.text=Nui.trim(a),void 0===t.val&&(t.val=Nui.trim(e.val())),t.text&&t._create()}},_create:function(){var t=this,e=t._options,a=t.constructor;if(!e.animate&&(e.animate||'placeholder'in document.createElement('input')))t._setStyle();else{e.animate&&t.target.removeAttr('placeholder');var n=t._tplData();n.style={'position':'relative','display':'inline-block','width':t.target.outerWidth()+'px','overflow':'hidden','cursor':'text'},t.target.wrap(t._tpl2html('wrap',n)),t.element=$(t._tpl2html('elem',{text:t.text,style:function(){var n=t.target.outerHeight(),r=t.target.is('textarea');return{'display':Nui.trim(t.target.val())?'none':'inline','position':'absolute','left':a._getSize(t.target,'l','padding')+a._getSize(t.target,'l')+'px','top':a._getSize(t.target,'t','padding')+a._getSize(t.target,'t')+'px','height':r?'auto':n+'px','line-height':r?'normal':n+'px','color':e.color}}()})).insertAfter(t.target),t._events()}},_setStyle:function(){var t=this;t._options;t.className='_placeholder-'+t.__id,t.target.addClass(t.className),t.constructor.style||t._createStyle(),t._createRules()},_createStyle:function(){var t=this,e=document.createElement('style');document.head.appendChild(e),t.constructor.style=e.sheet},_createRules:function(){var t=this,e=t.constructor.style,a=t.__id;try{e.deleteRule(a)}catch(t){}Nui.each(['::-webkit-input-placeholder',':-ms-input-placeholder','::-moz-placeholder'],function(n){var r='.'+t.className+n,i='opacity:1; color:'+(t._options.color||'');try{'addRule'in e?e.addRule(r,i,a):'insertRule'in e&&e.insertRule(r+'{'+i+'}',a)}catch(t){}})},_events:function(){var t=this,e=t._options,a=t.constructor,n=a._getSize(t.target,'l','padding')+a._getSize(t.target,'l');t._on('click',t.element,function(){t.target.focus()}),t._on('focus',t.target,function(){e.animate&&t.element.stop(!0,!1).animate({left:n+10,opacity:'0.5'})}),t._on('blur change',t.target,function(e,a){t.value()}),t._on('keyup keydown',t.target,function(e,a){Nui.trim(a.val())?t.element.hide():t.element.show()})},_reset:function(){var t=this;t._off(),t.element&&(t.element.remove(),t.target.unwrap()),t.target.val(t.val).removeClass(t.className),t.deftext?t.target.attr('placeholder',t.deftext):t.target.removeAttr('placeholder')},value:function(t){var e=this.constructor,a=this.target,n=e._getSize(a,'l','padding')+e._getSize(a,'l'),r=Nui.trim(arguments.length?a.val(t).val():a.val());!this._options.equal&&r===this.text||!r?(a.val(''),this.element&&this.element.show(),this._options.animate&&this.element.stop(!0,!1).animate({left:n,opacity:'1'})):this.element&&this.element.hide()}})}),Nui.define('src/components/router',['component','template','events'],function(t,e,a){var n={_paths:{},_init:function(){var t=this;Nui.doc.on('click','.nui-router-back',function(){return t.back()}).on('click','.nui-router-forward',function(){return t.forward()})},_setpaths:function(t,e){this._paths[t]||(this._paths[t]=e)},_replace:function(t){return t.replace(location.protocol+'//'+location.host,'').replace(/\s+/g,'').replace(/^\#\!?/,'').replace(/^([^\/])/,'/$1').replace(/\/$/,'')},_getWrapper:function(t){return $('<div class="nui-router-wrapper"></div>').appendTo(t)},_split:function(t){var e={url:t,params:{}},a=t.match(/\?[^\/\s]+/);if(a){var n=a[0];e.url=t.replace(n,''),n=n.replace('?','').split('&'),Nui.each(n,function(t,a){var n=t.split('=');e.params[n[0]]=n[1]})}return e},_change:function(){var n=this;if(!$.isEmptyObject(n._paths)){var r=location.hash,i=this._split(r),o=n._replace(i.url),l=i.params;Nui.each(n._paths,function(i){if(o===i.path||0===o.indexOf(i.path)){var s=o.replace(i.path,'').replace(/^\//,''),c=n.__instances[i.id],p=c._options,u={};if(s=s?s.split('/'):[],s.length===i.params.length){var h=!0===c._isRrender,_=!1!==c._isRrender&&!c._wrapper,d=!c.loaded||h||_;delete c._isRrender,(_||c._wrapper&&h)&&(p.data=$.extend(!0,{},c._defaultOptions.data)),Nui.each(i.params,function(t,e){u[t]=s[e]}),Nui.each(l,function(t,e){u[t]=l[e]}),p.data.path=i.path+'/',p.data.url=o+'/',p.data.params=u,p.data.query=l,c._send&&c._send.data&&'function'==typeof p.onData&&(p.onData.call(p,c._send.data),delete c._send),d&&(p.wrapper&&!c._wrapper?'boolean'!=typeof p.wrapper?c._wrapper=c.container.children(p.wrapper):c._wrapper=n._getWrapper(c.container):n._wrapper||(n._wrapper=n._getWrapper(c.container)),!c._isRrender&&c._wrapper||t.destroy((c._wrapper||n._wrapper).off()));var f=p.element=c._wrapper||n._wrapper;if('function'==typeof p.onChange&&p.onChange.call(p),d){var m=p.template;m&&('string'==typeof m?f.html(e.render(m,p.data)):f.html(e.render.call(m,m.main,p.data))),'function'==typeof p.onInit&&p.onInit.call(p),a.call(p),t.init(f),c.loaded=!0}return f.show().siblings('.nui-router-wrapper').hide(),'function'==typeof p.onAfter&&p.onAfter.call(p),n._initialize=match=!0,Nui.bsie7&&n._setHistory(r),!1}}}),n._initialize||Nui.each(n.__instances,function(t){if(!n._isEntry&&!0===t._options.entry)return n._isEntry=!0,t.target?t._render(t.target.eq(0)):t.path&&t._render(t.path),n._initialize=!0,!1})}n._oldhash=r},_bindHashchange:function(){var t=this;if(Nui.bsie7){var e=function(e){var a=location.hash;return t._oldhash!==a&&!e};setInterval(function(){e()&&t._change()},100),e(!0)}else Nui.win.on('hashchange',function(){t._change()})},_$ready:null,_$fn:null,init:null,start:function(){this._initialize||this._change()},location:function(t,e,a){var n=this;if(t){arguments.length<=2&&'boolean'==typeof e&&(a=e,e=null);var r,i;t=this._replace(t),Nui.each(this._paths,function(e,a){if(a===t||0===t.indexOf(e.path)&&(r=t.replace(e.path+'/',''))&&r.split('/').length===e.params.length)return i=n.__instances[e.id],!1}),i&&(i._send={data:e},i._isRrender=a,i._render(t))}else n.start()},forward:function(t){return history.forward(t),!1},back:function(t){return history.back(t),!1}};return Nui.bsie7&&(n._history=[],n._setHistory=function(t){this._isHistory||(Nui.each(this._history,function(t){t.active=!1}),this._history.push({hash:t,active:!0})),this._isHistory=!1},Nui.each(['forward','back'],function(t){var e='forward'===t?1:-1;n[t]=function(){var a=this,r=a._history.length;return n._isHistory=!0,Nui.each(a._history,function(n,i){var o=i+e;if(n.active){if(-1===o||o===r)return window.history[t](),!1;var l=a._history[o];return l&&(location.hash=l.hash,l.active=!0),n.active=!1,!1}}),!1}})),this.extend(t,{_static:n,_options:{path:'',template:'',container:null,data:{},entry:!1,wrapper:!1,level:2,onBefore:null,onChange:null,onData:null,onInit:null,onAfter:null},_init:function(){var t=this,e=t.constructor;t._exec()&&!e._bind&&(e._bind=!0,e._bindHashchange())},_exec:function(){var t=this,e=t._options,a=t.constructor;if(t.container=a._jquery(e.container),e.path&&t.container){t.path=a._replace(e.path);var n=t._getpath(),r=n.params.length;if((!r&&1===e.level||1!==e.level)&&a._setpaths(n.rule,n),r&&e.level>0)for(var i,o,l=[];i=n.params.shift();)l.push(i),o=l.join('/:'),a._setpaths(n.rule+'/:'+o,$.extend({},n,{params:o.split('/:')}));return t._getTarget()&&t._event(),t}},_getpath:function(){var t=this,e=t.path,a=t._options,n=e.indexOf('/:'),r={id:t.__id,params:[],rule:e,path:e};return-1!==n&&(r.params=e.substr(n+2).split('/:'),t.path=r.path=e.substr(0,n),a.level>0&&(r.rule=r.path)),r},_render:function(t){var e=this,a=e._options,n=t instanceof jQuery?t.attr('href'):t;if(n){var r=!1,i=function(){r=!0,location.hash='#!'+e.constructor._replace(n)};if('function'==typeof a.onBefore&&!1===a.onBefore.call(a,i))return!1;r||i()}},_event:function(){var t=this;t._options;return t._on('click',Nui.doc,t.target,function(e,a){t._render(a),e.preventDefault()}),t},_reset:function(){var t=this,e=t.constructor;return t._off(),Nui.each(e._paths,function(a,n){a.id===t.__id&&delete e._paths[n]}),t},option:null,reset:null})}),Nui.define('./script/demo',['src/components/router'],function(t){var require=(this.renders,this.require);require('src/components/placeholder');t({target:'#home',entry:!0,path:'/home/',wrapper:'#aa',container:'#main'}),t({target:'#news, .news',entry:!0,path:'/news/:id/:title',container:'#main',level:2,template:{list:'<ul><%each list%><li><a href="<%$value.url%>/<%$value.title%>" class="news"><%$value.title%></a></li><%/each%></ul>',detail:'<div><h3><%params.title%></h3><p>这是<%params.title%>详情，id是<%params.id%>。<input type="text" data-placeholder-options="'+require('pages/components/router/script/options',!0).id+'"></p></div>'},data:{list:[{url:'/news/1',title:'资讯1'},{url:'/news/2',title:'资讯2'},{url:'/news/3',title:'资讯3'}]},onChange:function(){var t=this.template,e=this.data.params;e.id&&e.title?t.main=t.detail:t.main=t.list},onInit:function(){}}),t.start()});
//# sourceMappingURL=demo-min.js.map?v=043d118