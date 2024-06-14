import{L as T}from"./Loader-B8eGEbwu.js";import{u as w}from"./orders.merchant.store-9M_F6FAt.js";import{_ as q,m as z,e as E,r as a,o as n,c as i,f as u,F as _,a as d,w as l,b as t,i as f,t as s,n as $,g as b,h as m}from"./index-CS9bw-lj.js";import{M as I}from"./MapsView-BFRTDR2k.js";import"./api.helper-X78EMQNg.js";import"./geosearch.module-C3uEVW0W.js";const U={components:{Loader:T,MapsView:I},data(){return{openShare:!1,showMap:!1}},async mounted(){await this.showOrdersMerchant(this.$route.params.id,{includeOrderItemService:1,includeOrderMerchantUser:1,includeOrderMerchantClient:1,includeOrderSP:1})},computed:{...z(w,["record","uiFlags"]),orderStatus(){let e=[{value:"new",text:this.$t("global.order_status.new"),step:1},{value:"confirmed",text:this.$t("global.order_status.confirmed"),step:2},{value:"on_the_way",text:this.$t("global.order_status.on_the_way"),step:3},{value:"in_progress",text:this.$t("global.order_status.in_progress"),step:4},{value:"completed",text:this.$t("global.order_status.completed"),step:5},{value:"canceled",text:this.$t("global.order_status.canceled"),step:6}];return this.record?.status==="canceled"&&(e=e.filter(o=>o.value!=="completed")),this.record?.status==="completed"&&(e=e.filter(o=>o.value!=="canceled")),e},shareText(){return`${this.$t("share_order.client_name")} : ${this.record?.merchant_client?.name}, ${this.$t("share_order.client_phone")} : ${this.record?.merchant_client?.phone}, 
        ${this.$t("share_order.client_address")} : ${this.record?.merchant_client?.address}

      , 
        ${this.$t("share_order.merchant_address")} : ${this.record?.merchant_user?.address}
      ,
       ${this.$t("share_order.created_by")} : ${this.record?.merchant_user?.name},
      
       ${this.$t("share_order.merchant_phone")} : ${this.record?.merchant_user?.phone} ,
      ${this.$t("share_order.start_date")} : ${this.record?.started_at}`},currentStep(){return this.orderStatus.find(e=>e?.value===this.record?.status)}},methods:{...E(w,["showOrdersMerchant"])}},A={class:"content"},D={class:"border-t mt-4 pt-4"},P={class:"border pa-4 order-info rounded-lg"},G={class:"border-b mb-2"},H={class:"d-flex align-center ga-2 mb-2 pb-2 justify-space-between"},J={class:"d-flex align-center ga-2 mb-2 pb-2 justify-space-between"},K={class:"d-flex align-center ga-2 mb-2 pb-2 justify-space-between"},Q={class:"d-flex align-center ga-2 mb-2 pb-2 justify-space-between"},R={class:"border-b mb-2"},W={class:"d-flex align-center ga-2 mb-2 pb-2 justify-space-between"},X={class:"d-flex align-center ga-2 mb-2 pb-2 justify-space-between position-relative"},Y={class:"bg-white"},Z={class:"d-flex align-center ga-2 mb-2 pb-2 justify-space-between"},x={class:"d-flex align-center ga-2 mb-2 pb-2 justify-space-between"},ee={class:"d-flex align-center ga-2 mb-2 pb-2 justify-space-between"},te={class:"text-start border-e"},se={class:"text-start border-e"},re={class:"text-start border-e"},oe={class:"text-start border-e"},ae={class:"text-start"},de={class:"border-e"},le={class:"border-e"},ne={class:"border-e"},ce={class:"border-e"},ie={class:"px-0"},he={key:0},pe={class:"text-start border-e"},_e={class:"text-start border-e"},ue={class:"text-start border-b"},be={class:"border-e",width:"84px"},me={class:"border-e",width:"75px"},ge={class:"mb-3"};function ve(e,o,we,fe,c,p){const y=a("Loader"),S=a("v-divider"),M=a("v-stepper-item"),k=a("v-stepper-header"),V=a("v-stepper"),j=a("v-chip"),O=a("v-icon"),C=a("ShareNetwork"),g=a("v-col"),v=a("v-table"),L=a("v-row"),N=a("MapsView"),B=a("v-card"),F=a("v-dialog");return n(),i("div",A,[e.uiFlags.isLoading?(n(),u(y,{key:0})):(n(),i(_,{key:1},[d(V,{"alt-labels":"",elevation:"0"},{default:l(()=>[d(k,null,{default:l(()=>[(n(!0),i(_,null,f(p.orderStatus,(r,h)=>(n(),i(_,{key:h},[h!==0?(n(),u(S,{key:0})):m("",!0),d(M,{complete:p.currentStep?.step>r?.step||e.record?.status==="completed"||e.record?.status==="canceled",step:h+1,editable:!1,class:$(p.currentStep?.step===r?.step&&e.record?.status!=="completed"&&e.record?.status!=="canceled"?"active":"")},{default:l(()=>[b(s(r.text),1)]),_:2},1032,["complete","step","class"])],64))),128))]),_:1})]),_:1}),t("div",D,[d(L,null,{default:l(()=>[d(g,{md:"4",cols:"12"},{default:l(()=>[t("div",P,[t("div",G,[t("div",H,[t("span",null,s(e.$t("global.show_order.status")),1),d(j,{variant:"flat",class:$({"chip--new":e.record?.status==="new","chip--confirmed":e.record?.status==="confirmed","chip--on-the-way":e.record?.status==="on_the_way","chip--in-progress":e.record?.status==="in_progress","chip--completed":e.record?.status==="completed","chip--canceled":e.record?.status==="canceled"})},{default:l(()=>[b(s(e.$t(`global.order_status.${e.record.status}`)),1)]),_:1},8,["class"])]),t("div",J,[t("span",null,s(e.$t("global.show_order.order_number")),1),t("p",null,s(e.record?.id),1)]),t("div",K,[t("span",null,s(e.$t("global.show_order.order_creation_date")),1),t("p",null,s(e.record?.created_at?e.record?.created_at:"---"),1)]),t("div",Q,[t("span",null,s(e.$t("global.show_order.order_start_date")),1),t("p",null,s(e.record?.started_at?e.record?.started_at:"---"),1)])]),t("div",R,[t("div",W,[t("span",null,s(e.$t("global.show_order.created_by")),1),t("p",null,s(e.record?.merchant_user?.name?e.record?.merchant_user?.name:"---"),1)]),t("div",X,[t("span",null,s(e.$t("global.show_order.address")),1),t("button",{onClick:o[0]||(o[0]=r=>c.showMap=!c.showMap)},s(e.$t("global.show_order.view_location")),1)])]),t("div",Y,[t("div",Z,[t("span",null,s(e.$t("global.show_order.subtotal")),1),t("h4",null,s(e.record?.totals?.sup_total),1)]),t("div",x,[t("span",null,s(e.$t("global.show_order.tax")),1),t("h4",null,s(e.record?.totals?.vat),1)]),t("div",ee,[t("span",null,s(e.$t("global.show_order.total")),1),t("h4",null,s(e.record?.totals?.total),1)])]),d(C,{class:"main-btn pa-2 rounded-lg w-100 text-center mt-4",network:"whatsapp",url:"",title:e.$t("share_order.order_number")+e.record?.id,description:p.shareText,onOpen:o[1]||(o[1]=r=>c.openShare=!0),onChange:o[2]||(o[2]=r=>c.openShare=!1),onClose:o[3]||(o[3]=r=>c.openShare=!1)},{default:l(()=>[d(O,{size:"24"},{default:l(()=>[b("mdi mdi-share-variant-outline")]),_:1})]),_:1},8,["title","description"])])]),_:1}),d(g,{md:"8",cols:"12"},{default:l(()=>[d(v,{class:"border rounded-lg"},{default:l(()=>[t("thead",null,[t("tr",null,[t("th",te,s(e.$t("global.show_order.category")),1),t("th",se,s(e.$t("global.show_order.service")),1),t("th",re,s(e.$t("global.show_order.unit_price")),1),t("th",oe,s(e.$t("global.show_order.quantity")),1),t("th",ae,s(e.$t("global.show_order.total")),1)])]),t("tbody",null,[(n(!0),i(_,null,f(e.record?.items,(r,h)=>(n(),i("tr",{key:r.name},[t("td",de,s(r.item?.category?.title?r.item?.category?.title[e.$i18n.locale]:"---"),1),t("td",le,s(r.item?.title?r.item?.title[e.$i18n.locale]:"---"),1),t("td",ne,s(r.item?.price),1),t("td",ce,s(r?.quantity),1),t("td",ie,[d(v,null,{default:l(()=>[h==0?(n(),i("thead",he,[t("tr",null,[t("th",pe,s(e.$t("global.show_order.subtotal")),1),t("th",_e,s(e.$t("global.show_order.tax")),1),t("th",ue,s(e.$t("global.show_order.total")),1)])])):m("",!0),t("tbody",null,[t("tr",null,[t("td",be,s(r?.sup_total),1),t("td",me,s(r?.vat),1),t("td",null,s(r?.total),1)])])]),_:2},1024)])]))),128))])]),_:1})]),_:1})]),_:1})])],64)),d(F,{modelValue:c.showMap,"onUpdate:modelValue":o[4]||(o[4]=r=>c.showMap=r),width:"auto"},{default:l(()=>[d(B,{"min-width":"400",class:"pa-4"},{default:l(()=>[t("p",ge,s(e.record?.address[0]?.address),1),e.record?.address[0]?.location?.coordinates?(n(),u(N,{key:e.record?.address[0]?.location?.coordinates[0],center:e.record?.address[0]?.location?.coordinates,style:{height:"400px",width:"800px"},isEditMode:!1},null,8,["center"])):m("",!0)]),_:1})]),_:1},8,["modelValue"])])}const je=q(U,[["render",ve],["__scopeId","data-v-535b0cb6"]]);export{je as default};
//# sourceMappingURL=OrdersMerchantShow-CwcvH1ul.js.map