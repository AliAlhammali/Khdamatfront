import{A as i,k as l,B as a}from"./index-CS9bw-lj.js";import{A as n}from"./api.helper-X78EMQNg.js";class r extends n{constructor(){super("actions")}upload_file(o){const t=new FormData;return t.append("file",o),axios.post(`${this.url}/upload`,t)}}const c=new r,e=i(),d=l("GlobalActions",{state:()=>({isLoading:!1}),getters:{},actions:{uploadFile:async function(s){this.isLoading=!0;try{const o=await c.upload_file(s);return e.success(a.global.t("global.actions.upload_success")),o}catch{e.error(a.global.t("global.actions.upload_error"))}finally{this.isLoading=!1}}}});export{d as u};
//# sourceMappingURL=upload.store-D2_zDjX1.js.map
