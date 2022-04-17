(function(t){function e(e){for(var s,n,o=e[0],l=e[1],c=e[2],p=0,d=[];p<o.length;p++)n=o[p],Object.prototype.hasOwnProperty.call(a,n)&&a[n]&&d.push(a[n][0]),a[n]=0;for(s in l)Object.prototype.hasOwnProperty.call(l,s)&&(t[s]=l[s]);u&&u(e);while(d.length)d.shift()();return i.push.apply(i,c||[]),r()}function r(){for(var t,e=0;e<i.length;e++){for(var r=i[e],s=!0,o=1;o<r.length;o++){var l=r[o];0!==a[l]&&(s=!1)}s&&(i.splice(e--,1),t=n(n.s=r[0]))}return t}var s={},a={app:0},i=[];function n(e){if(s[e])return s[e].exports;var r=s[e]={i:e,l:!1,exports:{}};return t[e].call(r.exports,r,r.exports,n),r.l=!0,r.exports}n.m=t,n.c=s,n.d=function(t,e,r){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:r})},n.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var s in t)n.d(r,s,function(e){return t[e]}.bind(null,s));return r},n.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="";var o=window["webpackJsonp"]=window["webpackJsonp"]||[],l=o.push.bind(o);o.push=e,o=o.slice();for(var c=0;c<o.length;c++)e(o[c]);var u=l;i.push([0,"chunk-vendors"]),r()})({0:function(t,e,r){t.exports=r("56d7")},2693:function(t,e,r){t.exports=r.p+"img/parser-gaode.da3d72c4.png"},"564b":function(t,e,r){t.exports=r.p+"img/parser-baidu.971d9867.png"},"56d7":function(t,e,r){"use strict";r.r(e);var s=r("2b0e"),a=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"app",attrs:{id:"app"}},[r("Home")],1)},i=[],n=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"home"},[t._m(0),r("div",{staticClass:"home__content"},[r("el-form",{ref:"form",staticClass:"form",attrs:{model:t.form,rules:t.formRules,"label-width":"100px"}},[r("el-form-item",{staticClass:"form__input",attrs:{label:"经纬度：",prop:"inputStr"}},[r("el-input",{attrs:{type:"textarea",autosize:{minRows:8,maxRows:12},placeholder:"每个地址的经纬度占一行，格式：经度,纬度\n例如：116.43213,38.76623"},model:{value:t.form.inputStr,callback:function(e){t.$set(t.form,"inputStr","string"===typeof e?e.trim():e)},expression:"form.inputStr"}})],1),r("el-form-item",{staticClass:"form__select",attrs:{label:"转换器：",prop:"parser"}},[r("div",{staticClass:"flex"},[r("el-select",{attrs:{placeholder:"请选择转换器"},model:{value:t.form.parser,callback:function(e){t.$set(t.form,"parser",e)},expression:"form.parser"}},t._l(t.parsers,(function(e){return r("el-option",{key:e.value,staticStyle:{display:"flex","align-items":"center"},attrs:{label:e.label,value:e.value}},[r("img",{staticStyle:{width:"14px",height:"14px"},attrs:{src:e.icon}}),r("span",{staticStyle:{"margin-left":"6px"}},[t._v(t._s(e.label))])])})),1),r("div",{staticClass:"btn__wrapper"},[r("el-button",{staticClass:"btn",attrs:{type:"primary",loading:t.isLoading},on:{click:t.submit}},[t._v("转换 ")])],1)],1)])],1),r("div",{staticClass:"input"},[r("input",{staticClass:"hidden",attrs:{type:"text",id:"addressList"},domProps:{value:t.addressList}})]),r("div",{staticClass:"output"},[r("div",{staticClass:"output__label el-form-item__label"},[t._v("结果：")]),r("div",{staticClass:"flex flex-1"},[r("el-input",{staticClass:"output__textarea",attrs:{type:"textarea",autosize:{minRows:8,maxRows:12},value:t.addressListStr,readonly:""}}),r("div",{staticClass:"btn__wrapper"},[r("el-button",{staticClass:"btn",attrs:{type:"primary",id:"btn-copy","data-clipboard-target":".output__textarea textarea"}},[t._v(" 复制 ")])],1)],1)])],1),r("div",{staticClass:"home__footer"},[t._v("©2022 玛尔斯通  ")])])},o=[function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"home__header"},[r("h1",{staticClass:"home__title"},[t._v("经纬度 "),r("i",{staticClass:"el-icon-right"}),t._v(" 地址")])])}],l=(r("d9e2"),r("b311")),c=r.n(l),u={name:"Home",components:{},data(){const t=(t,e,r)=>{if(!e)return;const s=this.form.inputStr.split("\n"),a=s.every(t=>{const[e,r]=t.split(",");return""!==e&&""!==r&&!Number.isNaN(Number(e))&&!Number.isNaN(Number(r))});if(!a)return r(new Error("格式错误，请检查格式"));r()};return{form:{parser:"gaode",inputStr:""},formRules:{inputStr:[{required:!0,message:"请输入经纬度",trigger:"blur"},{validator:t,trigger:["blur","change"]}],parser:[{required:!0,message:"请选择转换器",trigger:["blur","change"]}]},parsers:[{label:"高德地图",value:"gaode",icon:r("2693")},{label:"百度地图",value:"baidu",icon:r("564b")}],addressList:[],isLoading:!1}},computed:{addressListStr(){var t;return 0===(null===(t=this.addressList)||void 0===t?void 0:t.length)?"":this.addressList.join("\n")}},mounted(){this.init()},methods:{init(){this.initBMap(),this.initClipboard()},initBMap(){this.$baiduGeo=new BMapGL.Geocoder({extensions_town:!0}),this.$gaodeGeo=new AMap.Geocoder({radius:3e3})},initClipboard(){this.$clipboard=new c.a("#btn-copy"),this.$clipboard.on("success",t=>{t.clearSelection(),this.$message.success("复制成功")}),this.$clipboard.on("error",()=>{this.$message.error("复制失败")})},submit(){this.addressList=[],this.$refs.form.validate(async t=>{try{if(!t)return;this.isLoading=!0;const e=this.form.inputStr.split("\n").map(t=>{const[e,r]=t.split(",");return{lng:e,lat:r}}),r=await this.getAddressList(e);this.addressList=r}catch(e){console.error(e),this.$message.error(e.message)}finally{this.isLoading=!1}})},getAddressList(t){const e=t.map(t=>this.getAddress(t));return Promise.all(e)},async getAddress(t){const{lng:e,lat:r}=t;return new Promise((t,s)=>{if("baidu"===this.form.parser){const a=[Number(e),Number(r)];this.$baiduGeo.getLocation(new BMapGL.Point(...a),(function(e){e&&t(e.address),s(new Error("根据经纬度查询地址失败"))}))}if("gaode"===this.form.parser){const a=this;AMap.plugin("AMap.Geocoder",(function(){const i=[e,r];a.$gaodeGeo.getAddress(i,(function(e,r){"complete"===e&&"OK"===r.info&&t(r.regeocode.formattedAddress),s(new Error("根据经纬度查询地址失败"))}))}))}})}}},p=u,d=(r("c922"),r("2877")),f=Object(d["a"])(p,n,o,!1,null,"a9d82014",null),m=f.exports,b={name:"App",components:{Home:m}},h=b,g=(r("5c0b"),Object(d["a"])(h,a,i,!1,null,null,null)),v=g.exports,_=(r("fb98"),r("0fb7"),r("450d"),r("f529")),y=r.n(_),w=(r("6611"),r("e772")),x=r.n(w),C=(r("1f1a"),r("4e4b")),S=r.n(C),L=(r("0c67"),r("299c")),$=r.n(L),O=(r("10cb"),r("f3ad")),j=r.n(O),M=(r("1951"),r("eedf")),P=r.n(M),A=(r("fd71"),r("a447")),N=r.n(A),G=(r("eca7"),r("3787")),k=r.n(G),E=(r("425f"),r("4105")),R=r.n(E),B=(r("aaa5"),r("a578")),H=r.n(B);r("0fae");[H.a,R.a,k.a,N.a,P.a,j.a,$.a,S.a,x.a].forEach(t=>s["default"].use(t)),s["default"].prototype.$message=y.a,s["default"].config.productionTip=!1,new s["default"]({render:t=>t(v)}).$mount("#app")},"5c0b":function(t,e,r){"use strict";r("6605")},6605:function(t,e,r){},c922:function(t,e,r){"use strict";r("d8a2")},d8a2:function(t,e,r){},fb98:function(t,e,r){}});
//# sourceMappingURL=app.d2e82851.js.map