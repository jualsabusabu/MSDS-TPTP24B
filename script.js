let data = [];

const list = document.getElementById('list');
const search = document.getElementById('search');

const viewerFrame = document.getElementById('viewerFrame');
const viewerTitle = document.getElementById('viewerTitle');
const emptyState = document.getElementById('emptyState');

// MASUK
function enterApp() {
  document.getElementById('landing').style.display = 'none';
  document.getElementById('app').style.display = 'block';
  showSection('msds');
}

// NAV
function showSection(id, el) {
  document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
  document.getElementById(id).classList.add('active');

  document.querySelectorAll('.menu button').forEach(b => b.classList.remove('active'));
  if (el) el.classList.add('active');
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

    li.onclick = () => {
      document.querySelectorAll('.file-list li').forEach(el => el.classList.remove('active'));
      li.classList.add('active');

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

  // loading state
  viewerFrame.style.display = "none";
  emptyState.innerHTML = "<h3>Loading dokumen...</h3>";

  setTimeout(() => {
    viewerFrame.src = url;
    viewerTitle.textContent = title;

    emptyState.style.display = "none";
    viewerFrame.style.display = "block";
  }, 600);
}


// RIPPLE EFFECT GLOBAL
document.addEventListener("click", function (e) {
  if (e.target.tagName === "BUTTON" || e.target.tagName === "LI") {
    const ripple = document.createElement("span");
    ripple.classList.add("ripple");

    e.target.appendChild(ripple);

    const rect = e.target.getBoundingClientRect();
    ripple.style.left = (e.clientX - rect.left) + "px";
    ripple.style.top = (e.clientY - rect.top) + "px";

    setTimeout(() => ripple.remove(), 600);
  }
});
