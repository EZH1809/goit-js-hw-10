import"./assets/modulepreload-polyfill-3cfb730f.js";/* empty css                      */import{i}from"./assets/vendor-77e16229.js";const t=document.querySelector(".form");t.addEventListener("submit",r=>{r.preventDefault();const s=parseInt(t.elements.delay.value,10),m=t.elements.state.value;new Promise((e,o)=>{setTimeout(()=>{m==="fulfilled"?e(s):o(s)},s)}).then(e=>{i.success({title:"Fulfilled promise",message:`✅ Fulfilled promise in ${e}ms`})}).catch(e=>{i.error({title:"Rejected promise",message:`❌ Rejected promise in ${e}ms`})})});
//# sourceMappingURL=commonHelpers2.js.map