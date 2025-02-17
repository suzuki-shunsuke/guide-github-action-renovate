"use strict";(self.webpackChunkguide_github_action_renovate=self.webpackChunkguide_github_action_renovate||[]).push([[539],{1636:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>u,contentTitle:()=>i,default:()=>g,frontMatter:()=>a,metadata:()=>l,toc:()=>p});var r=n(8168),o=(n(6540),n(5680));const a={sidebar_position:600},i="Changelog",l={unversionedId:"changelog",id:"changelog",title:"Changelog",description:"2023-04-05",source:"@site/docs/changelog.md",sourceDirName:".",slug:"/changelog",permalink:"/guide-github-action-renovate/changelog",draft:!1,editUrl:"https://github.com/suzuki-shunsuke/guide-github-action-renovate/edit/main/docs/changelog.md",tags:[],version:"current",sidebarPosition:600,frontMatter:{sidebar_position:600},sidebar:"tutorialSidebar",previous:{title:"Settings for Team Development",permalink:"/guide-github-action-renovate/settings-team-development"}},u={},p=[{value:"2023-04-05",id:"2023-04-05",level:2},{value:"2023-02-21",id:"2023-02-21",level:2},{value:"Merge <code>renovate</code> workflow to <code>one</code> workflow",id:"merge-renovate-workflow-to-one-workflow",level:3},{value:"GitHub Apps permissions: <code>workflows: write</code> is required to update GitHub Actions Workflows",id:"github-apps-permissions-workflows-write-is-required-to-update-github-actions-workflows",level:3},{value:"Support updating branch by pull request comment",id:"support-updating-branch-by-pull-request-comment",level:3}],s={toc:p},c="wrapper";function g(e){let{components:t,...n}=e;return(0,o.yg)(c,(0,r.A)({},s,n,{components:t,mdxType:"MDXLayout"}),(0,o.yg)("h1",{id:"changelog"},"Changelog"),(0,o.yg)("h2",{id:"2023-04-05"},"2023-04-05"),(0,o.yg)("p",null,"Fix ",(0,o.yg)("inlineCode",{parentName:"p"},"renovate/*"),"'s branch protection rules.\nEnable ",(0,o.yg)("inlineCode",{parentName:"p"},"Allow force pushes")," to allow Renovate to rebase branches."),(0,o.yg)("h2",{id:"2023-02-21"},"2023-02-21"),(0,o.yg)("h3",{id:"merge-renovate-workflow-to-one-workflow"},"Merge ",(0,o.yg)("inlineCode",{parentName:"h3"},"renovate")," workflow to ",(0,o.yg)("inlineCode",{parentName:"h3"},"one")," workflow"),(0,o.yg)("p",null,(0,o.yg)("a",{parentName:"p",href:"https://github.com/suzuki-shunsuke/guide-github-action-renovate/pull/14"},"#14")," ",(0,o.yg)("a",{parentName:"p",href:"https://github.com/aquaproj/example-update-checksum/pull/162"},"aquaproj/example-update-checksum#162")),(0,o.yg)("p",null,"We created ",(0,o.yg)("inlineCode",{parentName:"p"},"renovate")," workflow before because we misunderstood the specification of GitHub Environment's Deployment branches.\nBut we found we can run GitHub Actions jobs with GitHub Actions Environment in ",(0,o.yg)("inlineCode",{parentName:"p"},"one")," workflow, so we merged ",(0,o.yg)("inlineCode",{parentName:"p"},"renovate")," workflow to ",(0,o.yg)("inlineCode",{parentName:"p"},"one")," workflow."),(0,o.yg)("h3",{id:"github-apps-permissions-workflows-write-is-required-to-update-github-actions-workflows"},"GitHub Apps permissions: ",(0,o.yg)("inlineCode",{parentName:"h3"},"workflows: write")," is required to update GitHub Actions Workflows"),(0,o.yg)("p",null,"If GitHub Apps doesn't have a permission ",(0,o.yg)("inlineCode",{parentName:"p"},"workflows: write"),", GitHub Apps can't enable auto-merge."),(0,o.yg)("blockquote",null,(0,o.yg)("p",{parentName:"blockquote"},"auto-merge was automatically disabled 8 minutes ago",(0,o.yg)("br",{parentName:"p"}),"\n","Tried to create or update workflow without ",(0,o.yg)("inlineCode",{parentName:"p"},"workflows")," permission")),(0,o.yg)("h3",{id:"support-updating-branch-by-pull-request-comment"},"Support updating branch by pull request comment"),(0,o.yg)("ul",null,(0,o.yg)("li",{parentName:"ul"},"Add a workflow ",(0,o.yg)("inlineCode",{parentName:"li"},"update-branch"))))}g.isMDXComponent=!0},5680:(e,t,n)=>{n.d(t,{xA:()=>s,yg:()=>m});var r=n(6540);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function a(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?a(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,r,o=function(e,t){if(null==e)return{};var n,r,o={},a=Object.keys(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var u=r.createContext({}),p=function(e){var t=r.useContext(u),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},s=function(e){var t=p(e.components);return r.createElement(u.Provider,{value:t},e.children)},c="mdxType",g={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},d=r.forwardRef((function(e,t){var n=e.components,o=e.mdxType,a=e.originalType,u=e.parentName,s=l(e,["components","mdxType","originalType","parentName"]),c=p(n),d=o,m=c["".concat(u,".").concat(d)]||c[d]||g[d]||a;return n?r.createElement(m,i(i({ref:t},s),{},{components:n})):r.createElement(m,i({ref:t},s))}));function m(e,t){var n=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var a=n.length,i=new Array(a);i[0]=d;var l={};for(var u in t)hasOwnProperty.call(t,u)&&(l[u]=t[u]);l.originalType=e,l[c]="string"==typeof e?e:o,i[1]=l;for(var p=2;p<a;p++)i[p]=n[p];return r.createElement.apply(null,i)}return r.createElement.apply(null,n)}d.displayName="MDXCreateElement"}}]);