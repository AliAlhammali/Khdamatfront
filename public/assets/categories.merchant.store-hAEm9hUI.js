import{A as t,k as i}from"./index-CS9bw-lj.js";import{A as r}from"./api.helper-X78EMQNg.js";class n extends r{constructor(){super("merchant/categories")}get(e){return axios.get(this.url,{params:e})}}const s=new n;t();const l=i("CategoriesMerchant",{state:()=>({records:[],record:{},uiFlags:{isLoading:!1,isCreated:!1,isUpdated:!1,isDeleted:!1},subCategories:[],uiFlagsSub:{isLoading:!1,isCreated:!1,isUpdated:!1,isDeleted:!1},mainCategories:[],uiFlagsMain:{isLoading:!1,isCreated:!1,isUpdated:!1,isDeleted:!1}}),getters:{},actions:{getCategoriesMerchant:async function(a){this.uiFlags.isLoading=!0;try{const{data:e}=await s.get(a);this.records=e}catch(e){return e}finally{this.uiFlags.isLoading=!1}},getMainCategoriesMerchant:async function(a){this.uiFlagsMain.isLoading=!0;try{const{data:e}=await s.get(a);this.mainCategories=e}catch(e){return e}finally{this.uiFlagsMain.isLoading=!1}},getSubCategoriesMerchant:async function(a){this.uiFlagsSub.isLoading=!0;try{const{data:e}=await s.get(a);this.subCategories=e}catch(e){return e}finally{this.uiFlagsSub.isLoading=!1}}}});export{l as u};
//# sourceMappingURL=categories.merchant.store-hAEm9hUI.js.map
