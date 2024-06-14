import{A as M,k as B,_ as D,m as g,e as f,r as o,o as b,c as A,a as s,w as i,b as d,t as m,g as y,f as Y,j as P,h as z}from"./index-CS9bw-lj.js";import{D as $}from"./DataTable-ClIaddqw.js";import{u as S}from"./orders.serviceProvider.store-DMHJw_fF.js";import{u as w}from"./users.serviceProvider.store-BcWVKFOU.js";import{A as N}from"./api.helper-X78EMQNg.js";class T extends N{constructor(){super("service-provider/categories")}get(t){return axios.get(this.url,{params:t})}}const C=new T;M();const k=B("CategoriesServiceProvider",{state:()=>({records:[],record:{},uiFlags:{isLoading:!1,isCreated:!1,isUpdated:!1,isDeleted:!1},subCategories:[],uiFlagsSubCategories:{isLoading:!1,isCreated:!1,isUpdated:!1,isDeleted:!1}}),getters:{},actions:{getCategoriesServiceProvider:async function(e){this.uiFlags.isLoading=!0;try{const{data:t}=await C.get(e);this.records=t}catch(t){return t}finally{this.uiFlags.isLoading=!1}},getSubCategoriesServiceProvider:async function(e){this.uiFlagsSubCategories.isLoading=!0;try{const{data:t}=await C.get(e);this.subCategories=t}catch(t){return t}finally{this.uiFlagsSubCategories.isLoading=!1}}}}),j={components:{DataTable:$},data(){return{params:{"filter[keyword]":null,"filter[merchant_id]":null,perPage:10,page:1,includeOrderMerchant:1,includeOrderMerchantUser:1,includeOrderMerchantClient:1,includeOrderMainCategory:1,includeOrderAddress:1,includeOrderItems:1,sortAsc:1},filtersParams:{"filter[started_to]":null,"filter[started_from]":null,"filter[status]":null,"filter[main_category_id]":null,"filter[service_provider_user_id]":null},showUsers:!1,userSelected:null,orderSelected:null,main_category_id:null}},async mounted(){await this.getOrdersServiceProvider(this.params),await this.getUsersServiceProvider({listing:1,"filter[role]":"Staff"}),await this.getCategoriesServiceProvider({listing:1,"filter[isParent]":1})},computed:{...g(S,["records","uiFlags"]),...g(w,{users:"records"}),...g(k,{mainCategories:"records",uiFlagsMainCategories:"uiFlags",subCategories:"subCategories",uiFlagsSubCategories:"uiFlagsSubCategories"}),headers(){return[{title:this.$t("global.order_number"),align:"start",sortable:!0,key:"id"},{title:this.$t("admin_merchant.fields.merchant"),align:"start",sortable:!0,key:"merchant_title"},{title:this.$t("global.created_at"),align:"start",sortable:!0,key:"created_at"},{title:this.$t("global.main_category"),align:"start",sortable:!0,key:"main_category"},{title:this.$t("global.client_name"),align:"start",sortable:!0,key:"client_name"},{title:this.$t("global.client_phone"),align:"start",sortable:!0,key:"client_phone"},{title:this.$t("admin_merchant.fields.total"),align:"start",sortable:!0,key:"totals.sp_total"},{title:this.$t("admin_merchant.fields.status"),align:"start",sortable:!0,key:"status"},{title:"#",align:"start",sortable:!1,key:"actions"}]},items(){return this.records?.data?.map(e=>({...e,main_category:e.main_category.title?e.main_category.title[this.$i18n.locale]:"---",merchant_title:e.merchant?e.merchant.title:"---",client_name:e.merchant_client?e.merchant_client.name:"---",client_phone:e.merchant_client?e.merchant_client.phone:"---",completed_at:e.completed_at?e.completed_at:"---",status:e.status?this.$t(`global.order_status.${e.status}`):"---",pick_up_type:e.pick_up_type?this.$t(`global.order_type.${e.pick_up_type}`):"---"}))},isAdmin(){return this.$cookies.get("service_provider_khadamat_user").role.toLowerCase()==="admin"},orderStatus(){return[{value:"new",text:this.$t("global.order_status.new")},{value:"confirmed",text:this.$t("global.order_status.confirmed")},{value:"on_the_way",text:this.$t("global.order_status.on_the_way")},{value:"in_progress",text:this.$t("global.order_status.in_progress")},{value:"completed",text:this.$t("global.order_status.completed")},{value:"canceled",text:this.$t("global.order_status.canceled")}]},mainCategoriesList(){return this.mainCategories?.data?.map(e=>({...e,title:e.title?e.title[this.$i18n.locale]:"---"}))},subCategoriesList(){return this.subCategories?.data?.map(e=>({...e,title:e.title?e.title[this.$i18n.locale]:"---"}))}},methods:{...f(S,["getOrdersServiceProvider","updateOrdersServiceProvider"]),...f(k,["getCategoriesServiceProvider","getSubCategoriesServiceProvider"]),...f(w,["getUsersServiceProvider"]),async changePage(e){this.params.page=e,await this.getOrdersServiceProvider(this.params)},async changePerPage(e){this.params.perPage=e,this.params.page=1,await this.getOrdersServiceProvider(this.params)},async search(e){this.params["filter[keyword]"]=e;const t={"filter[keyword]":e};await this.getOrdersServiceProvider(t)},async updateStaff(){const e={service_provider_user_id:this.userSelected};await this.updateOrdersServiceProvider(this.orderSelected,e),this.showUsers=!1,this.userSelected=null},showModal(e){this.orderSelected=e,this.showUsers=!0},async filterOrderBy(e,t){this.filtersParams[t]=e,this.params={...this.params,...this.filtersParams},await this.getOrdersServiceProvider(this.params)},async clearFilter(){this.filtersParams={"filter[started_to]":null,"filter[started_from]":null,"filter[status]":null,"filter[main_category_id]":null,"filter[service_provider_user_id]":null},this.main_category_id=null,this.params={...this.params,...this.filtersParams},await this.getOrdersServiceProvider(this.params)},async getSubCategoriesSP(e){this.filtersParams["filter[main_category_id]"]=null,await this.getSubCategoriesServiceProvider({listing:1,"filter[parent_id]":e})}}},E={class:"d-flex align-center ga-2"},I={class:"d-flex align-center ga-2"},q=["disabled"],G={class:"d-flex align-center ga-2"},H={class:"mb-4"};function J(e,t,K,Q,a,l){const _=o("date-picker"),n=o("v-col"),c=o("v-autocomplete"),p=o("v-select"),V=o("v-icon"),O=o("v-row"),h=o("v-tooltip"),v=o("v-btn"),U=o("router-link"),x=o("data-table"),F=o("v-card"),L=o("v-dialog");return b(),A("div",null,[s(x,{title:e.$t("admin_navbar_links.orders"),placeholder:e.$t("admin_merchant.search_placeholder_orders"),headers:l.headers,"slots-items":["actions"],isLoading:e.uiFlags?.isLoading,items:l.items,meta:e.records?.meta,onChangePage:l.changePage,onChangePerPage:l.changePerPage,onSearch:l.search,hasFilter:!0},{filter:i(()=>[s(O,null,{default:i(()=>[s(n,{md:"3",cols:"12"},{default:i(()=>[d("div",E,[d("p",null,m(e.$t("global.started_from")),1),s(_,{editable:!1,placeholder:e.$t("global.started_from"),modelValue:a.filtersParams["filter[started_from]"],"onUpdate:modelValue":t[0]||(t[0]=r=>a.filtersParams["filter[started_from]"]=r),value:a.filtersParams["filter[started_from]"],"onUpdate:value":t[1]||(t[1]=r=>a.filtersParams["filter[started_from]"]=r),type:"date",class:"mb-2 w-100","value-type":"format",format:"YYYY-MM-DD",onChange:t[2]||(t[2]=r=>l.filterOrderBy(r,"filter[started_from]"))},null,8,["placeholder","modelValue","value"])])]),_:1}),s(n,{md:"3",cols:"12"},{default:i(()=>[d("div",I,[d("p",null,m(e.$t("global.started_to")),1),s(_,{editable:!1,placeholder:e.$t("global.started_to"),modelValue:a.filtersParams["filter[started_to]"],"onUpdate:modelValue":t[3]||(t[3]=r=>a.filtersParams["filter[started_to]"]=r),value:a.filtersParams["filter[started_to]"],"onUpdate:value":t[4]||(t[4]=r=>a.filtersParams["filter[started_to]"]=r),type:"date",class:"mb-2 w-100","value-type":"format",format:"YYYY-MM-DD",onChange:t[5]||(t[5]=r=>l.filterOrderBy(r,"filter[started_to]"))},null,8,["placeholder","modelValue","value"])])]),_:1}),s(n,{md:"3",cols:"12"},{default:i(()=>[s(c,{modelValue:a.main_category_id,"onUpdate:modelValue":[t[6]||(t[6]=r=>a.main_category_id=r),t[7]||(t[7]=r=>l.getSubCategoriesSP(r))],placeholder:e.$t("global.main_category"),label:e.$t("global.main_category"),"menu-icon":"mdi mdi-chevron-down",class:"text-capitalize rounded-xl mb-2 w-100","no-data-text":e.$t("global.actions.no_data"),"hide-details":"",outlined:"",items:l.mainCategoriesList,"item-title":"title","item-value":"id"},null,8,["modelValue","placeholder","label","no-data-text","items"])]),_:1}),s(n,{md:"3",cols:"12"},{default:i(()=>[s(c,{placeholder:e.$t("global.show_order.category"),label:e.$t("global.show_order.category"),modelValue:a.filtersParams["filter[main_category_id]"],"onUpdate:modelValue":[t[8]||(t[8]=r=>a.filtersParams["filter[main_category_id]"]=r),t[9]||(t[9]=r=>l.filterOrderBy(r,"filter[main_category_id]"))],"menu-icon":"mdi mdi-chevron-down",class:"text-capitalize rounded-xl mb-2 w-100","no-data-text":e.$t("global.actions.no_data"),"hide-details":"",outlined:"",items:l.subCategoriesList,"item-title":"title","item-value":"id",disabled:!a.main_category_id},null,8,["placeholder","label","modelValue","no-data-text","items","disabled"])]),_:1}),s(n,{md:"3",cols:"12"},{default:i(()=>[s(c,{placeholder:e.$t("admin_navbar_links.users"),label:e.$t("admin_navbar_links.users"),modelValue:a.filtersParams["filter[service_provider_user_id]"],"onUpdate:modelValue":[t[10]||(t[10]=r=>a.filtersParams["filter[service_provider_user_id]"]=r),t[11]||(t[11]=r=>l.filterOrderBy(r,"filter[service_provider_user_id]"))],"menu-icon":"mdi mdi-chevron-down",class:"text-capitalize rounded-xl mb-2 w-100","no-data-text":e.$t("global.actions.no_data"),"hide-details":"",outlined:"",items:e.users.data,"item-title":"name","item-value":"id"},null,8,["placeholder","label","modelValue","no-data-text","items"])]),_:1}),s(n,{md:"3",cols:"12"},{default:i(()=>[s(p,{placeholder:e.$t("admin_merchant.fields.status"),label:e.$t("admin_merchant.fields.status"),modelValue:a.filtersParams["filter[status]"],"onUpdate:modelValue":[t[12]||(t[12]=r=>a.filtersParams["filter[status]"]=r),t[13]||(t[13]=r=>l.filterOrderBy(r,"filter[status]"))],"menu-icon":"mdi mdi-chevron-down",class:"text-capitalize rounded-xl mb-2 w-100","no-data-text":e.$t("global.actions.no_data"),"hide-details":"",outlined:"",items:l.orderStatus,"item-title":"text","item-value":"value"},null,8,["placeholder","label","modelValue","no-data-text","items"])]),_:1}),s(n,{cols:"2"},{default:i(()=>[d("button",{class:"pa-3 rounded border text-error",onClick:t[14]||(t[14]=(...r)=>l.clearFilter&&l.clearFilter(...r)),disabled:!a.filtersParams["filter[started_to]"]&&!a.filtersParams["filter[started_from]"]&&!a.filtersParams["filter[status]"]&&!a.filtersParams["filter[main_category_id]"]&&!a.filtersParams["filter[service_provider_user_id]"]},[s(V,{size:"24"},{default:i(()=>[y("mdi mdi-filter-variant-remove")]),_:1})],8,q)]),_:1})]),_:1})]),actions:i(({item:r})=>[d("div",G,[l.isAdmin?(b(),Y(v,{key:0,class:"button button--edit px-2 rounded",onClick:u=>l.showModal(r.item.id)},{default:i(()=>[s(h,{text:e.$t("global.actions.add_sp_user")},{activator:i(({props:u})=>[d("span",P(u,{class:"mdi mdi-24px mdi-account-group-outline"}),null,16)]),_:1},8,["text"])]),_:2},1032,["onClick"])):z("",!0),s(U,{to:`/service-provider/orders/${r.item.id}`,class:"button button--edit px-2 rounded"},{default:i(()=>[s(h,{text:e.$t("global.actions.show")},{activator:i(({props:u})=>[d("span",P(u,{class:"mdi mdi-24px mdi-eye-outline"}),null,16)]),_:1},8,["text"])]),_:2},1032,["to"])])]),_:1},8,["title","placeholder","headers","isLoading","items","meta","onChangePage","onChangePerPage","onSearch"]),s(L,{modelValue:a.showUsers,"onUpdate:modelValue":t[16]||(t[16]=r=>a.showUsers=r),width:"auto"},{default:i(()=>[s(F,{"min-width":"400",class:"pa-4"},{default:i(()=>[d("h3",H,m(e.$t("global.role.Staff")),1),s(p,{modelValue:a.userSelected,"onUpdate:modelValue":t[15]||(t[15]=r=>a.userSelected=r),items:e.users.data,"item-title":"name","item-value":"id",label:e.$t("admin_navbar_links.users"),outlined:"","menu-icon":"mdi mdi-chevron-down",class:"text-capitalize rounded-xl"},null,8,["modelValue","items","label"]),s(v,{class:"w-100 mt-4",color:"primary",size:"large",onClick:l.updateStaff},{default:i(()=>[y(m(e.$t("global.actions.edit")),1)]),_:1},8,["onClick"])]),_:1})]),_:1},8,["modelValue"])])}const te=D(j,[["render",J]]);export{te as default};
//# sourceMappingURL=OrderServiceProviderList-Ce6XQ5NJ.js.map