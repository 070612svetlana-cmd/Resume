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

  const portfolioItemsRoot = document.getElementById("portfolioItems");
  const portfolioTabsRoot = document.getElementById("portfolioTabs");
  const lightbox = document.getElementById("lightbox");
  const lightboxImage = document.getElementById("lightboxImage");
  const lightboxClose = document.getElementById("lightboxClose");
  const portfolioData = [
    {
      folder: "Логотипы, паттерны, иконки, брендбуки и иллюстрации в едином стиле",
      shortName: "Логотипы и бренд",
      category: "design",
      toneClass: "folder-brand",
      chip: "BRAND",
      type: "image",
      files: ["logo-01.png", "logo-02.png", "logo-03.png", "logo-04.png", "logo-05.png", "logo-06.png"]
    },
    {
      folder: "Нейровидение, ролики",
      shortName: "Нейровидео",
      category: "video",
      toneClass: "folder-video",
      chip: "VIDEO",
      type: "video",
      files: ["video-01.mp4", "video-02.mp4", "video-03.mp4", "video-04.mp4", "video-05.mp4", "video-06.mp4"]
    },
    {
      folder: "Нейроилюстрации, изображения",
      shortName: "Нейроиллюстрации",
      category: "design",
      toneClass: "folder-art",
      chip: "ART",
      type: "image",
      files: [
        "img-01.png", "img-02.png", "img-03.png", "img-04.png",
        "img-05.png", "img-06.png", "img-07.png", "img-08.png",
        "img-09.png", "img-10.png", "img-11.png", "img-12.png",
        "img-13.png", "img-14.png", "img-15.png", "img-16.png",
        "img-17.png", "img-18.png", "img-19.png", "img-20.png",
        "img-21.png", "img-22.png", "img-23.png", "img-24.png",
        "img-25.png", "img-26.png", "img-27.png", "img-28.png",
        "img-29.png", "img-30.png", "img-31.png", "img-32.png",
        "img-33.png", "img-34.png", "img-35.png"
      ]
    },
    {
      folder: "Разукрашки для детей",
      shortName: "Разукрашки",
      category: "kids",
      toneClass: "folder-kids",
      chip: "KIDS",
      type: "image",
      files: [
        "kids-01.png", "kids-02.png", "kids-03.png", "kids-04.png", "kids-05.png",
        "kids-06.png", "kids-07.png", "kids-08.png", "kids-09.png",
        "ulchela_Robot_cars_coloring_monochrome_line_art_crisp_ink_lines_134ddb1d-fb4a-413a-af0c-6ba9ce43f595.png",
        "ulchela_Robot_cars_coloring_monochrome_line_art_crisp_ink_lines_1d5a3ba5-5955-4203-ae5b-6a83c7b1b93a.png",
        "ulchela_Robot_cars_coloring_monochrome_line_art_crisp_ink_lines_2b03e1b2-8f84-4cd0-a663-4cd3fd453a78.png",
        "ulchela_Robot_cars_coloring_monochrome_line_art_crisp_ink_lines_6670d8aa-4526-4873-83e3-aff8dc786a2f.png",
        "ulchela_Robot_cars_coloring_monochrome_line_art_crisp_ink_lines_ecd46928-8cf0-4483-ae60-b214056a5242.png",
        "ulchela_Squishy_-_cups_coloring_style_very_simple_cute_style_cl_3a861602-4fae-483e-bf38-9c6c9229bd5f.png",
        "ulchela_Squishy_-_cups_coloring_style_very_simple_cute_style_cl_8afe8029-2026-4fe4-a8e1-db371ce8501e.png",
        "ulchela_Squishy_-_cups_coloring_style_very_simple_cute_style_cl_c4eb360f-dae8-41eb-8ebb-64ce640b00ad.png",
        "ulchela_Squishy_different_images_with_big_eyes_coloring_style_v_38cdcf30-802b-4ad0-b4b8-abb67ac6c2a2.png"
      ]
    },
    {
      folder: "Ретушь и восстановление старых фотографий",
      shortName: "Ретушь фото",
      category: "photo",
      toneClass: "folder-restore",
      chip: "RESTORE",
      type: "image",
      files: ["restore-01.png", "restore-02.png", "restore-03.png", "restore-04.png", "restore-05.png", "restore-06.png", "restore-07.png", "restore-08.png"]
    },
    {
      folder: "Сайты Лендинги",
      shortName: "Сайты и лендинги",
      category: "web",
      toneClass: "folder-web",
      chip: "WEB",
      type: "document",
      externalUrl: "https://070612svetlana-cmd.github.io/quiet-harbor-menu/",
      files: ["quiet-harbor-menu.url"]
    },
    {
      folder: "GPT-агенты и AI-боты",
      shortName: "GPT и AI-боты",
      category: "ai",
      toneClass: "folder-ai",
      chip: "AI",
      type: "document",
      files: ["README.md"]
    }
  ];

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
