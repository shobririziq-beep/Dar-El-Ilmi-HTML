
document.addEventListener("DOMContentLoaded", () => {
  "use strict";

  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

  const currentPage = document.body.dataset.page || "index";
  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  const year = new Date().getFullYear();

  /* =====================================================
     NOTIFIKASI
  ===================================================== */

  let toastTimer;

  window.showToast = (message, kind = "success") => {
    let toast = $("#site-toast");

    if (!toast) {
      toast = document.createElement("div");
      toast.id = "site-toast";
      toast.className = "toast";
      toast.setAttribute("role", "status");
      toast.setAttribute("aria-live", "polite");
      document.body.appendChild(toast);
    }

    toast.dataset.kind = kind;
    toast.replaceChildren();

    const icon = document.createElement("span");
    icon.className = "toast-icon";
    icon.textContent = kind === "error" ? "!" : "✓";

    const messageText = document.createElement("span");
    messageText.textContent = message;

    toast.append(icon, messageText);
    toast.classList.add("show");

    clearTimeout(toastTimer);

    toastTimer = setTimeout(() => {
      toast.classList.remove("show");
    }, 3600);
  };

  /* =====================================================
     HEADER DAN NAVIGASI
  ===================================================== */

  const active = page =>
    currentPage === page
      ? ' class="active" aria-current="page"'
      : "";

  const headerHost = $("#site-header");

  if (headerHost) {
    headerHost.innerHTML = `
      <header class="site-header">
        <div class="container navbar">

          <a class="brand" href="index.html" aria-label="Dar El Ilmi, beranda">
            <span class="brand-mark">DI</span>

            <span class="brand-copy">
              Dar El Ilmi
            </span>
          </a>

          <button
            class="menu-toggle"
            type="button"
            aria-controls="mainNav"
            aria-expanded="false"
            aria-label="Buka menu"
          >☰</button>

          <nav class="nav-links" id="mainNav" aria-label="Navigasi utama">

            <a href="index.html"${active("index")}>Beranda</a>
            <a href="profil.html"${active("profil")}>Profil</a>

            <details class="nav-menu">
              <summary>Akademik ⌄</summary>

              <div class="dropdown-menu">
                <a href="program.html"${active("program")}>Program Pendidikan</a>
                <a href="fasilitas.html"${active("fasilitas")}>Fasilitas Sekolah</a>
                <a href="perpustakaan.html"${active("perpustakaan")}>Perpustakaan Digital</a>
              </div>
            </details>

            <details class="nav-menu">
              <summary>PPDB ⌄</summary>

              <div class="dropdown-menu">
                <a href="info.html"${active("info")}>Informasi Pendaftaran</a>
                <a href="alur.html"${active("alur")}>Alur Pendaftaran</a>
                <a href="daftar.html"${active("daftar")}>Form Pendaftaran</a>
              </div>
            </details>

            <details class="nav-menu">
              <summary>Lainnya ⌄</summary>

              <div class="dropdown-menu">
                <a href="faq.html"${active("faq")}>Pertanyaan Umum</a>
                <a href="kontak.html"${active("kontak")}>Kontak Sekolah</a>
                <a href="data-ppdb.html"${active("data-ppdb")}>Data PPDB Demo</a>
              </div>
            </details>

            <a class="nav-cta" href="daftar.html">Daftar Sekarang ↗</a>

          </nav>
        </div>
      </header>
    `;
  }

  /* =====================================================
     DROPDOWN EKSKLUSIF
     HANYA SATU MENU BOLEH TERBUKA.
  ===================================================== */

  const navMenus = $$(".nav-menu");

  navMenus.forEach(menu => {
    menu.addEventListener("toggle", () => {
      if (!menu.open) return;

      navMenus.forEach(otherMenu => {
        if (otherMenu !== menu && otherMenu.open) {
          otherMenu.open = false;
        }
      });
    });
  });

  /* =====================================================
     FOOTER
  ===================================================== */

  const footerHost = $("#site-footer");

  if (footerHost) {
    footerHost.innerHTML = `
      <footer class="site-footer">
        <div class="container footer-main">

          <div class="footer-about">

            <a class="brand" href="index.html">
              <span class="brand-mark">DI</span>

              <span class="brand-copy">
                Dar El Ilmi
              </span>
            </a>

            <p>
              Ruang belajar modern yang mengembangkan ilmu, karakter,
              kreativitas, dan kesiapan menghadapi masa depan.
            </p>

          </div>

          <div class="footer-column">
            <h3>Jelajahi</h3>
            <a href="profil.html">Profil Sekolah</a>
            <a href="program.html">Program Akademik</a>
            <a href="fasilitas.html">Fasilitas Sekolah</a>
            <a href="perpustakaan.html">Perpustakaan Digital</a>
          </div>

          <div class="footer-column">
            <h3>Penerimaan</h3>
            <a href="info.html">Info PPDB</a>
            <a href="alur.html">Alur Pendaftaran</a>
            <a href="daftar.html">Form Pendaftaran</a>
            <a href="data-ppdb.html">Data PPDB Demo</a>
          </div>

          <div class="footer-column">
            <h3>Bantuan</h3>
            <a href="faq.html">Pertanyaan Umum</a>
            <a href="kontak.html">Kontak</a>
            <a href="index.html#galeri">Galeri Kampus</a>
          </div>

        </div>

        <div class="container footer-bottom">
          <span>© ${year} Dar El Ilmi · Website demonstrasi.</span>
          <span>Knowledge · Character · Future</span>
        </div>
      </footer>
    `;
  }

  /* =====================================================
     MENU MOBILE
  ===================================================== */

  const header = $(".site-header");
  const menuButton = $(".menu-toggle");
  const nav = $(".nav-links");

  function updateHeader() {
    header?.classList.toggle("scrolled", window.scrollY > 10);
  }

  updateHeader();

  window.addEventListener("scroll", updateHeader, {
    passive: true
  });

  function closeMenu() {
    nav?.classList.remove("open");

    menuButton?.setAttribute("aria-expanded", "false");
    menuButton?.setAttribute("aria-label", "Buka menu");

    navMenus.forEach(menu => {
      menu.open = false;
    });
  }

  menuButton?.addEventListener("click", () => {
    const opened = nav?.classList.toggle("open") ?? false;
f
    menuButton.setAttribute("aria-expanded", String(opened));
    menuButton.setAttribute(
      "aria-label",
      opened ? "Tutup menu" : "Buka menu"
    );

    if (!opened) {
      navMenus.forEach(menu => {
        menu.open = false;
      });
    }
  });

  $$(".nav-links a").forEach(link => {
    link.addEventListener("click", closeMenu);
  });

  /* Tutup dropdown jika pengguna mengeklik area lain. */

  document.addEventListener("click", event => {
    if (!(event.target instanceof Element)) return;

    if (!event.target.closest(".nav-menu")) {
      navMenus.forEach(menu => {
        menu.open = false;
      });
    }
  });

  /* =====================================================
     VIDEO SINEMATIK
  ===================================================== */

  const cinematicVideo = $(".cinematic-video");

  if (cinematicVideo) {
    const connection =
      navigator.connection ||
      navigator.mozConnection ||
      navigator.webkitConnection;

    if (reduceMotion || connection?.saveData) {
      cinematicVideo.pause();
    } else {
      const playAttempt = cinematicVideo.play();

      if (playAttempt && typeof playAttempt.catch === "function") {
        playAttempt.catch(() => {
          // Poster tetap terlihat jika autoplay diblokir.
        });
      }
    }

    cinematicVideo.addEventListener("error", () => {
      cinematicVideo.style.display = "none";
    });
  }

  /* =====================================================
     PENGGANTI GAMBAR RUSAK
  ===================================================== */

  const fallbackPhotos = [
    "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=1200&q=80"
  ];

  const localPlaceholder =
    "data:image/svg+xml;charset=UTF-8," +
    encodeURIComponent(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 800">
        <defs>
          <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stop-color="#08264c"/>
            <stop offset="100%" stop-color="#285fe8"/>
          </linearGradient>
        </defs>

        <rect width="1200" height="800" fill="url(#bg)"/>

        <g fill="none" stroke="#ffffff" stroke-opacity=".24">
          <path d="M0 200H1200M0 400H1200M0 600H1200"/>
          <path d="M200 0V800M400 0V800M600 0V800M800 0V800M1000 0V800"/>
        </g>

        <text
          x="600" y="385"
          font-size="52"
          font-family="Arial,sans-serif"
          text-anchor="middle"
          fill="#ffffff"
          font-weight="700"
        >DAR EL ILMI</text>

        <text
          x="600" y="440"
          font-size="21"
          font-family="Arial,sans-serif"
          text-anchor="middle"
          fill="#dbe7ff"
        ></text>
      </svg>
    `);

  function getFallbackIndex(image) {
    const description = (
      (image.alt || "") + " " + (image.getAttribute("src") || "")
    ).toLowerCase();

    if (/book|buku|library|perpustakaan|reading|literasi/.test(description)) {
      return 2;
    }

    if (/lab|science|sains|experiment/.test(description)) {
      return 6;
    }

    if (/code|coding|laptop|technology|teknologi|digital/.test(description)) {
      return 4;
    }

    if (/class|kelas|student|siswa|learning|pendidikan/.test(description)) {
      return 1;
    }

    if (/team|collaboration|kolaborasi|community/.test(description)) {
      return 3;
    }

    return 0;
  }

  function repairImage(image) {
    if (!(image instanceof HTMLImageElement)) return;

    if (image.dataset.fallbackComplete === "true") return;

    const attempt = Number(image.dataset.fallbackAttempt || 0);

    if (attempt < fallbackPhotos.length) {
      const startIndex = getFallbackIndex(image);
      const nextIndex = (startIndex + attempt) % fallbackPhotos.length;

      image.dataset.fallbackAttempt = String(attempt + 1);
      image.src = fallbackPhotos[nextIndex];

      return;
    }

    image.dataset.fallbackComplete = "true";
    image.removeAttribute("srcset");
    image.src = localPlaceholder;
  }

  document.addEventListener("error", event => {
    if (event.target instanceof HTMLImageElement) {
      repairImage(event.target);
    }
  }, true);

  $$("img").forEach(image => {
    if (
      image.complete &&
      image.naturalWidth === 0 &&
      image.getAttribute("src")
    ) {
      repairImage(image);
    }
  });

  /* =====================================================
     LOADER HALAMAN
  ===================================================== */

  const loader = $(".site-loader");

  if (loader) {
    if (reduceMotion) {
      loader.remove();
    } else {
      setTimeout(() => loader.classList.add("done"), 150);
      setTimeout(() => loader.remove(), 850);
    }
  }

  /* =====================================================
     ANIMASI SCROLL REVEAL
  ===================================================== */

  const revealElements = $$(
    ".reveal, .reveal-left, .reveal-right, .zoom-reveal, .blur-reveal"
  );

  if (reduceMotion || !("IntersectionObserver" in window)) {
    revealElements.forEach(element => {
      element.classList.add("visible");
    });
  } else {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -25px 0px"
      }
    );

    revealElements.forEach(element => {
      revealObserver.observe(element);
    });
  }

  /* =====================================================
     COUNTER BERANDA — HITUNG DARI NOL
  ===================================================== */

  const counters = $$(".stats-grid [data-count]");

  function animateCounter(element) {
    const target = Number(element.dataset.count);

    if (!Number.isFinite(target)) return;

    if (reduceMotion) {
      element.textContent = String(target);
      return;
    }

    const duration = 1400;
    const startTime = performance.now();

    element.textContent = "0";

    function tick(now) {
      const progress = Math.min((now - startTime) / duration, 1);
      const easedProgress = 1 - Math.pow(1 - progress, 3);

      element.textContent = String(
        Math.round(target * easedProgress)
      );

      if (progress < 1) {
        requestAnimationFrame(tick);
      } else {
        element.textContent = String(target);
      }
    }

    requestAnimationFrame(tick);
  }

  if (counters.length) {
    if (reduceMotion || !("IntersectionObserver" in window)) {
      counters.forEach(animateCounter);
    } else {
      const counterObserver = new IntersectionObserver(
        (entries, observer) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              animateCounter(entry.target);
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.45 }
      );

      counters.forEach(counter => {
        counterObserver.observe(counter);
      });
    }
  }

  /* =====================================================
     PARALLAX FOTO
  ===================================================== */

  const parallaxImages = $$("[data-parallax]");

  if (
    parallaxImages.length &&
    !reduceMotion &&
    window.matchMedia("(min-width: 850px)").matches
  ) {
    let parallaxBusy = false;

    const updateParallax = () => {
      if (parallaxBusy) return;

      parallaxBusy = true;

      requestAnimationFrame(() => {
        parallaxImages.forEach(image => {
          const rect = image.getBoundingClientRect();

          const center =
            rect.top + rect.height / 2 - window.innerHeight / 2;

          const strength =
            Number(image.dataset.parallax) || 0.025;

          image.style.transform =
            `translateY(${center * -strength}px) scale(1.08)`;
        });

        parallaxBusy = false;
      });
    };

    window.addEventListener("scroll", updateParallax, {
      passive: true
    });

    updateParallax();
  }

  /* =====================================================
     RIPPLE BUTTON
  ===================================================== */

  $$(".btn").forEach(button => {
    button.addEventListener("click", event => {
      if (reduceMotion || !(event instanceof MouseEvent)) return;

      const rect = button.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height) * .65;

      const ripple = document.createElement("span");
      ripple.className = "ripple";

      ripple.style.width = `${size}px`;
      ripple.style.height = `${size}px`;

      ripple.style.left =
        `${event.clientX - rect.left - size / 2}px`;

      ripple.style.top =
        `${event.clientY - rect.top - size / 2}px`;

      button.appendChild(ripple);

      setTimeout(() => ripple.remove(), 650);
    });
  });

  /* =====================================================
     TRANSISI ANTARHALAMAN
  ===================================================== */

  $$('a[href$=".html"]').forEach(link => {
    link.addEventListener("click", event => {
      if (
        reduceMotion ||
        event.button !== 0 ||
        event.ctrlKey ||
        event.metaKey ||
        event.shiftKey ||
        event.altKey ||
        link.target === "_blank" ||
        link.hasAttribute("download")
      ) {
        return;
      }

      let destination;

      try {
        destination = new URL(link.href, location.href);
      } catch {
        return;
      }

      if (
        destination.origin !== location.origin ||
        destination.pathname === location.pathname
      ) {
        return;
      }

      if (document.body.dataset.navigating === "true") {
        event.preventDefault();
        return;
      }

      event.preventDefault();
      document.body.dataset.navigating = "true";

      const veil = document.createElement("div");
      veil.className = "site-loader";
      veil.setAttribute("aria-hidden", "true");

      veil.innerHTML = `
        <div class="loader-brand">
          <span class="loader-emblem">DI</span>
          <span>Dar El Ilmi</span>
        </div>
      `;

      document.body.appendChild(veil);

      setTimeout(() => {
        location.href = destination.href;
      }, 250);
    });
  });

  /* =====================================================
     FAQ — SATU ITEM TERBUKA
  ===================================================== */

  $$("[data-single-accordion]").forEach(group => {
    $$("details", group).forEach(item => {
      item.addEventListener("toggle", () => {
        if (!item.open) return;

        $$("details", group).forEach(other => {
          if (other !== item) {
            other.open = false;
          }
        });
      });
    });
  });

  /* =====================================================
     GALERI TAMBAHAN HALAMAN
  ===================================================== */

  const pageVisualsByType = {
    profil: [
      [
        "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=900&q=84",
        "Modern learning spaces"
      ],
      [
        "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=900&q=84",
        "A collaborative culture"
      ],
      [
        "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=900&q=84",
        "Metropolitan perspective"
      ]
    ],

    program: [
      [
        "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=900&q=84",
        "Code, create, explore"
      ],
      [
        "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=900&q=84",
        "Science in action"
      ],
      [
        "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=900&q=84",
        "Ideas become teamwork"
      ]
    ],

    fasilitas: [
      [
        "https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=900&q=84",
        "A library built for discovery"
      ],
      [
        "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=900&q=84",
        "Technology and practice"
      ],
      [
        "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=900&q=84",
        "Spaces for collaboration"
      ]
    ],

    perpustakaan: [
      [
        "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?auto=format&fit=crop&w=900&q=84",
        "Books, ideas, possibility"
      ],
      [
        "https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=900&q=84",
        "A quiet place to think"
      ],
      [
        "https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&w=900&q=84",
        "Research beyond the page"
      ]
    ],

    info: [
      [
        "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=900&q=84",
        "Student life"
      ],
      [
        "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=900&q=84",
        "A new academic chapter"
      ],
      [
        "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=900&q=84",
        "Campus in the city"
      ]
    ],

    alur: [
      [
        "https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&w=900&q=84",
        "Start with clear information"
      ],
      [
        "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=900&q=84",
        "Prepare for the next step"
      ],
      [
        "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=900&q=84",
        "Your campus journey"
      ]
    ],

    faq: [
      [
        "https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=900&q=84",
        "Find your answer"
      ],
      [
        "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=84",
        "Digital learning"
      ],
      [
        "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=900&q=84",
        "Explore the campus"
      ]
    ],

    kontak: [
      [
        "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=900&q=84",
        "A welcoming place"
      ],
      [
        "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=900&q=84",
        "Community and connection"
      ],
      [
        "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=900&q=84",
        "Located in a modern city"
      ]
    ]
  };

  const visualSet = pageVisualsByType[currentPage];
  const main = $("main");
  const pageBanner = $(".page-banner", main || document);

  if (
    visualSet &&
    pageBanner &&
    !$(".photo-ribbon", main || document)
  ) {
    const ribbon = document.createElement("div");

    ribbon.className = "photo-ribbon reveal-left";
    ribbon.setAttribute("aria-label", "Galeri visual halaman");

    visualSet.forEach(([src, caption], index) => {
      const figure = document.createElement("figure");

      figure.className =
        index === 1
          ? "ribbon-photo zoom-reveal"
          : "ribbon-photo";

      const image = document.createElement("img");
      image.src = src;
      image.alt = caption;
      image.loading = "lazy";
      image.decoding = "async";

      const captionElement = document.createElement("figcaption");
      captionElement.textContent = caption;

      figure.append(image, captionElement);
      ribbon.appendChild(figure);
    });

    pageBanner.insertAdjacentElement("afterend", ribbon);

    if (reduceMotion || !("IntersectionObserver" in window)) {
      ribbon.classList.add("visible");

      $$(".zoom-reveal", ribbon).forEach(element => {
        element.classList.add("visible");
      });
    } else {
      const ribbonObserver = new IntersectionObserver(
        (entries, observer) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              entry.target.classList.add("visible");
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.12 }
      );

      [ribbon, ...$$(".zoom-reveal", ribbon)].forEach(element => {
        ribbonObserver.observe(element);
      });
    }
  }

  /* =====================================================
     PERPUSTAKAAN: CARI, FILTER, SIMPAN BACAAN
  ===================================================== */

  const librarySearch = $("#librarySearch");
  const libraryGrid = $("#bookGrid");
  const filterButtons = $$("[data-book-filter]");
  const savedBooksKey = "darElIlmiSavedBooksV1";

  let currentBookFilter = "all";

  function getSavedBooks() {
    try {
      const saved = JSON.parse(
        localStorage.getItem(savedBooksKey) || "[]"
      );

      return Array.isArray(saved) ? saved : [];
    } catch {
      return [];
    }
  }

  function filterBooks() {
    if (!libraryGrid) return;

    const query = (librarySearch?.value || "").trim().toLowerCase();

    let visibleCount = 0;

    $$(".book-card", libraryGrid).forEach(card => {
      const matchesText =
        card.textContent.toLowerCase().includes(query);

      const matchesCategory =
        currentBookFilter === "all" ||
        card.dataset.category === currentBookFilter;

      const shouldShow = matchesText && matchesCategory;

      card.hidden = !shouldShow;

      if (shouldShow) visibleCount++;
    });

    const emptyState = $("#libraryEmpty");

    if (emptyState) {
      emptyState.hidden = visibleCount !== 0;
    }
  }

  function syncSavedBooks() {
    const saved = getSavedBooks();

    $$("[data-save-book]").forEach(button => {
      const code = button.dataset.saveBook;

      const exists = saved.some(book => book.code === code);

      button.textContent = exists
        ? "Tersimpan ✓"
        : "Simpan bacaan +";

      button.classList.toggle("btn-dark", exists);
      button.classList.toggle("btn-outline", !exists);
    });

    const count = $("#savedBookCount");

    if (count) {
      count.textContent = String(saved.length);
    }
  }

  librarySearch?.addEventListener("input", filterBooks);

  filterButtons.forEach(button => {
    button.addEventListener("click", () => {
      currentBookFilter = button.dataset.bookFilter || "all";

      filterButtons.forEach(item => {
        item.classList.toggle("active", item === button);
      });

      filterBooks();
    });
  });

  $$("[data-save-book]").forEach(button => {
    button.addEventListener("click", () => {
      const code = button.dataset.saveBook;
      const card = button.closest(".book-card");

      if (!card) return;

      const saved = getSavedBooks();

      const existingIndex = saved.findIndex(
        book => book.code === code
      );

      if (existingIndex >= 0) {
        saved.splice(existingIndex, 1);
      } else {
        saved.push({
          code,
          title:
            card.dataset.title ||
            $("h3", card)?.textContent ||
            code,
          savedAt: new Date().toISOString()
        });
      }

      try {
        localStorage.setItem(
          savedBooksKey,
          JSON.stringify(saved)
        );

        window.showToast(
          existingIndex >= 0
            ? "Buku dihapus dari daftar bacaan."
            : "Buku ditambahkan ke daftar bacaan."
        );
      } catch {
        window.showToast(
          "Penyimpanan browser tidak tersedia.",
          "error"
        );
      }

      syncSavedBooks();
    });
  });

  filterBooks();
  syncSavedBooks();

  /* =====================================================
     FORMULIR PENDAFTARAN
  ===================================================== */

  const registrationForm = $("#registrationForm");
  const registrationsStorageKey = "darElIlmiRegistrationsV1";

  if (registrationForm) {
    const fullName = $("#full_name");
    const school = $("#origin_school");
    const major = $("#major");

    const summaryName = $("#summaryName");
    const summarySchool = $("#summarySchool");
    const summaryMajor = $("#summaryMajor");

    function updateSummary() {
      if (summaryName) {
        summaryName.textContent =
          fullName?.value.trim() || "Belum diisi";
      }

      if (summarySchool) {
        summarySchool.textContent =
          school?.value.trim() || "Belum diisi";
      }

      if (summaryMajor) {
        summaryMajor.textContent =
          major?.value || "Belum dipilih";
      }
    }

    fullName?.addEventListener("input", updateSummary);
    school?.addEventListener("input", updateSummary);
    major?.addEventListener("change", updateSummary);

    updateSummary();

    const photoInput = $("#photo");
    const photoPreview = $("#photoPreview");

    let photoUrl = null;

    photoInput?.addEventListener("change", () => {
      if (photoUrl) {
        URL.revokeObjectURL(photoUrl);
        photoUrl = null;
      }

      photoPreview?.classList.remove("is-shown");

      if (photoPreview) {
        photoPreview.removeAttribute("src");
      }

      const file = photoInput.files?.[0];

      if (!file) return;

      if (!["image/jpeg", "image/png"].includes(file.type)) {
        window.showToast("Pilih foto JPG atau PNG.", "error");
        photoInput.value = "";
        return;
      }

      if (file.size > 2 * 1024 * 1024) {
        window.showToast("Ukuran foto maksimal 2 MB.", "error");
        photoInput.value = "";
        return;
      }

      if (photoPreview) {
        photoUrl = URL.createObjectURL(file);
        photoPreview.src = photoUrl;
        photoPreview.classList.add("is-shown");
      }
    });

    registrationForm.addEventListener("submit", event => {
      event.preventDefault();

      if (!registrationForm.reportValidity()) return;

      const formData = new FormData(registrationForm);

      const get = key =>
        String(formData.get(key) || "").trim();

      const registration = {
        number:
          `DEI-${new Date().getFullYear()}-` +
          Math.random().toString(36).slice(2, 8).toUpperCase(),

        name: get("full_name"),
        nisn: get("nisn"),
        gender: get("gender"),
        birthPlace: get("birth_place"),
        birthDate: get("birth_date"),
        originSchool: get("origin_school"),
        address: get("address"),
        parentName: get("parent_name"),
        parentPhone: get("parent_phone"),
        email: get("email"),
        major: get("major"),
        photoName: photoInput?.files?.[0]?.name || "Tidak diunggah",
        createdAt: new Date().toISOString(),
        status: "Simulasi lokal"
      };

      try {
        const existing = JSON.parse(
          localStorage.getItem(registrationsStorageKey) || "[]"
        );

        if (!Array.isArray(existing)) {
          throw new Error("Format penyimpanan tidak valid.");
        }

        existing.push(registration);

        localStorage.setItem(
          registrationsStorageKey,
          JSON.stringify(existing)
        );

        sessionStorage.setItem(
          "darElIlmiLatestReceipt",
          JSON.stringify(registration)
        );

        window.location.href = "sukses.html";
      } catch {
        window.showToast(
          "Data tidak dapat disimpan. Periksa ruang penyimpanan browser.",
          "error"
        );
      }
    });
  }

  /* =====================================================
     HALAMAN SUKSES
  ===================================================== */

  const registrationNumber = $("#registrationNumber");

  if (registrationNumber) {
    let receipt = null;

    try {
      receipt = JSON.parse(
        sessionStorage.getItem("darElIlmiLatestReceipt") || "null"
      );
    } catch {
      receipt = null;
    }

    const successMessage = $("#successMessage");
    const detailList = $("#receiptDetails");

    if (receipt) {
      registrationNumber.textContent = receipt.number;

      if (successMessage) {
        successMessage.textContent =
          `Terima kasih, ${receipt.name}. Simulasi formulir program ` +
          `${receipt.major} berhasil disimpan di browser ini.`;
      }

      if (detailList) {
        detailList.replaceChildren();

        const details = [
          ["Nama", receipt.name],
          ["Program", receipt.major],
          ["Sekolah asal", receipt.originSchool]
        ];

        details.forEach(([label, value]) => {
          const row = document.createElement("div");
          row.className = "summary-item";

          const name = document.createElement("span");
          name.textContent = label;

          const data = document.createElement("strong");
          data.textContent = value || "—";

          row.append(name, data);
          detailList.appendChild(row);
        });
      }
    } else {
      registrationNumber.textContent = "Belum tersedia";

      if (successMessage) {
        successMessage.textContent =
          "Belum ada formulir yang disimulasikan. " +
          "Silakan isi formulir terlebih dahulu.";
      }
    }

    $("#printReceipt")?.addEventListener("click", () => {
      window.print();
    });
  }

  /* =====================================================
     FORM KONTAK
  ===================================================== */

  const contactForm = $("#contactForm");

  contactForm?.addEventListener("submit", event => {
    event.preventDefault();

    if (!contactForm.reportValidity()) return;

    const formData = new FormData(contactForm);

    const message = {
      name: String(formData.get("contactName") || "").trim(),
      email: String(formData.get("contactEmail") || "").trim(),
      topic: String(formData.get("contactTopic") || "").trim(),
      message: String(formData.get("contactMessage") || "").trim(),
      createdAt: new Date().toISOString()
    };

    try {
      const storageKey = "darElIlmiContactMessagesV1";

      const records = JSON.parse(
        localStorage.getItem(storageKey) || "[]"
      );

      if (!Array.isArray(records)) {
        throw new Error("Format penyimpanan tidak valid.");
      }

      records.push(message);

      localStorage.setItem(
        storageKey,
        JSON.stringify(records)
      );

      const success = $("#contactSuccess");

      if (success) {
        success.textContent =
          "Pesan demonstrasi tersimpan di browser ini. " +
          "Website belum mengirim email atau pesan ke sekolah.";

        success.classList.add("show");
      }

      contactForm.reset();
      window.showToast("Pesan simulasi berhasil dicatat.");
    } catch {
      window.showToast(
        "Pesan tidak dapat disimpan di browser.",
        "error"
      );
    }
  });

  /* =====================================================
     DASHBOARD PPDB
  ===================================================== */

  const admissionsTableBody = $("#admissionsTableBody");

  if (admissionsTableBody) {
    const countElement = $("#registrationCount");
    const searchRegistration = $("#searchRegistration");
    const emptyMessage = $("#emptyRegistrations");
    const clearButton = $("#clearRegistrations");
    const exportButton = $("#exportRegistrations");

    function getRegistrations() {
      try {
        const records = JSON.parse(
          localStorage.getItem(registrationsStorageKey) || "[]"
        );

        return Array.isArray(records) ? records : [];
      } catch {
        return [];
      }
    }

    function createCell(value) {
      const cell = document.createElement("td");
      cell.textContent = value || "—";
      return cell;
    }

    function renderRegistrations() {
      const records = getRegistrations();

      const query = (
        searchRegistration?.value || ""
      ).trim().toLowerCase();

      const filtered = records.filter(record => {
        const searchableText = [
          record.number,
          record.name,
          record.email,
          record.originSchool,
          record.major,
          record.status
        ].join(" ").toLowerCase();

        return searchableText.includes(query);
      });

      admissionsTableBody.replaceChildren();

      filtered.forEach(record => {
        const row = document.createElement("tr");

        row.appendChild(createCell(record.number));

        const nameCell = document.createElement("td");

        const name = document.createElement("strong");
        name.textContent = record.name || "—";

        const email = document.createElement("small");
        email.style.display = "block";
        email.style.color = "#71859f";
        email.textContent = record.email || "Tanpa email";

        nameCell.append(name, email);
        row.appendChild(nameCell);

        row.appendChild(createCell(record.originSchool));
        row.appendChild(createCell(record.major));
        row.appendChild(createCell(record.status));

        const actionCell = document.createElement("td");
        const deleteButton = document.createElement("button");

        deleteButton.type = "button";
        deleteButton.className = "delete-record";
        deleteButton.textContent = "Hapus";
        deleteButton.dataset.deleteRegistration = record.number;

        deleteButton.setAttribute(
          "aria-label",
          `Hapus data demo ${record.number}`
        );

        actionCell.appendChild(deleteButton);
        row.appendChild(actionCell);

        admissionsTableBody.appendChild(row);
      });

      if (countElement) {
        countElement.textContent = String(records.length);
      }

      if (emptyMessage) {
        emptyMessage.hidden = filtered.length !== 0;

        emptyMessage.textContent =
          records.length === 0
            ? "Belum ada data. Isi formulir PPDB demo terlebih dahulu."
            : "Tidak ditemukan data yang cocok.";
      }
    }

    searchRegistration?.addEventListener(
      "input",
      renderRegistrations
    );

    admissionsTableBody.addEventListener("click", event => {
      const button = event.target.closest(
        "[data-delete-registration]"
      );

      if (!button) return;

      const number = button.dataset.deleteRegistration;

      const remaining = getRegistrations().filter(
        record => record.number !== number
      );

      try {
        localStorage.setItem(
          registrationsStorageKey,
          JSON.stringify(remaining)
        );

        renderRegistrations();
        window.showToast("Data demo berhasil dihapus.");
      } catch {
        window.showToast("Data tidak dapat diubah.", "error");
      }
    });

    clearButton?.addEventListener("click", () => {
      const records = getRegistrations();

      if (records.length === 0) {
        window.showToast(
          "Belum ada data untuk dihapus.",
          "error"
        );
        return;
      }

      if (!window.confirm(
        "Hapus semua data PPDB demo di browser ini?"
      )) {
        return;
      }

      try {
        localStorage.removeItem(registrationsStorageKey);

        renderRegistrations();
        window.showToast("Semua data demo telah dihapus.");
      } catch {
        window.showToast("Data tidak dapat dihapus.", "error");
      }
    });

    exportButton?.addEventListener("click", () => {
      const records = getRegistrations();

      if (records.length === 0) {
        window.showToast(
          "Tidak ada data untuk diekspor.",
          "error"
        );
        return;
      }

      const columns = [
        ["Nomor registrasi", "number"],
        ["Nama", "name"],
        ["NISN", "nisn"],
        ["Jenis kelamin", "gender"],
        ["Tempat lahir", "birthPlace"],
        ["Tanggal lahir", "birthDate"],
        ["Sekolah asal", "originSchool"],
        ["Alamat", "address"],
        ["Nama orang tua/wali", "parentName"],
        ["Nomor telepon", "parentPhone"],
        ["Email", "email"],
        ["Program", "major"],
        ["Status", "status"],
        ["Tanggal dibuat", "createdAt"]
      ];

      const escapeCSV = value =>
        `"${String(value ?? "").replace(/"/g, '""')}"`;

      const lines = [
        columns.map(([label]) => escapeCSV(label)).join(","),

        ...records.map(record =>
          columns
            .map(([, key]) => escapeCSV(record[key]))
            .join(",")
        )
      ];

      const csv = "\uFEFF" + lines.join("\r\n");

      const blob = new Blob([csv], {
        type: "text/csv;charset=utf-8;"
      });

      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");

      link.href = url;
      link.download = "data-ppdb-demo.csv";

      document.body.appendChild(link);
      link.click();
      link.remove();

      setTimeout(() => URL.revokeObjectURL(url), 1000);

      window.showToast("Ekspor CSV selesai.");
    });

    renderRegistrations();
  }

});
