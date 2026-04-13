let data = [];

const list = document.getElementById('list');
const search = document.getElementById('search');

// masuk app
function enterApp() {
  document.getElementById('landing').style.display = 'none';
  document.getElementById('app').style.display = 'block';
  showSection('msds');
}

// navigation
function showSection(id) {
  document.querySelectorAll('.section').forEach(sec => {
    sec.classList.remove('active');
  });

  document.getElementById(id).classList.add('active');
}

// load data
fetch('./msds.json')
  .then(res => {
    if (!res.ok) {
      throw new Error("Gagal load msds.json");
    }
    return res.json();
  })
  .then(json => {
    data = json;
    render(data);
  })
  .catch(err => {
    console.error(err);
    alert("Data MSDS gagal dimuat");
  });

// search
search.addEventListener('input', function () {
  const keyword = this.value.toLowerCase();
  const filtered = data.filter(item =>
    item.title.toLowerCase().includes(keyword)
  );
  render(filtered);
});

// render
function render(items) {
  list.innerHTML = '';

  items.forEach(item => {
    const li = document.createElement('li');
    li.textContent = item.title;

    li.onclick = () => {
      preview(item.file, item.title);
    };

    list.appendChild(li);
  });
}

// preview
function preview(file, title) {

  const url = window.location.origin + BASE + file;

  // DETEKSI HP
  const isMobile = window.innerWidth <= 768;

  if (isMobile) {
    // HP → buka tab baru
    window.open(url, '_blank');
  } else {
    // Desktop → tampil di iframe
    document.getElementById('viewerFrame').src = url;
    document.getElementById('viewerTitle').textContent = title;

    document.getElementById('emptyState').style.display = 'none';
    document.getElementById('viewerFrame').style.display = 'block';
  }
}

function openFullscreen() {
  const iframe = document.getElementById("viewerFrame");

  if (iframe.requestFullscreen) {
    iframe.requestFullscreen();
  } else if (iframe.webkitRequestFullscreen) {
    iframe.webkitRequestFullscreen();
  } else if (iframe.msRequestFullscreen) {
    iframe.msRequestFullscreen();
  }
}

if (isMobile) {
  alert("File akan dibuka di tab baru");
  window.open(url, '_blank');
}
