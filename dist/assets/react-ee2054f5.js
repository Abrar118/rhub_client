import{g as S}from"./@babel-2cccee12.js";function V(e,t){for(var n=0;n<t.length;n++){const r=t[n];if(typeof r!="string"&&!Array.isArray(r)){for(const o in r)if(o!=="default"&&!(o in e)){const i=Object.getOwnPropertyDescriptor(r,o);i&&Object.defineProperty(e,o,i.get?i:{enumerable:!0,get:()=>r[o]})}}}return Object.freeze(Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}))}var g={exports:{}},v={},C={exports:{}},u={};/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var y=Symbol.for("react.element"),q=Symbol.for("react.portal"),M=Symbol.for("react.fragment"),z=Symbol.for("react.strict_mode"),B=Symbol.for("react.profiler"),H=Symbol.for("react.provider"),J=Symbol.for("react.context"),W=Symbol.for("react.forward_ref"),Y=Symbol.for("react.suspense"),G=Symbol.for("react.memo"),K=Symbol.for("react.lazy"),k=Symbol.iterator;function Q(e){return e===null||typeof e!="object"?null:(e=k&&e[k]||e["@@iterator"],typeof e=="function"?e:null)}var P={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},D=Object.assign,I={};function p(e,t,n){this.props=e,this.context=t,this.refs=I,this.updater=n||P}p.prototype.isReactComponent={};p.prototype.setState=function(e,t){if(typeof e!="object"&&typeof e!="function"&&e!=null)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,e,t,"setState")};p.prototype.forceUpdate=function(e){this.updater.enqueueForceUpdate(this,e,"forceUpdate")};function T(){}T.prototype=p.prototype;function R(e,t,n){this.props=e,this.context=t,this.refs=I,this.updater=n||P}var E=R.prototype=new T;E.constructor=R;D(E,p.prototype);E.isPureReactComponent=!0;var w=Array.isArray,A=Object.prototype.hasOwnProperty,x={current:null},F={key:!0,ref:!0,__self:!0,__source:!0};function L(e,t,n){var r,o={},i=null,s=null;if(t!=null)for(r in t.ref!==void 0&&(s=t.ref),t.key!==void 0&&(i=""+t.key),t)A.call(t,r)&&!F.hasOwnProperty(r)&&(o[r]=t[r]);var f=arguments.length-2;if(f===1)o.children=n;else if(1<f){for(var c=Array(f),a=0;a<f;a++)c[a]=arguments[a+2];o.children=c}if(e&&e.defaultProps)for(r in f=e.defaultProps,f)o[r]===void 0&&(o[r]=f[r]);return{$$typeof:y,type:e,key:i,ref:s,props:o,_owner:x.current}}function X(e,t){return{$$typeof:y,type:e.type,key:t,ref:e.ref,props:e.props,_owner:e._owner}}function b(e){return typeof e=="object"&&e!==null&&e.$$typeof===y}function Z(e){var t={"=":"=0",":":"=2"};return"$"+e.replace(/[=:]/g,function(n){return t[n]})}var O=/\/+/g;function h(e,t){return typeof e=="object"&&e!==null&&e.key!=null?Z(""+e.key):t.toString(36)}function _(e,t,n,r,o){var i=typeof e;(i==="undefined"||i==="boolean")&&(e=null);var s=!1;if(e===null)s=!0;else switch(i){case"string":case"number":s=!0;break;case"object":switch(e.$$typeof){case y:case q:s=!0}}if(s)return s=e,o=o(s),e=r===""?"."+h(s,0):r,w(o)?(n="",e!=null&&(n=e.replace(O,"$&/")+"/"),_(o,t,n,"",function(a){return a})):o!=null&&(b(o)&&(o=X(o,n+(!o.key||s&&s.key===o.key?"":(""+o.key).replace(O,"$&/")+"/")+e)),t.push(o)),1;if(s=0,r=r===""?".":r+":",w(e))for(var f=0;f<e.length;f++){i=e[f];var c=r+h(i,f);s+=_(i,t,n,c,o)}else if(c=Q(e),typeof c=="function")for(e=c.call(e),f=0;!(i=e.next()).done;)i=i.value,c=r+h(i,f++),s+=_(i,t,n,c,o);else if(i==="object")throw t=String(e),Error("Objects are not valid as a React child (found: "+(t==="[object Object]"?"object with keys {"+Object.keys(e).join(", ")+"}":t)+"). If you meant to render a collection of children, use an array instead.");return s}function d(e,t,n){if(e==null)return e;var r=[],o=0;return _(e,r,"","",function(i){return t.call(n,i,o++)}),r}function ee(e){if(e._status===-1){var t=e._result;t=t(),t.then(function(n){(e._status===0||e._status===-1)&&(e._status=1,e._result=n)},function(n){(e._status===0||e._status===-1)&&(e._status=2,e._result=n)}),e._status===-1&&(e._status=0,e._result=t)}if(e._status===1)return e._result.default;throw e._result}var l={current:null},m={transition:null},te={ReactCurrentDispatcher:l,ReactCurrentBatchConfig:m,ReactCurrentOwner:x};u.Children={map:d,forEach:function(e,t,n){d(e,function(){t.apply(this,arguments)},n)},count:function(e){var t=0;return d(e,function(){t++}),t},toArray:function(e){return d(e,function(t){return t})||[]},only:function(e){if(!b(e))throw Error("React.Children.only expected to receive a single React element child.");return e}};u.Component=p;u.Fragment=M;u.Profiler=B;u.PureComponent=R;u.StrictMode=z;u.Suspense=Y;u.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=te;u.cloneElement=function(e,t,n){if(e==null)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+e+".");var r=D({},e.props),o=e.key,i=e.ref,s=e._owner;if(t!=null){if(t.ref!==void 0&&(i=t.ref,s=x.current),t.key!==void 0&&(o=""+t.key),e.type&&e.type.defaultProps)var f=e.type.defaultProps;for(c in t)A.call(t,c)&&!F.hasOwnProperty(c)&&(r[c]=t[c]===void 0&&f!==void 0?f[c]:t[c])}var c=arguments.length-2;if(c===1)r.children=n;else if(1<c){f=Array(c);for(var a=0;a<c;a++)f[a]=arguments[a+2];r.children=f}return{$$typeof:y,type:e.type,key:o,ref:i,props:r,_owner:s}};u.createContext=function(e){return e={$$typeof:J,_currentValue:e,_currentValue2:e,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null},e.Provider={$$typeof:H,_context:e},e.Consumer=e};u.createElement=L;u.createFactory=function(e){var t=L.bind(null,e);return t.type=e,t};u.createRef=function(){return{current:null}};u.forwardRef=function(e){return{$$typeof:W,render:e}};u.isValidElement=b;u.lazy=function(e){return{$$typeof:K,_payload:{_status:-1,_result:e},_init:ee}};u.memo=function(e,t){return{$$typeof:G,type:e,compare:t===void 0?null:t}};u.startTransition=function(e){var t=m.transition;m.transition={};try{e()}finally{m.transition=t}};u.unstable_act=function(){throw Error("act(...) is not supported in production builds of React.")};u.useCallback=function(e,t){return l.current.useCallback(e,t)};u.useContext=function(e){return l.current.useContext(e)};u.useDebugValue=function(){};u.useDeferredValue=function(e){return l.current.useDeferredValue(e)};u.useEffect=function(e,t){return l.current.useEffect(e,t)};u.useId=function(){return l.current.useId()};u.useImperativeHandle=function(e,t,n){return l.current.useImperativeHandle(e,t,n)};u.useInsertionEffect=function(e,t){return l.current.useInsertionEffect(e,t)};u.useLayoutEffect=function(e,t){return l.current.useLayoutEffect(e,t)};u.useMemo=function(e,t){return l.current.useMemo(e,t)};u.useReducer=function(e,t,n){return l.current.useReducer(e,t,n)};u.useRef=function(e){return l.current.useRef(e)};u.useState=function(e){return l.current.useState(e)};u.useSyncExternalStore=function(e,t,n){return l.current.useSyncExternalStore(e,t,n)};u.useTransition=function(){return l.current.useTransition()};u.version="18.2.0";C.exports=u;var $=C.exports;const re=S($),ye=V({__proto__:null,default:re},[$]);/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var ne=$,oe=Symbol.for("react.element"),ue=Symbol.for("react.fragment"),ie=Object.prototype.hasOwnProperty,se=ne.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,ce={key:!0,ref:!0,__self:!0,__source:!0};function N(e,t,n){var r,o={},i=null,s=null;n!==void 0&&(i=""+n),t.key!==void 0&&(i=""+t.key),t.ref!==void 0&&(s=t.ref);for(r in t)ie.call(t,r)&&!ce.hasOwnProperty(r)&&(o[r]=t[r]);if(e&&e.defaultProps)for(r in t=e.defaultProps,t)o[r]===void 0&&(o[r]=t[r]);return{$$typeof:oe,type:e,key:i,ref:s,props:o,_owner:se.current}}v.Fragment=ue;v.jsx=N;v.jsxs=N;g.exports=v;var fe=g.exports;const de=S(fe);var U={exports:{}},j={};/**
 * @license React
 * react-jsx-dev-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var le=Symbol.for("react.fragment");j.Fragment=le;j.jsxDEV=void 0;U.exports=j;var ae=U.exports;const _e=S(ae);export{re as R,ye as a,fe as j,de as l,$ as r,_e as s};