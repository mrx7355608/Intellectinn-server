import{G as C,c as I,o as k,r as a,i as v,j as e,a as o,M,p as O,q as B,v as P,w as T,H as z,B as g,x as E,S as H,y as L,z as F,L as m,O as U}from"./index-Da3TbESE.js";import{N as V}from"./NestedLayoutsSpinner-BRpugm2I.js";import{T as A,a as _,b as h,c as G}from"./chunk-IAXSQ4X2-CGKlLYOM.js";function N(t){return C({tag:"svg",attr:{viewBox:"0 0 448 512"},child:[{tag:"path",attr:{d:"M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z"},child:[]}]})(t)}function R(){const{user:t,setUser:d}=I(),{isOpen:f,onOpen:u,onClose:r}=k(),[c,l]=a.useState(["Web development","Software Engineering","Software development","Politics","Economy","Psychology","Computer Science","Apex legends","Counter Strike 2","Literatue","Reading","Poetry"]),[n,p]=a.useState(t.topicsInterestedIn),[b,j]=a.useState(!1),x=v({isClosable:!0,duration:4e3});return e.jsxs(e.Fragment,{children:[e.jsx(o,{size:"sm",bg:"transparent",w:"ful",onClick:u,children:e.jsx(N,{})}),e.jsxs(M,{isOpen:f,onClose:r,isCentered:!0,motionPreset:"slideInBottom",size:"xl",closeOnOverlayClick:!1,closeOnEsc:!1,children:[e.jsx(O,{}),e.jsxs(B,{children:[e.jsx(P,{}),e.jsxs(T,{children:[e.jsx(z,{textAlign:"center",mt:"8",fontSize:"2xl",children:"Select your interests"}),e.jsx(g,{display:"flex",gap:"2",flexWrap:"wrap",my:"12",children:c.map(s=>n!=null&&n.includes(s)?e.jsx(o,{variant:"outline",rounded:"full",color:"white",borderColor:"black",bg:"black",onClick:()=>y(s),_hover:{bg:"black",color:"white"},children:s},s):e.jsx(o,{variant:"outline",rounded:"full",color:"black",borderColor:"black",onClick:()=>S(s),children:s},s))})]}),e.jsxs(E,{children:[b?e.jsx(o,{colorScheme:"teal",mr:3,children:e.jsx(H,{})}):e.jsx(o,{colorScheme:"teal",mr:3,onClick:w,children:"Update"}),e.jsx(o,{onClick:r,children:"Cancel"})]})]})]})]});function S(s){p([...n,s])}function y(s){p(n.filter(i=>i!==s))}async function w(){try{j(!0);const{data:s,error:i}=await L({topicsInterestedIn:n});if(i)return x({description:i,status:"error"});p(s.topicsInterestedIn),d({...t,topicsInterestedIn:s.topicsInterestedIn}),x({description:"Interests updated successfully",status:"success"}),r()}catch{x({description:"Internal server error",status:"error"})}finally{j(!1)}}}function Y(){const{user:t}=I(),[d,f]=F(),[u,r]=a.useState(0),c=d.get("tag");return a.useEffect(()=>{if(!c)return r(0);const l=(t==null?void 0:t.topicsInterestedIn.findIndex(n=>n===c))||0;r(l+1)},[c,t==null?void 0:t.topicsInterestedIn]),e.jsx(g,{w:"70vw",p:"12",mx:"auto",children:e.jsxs(A,{size:"sm",mt:"12",index:u,children:[e.jsxs(_,{overflowY:"hidden",height:"full",children:[e.jsx(m,{to:"/user",children:e.jsx(h,{py:"2",whiteSpace:"nowrap",m:"0",children:"For you"})}),t.topicsInterestedIn.map(l=>e.jsx(m,{to:`/user?tag=${l}`,children:e.jsx(h,{py:"2",whiteSpace:"nowrap",m:"0",children:l})})),e.jsx(h,{children:e.jsx(R,{})})]}),e.jsx(G,{py:"10",children:e.jsx(a.Suspense,{fallback:e.jsx(V,{}),children:e.jsx(U,{})})})]})})}export{Y as default};
