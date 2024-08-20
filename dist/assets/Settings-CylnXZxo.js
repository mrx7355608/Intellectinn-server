import{c as T,m as M,r as u,g as z,j as e,B as o,T as r,M as L,n as k,o as R,p as B,q as O,t as F,I as H,e as j,v as I,a as d,S as D,h as A,w as N,H as E}from"./index-UE1IyaiS.js";import{T as _,a as q,b as W,c as Y}from"./chunk-IAXSQ4X2-BC_-S_Oj.js";function G(){const{user:a,setUser:m}=T(),{isOpen:g,onOpen:y,onClose:p}=M(),l=u.useRef(null),[h,w]=u.useState(""),[C,x]=u.useState(!1),c=z({duration:4e3,isClosable:!0});return e.jsxs(e.Fragment,{children:[e.jsxs(o,{children:[e.jsx(r,{onClick:y,cursor:"pointer",_hover:{textDecoration:"underline"},as:"span",children:"Update Profile picture"}),e.jsx(r,{fontSize:"sm",color:"gray.500",children:"Select a new profile picture"})]}),e.jsxs(L,{closeOnOverlayClick:!1,isOpen:g,onClose:p,children:[e.jsx(k,{}),e.jsxs(R,{children:[e.jsx(B,{children:"Update profile picture"}),e.jsx(O,{}),e.jsxs(F,{children:[e.jsx(H,{type:"file",display:"none",ref:l,onChange:U}),h?e.jsx(j,{objectFit:"cover",w:"150px",h:"150px",mx:"auto",rounded:"full",src:h}):e.jsx(j,{objectFit:"cover",w:"150px",h:"150px",mx:"auto",rounded:"full",src:a==null?void 0:a.profilePicture})]}),e.jsxs(I,{children:[e.jsx(d,{onClick:b,colorScheme:"pink",mr:3,children:"Select"}),e.jsx(d,{colorScheme:"teal",mr:3,onClick:v,children:C?e.jsx(D,{}):"Update"}),e.jsx(d,{variant:"ghost",onClick:p,children:"Cancel"})]})]})]})]});function b(){var s;(s=l.current)==null||s.click()}function S(s){if(!s)return"No image selected";const t=s.name.split("."),n=t[t.length-1].toLowerCase();return n!=="jpg"&&n!=="png"&&n!=="jpeg"?"Only jpg, png and jpeg image formats are allowed":s.size>2e6?"Thumbnail size should be less than 2 MB":null}function U(){var i;const s=(i=l.current)==null?void 0:i.files[0],t=S(s);if(t)return c({status:"error",description:t});const n=URL.createObjectURL(s);w(n)}async function v(){var s;x(!0);try{const t=(s=l.current)==null?void 0:s.files[0],i=(await A(t)).data.secure_url,{data:P,error:f}=await N({profilePicture:i});if(f)return c({status:"error",description:f});m({...a,profilePicture:P.profilePicture}),c({status:"success",description:"Profile picture updated successfully"})}catch{c({status:"error",description:"There was an error while updating your profile picture"})}finally{x(!1)}}}function Q(){return e.jsxs(o,{w:"68vw",pt:"14",mt:"16",mx:"auto",children:[e.jsx(E,{children:"Settings"}),e.jsxs(_,{size:"sm",mt:"7",children:[e.jsx(q,{overflowY:"hidden",height:"full",children:e.jsx(W,{py:"2",whiteSpace:"nowrap",m:"0",children:"Account"})}),e.jsxs(Y,{py:"8",children:[e.jsx(G,{}),e.jsxs(o,{mt:"5",children:[e.jsx(r,{children:"Update Bio"}),e.jsx(r,{fontSize:"sm",color:"gray.500",children:"Write about yourself and your expertise to attract audience"})]}),e.jsxs(o,{mt:"5",children:[e.jsx(r,{children:"Change Name"}),e.jsx(r,{fontSize:"sm",color:"gray.500",children:"Use your original name and avoid celebrities and fictional characters names"})]}),e.jsxs(o,{mt:"5",children:[e.jsx(r,{children:"Change Password"}),e.jsx(r,{fontSize:"sm",color:"gray.500",children:"Choose a new password to login to your account"})]}),e.jsxs(o,{mt:"5",children:[e.jsx(r,{color:"red.600",children:"Delete Account"}),e.jsx(r,{fontSize:"sm",color:"gray.500",children:"Delete your account and all of your content"})]})]})]})]})}export{Q as default};
