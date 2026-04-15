let data = [];

const list = document.getElementById('list');
const search = document.getElementById('search');

function enterApp() {
  document.getElementById('landing').style.display = 'none';
  document.getElementById('app').style.display = 'flex';

  const audio = document.getElementById("bgm");
  audio.volume = 0.4;
  audio.play().catch(() => {});
}

function showSection(id, el) {
  document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
  document.getElementById(id).classList.add('active');

  document.querySelectorAll('.sidebar button').forEach(b => b.classList.remove('active'));
  if (el) el.classList.add('active');
}

fetch('./msds.json')
  .then(res => res.json())
  .then(json => {
    data = json;
    render(data);
  });

function render(items) {
  list.innerHTML = '';

  items.forEach(item => {
    const li = document.createElement('li');
    li.textContent = item.title;

    li.onclick = () => {
      document.getElementById('viewerTitle').innerText = item.title;
      window.open(window.location.origin + item.file, "_blank");
    };

    list.appendChild(li);
  });
}

search.addEventListener('input', function () {
  const keyword = this.value.toLowerCase();
  const filtered = data.filter(item =>
    item.title.toLowerCase().includes(keyword)
  );
  render(filtered);
});

function toggleMusic() {
  const audio = document.getElementById("bgm");
  audio.paused ? audio.play() : audio.pause();
}

/* GALLERY */
const images = document.querySelectorAll('#galleryGrid img');
const modal = document.getElementById('modal');
const modalImg = document.getElementById('modalImg');

let index = 0;

images.forEach((img, i) => {
  img.onclick = () => {
    modal.style.display = 'flex';
    modalImg.src = img.src;
    index = i;
  };
});

document.getElementById('closeBtn').onclick = () => modal.style.display = 'none';

document.querySelector('.next').onclick = () => {
  index = (index + 1) % images.length;
  modalImg.src = images[index].src;
};

document.querySelector('.prev').onclick = () => {
  index = (index - 1 + images.length) % images.length;
  modalImg.src = images[index].src;
};
