# mindmash-download
Official download website for Mind Mash, an interactive preschool educational Android game featuring word recognition, basic mathematics, and audio storytelling activities.


## Before launch
- Upload the tested, signed release APK to GitHub Releases. Do not commit your signing key or passwords.
- Set `APK_DOWNLOAD_URL`, `APK_VERSION`, and `APK_SHA256` in `script.js`. The download button stays disabled until a valid HTTPS URL is supplied.
- Compute SHA-256 from the exact APK you publish (`certutil -hashfile MindMash.apk SHA256` on Windows).
- Complete and review `privacy.html` before sharing the site publicly; it is a draft template, not a final policy.
- Test the signed APK and installation instructions on actual Android devices.
