# OCBC Premier & Wealth Mobile App (App 2 Mobile)

A high-fidelity mobile banking application for **OCBC Premier Banking & Wealth Management**, integrated with **WSO2 Identity Server 7.3** for seamless OpenID Connect (OIDC) Single Sign-On (SSO) and Cross-App SSO with App 1 Mobile.

---

## 🚀 Quick Start

1. **Start the Development Server**:
   ```bash
   cd ocbc-mobile-demo-2
   npm run dev
   ```
   The application will run locally at: **`http://localhost:5177`**

2. **WSO2 Identity Server 7.3 Configuration**:
   In the WSO2 IS Console (`https://localhost:9443/console`):
   - Navigate to **Applications**
   - Open your registered SPA application (or create a dedicated one for Premier Mobile)
   - Add `http://localhost:5177` to **Authorized Redirect URLs**
   - Add `http://localhost:5177` to **Allowed Origins**
   - Click **Update**

---

## ⚡ Cross-App SSO Testing Flow

1. Open **App 1 Mobile** (`http://localhost:5175`) and log in with your WSO2 IS credentials.
2. Open this app, **App 2 Premier Mobile** (`http://localhost:5177`).
3. Tap **"Access OCBC Premier"**.
4. WSO2 IS automatically detects your existing active browser session and immediately authenticates you into the Premier Mobile dashboard — **zero username or password prompt required!**
