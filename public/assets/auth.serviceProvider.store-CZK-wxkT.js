import{k as t,l as o}from"./index-CS9bw-lj.js";import{A as s}from"./api.helper-X78EMQNg.js";class a extends s{constructor(){super("sp-auth")}login(e){return axios.post(`${this.url}/login`,e)}logout(){return axios.post(`${this.url}/logout`)}}const i=new a,d=t("AuthServiceProvider",{state:()=>({record:null,isLoading:!1}),getters:{},actions:{loginServiceProvider:async function(r){this.isLoading=!0;try{const{data:e}=await i.login(r);this.record=e.user,$cookies.set("service_provider_khadamat_token",e.token,"1m"),$cookies.set("service_provider_khadamat_user",e.user,"1m"),o.push({name:"service-provider-dashboard"})}catch{return!1}finally{this.isLoading=!1}},logoutServiceProvider:async function(){try{$cookies.remove("service_provider_khadamat_token"),$cookies.remove("service_provider_khadamat_user"),this.record=null,o.push({name:"service-provider-login"}),await i.logout(),window.location.reload()}catch(r){return r}},checkCookie:function(){const r=$cookies.get("service_provider_khadamat_token"),e=$cookies.get("service_provider_khadamat_user");r&&e?this.record=e:o.push({name:"service-provider-login"})}}});export{d as u};
//# sourceMappingURL=auth.serviceProvider.store-CZK-wxkT.js.map