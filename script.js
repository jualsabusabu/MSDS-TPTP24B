let data = [];

const list = document.getElementById('list');
const search = document.getElementById('search');

const viewerFrame = document.getElementById('viewerFrame');
const viewerTitle = document.getElementById('viewerTitle');
const emptyState = document.getElementById('emptyState');

// masuk app
function enterApp() {
  document.getElementById('landing').style.display = 'none';
  document.getElementById('app').style.display = 'flex';
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
  .then(res => res.json())
  .then(json => {
    data = json;
    render(data);
  })
  .catch(err => {
    console.error(err);
    alert("Gagal load data MSDS");
  });

// search
search.addEventListener('input', function () {
  const keyword = this.value.toLowerCase();
  const filtered = data.filter(item =>
    item.title.toLowerCase().includes(keyword)
  );
  render(filtered);
});

// render list
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

// buka file
function openFile(file, title) {

  const isMobile = window.innerWidth <= 768;
  const url = window.location.origin + file;

  if (isMobile) {
    // HP → buka tab baru
    window.open(url, "_blank");
    return;
  }

  // desktop → iframe
  viewerFrame.src = url + "#zoom=page-width";
  viewerTitle.textContent = title;

  emptyState.style.display = "none";
  viewerFrame.style.display = "block";
}
