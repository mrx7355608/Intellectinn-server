import{z as h,r,C as l,j as e,B as p,H as i,L as c,O as d}from"./index-CdtYQegW.js";import{N as x}from"./NestedLayoutsSpinner-BtYJ4HCy.js";import{T as u,a as m,b as t,c as j}from"./chunk-IAXSQ4X2-De6VGN6f.js";function S(){const[s,y]=h(),[o,a]=r.useState(0),{pathname:n}=l();return r.useEffect(()=>{(()=>{switch(n){case"/search":a(0);break;case"/search/people":a(1);break;case"/search/topics":a(2);break}})()},[n,s]),e.jsxs(p,{mt:"12",p:"12",w:"70vw",mx:"auto",children:[e.jsx(i,{display:"inline",color:"#2d2d2d",children:"Results for"}),e.jsxs(i,{display:"inline",children:[" ",s.get("query")]}),e.jsxs(u,{size:"sm",mt:"8",index:o,children:[e.jsxs(m,{overflowY:"hidden",height:"full",children:[e.jsx(c,{to:`/search?query=${s.get("query")}`,children:e.jsx(t,{py:"2",whiteSpace:"nowrap",m:"0",children:"Articles"})}),e.jsx(c,{to:`/search/people?query=${s.get("query")}`,children:e.jsx(t,{py:"2",whiteSpace:"nowrap",m:"0",children:"People"})}),e.jsx(c,{to:`/search/topics?query=${s.get("query")}`,children:e.jsx(t,{py:"2",whiteSpace:"nowrap",m:"0",children:"Topics"})})]}),e.jsx(j,{py:"10",children:e.jsx(r.Suspense,{fallback:e.jsx(x,{}),children:e.jsx(d,{})})})]})]})}export{S as default};
