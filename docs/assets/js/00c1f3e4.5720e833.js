"use strict";(self.webpackChunkguide_github_action_renovate=self.webpackChunkguide_github_action_renovate||[]).push([[553],{894:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>u,contentTitle:()=>o,default:()=>g,frontMatter:()=>a,metadata:()=>l,toc:()=>p});var n=r(8168),i=(r(6540),r(5680));const a={sidebar_position:400},o="Settings for Personal Project",l={unversionedId:"settings-personal-project",id:"settings-personal-project",title:"Settings for Personal Project",description:"Repository Setting",source:"@site/docs/settings-personal-project.md",sourceDirName:".",slug:"/settings-personal-project",permalink:"/guide-github-action-renovate/settings-personal-project",draft:!1,editUrl:"https://github.com/suzuki-shunsuke/guide-github-action-renovate/edit/main/docs/settings-personal-project.md",tags:[],version:"current",sidebarPosition:400,frontMatter:{sidebar_position:400},sidebar:"tutorialSidebar",previous:{title:"Guide",permalink:"/guide-github-action-renovate/guide"},next:{title:"Settings for Team Development",permalink:"/guide-github-action-renovate/settings-team-development"}},u={},p=[{value:"Repository Setting",id:"repository-setting",level:2},{value:"Branch Protection Rule",id:"branch-protection-rule",level:2},{value:"GitHub App",id:"github-app",level:2},{value:"GitHub Actions Workflow",id:"github-actions-workflow",level:2}],s={toc:p},c="wrapper";function g(e){let{components:t,...r}=e;return(0,i.yg)(c,(0,n.A)({},s,r,{components:t,mdxType:"MDXLayout"}),(0,i.yg)("h1",{id:"settings-for-personal-project"},"Settings for Personal Project"),(0,i.yg)("h2",{id:"repository-setting"},"Repository Setting"),(0,i.yg)("ul",null,(0,i.yg)("li",{parentName:"ul"},"Allow auto-merge")),(0,i.yg)("h2",{id:"branch-protection-rule"},"Branch Protection Rule"),(0,i.yg)("ul",null,(0,i.yg)("li",{parentName:"ul"},(0,i.yg)("inlineCode",{parentName:"li"},"main"),(0,i.yg)("ul",{parentName:"li"},(0,i.yg)("li",{parentName:"ul"},(0,i.yg)("inlineCode",{parentName:"li"},"Require a pull request before merging")),(0,i.yg)("li",{parentName:"ul"},(0,i.yg)("inlineCode",{parentName:"li"},"Require status checks to pass before merging"),(0,i.yg)("ul",{parentName:"li"},(0,i.yg)("li",{parentName:"ul"},(0,i.yg)("inlineCode",{parentName:"li"},"Status checks that are required."),": ",(0,i.yg)("inlineCode",{parentName:"li"},"status-check")))),(0,i.yg)("li",{parentName:"ul"},(0,i.yg)("inlineCode",{parentName:"li"},"Do not allow bypassing the above settings"))))),(0,i.yg)("h2",{id:"github-app"},"GitHub App"),(0,i.yg)("p",null,"Create a GitHub App to push commits, approve a pull request, and enable auto-merge."),(0,i.yg)("ul",null,(0,i.yg)("li",{parentName:"ul"},"Permissions",(0,i.yg)("ul",{parentName:"li"},(0,i.yg)("li",{parentName:"ul"},(0,i.yg)("inlineCode",{parentName:"li"},"contents: write"),(0,i.yg)("ul",{parentName:"li"},(0,i.yg)("li",{parentName:"ul"},"Push a commit to a pull request"),(0,i.yg)("li",{parentName:"ul"},"Enable automerge"))),(0,i.yg)("li",{parentName:"ul"},(0,i.yg)("inlineCode",{parentName:"li"},"pull-requests: write"),(0,i.yg)("ul",{parentName:"li"},(0,i.yg)("li",{parentName:"ul"},"Enable automerge"),(0,i.yg)("li",{parentName:"ul"},"Approve a pull request")))))),(0,i.yg)("h2",{id:"github-actions-workflow"},"GitHub Actions Workflow"),(0,i.yg)("p",null,"Create two workflows."),(0,i.yg)("ul",null,(0,i.yg)("li",{parentName:"ul"},(0,i.yg)("inlineCode",{parentName:"li"},"test"),": ",(0,i.yg)("a",{parentName:"li",href:"https://github.com/aquaproj/example-update-checksum-public/blob/main/.github/workflows/test.yaml"},"example")),(0,i.yg)("li",{parentName:"ul"},(0,i.yg)("inlineCode",{parentName:"li"},"actionlint"),": ",(0,i.yg)("a",{parentName:"li",href:"https://github.com/suzuki-shunsuke/tfcmt/blob/main/.github/workflows/actionlint.yaml"},"example"))))}g.isMDXComponent=!0},5680:(e,t,r)=>{r.d(t,{xA:()=>s,yg:()=>y});var n=r(6540);function i(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function a(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function o(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?a(Object(r),!0).forEach((function(t){i(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):a(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function l(e,t){if(null==e)return{};var r,n,i=function(e,t){if(null==e)return{};var r,n,i={},a=Object.keys(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||(i[r]=e[r]);return i}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(i[r]=e[r])}return i}var u=n.createContext({}),p=function(e){var t=n.useContext(u),r=t;return e&&(r="function"==typeof e?e(t):o(o({},t),e)),r},s=function(e){var t=p(e.components);return n.createElement(u.Provider,{value:t},e.children)},c="mdxType",g={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},m=n.forwardRef((function(e,t){var r=e.components,i=e.mdxType,a=e.originalType,u=e.parentName,s=l(e,["components","mdxType","originalType","parentName"]),c=p(r),m=i,y=c["".concat(u,".").concat(m)]||c[m]||g[m]||a;return r?n.createElement(y,o(o({ref:t},s),{},{components:r})):n.createElement(y,o({ref:t},s))}));function y(e,t){var r=arguments,i=t&&t.mdxType;if("string"==typeof e||i){var a=r.length,o=new Array(a);o[0]=m;var l={};for(var u in t)hasOwnProperty.call(t,u)&&(l[u]=t[u]);l.originalType=e,l[c]="string"==typeof e?e:i,o[1]=l;for(var p=2;p<a;p++)o[p]=r[p];return n.createElement.apply(null,o)}return n.createElement.apply(null,r)}m.displayName="MDXCreateElement"}}]);