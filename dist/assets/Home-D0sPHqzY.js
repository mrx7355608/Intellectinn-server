import{j as e,B as t,H as s,T as n,a,u as l,S as c,A as d}from"./index-VH6P-EdL.js";function x(){return e.jsxs(t,{backgroundImage:"/hero.jpg",backgroundRepeat:"no-repeat",backgroundBlendMode:"darken",backgroundPosition:"center",display:"flex",flexDir:"column",justifyContent:"center",alignItems:"start",p:"14",h:"100vh",borderBottom:"1px",color:"black",children:[e.jsx(s,{ml:"14",fontSize:"7xl",fontWeight:"medium",children:"Stay curious."}),e.jsx(n,{lineHeight:"1.1",mt:"2",ml:"14",fontSize:"2xl",w:"40ch",children:"Discover stories, thinking, and expertise from writers on any topic."}),e.jsx(a,{ml:"14",rounded:"full",colorScheme:"yellow",px:"9",py:"0",pb:"0.5",mt:"12",children:"Start reading"})]})}function m(){const{loading:o,err:r,data:i}=l("/api/articles/published");return e.jsxs(e.Fragment,{children:[e.jsx(x,{}),e.jsx(t,{p:"12",children:o?e.jsx(c,{}):r?e.jsx(n,{color:"red.600",children:r}):e.jsx(d,{articles:i})})]})}export{m as default};
