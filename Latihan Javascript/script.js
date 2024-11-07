let keranjang = [];
const subtotalEl = document.getElementById("subtotal");
const diskonEl = document.getElementById("diskon");
const totalEl = document.getElementById("total");
const keranjangEl = document.getElementById("keranjang");
const listBarangEl = document.getElementById("listbarang");

// Fungsi untuk menambah item ke keranjang
function additem(namaId, hargaId) {
  const namaBarang = document.getElementById(namaId).textContent;
  const hargaBarang = parseInt(
    document.getElementById(hargaId).textContent.replace(/\./g, "")
  );

  keranjang.push({ nama: namaBarang, harga: hargaBarang });
  updateKeranjang();
  keranjangEl.style.display = "block"; // Pastikan keranjang ditampilkan setelah menambah barang
}

// Fungsi untuk memperbarui keranjang belanja
function updateKeranjang() {
  listBarangEl.innerHTML = "";

  keranjang.forEach((item, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${item.nama}</td>
      <td>Rp ${item.harga.toLocaleString()}</td>
      <td><button onclick="removeItem(${index})" style="background-color: #dc3545; color: white; border: none; padding: 5px 10px; cursor: pointer; border-radius: 4px;">Hapus</button></td>
    `;
    listBarangEl.appendChild(row);
  });

  hitungTotalDenganDiskon();
}

// Fungsi untuk menghapus item dari keranjang berdasarkan indeks
function removeItem(index) {
  keranjang.splice(index, 1); // Menghapus satu item pada indeks tertentu
  updateKeranjang();
  if (keranjang.length === 0) {
    keranjangEl.style.display = "none"; // Sembunyikan keranjang jika kosong
  }
}

// Fungsi untuk menghitung subtotal, diskon, dan total
function hitungTotalDenganDiskon() {
  const subtotal = keranjang.reduce((total, item) => total + item.harga, 0);
  let diskon = 0;

  // Aturan diskon
  if (subtotal > 2000000) {
    diskon += 0.15;
  } else if (subtotal > 1000000) {
    diskon += 0.1;
  }

  if (keranjang.length > 5) {
    diskon += 0.05;
  }

  const totalDiskon = subtotal * diskon;
  const totalSetelahDiskon = subtotal - totalDiskon;

  subtotalEl.textContent = `Rp ${subtotal.toLocaleString()}`;
  diskonEl.textContent = `${(diskon * 100).toFixed(0)}%`;
  totalEl.textContent = `Rp ${totalSetelahDiskon.toLocaleString()}`;
}

// Fungsi untuk menampilkan dan menyembunyikan keranjang
function toggleKeranjang() {
  keranjangEl.style.display =
    keranjangEl.style.display === "none" || keranjangEl.style.display === ""
      ? "block"
      : "none";
  document.getElementById("toggleCartButton").textContent =
    keranjangEl.style.display === "none" ? "▼" : "▲";
}

// Inisialisasi: sembunyikan keranjang saat pertama kali memuat
keranjangEl.style.display = "none";
