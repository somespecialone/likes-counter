import t from"https://cdn.jsdelivr.net/npm/lodash@4.17.21/+esm";const bu="",e="demo-page::10",o={Accept:"application/json","Content-Type":"application/json"};let n=Number(localStorage.getItem("total-likes"))||0,a=Number(localStorage.getItem("user-likes"))||0,s=localStorage.getItem("user-id");const i=t.debounce((()=>{const t=JSON.stringify({count:a});fetch(`${bu}/${e}/${s}`,{method:"post",body:t,headers:o})}),1500);function c(){const t=document.getElementById("likes"),e=document.getElementById("container");t.innerText=(n+a).toString(),localStorage.setItem("total-likes",n),localStorage.setItem("user-likes",a),e.style.setProperty("--fz",(.95+.05*a).toString())}function l(t){t.preventDefault(),0===t.button&&a<10?a++:2===t.button&&a>0&&a--,c(),i()}let r=!1;function m(){const t=document.getElementById("gh-ico");r=!r,t.classList.toggle("animation",r),setTimeout(m,r?501:Math.ceil(15e3*Math.random()+21e3))}!async function(){if(!s){const t=await fetch(`${bu}/generate`),e=await t.json();s=e.id,localStorage.setItem("user-id",s)}const t=await fetch(`${bu}/${e}/${s}`),o=await t.json();n=o.totalLikes-o.userLikes,a=o.userLikes,c();const i=document.getElementById("container");i.addEventListener("click",l),i.addEventListener("contextmenu",l),setTimeout(m,Math.ceil(15e3*Math.random()+21e3))}();