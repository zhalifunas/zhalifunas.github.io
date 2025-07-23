const sarangan = document.getElementById("filterkartu");
const bds = document.querySelectorAll("li.list-group-item");
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
  

    const items = document.querySelectorAll(".list-group .list-group-item");

    items.forEach(function (item) {
      const h2Text = normalizeText(item.querySelector("h2")?.innerText || "");
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


// filter berdasarkan mark
// Mendapatkan semua tombol filter
const filterButtons = document.querySelectorAll('.filter-btn');

// Menambahkan event listener untuk setiap tombol filter
filterButtons.forEach(button => {
  button.addEventListener('click', function () {
    const category = this.getAttribute('data-category'); // Mendapatkan kategori yang dipilih

    // Mendapatkan semua item list-group
    const items = document.querySelectorAll('.list-group-item');

    // Looping melalui semua item list-group
    items.forEach(item => {
      const markText = item.querySelector('mark')?.innerText.trim(); // Mendapatkan teks dari <mark>

      // Menyembunyikan atau menampilkan item berdasarkan kategori
      if (category === 'all' ||category === markText) {
        item.style.display = ''; // Tampilkan item
      } else {
        item.style.display = 'none'; // Sembunyikan item
      }
    });
  });
});

// Ganti 'li' dengan nama tag HTML yang ingin dihitung
const tagName = 'li.list-group-item';
const count = document.querySelectorAll(tagName).length;

// Buat elemen <p> untuk menampilkan hasilnya
const output = document.createElement('p');
output.innerHTML = `Jumlah log kosakata: <strong>${count}</strong>`;
output.className = 'count';

// Tambahkan ke dalam body (atau bagian lain sesuai kebutuhan)
document.body.appendChild(output);

//    modal panduan
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