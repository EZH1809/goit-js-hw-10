import"./assets/modulepreload-polyfill-3cfb730f.js";/* empty css                      */import{i}from"./assets/vendor-77e16229.js";const s=document.querySelector(".form");s.addEventListener("submit",l=>{l.preventDefault();const t=parseInt(s.elements.delay.value,10),m=s.elements.state.value;s.elements.delay.value="",new Promise((e,r)=>{setTimeout(()=>{m==="fulfilled"?e(t):r(t)},t)}).then(e=>{i.success({title:"Fulfilled promise",message:`✅ Fulfilled promise in ${e}ms`})}).catch(e=>{i.error({title:"Rejected promise",message:`❌ Rejected promise in ${e}ms`})})});
//# sourceMappingURL=commonHelpers2.js.map
