// ========== THREE.JS 3D PARTICLE & OBJECTS BACKGROUND ==========
(function(){
  const canvas=document.getElementById('bg-canvas');
  const scene=new THREE.Scene();
  const camera=new THREE.PerspectiveCamera(75,innerWidth/innerHeight,.1,1000);
  camera.position.z=50;
  const renderer=new THREE.WebGLRenderer({canvas,alpha:true,antialias:true});
  renderer.setSize(innerWidth,innerHeight);
  renderer.setPixelRatio(Math.min(devicePixelRatio,2));

  // 1. Particles (Nebula)
  const count=2500;
  const geo=new THREE.BufferGeometry();
  const pos=new Float32Array(count*3);
  const colors=new Float32Array(count*3);
  const palette=[[0,0.94,1],[0.48,0.18,1],[1,0.18,0.58]];
  for(let i=0;i<count;i++){
    pos[i*3]=(Math.random()-.5)*150;
    pos[i*3+1]=(Math.random()-.5)*150;
    pos[i*3+2]=(Math.random()-.5)*150;
    const c=palette[Math.floor(Math.random()*3)];
    colors[i*3]=c[0];colors[i*3+1]=c[1];colors[i*3+2]=c[2];
  }
  geo.setAttribute('position',new THREE.BufferAttribute(pos,3));
  geo.setAttribute('color',new THREE.BufferAttribute(colors,3));
  const mat=new THREE.PointsMaterial({size:0.25,vertexColors:true,transparent:true,opacity:0.6,sizeAttenuation:true});
  const points=new THREE.Points(geo,mat);
  scene.add(points);

  // 2. CREATIVE OBJECTS: Floating Crystals (Platonic Solids)
  const crystals = [];
  const crystalGeos = [
    new THREE.TetrahedronGeometry(2, 0),
    new THREE.OctahedronGeometry(1.5, 0),
    new THREE.DodecahedronGeometry(1, 0),
    new THREE.IcosahedronGeometry(1.2, 0)
  ];
  
  for(let i=0; i<15; i++) {
    const crystalGeo = crystalGeos[Math.floor(Math.random()*crystalGeos.length)];
    const crystalMat = new THREE.MeshBasicMaterial({ 
        color: palette[Math.floor(Math.random()*3)].map(c=>c), 
        wireframe: true, 
        transparent: true, 
        opacity: 0.15 
    });
    const crystal = new THREE.Mesh(crystalGeo, crystalMat);
    
    crystal.position.set(
        (Math.random()-0.5)*100,
        (Math.random()-0.5)*100,
        (Math.random()-0.5)*60
    );
    crystal.rotation.set(Math.random()*Math.PI, Math.random()*Math.PI, 0);
    crystal.userData.rotSpeed = (Math.random() - 0.5) * 0.02;
    
    scene.add(crystal);
    crystals.push(crystal);
  }

  // 3. Central Morphing Sphere (Core)
  const sphereGeo = new THREE.SphereGeometry(10, 32, 32);
  const sphereMat = new THREE.MeshBasicMaterial({ 
    color: 0x00f0ff, 
    wireframe: true, 
    transparent: true, 
    opacity: 0.05 
  });
  const sphere = new THREE.Mesh(sphereGeo, sphereMat);
  scene.add(sphere);

  // 4. Floating Tech Rings
  const torusGeo=new THREE.TorusGeometry(25, 0.2, 16, 100);
  const torusMat=new THREE.MeshBasicMaterial({color:0x7b2fff, wireframe:true, transparent:true, opacity:0.1});
  const torus=new THREE.Mesh(torusGeo, torusMat);
  torus.rotation.x=Math.PI/2;
  scene.add(torus);

  const torus2=new THREE.Mesh(new THREE.TorusGeometry(28, 0.1, 16, 100), new THREE.MeshBasicMaterial({color:0xff2d95, wireframe:true, transparent:true, opacity:0.08}));
  torus2.rotation.y=Math.PI/2;
  scene.add(torus2);

  let mouseX=0,mouseY=0;
  document.addEventListener('mousemove',e=>{
    mouseX=(e.clientX/innerWidth-.5)*2;
    mouseY=(e.clientY/innerHeight-.5)*2;
  });
  
  window.addEventListener('resize',()=>{
    camera.aspect=innerWidth/innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(innerWidth,innerHeight);
  });

  function animate(){
    requestAnimationFrame(animate);
    const t=Date.now()*0.0003;
    
    points.rotation.y=t*0.2;
    points.rotation.x=t*0.1;
    
    sphere.rotation.y += 0.005;
    sphere.scale.setScalar(1 + Math.sin(t*2)*0.05);
    
    torus.rotation.z += 0.002;
    torus2.rotation.x += 0.003;
    
    crystals.forEach(c => {
        c.rotation.x += c.userData.rotSpeed;
        c.rotation.y += c.userData.rotSpeed;
        c.position.y += Math.sin(t + c.position.x)*0.02;
    });

    camera.position.x+=(mouseX*12-camera.position.x)*0.02;
    camera.position.y+=(-mouseY*12-camera.position.y)*0.02;
    camera.lookAt(scene.position);
    
    renderer.render(scene,camera);
  }
  animate();
})();

// ========== LOADING SCREEN ==========
window.addEventListener('load',()=>{
  setTimeout(()=>{document.getElementById('loading-screen').classList.add('hidden')},2200);
});

// ========== CURSOR GLOW ==========
const glow=document.getElementById('cursor-glow');
document.addEventListener('mousemove',e=>{
    if(glow) {
        glow.style.left=e.clientX+'px';
        glow.style.top=e.clientY+'px';
    }
});

// ========== NAVBAR ==========
const navbar=document.getElementById('navbar');
window.addEventListener('scroll',()=>{if(navbar) navbar.classList.toggle('scrolled',scrollY>50)});

const navToggle = document.getElementById('navToggle');
if(navToggle) {
    navToggle.addEventListener('click',function(){
        document.querySelector('.nav-links').classList.toggle('open');
        this.classList.toggle('active');
    });
}

document.querySelectorAll('.nav-links a').forEach(a=>a.addEventListener('click',()=>{
  document.querySelector('.nav-links').classList.remove('open');
  if(navToggle) navToggle.classList.remove('active');
}));

// Active nav link on scroll
const sections=document.querySelectorAll('section[id]');
window.addEventListener('scroll',()=>{
  const sy=scrollY+200;
  sections.forEach(s=>{
    const top=s.offsetTop,h=s.offsetHeight,id=s.getAttribute('id');
    const link=document.querySelector(`.nav-links a[href="#${id}"]`);
    if(link){if(sy>=top&&sy<top+h)link.classList.add('active');else link.classList.remove('active')}
  });
});

// ========== TYPING EFFECT ==========
const typed=document.getElementById('typed-text');
const words=['Frontend Developer','AI/ML Engineer','SAP Developer','Full-Stack Developer','Problem Solver'];
let wi=0,ci=0,deleting=false;
function typeEffect(){
  if(!typed) return;
  const word=words[wi];
  typed.textContent=deleting?word.substring(0,ci--):word.substring(0,ci++);
  let speed=deleting?40:80;
  if(!deleting&&ci===word.length+1){speed=2000;deleting=true}
  if(deleting&&ci<0){deleting=false;wi=(wi+1)%words.length;speed=400}
  setTimeout(typeEffect,speed);
}
typeEffect();

// ========== COUNTER ANIMATION ==========
const counters=document.querySelectorAll('.stat-number');
const counterObserver=new IntersectionObserver(entries=>{
  entries.forEach(e=>{
    if(e.isIntersecting){
      const el=e.target,target=+el.dataset.target;
      let current=0;const inc=target/60;
      const timer=setInterval(()=>{current+=inc;if(current>=target){el.textContent=target;clearInterval(timer)}else el.textContent=Math.floor(current)},30);
      counterObserver.unobserve(el);
    }
  });
},{threshold:0.5});
counters.forEach(c=>counterObserver.observe(c));

// ========== SCROLL REVEAL ==========
const revealEls=document.querySelectorAll('.glass-card, .timeline-item, .section-header, .hero-content, .project-filters, .hero-cta, .hero-stats');
revealEls.forEach(el=>el.classList.add('reveal'));
const revealObserver=new IntersectionObserver(entries=>{
  entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('active');revealObserver.unobserve(e.target)}});
},{threshold:0.1,rootMargin:'0px 0px -40px 0px'});
revealEls.forEach(el=>revealObserver.observe(el));

// ========== PROJECT FILTERS ==========
document.querySelectorAll('.filter-btn').forEach(btn=>{
  btn.addEventListener('click',function(){
    document.querySelectorAll('.filter-btn').forEach(b=>b.classList.remove('active'));
    this.classList.add('active');
    const f=this.dataset.filter;
    document.querySelectorAll('.project-card').forEach(card=>{
      if(f==='all'||card.dataset.category===f){card.style.display='';card.style.animation='fadeUp .5s forwards'}
      else{card.style.display='none'}
    });
  });
});

// ========== CONTACT FORM (WITH BACKEND INTEGRATION) ==========
const contactForm = document.getElementById('contactForm');
if(contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const btn=e.target.querySelector('button');
      const originalText = btn.innerHTML;
      
      btn.innerHTML='<span>TRANSMITTING...</span>';
      btn.disabled = true;

      const formData = {
          name: document.getElementById('formName').value,
          email: document.getElementById('formEmail').value,
          message: document.getElementById('formMessage').value
      };

      try {
        // Dynamically use the deployed Render URL or fallback to localhost
        const backendUrl = window.location.hostname === 'localhost' 
            ? 'http://localhost:5000' 
            : 'https://portfolio-backend-x8z7.onrender.com'; // Replace this with your actual Render URL later

        const response = await fetch(`${backendUrl}/api/contact`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        });

          const result = await response.json();

          if(result.success) {
              btn.innerHTML='<span>Message Sent! ✓</span>';
              btn.style.background='linear-gradient(135deg,#00c853,#00e676)';
              contactForm.reset();
          } else {
              throw new Error('Failed');
          }
      } catch (err) {
          btn.innerHTML='<span>Error! Check Connection</span>';
          btn.style.background='linear-gradient(135deg,#f44336,#d32f2f)';
      }

      setTimeout(()=>{
          btn.innerHTML=originalText;
          btn.style.background='';
          btn.disabled = false;
      }, 4000);
    });
}

// ========== 3D TILT ON CARDS ==========
document.querySelectorAll('.project-card, .achievement-card, .cert-card').forEach(card=>{
  card.addEventListener('mousemove',e=>{
    const r=card.getBoundingClientRect();
    const x=(e.clientX-r.left)/r.width-.5;
    const y=(e.clientY-r.top)/r.height-.5;
    card.style.transform=`perspective(800px) rotateY(${x*10}deg) rotateX(${-y*10}deg) translateY(-4px)`;
  });
  card.addEventListener('mouseleave',()=>{card.style.transform=''});
});

// Fade-up keyframe
const style=document.createElement('style');
style.textContent='@keyframes fadeUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}';
document.head.appendChild(style);
