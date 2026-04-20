// ================================================================
// TYPING EFFECT
// Perbaikan bug: j tidak lagi bisa mencapai -1 sebelum reset
// ================================================================
const typingEl = document.querySelector(".role span");
const words = ["Frontend Developer", "Web Developer", "UI Enthusiast"];
let wordIndex = 0, charIndex = 0, isDeleting = false;

function type() {
  const current = words[wordIndex];

  if (isDeleting) {
    typingEl.textContent = current.substring(0, charIndex--);
    if (charIndex < 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      charIndex = 0;
    }
  } else {
    typingEl.textContent = current.substring(0, charIndex++);
    if (charIndex > current.length) {
      isDeleting = true;
      setTimeout(type, 1200);
      return;
    }
  }

  setTimeout(type, isDeleting ? 50 : 100);
}

type();


// ================================================================
// OPEN PROJECT
// ================================================================
function openProject(url) {
  window.open(url, "_blank", "noopener,noreferrer");
}


// ================================================================
// NAVBAR: shadow saat scroll + active link highlight
//
// Dua fitur baru CSS kita butuh JS:
// 1. Class "scrolled" untuk menambah shadow saat user scroll ke bawah
// 2. Class "active" pada link navbar sesuai section yang sedang dilihat
// ================================================================
const navbar = document.getElementById("navbar");
const navLinks = document.querySelectorAll("#navbar a");
const sections = document.querySelectorAll("section[id]");

// IntersectionObserver adalah cara modern dan efisien untuk mendeteksi
// kapan suatu elemen masuk/keluar viewport — jauh lebih baik dari
// event listener scroll karena tidak berjalan setiap pixel scroll
const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // Hapus class active dari semua link dulu
        navLinks.forEach((link) => link.classList.remove("active"));
        // Tambahkan active pada link yang href-nya cocok dengan section aktif
        const activeLink = document.querySelector(
          `#navbar a[href="#${entry.target.id}"]`
        );
        if (activeLink) activeLink.classList.add("active");
      }
    });
  },
  {
    // rootMargin: "-40% 0px -50% 0px" artinya section dianggap "aktif"
    // ketika posisinya ada di tengah viewport, bukan saat baru masuk
    rootMargin: "-40% 0px -50% 0px",
  }
);

sections.forEach((section) => sectionObserver.observe(section));

// Tambah/hapus class "scrolled" pada navbar berdasarkan posisi scroll
window.addEventListener("scroll", () => {
  navbar.classList.toggle("scrolled", window.scrollY > 20);
});


// ================================================================
// SCROLL ANIMATION (fade-in)
// Perbaikan: gunakan IntersectionObserver (lebih efisien dari scroll event)
// + trigger sekali saat load untuk elemen yang sudah terlihat
// ================================================================
const fadeElements = document.querySelectorAll(".fade-in");

const fadeObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
        // Setelah animasi selesai, berhenti mengamati elemen ini
        // supaya tidak ada komputasi yang tidak perlu
        fadeObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 } // Animasi dimulai ketika 15% elemen terlihat
);

fadeElements.forEach((el) => fadeObserver.observe(el));


// ================================================================
// AUTO-UPDATE TAHUN DI FOOTER
// Supaya tidak perlu update manual setiap tahun baru
// ================================================================
const yearEl = document.querySelector("footer .year");
if (yearEl) yearEl.textContent = new Date().getFullYear();