let data = [];

const list = document.getElementById('list');
const search = document.getElementById('search');

function enterApp() {
  document.getElementById('landing').style.display = 'none';
  document.getElementById('app').style.display = 'flex';

  const audio = document.getElementById("bgm");
  audio.volume = 0.3;
  audio.play().catch(()=>{});
}

function showSection(id, el) {
  document.querySelectorAll('section').forEach(s => s.classList.remove('active'));
  document.getElementById(id).classList.add('active');

  document.querySelectorAll('.sidebar button').forEach(b => b.classList.remove('active'));
  el.classList.add('active');
}

fetch('./msds.json')
.then(res => res.json())
.then(json => {
  data = json;
  render(data);
});

function render(items){
  list.innerHTML = '';

  items.forEach(item=>{
    const li = document.createElement('li');
    li.textContent = item.title;

    li.onclick = ()=>{
      document.getElementById('viewerTitle').innerText = item.title;
      window.open(window.location.origin + item.file);
    };

    list.appendChild(li);
  });
}

search.addEventListener('input', function(){
  const keyword = this.value.toLowerCase();
  render(data.filter(i=>i.title.toLowerCase().includes(keyword)));
});

function toggleMusic(){
  const audio = document.getElementById("bgm");
  audio.paused ? audio.play() : audio.pause();
}

/* gallery */
const imgs = document.querySelectorAll('#galleryGrid img');
const modal = document.getElementById('modal');
const modalImg = document.getElementById('modalImg');

imgs.forEach(img=>{
  img.onclick = ()=>{
    modal.style.display = 'flex';
    modalImg.src = img.src;
  }
});

modal.onclick = ()=> modal.style.display = 'none';
