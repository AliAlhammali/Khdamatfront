import{u as p}from"./services.admin.store-DWSu6_on.js";import{_ as A,m,e as u,r as n,o as C,c as x,a as s,w as l,b as o,g as P,t as $,n as V,j as f}from"./index-CS9bw-lj.js";import{D as B}from"./DataTable-ClIaddqw.js";import{C as L}from"./ConfirmDialog-CLTOtqR2.js";import{s as F}from"./showAlert.helper-B16U-n7m.js";import{u as _}from"./merchant.admin.store-CfqCq9f2.js";import{u as v}from"./categories.admin.store-BBluZAiq.js";import"./api.helper-X78EMQNg.js";const T={components:{DataTable:B,ConfirmDialog:L},data(){return{params:{"filter[keyword]":null,"filter[merchant_id]":null,"filter[category_id]":null,"filter[status]":null,perPage:10,page:1},listStatus:[{text:this.$t("global.status.active"),value:"active"},{text:this.$t("global.status.inactive"),value:"inactive"}]}},async mounted(){await this.getServicesAdmin(this.params),await this.getMerchantAdmin({listing:1}),await this.getCategoriesAdmin({listing:1})},computed:{...m(p,["records","uiFlags"]),...m(_,{merchants:"records"}),...m(v,{categories:"records"}),headers(){return[{title:"#",align:"start",sortable:!0,key:"id"},{title:this.$t("admin_services.fields.title"),align:"start",sortable:!0,key:"title"},{title:this.$t("admin_services.fields.category"),align:"start",sortable:!0,key:"categoryTitle"},{title:this.$t("admin_services.fields.merchant"),align:"start",sortable:!0,key:"merchant.title"},{title:this.$t("admin_services.fields.price"),align:"start",sortable:!0,key:"price"},{title:this.$t("admin_services.fields.cost_price"),align:"start",sortable:!0,key:"cost_price"},{title:this.$t("admin_services.fields.sp_price"),align:"start",sortable:!0,key:"sp_price"},{title:this.$t("admin_services.fields.status"),align:"start",sortable:!0,key:"status"},{title:"#",align:"start",sortable:!1,key:"actions"}]},items(){return this.records?.data?.map(e=>({...e,title:e.title?e.title[this.$i18n.locale]:"---",email:e.email?e.email:"---",status:e.status?e.status:"---",categoryTitle:e.category?.title?e.category.title[this.$i18n.locale]:"---"}))},merchantsList(){return this.merchants?.data?.map(e=>({...e}))},categoriesList(){return this.categories?.data?.map(e=>({...e,title:e.title?e.title[this.$i18n.locale]:"---"}))}},methods:{...u(p,["getServicesAdmin","deleteServicesAdmin"]),...u(v,["getCategoriesAdmin"]),...u(_,["getMerchantAdmin"]),async deleteRecord(e){(await F({title:this.$t("global.actions.delete"),text:this.$t("global.actions.delete_confirmation")+e.title[this.$i18n.locale],confirmButtonText:this.$t("global.actions.delete"),cancelButtonText:this.$t("global.actions.cancel")})).isConfirmed&&await this.deleteServicesAdmin(e.id)},async changePage(e){this.params.page=e,await this.getServicesAdmin(this.params)},async changePerPage(e){this.params.perPage=e,this.params.page=1,await this.getServicesAdmin(this.params)},async search(e){this.params["filter[keyword]"]=e;const t={"filter[keyword]":e};await this.getServicesAdmin(t)},async filterOrderBy(e,t){this.params[t]=e,await this.getServicesAdmin(this.params)},async clearFilter(){this.params["filter[merchant_id]"]=null,this.params["filter[category_id]"]=null,this.params["filter[status]"]=null,await this.getServicesAdmin(this.params)}}},z={class:""},D=["disabled"],O={class:"d-flex ga-2 align-center"},M=["onClick"];function N(e,t,U,R,r,i){const g=n("v-autocomplete"),d=n("v-col"),b=n("v-select"),y=n("v-icon"),k=n("v-row"),h=n("v-tooltip"),w=n("router-link"),S=n("data-table");return C(),x("div",z,[s(S,{title:e.$t("admin_navbar_links.services"),placeholder:e.$t("admin_services.search_services"),"create-page":"/admin/service/create",headers:i.headers,"slots-items":["actions","status"],isLoading:e.uiFlags?.isLoading,items:i.items,meta:e.records?.meta,onChangePage:i.changePage,onChangePerPage:i.changePerPage,onSearch:i.search,hasFilter:!0},{filter:l(()=>[s(k,null,{default:l(()=>[s(d,{md:"3",cols:"12"},{default:l(()=>[s(g,{modelValue:r.params["filter[merchant_id]"],"onUpdate:modelValue":[t[0]||(t[0]=a=>r.params["filter[merchant_id]"]=a),t[1]||(t[1]=a=>i.filterOrderBy(a,"filter[merchant_id]"))],label:e.$t("admin_categories.fields.merchant"),placeholder:e.$t("admin_categories.fields.merchant"),items:i.merchantsList,"item-title":"title","item-value":"id",outlined:"","menu-icon":"mdi mdi-chevron-down",class:"text-capitalize rounded-xl","no-data-text":e.$t("global.actions.no_data"),"hide-details":""},null,8,["modelValue","label","placeholder","items","no-data-text"])]),_:1}),s(d,{md:"3",cols:"12"},{default:l(()=>[s(g,{modelValue:r.params["filter[category_id]"],"onUpdate:modelValue":[t[2]||(t[2]=a=>r.params["filter[category_id]"]=a),t[3]||(t[3]=a=>i.filterOrderBy(a,"filter[category_id]"))],placeholder:e.$t("admin_navbar_links.categories"),label:e.$t("admin_navbar_links.categories"),items:i.categoriesList,"item-title":"title","item-value":"id",outlined:"","menu-icon":"mdi mdi-chevron-down",class:"text-capitalize rounded-xl","no-data-text":e.$t("global.actions.no_data"),"hide-details":""},null,8,["modelValue","placeholder","label","items","no-data-text"])]),_:1}),s(d,{md:"3",cols:"12"},{default:l(()=>[s(b,{modelValue:r.params["filter[status]"],"onUpdate:modelValue":[t[4]||(t[4]=a=>r.params["filter[status]"]=a),t[5]||(t[5]=a=>i.filterOrderBy(a,"filter[status]"))],placeholder:e.$t("admin_merchant.fields.status"),label:e.$t("admin_merchant.fields.status"),items:r.listStatus,"item-title":"text","item-value":"value",outlined:"","menu-icon":"mdi mdi-chevron-down",class:"text-capitalize rounded-xl","no-data-text":e.$t("global.actions.no_data"),"hide-details":""},null,8,["modelValue","placeholder","label","items","no-data-text"])]),_:1}),s(d,{cols:"2"},{default:l(()=>[o("button",{class:"pa-3 rounded border text-error",onClick:t[6]||(t[6]=(...a)=>i.clearFilter&&i.clearFilter(...a)),disabled:!r.params["filter[merchant_id]"]&&!r.params["filter[main_category_id]"]&&!r.params["filter[status]"]},[s(y,{size:"24"},{default:l(()=>[P("mdi mdi-filter-variant-remove")]),_:1})],8,D)]),_:1})]),_:1})]),status:l(({item:a})=>[o("span",{class:V(["badge badge--status",a.item.status==="active"?"badge--success":"badge--danger"])},$(e.$t(`global.status.${a.item.status}`)),3)]),actions:l(({item:a})=>[o("div",O,[s(w,{to:`/admin/service/${a.item.id}/edit`,class:"button button--edit px-2 rounded"},{default:l(()=>[s(h,{text:e.$t("global.actions.edit")},{activator:l(({props:c})=>[o("span",f(c,{class:"mdi mdi-24px mdi-pencil"}),null,16)]),_:1},8,["text"])]),_:2},1032,["to"]),o("button",{class:"button button--delete px-2 rounded",onClick:c=>i.deleteRecord(a.item)},[s(h,{text:e.$t("global.actions.delete")},{activator:l(({props:c})=>[o("span",f(c,{class:"mdi mdi-24px mdi-delete"}),null,16)]),_:1},8,["text"])],8,M)])]),_:1},8,["title","placeholder","headers","isLoading","items","meta","onChangePage","onChangePerPage","onSearch"])])}const Q=A(T,[["render",N]]);export{Q as default};
//# sourceMappingURL=ServiceList-Cqa8EtyQ.js.map