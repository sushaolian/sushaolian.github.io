function H$(i){return document.getElementById(i);}
function H$$(c,p){
	if(p) return p.getElementsByTagName(c);
	else return document.getElementsByTagName(c);
}
var tagElems = [];
(function() {
	function ranOrNot(e, t) {
		var n = [];
		typeof t == &quot;undefined&quot; &amp;&amp; (t = e, e = 0);
		for (; e &lt; t; e++) n.push(e);
		return n
	}
	Array.prototype.randomEach = function(t) {
		if (typeof t != &quot;function&quot;) throw new TypeError;
		var n = this.length,
		r = ranOrNot(n);
		while (n) {
			var i = Math.floor(Math.random() * n--);
			if (t(this[r[i]]) === !1) break;
			r[i] = r[n]
		}
	},
	Array.prototype.forEach || (Array.prototype.forEach = function(e) {
		var t = this.length;
		if (typeof e != &quot;function&quot;) throw new TypeError;
		var n = arguments[1];
		for (var r = 0; r &lt; t; r++) r in this &amp;&amp; e.call(n, this[r], r, this)
	})
} )();


function _shadowClone(e) {
	var t = {};
	for (var n in e) e.hasOwnProperty(n) &amp;&amp; (t[n] = e[n]);
	return t;
}
function attrStyle(elem,attr){
    if(elem.style[attr]){
        return elem.style[attr];
    }else if(elem.currentStyle){
        return elem.currentStyle[attr];
    }else if(document.defaultView &amp;&amp; document.defaultView.getComputedStyle){
        attr=attr.replace(/([A-Z])/g,&apos;-$1&apos;).toLowerCase();
        return document.defaultView.getComputedStyle(elem,null).getPropertyValue(attr);
    }else{
        return null;
    }
}

///////////////////////////


function AutoLoader(fun, timeout) {
	if (typeof fun != &quot;function&quot;) throw new TypeError;
	this._generator = fun;
	this._timeout = timeout;
	this._context = arguments[2];
	this._pool = [];
}
AutoLoader.prototype._load = function() {
	var e = this;
	clearTimeout(this._loading);
	this._loading = setTimeout(function() {
		e._pool.push(e._generator.apply(e._context))
	},
	this._timeout);

}
AutoLoader.prototype.get = function() {
	var e;
	clearTimeout(this._loading);
	this._pool.length &gt; 0 ? e = this._pool.pop() : e = this._generator.apply(this._context);
	return e;
}

function _cutGrid(tag, funcJudge) {
	function a(a) {
		function h(cutLength) {
			var u, a = _shadowClone(cutLength);
			c++,
			u = c === l ? tag[cutType2.measure] - s: Math.floor(cutLength[cutType2.measure] * tag[cutType2.measure] / 100),
			a[cutType1.offset] = i + tag[cutType1.offset],
			a[cutType2.offset] = s + tag[cutType2.offset],
			a[cutType1.measure] = f,
			a[cutType2.measure] = u,
			a.colorPattern = tag.colorPattern,
			funcJudge(a),
			s += u
		}
		var f, l = a[cutType2.name].length,
		c = 0;
		u++,
		f = u === cutLength ? tag[cutType1.measure] - i: Math.floor(a[cutType1.measure] * tag[cutType1.measure] / 100),
		a.random === !1 ? a[cutType2.name].forEach(h) : a[cutType2.name].randomEach(h),
		s = 0,
		i += f
	}
	/*&#x6839;&#x636E;&#x5927;&#x5757;&#x662F;&#x5426;&#x6709;rows&#x5C5E;&#x6027;&#xFF0C;&#x5B9A;&#x4E49;&#x4E24;&#x79CD;&#x5207;&#x5272;&#x65B9;&#x5F0F;*/
	var cutType1, cutType2;
	tag.rows ? (cutType1 = {
		name: &quot;rows&quot;,
		measure: &quot;height&quot;,
		offset: &quot;top&quot;
	},
	cutType2 = {
		name: &quot;cols&quot;,
		measure: &quot;width&quot;,
		offset: &quot;left&quot;
	}) : (cutType1 = {
		name: &quot;cols&quot;,
		measure: &quot;width&quot;,
		offset: &quot;left&quot;
	},
	cutType2 = {
		name: &quot;rows&quot;,
		measure: &quot;height&quot;,
		offset: &quot;top&quot;
	});
	var i = 0,
	s = 0,
	cutLength = tag[cutType1.name].length,
	u = 0;
	tag.random === !1 ? tag[cutType1.name].forEach(a) : tag[cutType1.name].randomEach(a)
}

function _getGrids(tag) {
	var t = [],
	colorCount = 0,
	fontScale = .18,
	colorArr = tag.colorPatterns[0];
	_cutGrid(tag.pageLayout,
		function(tag) {
			/*&#x5982;&#x679C;&#x662F;&#x65B0;&#x7684;&#x5927;&#x5757;&#xFF0C;&#x5219;colorPattern&#x4E0D;&#x5B58;&#x5728;&#xFF0C;&#x4F7F;&#x7528;&#x65B0;&#x7684;&#x989C;&#x8272;&#x3002;*/
			tag.colorPattern || (tag.colorPattern = colorArr[colorCount++]);
			/*tagConfig&#x672C;&#x6765;&#x6CA1;&#x6709;rows&#x6216;cols&#xFF0C;&#x662F;&#x5927;&#x5757;&#x3002;&#x6267;&#x884C;else&#x90E8;&#x5206;*/
			if (tag.rows || tag.cols) {
				_cutGrid(tag, arguments.callee);
			}
			else {
				var s = tag.colorPattern,
				o = s.backgrounds,
				u = o.length,
				a = s.fontColor;
				tag.fontSize = Math.floor(Math.sqrt(tag.width * tag.height) * fontScale);
				tag.backgroundColor = o[Math.floor(Math.random() * u)];
				tag.fontColor = a;
				t.push(tag);
			}
		}
	);
	return t;
}

var myReader = function(){
	function inits(o){
		this.dom = H$(o.domId);
		this.len = o.len;
		this.block = o.block;
		this.fillStage(H$(&quot;container&quot;));
		this.clickEve();
	}
	inits.prototype={
		clickEve:function(){
			var _this=this;
			var dom = H$$(&quot;button&quot;);
			dom[0].onclick=function(){
				H$(&quot;container&quot;).innerHTML=&quot;&quot;;
				_this.fillStage(H$(&quot;container&quot;));
			}
		},
		reflowTagElem:function(dom, t,sw,sh) {
			
			dom.style.top = t.top*sh + &quot;px&quot;;
			dom.style.left = t.left*sw + &quot;px&quot;;
			dom.style.width = t.width*sw - 2 + &quot;px&quot;;
			dom.style.height = t.height*sh - 2 + &quot;px&quot;;
			dom.style.fontSize = t.fontSize*sw + &quot;px&quot;;
			dom.style.color = t.fontColor;
			dom.style.backgroundColor = t.backgroundColor;
			dom.order = t.width*sw * t.height*sh;
		},
		fillStage:function(dom) {
			var _this=this;
			var data = _getGrids(window.tagConfig);
			data.forEach(function(data) {
				var div = document.createElement(&quot;div&quot;);
				div.className = &quot;tag&quot;;
				_this.reflowTagElem(div, data,6,4);
				dom.appendChild(div);
				tagElems.push(div);
			});
		}
	}
	return inits;
}();

var myData = {
	domId:&quot;container&quot;
}
new myReader(myData);