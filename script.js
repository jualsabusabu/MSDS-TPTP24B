let data = [];

const list = document.getElementById('list');
const search = document.getElementById('search');

// MASUK APP
function enterApp() {
  document.getElementById('landing').style.display = 'none';
  document.getElementById('app').style.display = 'flex';
  showSection('msds');
}

// NAVIGATION
function showSection(id) {
  document.querySelectorAll('.section').forEach(sec => {
    sec.classList.remove('active');
  });

  document.getElementById(id).classList.add('active');

  document.querySelectorAll('.sidebar button').forEach(btn => {
    btn.classList.remove('active');
  });

  if (event && event.target) {
    event.target.classList.add('active');
  }
}

// LOAD DATA
fetch('./msds.json')
  .then(res => res.json())
  .then(json => {
    data = json;
    render(data);
  })
  .catch(err => {
    console.error(err);
    alert("Gagal load data MSDS");
  });

// SEARCH
if (search) {
  search.addEventListener('input', function () {
    const keyword = this.value.toLowerCase();
    const filtered = data.filter(item =>
      item.title.toLowerCase().includes(keyword)
    );
    render(filtered);
  });
}

// RENDER LIST
function render(items) {
  list.innerHTML = '';

  items.forEach(item => {

    const li = document.createElement('li');
    li.textContent = item.title;

    li.onclick = () => {
      openFile(item.file);
    };

    list.appendChild(li);
  });
}

// OPEN FILE (🔥 FIX UTAMA)
function openFile(file) {

  const url = window.location.origin + file;

  // LANGSUNG OPEN TAB BARU (DESKTOP + HP)
  window.open(url, "_blank");

}

// ===== GALLERY MODAL =====
const images = document.querySelectorAll('#galleryGrid img');
const modal = document.getElementById('modal');
const modalImg = document.getElementById('modalImg');

let index = 0;

images.forEach((img, i) => {
  img.addEventListener('click', () => {
    modal.style.display = 'flex';
    modalImg.src = img.src;
    index = i;
  });
});

// CLOSE
document.getElementById('closeBtn').onclick = () => {
  modal.style.display = 'none';
};

// NEXT
document.querySelector('.next').onclick = () => {
  index = (index + 1) % images.length;
  modalImg.src = images[index].src;
};

// PREV
document.querySelector('.prev').onclick = () => {
  index = (index - 1 + images.length) % images.length;
  modalImg.src = images[index].src;
};
