import{_ as n,o as a,c as l,b as c}from"./index-CS9bw-lj.js";const i={methods:{showAlert(){this.$swal({title:"Do you want to save the changes?",showCancelButton:!0,confirmButtonText:this.$t("global.actions.save"),cancelButtonText:this.$t("global.actions.cancel")}).then(t=>{t.value?this.$swal({title:"Saved!",icon:"success",confirmButtonText:this.$t("global.actions.save")}):t.dismiss==="cancel"&&this.$swal({title:"Cancelled",icon:"info",confirmButtonText:this.$t("global.actions.save")})})}}};function r(t,e,h,u,f,o){return a(),l("div",null,[c("button",{onClick:e[0]||(e[0]=(...s)=>o.showAlert&&o.showAlert(...s))},"Hello world")])}const m=n(i,[["render",r]]);export{m as C};
//# sourceMappingURL=ConfirmDialog-CLTOtqR2.js.map
