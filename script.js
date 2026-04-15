/* ================= PARTICLE ================= */
const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];

for(let i=0;i<80;i++){
  particles.push({
    x: Math.random()*canvas.width,
    y: Math.random()*canvas.height,
    r: Math.random()*2,
    dx: (Math.random()-0.5)*0.5,
    dy: (Math.random()-0.5)*0.5
  });
}

function drawParticles(){
  ctx.clearRect(0,0,canvas.width,canvas.height);

  particles.forEach(p=>{
    ctx.beginPath();
    ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
    ctx.fillStyle="rgba(255,255,255,0.5)";
    ctx.fill();

    p.x += p.dx;
    p.y += p.dy;

    if(p.x<0 || p.x>canvas.width) p.dx *= -1;
    if(p.y<0 || p.y>canvas.height) p.dy *= -1;
  });

  requestAnimationFrame(drawParticles);
}

drawParticles();

/* ================= SCROLL REVEAL ================= */
const reveals = document.querySelectorAll('.reveal');

const observer = new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      entry.target.classList.add('active');
    }
  });
});

reveals.forEach(r=>observer.observe(r));

/* ================= TILT CARD ================= */
const cards = document.querySelectorAll('.tilt');

cards.forEach(card=>{
  card.addEventListener('mousemove',(e)=>{
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const rotateX = (y / rect.height - 0.5) * -10;
    const rotateY = (x / rect.width - 0.5) * 10;

    card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  });

  card.addEventListener('mouseleave',()=>{
    card.style.transform = `rotateX(0) rotateY(0)`;
  });
});
