Nui.define('src/components/datagrid',['component'],function(e){var t=this,a=function(){var e,t,a=document.createElement('div');return a.style.cssText='position:absolute; top:-10000em; left:-10000em; width:100px; height:100px; overflow:hidden;',e=document.body.appendChild(a).clientWidth,a.style.overflowY='scroll',t=a.clientWidth,document.body.removeChild(a),e-t}();return t.extend(e,{static:{_init:function(){var e=this;Nui.doc.on('click',function(t){var a=$(t.target).closest('tr').hasClass('table-row');Nui.each(e.__instances,function(e){a||!0!==e.options.isActive||e.element.find('.datagrid-tbody .table-row.s-crt').removeClass('s-crt')})});var t=null;Nui.win.on('resize',function(){clearTimeout(t),t=setTimeout(function(){e._resize()},100)})},_resize:function(){Nui.each(this.__instances,function(e){'100%'===e.options.height&&(e._theadHeight(),e._resetHeight())})},_hasChildren:function(e){return Nui.isArray(e.children)&&e.children.length},_getRowNumber:function(e,t,a,i,l){var n=this;return a[t]||(a[t]=!0),void 0===i&&(i=0),Nui.each(e,function(e){e.cellid=i++;var o=e.order,r=e.className;!0===o&&(o='desc'),'asc'!==o&&'desc'!==o||(e.order={},e.order[o]=1),e.order&&!e.order.field&&(e.order.field=e.field),e.style||(e.style={}),e.align&&(e.style['text-align']=e.align),e.valign&&(e.style['vertical-align']=e.valign),r||(r=''),r&&(r=' '+Nui.trim(r)),e.className=r,$.isEmptyObject(e.style)&&delete e.style,l&&l.fixed&&(e.fixed=l.fixed),n._hasChildren(e)&&(i=n._getRowNumber(e.children,t+1,a,i,e))}),l?i:a.length},_colspan:function(e,t){var a=this;return void 0===t&&(t=0),Nui.each(e,function(e){a._hasChildren(e)?t+=a._colspan(e.children,t):t+=1}),t}},options:{container:null,data:null,columns:null,isFixed:!0,isLine:!1,isActive:!0,isBorder:!0,isPaging:!0,url:null,paging:null,fields:null,dataName:'list',width:'100%',height:'100%',footer:'',placeholder:'',onFocusin:null,onFocusout:null,onFocus:null,onBlur:null,stringify:null,onRowClick:null,onRowDblclick:null,onCheckboxChange:null,onRender:null},_template:{layout:'<div class="<% className %>"><div class="datagrid-body"><%include "table"%></div><%if footer || paging%><div class="datagrid-foot"><%if footer%><%footer%><%/if%><%if paging%><div class="datagrid-paging"></div><%/if%></div><%/if%></div>',table:'<%each rows v k%><%if v.length%><div class="datagrid-table<%if k === "left" || k === "right"%> datagrid-table-fixed<%/if%> datagrid-table-<%k%>"><%if !isFixed%><div class="datagrid-box"><table class="ui-table<%if !isBorder%> ui-table-nobd<%/if%>"><%include "thead"%><tbody class="table-tbody datagrid-tbody"></tbody></table></div><%else%><div class="datagrid-title"><div class="datagrid-thead"><table class="ui-table<%if !isBorder%> ui-table-nobd<%/if%>"><%include "thead"%></table></div></div><div class="datagrid-inner"><div class="datagrid-box"><table class="ui-table<%if !isBorder%> ui-table-nobd<%/if%>"><tbody class="table-tbody datagrid-tbody"></tbody></table></div></div><%/if%></div><%/if%><%/each%>',thead:'<thead class="table-thead"><%each v%><tr class="table-row"><%each $value val%><th class="table-cell<%val.className%>"<%include "attr"%>><span class="cell-text"><%if val.title%><%val.title%><%if typeof val.order === "object"%><%var asc = Nui.type(val.order.asc, ["String", "Number"]), desc = Nui.type(val.order.desc, ["String", "Number"])%><em class="datagrid-order<%if asc && desc%> datagrid-order-both<%/if%>" field="<%val.order.field%>"><%if asc%><b class="datagrid-order-asc" type="asc" value="<%val.order.asc%>"><i></i><s></s></b><%/if%><%if desc%><b class="datagrid-order-desc" value="<%val.order.desc%>"><i></i><s></s></b><%/if%></em><%/if%><%elseif val.content === "checkbox"%><span class="ui-checkradio"><input type="checkbox" name="datagrid-checkbox-all" class="datagrid-checkbox datagrid-checkbox-choose"></span><%/if%></span></th><%/each%></tr><%/each%></thead>',rows:'<%if data && data.length%><%var toLower = function(str){return str.replace(/([A-Z])/g, function(a){return "-"+a.toLowerCase()})}%><%each data%><tr class="table-row table-row-<%$index%>" row-index="<%$index%>"<%include "data"%>><%each cols val key%><%var _value%><%if val.field && (!val.content || "number checkbox input".indexOf(val.content)===-1)%><%var _value=$value[val.field]%><%elseif val.content === "number"%><%var _value=$index+1%><%elseif val.content === "checkbox"%><%var _value={"name":val.field ? val.field : "datagrid-checkbox", "class":"datagrid-checkbox"+(!val.title ? " datagrid-checkbox-choose" : ""), "value":$value[val.field]!==undefined?$value[val.field]:""}%><%elseif val.content === "input"%><%var _value={"name":val.field ? val.field : "datagrid-input", "class":"datagrid-input", "value":$value[val.field]!==undefined?$value[val.field]:""}%><%else%><%var _value=val.content%><%/if%><td class="table-cell<%val.className%>"<%include "attr"%>><span class="cell-text<%if val.nowrap === true%> cell-nowrap<%/if%><%if val.content === "checkbox"%> cell-text-checkbox<%/if%><%if val.content === "input"%> cell-text-input<%/if%>"><%if typeof val.filter === "function"%><%var _value = val.filter(_value, val.field, $value)%><%/if%><%if val.content === "checkbox" && typeof _value === "object"%><span class="ui-checkradio"><input type="checkbox"<%include "_attr"%>></span><%elseif val.content === "input" && typeof _value === "object"%><input type="text" autocomplete="off"<%include "_attr"%>><%else%><%_value%><%/if%></span></td><%/each%></tr><%/each%><%elseif type === "all"%><tr><td class="table-cell table-cell-void" colspan="<%cols.length%>"><span class="ui-void"><%placeholder??%></span></td></tr><%/if%>',head:'',foot:'',_attr:'<%if !_value["class"]%><%var _class = _value["class"] = ""%><%/if%><%if _value.className%><%var _class = (_value["class"]+=" "+Nui.trim(_value.className))%><%delete _value.className%><%/if%><%each _value _v _k%> <%_k%>="<%_v%>"<%/each%>',attr:'<%each val value name%><%if name === "style"%>style="<%each value _v _k%><%_k%>:<%_v%>;<%/each%>"<%elseif "width field colspan rowspan cellid".indexOf(name) !== -1%> <%name%>="<%value%>"<%/if%><%/each%>',data:'<%if fields%><%each $value value field%><%if fields === true || $.inArray(field, fields) !== -1%> data-<%toLower(field)%>=<%if typeof stringify === "function"%><%stringify(value)%><%else%>"<%value%>"<%/if%><%/if%><%/each%><%/if%>'},_init:function(){this._exec()},_exec:function(){var e=this,t=e.options,a=e.constructor,i=t.container;i&&Nui.isArray(t.columns)&&t.columns.length&&(e._container=a._jquery(i),e._columns={all:[],left:[],right:[]},Nui.each(t.columns,function(t,a){'left'===t.fixed||!0===t.fixed?e._columns.left.push(t):'right'===t.fixed&&e._columns.right.push(t),e._columns.all.push(t)}),e._create())},_create:function(){var e=this,t=e.options,a=e.constructor;e._rows={},e._cols={},e._rowNumber=a._getRowNumber(t.columns,0,[]),Nui.each(e._columns,function(t,a){e._setRowCol(t,a)}),e._hasLeftRight=this._cols.left.length||this._cols.right.length,e.element=e._bindComponentName($(e._tpl2html('layout',e._tplData({rows:e._rows,isFixed:!0===t.isFixed,isBorder:!0===t.isBorder,paging:t.paging&&'object'==typeof t.paging&&!1!==t.paging.isPage,footer:t.footer}))).appendTo(e._container)),e._body=e.element.children('.datagrid-body'),e._tableAll=e._body.children('.datagrid-table-all'),e._tableAllInner=e._tableAll.children('.datagrid-inner'),e._tableAllBox=e._tableAll.find('.datagrid-box'),e._tableAllTitle=e._tableAll.children('.datagrid-title'),e._tableAllThead=e._tableAll.find('.datagrid-thead'),e._tableLeft=e._body.children('.datagrid-table-left'),e._tableRight=e._body.children('.datagrid-table-right'),e._tableFixed=e._body.children('.datagrid-table-fixed'),e._tableFixedInner=e._tableFixed.children('.datagrid-inner'),e._tableFixedBox=e._tableFixed.find('.datagrid-box'),e._foot=e.element.children('.datagrid-foot'),e._tableTbody=e._body.find('.datagrid-tbody'),t.width&&(e._tableAllThead.children().css('width',t.width),e._tableAllBox.children().css('width',t.width)),e._theadHeight(),e._initList(),e._bindEvent()},_initList:function(){var e=this,t=e.options;if(t.paging){delete t.paging.wrap,t.paging.wrap=e._foot.children('.datagrid-paging'),t.paging.container=e._tableAllBox;var a='paging_'+e.__id,i=t.paging.echoData;t.paging.echoData=function(a,l){e.element&&(e.data=a[t.dataName]||[],e._render(),'function'==typeof i&&i.call(t.paging,a,l))},e.paging=window[a]=new Paging(t.paging),!0===t.isPaging&&e.paging.query(!0)}else t.data&&(e.data=t.data,e._render())},_bindEvent:function(){var e=this;e._on('scroll',e._tableAllInner.children(),function(){e._scroll($(this))}),e._event()},_render:function(){var e=this,t=e.options;Nui.each(e._cols,function(a,i){e.element.find('.datagrid-table-'+i+' .datagrid-tbody').html(e._tpl2html('rows',{type:i,isFixed:!0===t.isFixed,cols:a,fields:t.fields?!0===t.fields?t.fields:[].concat(t.fields):null,data:e.data,placeholder:t.placeholder,stringify:t.stringify}))}),e.element.find('.datagrid-checkbox:checkbox').checkradio(e._checkradio()),e._resetHeight(),'function'==typeof t.onRender&&t.onRender.call(t,e)},_checkradio:function(){var e=this,t=e.options,a=function(a,i){var l='datagrid-checkbox-choose';if(a.hasClass(l)){var n=a.prop('checked');if(a.closest('.datagrid-table').hasClass('datagrid-table-all')||e._tableAllBox.find('tr[row-index="'+a.closest('tr.table-row').attr('row-index')+'"]').find('.'+l).checkradio('checked',n),'datagrid-checkbox-all'===a.attr('name'))e._tableTbody.find('.'+l+':enabled').checkradio('checked',n);else{var n=e._tableTbody.find('.'+l+':checked').length===e._tableTbody.find('.'+l).length;e._body.find('.table-thead .'+l).checkradio('checked',n)}}'function'==typeof t.onCheckboxChange&&t.onCheckboxChange.call(t,i,e,a)},t={callback:a};return t},_resetHeight:function(){var e=this,t=e.options,i=e.constructor;if(e._rowHeight(),!0===t.isFixed){var l=e._container.innerHeight(),n=l-e._tableAllTitle.outerHeight()-i._getSize(e._tableAllTitle,'tb','margin')-e._foot.outerHeight()-i._getSize(e._foot,'tb','margin'),o=e._tableAllBox.scrollTop();e._tableAllBox.css('height','auto'),e._tableAllInner.height(n);var r=e._tableAllInner.innerHeight()>=e._tableAllBox.outerHeight()?0:a,c=n;e._tableAllBox.children().width()>e._tableAllInner.width()&&(c-=a),r?(e._tableAllBox.css('height',n),e._tableFixedBox.css('height',c)):(e._tableAllBox.css('height','auto'),e._tableFixedBox.css('height','auto')),e._tableAllBox.scrollTop(o),e._tableAllTitle.css({'margin-right':r}),e._tableRight.css('right',r)}},_theadHeight:function(){var e=this;e._hasLeftRight&&e._tableFixed.find('.table-thead .table-cell').each(function(t){var a=$(this),i=a.attr('cellid'),l=e._tableAll.find('.table-thead .table-cell[cellid="'+i+'"]'),n=l.height(),o=a.height(n).height()-n;a.height(n-o)})},_rowHeight:function(){var e=this;if(e._hasLeftRight){var t=e._tableLeft.find('.table-tbody .table-row'),a=e._tableLeft.find('.table-tbody .table-row');e._tableAll.find('.table-tbody .table-row').each(function(e){var i=$(this).outerHeight();t.eq(e).height(i),a.eq(e).height(i)})}},_setRowCol:function(e,t,a){var i=this,l=(i.options,i.constructor);void 0===a&&(a=0),i._rows[t]||(i._rows[t]=[]),i._cols[t]||(i._cols[t]=[]),e.length&&!i._rows[t][a]&&(i._rows[t][a]=[]),Nui.each(e,function(e){var n=l._hasChildren(e),o={};n&&(o.colspan=l._colspan(e.children),i._setRowCol(e.children,t,a+1)),Nui.each(e,function(e,t){'children'!==t&&'function'!=typeof e&&(o[t]=e)}),n||(o.rowspan=i._rowNumber-a,i._cols[t].push(e)),i._rows[t][a].push(o)})},_callback:function(){var e=this,t=e.options,a=arguments,i=a[0],l=t['on'+i];if('function'==typeof l)return l.apply(t,Array.prototype.slice.call(a,1))},_events:{'click .table-tbody .table-row':'_active _getRowData _rowclick','mouseover .table-tbody .table-row':function(e,t){this.element.find('.datagrid-tbody .table-row[row-index="'+t.attr('row-index')+'"]').addClass('s-hover')},'mouseout .table-tbody .table-row':function(e,t){this.element.find('.datagrid-tbody .table-row[row-index="'+t.attr('row-index')+'"]').removeClass('s-hover')},'dblclick .table-tbody .table-row':'_getRowData _rowdblclick','focus .datagrid-input':'_enable _getRowData _focus','blur .datagrid-input':'_enable _getRowData _blur','focusin .table-tbody .table-cell':'_focusin','focusout .table-tbody .table-cell':'_focusout','click .datagrid-order > b':'_order'},_order:function(e,t){t.toggleClass('s-crt'),t.siblings().removeClass('s-crt');var a=t.parent(),i=a.attr('field'),l=a.children('b.s-crt').attr('value');this.paging&&(this.paging.condition[i]=l,this.paging.query(!0))},_enable:function(e,t){return!t.hasClass('s-dis')&&!t.hasClass('s-disabled')},_active:function(e,t){var a=this;!0===a.options.isActive&&(a.element.find('.datagrid-tbody .table-row[row-index="'+t.attr('row-index')+'"]').addClass('s-crt').siblings().removeClass('s-crt'),Nui.each(a.__instances,function(e){e!==a&&!0===e.options.isActive&&e.element.find('.datagrid-tbody table-row.s-crt').removeClass('s-crt')}))},_getRowData:function(e,t){return t.hasClass('table-row')?t.data():t.closest('.table-row').data()},_focus:function(e,t,a){return this._callback('Focus',e,this,t,a)},_blur:function(e,t,a){return this._callback('Blur',e,this,t,a)},_focusin:function(e,t){return this._callback('Focusin',e,this,t)},_focusout:function(e,t){return this._callback('Focusout',e,this,t)},_rowclick:function(e,t,a){return this._callback('RowClick',e,this,t,a)},_rowdblclick:function(e,t,a){return this._callback('RowDblclick',e,this,t,a)},_scroll:function(e){var t=this,a=e.scrollTop(),i=e.scrollLeft();t._tableFixedBox.scrollTop(a),t._tableAllThead.scrollLeft(i)},resize:function(){this._theadHeight(),this._resetHeight()}})}),Nui.define('pages/components/datagrid/script/checkradio',function(require,imports,renders,extend){!function(e,t){e.fn.checkradio=function(t,a){if(!t||e.isPlainObject(t)){var i=e.extend({switches:{off:'',on:''},beforeCallback:e.noop,callback:e.noop},t||{});return this.each(function(){var t=e(this),a=t.closest('.ui-checkradio');if(a.length){var l=t.prop('checked')?' s-checked':'',n=t.prop('disabled')?' s-dis':'',o=t.attr('name'),r=e.extend({},i.switches,t.data()||{}),c=a.find('.text'),s='radio';t.is(':checkbox')&&(s='checkbox'),a.children().attr('checkname')?a.children().attr('class','ui-'+s+l+n):(r.off&&r.on&&(a.addClass('ui-switches'),c=e('<s class="text">'+(t.prop('checked')?r.on:r.off)+'</s>').insertBefore(t)),t.css({position:'absolute',top:'-999em',left:'-999em',opacity:0}).wrap('<i></i>'),a.wrapInner('<em class="ui-'+s+l+n+'" checkname="'+o+'"></em>').children().click(function(a){var l=e(this);if(!t.is(':disabled')&&!1!==i.beforeCallback(t,a)){if(t.is(':checkbox')){var n=t.prop('checked');t.prop('checked',!n),l[(n?'remove':'add')+'Class']('s-checked'),c.length&&c.text(n?r.off:r.on)}else{if(t.prop('checked'))return;t.prop('checked',!0),e('.ui-radio[checkname="'+o+'"]').removeClass('s-checked'),l.addClass('s-checked')}i.callback(t,a)}})),i.init&&!t.is(':disabled')&&!1!==i.beforeCallback(t)&&i.callback(t,'init')}})}return e(this).prop(t,1==a).checkradio()}}(jQuery)}),Nui.define('pages/components/datagrid/script/paging',function(require,imports,renders,extend){!function(e,t,a,i){function l(i){var n=this;n.load=!1,n.instance=function(){for(var t in e)if(e[t]==n)return t.toString()},a.extend(n,a.extend(!0,{url:'',wrap:null,paramJSON:'',pCount:10,current:1,aCount:0,last:!1,allData:!1,isFull:!0,container:e,scroll:{enable:!1},ajax:{},condition:{},loading:{wrap:null,show:function(){var e=this;e.hide();var t=e.wrap;t&&t.append('<i class="ui-loading" style="position:absolute;">正在加载数据...</i>').css({position:'relative'})},hide:function(){a('.ui-loading').remove()}},button:{prev:'«',next:'»',first:'',last:''},extPage:{wrap:null,desc:'',prev:'上一页',next:'下一页'},refreshCallback:null,endCallback:a.noop,jumpCallback:a.noop,echoData:a.noop},l.options,i||{})),n.container=a(n.container||e),!0===n.scroll.enable&&(n.wrap=null,n.children=n.container[0]===e?a(t.body):n.container.children(),n.container.scroll(function(){n.resize()}).resize(function(){n.resize()}))}var n=function(e){return e.dataType='json',a.ajax(e)};l.options={},l.config=function(e){a.extend(!0,l.options,e||{})},l.prototype={constructor:l,jump:function(e){var t,i=this,l=Math.ceil(i.aCount/i.pCount);if(i.showload=!0,i.aCount>0)if('object'==typeof e){var n=a(e).prevAll('input').val();t=n<=l&&n!=i.current?parseInt(n):i.current}else t=e>0&&e<=l?e:e<0?l+e+1:l;else t=e;if(i.current=i.condition.current=t,i.jumpCallback(t),'function'==typeof i.refreshCallback)return i.refreshCallback(t),void i.create();i.getData('jump')},query:function(e){var t=this;t.showload=!0,t.load=!1,'function'!=typeof t.refreshCallback||'refresh'!==e?(e?('noloading'===e?t.showload=!1:'reload'!==e&&(t.current=1),t.filter(),t.condition.current=t.current):t.condition={current:t.current=1},t.getData(e||'')):t.create()},filter:function(){var e=this;for(var t in e.condition)e.condition[t]||delete e.condition[t]},getData:function(t){var i=this;i.condition.pCount=i.pCount,!0===i.allData&&(delete i.condition.pCount,delete i.condition.current);var l=i.condition;if(i.paramJSON){l=[],a.each(i.condition,function(e,t){l.push(e+':'+t)});var o=l.length?'{'+l.join(',')+'}':'';l={},l[i.paramJSON]=o}var r='function'==typeof i.ajax?i.ajax():i.ajax;delete r.success,i.load||(i.load=!0,n(a.extend({},!0,{url:i.url,data:l,success:function(a){try{a.current=i.current}catch(e){}var l,n=0;if(i.container[0]===e||'reload'===t||'noloading'===t||'jump'===t&&('jump'!==t||i.scroll.enable)||(i.container.scrollTop(0),i.container.scrollLeft(0)),'reload'===t){var o=i.container;i.selector?(o=i.container.find(i.selector),n=o.scrollTop()):n=o.scrollTop(),l=o.find('tr.rows.s-crt').index()}if(i.echoData(a,t),i.aCount=a.aCount,i.load=!1,!0===i.scroll.enable&&i.resize(),n>0){var o=i.container;i.selector?(o=i.container.find(i.selector),o.scrollTop(n)):o.scrollTop(n),l>=0&&o.find('tr.rows').eq(l).addClass('s-crt')}if(!0===i.last)return i.last=!1,void i.jump(-1);i.create(),i.endCallback(a)},error:function(){i.showload&&i.loading.hide(),i.load=!1}},r||{})))},trim:function(e){var t=Math.abs(parseInt(a(e).val()));!t&&(t=1),a(e).val(t)},echoList:function(e,t,a){return this.current==t?'<li><span class="s-crt">'+t+'</span></li>':'<li><a href="javascript:'+a+'.jump('+t+');" target="_self">'+t+'</a></li>'},resize:function(){var e=this;try{var t=e.container.scrollTop(),a=e.container.height(),i=e.children.outerHeight();!e.load&&Math.ceil(e.aCount/e.pCount)>e.current&&(0===t&&i<=a||a+t>=i)&&e.jump(++e.current)}catch(e){}},create:function(){var e=this,t=e.button,a=Math.ceil(e.aCount/e.pCount),i=e.current,l='',n=a==i?1:i+1,o=e.instance(),r=e.extPage;if(r.wrap){var c='<div>';c+=i==a||0==a?'<span>'+r.next+'</span>':'<a href="javascript:'+o+'.jump('+(i+1)+');" target="_self">'+r.next+'</a>',c+=1==i?'<span>'+r.prev+'</span>':'<a href="javascript:'+o+'.jump('+(i-1)+');" target="_self">'+r.prev+'</a>',c+='</div><em>'+(0!==a?i:0)+'/'+a+'</em><strong>共'+e.aCount+r.desc+'</strong>',r.wrap.html(c)}if(e.wrap){if(!a)return void e.wrap.empty();if(l+=function(){var a='';return 1==i?(t.first&&(a+='<li><span>'+t.first+'</span></li>'),a+='<li><span>'+t.prev+'</span></li>'):(e.button.first&&(a+='<li><a href="javascript:'+o+'.jump(1);" target="_self">'+t.first+'</a></li>'),a+='<li><a href="javascript:'+o+'.jump('+(i-1)+');" target="_self">'+t.prev+'</a></li>'),a}(),a<=7)for(var s=1;s<=a;s++)l+=e.echoList(l,s,o);else if(i-3>1&&i+3<a){l+='<li><a href="javascript:'+o+'.jump(1);" target="_self">1</a></li>',l+='<li><em>...</em></li>';for(var s=i-2;s<=i+2;s++)l+=e.echoList(l,s,o);l+='<li><em>...</em></li>',l+='<li><a href="javascript:'+o+'.jump('+a+');" target="_self">'+a+'</a></li>'}else if(i-3<=1&&i+3<a){for(var s=1;s<=5;s++)l+=e.echoList(l,s,o);l+='<li><em>...</em></li>',l+='<li><a href="javascript:'+o+'.jump('+a+');" target="_self">'+a+'</a></li>'}else if(i-3>1&&i+3>=a){l+='<li><a href="javascript:'+o+'.jump(1);" target="_self">1</a></li>',l+='<li><em>...</em></li>';for(var s=a-5;s<=a;s++)l+=e.echoList(l,s,o)}l+=function(){var e='';return i==a?(e+='<li><span>'+t.next+'</span></li>',t.last&&(e+='<li><span>'+t.last+'</span></li>')):(e+='<li><a href="javascript:'+o+'.jump('+(i+1)+');" target="_self">'+t.next+'</a></li>',t.last&&(e+='<li><a href="javascript:'+o+'.jump('+a+');" target="_self">'+t.last+'</a></li>')),e}(),e.isFull&&(l+='<li><em>跳转到第</em><input type="text" onblur="'+o+'.trim(this);" value="'+n+'" /><em>页</em><button type="button" onclick="'+o+'.jump(this);">确定</button></li>'),l='<ul class="ui-paging">'+l+'</ul>',e.wrap.html(l)}}},a.extend({paging:function(t,a){void 0===a&&(a=t,t='paging');var i=e[t]=new l(a);return'function'!=typeof e[t].refreshCallback?(i.query(!0),i):(i.query('refresh'),i)}}),e.Paging=l}(window,document,jQuery)}),Nui.define('./script/demo',function(require,imports,renders,extend){var e=this,t=(e.require('pages/components/datagrid/script/paging'),e.require('pages/components/datagrid/script/checkradio'),require('src/components/datagrid')),a=t({container:'#data',isFixed:!1,isBorder:!1,width:'110%',paging:{url:'http://172.30.5.28/data/',pCount:4},footer:'11',columns:[{content:'checkbox',width:'40',align:'right',fixed:!0},{title:'ID',content:'checkbox',field:'id',width:'200',order:{desc:'1',asc:'2'},select:[{text:'',value:''}]},{title:'期初余额',field:'address',width:'400',children:[{title:'借方',width:'200',field:'buaddress',nowrap:!0,filter:function(e,t,a){return''}},{title:'借方',width:'200',order:'asc',field:'buaddress',nowrap:!0}]},{title:'姓名',order:'desc',field:'certificate',content:'input',width:200,filter:function(e){return e.className='111',e}},{title:'职业',field:'buname'},{title:'操作',content:'<a class="datagrid-button" on-click="alter">修改</a> <a class="datagrid-button" on-click="delete">删除</a>',width:150}],onRowClick:function(e,t,a,i){},onRowDblclick:function(e,t,a,i){},onRender:function(e){console.log(e)},onFocus:function(e,t,a,i){}});$('h1').click(function(){a.option('isBorder',!0)})});
//# sourceMappingURL=demo-min.js.map?v=61c0b98