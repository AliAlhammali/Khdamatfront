import{F as q,u as B,r as u,e as C}from"./index-COJIqLJ_.js";import{u as $}from"./merchantUsers.admin.store-DOVxxfjf.js";import{_ as D,m as f,e as g,r as l,o,c as p,f as v,F as b,b as s,t as c,a as i,w as d,h as y,i as E,g as x}from"./index-CS9bw-lj.js";import{u as U}from"./merchant.admin.store-CfqCq9f2.js";import{L as P}from"./Loader-B8eGEbwu.js";import{u as S}from"./update.inputs.helper-BL7S9VQe.js";import"./api.helper-X78EMQNg.js";const T={components:{FiledInput:q,Loader:P},setup(){return{v$:B()}},validations(){return{merchant:{name:{required:u},email:{required:u,email:C},merchant_id:{required:u},password:{required:u}}}},data(){return{merchant:{name:null,email:null,merchant_id:null,password:null},showPassword:!1,objDataUpdate:{}}},async created(){await this.getMerchantAdmin({listing:1})},async mounted(){if(this.isEditMerchant){const e=this.$route.params.id;await this.showMerchantUsersAdmin(e),this.merchant={...this.record}}},computed:{...f(U,{merchants:"records",merchantsUiFlags:"uiFlags"}),...f($,["uiFlags","record"]),isEditMerchant(){return this.$route.name==="admin-merchant-users-edit"},merchantData(){return[{name:"name",type:"text",label:this.$t("admin_merchant.fields.name"),error:"v$.merchant.name.$error",errorText:this.v$.merchant.name.required.$invalid&&this.$t("errors.required"),blur:"v$.merchant.name.$touch()"},{name:"email",type:"email",label:this.$t("admin_merchant.fields.email"),error:"v$.merchant.email.$error",errorText:this.v$.merchant.email.required.$invalid&&this.$t("errors.required")||this.v$.merchant.email.email.$invalid&&this.$t("errors.email"),blur:"v$.merchant.email.$touch()"}]}},methods:{...g($,["createMerchantUsersAdmin","showMerchantUsersAdmin","updateMerchantUsersAdmin"]),...g(U,["getMerchantAdmin"]),actionBtn(){if(this.v$.$touch(),!this.v$.$error)if(this.isEditMerchant){this.objDataUpdate=S(this.merchant,this.record),this.updateMerchantUsersAdmin(this.record.id,this.objDataUpdate);return}else this.createMerchantUsersAdmin({...this.merchant})}},watch:{}},j={class:"content"},L={class:"d-flex border-b mb-4 pb-4 justify-space-between"},N={class:""},z=s("span",{class:"fa fa-arrow-left"},null,-1),I={class:"d-flex align-center ga-2 mb-3 filed__label"},G=s("span",{class:"text-red"},"*",-1),H={key:0,class:"text-error mt-2 d-flex ga-2 align-center"},J=s("span",{class:"mdi mdi-24px mdi-alert-circle-outline"},null,-1);function K(e,t,O,n,a,m){const M=l("loader"),V=l("v-select"),h=l("v-col"),_=l("filed-input"),k=l("v-btn"),F=l("v-row");return o(),p("div",j,[e.uiFlags.isLoading?(o(),v(M,{key:0})):(o(),p(b,{key:1},[s("div",L,[s("h2",N,c(m.isEditMerchant?e.$t("admin_merchant.edit_user_title"):e.$t("admin_merchant.add_new_user")),1),s("button",{class:"d-flex ga-2 align-center",onClick:t[0]||(t[0]=r=>e.$router.go(-1))},[s("span",null,c(e.$t("global.actions.back")),1),z])]),i(F,null,{default:d(()=>[i(h,{cols:"12",md:"6"},{default:d(()=>[s("p",I,[s("span",null,c(e.$t("admin_merchant.title")),1),G]),i(V,{modelValue:a.merchant.merchant_id,"onUpdate:modelValue":t[1]||(t[1]=r=>a.merchant.merchant_id=r),items:e.merchants?.data,"item-text":"name","item-value":"id","menu-icon":"mdi mdi-chevron-down",class:"w-100",outlined:"",error:n.v$.merchant.merchant_id.$dirty&&n.v$.merchant.merchant_id.required.$invalid,"no-data-text":e.$t("global.actions.no_data"),"hide-details":""},null,8,["modelValue","items","error","no-data-text"]),n.v$.merchant.merchant_id.$dirty&&n.v$.merchant.merchant_id.required.$invalid?(o(),p("p",H,[J,s("span",null,c(e.$t("errors.required")),1)])):y("",!0)]),_:1}),(o(!0),p(b,null,E(m.merchantData,(r,A)=>(o(),v(h,{cols:"12",md:"6",key:A},{default:d(()=>[i(_,{label:r.label,modelValue:a.merchant[r.name],"onUpdate:modelValue":w=>a.merchant[r.name]=w,value:a.merchant[r.name],type:r.type,error:n.v$.merchant[r.name].$error,"error-text":r.errorText,onBlur:w=>n.v$.merchant[r.name].$touch()},null,8,["label","modelValue","onUpdate:modelValue","value","type","error","error-text","onBlur"])]),_:2},1024))),128)),m.isEditMerchant?y("",!0):(o(),v(h,{key:0,md:"6",cols:"12"},{default:d(()=>[i(_,{label:e.$t("admin_merchant.fields.password"),modelValue:a.merchant.password,"onUpdate:modelValue":t[2]||(t[2]=r=>a.merchant.password=r),value:a.merchant.password,type:"password",error:n.v$.merchant.password.$error,"error-text":n.v$.merchant.password.required.$invalid&&e.$t("errors.required"),"show-password":a.showPassword,onShowPassword:t[3]||(t[3]=r=>a.showPassword=!a.showPassword),onBlur:t[4]||(t[4]=r=>n.v$.merchant.password.$touch())},null,8,["label","modelValue","value","error","error-text","show-password"])]),_:1})),i(h,{cols:"12"},{default:d(()=>[i(k,{class:"w-100",color:"primary",size:"large",onClick:m.actionBtn,loading:e.uiFlags.isCreating||e.uiFlags.isUpdated,disabled:e.uiFlags.isCreating||e.uiFlags.isUpdated||n.v$.merchant.$error},{default:d(()=>[x(c(m.isEditMerchant?e.$t("global.actions.edit"):e.$t("global.actions.add")),1)]),_:1},8,["onClick","loading","disabled"])]),_:1})]),_:1})],64))])}const re=D(T,[["render",K]]);export{re as default};
//# sourceMappingURL=MerchantUsersCreate-CjYT5lMn.js.map