let data = [];

const list = document.getElementById('list');
const search = document.getElementById('search');

const viewerFrame = document.getElementById('viewerFrame');
const viewerTitle = document.getElementById('viewerTitle');
const emptyState = document.getElementById('emptyState');

// MASUK
function enterApp() {
  document.getElementById('landing').style.display = 'none';
  document.getElementById('app').style.display = 'flex';

  showSection('msds');
}

// NAV
function showSection(id, el) {
  document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
  document.getElementById(id).classList.add('active');

  document.querySelectorAll('.sidebar button').forEach(b => b.classList.remove('active'));
  if (el) el.classList.add('active');
}

// LOGO → IG
function openIG() {
  window.open("https://instagram.com/USERNAME_LO", "_blank");
}

// LOAD DATA
fetch('./msds.json')
  .then(res => res.json())
  .then(json => {
    data = json;
    render(data);
  });

// SEARCH
search.addEventListener('input', function () {
  const key = this.value.toLowerCase();
  render(data.filter(d => d.title.toLowerCase().includes(key)));
});

// RENDER
function render(items) {
  list.innerHTML = '';

  items.forEach(item => {
    const li = document.createElement('li');
    li.textContent = item.title;

    li.onclick = () => openFile(item.file, item.title);

    list.appendChild(li);
  });
}

// OPEN FILE
function openFile(file, title) {

  const isMobile = window.innerWidth <= 768;
  const url = window.location.origin + file;

  if (isMobile) {
    window.open(url, "_blank");
    return;
  }

  viewerFrame.src = url + "#zoom=page-width";
  viewerTitle.textContent = title;

  emptyState.style.display = "none";
  viewerFrame.style.display = "block";
}

/* ===== GALLERY ===== */
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

document.getElementById('closeBtn').onclick = () => {
  modal.style.display = 'none';
};

document.querySelector('.next').onclick = () => {
  index = (index + 1) % images.length;
  modalImg.src = images[index].src;
};

document.querySelector('.prev').onclick = () => {
  index = (index - 1 + images.length) % images.length;
  modalImg.src = images[index].src;
};
