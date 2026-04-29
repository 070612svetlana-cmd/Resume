(function () {
  const THEME_KEY = "svetlanaa_portfolio_theme";
  const body = document.body;
  const toggleButton = document.getElementById("themeToggle");
  const toggleIcon = toggleButton ? toggleButton.querySelector(".theme-toggle__icon") : null;

  function setTheme(themeName) {
    const isLight = themeName === "light";
    body.classList.toggle("light-theme", isLight);
    if (toggleIcon) {
      toggleIcon.textContent = isLight ? "☀️" : "🌙";
    }
  }

  function getInitialTheme() {
    const savedTheme = localStorage.getItem(THEME_KEY);
    if (savedTheme === "light" || savedTheme === "dark") {
      return savedTheme;
    }
    const prefersLight = window.matchMedia && window.matchMedia("(prefers-color-scheme: light)").matches;
    return prefersLight ? "light" : "dark";
  }

  let currentTheme = getInitialTheme();
  setTheme(currentTheme);

  if (toggleButton) {
    toggleButton.addEventListener("click", function () {
      currentTheme = currentTheme === "light" ? "dark" : "light";
      localStorage.setItem(THEME_KEY, currentTheme);
      setTheme(currentTheme);
    });
  }

  const typingTextNode = document.getElementById("heroTypingText");
  const typingCursorNode = document.getElementById("heroTypingCursor");
  const typingSentences = [
    "AI-продукты и сайты",
    "которые выглядят современно",
    "и работают на результат"
  ];
  const typingSpeed = 75;
  const pauseDuration = 1500;
  const deletingSpeed = 50;
  const loopTyping = true;

  function runTypingEffect() {
    if (!typingTextNode || !typingSentences.length) {
      return;
    }

    let sentenceIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function stepTyping() {
      const currentSentence = typingSentences[sentenceIndex];

      if (!isDeleting && charIndex <= currentSentence.length) {
        typingTextNode.textContent = currentSentence.slice(0, charIndex);
        charIndex += 1;
        if (charIndex <= currentSentence.length) {
          window.setTimeout(stepTyping, typingSpeed);
        } else {
          window.setTimeout(function () {
            isDeleting = true;
            stepTyping();
          }, pauseDuration);
        }
        return;
      }

      if (isDeleting && charIndex >= 0) {
        typingTextNode.textContent = currentSentence.slice(0, charIndex);
        charIndex -= 1;
        if (charIndex >= 0) {
          window.setTimeout(stepTyping, deletingSpeed);
        } else {
          isDeleting = false;
          sentenceIndex += 1;
          if (sentenceIndex >= typingSentences.length) {
            if (loopTyping) {
              sentenceIndex = 0;
            } else {
              sentenceIndex = typingSentences.length - 1;
              return;
            }
          }
          charIndex = 0;
          window.setTimeout(stepTyping, 300);
        }
      }
    }

    stepTyping();
  }

  if (typingCursorNode) {
    typingCursorNode.textContent = "_";
  }
  runTypingEffect();
  const heroAvatar = document.getElementById("heroAvatar");
  const heroAvatarFallback = document.getElementById("heroAvatarFallback");
  if (heroAvatar && heroAvatarFallback) {
    heroAvatar.addEventListener("error", function () {
      heroAvatar.style.display = "none";
      heroAvatarFallback.style.display = "flex";
      heroAvatarFallback.setAttribute("aria-hidden", "false");
    });
  }

  const portfolioItemsRoot = document.getElementById("portfolioItems");
  const portfolioTabsRoot = document.getElementById("portfolioTabs");
  const lightbox = document.getElementById("lightbox");
  const lightboxImage = document.getElementById("lightboxImage");
  const lightboxClose = document.getElementById("lightboxClose");
  function buildPortfolioData() {
    if (Array.isArray(window.PORTFOLIO_MANIFEST) && window.PORTFOLIO_MANIFEST.length) {
      return window.PORTFOLIO_MANIFEST;
    }
    return [];
  }

  const portfolioData = buildPortfolioData();

  function normalizeNameVariants(value) {
    const variants = [value];
    if (typeof value.normalize === "function") {
      variants.push(value.normalize("NFC"));
      variants.push(value.normalize("NFD"));
    }
    return Array.from(new Set(variants));
  }

  function buildMediaCandidates(folderName, fileName) {
    const folderVariants = normalizeNameVariants(folderName);
    const fileVariants = normalizeNameVariants(fileName);
    const candidates = [];

    folderVariants.forEach(function (folderVariant) {
      fileVariants.forEach(function (fileVariant) {
        const rawPath = "./" + folderVariant + "/" + fileVariant;
        const encodedSegmentsPath =
          "./" +
          encodeURIComponent(folderVariant) +
          "/" +
          encodeURIComponent(fileVariant).replace(/%2F/g, "/");
        const encodedUriPath = encodeURI(rawPath);
        candidates.push(rawPath, encodedSegmentsPath, encodedUriPath);
      });
    });

    return Array.from(new Set(candidates));
  }

  function openLightbox(src, altText) {
    if (!lightbox || !lightboxImage) {
      return;
    }
    lightboxImage.src = src;
    lightboxImage.alt = altText || "Просмотр изображения";
    lightbox.classList.add("is-open");
    lightbox.setAttribute("aria-hidden", "false");
  }

  function closeLightbox() {
    if (!lightbox || !lightboxImage) {
      return;
    }
    lightbox.classList.remove("is-open");
    lightbox.setAttribute("aria-hidden", "true");
    lightboxImage.src = "";
  }

  if (lightboxClose) {
    lightboxClose.addEventListener("click", closeLightbox);
  }
  if (lightbox) {
    lightbox.addEventListener("click", function (event) {
      if (event.target === lightbox) {
        closeLightbox();
      }
    });
  }
  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && lightbox && lightbox.classList.contains("is-open")) {
      closeLightbox();
    }
  });

  function createMediaCard(entry, fileName) {
    const article = document.createElement("article");
    article.className = "card folder-card portfolio-item-card " + (entry.toneClass || "");
    article.setAttribute("data-category", entry.category);
    article.setAttribute("data-folder", entry.folder);
    const mediaCandidates = buildMediaCandidates(entry.folder, fileName);
    const primaryMediaPath = mediaCandidates[0];

    const chip = document.createElement("span");
    chip.className = "folder-chip";
    chip.textContent = entry.chip || "ITEM";

    const preview = document.createElement("div");
    preview.className = "folder-preview";
    preview.setAttribute("aria-hidden", "true");

    const meta = document.createElement("div");
    meta.className = "portfolio-meta";

    const folder = document.createElement("span");
    folder.className = "portfolio-folder";
    folder.textContent = entry.shortName || entry.folder;
    folder.title = entry.folder;

    const link = document.createElement("a");
    link.className = "portfolio-link";
    const targetPath = entry.externalUrl || primaryMediaPath;
    link.href = targetPath;
    link.target = "_blank";
    link.rel = "noreferrer";
    link.textContent = entry.externalUrl ? "Перейти на сайт" : "Открыть";

    meta.appendChild(folder);
    meta.appendChild(link);

    const frame = document.createElement("div");
    frame.className = "media-frame " + (entry.type === "video" ? "is-video" : "is-image");

    if (entry.type === "video") {
      const video = document.createElement("video");
      let candidateIndex = 0;
      video.src = mediaCandidates[candidateIndex];
      link.href = mediaCandidates[candidateIndex];
      video.controls = true;
      video.preload = "metadata";
      video.playsInline = true;
      video.addEventListener("loadedmetadata", function () {
        link.href = video.currentSrc || mediaCandidates[candidateIndex];
      });
      video.addEventListener("error", function () {
        candidateIndex += 1;
        if (candidateIndex < mediaCandidates.length) {
          video.src = mediaCandidates[candidateIndex];
          link.href = mediaCandidates[candidateIndex];
          video.load();
          return;
        }
        frame.classList.add("media-missing");
        frame.textContent = "Видео недоступно по текущему пути.";
        link.classList.add("is-disabled");
        link.textContent = "Недоступно";
      });
      frame.appendChild(video);
    } else if (entry.type === "document") {
      frame.classList.add("media-missing");
      if (entry.externalUrl) {
        frame.textContent = "Публичная ссылка на готовый сайт.";
      } else if (fileName.toLowerCase().endsWith(".url")) {
        frame.textContent = "Открыть внешний сайт по ссылке.";
      } else {
        frame.textContent = "Документ в папке раздела.";
      }
    } else {
      const image = document.createElement("img");
      let candidateIndex = 0;
      image.src = mediaCandidates[candidateIndex];
      link.href = mediaCandidates[candidateIndex];
      image.alt = fileName;
      image.loading = "lazy";
      image.addEventListener("load", function () {
        link.href = image.currentSrc || mediaCandidates[candidateIndex];
      });
      image.addEventListener("click", function () {
        openLightbox(image.currentSrc || image.src, fileName);
      });
      image.addEventListener("error", function () {
        candidateIndex += 1;
        if (candidateIndex < mediaCandidates.length) {
          image.src = mediaCandidates[candidateIndex];
          link.href = mediaCandidates[candidateIndex];
          return;
        }
        frame.classList.add("media-missing");
        frame.textContent = "Изображение недоступно по текущему пути.";
        link.classList.add("is-disabled");
        link.textContent = "Недоступно";
      });
      frame.appendChild(image);
    }

    article.appendChild(chip);
    article.appendChild(preview);
    article.appendChild(meta);
    article.appendChild(frame);
    return article;
  }

  const filterRoot = document.getElementById("portfolioFilters");
  const filterButtons = filterRoot ? filterRoot.querySelectorAll(".filter-btn") : [];
  let activeFolder = "all";
  let activeCategory = "all";
  let tabButtons = [];

  function getFilteredFolders() {
    if (activeCategory === "all") {
      return portfolioData;
    }
    return portfolioData.filter(function (entry) {
      return entry.category === activeCategory;
    });
  }

  function animateCardsIn() {
    const cards = document.querySelectorAll("#portfolio .portfolio-item-card");
    cards.forEach(function (card, index) {
      card.animate(
        [
          { opacity: 0, transform: "translateY(12px) scale(0.97)" },
          { opacity: 1, transform: "translateY(0) scale(1)" }
        ],
        { duration: 260, easing: "ease-out", delay: Math.min(index * 24, 180) }
      );
    });
  }

  function createFolderCard(entry) {
    const article = document.createElement("article");
    article.className = "card folder-card portfolio-item-card " + (entry.toneClass || "");
    article.setAttribute("data-category", entry.category);
    article.setAttribute("data-folder", entry.folder);

    const chip = document.createElement("span");
    chip.className = "folder-chip";
    chip.textContent = entry.chip || "FOLDER";

    const preview = document.createElement("div");
    preview.className = "folder-preview";
    preview.setAttribute("aria-hidden", "true");

    const meta = document.createElement("div");
    meta.className = "portfolio-meta";

    const folder = document.createElement("span");
    folder.className = "portfolio-folder";
    folder.textContent = entry.shortName || entry.folder;
    folder.title = entry.folder;

    const openButton = document.createElement("button");
    openButton.type = "button";
    openButton.className = "portfolio-link";
    openButton.textContent = "Открыть папку";

    openButton.addEventListener("click", function (event) {
      event.stopPropagation();
      activeFolder = entry.folder;
      renderPortfolio();
    });

    article.addEventListener("click", function () {
      activeFolder = entry.folder;
      renderPortfolio();
    });

    meta.appendChild(folder);
    meta.appendChild(openButton);
    article.appendChild(chip);
    article.appendChild(preview);
    article.appendChild(meta);
    return article;
  }

  function renderTabs(visibleFolders) {
    if (!portfolioTabsRoot) {
      return;
    }

    portfolioTabsRoot.innerHTML = "";

    const tabAll = document.createElement("button");
    tabAll.type = "button";
    tabAll.className = "tab-btn" + (activeFolder === "all" ? " is-active" : "");
    tabAll.textContent = "Все папки";
    tabAll.setAttribute("data-folder", "all");
    portfolioTabsRoot.appendChild(tabAll);

    visibleFolders.forEach(function (entry) {
      const tab = document.createElement("button");
      tab.type = "button";
      tab.className = "tab-btn" + (activeFolder === entry.folder ? " is-active" : "");
      tab.textContent = entry.shortName || entry.folder;
      tab.title = entry.folder;
      tab.setAttribute("data-folder", entry.folder);
      portfolioTabsRoot.appendChild(tab);
    });

    tabButtons = portfolioTabsRoot.querySelectorAll(".tab-btn");
    tabButtons.forEach(function (tab) {
      tab.addEventListener("click", function () {
        activeFolder = tab.getAttribute("data-folder") || "all";
        renderPortfolio();
      });
    });
  }

  function renderPortfolio() {
    if (!portfolioItemsRoot) {
      return;
    }
    const visibleFolders = getFilteredFolders();
    if (
      activeFolder !== "all" &&
      !visibleFolders.some(function (entry) {
        return entry.folder === activeFolder;
      })
    ) {
      activeFolder = "all";
    }

    renderTabs(visibleFolders);
    portfolioItemsRoot.innerHTML = "";

    if (activeFolder === "all") {
      visibleFolders.forEach(function (entry) {
        portfolioItemsRoot.appendChild(createFolderCard(entry));
      });
      animateCardsIn();
      return;
    }

    const openedFolder = visibleFolders.find(function (entry) {
      return entry.folder === activeFolder;
    });
    if (!openedFolder) {
      return;
    }
    if (!openedFolder.files.length) {
      const placeholder = document.createElement("article");
      placeholder.className = "card portfolio-item-card";
      placeholder.innerHTML =
        '<div class="portfolio-meta"><span class="portfolio-folder">' +
        (openedFolder.shortName || openedFolder.folder) +
        '</span></div><div class="media-frame media-missing">Здесь пока нет загруженных файлов. Добавьте изображения или видео в папку раздела.</div>';
      portfolioItemsRoot.appendChild(placeholder);
      animateCardsIn();
      return;
    }
    openedFolder.files.forEach(function (fileName) {
      portfolioItemsRoot.appendChild(createMediaCard(openedFolder, fileName));
    });
    animateCardsIn();
  }

  if (filterButtons.length) {
    filterButtons.forEach(function (button) {
      button.addEventListener("click", function () {
        activeCategory = button.getAttribute("data-filter") || "all";
        activeFolder = "all";
        filterButtons.forEach(function (btn) {
          btn.classList.toggle("is-active", btn === button);
        });
        renderPortfolio();
      });
    });
  }

  renderPortfolio();

  const revealElements = document.querySelectorAll(".reveal");
  body.classList.add("js-ready");
  window.setTimeout(function () {
    revealElements.forEach(function (el) {
      el.classList.add("is-visible");
    });
  }, 700);
  if (!("IntersectionObserver" in window)) {
    revealElements.forEach(function (el) {
      el.classList.add("is-visible");
    });
  } else {
    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.2,
        rootMargin: "0px 0px -20px 0px"
      }
    );

    revealElements.forEach(function (el) {
      observer.observe(el);
    });
  }
})();
