/**
 * WSO2 Identity Server 7.3 - Authentication Configuration
 * OCBC Premier & Wealth Mobile App (App 2 Mobile)
 *
 * Running on: http://localhost:5177
 *
 * For Cross-App Mobile SSO with App 1 (ocbc-mobile-demo on http://localhost:5175):
 * In WSO2 IS Console (https://localhost:9443/console) -> Applications:
 * Add http://localhost:5177 to the Authorized Redirect URLs & Allowed Origins.
 */

const authConfig = {
  // ─── Client ID from WSO2 IS Console ───
  clientID: "GHcb9xQJmiK64BIorJ52ViIyr38a",

  // ─── WSO2 IS 7.3 base URL ───
  baseUrl: "https://localhost:9443",

  // ─── Redirect URLs (Port 5177 for local, or Vercel URL for production) ───
  signInRedirectURL: window.location.origin,
  signOutRedirectURL: window.location.origin,

  // ─── OIDC Scopes requested ───
  scope: ["openid", "profile", "email"],

  // ─── Token storage strategy ───
  storage: "sessionStorage",
};

export default authConfig;
