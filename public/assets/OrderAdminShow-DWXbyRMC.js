import{L as B}from"./Loader-B8eGEbwu.js";import{M as z}from"./MapsView-BFRTDR2k.js";import{u as w}from"./orders.admin.store-CYV0srVx.js";import{u as f}from"./serviceProviders.admin.store-Bv9QIKe0.js";import{_ as T,m as $,e as y,r as a,o as n,c as u,f as h,F as _,a as l,w as d,b as t,i as S,t as s,h as m,g as k,n as q}from"./index-CS9bw-lj.js";import"./geosearch.module-C3uEVW0W.js";import"./api.helper-X78EMQNg.js";const I={components:{Loader:B,MapsView:z},data(){return{openShare:!1,showMap:!1,service_provider_id:null}},async mounted(){await this.showOrdersAdmin(this.$route.params.id,{includeOrderItemService:1,includeOrderSP:1,includeOrderMerchantUser:1,includeOrderMerchantClient:1}),await this.getServiceProvidersAdmin({listing:1})},computed:{...$(w,["record","uiFlags"]),...$(f,{SPList:"records",SPUiFlags:"uiFlags"}),shareText(){return`${this.$t("share_order.client_name")} : ${this.record?.merchant_client?.name}, ${this.$t("share_order.client_phone")} : ${this.record?.merchant_client?.phone}, 
        ${this.$t("share_order.client_address")} : ${this.record?.merchant_client?.address}

      , 
        ${this.$t("share_order.merchant_address")} : ${this.record?.merchant_user?.address}
      ,
       ${this.$t("share_order.created_by")} : ${this.record?.merchant_user?.name},
      
       ${this.$t("share_order.merchant_phone")} : ${this.record?.merchant_user?.phone} ,
      ${this.$t("share_order.start_date")} : ${this.record?.started_at}`},orderStatus(){let e=[{value:"new",text:this.$t("global.order_status.new"),step:1},{value:"confirmed",text:this.$t("global.order_status.confirmed"),step:2},{value:"on_the_way",text:this.$t("global.order_status.on_the_way"),step:3},{value:"in_progress",text:this.$t("global.order_status.in_progress"),step:4},{value:"completed",text:this.$t("global.order_status.completed"),step:5},{value:"canceled",text:this.$t("global.order_status.canceled"),step:6}];return this.record?.status==="canceled"&&(e=e.filter(r=>r.value!=="completed")),this.record?.status==="completed"&&(e=e.filter(r=>r.value!=="canceled")),e},currentStep(){return this.orderStatus.find(e=>e?.value===this.record?.status)}},methods:{...y(w,["showOrdersAdmin","updateOrdersAdmin"]),...y(f,["getServiceProvidersAdmin"]),async updateOrders(e){await this.updateOrdersAdmin(this.$route.params.id,{status:e})},async updateOrdersSp(e){await this.updateOrdersAdmin(this.$route.params.id,{service_provider_id:e})}}},D={class:"content"},E={class:"border-t mt-4 pt-4"},G={class:"border pa-4 order-info rounded-lg"},H={class:"d-flex align-center ga-8 mb-2 pb-2"},J={class:"border-b mb-2"},K={class:"d-flex align-center ga-8 mb-2 pb-2"},Q={class:"d-flex align-center ga-2 mb-2 pb-2 justify-space-between"},R={class:"d-flex align-center ga-2 mb-2 pb-2 justify-space-between"},W={class:"d-flex align-center ga-2 mb-2 pb-2 border-t justify-space-between"},X={class:"border-b mb-2"},Y={class:"d-flex align-center ga-2 mb-2 pb-2 justify-space-between"},Z={class:"d-flex align-center ga-2 mb-2 pb-2 justify-space-between position-relative"},x={class:"bg-white border-b"},ee={class:"d-flex align-center ga-2 mb-2 pb-2 justify-space-between"},te={class:"d-flex align-center ga-2 mb-2 pb-2 justify-space-between"},se={class:"d-flex align-center ga-2 mb-2 pb-2 justify-space-between"},oe={class:"bg-white"},re={class:"d-flex align-center ga-2 mb-2 pb-2 justify-space-between"},ae={class:"d-flex align-center ga-2 mb-2 pb-2 justify-space-between"},le={class:"d-flex align-center ga-2 mb-2 pb-2 justify-space-between"},de={class:"bg-white"},ne={class:"d-flex align-center ga-2 mb-2 pb-2 justify-space-between"},ie={class:"d-flex align-center ga-2 mb-2 pb-2 justify-space-between"},ce={class:"d-flex align-center ga-2 mb-2 pb-2 justify-space-between"},ue={class:"d-flex align-center ga-2 mb-2 pb-2 justify-space-between"},pe={class:"text-start border-e"},he={class:"text-start border-e"},_e={class:"text-start border-e"},me={class:"text-start border-e"},be={class:"text-start"},ve={class:"border-e"},ge={class:"border-e"},we={class:"border-e"},fe={class:"border-e"},$e={class:"px-0"},ye={key:0},Se={class:"text-start border-e"},ke={class:"text-start border-e"},Oe={class:"text-start border-b"},Ve={class:"border-e",width:"84px"},je={class:"border-e",width:"75px"},Ae={class:"mb-3"};function Me(e,r,Ce,Le,i,c){const O=a("Loader"),V=a("v-divider"),j=a("v-stepper-item"),A=a("v-stepper-header"),M=a("v-stepper"),b=a("v-select"),C=a("v-icon"),L=a("ShareNetwork"),v=a("v-col"),g=a("v-table"),F=a("v-row"),P=a("MapsView"),N=a("v-card"),U=a("v-dialog");return n(),u("div",D,[e.uiFlags.isLoading||e.uiFlags.isUpdating?(n(),h(O,{key:0})):(n(),u(_,{key:1},[l(M,{"alt-labels":"",elevation:"0"},{default:d(()=>[l(A,null,{default:d(()=>[(n(!0),u(_,null,S(c.orderStatus,(o,p)=>(n(),u(_,{key:p},[p!==0?(n(),h(V,{key:0})):m("",!0),l(j,{complete:c.currentStep?.step>o?.step||e.record?.status==="completed"||e.record?.status==="canceled",step:p+1,editable:!1,class:q(c.currentStep?.step===o?.step&&e.record?.status!=="completed"&&e.record?.status!=="canceled"?"active":"")},{default:d(()=>[k(s(o.text),1)]),_:2},1032,["complete","step","class"])],64))),128))]),_:1})]),_:1}),t("div",E,[l(F,null,{default:d(()=>[l(v,{md:"4",cols:"12"},{default:d(()=>[t("div",G,[t("span",null,s(e.$t("admin_navbar_links.services_providers")),1),t("div",H,[e.record?.service_provider?.id?(n(),h(b,{key:0,modelValue:e.record.service_provider.id,"onUpdate:modelValue":[r[0]||(r[0]=o=>e.record.service_provider.id=o),r[1]||(r[1]=o=>c.updateOrdersSp(o))],placeholder:e.$t("admin_navbar_links.services_providers"),items:e.SPList?.data,"item-title":"title","item-value":"id","menu-icon":"mdi mdi-chevron-down",class:"w-100 mt-2",outlined:"","no-data-text":e.$t("global.actions.no_data"),disabled:e.record?.status==="completed"||e.record?.status==="canceled"},null,8,["modelValue","placeholder","items","no-data-text","disabled"])):m("",!0)]),t("div",J,[t("div",K,[t("span",null,s(e.$t("global.show_order.status")),1),l(b,{modelValue:e.record.status,"onUpdate:modelValue":[r[2]||(r[2]=o=>e.record.status=o),r[3]||(r[3]=o=>c.updateOrders(o))],placeholder:e.$t("global.show_order.status"),items:c.orderStatus,"item-title":"text","item-value":"value","menu-icon":"mdi mdi-chevron-down",class:"w-100",outlined:"","no-data-text":e.$t("global.actions.no_data"),disabled:e.record?.status==="completed"||e.record?.status==="canceled"},null,8,["modelValue","placeholder","items","no-data-text","disabled"])]),t("div",Q,[t("span",null,s(e.$t("global.show_order.order_number")),1),t("p",null,s(e.record?.id),1)]),t("div",R,[t("span",null,s(e.$t("global.show_order.order_creation_date")),1),t("p",null,s(e.record?.created_at),1)]),t("div",W,[t("span",null,s(e.$t("global.show_order.order_start_date")),1),t("p",null,s(e.record?.started_at),1)])]),t("div",X,[t("div",Y,[t("span",null,s(e.$t("global.show_order.created_by")),1),t("p",null,s(e.record?.merchant_user?.name?e.record?.merchant_user?.name:"---"),1)]),t("div",Z,[t("span",null,s(e.$t("global.show_order.address")),1),t("button",{class:"hover-to-show",onClick:r[4]||(r[4]=o=>i.showMap=!i.showMap)},s(e.$t("global.show_order.view_location")),1)])]),t("h2",null,s(e.$t("global.show_order.order_total")),1),t("div",x,[t("div",ee,[t("span",null,s(e.$t("global.show_order.subtotal")),1),t("h4",null,s(e.record?.totals?.sup_total),1)]),t("div",te,[t("span",null,s(e.$t("global.show_order.tax")),1),t("h4",null,s(e.record?.totals?.vat),1)]),t("div",se,[t("span",null,s(e.$t("global.show_order.total")),1),t("h4",null,s(e.record?.totals?.total),1)])]),t("h2",null,s(e.$t("global.show_order.sp_total")),1),t("div",oe,[t("div",re,[t("span",null,s(e.$t("global.show_order.subtotal")),1),t("h4",null,s(e.record?.totals?.sp_sup_total),1)]),t("div",ae,[t("span",null,s(e.$t("global.show_order.tax")),1),t("h4",null,s(e.record?.totals?.sp_vat),1)]),t("div",le,[t("span",null,s(e.$t("global.show_order.total")),1),t("h4",null,s(e.record?.totals?.sp_total),1)])]),t("h2",null,s(e.$t("global.avg_profit")),1),t("div",de,[t("div",ne,[t("span",null,s(e.$t("global.show_order.subtotal")),1),t("h4",null,s(e.record?.totals?.profit_sup_total),1)]),t("div",ie,[t("span",null,s(e.$t("global.show_order.tax")),1),t("h4",null,s(e.record?.totals?.profit_vat),1)]),t("div",ce,[t("span",null,s(e.$t("global.order_commission")),1),t("h4",null,s(e.record?.totals?.merchant_user_commission_total),1)]),t("div",ue,[t("span",null,s(e.$t("global.show_order.total")),1),t("h4",null,s(e.record?.totals?.profit_total),1)]),l(L,{class:"main-btn pa-2 rounded-lg w-100 text-center mt-4",network:"whatsapp",url:"",title:e.$t("share_order.order_number")+e.record?.id,description:c.shareText,onOpen:r[5]||(r[5]=o=>i.openShare=!0),onChange:r[6]||(r[6]=o=>i.openShare=!1),onClose:r[7]||(r[7]=o=>i.openShare=!1)},{default:d(()=>[l(C,{size:"24"},{default:d(()=>[k("mdi mdi-share-variant-outline")]),_:1})]),_:1},8,["title","description"])])])]),_:1}),l(v,{md:"8",cols:"12"},{default:d(()=>[l(g,{class:"border rounded-lg"},{default:d(()=>[t("thead",null,[t("tr",null,[t("th",pe,s(e.$t("global.show_order.category")),1),t("th",he,s(e.$t("global.show_order.service")),1),t("th",_e,s(e.$t("global.show_order.unit_price")),1),t("th",me,s(e.$t("global.show_order.quantity")),1),t("th",be,s(e.$t("global.show_order.total")),1)])]),t("tbody",null,[(n(!0),u(_,null,S(e.record?.items,(o,p)=>(n(),u("tr",{key:o.name},[t("td",ve,s(o.item?.category?.title?o.item?.category?.title[e.$i18n.locale]:"---"),1),t("td",ge,s(o.item?.title?o.item?.title[e.$i18n.locale]:"---"),1),t("td",we,s(o.item?.price),1),t("td",fe,s(o?.quantity),1),t("td",$e,[l(g,null,{default:d(()=>[p==0?(n(),u("thead",ye,[t("tr",null,[t("th",Se,s(e.$t("global.show_order.subtotal")),1),t("th",ke,s(e.$t("global.show_order.tax")),1),t("th",Oe,s(e.$t("global.show_order.total")),1)])])):m("",!0),t("tbody",null,[t("tr",null,[t("td",Ve,s(o?.sup_total),1),t("td",je,s(o?.vat),1),t("td",null,s(o?.total),1)])])]),_:2},1024)])]))),128))])]),_:1})]),_:1})]),_:1})])],64)),l(U,{modelValue:i.showMap,"onUpdate:modelValue":r[8]||(r[8]=o=>i.showMap=o),width:"auto"},{default:d(()=>[l(N,{"min-width":"400",class:"pa-4"},{default:d(()=>[t("p",Ae,s(e.record?.address[0]?.address),1),e.record?.address[0]?.location?.coordinates?(n(),h(P,{key:e.record?.address[0]?.location?.coordinates[0],center:e.record?.address[0]?.location?.coordinates,zoom:16,style:{height:"400px",width:"500px"}},null,8,["center"])):m("",!0)]),_:1})]),_:1},8,["modelValue"])])}const qe=T(I,[["render",Me],["__scopeId","data-v-9daafaa3"]]);export{qe as default};
//# sourceMappingURL=OrderAdminShow-DWXbyRMC.js.map