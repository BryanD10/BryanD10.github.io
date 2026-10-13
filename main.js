'use strict';
const navButton=document.getElementById('mobileBtn');
const navLinks=document.getElementById('navLinks');
const mobile=window.matchMedia('(max-width:1060px)');
function setMenu(open,focusBack=false){
 if(!navButton||!navLinks)return;
 navLinks.classList.toggle('open',open);
 navButton.setAttribute('aria-expanded',String(open));
 navButton.setAttribute('aria-label',open?'Cerrar menú':'Abrir menú');
 navButton.innerHTML='<i class="fas '+(open?'fa-times':'fa-bars')+'" aria-hidden="true"></i>';
 navLinks.inert=mobile.matches&&!open;
 if(focusBack)navButton.focus();
}
navButton?.addEventListener('click',()=>setMenu(navButton.getAttribute('aria-expanded')!=='true'));
mobile.addEventListener('change',()=>setMenu(false));
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&navLinks?.classList.contains('open'))setMenu(false,true);});
document.addEventListener('click',e=>{if(navLinks?.classList.contains('open')&&!e.composedPath().includes(document.querySelector('.nav')))setMenu(false);});
navLinks?.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>setMenu(false)));
setMenu(false);
const current=location.pathname.split('/').pop()||'index.html';
navLinks?.querySelectorAll('a').forEach(a=>{if(a.getAttribute('href')===current){a.classList.add('active');a.setAttribute('aria-current','page');}});
document.querySelectorAll('[data-target]').forEach(el=>{el.textContent=Number(el.dataset.target).toLocaleString('es-SV')+(el.dataset.suffix||'');});
document.querySelectorAll('.faq-q').forEach((button,i)=>{
 const answer=button.parentElement.querySelector('.faq-a');
 if(!answer)return;
 answer.id='faq-answer-'+i;button.setAttribute('aria-controls',answer.id);answer.hidden=true;
 button.addEventListener('click',()=>{
 const open=button.getAttribute('aria-expanded')!=='true';
 button.setAttribute('aria-expanded',String(open));button.parentElement.classList.toggle('open',open);answer.hidden=!open;
 });
});
document.getElementById('footerYear')?.replaceChildren(String(new Date().getFullYear()));
document.querySelectorAll('a[href^="#"]').forEach(a=>a.addEventListener('click',e=>{
 const id=a.getAttribute('href').slice(1);if(!id)return;
 const target=document.getElementById(decodeURIComponent(id));if(!target)return;
 e.preventDefault();target.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth'});
 if(a.classList.contains('skip-link'))target.focus({preventScroll:true});
 history.replaceState(null,'','#'+encodeURIComponent(id));
}));
const quote=document.getElementById('quoteForm');
quote?.addEventListener('submit',e=>{
 e.preventDefault();if(!quote.reportValidity())return;
 const data=new FormData(quote);
 const text=['SOLICITUD DE COTIZACIÓN','Nombre: '+data.get('name'),'Teléfono: '+data.get('phone'),'Municipio: '+data.get('zona'),'Servicio: '+data.get('service'),data.get('message')?'Detalle: '+data.get('message'):''].filter(Boolean).join('\n');
 window.open('https://wa.me/50371626850?text='+encodeURIComponent(text),'_blank','noopener,noreferrer');
 const status=document.getElementById('form-error');status.textContent='Revisa y envía tu solicitud en WhatsApp.';status.style.display='block';status.style.color='#245a35';
});
const form=document.querySelector('form#mainForm');
form?.addEventListener('submit',async e=>{
 e.preventDefault();if(!form.reportValidity())return;
 const btn=form.querySelector('[type=submit]'),status=document.getElementById('form-status'),label=btn.textContent;
 const controller=new AbortController(),timer=setTimeout(()=>controller.abort(),15000);
 btn.disabled=true;btn.textContent='Enviando…';form.setAttribute('aria-busy','true');
 status.style.display='block';status.textContent='Enviando tu solicitud…';status.style.color='#334155';
 try{
 const res=await fetch(form.action,{method:'POST',body:new FormData(form),headers:{Accept:'application/json'},signal:controller.signal});
 if(!res.ok)throw Error('No se pudo confirmar el envío');
 status.textContent='Solicitud enviada. Te contactaremos para confirmar disponibilidad.';status.style.color='#245a35';form.reset();
 }catch{
 status.textContent='No pudimos confirmar el envío. Tus datos siguen en el formulario. ';
 const link=document.createElement('a');link.href='https://wa.me/50371626850';link.target='_blank';link.rel='noopener noreferrer';link.textContent='Contactar por WhatsApp';status.append(link);status.style.color='#a52222';
 }finally{clearTimeout(timer);btn.disabled=false;btn.textContent=label;form.removeAttribute('aria-busy');}
});
