import{c as p,r as o,j as s,V as m,T as a,l as h,H as j,D as S,L}from"./index-D0EKj5s8.js";import{S as w,E,P as b,F as y,C as v}from"./ContinueWithGoogle-uM4BJzhi.js";function C(){const{setUser:d}=p(),[x,i]=o.useState(!1),[u,e]=o.useState(""),[l,f]=o.useState({email:"",password:""});return s.jsxs(m,{as:"form",onSubmit:g,w:"full",children:[u&&s.jsx(w,{error:u}),s.jsx(E,{onChangeHandler:c}),s.jsx(b,{onChangeHandler:c}),s.jsx(a,{cursor:"pointer",fontWeight:"medium",fontSize:"sm",ml:"auto",children:"Forgot password?"}),s.jsx(y,{buttonText:"Login",isLoading:x})]});function c(n){const{name:t,value:r}=n.target;f({...l,[t]:r})}async function g(n){n.preventDefault(),e(""),i(!0);try{const{data:t,error:r}=await h(l);if(r)return e(r);d(t)}catch{e("Internal server error")}finally{i(!1)}}}function I(){return s.jsxs(m,{w:"full",children:[s.jsx(j,{as:"h1",size:"lg",mb:"14",children:"Login to your account"}),s.jsx(C,{}),s.jsx(S,{my:"7"}),s.jsx(v,{}),s.jsxs(a,{mt:"4",children:["Not a member?"," ",s.jsx(L,{to:"/auth/signup",children:s.jsx(a,{as:"span",fontWeight:"medium",color:"teal",children:"Signup"})})]})]})}export{I as default};
