import{j as r,m as a}from"./index-Bsw5YMR-.js";function i({size:e=84,label:s="خطى"}){const t=typeof e=="number"?`${e}px`:e;return r.jsxs(a.div,{className:"logo-linear inline-block",initial:{scale:1},whileHover:{scale:1.04},transition:{type:"spring",stiffness:220,damping:20},role:"img","aria-label":s,title:s,style:{width:t,height:`calc(${t} * 0.6)`},children:[r.jsx("div",{className:"glass-card","aria-hidden":!0,children:r.jsxs("svg",{viewBox:"0 0 200 120",className:"w-full h-full",preserveAspectRatio:"xMidYMid meet",xmlns:"http://www.w3.org/2000/svg",children:[r.jsxs("defs",{children:[r.jsxs("linearGradient",{id:"lg1",x1:"0",x2:"1",children:[r.jsx("stop",{offset:"0%",stopColor:"#3b6daa",stopOpacity:"1"}),r.jsx("stop",{offset:"100%",stopColor:"#7bb39e",stopOpacity:"1"})]}),r.jsxs("linearGradient",{id:"lg2",x1:"0",x2:"1",children:[r.jsx("stop",{offset:"0%",stopColor:"#ffffff",stopOpacity:"0.08"}),r.jsx("stop",{offset:"100%",stopColor:"#ffffff",stopOpacity:"0.03"})]})]}),r.jsx("rect",{x:"6",y:"10",width:"188",height:"100",rx:"12",fill:"url(#lg1)",opacity:"0.22"}),r.jsx("rect",{x:"0",y:"0",width:"200",height:"120",rx:"14",fill:"url(#lg2)"}),r.jsxs("g",{transform:"translate(18,18)",children:[r.jsx("rect",{x:"0",y:"0",width:"48",height:"12",rx:"3",fill:"url(#lg1)",opacity:"0.92"}),r.jsx("rect",{x:"0",y:"24",width:"36",height:"8",rx:"3",fill:"#ffffff",opacity:"0.09"})]}),r.jsx("text",{x:"110",y:"70",textAnchor:"middle",fontSize:"40",fontWeight:"700",fill:"#3b6daa",fontFamily:"Tajawal, Poppins, Cairo, sans-serif",style:{letterSpacing:1},children:s})]})}),r.jsx("style",{children:`
        .logo-linear { cursor: default; }
        .glass-card {
          width: 100%; height: 100%; border-radius: 12px;
          background: linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0.02));
          box-shadow: 0 6px 18px rgba(43,108,176,0.09);
          backdrop-filter: blur(6px) saturate(120%);
          -webkit-backdrop-filter: blur(6px) saturate(120%);
          transition: box-shadow 220ms ease, transform 220ms ease, background 220ms ease;
          overflow: hidden;
        }
        .logo-linear:hover .glass-card {
          box-shadow: 0 18px 60px rgba(43,108,176,0.16);
          transform: translateY(-3px);
          background: linear-gradient(180deg, rgba(255,255,255,0.07), rgba(255,255,255,0.03));
        }
        .logo-linear svg text { filter: drop-shadow(0 2px 6px rgba(0,0,0,0.18)); }
        @media (prefers-reduced-motion: reduce) {
          .logo-linear { transition: none; }
          .logo-linear:hover .glass-card { transform: none; box-shadow: 0 8px 24px rgba(43,108,176,0.09); }
        }
      `})]})}export{i as L};
