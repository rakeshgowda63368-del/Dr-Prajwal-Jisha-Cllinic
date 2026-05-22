/* Jisha Prime — Premium JS */
(function(){
'use strict';

/* ── MOBILE NAV ── */
function initNav(){
  const toggle=document.getElementById('mobileToggle');
  const menu=document.getElementById('navMenu');
  if(!toggle||!menu) return;
  toggle.addEventListener('click',()=>{
    menu.classList.toggle('active');
    const icon=toggle.querySelector('i');
    icon.classList.toggle('fa-bars');
    icon.classList.toggle('fa-times');
  });
  menu.querySelectorAll('.nav-link').forEach(link=>{
    link.addEventListener('click',()=>{
      if(menu.classList.contains('active')){
        menu.classList.remove('active');
        const icon=toggle.querySelector('i');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
      }
    });
  });
}

/* ── HEADER SCROLL ── */
function initHeaderScroll(){
  const header=document.getElementById('header');
  if(!header) return;
  window.addEventListener('scroll',()=>{
    header.classList.toggle('scrolled',window.scrollY>50);
  });
}

/* ── SCROLL REVEAL ── */
function initReveal(){
  const els=document.querySelectorAll('.reveal,.reveal-left,.reveal-right');
  if(!els.length) return;
  const obs=new IntersectionObserver((entries)=>{
    entries.forEach(e=>{
      if(e.isIntersecting){
        e.target.classList.add('active');
        obs.unobserve(e.target);
      }
    });
  },{threshold:0.1,rootMargin:'0px 0px 150px 0px'});
  els.forEach(el=>obs.observe(el));
}

/* ── ANIMATED COUNTERS ── */
function initCounters(){
  const counters=document.querySelectorAll('.counter');
  if(!counters.length) return;
  const obs=new IntersectionObserver((entries)=>{
    entries.forEach(e=>{
      if(e.isIntersecting){
        animateCounter(e.target);
        obs.unobserve(e.target);
      }
    });
  },{threshold:0.5});
  counters.forEach(c=>obs.observe(c));
}

function animateCounter(el){
  const target=parseInt(el.getAttribute('data-target'));
  const duration=2000;
  const start=performance.now();
  function update(now){
    const progress=Math.min((now-start)/duration,1);
    const eased=1-Math.pow(1-progress,3);
    el.textContent=Math.floor(eased*target);
    if(progress<1) requestAnimationFrame(update);
    else el.textContent=target;
  }
  requestAnimationFrame(update);
}

/* ── HERO STAT COUNTERS ── */
function initHeroCounters(){
  const stats=document.querySelectorAll('.hero-stat h3[data-count]');
  if(!stats.length) return;
  stats.forEach(stat=>{
    const target=parseFloat(stat.getAttribute('data-count'));
    const suffix=stat.querySelector('span');
    const suffixText=suffix?suffix.textContent:'';
    const isFloat=target%1!==0;
    const duration=2000;
    const start=performance.now();
    function update(now){
      const progress=Math.min((now-start)/duration,1);
      const eased=1-Math.pow(1-progress,3);
      const val=eased*target;
      stat.innerHTML=(isFloat?val.toFixed(1):Math.floor(val))+'<span>'+suffixText+'</span>';
      if(progress<1) requestAnimationFrame(update);
    }
    requestAnimationFrame(update);
  });
}

/* ── TESTIMONIAL AUTO-SLIDE ── */
function initTestimonials(){
  const track=document.getElementById('testimonialTrack');
  if(!track) return;
  let scrollPos=0;
  const speed=0.5;
  let paused=false;
  let touchTimeout;

  track.addEventListener('mouseenter',()=>paused=true);
  track.addEventListener('mouseleave',()=>{
    paused=false;
    scrollPos=track.scrollLeft;
  });

  track.addEventListener('touchstart',()=>{
    paused=true;
    clearTimeout(touchTimeout);
  });
  track.addEventListener('touchend',()=>{
    touchTimeout=setTimeout(()=>{
      paused=false;
      scrollPos=track.scrollLeft;
    },2000);
  });

  track.addEventListener('scroll',()=>{
    if(paused) scrollPos=track.scrollLeft;
  });

  function slide(){
    if(!paused){
      scrollPos+=speed;
      if(scrollPos>=track.scrollWidth-track.clientWidth) scrollPos=0;
      track.scrollLeft=scrollPos;
    }
    requestAnimationFrame(slide);
  }
  requestAnimationFrame(slide);
}

/* ── CLINIC IMAGE CAROUSEL ── */
function initClinicCarousel(){
  const sliders = document.querySelectorAll('.clinic-slider');
  if(!sliders.length) return;
  
  sliders.forEach(slider => {
    const slides = slider.querySelectorAll('.slide');
    if(slides.length < 2) return;
    
    let current = 0;
    setInterval(() => {
      slides[current].classList.remove('active');
      current = (current + 1) % slides.length;
      slides[current].classList.add('active');
    }, 4000);
  });
}

/* ── GSAP ANIMATIONS ── */
function initGSAP(){
  if(typeof gsap==='undefined'||typeof ScrollTrigger==='undefined') return;
  gsap.registerPlugin(ScrollTrigger);

  // Specialty cards stagger
  gsap.utils.toArray('.specialty-card').forEach((card,i)=>{
    gsap.from(card,{
      scrollTrigger:{trigger:card,start:'top 85%',toggleActions:'play none none none'},
      y:60,opacity:0,duration:0.8,delay:i*0.1,ease:'power3.out'
    });
  });

  // Tech cards stagger
  gsap.utils.toArray('.tech-card').forEach((card,i)=>{
    gsap.from(card,{
      scrollTrigger:{trigger:card,start:'top 85%',toggleActions:'play none none none'},
      y:60,opacity:0,duration:0.8,delay:i*0.15,ease:'power3.out'
    });
  });

  // Condition items stagger
  gsap.utils.toArray('.condition-item').forEach((item,i)=>{
    gsap.from(item,{
      scrollTrigger:{trigger:item,start:'top 90%',toggleActions:'play none none none'},
      x:-30,opacity:0,duration:0.6,delay:i*0.1,ease:'power3.out'
    });
  });
}

/* ── CANVAS SPINE HERO ── */
function initSpineHero(){
  const canvas=document.getElementById('spineHeroCanvas');
  if(!canvas) return;
  const ctx=canvas.getContext('2d');
  const W=450,H=600;
  canvas.width=W;canvas.height=H;

  const vertebrae=[];
  const numVertebrae=24;
  for(let i=0;i<numVertebrae;i++){
    const t=i/(numVertebrae-1);
    const size=18+t*12;
    vertebrae.push({
      x:W/2,
      y:60+t*(H-120),
      baseX:W/2,
      baseY:60+t*(H-120),
      size:size,
      phase:i*0.3,
      color:t<0.3?'rgba(0,194,184,':'rgba(0,150,255,'
    });
  }

  const particles=[];
  for(let i=0;i<60;i++){
    particles.push({
      x:Math.random()*W,
      y:Math.random()*H,
      size:Math.random()*2+0.5,
      speed:Math.random()*0.3+0.1,
      opacity:Math.random()*0.4+0.1
    });
  }

  let time=0;
  function draw(){
    time+=0.02;
    ctx.clearRect(0,0,W,H);

    // Particles
    particles.forEach(p=>{
      p.y-=p.speed;
      if(p.y<0){p.y=H;p.x=Math.random()*W;}
      ctx.beginPath();
      ctx.arc(p.x,p.y,p.size,0,Math.PI*2);
      ctx.fillStyle='rgba(0,194,184,'+p.opacity+')';
      ctx.fill();
    });

    // Spine column glow
    ctx.beginPath();
    ctx.moveTo(vertebrae[0].x,vertebrae[0].y);
    vertebrae.forEach(v=>{
      const sway=Math.sin(time+v.phase)*4;
      v.x=v.baseX+sway;
      ctx.lineTo(v.x,v.y);
    });
    ctx.strokeStyle='rgba(0,194,184,0.15)';
    ctx.lineWidth=30;
    ctx.stroke();

    // Spine line
    ctx.beginPath();
    ctx.moveTo(vertebrae[0].x,vertebrae[0].y);
    vertebrae.forEach(v=>ctx.lineTo(v.x,v.y));
    ctx.strokeStyle='rgba(0,194,184,0.4)';
    ctx.lineWidth=3;
    ctx.stroke();

    // Vertebrae
    vertebrae.forEach((v,i)=>{
      const t=i/(numVertebrae-1);
      const pulse=1+Math.sin(time*2+v.phase)*0.08;
      const s=v.size*pulse;

      // Glow
      const grd=ctx.createRadialGradient(v.x,v.y,0,v.x,v.y,s*1.5);
      grd.addColorStop(0,v.color+'0.2)');
      grd.addColorStop(1,v.color+'0)');
      ctx.beginPath();
      ctx.arc(v.x,v.y,s*1.5,0,Math.PI*2);
      ctx.fillStyle=grd;
      ctx.fill();

      // Disc
      ctx.beginPath();
      ctx.ellipse(v.x,v.y,s,s*0.5,0,0,Math.PI*2);
      ctx.fillStyle=v.color+(0.3+t*0.3)+')';
      ctx.fill();
      ctx.strokeStyle=v.color+'0.6)';
      ctx.lineWidth=1.5;
      ctx.stroke();
    });

    requestAnimationFrame(draw);
  }
  draw();
}

/* ── CANVAS SPINE EXPLORE ── */
function initSpineExplore(){
  const canvas=document.getElementById('spineExploreCanvas');
  if(!canvas) return;
  const container=canvas.parentElement;
  const ctx=canvas.getContext('2d');

  function resize(){
    canvas.width=container.clientWidth;
    canvas.height=container.clientHeight;
  }
  resize();
  window.addEventListener('resize',resize);

  let mouseX=-1,mouseY=-1;
  canvas.addEventListener('mousemove',e=>{
    const rect=canvas.getBoundingClientRect();
    mouseX=e.clientX-rect.left;
    mouseY=e.clientY-rect.top;
  });
  canvas.addEventListener('mouseleave',()=>{mouseX=-1;mouseY=-1;});

  const conditions=['Cervical','Thoracic','Lumbar','Sacral'];
  let time=0;

  function draw(){
    time+=0.015;
    const W=canvas.width,H=canvas.height;
    ctx.clearRect(0,0,W,H);

    const numV=26;
    const centerX=W/2;
    const startY=H*0.08;
    const endY=H*0.92;

    // Draw vertebrae
    for(let i=0;i<numV;i++){
      const t=i/(numV-1);
      const y=startY+t*(endY-startY);
      const sway=Math.sin(time+i*0.25)*6;
      const x=centerX+sway;
      const size=14+t*16;

      const dist=mouseY>0?Math.abs(y-mouseY):999;
      const hover=dist<30;

      // Glow
      if(hover){
        const grd=ctx.createRadialGradient(x,y,0,x,y,size*2.5);
        grd.addColorStop(0,'rgba(0,194,184,0.3)');
        grd.addColorStop(1,'rgba(0,194,184,0)');
        ctx.beginPath();
        ctx.arc(x,y,size*2.5,0,Math.PI*2);
        ctx.fillStyle=grd;
        ctx.fill();
      }

      // Vertebra
      const pulse=1+Math.sin(time*2+i*0.3)*0.06;
      ctx.beginPath();
      ctx.ellipse(x,y,size*pulse,size*0.45*pulse,0,0,Math.PI*2);
      ctx.fillStyle=hover?'rgba(0,194,184,0.6)':'rgba(0,150,255,'+(0.15+t*0.2)+')';
      ctx.fill();
      ctx.strokeStyle=hover?'rgba(0,194,184,0.9)':'rgba(0,194,184,'+(0.2+t*0.2)+')';
      ctx.lineWidth=hover?2:1;
      ctx.stroke();

      // Connection
      if(i>0){
        const prevT=(i-1)/(numV-1);
        const prevY=startY+prevT*(endY-startY);
        const prevSway=Math.sin(time+(i-1)*0.25)*6;
        ctx.beginPath();
        ctx.moveTo(centerX+prevSway,prevY);
        ctx.lineTo(x,y);
        ctx.strokeStyle='rgba(0,194,184,0.2)';
        ctx.lineWidth=2;
        ctx.stroke();
      }

      // Label on hover
      if(hover){
        let label='';
        if(t<0.27) label='Cervical (C1-C7)';
        else if(t<0.54) label='Thoracic (T1-T12)';
        else if(t<0.77) label='Lumbar (L1-L5)';
        else label='Sacral (S1-S5)';

        ctx.font='600 14px Poppins,sans-serif';
        ctx.fillStyle='rgba(0,194,184,0.9)';
        ctx.textAlign=x>W/2?'right':'left';
        const labelX=x>W/2?x-size-15:x+size+15;
        ctx.fillText(label,labelX,y+5);

        // Line to label
        ctx.beginPath();
        ctx.moveTo(x+(x>W/2?-size:size),y);
        ctx.lineTo(labelX+(x>W/2?5:-5),y);
        ctx.strokeStyle='rgba(0,194,184,0.4)';
        ctx.lineWidth=1;
        ctx.stroke();
      }
    }

    // Floating particles
    for(let i=0;i<30;i++){
      const px=(Math.sin(time*0.5+i*1.7)*0.4+0.5)*W;
      const py=(Math.cos(time*0.3+i*2.1)*0.4+0.5)*H;
      ctx.beginPath();
      ctx.arc(px,py,1.5,0,Math.PI*2);
      ctx.fillStyle='rgba(0,194,184,'+(0.1+Math.sin(time+i)*0.1)+')';
      ctx.fill();
    }

    requestAnimationFrame(draw);
  }
  draw();
}

/* ── 3D TILT CARDS ── */
function initTilt(){
  // Universal 3D Tilt for Specialties
  document.querySelectorAll('.specialty-parent').forEach(parent=>{
    const card = parent.querySelector('.specialty-card');
    if(!card) return;
    
    parent.addEventListener('mousemove',e=>{
      const rect=parent.getBoundingClientRect();
      const x=(e.clientX-rect.left)/rect.width-0.5; // -0.5 to 0.5
      const y=(e.clientY-rect.top)/rect.height-0.5;
      
      // More aggressive rotation for that "Uiverse" feel
      const rotX = y * -25; 
      const rotY = x * 25;
      
      card.style.transform = `rotateX(${rotX}deg) rotateY(${rotY}deg)`;
    });
    
    parent.addEventListener('mouseleave',()=>{
      card.style.transform = 'rotateX(0deg) rotateY(0deg)';
    });
  });

  // Simple Tilt for Tech Cards
  document.querySelectorAll('.tech-card').forEach(card=>{
    card.addEventListener('mousemove',e=>{
      const rect=card.getBoundingClientRect();
      const x=(e.clientX-rect.left)/rect.width-0.5;
      const y=(e.clientY-rect.top)/rect.height-0.5;
      card.style.transform='translateY(-10px) perspective(800px) rotateX('+(-y*8)+'deg) rotateY('+(x*8)+'deg)';
    });
    card.addEventListener('mouseleave',()=>{
      card.style.transform='translateY(0) perspective(800px) rotateX(0) rotateY(0)';
    });
  });
}

/* ── SMOOTH SCROLL ── */
function initSmoothScroll(){
  document.querySelectorAll('a[href^="#"]').forEach(anchor=>{
    anchor.addEventListener('click',function(e){
      const href=this.getAttribute('href');
      if(href==='#') return;
      const target=document.querySelector(href);
      if(target){
        e.preventDefault();
        target.scrollIntoView({behavior:'smooth'});
      }
    });
  });
}

/* ── FORM HANDLING ── */
function initForms(){
  const contactForm=document.getElementById('contactForm');
  const appointmentForm=document.getElementById('appointmentForm');
  const successModal=document.getElementById('successModal');
  const closeModalBtn=document.getElementById('closeModalBtn');

  if(contactForm){
    contactForm.addEventListener('submit',e=>{
      e.preventDefault();
      showSuccess();
      contactForm.reset();
    });
  }

  if(appointmentForm){
    appointmentForm.addEventListener('submit',e=>{
      e.preventDefault();
      
      const name = document.getElementById('fullName').value;
      const phoneVal = document.getElementById('phone').value;
      const dateVal = document.getElementById('date').value;
      const serviceSelect = document.getElementById('service');
      const serviceVal = serviceSelect ? serviceSelect.options[serviceSelect.selectedIndex].text : '';
      const reasonVal = document.getElementById('reason').value;

      const message = `Hello Jisha Prime, I would like to book an appointment.\n\n` +
                      `*Name:* ${name}\n` +
                      `*Phone:* ${phoneVal}\n` +
                      `*Preferred Date:* ${dateVal}\n` +
                      `*Service:* ${serviceVal}\n` +
                      `*Reason:* ${reasonVal}`;

      const whatsappUrl = `https://wa.me/919187050960?text=${encodeURIComponent(message)}`;
      
      // Open WhatsApp in a new tab/window
      window.open(whatsappUrl, '_blank');

      showSuccess();
      appointmentForm.reset();
    });
  }

  function showSuccess(){
    if(successModal) successModal.classList.add('show');
  }

  if(closeModalBtn && successModal){
    closeModalBtn.addEventListener('click',()=>{
      successModal.classList.remove('show');
    });
    successModal.addEventListener('click',e=>{
      if(e.target===successModal) successModal.classList.remove('show');
    });
  }
}

/* ── FLOATING SOCIAL MENU ── */
function initFloatingMenu(){
  const menuToggle = document.getElementById('menuToggle');
  const floatingMenu = document.getElementById('floatingMenu');
  
  if(menuToggle && floatingMenu){
    menuToggle.addEventListener('click', () => {
      floatingMenu.classList.toggle('active');
    });

    // Close when clicking outside
    document.addEventListener('click', (e) => {
      if(!floatingMenu.contains(e.target) && floatingMenu.classList.contains('active')){
        floatingMenu.classList.remove('active');
      }
    });
  }
}

/* ── INIT ALL ── */
function init(){
  initNav();
  initHeaderScroll();
  initReveal();
  initCounters();
  initHeroCounters();
  initTestimonials();
  // initSpineHero(); // Replaced by static realistic spine image
  initSpineExplore();
  initTilt();
  initSmoothScroll();
  initForms();
  initFloatingMenu();
  initClinicCarousel();
  // GSAP after slight delay to ensure loaded
  setTimeout(initGSAP,100);
}

if(document.readyState==='loading'){
  document.addEventListener('DOMContentLoaded',init);
} else {
  init();
}

})();
