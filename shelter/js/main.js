(()=>{"use strict";(e=>{const t=new Image;t.onload=t.onerror=function(){!function(e){const t=!0===e?"webp":"no-webp";document.documentElement.classList.add(t)}(2==t.height)},t.src="data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA"})(),(()=>{const e=document.querySelector(".hamburger"),t=document.querySelector(".mobile-menu"),s=document.querySelector(".header__wrap"),o=()=>{e.classList.remove("hamburger--rotate"),t.classList.remove("menu--active"),s.addEventListener("click",a),document.body.removeAttribute("style")},n=e=>{(e.target.closest(".hamburger--rotate")||e.target.closest(".burger-nav__item")||e.target.closest(".mobile-menu__overlay"))&&o()},a=o=>{o.target.closest(".hamburger")&&(e.classList.add("hamburger--rotate"),t.classList.add("menu--active"),s.removeEventListener("click",a),s.addEventListener("click",n),document.body.style.overflow="hidden")};s.addEventListener("click",a),window.addEventListener("resize",(()=>{document.documentElement.clientWidth>767&&o()}))})(),(()=>{const e=document.querySelector(".modal"),t=document.querySelector(".pets__items"),s=document.querySelector(".modal__close"),o=document.querySelector(".modal__content");t.addEventListener("click",(t=>{t.target.closest(".pets__item")&&(t.preventDefault(),(async e=>{const t=await(async e=>{try{const t=await fetch(e);return await t.json()}catch(e){console.error(e)}})("./files/petsDB.json");o.innerHTML="",t.forEach((t=>{if(t.id===e){const{name:e,type:s,breed:n,description:a,age:i,img:c,inoculations:d,diseases:l,parasites:r}=t;console.log("parasites: ",d.join(", "));const m=`\n            <div class="pet__img">\n               <img src="${c}" alt="${e}-image">\n            </div>\n            <div class="pet__about">\n               <div class="pet__header">\n                  <h3 class="pet__name">${e}</h3>\n                  <p class="pet__breed">${s} - ${n}</p>\n               </div>\n               <p class="pet__description">${a}</p>\n               <ul class="pet__info">\n                  <li class="pet__info-item">\n                     <p><span>Age:</span> ${i}</p>\n                  </li>\n                  <li class="pet__info-item">\n                     <p><span>Inoculations:</span> ${d.join(", ")}</p>\n                  </li>\n                  <li class="pet__info-item">\n                     <p><span>Diseases:</span> ${l.join(", ")}</p>\n                  </li>\n                  <li class="pet__info-item">\n                     <p><span>Parasites:</span> ${r.join(", ")}</p>\n                  </li>\n               </ul>\n            </div>\n         `;o.insertAdjacentHTML("beforeEnd",m)}}))})(t.target.closest(".pets__item").dataset.id),e.classList.add("modal--active"),(()=>{const e=window.scrollY;let t=window.innerWidth-document.body.offsetWidth;document.body.classList.add("disable-scroll"),document.body.dataset.position=e,document.body.style.top=-e+"px",document.body.style.paddingRight=`${t}px`})())})),e.addEventListener("click",(t=>{t.target.closest(".modal__content")||(e.classList.remove("modal--active"),(()=>{const e=parseInt(document.body.dataset.position,10);document.documentElement.style.scrollBehavior="auto",document.body.removeAttribute("class"),window.scroll({top:e,left:0}),document.body.removeAttribute("data-position"),document.body.removeAttribute("style"),document.documentElement.removeAttribute("style")})())})),e.addEventListener("mouseover",(t=>{t.target.closest(".modal__content")?(s.classList.remove("close--active"),e.removeAttribute("style")):(s.classList.add("close--active"),e.style.cursor="pointer")}))})()})();