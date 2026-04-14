let data = [];

const list = document.getElementById('list');
const search = document.getElementById('search');

const viewerFrame = document.getElementById('viewerFrame');
const viewerTitle = document.getElementById('viewerTitle');
const emptyState = document.getElementById('emptyState');

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

  // ACTIVE BUTTON
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
      openFile(item.file, item.title);
    };

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
