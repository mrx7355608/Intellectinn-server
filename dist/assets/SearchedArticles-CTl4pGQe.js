import{m as o,j as r,S as c,T as m}from"./index-BXO2U9-f.js";import{A as p}from"./ArticlesList-Bc_vmPO8.js";import{u as n}from"./useFetch-CeuB9ZpQ.js";import"./articles-B-sUejwn.js";import"./chunk-4FCEGNGT-CG7Dy87b.js";import"./chunk-5FG5SY5K-B8F0U4Ps.js";import"./chunk-AXLEE3EK-TN3R7wDi.js";import"./chunk-W7WUSNWJ-C1sVHxv3.js";function A(){const[s,l]=o(),e=s.get("query"),{loading:a,err:t,data:i}=n(`/api/articles/search?articles=${e}`);return r.jsx(r.Fragment,{children:a?r.jsx(c,{}):t?r.jsx(m,{color:"red.600",children:t}):r.jsx(p,{articles:i})})}export{A as default};
