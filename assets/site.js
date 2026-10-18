const LINE_URL='https://line.me/R/ti/p/@232mjffx';
const APP_URL='https://cat-care-beta.hannahchen6134.workers.dev/';
const nav=[['第一次使用','getting-started.html'],['功能介紹','features.html'],['方案價格','pricing.html'],['常見問題','faq.html']];
const path=(location.pathname.split('/').pop()||'index.html');
const active=(href)=>path===href?' aria-current="page"':'';
const isHome=path==='index.html';

document.querySelector('[data-site-header]')?.insertAdjacentHTML('afterbegin',`<a class="skip-link" href="#main">跳到主要內容</a><header class="site-header"><div class="container nav"><a class="brand" href="index.html" aria-label="喵喵管家首頁"><img src="assets/meow-logo-transparent.png" alt=""><img src="assets/meow-title.png" alt="喵喵管家"></a><button class="menu-toggle" aria-label="開啟選單" aria-expanded="false" aria-controls="main-nav">☰</button><nav class="nav-links" id="main-nav" aria-label="主要選單">${nav.map(([l,h])=>`<a href="${h}"${active(h)}>${l}</a>`).join('')}</nav><a class="nav-secondary" href="${APP_URL}">開啟管家後台</a><a class="nav-cta" href="${LINE_URL}">加入 LINE 開始記錄</a></div></header>`);

document.querySelector('[data-site-footer]')?.insertAdjacentHTML('afterbegin',`<footer class="site-footer"><div class="container">${isHome?'':'<div class="footer-minimal"><div class="footer-brand"><img src="assets/meow-logo-transparent.png" alt=""><strong>喵喵管家</strong></div><p>把每天零散的照護，整理成交接與回診真正用得上的紀錄。</p></div>'}<div class="footer-bottom"><nav class="footer-legal" aria-label="法律與資料資訊"><a href="privacy.html">隱私權</a><a href="data-rights.html">資料權利</a><a href="medical-disclaimer.html">非醫療診斷</a><a href="terms.html">服務條款</a></nav><span>© 2026 ${isHome?'MeowMeow Care':'喵喵管家 MeowMeow Care'}</span></div></div></footer>`);

const toggle=document.querySelector('.menu-toggle');
const links=document.querySelector('.nav-links');
const closeMenu=()=>{links?.classList.remove('open');toggle?.setAttribute('aria-expanded','false');if(toggle)toggle.textContent='☰'};
toggle?.addEventListener('click',()=>{const open=links.classList.toggle('open');toggle.setAttribute('aria-expanded',String(open));toggle.textContent=open?'×':'☰'});
links?.querySelectorAll('a').forEach(link=>link.addEventListener('click',closeMenu));
document.addEventListener('keydown',event=>{if(event.key==='Escape')closeMenu()});

document.querySelector('.a-hero-copy')?.classList.add('motion-copy');
const revealSelectors=['.page-hero > .container','.section > .container','.final-cta > .container','.home-directory'];
document.querySelectorAll(revealSelectors.join(',')).forEach(element=>element.classList.add('motion-reveal'));
document.querySelectorAll('.feature-list,.pricing-grid,.steps,.footer-grid').forEach(group=>{
  group.classList.add('motion-group');
  [...group.children].forEach((child,index)=>child.style.setProperty('--motion-index',index));
});

const prefersReduced=window.matchMedia('(prefers-reduced-motion: reduce)');
if('IntersectionObserver' in window&&!prefersReduced.matches){
  const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{
    if(entry.isIntersecting){entry.target.classList.add('is-visible');observer.unobserve(entry.target)}
  }),{threshold:.12,rootMargin:'0px 0px -5%'});
  document.querySelectorAll('.motion-reveal').forEach(element=>observer.observe(element));
}else{
  document.querySelectorAll('.motion-reveal').forEach(element=>element.classList.add('is-visible'));
}

const hero=document.querySelector('.a-hero');
const illustration=document.querySelector('.hero-illustration');
if(illustration){
  let illustrationVisible=false;
  const syncIllustrationMotion=()=>illustration.classList.toggle('is-active',illustrationVisible&&!document.hidden&&!prefersReduced.matches);
  const revealIllustration=()=>illustration.classList.add('has-entered');
  if('IntersectionObserver' in window){
    const illustrationObserver=new IntersectionObserver(([entry])=>{
      illustrationVisible=entry.isIntersecting;
      if(illustrationVisible)revealIllustration();
      syncIllustrationMotion();
    },{threshold:.15});
    illustrationObserver.observe(illustration);
  }else{
    illustrationVisible=true;
    revealIllustration();
    syncIllustrationMotion();
  }
  document.addEventListener('visibilitychange',syncIllustrationMotion);
  prefersReduced.addEventListener?.('change',syncIllustrationMotion);
}

requestAnimationFrame(()=>requestAnimationFrame(()=>document.documentElement.classList.add('js-ready')));
