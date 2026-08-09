/* ======================================================
   ADMIN CONFIGURATION
   Change server settings & links here easily!
====================================================== */
const CONFIG = {
  serverName: "Pearlescent SMP",
  minecraftIp: "play.example.com", // Change to your server IP
  minecraftVersion: "1.21.x",
  maxPlayers: 100,
  description: "A community-driven Minecraft Survival Multiplayer server.",
  
  links: {
    discordInvite: "https://discord.gg/example", // Discord server invite
    applyOAuth: "https://discord.com/oauth2/authorize?client_id=YOUR_CLIENT_ID...", // Discord Bot link
    kofiDonate: "https://ko-fi.com/YOUR_KOFI_HANDLE", // Ko-fi support link
  }
};

/* ======================================================
   INITIALIZE WEBSITE
====================================================== */
document.addEventListener("DOMContentLoaded", () => {
  // Set Text Content from Config
  document.getElementById("server-desc").textContent = CONFIG.description;
  document.getElementById("ip-display").textContent = CONFIG.minecraftIp;
  document.getElementById("card-ip").textContent = CONFIG.minecraftIp;
  document.getElementById("card-version").textContent = CONFIG.minecraftVersion;
  document.getElementById("year").textContent = new Date().getFullYear();

  // Set Links
  document.getElementById("hero-discord-link").href = CONFIG.links.discordInvite;
  document.getElementById("section-discord-link").href = CONFIG.links.discordInvite;
  document.getElementById("footer-discord-link").href = CONFIG.links.discordInvite;
  document.getElementById("apply-oauth-link").href = CONFIG.links.applyOAuth;
  document.getElementById("kofi-store-link").href = CONFIG.links.kofiDonate;

  // Initialize Functions
  fetchServerStatus();
  setupCopyIpButton();
  setupMobileMenu();
});

/* ======================================================
   FETCH MINECRAFT STATUS (Public Client API)
====================================================== */
async function fetchServerStatus() {
  const badge = document.getElementById("status-badge");
  const statusText = document.getElementById("status-text");
  const playersText = document.getElementById("card-players");

  try {
    const response = await fetch(`https://api.mcsrvstat.us/3/${CONFIG.minecraftIp}`);
    const data = await response.json();

    if (data.online) {
      badge.className = "badge badge-online";
      statusText.textContent = "ONLINE";
      playersText.textContent = `${data.players.online} / ${data.players.max}`;
    } else {
      setOffline();
    }
  } catch (error) {
    setOffline();
  }

  function setOffline() {
    badge.className = "badge badge-offline";
    statusText.textContent = "OFFLINE";
    playersText.textContent = `0 / ${CONFIG.maxPlayers}`;
  }
}

/* ======================================================
   COPY IP BUTTON
====================================================== */
function setupCopyIpButton() {
  const copyBtn = document.getElementById("copy-ip-btn");
  const ipSubtext = document.getElementById("ip-display");

  copyBtn.addEventListener("click", () => {
    navigator.clipboard.writeText(CONFIG.minecraftIp).then(() => {
      const originalText = ipSubtext.textContent;
      ipSubtext.textContent = "COPIED TO CLIPBOARD!";
      ipSubtext.style.color = "#4ade80";

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
