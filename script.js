document.querySelectorAll('.deck').forEach(deck=>{let index=0;const count=Number(deck.dataset.count);const folder=deck.dataset.folder;const title=deck.dataset.title;const img=deck.querySelector('.stage>img');const counter=deck.querySelector('.counter');const progress=deck.querySelector('.progress');const show=()=>{img.src=`assets/slides/${folder}/slide-${String(index+1).padStart(2,'0')}.jpg`;img.alt=`${title} 발표자료 ${index+1}페이지`;counter.textContent=`${String(index+1).padStart(2,'0')} / ${String(count).padStart(2,'0')}`;progress.style.width=`${(index+1)/count*100}%`;img.style.animation='none';requestAnimationFrame(()=>img.style.animation='slideIn .5s ease')};const move=n=>{index=(index+n+count)%count;show()};deck.querySelector('.prev').onclick=()=>move(-1);deck.querySelector('.next').onclick=()=>move(1);let timer=setInterval(()=>move(1),5200);deck.onmouseenter=()=>clearInterval(timer);deck.onmouseleave=()=>timer=setInterval(()=>move(1),5200);let start=0;deck.querySelector('.stage').addEventListener('pointerdown',e=>start=e.clientX);deck.querySelector('.stage').addEventListener('pointerup',e=>{const d=e.clientX-start;if(Math.abs(d)>45)move(d<0?1:-1)});show()});
const cards=[...document.querySelectorAll('.hero-card')];let active=0;setInterval(()=>{cards[active].classList.remove('active');active=(active+1)%cards.length;cards[active].classList.add('active')},5000);
const revealTargets=document.querySelectorAll('.skills article,.about-grid,.work-title>*,.project,.footer h2,.footer-contact-row');revealTargets.forEach(el=>el.classList.add('reveal'));if('IntersectionObserver'in window){const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target)}}),{threshold:.1,rootMargin:'0px 0px -40px'});revealTargets.forEach(el=>observer.observe(el))}else revealTargets.forEach(el=>el.classList.add('visible'));

document.querySelectorAll('.copy-contact').forEach(button=>button.addEventListener('click',async()=>{
  const value=button.dataset.copy||'';
  try{
    if(navigator.clipboard&&window.isSecureContext){await navigator.clipboard.writeText(value)}
    else{
      const input=document.createElement('textarea');input.value=value;input.style.position='fixed';input.style.opacity='0';document.body.appendChild(input);input.select();document.execCommand('copy');input.remove();
    }
    const original=button.textContent;button.textContent='복사 완료';button.classList.add('copied');
    setTimeout(()=>{button.textContent=original;button.classList.remove('copied')},1600);
  }catch(error){button.textContent='복사 실패';setTimeout(()=>button.textContent='복사하기',1600)}
}));
