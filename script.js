let data = [];

// ambil elemen
const list = document.getElementById('list');
const search = document.getElementById('search');

// ================= MASUK APP =================
function enterApp() {
  document.getElementById('landing').style.display = 'none';
  document.getElementById('app').style.display = 'block';
  showSection('msds');
}

// ================= NAVIGATION =================
function showSection(id) {
  document.querySelectorAll('.section').forEach(sec => {
    sec.classList.remove('active');
  });

  document.getElementById(id).classList.add('active');
}

// ================= LOAD DATA =================
fetch('./msds.json')
  .then(res => {
    if (!res.ok) throw new Error("Gagal load msds.json");
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

// ================= SEARCH =================
search.addEventListener('input', function () {
  const keyword = this.value.toLowerCase();

  const filtered = data.filter(item =>
    item.title.toLowerCase().includes(keyword)
  );

  render(filtered);
});

// ================= RENDER LIST =================
function render(items) {
  list.innerHTML = '';

  items.forEach(item => {

    const li = document.createElement('li');

    const a = document.createElement('a');
    a.textContent = item.title;

    // 🔥 PENTING: langsung pakai path dari JSON
    a.href = item.file;

    // buka di tab baru (fix untuk HP)
    a.target = "_blank";
    a.rel = "noopener noreferrer";

    // styling biar full klik
    a.style.display = "block";
    a.style.width = "100%";
    a.style.textDecoration = "none";
    a.style.color = "inherit";

    li.appendChild(a);
    list.appendChild(li);
  });
}
