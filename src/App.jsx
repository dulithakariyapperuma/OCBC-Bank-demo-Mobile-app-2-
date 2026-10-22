import { useEffect, useState } from "react";
import { useAuthContext } from "@asgardeo/auth-react";

/* ── Premier Quick Actions (Pre-login) ── */
const PREMIER_QUICK_ACTIONS = [
  { id: "wealth-insights", icon: <InsightsIcon />, label: "Wealth Outlook" },
  { id: "fx-treasury",     icon: <FxIcon />,       label: "Global FX" },
  { id: "rm-connect",      icon: <AdvisorIcon />,  label: "Private RM" },
  { id: "lounge-pass",     icon: <CrownIcon />,    label: "Lounge Pass" },
  { id: "onetoken",        icon: <TokenIcon />,    label: "OneToken" },
  { id: "more",            icon: <MoreIcon />,     label: "Services" },
];

/* ── Premier Dashboard Tabs ── */
const TABS = ["Portfolio", "Holdings", "Private Advisory", "SSO Session"];

export default function App() {
  const { state, signIn, signOut, getBasicUserInfo, getDecodedIDToken } = useAuthContext();
  const [userInfo, setUserInfo] = useState(null);
  const [decodedToken, setDecodedToken] = useState(null);
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    if (state.isAuthenticated) {
      getBasicUserInfo()
        .then(setUserInfo)
        .catch(() => {});
      if (getDecodedIDToken) {
        getDecodedIDToken()
          .then(setDecodedToken)
          .catch(() => {});
      }
    }
  }, [state.isAuthenticated, getBasicUserInfo, getDecodedIDToken]);

  if (state.isLoading) return <Splash />;

  return (
    <div className="phone-wrap">
      <div className="phone">
        {/* Dynamic Island / Notch */}
        <div className="notch">
          <div className="notch-camera" />
          <div className="notch-speaker" />
        </div>

        {state.isAuthenticated ? (
          <Dashboard
            userInfo={userInfo}
            decodedToken={decodedToken}
            signOut={signOut}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
        ) : (
          <Landing signIn={signIn} />
        )}
      </div>
    </div>
  );
}

/* ════════════════════════════════════
   LANDING SCREEN (Pre-login)
════════════════════════════════════ */
function Landing({ signIn }) {
  return (
    <div className="screen landing">
      {/* Status Bar */}
      <div className="status-bar">
        <span className="status-time">09:41</span>
        <div className="status-icons">
          <SignalIcon />
          <WifiIcon />
          <BatteryIcon />
        </div>
      </div>

      {/* Top Header */}
      <div className="landing-topbar">
        <div className="premier-crest">
          <CrownIcon />
          <span>PREMIER</span>
        </div>
        <div className="topbar-right">
          <span className="lang-tag">EN</span>
          <a
            href="http://localhost:5175"
            target="_blank"
            rel="noreferrer"
            className="switch-app-badge"
            title="Open App 1 Retail Mobile"
          >
            App 1 (:5175) ↗
          </a>
        </div>
      </div>

      {/* Hero Visual */}
      <div className="hero-wrap">
        <div className="gold-accent-line" />
        <div className="hero-content">
          <div className="hero-emblem">
            <svg width="44" height="44" viewBox="0 0 48 48" fill="none">
              <rect width="48" height="48" rx="14" fill="#C8102E" />
              <text x="8" y="34" fontFamily="Georgia, serif" fontSize="22" fontWeight="bold" fill="#fff">
                OCBC
              </text>
            </svg>
          </div>
          <span className="hero-tier">PRIVATE CLIENT & WEALTH</span>
          <h1 className="hero-title">Exclusive Banking, Engineered for You</h1>
          <p className="hero-desc">
            Seamless cross-application SSO powered by WSO2 Identity Server 7.3.
          </p>
        </div>
      </div>

      {/* Cross-App SSO Notice */}
      <div className="sso-notice">
        <div className="sso-notice-icon">⚡</div>
        <div className="sso-notice-text">
          <strong>Cross-App SSO Active:</strong> Already signed in to App 1? Tap below for instant authentication without re-entering credentials!
        </div>
      </div>

      {/* Quick Actions Grid */}
      <div className="quick-grid">
        {PREMIER_QUICK_ACTIONS.map((a) => (
          <button key={a.id} className="qa-btn" id={a.id}>
            <span className="qa-icon">{a.icon}</span>
            <span className="qa-label">{a.label}</span>
          </button>
        ))}
      </div>

      {/* Login Button Bar */}
      <div className="login-bar">
        <button id="login-btn" className="premier-login-btn" onClick={() => signIn()}>
          <span className="btn-icon">
            <KeyIcon />
          </span>
          <span>Access OCBC Premier</span>
        </button>
        <p className="login-footer">Protected by WSO2 IS 7.3 • OIDC + PKCE</p>
      </div>
    </div>
  );
}

/* ════════════════════════════════════
   DASHBOARD SCREEN (Post-login)
════════════════════════════════════ */
function Dashboard({ userInfo, decodedToken, signOut, activeTab, setActiveTab }) {
  const name = userInfo?.givenName || userInfo?.displayName || userInfo?.username || "Premier Client";
  const email = userInfo?.email || decodedToken?.email || "premier@ocbc.com";

  return (
    <div className="screen dash-screen">
      {/* Status Bar */}
      <div className="status-bar status-bar--dark">
        <span className="status-time">09:41</span>
        <div className="status-icons">
          <SignalIcon />
          <WifiIcon />
          <BatteryIcon />
        </div>
      </div>

      {/* Top Bar */}
      <div className="dash-topbar">
        <div className="dash-brand">
          <span className="dash-ocbc">OCBC</span>
          <span className="dash-tier-badge">PREMIER</span>
        </div>
        <div className="dash-top-actions">
          <span className="sso-active-dot" title="WSO2 IS SSO Session Active" />
          <button id="logout-btn" className="dash-logout-btn" onClick={() => signOut()}>
            Sign Out
          </button>
        </div>
      </div>

      {/* Scrollable Dashboard Body */}
      <div className="dash-scroll">
        {/* Welcome Card */}
        <div className="dash-header-card">
          <div className="avatar-wrap">
            <div className="dash-avatar">{name.charAt(0).toUpperCase()}</div>
            <div className="crown-badge"><CrownIcon /></div>
          </div>
          <div className="dash-welcome-text">
            <span className="dash-greeting-label">PREMIER PRIVATE CLIENT</span>
            <h2 className="dash-client-name">{name}</h2>
            <p className="dash-client-id">{email}</p>
          </div>
        </div>

        {/* Total Wealth Portfolio Card */}
        <div className="portfolio-card">
          <div className="portfolio-header">
            <div>
              <span className="portfolio-label">Total Assets Under Management (AUM)</span>
              <div className="portfolio-amount">
                <span className="curr">SGD</span> 2,845,900<span className="cents">.00</span>
              </div>
            </div>
            <span className="portfolio-perf-pill">+2.4% MoM</span>
          </div>

          {/* Asset Allocation Bar */}
          <div className="alloc-bar-wrap">
            <div className="alloc-bar">
              <div className="bar-seg bar-eq" style={{ width: "45%" }} title="Equities 45%" />
              <div className="bar-seg bar-fi" style={{ width: "30%" }} title="Fixed Income 30%" />
              <div className="bar-seg bar-re" style={{ width: "15%" }} title="Real Estate REITs 15%" />
              <div className="bar-seg bar-cs" style={{ width: "10%" }} title="Liquidity & FX 10%" />
            </div>
            <div className="alloc-legend">
              <span className="leg-item"><span className="dot dot-eq" />Equities 45%</span>
              <span className="leg-item"><span className="dot dot-fi" />Bonds 30%</span>
              <span className="leg-item"><span className="dot dot-re" />REITs 15%</span>
              <span className="leg-item"><span className="dot dot-cs" />Cash 10%</span>
            </div>
          </div>
        </div>

        {/* Dedicated Relationship Manager Card */}
        <div className="rm-card">
          <div className="rm-avatar">SV</div>
          <div className="rm-info">
            <span className="rm-tag">YOUR PRIVATE BANKER</span>
            <span className="rm-name">Sarah Vance</span>
            <span className="rm-desc">Executive Director • OCBC Wealth Advisory</span>
          </div>
          <button className="rm-action-btn" title="Contact RM">
            <PhoneIcon />
          </button>
        </div>

        {/* Tabs Row */}
        <div className="tabs-row">
          {TABS.map((t, i) => (
            <button
              key={t}
              id={`tab-${t.toLowerCase().replace(/\s+/g, "-")}`}
              className={`tab-pill ${activeTab === i ? "tab-pill--active" : ""}`}
              onClick={() => setActiveTab(i)}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Tab 0: Portfolio Overview */}
        {activeTab === 0 && (
          <div className="tab-pane">
            <div className="asset-card">
              <div className="asset-header">
                <div className="asset-title-group">
                  <span className="asset-tag">GLOBAL WEALTH ACCOUNT</span>
                  <span className="asset-name">Premier Multi-Currency Portfolio</span>
                  <span className="asset-num">Acc: 888-293849-001</span>
                </div>
                <div className="asset-badge-tier">SGD & USD</div>
              </div>
              <div className="asset-stats-grid">
                <div className="stat-box">
                  <span className="stat-lbl">Investable Cash</span>
                  <span className="stat-val">SGD 284,590.00</span>
                </div>
                <div className="stat-box">
                  <span className="stat-lbl">Unrealized Gain</span>
                  <span className="stat-val stat-val--green">+SGD 84,120.00</span>
                </div>
              </div>
            </div>

            <div className="quick-actions-bar">
              <button className="qaction-btn">
                <ExchangeIcon />
                <span>FX Trade</span>
              </button>
              <button className="qaction-btn">
                <InvestIcon />
                <span>Invest</span>
              </button>
              <button className="qaction-btn">
                <RemitIcon />
                <span>Remit</span>
              </button>
              <button className="qaction-btn">
                <DocIcon />
                <span>Statements</span>
              </button>
            </div>
          </div>
        )}

        {/* Tab 1: Holdings */}
        {activeTab === 1 && (
          <div className="tab-pane">
            <div className="holding-item">
              <div className="holding-icon eq-icon">EQ</div>
              <div className="holding-details">
                <span className="holding-name">OCBC Global Technology Leaders</span>
                <span className="holding-qty">4,500 Units • SGD 182.40</span>
              </div>
              <div className="holding-val">
                <span className="val-main">SGD 820,800</span>
                <span className="val-change green">+4.2%</span>
              </div>
            </div>

            <div className="holding-item">
              <div className="holding-icon fi-icon">BD</div>
              <div className="holding-details">
                <span className="holding-name">Singapore Government Bonds 2035</span>
                <span className="holding-qty">Yield: 3.45% p.a.</span>
              </div>
              <div className="holding-val">
                <span className="val-main">SGD 500,000</span>
                <span className="val-change green">+1.1%</span>
              </div>
            </div>

            <div className="holding-item">
              <div className="holding-icon gd-icon">AU</div>
              <div className="holding-details">
                <span className="holding-name">Physical Gold Vault Certificate</span>
                <span className="holding-qty">500 oz Allocated</span>
              </div>
              <div className="holding-val">
                <span className="val-main">USD 1,320,000</span>
                <span className="val-change green">+8.6%</span>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Advisory */}
        {activeTab === 2 && (
          <div className="tab-pane">
            <div className="advisory-card">
              <span className="advisory-kicker">CHIEF INVESTMENT OFFICE (CIO)</span>
              <h3 className="advisory-heading">Global Macro Strategy Q4: Navigating Rate Pivots</h3>
              <p className="advisory-summary">
                Recommended overweight allocations in defensive high-yield quality credit and Southeast Asian renewable infrastructure.
              </p>
              <button className="advisory-read-btn">Read Full Briefing ↗</button>
            </div>
          </div>
        )}

        {/* Tab 3: SSO Session */}
        {activeTab === 3 && (
          <div className="tab-pane">
            <div className="sso-diag-card">
              <div className="sso-diag-header">
                <span className="sso-diag-icon">🛡️</span>
                <div>
                  <h4 className="sso-diag-title">WSO2 IS 7.3 SSO Session</h4>
                  <p className="sso-diag-sub">Shared Single Sign-On Context</p>
                </div>
              </div>

              <div className="diag-row">
                <span className="diag-key">Provider:</span>
                <span className="diag-val">WSO2 Identity Server 7.3</span>
              </div>
              <div className="diag-row">
                <span className="diag-key">Subject (sub):</span>
                <span className="diag-val mono">{decodedToken?.sub || "WSO2-USER-001"}</span>
              </div>
              <div className="diag-row">
                <span className="diag-key">Token Flow:</span>
                <span className="diag-val">OIDC Authorization Code + PKCE</span>
              </div>
              <div className="diag-row">
                <span className="diag-key">Cross-App SSO:</span>
                <span className="diag-val active-green">Active with Port 5175 & 5173</span>
              </div>
            </div>
          </div>
        )}

        {/* Bottom Switch Links */}
        <div className="bottom-links">
          <span>Other OCBC SSO Demo Apps:</span>
          <div className="links-group">
            <a href="http://localhost:5175" target="_blank" rel="noreferrer" className="alt-link">
              App 1 Mobile (:5175) ↗
            </a>
            <a href="http://localhost:5173" target="_blank" rel="noreferrer" className="alt-link">
              App 1 Retail Portal (:5173) ↗
            </a>
            <a href="http://localhost:5176" target="_blank" rel="noreferrer" className="alt-link">
              App 2 Premier Portal (:5176) ↗
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Splash Loading Screen ── */
function Splash() {
  return (
    <div className="phone-wrap">
      <div className="phone splash">
        <div className="splash-emblem">
          <CrownIcon />
        </div>
        <span className="splash-title">OCBC PREMIER</span>
        <p className="splash-sub">Authenticating via WSO2 IS 7.3…</p>
        <div className="splash-spinner" />
      </div>
    </div>
  );
}

/* ════════════ SVG Icons ════════════ */
function CrownIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
      <path d="M2 4l3 12h14l3-12-6 7-4-7-4 7-6-7zm3 16h14v2H5v-2z" fill="currentColor" fillOpacity="0.15" />
    </svg>
  );
}
function KeyIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
      <circle cx="7.5" cy="15.5" r="5.5" />
      <path d="m21 2-9.6 9.6M15.5 7.5l3 3M18.5 4.5l3 3" />
    </svg>
  );
}
function InsightsIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 3v18h18M7 16l4-5 4 3 6-7" />
    </svg>
  );
}
function FxIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <path d="M12 6v12M16 10H9a3 3 0 0 0 0 6h6" />
    </svg>
  );
}
function AdvisorIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}
function TokenIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="7" y="2" width="10" height="20" rx="2" />
      <path d="M11 18h2" />
    </svg>
  );
}
function MoreIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="1" />
      <circle cx="19" cy="12" r="1" />
      <circle cx="5" cy="12" r="1" />
    </svg>
  );
}
function SignalIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14">
      <rect x="2" y="16" width="3" height="5" rx="0.5" />
      <rect x="7" y="12" width="3" height="9" rx="0.5" />
      <rect x="12" y="8" width="3" height="13" rx="0.5" />
      <rect x="17" y="4" width="3" height="17" rx="0.5" />
    </svg>
  );
}
function WifiIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" width="14" height="14">
      <path d="M5 12.55a11 11 0 0 1 14.08 0M1.42 9a16 16 0 0 1 21.16 0M8.53 16.11a6 6 0 0 1 6.95 0M12 20h.01" />
    </svg>
  );
}
function BatteryIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="16" height="16">
      <rect x="2" y="7" width="18" height="10" rx="2" />
      <path d="M22 11v2" />
      <rect x="4" y="9" width="12" height="6" rx="1" fill="currentColor" />
    </svg>
  );
}
function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="16" height="16">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}
function ExchangeIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="16" height="16">
      <path d="M7 10h14l-4-4M17 14H3l4 4" />
    </svg>
  );
}
function InvestIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="16" height="16">
      <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
    </svg>
  );
}
function RemitIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="16" height="16">
      <line x1="22" y1="2" x2="11" y2="13" />
      <polygon points="22 2 15 22 11 13 2 9 22 2" />
    </svg>
  );
}
function DocIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="16" height="16">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
    </svg>
  );
}
