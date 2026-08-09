/* ======================================================
   CONFIG
====================================================== */
const CONFIG = {
  serverName: "Pearlescent SMP",
  minecraftIp: "play.example.com", // Replace with your IP
  minecraftVersion: "1.21.x",
  defaultMaxPlayers: 100,
  
  links: {
    discordInvite: "https://discord.gg/example",
    applyOAuth: "https://discord.com/oauth2/authorize?client_id=YOUR_CLIENT_ID...",
    kofi: "https://ko-fi.com/YOUR_KOFI_HANDLE"
  }
};

/* ======================================================
   INITIALIZATION
====================================================== */
document.addEventListener("DOMContentLoaded", () => {
  // Populate static fields & links
  document.getElementById("card-ip").textContent = CONFIG.minecraftIp;
  document.getElementById("card-version").textContent = CONFIG.minecraftVersion;
  document.getElementById("year").textContent = new Date().getFullYear();

  document.getElementById("nav-discord-link").href = CONFIG.links.discordInvite;
  document.getElementById("apply-oauth-link").href = CONFIG.links.applyOAuth;
  document.getElementById("kofi-link").href = CONFIG.links.kofi;

  // Initialize features
  fetchServerStatus();
  setupCopyIp();
});

/* ======================================================
   LIVE MINECRAFT STATUS
====================================================== */
async function fetchServerStatus() {
  const badge = document.getElementById("status-badge");
  const statusText = document.getElementById("status-text");
  const playersText = document.getElementById("card-players");

  try {
    const res = await fetch(`https://api.mcsrvstat.us/3/${CONFIG.minecraftIp}`);
    const data = await res.json();

    if (data.online) {
      badge.className = "status-indicator online";
      statusText.textContent = "ONLINE";
      playersText.textContent = `${data.players.online} / ${data.players.max}`;
    } else {
      setOffline();
    }
  } catch (err) {
    setOffline();
  }

  function setOffline() {
    badge.className = "status-indicator offline";
    statusText.textContent = "OFFLINE";
    playersText.textContent = `0 / ${CONFIG.defaultMaxPlayers}`;
  }
}

/* ======================================================
   COPY IP ACTION
====================================================== */
function setupCopyIp() {
  const btn = document.getElementById("copy-ip-btn");
  const label = document.getElementById("btn-label");

  btn.addEventListener("click", () => {
    navigator.clipboard.writeText(CONFIG.minecraftIp).then(() => {
      const originalText = label.textContent;
      label.textContent = "IP COPIED!";

      setTimeout(() => {
        label.textContent = originalText;
      }, 2000);
    });
  });
}
