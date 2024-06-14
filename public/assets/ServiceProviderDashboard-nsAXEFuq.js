import{_ as W,m as q,e as G,r as n,o as l,c as m,f as p,w as e,h as H,a as o,b as a,t as s,F as f,i as h,j as k,n as J}from"./index-CS9bw-lj.js";import{g as K}from"./initials.name.helper-Yu7jK3s_.js";import{u as w}from"./auth.serviceProvider.store-CZK-wxkT.js";import"./api.helper-X78EMQNg.js";const M={data(){return{drawer:!0}},mounted(){this.checkCookie(),this.closeDrawer()},computed:{...q(w,["isLoading","record"]),pagesList(){let t=[{title:this.$t("admin_navbar_links.users"),icon:"mdi-account-group-outline",key:"service_provider_users",roles:["admin"],pages:[[this.$t("admin_navbar_links.users"),"/service-provider/users"]]},{title:this.$t("admin_navbar_links.orders"),icon:"mdi-list-box-outline",key:"service_provider_orders",roles:["admin","staff"],pages:[[this.$t("admin_navbar_links.orders"),"/service-provider/orders"]]}];return t=t.filter(i=>i.roles.includes(this.record?.role.toLowerCase())),t}},methods:{...G(w,["checkCookie","logoutServiceProvider"]),getInitials:K,closeDrawer(){window.innerWidth<992&&(this.drawer=!1)}}},O=a("span",{class:"mdi mdi-24px mdi-view-dashboard"},null,-1),Q={class:"d-flex align-center ga-2"},R={class:"d-flex align-center ga-2"},T=a("span",{class:"mdi mdi-circle-outline mdi-18px"},null,-1),X={class:"text-h5"},Y={class:"text-caption mt-1"},Z=a("span",{class:"mdi mdi-logout"},null,-1);function ee(t,i,oe,ne,d,_){const b=n("v-img"),c=n("v-list-item"),v=n("v-divider"),x=n("router-link"),C=n("v-list-group"),y=n("v-list"),L=n("v-navigation-drawer"),S=n("v-app-bar-nav-icon"),V=n("v-spacer"),D=n("v-avatar"),g=n("v-btn"),P=n("v-card-text"),B=n("v-card"),$=n("v-menu"),N=n("v-app-bar"),z=n("router-view"),A=n("v-container"),F=n("v-main"),I=n("v-layout");return l(),m("div",null,[t.record?(l(),p(I,{key:0,class:"rounded rounded-md"},{default:e(()=>[o(L,{modelValue:d.drawer,"onUpdate:modelValue":i[0]||(i[0]=r=>d.drawer=r),permanent:""},{default:e(()=>[o(y,null,{default:e(()=>[o(c,null,{default:e(()=>[o(b,{src:"/logo.png","max-height":"80","max-width":"80",class:"mx-auto mb-4"})]),_:1}),o(v),o(c,null,{default:e(()=>[o(x,{to:"/service-provider/dashboard",class:"d-flex align-center ga-2 router-link"},{default:e(()=>[O,a("span",null,s(t.$t("admin_navbar_links.dashboard")),1)]),_:1})]),_:1}),(l(!0),m(f,null,h(_.pagesList,(r,j)=>(l(),p(C,{key:j,value:r.key,"expand-icon":"mdi mdi-chevron-down","collapse-icon":"mdi mdi-chevron-up"},{activator:e(({props:u})=>[o(c,k({ref_for:!0},u),{default:e(()=>[a("div",Q,[a("span",{class:J(["mdi mdi-24px",r.icon])},null,2),a("span",null,s(r.title),1)])]),_:2},1040)]),default:e(()=>[(l(!0),m(f,null,h(r.pages,([u,E],U)=>(l(),p(c,{key:U,to:E,class:"px-0",exact:"",onClick:_.closeDrawer},{default:e(()=>[a("div",R,[T,a("span",null,s(u),1)])]),_:2},1032,["to","onClick"]))),128))]),_:2},1032,["value"]))),128))]),_:1})]),_:1},8,["modelValue"]),o(N,{class:""},{prepend:e(()=>[o(S,{onClick:i[1]||(i[1]=r=>d.drawer=!d.drawer)})]),default:e(()=>[o(V),o($,{"min-width":"250px",rounded:""},{activator:e(({props:r})=>[o(g,k({icon:""},r),{default:e(()=>[o(D,{color:"brown",size:"large"},{default:e(()=>[a("span",X,s(_.getInitials(t.record?.name)),1)]),_:1})]),_:2},1040)]),default:e(()=>[o(B,null,{default:e(()=>[o(P,null,{default:e(()=>[a("h3",null,s(t.record?.name),1),a("p",Y,s(t.record?.email),1),o(v,{class:"my-3"}),o(g,{class:"w-100 d-flex align-center ga-2",onClick:t.logoutServiceProvider,loading:t.isLoading,disabled:t.isLoading},{default:e(()=>[a("span",null,s(t.$t("global.actions.logout")),1),Z]),_:1},8,["onClick","loading","disabled"])]),_:1})]),_:1})]),_:1})]),_:1}),o(F,{style:{"min-height":"350px"}},{default:e(()=>[o(A,{fluid:""},{default:e(()=>[o(z)]),_:1})]),_:1})]),_:1})):H("",!0)])}const ie=W(M,[["render",ee]]);export{ie as default};
//# sourceMappingURL=ServiceProviderDashboard-nsAXEFuq.js.map