import{A as t,k as r}from"./index-CS9bw-lj.js";import{A as a}from"./api.helper-X78EMQNg.js";class i extends a{constructor(){super("merchant/services")}get(e){return axios.get(this.url,{params:e})}}const c=new i;t();const l=r("ServicesMerchant",{state:()=>({records:[],record:{},uiFlags:{isLoading:!1,isCreated:!1,isUpdated:!1,isDeleted:!1}}),getters:{},actions:{getServicesMerchant:async function(s){this.uiFlags.isLoading=!0;try{const{data:e}=await c.get(s);this.records=e}catch(e){return e}finally{this.uiFlags.isLoading=!1}}}});export{l as u};
//# sourceMappingURL=services.merchant.store-Dx9FRhq7.js.map
