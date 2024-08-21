import{E as k,r as y,J as j,K as I,N as w,P as A,Q as F,R as M,U as P,W as L,X as R,j as m,Y as C,Z as S}from"./index-CRzpA9vF.js";function V(t){const{value:e,defaultValue:s,onChange:n,shouldUpdate:a=(i,T)=>i!==T}=t,l=k(n),c=k(a),[r,f]=y.useState(s),o=e!==void 0,d=o?e:r,v=k(i=>{const x=typeof i=="function"?i(d):i;c(d,x)&&(o||f(x),l(x))},[o,l,d,c]);return[d,v]}var[z,K,U,$]=j();function B(t){var e;const{defaultIndex:s,onChange:n,index:a,isManual:l,isLazy:c,lazyBehavior:r="unmount",orientation:f="horizontal",direction:o="ltr",...d}=t,[v,i]=y.useState(s??0),[T,x]=V({defaultValue:s??0,value:a,onChange:n});y.useEffect(()=>{a!=null&&i(a)},[a]);const h=U(),_=y.useId();return{id:`tabs-${(e=t.id)!=null?e:_}`,selectedIndex:T,focusedIndex:v,setSelectedIndex:x,setFocusedIndex:i,isManual:l,isLazy:c,lazyBehavior:r,orientation:f,descendants:h,direction:o,htmlProps:d}}var[H,g]=I({name:"TabsContext",errorMessage:"useTabsContext: `context` is undefined. Seems you forgot to wrap all tabs components within <Tabs />"});function J(t){const{focusedIndex:e,orientation:s,direction:n}=g(),a=K(),l=y.useCallback(c=>{const r=()=>{var u;const b=a.nextEnabled(e);b&&((u=b.node)==null||u.focus())},f=()=>{var u;const b=a.prevEnabled(e);b&&((u=b.node)==null||u.focus())},o=()=>{var u;const b=a.firstEnabled();b&&((u=b.node)==null||u.focus())},d=()=>{var u;const b=a.lastEnabled();b&&((u=b.node)==null||u.focus())},v=s==="horizontal",i=s==="vertical",T=c.key,x=n==="ltr"?"ArrowLeft":"ArrowRight",h=n==="ltr"?"ArrowRight":"ArrowLeft",p={[x]:()=>v&&f(),[h]:()=>v&&r(),ArrowDown:()=>i&&r(),ArrowUp:()=>i&&f(),Home:o,End:d}[T];p&&(c.preventDefault(),p(c))},[a,e,s,n]);return{...t,role:"tablist","aria-orientation":s,onKeyDown:w(t.onKeyDown,l)}}function Q(t){const{isDisabled:e=!1,isFocusable:s=!1,...n}=t,{setSelectedIndex:a,isManual:l,id:c,setFocusedIndex:r,selectedIndex:f}=g(),{index:o,register:d}=$({disabled:e&&!s}),v=o===f,i=()=>{a(o)},T=()=>{r(o),!l&&!(e&&s)&&a(o)};return{...A({...n,ref:F(d,t.ref),isDisabled:e,isFocusable:s,onClick:w(t.onClick,i)}),id:N(c,o),role:"tab",tabIndex:v?0:-1,type:"button","aria-selected":v,"aria-controls":E(c,o),onFocus:e?void 0:w(t.onFocus,T)}}var[W,se]=I({});function X(t){const e=g(),{id:s,selectedIndex:n}=e,l=M(t.children).map((c,r)=>y.createElement(W,{key:r,value:{isSelected:r===n,id:E(s,r),tabId:N(s,r),selectedIndex:n}},c));return{...t,children:l}}function N(t,e){return`${t}--tab-${e}`}function E(t,e){return`${t}--tabpanel-${e}`}var[Y,D]=I({name:"TabsStylesContext",errorMessage:`useTabsStyles returned is 'undefined'. Seems you forgot to wrap the components in "<Tabs />" `}),Z=P(function(e,s){const n=L("Tabs",e),{children:a,className:l,...c}=R(e),{htmlProps:r,descendants:f,...o}=B(c),d=y.useMemo(()=>o,[o]),{isFitted:v,...i}=r,T={position:"relative",...n.root};return m.jsx(z,{value:f,children:m.jsx(H,{value:d,children:m.jsx(Y,{value:n,children:m.jsx(C.div,{className:S("chakra-tabs",l),ref:s,...i,__css:T,children:a})})})})});Z.displayName="Tabs";var q=P(function(e,s){const n=J({...e,ref:s}),l={display:"flex",...D().tablist};return m.jsx(C.div,{...n,className:S("chakra-tabs__tablist",e.className),__css:l})});q.displayName="TabList";var G=P(function(e,s){const n=X(e),a=D();return m.jsx(C.div,{...n,width:"100%",ref:s,className:S("chakra-tabs__tab-panels",e.className),__css:a.tabpanels})});G.displayName="TabPanels";var O=P(function(e,s){const n=D(),a=Q({...e,ref:s}),l={outline:"0",display:"flex",alignItems:"center",justifyContent:"center",...n.tab};return m.jsx(C.button,{...a,className:S("chakra-tabs__tab",e.className),__css:l})});O.displayName="Tab";export{Z as T,q as a,O as b,G as c};