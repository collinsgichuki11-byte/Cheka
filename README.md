# Cheka Frontend

😂 Cheka is a Kenyan social media platform for short funny videos — similar to TikTok.

## Live Web App

Deployed automatically to GitHub Pages on every push to `main`.  
Once enabled, it will be at: `https://collinsgichuki11-byte.github.io/Cheka/`

To enable GitHub Pages:
1. Go to repo **Settings → Pages**
2. Set Source to **GitHub Actions**
3. The `deploy-pages.yml` workflow handles the rest automatically

---

## Android APK

### Step 1 — Generate your signing keystore (one time only)

1. Go to **Actions → Generate Release Keystore (Run Once)**
2. Click **Run workflow**, fill in:
   - Key alias: `cheka-key`
   - Store password: *(choose a strong password and save it)*
   - Key password: *(choose a strong password and save it)*
   - Distinguished name: `CN=Cheka,O=Cheka,C=KE`
3. Once the workflow finishes, open the run logs
4. Copy the long base64 string printed between the `====` lines

### Step 2 — Save secrets to GitHub

Go to **Settings → Secrets and variables → Actions → New repository secret** and add:

| Secret name        | Value                                    |
|--------------------|------------------------------------------|
| `KEYSTORE_BASE64`  | The base64 string from Step 1            |
| `KEYSTORE_PASSWORD`| The store password you chose in Step 1  |
| `KEY_ALIAS`        | `cheka-key` (or whatever alias you used) |
| `KEY_PASSWORD`     | The key password you chose in Step 1    |

### Step 3 — Build your APK

Every push to `main` now automatically builds:
- **Debug APK** — always built, great for testing
- **Release APK** — built when signing secrets are set, ready for Play Store

Go to **Actions → Build APK → latest run → Artifacts** to download.

### Step 4 — Play Store submission

1. Download `cheka-release-apk` from the Actions artifacts
2. Go to [Google Play Console](https://play.google.com/console)
3. Create a new app → Upload the `.apk` under **Internal testing**
4. Fill in store listing, screenshots, and content rating
5. Promote to production when ready

---

## Backend

The backend runs at: `https://cheka-backend.onrender.com`

See the [Cheka-backend repo](https://github.com/collinsgichuki11-byte/Cheka-backend) for deployment details.

---

## Tech stack

- Vanilla HTML/CSS/JS PWA
- Capacitor 8 (Android wrapper)
- Backend: Express + MongoDB (hosted on Render)
