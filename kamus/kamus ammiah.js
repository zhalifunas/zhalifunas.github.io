// ======== isi konten otomatis ~~~~~~~~~
const API_URL =
"https://script.google.com/macros/s/AKfycbwPSLXxe5CEoEsrHfAtWhF2IiBVqkwUQ0tKfnXRIaLAcmyc58u-r5N7rYiRcm3jZMab/exec";

fetch(API_URL)
  .then((res) => res.json())
  .then((data) => {
    renderKamus(data);

    setUpMark();
    updateCount();
  });

function renderKamus(data) {
  const list = document.querySelector(".list-group");

  list.innerHTML = "";

  data.forEach((item) => {
    const li = document.createElement("li");

    li.className = "list-kata";

    let html = "";

    if (item.gambar) {
      html += `
        <img class="gambar"
             src="${item.gambar}"
             alt="${item.indonesia}">
        <div class="space-20"></div>
      `;
    }

    if (item.kategori_2) {
      html += `
      <mark>${item.kategori_2}</mark>
      `;
    }

    if (item.kategori_3) {
      html += `
        <mark>${item.kategori_3}</mark>
      `;
    }

    html += `
      <mark>${item.kategori}</mark>
      
      <h3>
        ${item.indonesia}

        ${item.context ? `<span class="context">${item.context}</span>` : ""}
      </h3>

      <p class="ar">
        ${item.arab}
      </p>
    `;

    if (item.note) {
      html += `
        <p class="note">
          ${item.note}
        </p>
      `;
    }

    li.innerHTML = html;

    list.appendChild(li);
  });
}

//  =========  filter berdasarkan mark
// Mendapatkan semua tombol filter
const filterButtons = document.querySelectorAll('.filter-btn');

// Menambahkan event listener untuk setiap tombol filter
filterButtons.forEach(button => {
  button.addEventListener('click', function () {
    const category = this.getAttribute('data-category'); // Mendapatkan kategori yang dipilih

    // Mendapatkan semua item list-group
    const items = document.querySelectorAll('.list-kata');

    // Looping melalui semua item list-group
    items.forEach(item => {
      const marks = item.querySelectorAll('mark'); // Mendapatkan teks dari <mark>
      const markTexts = Array.from(marks).map(m => m.innerText.trim());

      // Menyembunyikan atau menampilkan item berdasarkan kategori
      if (category === 'all' || markTexts.includes(category)) {
        item.style.display = ''; // Tampilkan item
      } else {
        item.style.display = 'none'; // Sembunyikan item
      }
    });
  });
});

//  ==========   counter li
// Ganti 'li' dengan nama tag HTML yang ingin dihitung
const tagName = 'li.list-kata';
const count = document.querySelectorAll(tagName).length;

// Buat elemen <p> untuk menampilkan hasilnya
const output = document.createElement('p');
output.innerHTML = `Jumlah log kosakata: <strong>${count}</strong> kata`;
output.className = 'count';

// Tambahkan ke dalam body (atau bagian lain sesuai kebutuhan)
document.body.appendChild(output);

//  =============  modal panduan
  // Buka modal sesuai tombol
  document.querySelectorAll('[data-modal]').forEach(button => {
    button.addEventListener('click', function() {
      const modalId = this.getAttribute('data-modal');
      document.getElementById(modalId).style.display = 'block';
    });
  });

  // Tutup modal jika klik tombol close
  document.querySelectorAll('.modal .close').forEach(closeBtn => {
    closeBtn.addEventListener('click', function() {
      this.closest('.modal').style.display = 'none';
    });
  });

  // Tutup modal jika klik di luar isi
  window.addEventListener('click', function(e) {
    document.querySelectorAll('.modal').forEach(modal => {
      if (e.target === modal) {
        modal.style.display = 'none';
      }
    });
  });

//   ======    filter
  const toggleButton = document.getElementById('toggle-dropdown');
  const dropdown = document.getElementById('dropdown-filter');

  // Toggle show/hide dropdown
  toggleButton.addEventListener('click', () => {
    dropdown.style.display = dropdown.style.display === 'none' ? 'block' : 'none';
  });

  // Tutup dropdown jika klik di luar area dropdown dan tombol toggle
  document.addEventListener('click', function (event) {
    const isClickInsideDropdown = dropdown.contains(event.target);
    const isClickOnToggle = toggleButton.contains(event.target);

    if (!isClickInsideDropdown && !isClickOnToggle) {
      dropdown.style.display = 'none';
    }
  });

function setUpMark(){
  // Ambil semua <mark> dan buat set kategori unik
  const allMarks = document.querySelectorAll('li.list-kata mark');
  const categories = [...new Set(Array.from(allMarks).map(mark => mark.innerText.trim()))]
  .sort((a, b) => a.localeCompare(b));

  // Buat checkbox otomatis ke dalam dropdown
  categories.forEach(cat => {
    const label = document.createElement('label');
    label.style.display = 'block'; // Agar rapi ke bawah
    label.style.marginBottom = '0.3em';
    
    const icon = document.createElement('i');
    icon.className = 'hgi hgi-stroke hgi-pin';
    icon.style.display = 'none';

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.value = cat;

    checkbox.addEventListener('change', function () {
      icon.style.display = this.checked ? 'inline-block' : 'none';
      filterList(); // Tetap jalankan filter
    });
    
    label.appendChild(checkbox);
    label.appendChild(icon);
    label.append(' ' + cat);
    dropdown.appendChild(label);
  });
}


  function filterList() {

    // Pasang event listener untuk filter
    const checkboxes = dropdown.querySelectorAll('input[type="checkbox"]');

    checkboxes.forEach(cb => {
      cb.addEventListener('change', filterList);
    });
    
    const selected = Array.from(checkboxes)
      .filter(cb => cb.checked)
      .map(cb => cb.value);

    const items = document.querySelectorAll('li.list-kata');

    items.forEach(item => {
      const marks = Array.from(item.querySelectorAll('mark')).map(m => m.innerText.trim());
      const match = selected.length === 0 || selected.some(cat => marks.includes(cat));
      item.style.display = match ? '' : 'none';
    });
  }

  // Jalankan awal
  filterList();

// ======= searchbox || kolom pencarian =======
const sarangan = document.getElementById("filterkartu");
const bds = document.querySelectorAll("li.list-kata");
const kartu = document.querySelectorAll("div.card");

sarangan.addEventListener("input", (e) => filterData(e.target.value));
function filterData(search){
  bds.forEach((bd) => {
    if(bd.innerText.toLowerCase().includes(search.toLowerCase())){
      bd.classList.remove("d-none")
    } else{
        bd.classList.add("d-none")
    }
  });
}

  // Fungsi untuk menghapus harakat (diakritik Arab)
  function removeArabicDiacritics(text) {
    const diacriticsRegex = /[\u064B-\u065F\u0670]/g; // rentang harakat Arab
    return text.replace(diacriticsRegex, "");
  }

  // Fungsi untuk normalisasi teks Arab & Latin
  function normalizeText(text) {
    text = text.toLowerCase(); // untuk Latin
    text = removeArabicDiacritics(text); // untuk Arab
    return text;
  }

  document.getElementById("filterkartu").addEventListener("input", function () {
    const keyword = normalizeText(this.value);
    const words = keyword.split(" ").filter(Boolean); // Memisahkan kata kunci (multikata)
  

    const items = document.querySelectorAll(".list-group .list-kata");

    items.forEach(function (item) {
      const h2Text = normalizeText(item.querySelector("h3")?.innerText || "");
      const arText = normalizeText(item.querySelector(".ar")?.innerText || "");
      const hiddenText = normalizeText(item.querySelector("span.hide")?.innerText || "");

      // Cek apakah semua kata kunci ada di h2Text atau arText
      const isMatch = words.every(word => h2Text.includes(word) || arText.includes(word) || hiddenText.includes(word));

      if (isMatch) {
        item.style.display = ""; // tampilkan item
      } else {
        item.style.display = "none"; // sembunyikan item
      }
    });
  });
