import{K as C,u as I,O as v,r as o,F as E,j as e,b as a,P,Q as T,R as B,W as M,X as O,H as F,B as b,Y as H,S as L,Z as z,_ as A,L as m,$ as U}from"./index-CsVsQMYP.js";import{N as V}from"./NestedLayoutsSpinner-G76rA87c.js";import{E as _,F as R}from"./FallbackUI-D-cl_7a3.js";import{T as W,a as D,b as p,c as N}from"./chunk-IAXSQ4X2-HPL_bb-G.js";function Y(t){return C({tag:"svg",attr:{viewBox:"0 0 448 512"},child:[{tag:"path",attr:{d:"M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z"},child:[]}]})(t)}function $(){const{user:t,updateInterests:d}=I(),{isOpen:h,onOpen:u,onClose:r}=v(),[l,c]=o.useState(["Web development","Software Engineering","Software development","Politics","Economy","Psychology","Computer Science","Apex legends","Counter Strike 2","Literatue","Reading","Poetry"]),[n,x]=o.useState(t.topicsInterestedIn),[g,f]=o.useState(!1),{showErrorToast:j,showSuccessToast:S}=E();return e.jsxs(e.Fragment,{children:[e.jsx(a,{size:"sm",bg:"transparent",w:"ful",onClick:u,children:e.jsx(Y,{})}),e.jsxs(P,{isOpen:h,onClose:r,isCentered:!0,motionPreset:"slideInBottom",size:"xl",closeOnOverlayClick:!1,closeOnEsc:!1,children:[e.jsx(T,{}),e.jsxs(B,{children:[e.jsx(M,{}),e.jsxs(O,{children:[e.jsx(F,{textAlign:"center",mt:"8",fontSize:"2xl",children:"Select your interests"}),e.jsx(b,{display:"flex",gap:"2",flexWrap:"wrap",my:"12",children:l.map(s=>n!=null&&n.includes(s)?e.jsx(a,{variant:"outline",rounded:"full",color:"white",borderColor:"black",bg:"black",onClick:()=>w(s),_hover:{bg:"black",color:"white"},children:s},s):e.jsx(a,{variant:"outline",rounded:"full",color:"black",borderColor:"black",onClick:()=>y(s),children:s},s))})]}),e.jsxs(H,{children:[g?e.jsx(a,{colorScheme:"teal",mr:3,children:e.jsx(L,{})}):e.jsx(a,{colorScheme:"teal",mr:3,onClick:k,children:"Update"}),e.jsx(a,{onClick:r,children:"Cancel"})]})]})]})]});function y(s){x([...n,s])}function w(s){x(n.filter(i=>i!==s))}async function k(){try{f(!0);const{data:s,error:i}=await z({topicsInterestedIn:n});if(i)return j(i);x(s.topicsInterestedIn),d(s.topicsInterestedIn),S("Interests updated successfully"),r()}catch{j("Internal server error")}finally{f(!1)}}}function Z(){const{user:t}=I(),[d,h]=A(),[u,r]=o.useState(0),l=d.get("tag");return o.useEffect(()=>{if(!l)return r(0);const c=(t==null?void 0:t.topicsInterestedIn.findIndex(n=>n===l))||0;r(c+1)},[l,t==null?void 0:t.topicsInterestedIn]),e.jsx(b,{w:"70vw",p:"12",mx:"auto",children:e.jsxs(W,{size:"sm",mt:"12",index:u,children:[e.jsxs(D,{overflowY:"hidden",height:"full",children:[e.jsx(m,{to:"/user",children:e.jsx(p,{py:"2",whiteSpace:"nowrap",m:"0",children:"For you"})}),t.topicsInterestedIn.map(c=>e.jsx(m,{to:`/user?tag=${c}`,children:e.jsx(p,{py:"2",whiteSpace:"nowrap",m:"0",children:c})})),e.jsx(p,{children:e.jsx($,{})})]}),e.jsx(_,{fallback:e.jsx(R,{}),children:e.jsx(N,{py:"10",children:e.jsx(o.Suspense,{fallback:e.jsx(V,{}),children:e.jsx(U,{})})})})]})})}export{Z as default};
