import{i as m,v as y,u as f,F as l,w as u}from"./geosearch.module-C3uEVW0W.js";import{_ as g,r as n,o as _,c as M,a as r,w,W as b}from"./index-CS9bw-lj.js";const v={props:{center:{type:Array,default:()=>[47.41322,-1.219482]},style:{type:Object,default:()=>({})},zoom:{type:Number,default:16},isEditMode:{type:Boolean,default:!1}},components:{LMap:m,LTileLayer:y,LMarker:f},data(){return{points:[0,0],address:{title:"",lat:"",long:""}}},created(){this.points=this.center},mounted(){this.$nextTick(()=>{this.isEditMode&&this.initMapBySearch()})},computed:{styleMap(){return{height:this.style.height||"400px",width:this.style.width||"100%"}}},methods:{updateCenter(t){this.points=[t.target._latlng.lat,t.target._latlng.lng],this.findAddressByCoordinates()},findAddressByCoordinates(){const t=new l;fetch(`${t.searchUrl}?q=${this.points[0]},${this.points[1]}&polygon_geojson=1&format=json`).then(e=>e.json()).then(e=>{this.address={title:e[0]?.display_name,lat:e[0]?.lat,long:e[0]?.lon},this.$emit("getLocation",this.address)})},initMapBySearch(){const t=new l({params:{countrycodes:"SA"}}),e=new u({provider:t,notFoundMessage:"Sorry, that address could not be found.",searchLabel:"البحث",style:"bar"}),o=new L.Map("leafletmap");o.addControl(e),o.on("geosearch/showlocation",a=>{this.points=[a.location.y,a.location.x],o.eachLayer(s=>{s instanceof L.Marker&&o.removeLayer(s)}),this.findAddressByCoordinates()})}}};function C(t,e,o,a,s,i){const p=n("l-tile-layer"),d=n("l-marker"),c=n("l-map");return _(),M("div",{class:"position-relative w-100",id:"leafletmap",key:`${s.points[0]}-${s.points[1]}`},[r(c,{ref:"map",zoom:o.zoom,center:s.points,"global-leaflet":!1,style:b(i.styleMap)},{default:w(()=>[r(p,{url:"https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png","layer-type":"base",name:"OpenStreetMap"}),r(d,{"lat-lng":s.points,"update:visible":!0,draggable:o.isEditMode,onDragend:e[0]||(e[0]=h=>i.updateCenter(h))},null,8,["lat-lng","draggable"])]),_:1},8,["zoom","center","style"])])}const B=g(v,[["render",C]]);export{B as M};
//# sourceMappingURL=MapsView-BFRTDR2k.js.map