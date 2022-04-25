(()=>{"use strict";const e=async e=>{try{const t=await fetch(e);return await t.json()}catch(e){console.error(e)}},t=(e=3,t=0,s=7)=>{const n=new Set;for(;n.size!==e;)n.add(Math.floor(Math.random()*(s-t+1))+t);return[...n]};(e=>{const t=new Image;t.onload=t.onerror=function(){!function(e){const t=!0===e?"webp":"no-webp";document.documentElement.classList.add(t)}(2==t.height)},t.src="data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA"})(),(()=>{const e=document.querySelector(".hamburger"),t=document.querySelector(".mobile-menu"),s=document.querySelector(".header__wrap"),n=()=>{e.classList.remove("hamburger--rotate"),t.classList.remove("menu--active"),s.addEventListener("click",o),document.body.removeAttribute("style")},i=e=>{(e.target.closest(".hamburger--rotate")||e.target.closest(".burger-nav__item")||e.target.closest(".mobile-menu__overlay"))&&n()},o=n=>{n.target.closest(".hamburger")&&(e.classList.add("hamburger--rotate"),t.classList.add("menu--active"),s.removeEventListener("click",o),s.addEventListener("click",i),document.body.style.overflow="hidden")};s.addEventListener("click",o),window.addEventListener("resize",(()=>{document.documentElement.clientWidth>767&&n()}))})(),(()=>{const t=document.querySelector(".modal"),s=document.querySelector(".pets__items"),n=document.querySelector(".modal__close"),i=document.querySelector(".modal__content");s.addEventListener("click",(s=>{s.target.closest(".pets__item")&&(s.preventDefault(),(async t=>{const s=await e("./files/petsDB.json");i.innerHTML="",s.forEach((e=>{if(e.id===t){const{name:t,type:s,breed:n,description:o,age:a,img:c,inoculations:d,diseases:l,parasites:r}=e;console.log("parasites: ",d.join(", "));const m=`\n            <div class="pet__img">\n               <img src="${c}" alt="${t}-image">\n            </div>\n            <div class="pet__about">\n               <div class="pet__header">\n                  <h3 class="pet__name">${t}</h3>\n                  <p class="pet__breed">${s} - ${n}</p>\n               </div>\n               <p class="pet__description">${o}</p>\n               <ul class="pet__info">\n                  <li class="pet__info-item">\n                     <p><span>Age:</span> ${a}</p>\n                  </li>\n                  <li class="pet__info-item">\n                     <p><span>Inoculations:</span> ${d.join(", ")}</p>\n                  </li>\n                  <li class="pet__info-item">\n                     <p><span>Diseases:</span> ${l.join(", ")}</p>\n                  </li>\n                  <li class="pet__info-item">\n                     <p><span>Parasites:</span> ${r.join(", ")}</p>\n                  </li>\n               </ul>\n            </div>\n         `;i.insertAdjacentHTML("beforeEnd",m)}}))})(s.target.closest(".pets__item").dataset.id),t.classList.add("modal--active"),(()=>{const e=window.scrollY;let t=window.innerWidth-document.body.offsetWidth;document.body.classList.add("disable-scroll"),document.body.dataset.position=e,document.body.style.top=-e+"px",document.body.style.paddingRight=`${t}px`})())})),t.addEventListener("click",(e=>{e.target.closest(".modal__content")||(t.classList.remove("modal--active"),(()=>{const e=parseInt(document.body.dataset.position,10);document.documentElement.style.scrollBehavior="auto",document.body.removeAttribute("class"),window.scroll({top:e,left:0}),document.body.removeAttribute("data-position"),document.body.removeAttribute("style"),document.documentElement.removeAttribute("style")})())})),t.addEventListener("mouseover",(e=>{e.target.closest(".modal__content")?(n.classList.remove("close--active"),t.removeAttribute("style")):(n.classList.add("close--active"),t.style.cursor="pointer")}))})(),(async()=>{const s=document.getElementById("slider-pagination"),n=document.getElementById("pagination-buttons"),i=document.getElementById("count-lists"),o=document.getElementById("next-item"),a=document.getElementById("prev-item"),c=document.getElementById("first-item"),d=document.getElementById("last-item"),l=await e("./files/petsDB.json");let r=1,m=1,u=0,p=100*m,v=8;const _=()=>{(()=>{let e=t(8),n=e,i=n.slice(-2),o=[],a=4,c=2;const d=()=>{e=t(8),o=e.slice(0,a),o.some((e=>i.some((t=>e===t))))?d():(n=[...n,...e],i=e.slice(-c))};for(let e=0;e<5;e++)0===e||3===e?(a=4,c=4,d()):1===e||4===e?(a=2,c=4,d()):2===e&&(a=4,c=2,d());const m=n.map((e=>l[e]));s.innerHTML="",((e,t,s)=>{const n=document.querySelector(t);e.forEach((e=>{const{img:t,name:i,id:o}=e,a=`\n            <li class="pets__item" data-id="${o}">\n               <div class="pets__item-img">\n                  <img src="${t}" alt="${i}-image">\n               </div>\n               <p class="pets__item-name">${i}</p>\n               <a href="#" class="button pets__item-button">Learn more</a>\n            </li>\n         `;n.insertAdjacentHTML(s,a)}))})(m,".pets__items","beforeEnd"),r=m.length/v})(),i.innerText=1,s.style.transform="translateY(0%)"},g=()=>{s.classList.add("items--transition"),n.removeEventListener("click",L),p=100*u,s.style.transform=`translateY(-${p}%)`,i.innerText=m},y=(e,t)=>{e.classList.add("item--active"),t.classList.add("item--active"),e.classList.remove("item--disable"),t.classList.remove("item--disable")},b=(e,t)=>{e.classList.add("item--disable"),t.classList.add("item--disable"),e.classList.remove("item--active"),t.classList.remove("item--active")},L=e=>{e.target.closest("#next-item")&&u<r-1?(++m,++u,g(),2===m&&y(a,c),m===r&&b(o,d)):e.target.closest("#prev-item")&&u>0?(--m,--u,g(),1===m&&b(a,c),m===r-1&&y(o,d)):e.target.closest("#last-item")&&u!==r-1?(m=r,u=r-1,b(o,d),y(a,c),g()):e.target.closest("#first-item")&&u>0&&(m=1,u=0,g(),b(a,c),y(o,d))};n.addEventListener("click",L),s.addEventListener("transitionend",(()=>{s.classList.remove("items--transition"),n.addEventListener("click",L)}));const h=()=>{b(a,c),y(o,d),m=1,u=0,_()},f=window.matchMedia("(min-width: 1280px)"),E=window.matchMedia("(min-width: 768px) and (max-width: 1279px)"),A=e=>{f.matches?(v=8,h()):E.matches?(v=6,h()):(v=3,h())};A(),f.addEventListener("change",A),E.addEventListener("change",A)})()})();