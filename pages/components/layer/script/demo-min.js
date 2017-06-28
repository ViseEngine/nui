Nui.define('{cpns}/placeholder',['component'],function(t){return this.extend(t,{options:{text:'',animate:!1,equal:!1,color:'#ccc'},_template:{list:'<%each style%><%$index%>:<%$value%>;<%/each%>',wrap:'<strong class="<% className %>" style="<%include \'list\'%>" />',elem:'<b style="<%include \'list\'%>"><%text%></b>'},_init:function(){this._exec()},_exec:function(){var t=this,e=t._getTarget();if(e){var i=t.deftext=e.attr('placeholder');!t.deftext&&t.options.text&&e.attr('placeholder',i=t.options.text),t.text=Nui.trim(i),void 0===t.val&&(t.val=Nui.trim(e.val())),t.text&&t._create()}},_create:function(){var t=this,e=t.options,i=t.constructor;if(!e.animate&&(e.animate||'placeholder'in document.createElement('input')))t._setStyle();else{e.animate&&t.target.removeAttr('placeholder');var n=t._tplData();n.style={'position':'relative','display':'inline-block','width':t.target.outerWidth()+'px','overflow':'hidden','cursor':'text'},t.target.wrap(t._tpl2html('wrap',n)),t.element=$(t._tpl2html('elem',{text:t.text,style:function(){var n=t.target.outerHeight(),o=t.target.is('textarea');return{'display':Nui.trim(t.target.val())?'none':'inline','position':'absolute','left':i._getSize(t.target,'l','padding')+i._getSize(t.target,'l')+'px','top':i._getSize(t.target,'t','padding')+i._getSize(t.target,'t')+'px','height':o?'auto':n+'px','line-height':o?'normal':n+'px','color':e.color}}()})).insertAfter(t.target),t._events()}},_setStyle:function(){var t=this;t.options;t.className='_placeholder-'+t.__id,t.target.addClass(t.className),t.constructor.style||t._createStyle(),t._createRules()},_createStyle:function(){var t=this,e=document.createElement('style');document.head.appendChild(e),t.constructor.style=e.sheet},_createRules:function(){var t=this,e=t.constructor.style,i=t.__id;try{e.deleteRule(i)}catch(t){}Nui.each(['::-webkit-input-placeholder',':-ms-input-placeholder','::-moz-placeholder'],function(n){var o='.'+t.className+n,a='opacity:1; color:'+(t.options.color||'');try{'addRule'in e?e.addRule(o,a,i):'insertRule'in e&&e.insertRule(o+'{'+a+'}',i)}catch(t){}})},_events:function(){var t=this,e=t.options,i=t.constructor,n=i._getSize(t.target,'l','padding')+i._getSize(t.target,'l');t._on('click',t.element,function(){t.target.focus()}),t._on('focus',t.target,function(){e.animate&&t.element.stop(!0,!1).animate({left:n+10,opacity:'0.5'})}),t._on('blur change',t.target,function(e,i){t.value()}),t._on('keyup keydown',t.target,function(e,i){Nui.trim(i.val())?t.element.hide():t.element.show()})},_reset:function(){var t=this;t._off(),t.element&&(t.element.remove(),t.target.unwrap()),t.target.val(t.val).removeClass(t.className),t.deftext?t.target.attr('placeholder',t.deftext):t.target.removeAttr('placeholder')},value:function(t){var e=this.constructor,i=this.target,n=e._getSize(i,'l','padding')+e._getSize(i,'l'),o=Nui.trim(arguments.length?i.val(t).val():i.val());!this.options.equal&&o===this.text||!o?(i.val(''),this.element&&this.element.show(),this.options.animate&&this.element.stop(!0,!1).animate({left:n,opacity:'1'})):this.element&&this.element.hide()}})}),Nui.define('src/components/layer/layer',['component','util'],function(t,e){var i={_maskzIndex:1e4,_zIndex:1e4,_init:function(){var t=this;Nui.win.on('resize',function(){Nui.each(t.__instances,function(t){var e=t.options;(e.position||!0===e.isCenter)&&setTimeout(function(){t.resize()})})})},$fn:null,$ready:null,init:null},n={content:'',width:320,height:'auto',maxWidth:0,maxHeight:0,timer:0,edge:0,container:'body',title:'温馨提示',isMove:!1,isMask:!0,isInnerMove:!1,isClickMask:!1,isMoveMask:!1,isHide:!0,isCenter:!1,isFull:!1,isTop:!1,isTips:!1,isFixed:!0,scrollbar:!0,align:'center',bubble:{enable:!1,dir:'top'},iframe:{enable:!1,cache:!1,src:''},close:{enable:!0,text:'×'},confirm:{enable:!1,name:'normal',text:'确定',callback:function(){return!0}},cancel:{enable:!0,text:'取消'},position:null,under:null,button:null,onMove:null,onResize:null,onScroll:null};return this.extend(t,{static:i,options:n,_template:{layout:'<div class="<% className %>" style="<% include \'style\' %>"><div class="layer-box"><%if close%><% var btn = close %><% include "button" %><%/if%><%if bubble%><span class="layer-bubble layer-bubble-<%bubble%>"><b></b><i></i></span><%/if%><%if title%><div class="layer-head"><span class="layer-title"><%title%></span></div><%/if%><div class="layer-body"><div class="layer-main"><%content%></div></div><%if button && button.length%><div class="layer-foot" style="text-align:<%align%>"><%each button btn%><%include "button"%><%/each%></div><%/if%></div></div>',button:'<button class="ui-button<%if btn.name%><%each [].concat(btn.name) name%> ui-button-<%name%><%/each%><%/if%> layer-button-<%btn.id%>"><%btn.text || "按钮"%></button>',iframe:'<iframe<%each attr%> <%$index%>="<%$value%>"<%/each%>></iframe>',mask:'<div class="nui-layer-mask<%if skin%> nui-layer-mask-<%skin%><%/if%>" style="<%include \'style\'%>"><div class="layer-mask"></div></div>',movemask:'<div class="nui-layer-movemask<%if skin%> nui-layer-movemask-<%skin%><%/if%>" style="<%include \'style\'%>"></div>',style:'<%each style%><%$index%>: <%$value%>; <%/each%>'},data:{},_init:function(){this._zIndex=++this.constructor._zIndex,this._exec()},_exec:function(){var t=this,e=t.options,i=t.constructor;if(t._container=i._jquery(e.container),t._container.length){if(t._containerDOM=t._container.get(0),'BODY'!==t._containerDOM.tagName){t._window=t._container,t._isWindow=!1;var n=t._container.css('position');'absolute'!==n&&'relative'!==n&&t._container.css('position','relative')}else t._window=Nui.win,t._isWindow=!0;t._isFixed=e.isFixed&&!Nui.bsie6&&t._isWindow,t._create()}},_create:function(){var t=this,e=t.options,i=t._createButton(),n=!1;!0!==e.isTips&&(n='string'==typeof e.title);var o=t._tplData({content:t._getContent(),close:i.close,button:i.button,title:n?e.title||'温馨提示':null,bubble:!0===e.bubble.enable?e.bubble.dir:null,align:e.align||'center',style:{'z-index':t._zIndex,'position':'absolute','display':'block'}});t._isFixed&&(o.style.position='fixed'),t._setTop(),t.element=$(t._tpl2html('layout',o)).appendTo(t._container),t._box=t.element.children('.layer-box'),t._head=t._box.children('.layer-head'),t._body=t._box.children('.layer-body'),t._main=t._body.children('.layer-main'),t._foot=t._box.children('.layer-foot'),!0!==e.isTips&&(!0===e.iframe.enable&&(t._iframe=t._main.children('iframe'),t._iframeOnload()),!0===e.isMove&&n&&t._bindMove(),!0===e.isTop&&t._bindTop()),t._button.length&&t._buttonEvent(),!0===e.isFixed&&!0==!t._isFixed&&t._bindScroll(),t._show()},_getContent:function(){var t=this,e=t.options,i='';return!0!==e.isTips&&!0===e.iframe.enable?i=t._createIframe():'string'==typeof e.content?i=e.content:e.content instanceof jQuery&&(i=e.content.prop('outerHTML')),i},_createIframe:function(){var t=this,i=t.options,o='layer-iframe'+t.__id,a=i.iframe.src;return!1===n.iframe.cache&&(a=e.setParam('_',(new Date).getTime(),a)),t._tpl2html('iframe',{attr:{frameborder:'0',name:o,id:o,src:a,scroll:'hidden',style:'width:100%;'}})},_iframeOnload:function(){var t=this;t._iframe.load(function(){t._iframeDocument=t._iframe.contents(),t._resize()})},_createButton:function(){var t=this,e=t.options,i={},n={},o={};return t._button=[],!0!==e.isTips&&(Nui.each(['confirm','cancel'],function(t){var n=e[t];n&&!0===n.enable&&(i[t]={id:t,name:n.name,text:n.text,callback:n.callback})}),e.button&&e.button.length&&Nui.each(e.button,function(e){var n=e.id;o[n]||(o[n]=!0,i[n]&&(e.text||('cancel'===n?e.text='取消':'confirm'===n&&(e.text='确定')),delete i[n]),t._button['close'===n?'unshift':'push'](e))}),Nui.each(i,function(e){t._button.push(e)})),!o.close&&e.close&&!0===e.close.enable&&t._button.unshift({id:'close',name:e.close.name,text:e.close.text,callback:e.close.callback}),t._button[0]&&'close'===t._button[0].id?(n.close=t._button[0],n.button=t._button.slice(1)):n.button=t._button,n},_buttonEvent:function(){var t=this;Nui.each(t._button,function(e){t._on('click',t.element,'.layer-button-'+e.id,function(i,n){if(!n.hasClass('nui-button-disabled')){var o=e.id,a=e.callback,s='function'==typeof a?a.call(t,t._main,t.__id,n):null;('confirm'===o&&!0===s||'confirm'!==o&&!1!==s)&&t.destroy()}})})},_bindTop:function(){var t=this;t._on('click',t.element,function(){t._setzIndex()})},_bindMove:function(){var t,e,i,n,o=this,a=o.options,s=o.element,r=o.constructor,l=s,c=!1;o._on('mousedown',o._head,function(i,n){c=!0,o._setzIndex(),!0===a.isMoveMask&&(l=o._moveMask=$(o._tpl2html('movemask',{skin:a.skin,style:{'z-index':o._zIndex+1,'cursor':'move','position':o._isFixed?'fixed':'absolute'}})).appendTo(o._container),l.css({width:o.data.outerWidth-r._getSize(l,'lr','all'),height:o.data.outerHeight-r._getSize(l,'tb','all'),top:o.data.top,left:o.data.left})),n.css('cursor','move'),t=i.pageX-o.data.left,e=i.pageY-o.data.top,i.stopPropagation()}),o._on('mousemove',Nui.doc,function(s){var r=o._container.outerWidth(),u=o._container.outerHeight();if(c)return i=s.pageX-t,n=s.pageY-e,i<0&&(i=0),n<0&&(n=0),!0===a.isInnerMove&&(i+o.data.outerWidth>r&&(i=r-o.data.outerWidth),n+o.data.outerHeight>u&&(n=u-o.data.outerHeight)),o.data.top=n,o.data.left=i,l.css({top:n,left:i}),!c}),o._on('mouseup',Nui.doc,function(t){c&&(c=!1,o._head.css('cursor','default'),!0===a.isMoveMask&&(s.css(o.data),o._moveMask.remove(),o._moveMask=null),'function'==typeof a.onMove&&a.onMove.call(o,o._main,o.__id),o.data.offsetTop=o.data.top-o._window.scrollTop(),o.data.offsetLeft=o.data.left-o._window.scrollLeft())})},_bindScroll:function(){var t=this,e=t.options;t._on('scroll',t._window,function(){var i=t.data.offsetTop+t._window.scrollTop(),n=t.data.offsetLeft+t._window.scrollLeft();t.data.top=i,t.data.left=n,t.element.css(t.data),'function'==typeof e.onScroll&&e.onScroll.call(t,t._main,t.__id)})},_setzIndex:function(){var t=this,e=t.constructor;t._isTop&&t.element&&(t._isTop=!1,t._zIndex=++e._zIndex,t.element.css('zIndex',t._zIndex),t._setTop())},_setLower:function(t){var e=this,i=e.constructor,n=e.options,o=[];n.under&&(o=o.concat(n.under),o.length&&Nui.each(o,function(e,n){e&&e.element&&(console.log(11),e.element.css('z-index',t?e._zIndex:i._maskzIndex-1))}))},_setTop:function(){var t=this,e=t.constructor;Nui.each(e.__instances,function(e){e&&e!==t&&!0===e.options.isTop&&(e._isTop=!0)})},_position:function(){var t,e=this,i=e.data,n=e.options.position,o={top:n.top,left:n.left,right:n.right,bottom:n.bottom};return void 0!==o.top&&void 0!==o.bottom&&delete o.bottom,void 0!==o.left&&void 0!==o.right&&delete o.right,Nui.each(o,function(e,n){if(void 0===e)return delete o[n],!0;t=e,'string'==typeof e&&(e?'top'===n||'bottom'===n?'self'===e?t=i.outerHeight:/[\+\-\*\/]/.test(e)&&(t=new Function('var self = '+i.outerHeight+'; return '+e)()):'self'===e?t=i.outerWidth:/[\+\-\*\/]/.test(e)&&(t=new Function('var self = '+i.outerWidth+'; return '+e)()):t=0),o[n]='auto'===t?'auto':parseFloat(t)+'px'}),o},_resize:function(t){var e=this,i=(e.constructor,e.options),n=e.element,o=e._window.outerWidth(),a=e._window.outerHeight(),s=0,r=0;if(e._isFixed||(r=e._window.scrollLeft(),s=e._window.scrollTop()),e._setSize(),i.position){var l=n.css(e._position()).position();Nui.bsie6&&(r=0,s=0),e.data.left=l.left+r,e.data.top=l.top+s}else if('init'===t||!0===i.isCenter){var c=(o-e.data.outerWidth)/2+r,u=(a-e.data.outerHeight)/2+s,d=i.edge>0?i.edge:0;e.data.left=c>0?c:d,e.data.top=u>0?u:d}e.data.offsetTop=e.data.top-e._window.scrollTop(),e.data.offsetLeft=e.data.left-e._window.scrollLeft(),n.css(e.data)},_setSize:function(){var t=this,e=t.constructor,i=t.options,n=t.element,o=i.edge>0?2*i.edge:0,a=t._window.outerWidth()-o,s=t._window.outerHeight()-o;t._body.css({height:'auto',overflow:'visible'}),n.css({top:'auto',left:'auto',width:'auto',height:'auto'});var r=e._getSize(t._box,'tb','all')+t._head.outerHeight()+e._getSize(t._head,'tb','margin')+e._getSize(t._body,'tb','all')+t._foot.outerHeight()+e._getSize(t._foot,'tb','margin'),l=n.outerWidth();!0!==i.isFull?(i.width>0&&(l=i.width),i.maxWidth>0&&l>=i.maxWidth&&(l=i.maxWidth),!0===i.scrollbar&&l>a&&(l=a)):l=a;var c='nowrap';(i.width>0||l==i.maxWidth||l==a)&&(c='normal'),t.data.width=l-e._getSize(n,'lr','all'),t._main.css('white-space',c),n.width(t.data.width);var u=n.outerHeight();t._iframeDocument&&(t._iframeDocument[0].layer=t,u=r+t._iframeDocument.find('body').outerHeight()),!0!==i.isFull?(u=i.height>0?i.height:u,i.maxHeight>0&&u>=i.maxHeight&&(u=i.maxHeight),(!0===i.scrollbar||t._iframeDocument)&&u>s&&(u=s)):u=s,t.data.outerWidth=l,t.data.outerHeight=u,t.data.height=u-e._getSize(n,'tb','all'),n.height(t.data.height);var d=t.data.height-r;t._main.outerHeight()>d&&!t._iframe&&!0===i.scrollbar&&t._body.css('overflow','auto'),t._iframe&&t._iframe.height(d),t._body.height(d)},_showMask:function(){var t=this,e=t.constructor,i=t.options;t._containerDOM.__layermask__||(t._containerDOM.__layermask__=$(t._tpl2html('mask',{skin:i.skin,style:{'z-index':e._maskzIndex,'position':t._isFixed?'fixed':'absolute','top':'0px','left':'0px','width':'100%','height':t._isFixed?'100%':t._container.outerHeight()+'px'}})).appendTo(t._container)),!0===i.isClickMask&&t._on('click',t._containerDOM.__layermask__,function(){t.hide()})},_show:function(){var e=this,i=e.options;return t('init',e._main),e._resize('init'),e._setLower(),!0===i.isMask&&e._showMask(),i.timer>0&&(e._timer=setTimeout(function(){e.hide()},i.timer)),'function'==typeof i.onInit&&i.onInit.call(this,e._main,e.__id),e},_reset:function(){var e=this,i=e.constructor,n=!0;t.exports._reset.call(this),t('destroy',e._main),Nui.each(i.__instances,function(t){if(t&&!0===t.options.isMask&&t!==e&&t._containerDOM===e._containerDOM)return n=!1}),n&&e._containerDOM.__layermask__&&(e._containerDOM.__layermask__.remove(),e._containerDOM.__layermask__=null),e.options.timer>0&&clearTimeout(e._timer)},resize:function(){var t=this,e=t.options;t.element;return t._resize(),'function'==typeof e.onResize&&e.onResize.call(this,t._main,t.__id),t},hide:function(){!0===this.options.isHide&&this.destroy()},destroy:function(){var t=this,e=t.constructor,i=t.options;t._delete(),t._reset(),t._setLower(!0),e._zIndex--,'function'==typeof i.onDestroy&&i.onDestroy.call(this,t._main,t.__id)}})}),Nui.define('{cpns}/layer/layerExt',['src/components/layer/layer'],function(layer){return layer.alert=function(t,e,i,n){var o;return'object'==typeof t&&(o=t,t=o.content,delete o.content),layer($.extend({content:'<div style="padding:10px; line-height:20px;">'+(t||'')+'</div>',width:i,height:n,cancel:{text:'关闭'}},o||{}))},layer.confirm=function(t,e,i,n,o){var a;return'object'==typeof t&&(a=t,t=a.content,delete a.content),layer($.extend(!0,{content:'<div style="padding:10px; line-height:20px;">'+(t||'')+'</div>',width:n,height:o,align:'right',confirm:{callback:e||function(){return!0}}},a||{},{confirm:{enable:!0}}))},layer.iframe=function(t,e,i,n){return layer({iframe:{enable:!0,src:t},width:i,height:n,cancel:{text:'关闭'}})},layer.tips=function(t,e,i,n,o){var a;return'object'==typeof t&&(a=t,t=a.content,delete a.content),layer($.extend(!0,{content:t,id:'tips',width:n||'auto',height:o||'auto',position:i,bubble:{enable:!0,dir:e||'top'}},a||{},{isTips:!0,isMask:!1,isClose:!1,close:{enable:!1}}))},layer.loading=function(t,e,i){var n;return'object'==typeof t&&(n=t,t=n.content,delete n.content),Nui.type(t,'Number')&&(i=e,e=t,t=''),layer($.extend({content:'<div style="padding:10px;">'+(t||'正在加载数据...')+'</div>',width:e||'auto',height:i||'auto'},n||{},{id:'loading',isTips:!0,close:{enable:!1}}))},layer.message=function(t,e){var i,n='#f00';return'object'==typeof t&&(i=t,e=i.content,delete i.content,t='success'),'success'!==t&&'error'!==t&&(e=t,t='success'),'success'!==t||e?'error'!==t||e||(e='操作失败'):e='操作成功','success'===t&&(n='#39B54A'),layer($.extend({content:'<div style="padding:10px; color:'+n+';">'+e+'</div>',id:'message',width:'auto',height:'auto',isTips:!0,timer:1500,close:{enable:!0}},i||{},{isMask:!1}))},layer.form=function(options){var onInit=options.onInit;delete options.onInit;var validator,valid=options.valid,btns=$.extend([],options.button||[{id:'cancel',text:'关闭'},{id:'confirm',name:'normal',text:'保存'}]);Nui.each(btns,function(t,e){if('confirm'===t.id&&!t.callback)return btns[e].callback=function(t){t.find('form').submit()},!1}),delete options.button;var formLayer=layer($.extend(!0,{button:btns},{scrollbar:!1,id:'form',onInit:function(main,id){var that=this,elems=main.find('[name!=""][data-rule]'),form=main.find('form'),rules={},messages={},setting=form.data('setting');elems.each(function(){var elem=$(this),name=elem.attr('name'),data=elem.data(),rule=eval('('+data.rule+')'),message=eval('('+data.message+')');rules[name]=rule,$.each(message,function(t,e){'function'==typeof options.messageFilter&&(message[t]=options.messageFilter(name,e)||'')}),messages[name]=message});var opts={rules:rules,messages:messages,errorClass:'s-err',onkeyup:!1,focusInvalid:!1,focusCleanup:!0,ignore:'',success:function(t,e){t.remove(),$(e).addClass('s-succ')},errorPlacement:function(t,e){e.removeClass('s-succ'),t.text()&&e.closest(options.itemWrap||'.ui-item').find(options.errorWrap||'.ui-err').html(t)},submitHandler:function(){var t={};if(options.ajax&&'function'==typeof options.ajax.getData)t=options.ajax.getData(form);else{var e=form.serializeArray();$.each(e,function(e,i){t[i.name]||(t[i.name]=[]),t[i.name].push(i.value)});for(var i in t)t[i]=t[i].join(',')}var n=layer.loading({content:options.loading||'正在保存数据...',under:that});'function'==typeof options.onBeforeSubmit&&(t=options.onBeforeSubmit.call(that,main,id,t)||t),$.ajax($.extend({url:form.attr('action'),dataType:'json',type:form.attr('method')||'POST',data:t,success:function(t,e){n.hide(),'function'==typeof options.onSuccess&&options.onSuccess.call(that,main,id,t,e)},error:function(t){n.hide(),'function'==typeof options.onError&&options.onError.call(that,main,id,t)}},options.ajax||{}),null)}};validator=form.validate($.extend(!0,opts,setting||{},valid||{})),'function'==typeof onInit&&onInit.call(that,main,id,validator)}},options||{}));return formLayer.validator=validator,formLayer},layer}),Nui.define('./script/demo',function(require,imports,renders,extend){var t=require('{cpns}/layer/layerExt'),e=(require('{cpns}/placeholder'),t({content:'<input type="text" data-placeholder-options="{animate:true}" placeholder="默认文本"><a>aaa</a>',width:300,maxWidth:400,id:'aaa',skin:'aaa',title:'',close:{},cancel:{},isCenter:!0,isMask:!1,isClickMask:!0,isTop:!0,isMove:!0,isInnerMove:!0,isHide:!1,timer:1e3,button:[{id:'aaaaa',text:'111'}],position:{bottom:'self*-1+30',right:0},scrollbar:!0,onInit:function(t){t.on('click','a',function(){t.append('<p>aaaa</p><p>aaaa</p><p>aaaa</p><p>aaaa</p><p>aaaa</p><p>aaaa</p><p>aaaa</p>'),e.resize()})}}));t.message(''),$('#btn').click(function(){e.element.animate({top:e.data.top-e.data.outerHeight+30})}),$('#reset').click(function(){t('reset')})});
//# sourceMappingURL=demo-min.js.map?v=d4e8ec7