import{z as b,r,c as w,y as g,C as S,j as e,B as c,S as k,T as d,H as $,L as n,O as y,e as T,E as I}from"./index-UE1IyaiS.js";import{N as E}from"./NestedLayoutsSpinner-HVJgjC0Z.js";import{T as A,a as L,b as l,c as P}from"./chunk-IAXSQ4X2-BC_-S_Oj.js";function B(){const{id:t}=b(),[s,u]=r.useState(null),[x,h]=r.useState(""),[f,m]=r.useState(!0),{user:a}=w(),[j,o]=r.useState(0),{pathname:p}=g();return r.useEffect(()=>{(()=>{switch(p){case`/profile/${t}`:o(0);break;case`/profile/${t}/bookmarks`:o(1);break;case`/profile/${t}/followers`:o(2);break;case`/profile/${t}/following`:o(3);break;case`/profile/${t}/about`:o(4);break}})(),S.get(`/api/users/${t}`,{withCredentials:!1}).then(i=>i.data).then(i=>{if(i.error)return h(i.error);u(i.data)}).catch(()=>h("Internal server error")).finally(()=>m(!1))},[t,p]),e.jsxs(c,{minH:"100vh",display:"flex",alignItems:"start",p:"0",children:[e.jsx(c,{w:"68vw",p:"12",mt:"16",children:f?e.jsx(k,{}):x?e.jsx(d,{color:"red.600",textAlign:"center",fontSize:"lg",fontWeight:"medium",children:x}):e.jsxs(e.Fragment,{children:[e.jsx($,{children:s==null?void 0:s.fullname}),e.jsxs(A,{size:"sm",mt:"8",defaultIndex:j,children:[e.jsxs(L,{overflowY:"hidden",height:"full",children:[e.jsx(n,{to:`/profile/${t}/publications`,children:e.jsx(l,{py:"2",whiteSpace:"nowrap",m:"0",children:"Publications"})}),(s==null?void 0:s._id)===(a==null?void 0:a._id)?e.jsx(n,{to:`/profile/${t}/bookmarks`,children:e.jsx(l,{py:"2",whiteSpace:"nowrap",m:"0",children:"Bookmarks"})}):null,e.jsx(n,{to:`/profile/${t}/followers`,children:e.jsx(l,{py:"2",whiteSpace:"nowrap",m:"0",children:"Followers"})}),e.jsx(n,{to:`/profile/${t}/following`,children:e.jsx(l,{py:"2",whiteSpace:"nowrap",m:"0",children:"Following"})}),e.jsx(n,{to:`/profile/${t}/about`,children:e.jsx(l,{py:"2",whiteSpace:"nowrap",m:"0",children:"About"})})]}),e.jsx(P,{py:"10",children:e.jsx(r.Suspense,{fallback:e.jsx(E,{}),children:e.jsx(y,{})})})]})]})}),e.jsxs(c,{mt:"16",px:"12",pt:"16",children:[e.jsx(T,{src:s==null?void 0:s.profilePicture,w:"90px",h:"90px",objectFit:"cover",rounded:"full"}),e.jsx(d,{fontWeight:"bold",mt:"5",mb:"8",children:s==null?void 0:s.fullname}),s&&(a==null?void 0:a._id)!==(s==null?void 0:s._id)?e.jsx(I,{authorID:s._id}):e.jsx(n,{to:"/settings",children:e.jsx(d,{color:"teal.500",fontSize:"sm",textDecoration:"underline",children:"Edit profile"})})]})]})}export{B as default};
