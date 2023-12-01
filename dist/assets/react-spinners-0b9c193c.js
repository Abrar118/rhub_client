import{r as l}from"./react-ee2054f5.js";import{c}from"./@babel-2cccee12.js";var V={cm:!0,mm:!0,in:!0,px:!0,pt:!0,pc:!0,em:!0,ex:!0,ch:!0,rem:!0,vw:!0,vh:!0,vmin:!0,vmax:!0,"%":!0};function C(e){if(typeof e=="number")return{value:e,unit:"px"};var r,n=(e.match(/^[0-9.]*/)||"").toString();n.includes(".")?r=parseFloat(n):r=parseInt(n,10);var t=(e.match(/[^0-9]*$/)||"").toString();return V[t]?{value:r,unit:t}:(console.warn("React Spinners: ".concat(e," is not a valid css value. Defaulting to ").concat(r,"px.")),{value:r,unit:"px"})}function m(e){var r=C(e);return"".concat(r.value).concat(r.unit)}var A=function(e,r,n){var t="react-spinners-".concat(e,"-").concat(n);if(typeof window>"u"||!window.document)return t;var a=document.createElement("style");document.head.appendChild(a);var i=a.sheet,u=`
    @keyframes `.concat(t,` {
      `).concat(r,`
    }
  `);return i&&i.insertRule(u,0),t},S=globalThis&&globalThis.__assign||function(){return S=Object.assign||function(e){for(var r,n=1,t=arguments.length;n<t;n++){r=arguments[n];for(var a in r)Object.prototype.hasOwnProperty.call(r,a)&&(e[a]=r[a])}return e},S.apply(this,arguments)},F=globalThis&&globalThis.__rest||function(e,r){var n={};for(var t in e)Object.prototype.hasOwnProperty.call(e,t)&&r.indexOf(t)<0&&(n[t]=e[t]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var a=0,t=Object.getOwnPropertySymbols(e);a<t.length;a++)r.indexOf(t[a])<0&&Object.prototype.propertyIsEnumerable.call(e,t[a])&&(n[t[a]]=e[t[a]]);return n},U=A("ScaleLoader","0% {transform: scaley(1.0)} 50% {transform: scaley(0.4)} 100% {transform: scaley(1.0)}","scale");function Z(e){var r=e.loading,n=r===void 0?!0:r,t=e.color,a=t===void 0?"#000000":t,i=e.speedMultiplier,u=i===void 0?1:i,d=e.cssOverride,b=d===void 0?{}:d,p=e.height,g=p===void 0?35:p,v=e.width,O=v===void 0?4:v,f=e.radius,_=f===void 0?2:f,s=e.margin,w=s===void 0?2:s,P=F(e,["loading","color","speedMultiplier","cssOverride","height","width","radius","margin"]),$=S({display:"inherit"},b),o=function(L){return{backgroundColor:a,width:m(O),height:m(g),margin:m(w),borderRadius:m(_),display:"inline-block",animation:"".concat(U," ").concat(1/u,"s ").concat(L*.1,"s infinite cubic-bezier(0.2, 0.68, 0.18, 1.08)"),animationFillMode:"both"}};return n?l.createElement("span",S({style:$},P),l.createElement("span",{style:o(1)}),l.createElement("span",{style:o(2)}),l.createElement("span",{style:o(3)}),l.createElement("span",{style:o(4)}),l.createElement("span",{style:o(5)})):null}var E=globalThis&&globalThis.__assign||function(){return E=Object.assign||function(e){for(var r,n=1,t=arguments.length;n<t;n++){r=arguments[n];for(var a in r)Object.prototype.hasOwnProperty.call(r,a)&&(e[a]=r[a])}return e},E.apply(this,arguments)},D=globalThis&&globalThis.__rest||function(e,r){var n={};for(var t in e)Object.prototype.hasOwnProperty.call(e,t)&&r.indexOf(t)<0&&(n[t]=e[t]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var a=0,t=Object.getOwnPropertySymbols(e);a<t.length;a++)r.indexOf(t[a])<0&&Object.prototype.propertyIsEnumerable.call(e,t[a])&&(n[t[a]]=e[t[a]]);return n},I=A("SyncLoader",`33% {transform: translateY(10px)}
  66% {transform: translateY(-10px)}
  100% {transform: translateY(0)}`,"sync");function z(e){var r=e.loading,n=r===void 0?!0:r,t=e.color,a=t===void 0?"#000000":t,i=e.speedMultiplier,u=i===void 0?1:i,d=e.cssOverride,b=d===void 0?{}:d,p=e.size,g=p===void 0?15:p,v=e.margin,O=v===void 0?2:v,f=D(e,["loading","color","speedMultiplier","cssOverride","size","margin"]),_=E({display:"inherit"},b),s=function(w){return{backgroundColor:a,width:m(g),height:m(g),margin:m(O),borderRadius:"100%",display:"inline-block",animation:"".concat(I," ").concat(.6/u,"s ").concat(w*.07,"s infinite ease-in-out"),animationFillMode:"both"}};return n?l.createElement("span",E({style:_},f),l.createElement("span",{style:s(1)}),l.createElement("span",{style:s(2)}),l.createElement("span",{style:s(3)})):null}var R={},h={};Object.defineProperty(h,"__esModule",{value:!0});h.cssValue=h.parseLengthAndUnit=void 0;var Y={cm:!0,mm:!0,in:!0,px:!0,pt:!0,pc:!0,em:!0,ex:!0,ch:!0,rem:!0,vw:!0,vh:!0,vmin:!0,vmax:!0,"%":!0};function T(e){if(typeof e=="number")return{value:e,unit:"px"};var r,n=(e.match(/^[0-9.]*/)||"").toString();n.includes(".")?r=parseFloat(n):r=parseInt(n,10);var t=(e.match(/[^0-9]*$/)||"").toString();return Y[t]?{value:r,unit:t}:(console.warn("React Spinners: ".concat(e," is not a valid css value. Defaulting to ").concat(r,"px.")),{value:r,unit:"px"})}h.parseLengthAndUnit=T;function B(e){var r=T(e);return"".concat(r.value).concat(r.unit)}h.cssValue=B;var M={};Object.defineProperty(M,"__esModule",{value:!0});M.createAnimation=void 0;var N=function(e,r,n){var t="react-spinners-".concat(e,"-").concat(n);if(typeof window>"u"||!window.document)return t;var a=document.createElement("style");document.head.appendChild(a);var i=a.sheet,u=`
    @keyframes `.concat(t,` {
      `).concat(r,`
    }
  `);return i&&i.insertRule(u,0),t};M.createAnimation=N;var x=c&&c.__assign||function(){return x=Object.assign||function(e){for(var r,n=1,t=arguments.length;n<t;n++){r=arguments[n];for(var a in r)Object.prototype.hasOwnProperty.call(r,a)&&(e[a]=r[a])}return e},x.apply(this,arguments)},W=c&&c.__createBinding||(Object.create?function(e,r,n,t){t===void 0&&(t=n);var a=Object.getOwnPropertyDescriptor(r,n);(!a||("get"in a?!r.__esModule:a.writable||a.configurable))&&(a={enumerable:!0,get:function(){return r[n]}}),Object.defineProperty(e,t,a)}:function(e,r,n,t){t===void 0&&(t=n),e[t]=r[n]}),k=c&&c.__setModuleDefault||(Object.create?function(e,r){Object.defineProperty(e,"default",{enumerable:!0,value:r})}:function(e,r){e.default=r}),G=c&&c.__importStar||function(e){if(e&&e.__esModule)return e;var r={};if(e!=null)for(var n in e)n!=="default"&&Object.prototype.hasOwnProperty.call(e,n)&&W(r,e,n);return k(r,e),r},q=c&&c.__rest||function(e,r){var n={};for(var t in e)Object.prototype.hasOwnProperty.call(e,t)&&r.indexOf(t)<0&&(n[t]=e[t]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var a=0,t=Object.getOwnPropertySymbols(e);a<t.length;a++)r.indexOf(t[a])<0&&Object.prototype.propertyIsEnumerable.call(e,t[a])&&(n[t[a]]=e[t[a]]);return n};Object.defineProperty(R,"__esModule",{value:!0});var y=G(l),j=h,H=M,J=(0,H.createAnimation)("ScaleLoader","0% {transform: scaley(1.0)} 50% {transform: scaley(0.4)} 100% {transform: scaley(1.0)}","scale");function K(e){var r=e.loading,n=r===void 0?!0:r,t=e.color,a=t===void 0?"#000000":t,i=e.speedMultiplier,u=i===void 0?1:i,d=e.cssOverride,b=d===void 0?{}:d,p=e.height,g=p===void 0?35:p,v=e.width,O=v===void 0?4:v,f=e.radius,_=f===void 0?2:f,s=e.margin,w=s===void 0?2:s,P=q(e,["loading","color","speedMultiplier","cssOverride","height","width","radius","margin"]),$=x({display:"inherit"},b),o=function(L){return{backgroundColor:a,width:(0,j.cssValue)(O),height:(0,j.cssValue)(g),margin:(0,j.cssValue)(w),borderRadius:(0,j.cssValue)(_),display:"inline-block",animation:"".concat(J," ").concat(1/u,"s ").concat(L*.1,"s infinite cubic-bezier(0.2, 0.68, 0.18, 1.08)"),animationFillMode:"both"}};return n?y.createElement("span",x({style:$},P),y.createElement("span",{style:o(1)}),y.createElement("span",{style:o(2)}),y.createElement("span",{style:o(3)}),y.createElement("span",{style:o(4)}),y.createElement("span",{style:o(5)})):null}var ee=R.default=K;export{Z as S,ee as _,z as a};