/* ======================================================
   ADMIN-FRIENDLY CONFIGURATION
   Change your server info, IP, and links here!
====================================================== */
const CONFIG = {
  serverName: "Pearlescent SMP",
  minecraftIp: "136.243.150.30:60460", // Replace with your real IP or domain
  defaultMaxPlayers: 100,
  description: "A vibrant, community-driven Minecraft Survival Multiplayer experience.",
  
  links: {
    discordInvite: "https://discord.gg/example", // Replace with your Discord invite
    applyOAuth: "https://discord.com/oauth2/authorize?client_id=YOUR_CLIENT_ID...", // Your Bot / OAuth link
    kofiStore: "https://ko-fi.com/YOUR_KOFI_USERNAME", // Your Ko-fi donation link
  }
};

/* ======================================================
   INITIALIZE & POPULATE UI
====================================================== */
document.addEventListener("DOMContentLoaded", () => {
  // Populate text elements from Config
  document.getElementById("server-desc").textContent = CONFIG.description;
  document.getElementById("ip-display").textContent = CONFIG.minecraftIp;
  document.getElementById("card-ip").textContent = CONFIG.minecraftIp;
  document.getElementById("year").textContent = new Date().getFullYear();

  // Attach Config Links to HTML Elements
  document.getElementById("hero-discord-link").href = CONFIG.links.discordInvite;
  document.getElementById("section-discord-link").href = CONFIG.links.discordInvite;
  document.getElementById("footer-discord-link").href = CONFIG.links.discordInvite;
  document.getElementById("apply-oauth-link").href = CONFIG.links.applyOAuth;
  document.getElementById("store-link-kofi").href = CONFIG.links.kofiStore;

  // Fetch Live Minecraft Server Status securely over HTTPS
  fetchServerStatus();

  // Setup Copy IP Logic
  setupCopyIpButton();

  // Mobile Hamburger Menu
  setupMobileMenu();
});

/* ======================================================
   FETCH MINECRAFT STATUS (Secure HTTPS Public API)
====================================================== */
async function fetchServerStatus() {
  const badge = document.getElementById("status-badge");
  const statusText = document.getElementById("status-text");
  const playersText = document.getElementById("card-players");
  const versionText = document.getElementById("card-version");

  try {
    // Uses HTTPS endpoint to bypass browser mixed-content security blocks
    const response = await fetch(`https://api.mcsrvstat.us/3/${CONFIG.minecraftIp}`);
    const data = await response.json();

    if (data.online) {
      badge.className = "badge badge-online";
      statusText.textContent = "Online";
      playersText.textContent = `${data.players.online} / ${data.players.max}`;
      if (versionText && data.version) {
        versionText.textContent = data.version;
      }
    } else {
      setOfflineState();
    }
  } catch (error) {
    setOfflineState();
  }

  function setOfflineState() {
    badge.className = "badge badge-offline";
    statusText.textContent = "Offline";
    playersText.textContent = `0 / ${CONFIG.defaultMaxPlayers}`;
  }
}

/* ======================================================
   CLICK TO COPY IP
====================================================== */
function setupCopyIpButton() {
  const copyBtn = document.getElementById("copy-ip-btn");
  const ipSubtext = document.getElementById("ip-display");

  copyBtn.addEventListener("click", () => {
    navigator.clipboard.writeText(CONFIG.minecraftIp).then(() => {
      const originalText = ipSubtext.textContent;
      ipSubtext.textContent = "IP Copied to Clipboard!";
      ipSubtext.style.color = "#e0aaff";

      setTimeout(() => {
        ipSubtext.textContent = originalText;
        ipSubtext.style.color = "";
      }, 2000);
    });
  });
}

/* ======================================================
   MOBILE MENU TOGGLE
====================================================== */
function setupMobileMenu() {
  const btn = document.getElementById("hamburger-btn");
  const nav = document.getElementById("nav-links");

  btn.addEventListener("click", () => {
    nav.classList.toggle("active");
  });
}
