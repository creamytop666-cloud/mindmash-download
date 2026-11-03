
"use strict";

// Paste your verified HTTPS APK download URL here.
// Example: a direct GitHub Releases asset URL.
const APK_DOWNLOAD_URL = "";
// Fill these in after generating your signed release APK.
// The checksum must be computed from the EXACT APK you publish.
const APK_VERSION = "";
const APK_SHA256 = "";

document.addEventListener("DOMContentLoaded", () => {
  const year = document.getElementById("year");
  const downloadButton = document.getElementById("apkDownload");
  const downloadStatus = document.getElementById("downloadStatus");

  if (year) year.textContent = new Date().getFullYear();
  const versionRow = document.getElementById("apkVersionRow");
  const versionText = document.getElementById("apkVersion");
  if (APK_VERSION.trim() && versionRow && versionText) {
    versionText.textContent = APK_VERSION;
    versionRow.hidden = false;
  }
  const checksumRow = document.getElementById("apkChecksumRow");
  const checksumText = document.getElementById("apkChecksum");
  if (/^[a-f0-9]{64}$/i.test(APK_SHA256.trim()) && checksumRow && checksumText) {
    checksumText.textContent = APK_SHA256.trim().toLowerCase();
    checksumRow.hidden = false;
    document.getElementById("copyChecksum")?.addEventListener("click", async () => {
      const status = document.getElementById("checksumCopyStatus");
      try {
        await navigator.clipboard.writeText(checksumText.textContent);
        if (status) status.textContent = "Copied!";
      } catch {
        if (status) status.textContent = "Select and copy the checksum manually.";
      }
    });
  }

  let validDownloadUrl = false;

  try {
    const url = new URL(APK_DOWNLOAD_URL);
    validDownloadUrl = url.protocol === "https:";
  } catch {
    validDownloadUrl = false;
  }

  if (validDownloadUrl) {
    downloadButton.href = APK_DOWNLOAD_URL;
    downloadButton.removeAttribute("aria-disabled");
    downloadStatus.textContent = "APK download is available.";
  } else {
    downloadButton.href = "#";
    downloadButton.setAttribute("aria-disabled", "true");
    downloadStatus.textContent =
      "Download will be available soon.";
  }

  downloadButton.addEventListener("click", (event) => {
    if (!validDownloadUrl) {
      event.preventDefault();
      downloadStatus.textContent =
        "The APK is not yet available. Please check back later.";
    }
  });
});


/* SCREENSHOT GALLERY */

document.addEventListener("DOMContentLoaded", () => {
  const track = document.getElementById("screenshotsTrack");
  const prev = document.getElementById("galleryPrev");
  const next = document.getElementById("galleryNext");

  const lightbox = document.getElementById("screenshotLightbox");
  const lightboxImage = document.getElementById("lightboxImage");
  const closeButton = document.getElementById("lightboxClose");

  if (!track || !prev || !next || !lightbox) return;

  function scrollGallery(direction) {
    const item = track.querySelector(".screenshot-item");
    if (!item) return;

    const gap = parseFloat(getComputedStyle(track).gap) || 0;
    const distance = item.getBoundingClientRect().width + gap;

    track.scrollBy({
      left: direction * distance,
      behavior: "smooth"
    });
  }

  prev.addEventListener("click", () => scrollGallery(-1));
  next.addEventListener("click", () => scrollGallery(1));

  let previousFocus = null;

  track.querySelectorAll(".screenshot-item img").forEach(img => {
    img.tabIndex = 0;
    img.setAttribute("role", "button");
    img.setAttribute("aria-label", "Enlarge " + img.alt);

    function openPreview() {
      previousFocus = document.activeElement;
      lightboxImage.src = img.src;
      lightboxImage.alt = img.alt;
      lightbox.hidden = false;
      document.body.style.overflow = "hidden";
      closeButton.focus();
    }

    img.addEventListener("click", openPreview);

    img.addEventListener("keydown", event => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        openPreview();
      }
    });
  });

  function closePreview() {
    lightbox.hidden = true;
    lightboxImage.removeAttribute("src");
    document.body.style.overflow = "";
    if (previousFocus) previousFocus.focus();
  }

  closeButton.addEventListener("click", closePreview);

  lightbox.addEventListener("click", event => {
    if (event.target === lightbox) closePreview();
  });

  document.addEventListener("keydown", event => {
    if (lightbox.hidden) return;

    if (event.key === "Escape") {
      closePreview();
    } else if (event.key === "Tab") {
      event.preventDefault();
      closeButton.focus();
    }
  });
});

