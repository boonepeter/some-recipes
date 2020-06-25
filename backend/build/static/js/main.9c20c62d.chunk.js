(this["webpackJsonpboone-recipes"]=this["webpackJsonpboone-recipes"]||[]).push([[0],{112:function(e,a,t){"use strict";t.r(a);var n=t(0),r=t.n(n),l=t(19),c=t.n(l),o=(t(87),t(12)),u=t.n(o),i=t(17),s=t(8),m=t(18),p=t.n(m),d="https://some-recipes.azurewebsites.net/api",E=t(10),f=t(25),v=t(117),h=function(){var e=Object(E.h)().id,a=r.a.useState(null),t=Object(s.a)(a,2),n=t[0],l=t[1];return r.a.useEffect((function(){(function(){var a=Object(i.a)(u.a.mark((function a(){var t;return u.a.wrap((function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,p.a.get("".concat(d,"/recipes/").concat(e));case 2:t=a.sent,console.log("public url",""),t.data&&l(t.data);case 5:case"end":return a.stop()}}),a)})));return function(){return a.apply(this,arguments)}})()()}),[e]),n?r.a.createElement("div",null,r.a.createElement("h2",null,n.title,n.link?r.a.createElement("a",{target:"_blank",title:"open in new tab",style:{paddingLeft:"5px"},rel:"noopener noreferrer",href:n.link},r.a.createElement("svg",{className:"bi bi-box-arrow-up-right",width:"1em",height:"1em",viewBox:"0 0 30 30",fill:"currentColor",xmlns:"http://www.w3.org/2000/svg"},r.a.createElement("path",{fillRule:"evenodd",d:"M1.5 13A1.5 1.5 0 003 14.5h8a1.5 1.5 0 001.5-1.5V9a.5.5 0 00-1 0v4a.5.5 0 01-.5.5H3a.5.5 0 01-.5-.5V5a.5.5 0 01.5-.5h4a.5.5 0 000-1H3A1.5 1.5 0 001.5 5v8zm7-11a.5.5 0 01.5-.5h5a.5.5 0 01.5.5v5a.5.5 0 01-1 0V2.5H9a.5.5 0 01-.5-.5z",clipRule:"evenodd"}),r.a.createElement("path",{fillRule:"evenodd",d:"M14.354 1.646a.5.5 0 010 .708l-8 8a.5.5 0 01-.708-.708l8-8a.5.5 0 01.708 0z",clipRule:"evenodd"}))):null),n.tags?r.a.createElement("div",null,"Tags:",n.tags.map((function(e){return r.a.createElement(v.a,{className:"ml-10",style:{margin:5},variant:"light",key:e},r.a.createElement(f.b,{to:"/search?type=tag&terms=".concat(e)},e))}))):null,r.a.createElement("div",null,n.description),r.a.createElement("h3",null,"Ingredients"),r.a.createElement("ul",null,r.a.createElement("div",null,n.ingredients.map((function(e){return r.a.createElement("li",{key:e},e)})))),r.a.createElement("h3",null,"Directions"),r.a.createElement("ul",null,r.a.createElement("div",null,n.directions.map((function(e){return r.a.createElement("li",{key:e},e)}))))):null},b=t(118),g=t(128),w=t(79),O=function(e){var a=e.recipe;return r.a.createElement(g.a,{style:{minHeight:"200px"}},r.a.createElement(g.a.Body,null,r.a.createElement(g.a.Title,null,r.a.createElement(f.b,{to:"/recipes/".concat(a.id)},a.title)),r.a.createElement(g.a.Text,null,a.description?a.description.length>250?a.description.substr(0,250)+"...":a.description:"..."),r.a.createElement(w.a,{href:"/recipes/".concat(a.id)},"View")))},y=function(e){var a=e.recipes;return a?r.a.createElement(b.a,null,a.map((function(e){return r.a.createElement(O,{key:e.id,recipe:e})}))):r.a.createElement("div",null,r.a.createElement("h3",null,"loading..."))},j=t(126),S=t(123),k=t(80),x=t(125),C=t(124),N=t(127),L=t(119),P=t(50),I=t(57),B=function(e){var a=e.user,t=e.logout,l=e.showNewModal,c=Object(E.f)(),o=Object(n.useState)(""),u=Object(s.a)(o,2),i=u[0],m=u[1],p=null!==a?{display:"none"}:void 0,d=null===a?{display:"none"}:void 0;return r.a.createElement(j.a,{collapseOnSelect:!0,expand:"lg",bg:"light"},r.a.createElement("div",{className:"container"},r.a.createElement(j.a.Brand,{href:"/"},r.a.createElement("img",{alt:"",src:"/spoon-fork.svg",width:"30",height:"30",className:"d-inline-block align-top"})," ","Some Recipes"),r.a.createElement(j.a.Toggle,{"aria-controls":"basic-navbar-nav"}),r.a.createElement(j.a.Collapse,{id:"basic-navbar-nav"},r.a.createElement(S.a,{inline:!0,className:"ml-auto mr-auto",onSubmit:function(e){console.log(i),c.push("/search?type=title&terms=".concat(i)),m(""),e.preventDefault()}},r.a.createElement(k.a,{type:"text",placeholder:"Search",value:i,onChange:function(e){var a=e.target;return m(a.value)}})),r.a.createElement(x.a,{className:"ml-auto"},r.a.createElement(x.a.Link,{href:"/",active:"/"===Object(E.g)().pathname},"Home"),r.a.createElement(x.a.Link,{href:"/recipes",active:"/recipes"===Object(E.g)().pathname},"My Recipes"),r.a.createElement(x.a.Link,{href:"/signup",style:p,active:"/signup"===Object(E.g)().pathname},"Sign Up"),r.a.createElement(x.a.Link,{href:"/login",style:p,active:"/login"===Object(E.g)().pathname},"Login"),a?r.a.createElement(C.a,null,r.a.createElement(C.a.Toggle,{variant:"light",id:"dropdown-basic"},a.username),r.a.createElement(C.a.Menu,null,r.a.createElement(C.a.Item,{href:"/profile/".concat(a.username)},"Profile"),r.a.createElement(C.a.Item,{onClick:t},"Logout"))):null,r.a.createElement(N.a,{placement:"bottom",overlay:r.a.createElement(L.a,{id:"add-new-recipe-tooltip"},"Add new recipe")},r.a.createElement(w.a,{onClick:l,variant:"primary",style:d},r.a.createElement(P.a,{icon:I.a})))))))},T=t(81),G=t(120),H=function(){var e=Object(n.useState)(""),a=Object(s.a)(e,2),t=a[0],l=a[1],c=Object(n.useState)(""),o=Object(s.a)(c,2),m=o[0],E=o[1],f=Object(n.useState)(""),v=Object(s.a)(f,2),h=v[0],b=v[1],g=Object(n.useState)(""),O=Object(s.a)(g,2),y=O[0],j=O[1],k=Object(n.useState)(""),x=Object(s.a)(k,2),C=x[0],N=x[1],L=function(){var e=Object(i.a)(u.a.mark((function e(a){var n,r;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return!1===a.currentTarget.checkValidity()&&(a.preventDefault(),a.stopPropagation()),n={username:h,email:y,name:"".concat(t," ").concat(m),friends:[],lists:[],password:C},e.next=5,p.a.post("".concat(d,"/users"),n);case 5:r=e.sent,console.log(r.data);case 7:case"end":return e.stop()}}),e)})));return function(a){return e.apply(this,arguments)}}();return r.a.createElement("div",null,r.a.createElement("h1",null,"Sign up"),r.a.createElement(S.a,{onSubmit:L},r.a.createElement(S.a.Row,null,r.a.createElement(T.a,null,r.a.createElement(S.a.Group,null,r.a.createElement(S.a.Label,null,"First Name"),r.a.createElement(S.a.Control,{type:"text",required:!0,placeholder:"John",value:t,onChange:function(e){var a=e.target;return l(a.value)}}))),r.a.createElement(T.a,null,r.a.createElement(S.a.Group,null,r.a.createElement(S.a.Label,null,"Last Name"),r.a.createElement(S.a.Control,{required:!0,type:"text",placeholder:"Smith",value:m,onChange:function(e){var a=e.target;return E(a.value)}})))),r.a.createElement(S.a.Group,{controlId:"formBasicEmail"},r.a.createElement(S.a.Label,null,"Email address"),r.a.createElement(S.a.Control,{type:"email",required:!0,placeholder:"Enter email",value:y,onChange:function(e){var a=e.target;return j(a.value)}})),r.a.createElement(S.a.Group,{controlId:"validationCustomUsername"},r.a.createElement(S.a.Label,null,"Username"),r.a.createElement(G.a,null,r.a.createElement(G.a.Prepend,null,r.a.createElement(G.a.Text,{id:"inputGroupPrepend"},"@")),r.a.createElement(S.a.Control,{type:"text",placeholder:"Username","aria-describedby":"inputGroupPrepend",required:!0,value:h,onChange:function(e){var a=e.target;return b(a.value)}}),r.a.createElement(S.a.Control.Feedback,{type:"invalid"},"Please choose a username."))),r.a.createElement(S.a.Group,{controlId:"formBasicPassword"},r.a.createElement(S.a.Label,null,"Password"),r.a.createElement(S.a.Control,{type:"password",required:!0,placeholder:"Password",value:C,onChange:function(e){var a=e.target;return N(a.value)}})),r.a.createElement(w.a,{variant:"primary",type:"submit"},"Submit")))},R=function(){var e=Object(n.useState)(""),a=Object(s.a)(e,2),t=a[0],l=a[1],c=Object(n.useState)(""),o=Object(s.a)(c,2),m=o[0],f=o[1],v=Object(E.f)(),h=function(){var e=Object(i.a)(u.a.mark((function e(a){var n;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a.preventDefault(),a.stopPropagation(),e.next=4,p.a.post("".concat(d,"/login"),{email:t,password:m});case 4:n=e.sent,console.log(n.data),n.data&&window.localStorage.setItem("some-recipes-user-token",JSON.stringify(n.data)),l(""),f(""),v.push("/");case 10:case"end":return e.stop()}}),e)})));return function(a){return e.apply(this,arguments)}}();return r.a.createElement("div",null,r.a.createElement("h1",null,"Login"),r.a.createElement(S.a,{onSubmit:h},r.a.createElement(S.a.Group,{controlId:"formBasicEmail"},r.a.createElement(S.a.Label,null,"Email address"),r.a.createElement(S.a.Control,{type:"text",required:!0,placeholder:"abc@example.com",value:t,onChange:function(e){var a=e.target;return l(a.value)}})),r.a.createElement(S.a.Group,{controlId:"formBasicPassword"},r.a.createElement(S.a.Label,null,"Password"),r.a.createElement(S.a.Control,{type:"password",required:!0,placeholder:"Password",value:m,onChange:function(e){var a=e.target;return f(a.value)}})),r.a.createElement(w.a,{variant:"primary",type:"submit"},"Submit")))},q=t(121),A=function(){var e=Object(n.useState)([]),a=Object(s.a)(e,2),t=a[0],l=a[1],c=Object(n.useState)(!0),o=Object(s.a)(c,2),m=o[0],f=o[1],v=new URLSearchParams(Object(E.g)().search);return r.a.useEffect((function(){(function(){var e=Object(i.a)(u.a.mark((function e(){var a,t,n;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(a=v.getAll("terms"),t=v.getAll("type"),a&&t){e.next=6;break}return e.abrupt("return");case 6:return e.next=8,p.a.get("".concat(d,"/search?type=").concat(t,"&terms=").concat(a));case 8:(n=e.sent)&&l(n.data),f(!1);case 11:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}})()()}),[]),!0===m?r.a.createElement(q.a,{animation:"border"}):0===t.length?r.a.createElement("div",{className:"container"},r.a.createElement("h2",null,"No recipes found. Try again?"),r.a.createElement("div",null,"searching ",m),r.a.createElement(q.a,{animation:"border",className:"mr-auto ml-auto"})):r.a.createElement(b.a,null,t.map((function(e){return r.a.createElement(O,{key:e.id,recipe:e})})))},M=function(){var e,a=Object(E.h)().username,t=Object(n.useState)(void 0),l=Object(s.a)(t,2),c=l[0],o=l[1];return r.a.useEffect((function(){(function(){var e=Object(i.a)(u.a.mark((function e(){var t;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(a){e.next=2;break}return e.abrupt("return");case 2:return e.next=4,p.a.get("".concat(d,"/users/").concat(a));case 4:(t=e.sent)&&(o(t.data),console.log("fullUser",t.data));case 6:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}})()()}),[a]),c?r.a.createElement("div",null,r.a.createElement("div",{className:"d-flex flex-row ",style:{marginTop:40}},r.a.createElement(P.a,{size:"10x",icon:I.b}),r.a.createElement("h3",{className:"mt-auto"},c.name)),r.a.createElement("ul",null,null===(e=c.lists)||void 0===e?void 0:e.map((function(e){return r.a.createElement("li",{key:e.title},e.title)})))):r.a.createElement("div",null,"Profile")},z=function(){return r.a.createElement(S.a,null)},J=t(122),U=function(e){var a=e.handleClose,t=(e.handleShow,e.show);return r.a.createElement(J.a,{size:"lg",centered:!0,show:t,onHide:a},r.a.createElement(J.a.Header,{closeButton:!0},r.a.createElement(J.a.Title,null,"Add new recipe")),r.a.createElement(J.a.Body,null,r.a.createElement(z,null),r.a.createElement("div",null,"new recipe form")),r.a.createElement(J.a.Footer,null,r.a.createElement(w.a,{variant:"secondary",onClick:a},"Close"),r.a.createElement(w.a,{variant:"primary",onClick:a},"Add")))},V=function(){var e=Object(n.useState)(null),a=Object(s.a)(e,2),t=a[0],l=a[1],c=Object(n.useState)(null),o=Object(s.a)(c,2),m=o[0],v=o[1],b=Object(n.useState)(!1),g=Object(s.a)(b,2),O=(g[0],g[1],Object(E.f)()),j=Object(n.useState)(!1),S=Object(s.a)(j,2),k=S[0],x=S[1],C=function(){return x(!0)};r.a.useEffect((function(){var e=localStorage.getItem("some-recipes-user-token");e&&(v(JSON.parse(e).user),console.log("parsed",JSON.parse(e)))}),[]);return r.a.useEffect((function(){(function(){var e=Object(i.a)(u.a.mark((function e(){var a;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,p.a.get("".concat(d,"/recipes"));case 2:a=e.sent,console.log(a),l(a.data);case 5:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}})()()}),[]),r.a.createElement("div",null,r.a.createElement(f.a,null,r.a.createElement(B,{user:m,logout:function(){localStorage.clear(),null===O||void 0===O||O.push("/")},showNewModal:C}),r.a.createElement("div",{className:"container"},r.a.createElement(E.c,null,r.a.createElement(E.a,{path:"/recipes/:id",render:function(){return r.a.createElement(h,null)}}),r.a.createElement(E.a,{path:"/recipes"},r.a.createElement(y,{recipes:t})),r.a.createElement(E.a,{path:"/login"},r.a.createElement(R,null)),r.a.createElement(E.a,{path:"/signup"},r.a.createElement(H,null)),r.a.createElement(E.a,{path:"/search"},r.a.createElement(A,null)),r.a.createElement(E.a,{path:"/profile/:username"},r.a.createElement(M,null)),r.a.createElement(E.a,{path:"/"},r.a.createElement("h1",null,"Home"),r.a.createElement(w.a,{onClick:function(){return x(!0)}},"Show modal"),r.a.createElement(U,{show:k,handleClose:function(){return x(!1)},handleShow:C}))))))};c.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(V,null)),document.getElementById("root"))},82:function(e,a,t){e.exports=t(112)},87:function(e,a,t){}},[[82,1,2]]]);
//# sourceMappingURL=main.9c20c62d.chunk.js.map