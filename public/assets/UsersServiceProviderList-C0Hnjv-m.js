import{_ as P,m as S,e as y,r as l,o as k,c as w,a as i,w as a,b as o,g as x,t as u,n as C,j as h}from"./index-CS9bw-lj.js";import{D as $}from"./DataTable-ClIaddqw.js";import{C as U}from"./ConfirmDialog-CLTOtqR2.js";import{s as B}from"./showAlert.helper-B16U-n7m.js";import{u as g}from"./users.serviceProvider.store-BcWVKFOU.js";import"./api.helper-X78EMQNg.js";const F={components:{DataTable:$,ConfirmDialog:U},data(){return{params:{"filter[keyword]":null,perPage:10,page:1},listStatus:[{text:this.$t("global.status.active"),value:"active"},{text:this.$t("global.status.inactive"),value:"inactive"}],filterStatus:null}},async mounted(){await this.getUsersServiceProvider(this.params)},computed:{...S(g,["records","uiFlags"]),headers(){return[{title:"#",align:"start",sortable:!0,key:"id"},{title:this.$t("admin_merchant.fields.name"),align:"start",sortable:!0,key:"name"},{title:this.$t("admin_merchant.fields.phone"),align:"start",sortable:!0,key:"phone"},{title:this.$t("admin_merchant.fields.email"),align:"start",sortable:!0,key:"email"},{title:this.$t("admin_merchant.fields.role"),align:"start",sortable:!0,key:"role"},{title:this.$t("admin_merchant.fields.status"),align:"start",sortable:!0,key:"status"},{title:"#",align:"start",sortable:!1,key:"actions"}]},items(){return this.records?.data?.map(e=>({...e,address:e.address?e.address:"---",phone:e.phone?e.phone:"---",email:e.email?e.email:"---",status:e.status?e.status:"---",role:e.role?e.role:"---"}))}},methods:{...y(g,["getUsersServiceProvider","deleteUsersServiceProvider"]),async deleteRecord(e){(await B({title:this.$t("global.actions.delete"),text:this.$t("global.actions.delete_confirmation")+e.name,confirmButtonText:this.$t("global.actions.delete"),cancelButtonText:this.$t("global.actions.cancel")})).isConfirmed&&await this.deleteUsersServiceProvider(e.id)},async filterByStatus(e){this.params["filter[status]"]=e,await this.getUsersServiceProvider(this.params)},async clearFilter(){this.filterStatus=null,this.params["filter[status]"]=null,await this.getUsersServiceProvider(this.params)},async changePage(e){this.params.page=e,await this.getUsersServiceProvider(this.params)},async changePerPage(e){this.params.perPage=e,this.params.page=1,await this.getUsersServiceProvider(this.params)},async search(e){this.params["filter[keyword]"]=e;const s={"filter[keyword]":e};await this.getUsersServiceProvider(s)}}},V={class:""},D=["disabled"],L={class:"badge badge--status"},T={class:"d-flex ga-2 align-center"},z=["onClick"];function N(e,s,R,j,n,r){const p=l("v-select"),c=l("v-col"),v=l("v-icon"),_=l("v-row"),m=l("v-tooltip"),f=l("router-link"),b=l("data-table");return k(),w("div",V,[i(b,{title:e.$t("admin_navbar_links.users"),placeholder:e.$t("admin_merchant.search_placeholder_users"),"create-page":"/service-provider/users/create",headers:r.headers,"slots-items":["actions","status","role"],isLoading:e.uiFlags?.isLoading,items:r.items,meta:e.records?.meta,onChangePage:r.changePage,onChangePerPage:r.changePerPage,onSearch:r.search,hasFilter:!0},{filter:a(()=>[i(_,null,{default:a(()=>[i(c,{md:"4",cols:"12"},{default:a(()=>[i(p,{modelValue:n.filterStatus,"onUpdate:modelValue":[s[0]||(s[0]=t=>n.filterStatus=t),s[1]||(s[1]=t=>r.filterByStatus(t))],placeholder:e.$t("admin_merchant.fields.status"),items:n.listStatus,"item-title":"text","item-value":"value",outlined:"","menu-icon":"mdi mdi-chevron-down",class:"text-capitalize rounded-xl","no-data-text":e.$t("global.actions.no_data"),"hide-details":""},null,8,["modelValue","placeholder","items","no-data-text"])]),_:1}),i(c,{cols:"2"},{default:a(()=>[o("button",{class:"pa-3 rounded border text-error",onClick:s[2]||(s[2]=(...t)=>r.clearFilter&&r.clearFilter(...t)),disabled:!n.filterStatus},[i(v,{size:"24"},{default:a(()=>[x("mdi mdi-filter-variant-remove")]),_:1})],8,D)]),_:1})]),_:1})]),status:a(({item:t})=>[o("span",{class:C(["badge badge--status",t.item.status==="active"?"badge--success":"badge--danger"])},u(e.$t(`global.status.${t.item.status}`)),3)]),role:a(({item:t})=>[o("span",L,u(e.$t(`global.role.${t.item.role}`)),1)]),actions:a(({item:t})=>[o("div",T,[i(f,{to:`/service-provider/users/${t.item.id}/edit`,class:"button button--edit px-2 rounded"},{default:a(()=>[i(m,{text:e.$t("global.actions.edit")},{activator:a(({props:d})=>[o("span",h(d,{class:"mdi mdi-24px mdi-pencil"}),null,16)]),_:1},8,["text"])]),_:2},1032,["to"]),o("button",{class:"button button--delete px-2 rounded",onClick:d=>r.deleteRecord(t.item)},[i(m,{text:e.$t("global.actions.delete")},{activator:a(({props:d})=>[o("span",h(d,{class:"mdi mdi-24px mdi-delete"}),null,16)]),_:1},8,["text"])],8,z)])]),_:1},8,["title","placeholder","headers","isLoading","items","meta","onChangePage","onChangePerPage","onSearch"])])}const J=P(F,[["render",N]]);export{J as default};
//# sourceMappingURL=UsersServiceProviderList-C0Hnjv-m.js.map