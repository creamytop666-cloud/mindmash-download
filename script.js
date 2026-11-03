
"use strict";

// Paste your verified HTTPS APK download URL here.
// Example: a direct GitHub Releases asset URL.
const APK_DOWNLOAD_URL = "";

document.addEventListener("DOMContentLoaded", () => {
  const year = document.getElementById("year");
  const downloadButton = document.getElementById("apkDownload");
  const downloadStatus = document.getElementById("downloadStatus");

  year.textContent = new Date().getFullYear();

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
