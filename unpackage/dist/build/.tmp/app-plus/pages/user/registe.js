(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/user/registe"],{4524:function(t,e,n){},5154:function(t,e,n){"use strict";var o=function(){var t=this,e=t.$createElement;t._self._c},i=[];n.d(e,"a",function(){return o}),n.d(e,"b",function(){return i})},"5b82":function(t,e,n){"use strict";var o=n("4524"),i=n.n(o);i.a},"77c1":function(t,e,n){"use strict";n.r(e);var o=n("5154"),i=n("f65b");for(var s in i)"default"!==s&&function(t){n.d(e,t,function(){return i[t]})}(s);n("5b82");var u=n("2877"),a=Object(u["a"])(i["default"],o["a"],o["b"],!1,null,"0c7f01cd",null);e["default"]=a.exports},"8ad5":function(t,e,n){"use strict";(function(t){n("6ea7"),n("921b");o(n("66fd"));var e=o(n("77c1"));function o(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,n("6e42")["createPage"])},f65b:function(t,e,n){"use strict";n.r(e);var o=n("fb21"),i=n.n(o);for(var s in o)"default"!==s&&function(t){n.d(e,t,function(){return o[t]})}(s);e["default"]=i.a},fb21:function(t,e,n){"use strict";(function(t,n){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var o={data:function(){return{uPhone:"",uCode:"",uPwd:"",uPwds:"",get:!0,got:!1,seconds:120}},methods:{getCode:function(){var e=this;return this.uPhone?/^1[3456789]\d{9}$/.test(this.uPhone)?void this._Api.getRegisterCode({phone:this.uPhone,type:0},function(o){if(console.log(n(o," at pages\\user\\registe.vue:74")),0===o.code){t.showToast({title:"验证码发送成功，请注意查收",icon:"none",duration:1500}),e.get=!1,e.got=!0;var i=setInterval(function(){e.seconds--,0===e.seconds&&(clearInterval(i),e.get=!0,e.got=!1,e.seconds=120)},1e3)}else t.showToast({title:o.msg,icon:"none",duration:1500})}):(t.showToast({title:"您输入的手机号格式不正确",icon:"none",duration:1500}),!1):(t.showToast({title:"手机号不能为空",icon:"none",duration:1500}),!1)},register:function(){var e=this;return this.uPhone?/^1[3456789]\d{9}$/.test(this.uPhone)?this.uCode?this.uPwd?this.uPwds?this.uPwd!==this.uPwds?(t.showToast({title:"两次密码不一致，请确认",icon:"none",duration:1500}),!1):void this._Api.register({phone:this.uPhone,code:this.uCode,password:this.uPwd},function(o){console.log(n(o," at pages\\user\\registe.vue:151")),0===o.code?(t.showToast({title:"恭喜您注册成功",icon:"none",duration:1500}),setTimeout(function(){t.navigateTo({url:"/pages/user/login?phone="+e.uPhone+"&pwd="+e.uPwd})},1500)):t.showToast({title:o.msg,icon:"none",duration:1500})}):(t.showToast({title:"重复密码不能为空",icon:"none",duration:1500}),!1):(t.showToast({title:"密码不能为空",icon:"none",duration:1500}),!1):(t.showToast({title:"验证码不能为空",icon:"none",duration:1500}),!1):(t.showToast({title:"您输入的手机号格式不正确",icon:"none",duration:1500}),!1):(t.showToast({title:"手机号不能为空",icon:"none",duration:1500}),!1)},navTo:function(e){t.navigateTo({url:"/pages/"+e})}}};e.default=o}).call(this,n("6e42")["default"],n("0de9")["default"])}},[["8ad5","common/runtime","common/vendor"]]]);