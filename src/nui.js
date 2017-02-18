/**
 * @filename nui.js
 * @author Aniu[2016-11-10 22:39]
 * @update Aniu[2016-11-10 22:39]
 * @version 1.0.1
 * @description NUI框架核心
 */

;!(function(window, document, undefined){
    if(window.Nui){
        return
    }

    var Nui = window.Nui = {
        version:'1.0.1',
        // Nui.type('nui', 'String') => true
        // Nui.type(['nui'], ['Object', 'Array']) => true
        type:function(obj, type){
            if(obj === null || obj === undefined){
                return false
            }
            if(type === 'PlainObject'){
                return isPlainObject(obj)
            }
            if(isType('Array')(type)){
                var ret = false;
                Nui.each(type, function(v){
                    if(isType(v)(obj)){
                        ret = true;
                        return false
                    }
                })
                return ret
            }
            return isType(type)(obj)
        },
        each:function(obj, callback){
            var i;
            if(Nui.type(obj, 'Array')){
                var len = obj.length;
                for(i=0; i<len; i++){
                    if(callback(obj[i], i) === false){
                        break;
                    }
                }
            }
            else{
                for(i in obj){
                    if(callback(obj[i], i) === false){
                        break;
                    }
                }
            }
        },
        trim:function(str){
            return (str || '').replace(/^\s+|\s+$/g, '')
        },
        // Nui.unique(['1', '2', '1']) => ['1', '2']
        unique:function(arr){
            var newarr = [];
            var temp = {};
            Nui.each(arr, function(val){
                if(!temp[val]){
                    temp[val] = true
                    newarr.push(val)
                }
            })
            return newarr
        },
        extend:function(){
            var src, copyIsArray, copy, name, options, clone,
        		target = arguments[0] || {},
        		i = 1,
        		length = arguments.length,
        		deep = false;
        	if(typeof target === 'boolean'){
        		deep = target;
        		target = arguments[1] || {};
        		i = 2;
        	}
        	if(typeof target !== 'object' && !Nui.type(target, 'Function')){
        		target = {};
        	}
        	if(length === i){
        		target = this;
        		--i;
        	}
        	for( ; i < length; i++){
        		if((options = arguments[i]) != null){
        			for(name in options){
        				src = target[name];
        				copy = options[name];
        				if(target === copy){
        					continue;
        				}
        				if(deep && copy && (Nui.type(copy, 'PlainObject') || (copyIsArray = Nui.type(copy, 'Array')))){
        					if(copyIsArray){
        						copyIsArray = false;
        						clone = src && Nui.type(src, 'Array') ? src : [];
        					}
                            else{
        						clone = src && Nui.type(src, 'PlainObject') ? src : {};
        					}
        					target[name] = Nui.extend(deep, clone, copy);
        				}
                        else if(copy !== undefined){
        					target[name] = copy;
        				}
        			}
        		}
        	}
        	return target;
        },
        //jquery1.9之后就移除了该方法，以插件形式存在
        browser:(function(){
            var ua = navigator.userAgent.toLowerCase();
            var match = /(edge)[ \/]([\w.]+)/.exec(ua) ||
                        /(chrome)[ \/]([\w.]+)/.exec(ua) ||
                        /(webkit)[ \/]([\w.]+)/.exec(ua) ||
                        /(opera)(?:.*version|)[ \/]([\w.]+)/.exec(ua) ||
                        /(msie) ([\w.]+)/.exec(ua) ||
                        ua.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec(ua) || [];
            var browser = match[1] || '';
            var version = match[2] || '0';
            var ret = {}

            //IE11会伪装成firefox
            if(browser === 'mozilla' && /trident/.test(ua)){
                browser = 'msie';
                version = '11.0'
            }
            if(browser){
                ret[browser] = true;
                ret.version = version
            }
            if(ret.chrome || ret.edge){
                ret.webkit = true
            }
            else if(ret.webkit){
                ret.safari = true
            }
            return ret
        })()
    }

    if(typeof jQuery !== 'undefined'){
        Nui.win = jQuery(window);
        Nui.doc = jQuery(document);
    }

    var isType = function(type){
        return function(obj){
            return {}.toString.call(obj) === '[object ' + type + ']'
        }
    }

    var core_hasOwn = Object.prototype.hasOwnProperty;

    var isPlainObject = function(obj){
        if(!obj || !Nui.type(obj, 'Object') || obj.nodeType || obj == obj.window){
			return false;
		}
		try{
			if(obj.constructor && !core_hasOwn.call(obj, 'constructor') && !core_hasOwn.call(obj.constructor.prototype, 'isPrototypeOf')){
				return false;
			}
		}
        catch(e){
			return false;
		}
		var key;
		for(key in obj){}
		return key === undefined || core_hasOwn.call(obj, key);
    }

    var isEmptyObject = function(obj){
		var name;
		for(name in obj){
			return false;
		}
		return true;
	}

    var noop = function(){}

    //防止不支持该对象的浏览器报错
    if(typeof console === 'undefined'){
        window.console = {
            log:noop,
            debug:noop,
            error:noop,
            info:noop
        }
    }

    //修复 IE7-hover以及fixed时背景图片闪烁
    if(Nui.browser.msie && Nui.browser.version <= 7){
        document.execCommand('BackgroundImageCache', false, true);
    }

    //获取当前页面的uri
    var getPath = function(){
        var url = (location.protocol+'//'+location.host+location.pathname).replace(/\\/g, '/');
        var index =  url.lastIndexOf('/');
        return url.substr(0, index+1);
    }

    var dirname = getPath();

    var getModuleid = function(){
        return '_module_'+mid++
    }

    var head = document.head || document.getElementsByTagName('head')[0] || document.documentElement;

    var support = 'onload' in document.createElement('script');

    var mid = 0;

    var moduleData;

    var cacheModules = {};

    var cacheStyles = {};

    var roots = [];

    var config = {
        paths:{},
        alias:{}
    }

    //讲道理说，文件在被加载完毕后会立即执行define方法，在onload(onreadystatechange IE9-)事件中得到moduleData，这个过程是同步的
    //但是在IE9-中，高概率出现不同步情况，就是在onreadystatechange事件中得到moduleData值不是当前文件数据，原因在于执行onload时，其它模块刚好被加载，被重新赋值了
    //IE9-中文件被加载会有5个状态 uninitialized > loading > loaded > interactive > complete
    //脚本被执行时可以通过dom节点获取到node.readyState值为interactive，而该节点一定是当前加载的脚本节点
    //小概率出现节点被添加到dom后会立即执行define，可能是由于IE的缓存原因，利用它可以降低性能的消耗
    var currentlyAddingScript;
    if(Nui.browser.msie && Nui.browser.version <= 9){
        var interactiveScript;
        var getCurrentScript = function(){
            if(currentlyAddingScript){
                return currentlyAddingScript
            }
            if(interactiveScript && interactiveScript.readyState === 'interactive'){
                return interactiveScript
            }
            Nui.each(head.getElementsByTagName('script'), function(script){
                if(script.readyState === 'interactive'){
                    interactiveScript = script
                    return false
                }
            })
            return interactiveScript
        }
    }

    var Module = function(name, id, suffix, deps){
        var mod = this;
        //define实参中依赖模块名
        mod.deps = deps||[];
        //所有依赖模块名
        mod.alldeps = mod.deps;
        //所有依赖模块
        mod.depmodules = {};
        //模块名
        mod.name = name;
        //模块唯一id
        mod.id = id;
        //模块url参数
        mod.parameter = '';
        //文件后缀 -debug和-min
        mod.suffix = suffix;
        //所在目录
        mod.uri = mod.id.substr(0, mod.id.lastIndexOf('/')+1);
    }

    Module.prototype.load = function(){
        var mod = this;
        if(!mod.loaded && !/_module_\d+$/.test(mod.id)){
            var node = document.createElement('script');
            mod.url = mod.id+mod.suffix+'.js'+mod.parameter;
            node.src = mod.url;
            node.id = mod.id;
            currentlyAddingScript = node;
            head.appendChild(node);
            currentlyAddingScript = null;
            if(support){
                node.onload = node.onerror = mod.onload(node)
            }
            else{
                node.onreadystatechange = function(){
                    if(/loaded|complete/.test(node.readyState)){
                        mod.onload(node)()
                    }
                }
            }
            return mod.resolve()
        }
        else{
            return mod.onload()
        }
    }

    Module.prototype.resolve = function(){
        var mod = this;
        if(isEmptyObject(mod.depmodules)){
            Nui.each(mod.alldeps, function(val){
                var module = Module.getModule(val, [], mod.uri);
                module.parameter = mod.parameter;
                mod.depmodules[val] = module.loaded ? module : module.load()
            })
        }
        return mod
    }

    Module.prototype.getModules = function(data){
        var mod = this;
        if(!data){
            data = {
                cache:{},
                modules:[]
            }
        }
        if(!data.cache[mod.id]){
            data.cache[mod.id] = true;
            data.modules.unshift(mod.id);
        }
        if(mod.alldeps.length){
            Nui.each(mod.depmodules, function(val){
                data = val.getModules(data)
            })
        }
        return data
    }

    Module.prototype.onload = function(node){
        var mod = this;
        if(node){
            return (function(){
                moduleData = node.moduleData || moduleData;
                node.onload = node.onerror = node.onreadystatechange = null;
                head.removeChild(node);
                node = null;
                mod.loaded = true;
                if(moduleData){
                    Nui.each(moduleData, function(val, key){
                        val && (mod[key] = val)
                    })
                    moduleData = null;
                    return mod.resolve().call()
                }
            })
        }
        else{
            mod.loaded = true;
            return mod.resolve().call()
        }
    }

    Module.prototype.call = function(){
        var mod = this;
        if(mod.alload()){
            Nui.each(roots, function(root){
                if(root.callback){
                    root.callback()
                }
            })
        }
        return mod
    }

    //判断所有依赖是否加载完毕
    Module.prototype.alload = function(){
        var mod = this;
        var modules = [];
        Nui.each(roots, function(root){
            modules = modules.concat(root.getModules().modules)
        })
        modules = Nui.unique(modules)
        var module;
        while(module = modules.shift()){
            if(!cacheModules[module].loaded){
                return false
            }
        }
        return true
    }

    Module.prototype.setFactory = function(){
        var mod = this;
        var factory = mod.factory;

        factory.require = function(id, options){
            return Module.require(mod.depmodules[id], options)
        }

        factory.exports = function(module, members, adds){
            var exports;

            if(!module){
                return
            }

            if(typeof module === 'string'){
                var _mod = factory.require(module);
                if(_mod === undefined){
                    return module
                }
                module = _mod
            }

            if(Nui.type(module, 'Array')){
                exports = Nui.extend(true, [], module)
                if(adds === true){
                    if(!Nui.type(members, 'Array')){
                        exports.push(members)
                    }
                    else{
                        exports = exports.concat(members)
                    }
                }
            }
            else if(Nui.type(module, 'Function')){
                if(module.exports){
                    exports = Nui.extend(true, {}, module.exports, members)
                }
                else{
                    exports = Nui.extend(true, noop, module, members)
                }
            }
            else if(Nui.type(module, 'Object')){
                exports = Nui.extend(true, {}, module, members)
            }
            else{
                exports = module
            }

            if(Nui.type(adds, 'Array') && Nui.type(exports, ['Object', 'Function'])){
                Nui.each(adds, function(val){
                    if(val.method && val.content){
                        var arr = val.method.split('->');
                        var lastkey = arr[arr.length-1];
                        var object, key;
                        while(key = arr.shift()){
                            object = object || exports;
                            if(key === lastkey){
                                break;
                            }
                            object = object[key]
                        }
                        var func = object[lastkey];
                        if(Nui.type(func, 'Function')){
                            var code = func.toString().replace(/(\})$/, ';'+val.content+'$1');
                            func = new Function('return '+code);
                            object[lastkey] = func();
                        }
                    }
                })
            }

            return exports
        }

        factory.importcss = noop;

        return factory
    }

    Module.prototype.exec = function(){
        var mod = this;
        if(!mod.module && Nui.type(mod.factory, 'Function')){
            var factory = mod.setFactory();
            var modules = [];
            Nui.each(mod.deps, function(val){
                if(val !== 'component'){
                    modules.push(factory.require(val))
                }
            })
            var exports = factory.apply(factory, modules);
            if(Nui.type(exports, 'Object') && Nui.type(exports._init, 'Function')){
                var obj = {
                    attr:{},
                    proto:{}
                }
                Nui.each(exports, function(val, key){
                    if(key === 'static'){
                        obj[key] = val
                    }
                    if(Nui.type(val, 'Function')){
                        obj.proto[key] = val
                    }
                    else{
                        obj.attr[key] = val
                    }
                })
                var module = mod.module = Module.createClass(mod, obj);
                mod.module.exports = exports;
                if(mod.name !== 'component'){
                    var name = mod.name;
                    var index = name.lastIndexOf('/');
                    name = name.substr(index+1).replace(/\{[^\{\}]+\}/g, '');
                    Nui.each(['$', '$fn', '$ready'], function(v){
                        if(Nui.type(module[v], 'Function')){
                            module[v](name, module)
                        }
                    })
                }
            }
            else{
                mod.module = exports;
            }
        }
        return mod
    }

    Module.prototype.loadcss = function(){
        var mod = this;
        if(mod.styles && mod.styles.length){
            Nui.each(mod.styles, function(val){
                var path = Module.setId(val, false, mod.uri);
                if(!cacheStyles[path]){
                    cacheStyles[path] = true;
                    path = path+'.css'+mod.parameter;
                    var node = document.createElement('link');
                    node.rel = 'stylesheet';
                    node.href = path;
                    head.appendChild(node);
                }
            })
        }
        return mod;
    }

    Module.replacePath = function(path){
        // a///b///c => a/b/c
        path = path.replace(/([^:])\/{2,}/g, '$1/');

        // a/b...../c => a/b../c
        path = path.replace(/\.{2,}/g, '..');

        // a/b../c => a/c
        // a/../c => c
        var replace = function(str){
            if(/([\w]+\/?)(\.\.\/)/g.test(str)){
                str = str.replace(/([\w]+\/?)(\.\.\/)/g, function(a, b, c){
                    if(a == b+c){
                        return ''
                    }
                    return a
                })
                return replace(str)
            }
            return str
        }
        path = replace(path);

        // a/b./c => a/b/c
        // a/./c => a/c
        return path.replace(/([\w]+)\/?(\.\/)+/g, '$1/')
    }

    Module.createClass = function(mod, object){
        var module;
        if(mod.name !== 'component'){
            module = Module.getModule('component').module;
        }
        else{
            module = Object
        }
        var Class = function(options){
            var that = this;
            if(mod.name !== 'component'){
                Nui.extend(that, object.attr, {
                    index:Class.index++,
                    eventArray:[]
                });
                that.options = Nui.extend(true, {}, that.options, Class.options, options||{})
                that.optionsCache = Nui.extend({}, that.options);
                Class.box[that.index] = that;
                delete that.static;
                that._init()
            }
        }
        Nui.extend(true, Class, module, object.static);
        Nui.extend(true, Class.prototype, module.prototype, object.proto);
        Class.prototype.constructor = Class.prototype._self = Class;
        return Class
    }

    Module.require = function(mod, options){
        if(mod){
            var module = mod.module;
            if(Nui.type(options, 'Object')){
                return new module(factory)
            }
            else if(Nui.type(options, 'String')){
                return module[factory]
            }
            //因为对象和数组是引用的，使用时需拷贝
            if(Nui.type(module, 'Object')){
                return Nui.extend({}, module)
            }
            else if(Nui.type(module, 'Array')){
                return Nui.extend([], module)
            }
            return module
        }
    }

    Module.setPath = function(id){
        var pathMatch = /\{([^\{\}]+)\}/.exec(id);
        if(pathMatch){
            var path = config.paths[pathMatch[1]];
            if(path){
                id = id.replace(pathMatch[0], path).replace(/(\.(js|css))?(\?[\s\S]*)?$/g, '');
            }
        }
        return id
    }

    Module.setId = function(id, retname, uri){
        // xxx.js?v=1.1.1 => xxx
        // xxx.css?v=1.1.1 => xxx
        var name = id.replace(/(\.(js|css))?(\?[\s\S]*)?$/g, '');
        var match = name.match(/(-debug|-min)$/g);
        var suffix = '';
        if(match){
            name = name.replace(/(-debug|-min)$/g, '');
            suffix = match[0]
        }
        var urid;
        id = Module.setPath(config.alias[name] || name);
        if(!/^(http|https|file):\/\//.test(id)){
            urid = Module.replacePath(dirname + id);
            id = (uri||dirname) + id;
        }
        id = Module.replacePath(id);
        if(retname){
            return [id, name, urid, suffix]
        }
        return id
    }

    Module.getModule = function(name, deps, uri){
        var arr = Module.setId(name, true, uri);
        var id = arr[0];
        var name = arr[1];
        var urid = arr[2];
        var suffix = arr[3];
        arr = null;
        return cacheModules[name] || cacheModules[id] || cacheModules[urid] || (cacheModules[id] = new Module(name, id, suffix, deps))
    }

    Module.load = function(id, callback, _module_){
        if(Nui.type(id, 'String') && Nui.trim(id)){
            //截取入口文件参数，依赖的文件加载时都会带上该参数
            var match = id.match(/(\?[\s\S]+)$/);
            var mod = cacheModules[Module.setId(id)] || Module.getModule(_module_, [id]);
            if(match){
                mod.parameter = match[0]
            }
            roots.push(mod);
            mod.callback = function(){
                var modules = mod.getModules().modules;
                var _module = mod;
                var suffix = mod.suffix;
                if(mod.name === _module_){
                    Nui.each(mod.depmodules, function(val){
                        _module = val;
                        suffix = val.suffix;
                    })
                }
                Nui.each(modules, function(val){
                    var _mod = cacheModules[val].exec();
                    if(!suffix){
                        _mod.loadcss()
                    }
                })
                if(Nui.type(callback, 'Function')){
                    callback.call(Nui, _module.module)
                }
                delete mod.callback
            }
            mod.load()
        }
    }

    Module.getdeps = function(str){
        var deps = [];
        var styles = [];
        var match = str.match(/(require|exports|importcss)\(('|")[^'"]+\2/g);
        if(match){
            Nui.each(match, function(val){
                if(/^(require|exports)/.test(val)){
                    deps.push(val.replace(/^(require|exports)|[\('"]/g, ''))
                }
                else{
                    styles.push(val.replace(/^importcss|[\('"]/g, ''))
                }

            })
        }
        return [Nui.unique(deps), Nui.unique(styles)]
    }

    Module.define = function(id, deps, factory){
        //Nui.define(function(){})
        if(Nui.type(id, 'Function')){
            factory = id;
            id = undefined;
            deps = [];
        }
        //Nui.define(['mod1', 'mod2', ..], function(){})
        //Nui.define('id', function(){})
        else if(Nui.type(deps, 'Function')){
            factory = deps;
            if(Nui.type(id, 'String')){
                deps = []
            }
            else{
                deps = id;
                id = undefined
            }
        }

        var arrs = Module.getdeps(factory.toString());
        var alldeps = deps.concat(arrs[0]);
        var styles = arrs[1];

        if(id && !cacheModules[id] && !cacheModules[Module.setId(id)]){
            var mod = Module.getModule(id, alldeps);
            mod.deps = deps;
            mod.styles = styles;
            mod.factory = factory;
            mod.loaded = true;
            mod.load()
        }

        moduleData = {
            name:id,
            deps:deps,
            styles:styles,
            alldeps:alldeps,
            factory:factory
        }

        if(typeof getCurrentScript !== 'undefined'){
            var script = getCurrentScript();
            if(script){
                script.moduleData = moduleData
            }
        }
    }

    Nui.load = function(id, callback){
        Module.load(id, callback, getModuleid())
        return Nui
    }

    Nui.define = function(){
        var args = arguments;
        var len = args.length;
        var params = [];

        //Nui.define()
        //Nui.define('')
        //Nui.define([])
        //Nui.define({})
        if(!len || (len === 1 && !Nui.type(args[0], 'Function'))){
            params.push(function(){
                return args[0]
            })
        }

        //Nui.define('id', [])
        //Nui.define('id', {})
        else if((len === 2 && !Nui.type(args[1], 'Function')) || (len == 3 && !Nui.type(args[2], 'Function'))){
            params.push(args[0]);
            params.push(function(){
                return args[1]
            })
        }

        //Nui.define({}, function(){})
        else if(len === 2 && !Nui.type(args[0], ['Array', 'String']) && Nui.type(args[1], 'Function')){
            params.push(args[1])
        }

        //Nui.define('id', {}, function(){})
        //Nui.define('id', '', function(){})
        else if(len === 3 && !Nui.type(args[1], 'Array') && Nui.type(args[2], 'Function')){
            params.push(args[0]);
            params.push(args[2]);
        }

        //Nui.define('id', [], function(){})
        else{
            params = args
        }

        Module.define.apply(Module, params)
    }

    Nui.config = function(key, value){
        if(Nui.type(key, 'Object')){
            Nui.extend(true, config, key)
        }
        else if(Nui.type(key, 'String') && value){
            Nui.extend(true, config[key], value)
        }
        if(config.paths.base){
            Nui.each(config.paths, function(v, k){
                if(k !== 'base' && !/^(http|https|file):\/\//.test(v)){
                    config.paths[k] = config.paths.base+'/' + v
                }
            })
        }
    }

})(this, document)
