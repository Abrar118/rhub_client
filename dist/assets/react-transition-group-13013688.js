import{u as O,v as D,w as A}from"./@babel-2cccee12.js";import{a as $,r as M}from"./dom-helpers-9a525042.js";import{R as h}from"./react-ee2054f5.js";import{R as g}from"./react-dom-20ffc32d.js";const b={disabled:!1},R=h.createContext(null);var k=function(l){return l.scrollTop},C="unmounted",E="exited",v="entering",x="entered",S="exiting",d=function(f){O(l,f);function l(t,s){var e;e=f.call(this,t,s)||this;var r=s,n=r&&!r.isMounting?t.enter:t.appear,i;return e.appearStatus=null,t.in?n?(i=E,e.appearStatus=v):i=x:t.unmountOnExit||t.mountOnEnter?i=C:i=E,e.state={status:i},e.nextCallback=null,e}l.getDerivedStateFromProps=function(s,e){var r=s.in;return r&&e.status===C?{status:E}:null};var o=l.prototype;return o.componentDidMount=function(){this.updateStatus(!0,this.appearStatus)},o.componentDidUpdate=function(s){var e=null;if(s!==this.props){var r=this.state.status;this.props.in?r!==v&&r!==x&&(e=v):(r===v||r===x)&&(e=S)}this.updateStatus(!1,e)},o.componentWillUnmount=function(){this.cancelNextCallback()},o.getTimeouts=function(){var s=this.props.timeout,e,r,n;return e=r=n=s,s!=null&&typeof s!="number"&&(e=s.exit,r=s.enter,n=s.appear!==void 0?s.appear:r),{exit:e,enter:r,appear:n}},o.updateStatus=function(s,e){if(s===void 0&&(s=!1),e!==null)if(this.cancelNextCallback(),e===v){if(this.props.unmountOnExit||this.props.mountOnEnter){var r=this.props.nodeRef?this.props.nodeRef.current:g.findDOMNode(this);r&&k(r)}this.performEnter(s)}else this.performExit();else this.props.unmountOnExit&&this.state.status===E&&this.setState({status:C})},o.performEnter=function(s){var e=this,r=this.props.enter,n=this.context?this.context.isMounting:s,i=this.props.nodeRef?[n]:[g.findDOMNode(this),n],a=i[0],p=i[1],u=this.getTimeouts(),c=n?u.appear:u.enter;if(!s&&!r||b.disabled){this.safeSetState({status:x},function(){e.props.onEntered(a)});return}this.props.onEnter(a,p),this.safeSetState({status:v},function(){e.props.onEntering(a,p),e.onTransitionEnd(c,function(){e.safeSetState({status:x},function(){e.props.onEntered(a,p)})})})},o.performExit=function(){var s=this,e=this.props.exit,r=this.getTimeouts(),n=this.props.nodeRef?void 0:g.findDOMNode(this);if(!e||b.disabled){this.safeSetState({status:E},function(){s.props.onExited(n)});return}this.props.onExit(n),this.safeSetState({status:S},function(){s.props.onExiting(n),s.onTransitionEnd(r.exit,function(){s.safeSetState({status:E},function(){s.props.onExited(n)})})})},o.cancelNextCallback=function(){this.nextCallback!==null&&(this.nextCallback.cancel(),this.nextCallback=null)},o.safeSetState=function(s,e){e=this.setNextCallback(e),this.setState(s,e)},o.setNextCallback=function(s){var e=this,r=!0;return this.nextCallback=function(n){r&&(r=!1,e.nextCallback=null,s(n))},this.nextCallback.cancel=function(){r=!1},this.nextCallback},o.onTransitionEnd=function(s,e){this.setNextCallback(e);var r=this.props.nodeRef?this.props.nodeRef.current:g.findDOMNode(this),n=s==null&&!this.props.addEndListener;if(!r||n){setTimeout(this.nextCallback,0);return}if(this.props.addEndListener){var i=this.props.nodeRef?[this.nextCallback]:[r,this.nextCallback],a=i[0],p=i[1];this.props.addEndListener(a,p)}s!=null&&setTimeout(this.nextCallback,s)},o.render=function(){var s=this.state.status;if(s===C)return null;var e=this.props,r=e.children;e.in,e.mountOnEnter,e.unmountOnExit,e.appear,e.enter,e.exit,e.timeout,e.addEndListener,e.onEnter,e.onEntering,e.onEntered,e.onExit,e.onExiting,e.onExited,e.nodeRef;var n=D(e,["children","in","mountOnEnter","unmountOnExit","appear","enter","exit","timeout","addEndListener","onEnter","onEntering","onEntered","onExit","onExiting","onExited","nodeRef"]);return h.createElement(R.Provider,{value:null},typeof r=="function"?r(s,n):h.cloneElement(h.Children.only(r),n))},l}(h.Component);d.contextType=R;d.propTypes={};function m(){}d.defaultProps={in:!1,mountOnEnter:!1,unmountOnExit:!1,appear:!1,enter:!0,exit:!0,onEnter:m,onEntering:m,onEntered:m,onExit:m,onExiting:m,onExited:m};d.UNMOUNTED=C;d.EXITED=E;d.ENTERING=v;d.ENTERED=x;d.EXITING=S;const I=d;var L=function(l,o){return l&&o&&o.split(" ").forEach(function(t){return $(l,t)})},N=function(l,o){return l&&o&&o.split(" ").forEach(function(t){return M(l,t)})},T=function(f){O(l,f);function l(){for(var t,s=arguments.length,e=new Array(s),r=0;r<s;r++)e[r]=arguments[r];return t=f.call.apply(f,[this].concat(e))||this,t.appliedClasses={appear:{},enter:{},exit:{}},t.onEnter=function(n,i){var a=t.resolveArguments(n,i),p=a[0],u=a[1];t.removeClasses(p,"exit"),t.addClass(p,u?"appear":"enter","base"),t.props.onEnter&&t.props.onEnter(n,i)},t.onEntering=function(n,i){var a=t.resolveArguments(n,i),p=a[0],u=a[1],c=u?"appear":"enter";t.addClass(p,c,"active"),t.props.onEntering&&t.props.onEntering(n,i)},t.onEntered=function(n,i){var a=t.resolveArguments(n,i),p=a[0],u=a[1],c=u?"appear":"enter";t.removeClasses(p,c),t.addClass(p,c,"done"),t.props.onEntered&&t.props.onEntered(n,i)},t.onExit=function(n){var i=t.resolveArguments(n),a=i[0];t.removeClasses(a,"appear"),t.removeClasses(a,"enter"),t.addClass(a,"exit","base"),t.props.onExit&&t.props.onExit(n)},t.onExiting=function(n){var i=t.resolveArguments(n),a=i[0];t.addClass(a,"exit","active"),t.props.onExiting&&t.props.onExiting(n)},t.onExited=function(n){var i=t.resolveArguments(n),a=i[0];t.removeClasses(a,"exit"),t.addClass(a,"exit","done"),t.props.onExited&&t.props.onExited(n)},t.resolveArguments=function(n,i){return t.props.nodeRef?[t.props.nodeRef.current,n]:[n,i]},t.getClassNames=function(n){var i=t.props.classNames,a=typeof i=="string",p=a&&i?i+"-":"",u=a?""+p+n:i[n],c=a?u+"-active":i[n+"Active"],_=a?u+"-done":i[n+"Done"];return{baseClassName:u,activeClassName:c,doneClassName:_}},t}var o=l.prototype;return o.addClass=function(s,e,r){var n=this.getClassNames(e)[r+"ClassName"],i=this.getClassNames("enter"),a=i.doneClassName;e==="appear"&&r==="done"&&a&&(n+=" "+a),r==="active"&&s&&k(s),n&&(this.appliedClasses[e][r]=n,L(s,n))},o.removeClasses=function(s,e){var r=this.appliedClasses[e],n=r.base,i=r.active,a=r.done;this.appliedClasses[e]={},n&&N(s,n),i&&N(s,i),a&&N(s,a)},o.render=function(){var s=this.props;s.classNames;var e=D(s,["classNames"]);return h.createElement(I,A({},e,{onEnter:this.onEnter,onEntered:this.onEntered,onEntering:this.onEntering,onExit:this.onExit,onExiting:this.onExiting,onExited:this.onExited}))},l}(h.Component);T.defaultProps={classNames:""};T.propTypes={};const X=T;export{X as C};
