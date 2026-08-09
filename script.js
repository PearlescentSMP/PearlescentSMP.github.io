// js/script.js

// 1. Initialize Configuration Data
document.addEventListener('DOMContentLoaded', () => {
    // Populate text from CONFIG
    document.getElementById('nav-server-name').innerText = CONFIG.serverName;
    document.getElementById('hero-title').innerText = CONFIG.serverName;
    document.getElementById('hero-desc').innerText = CONFIG.shortDescription;
    document.getElementById('display-ip').innerText = CONFIG.serverIP;
    document.getElementById('display-version').innerText = CONFIG.mcVersion;
    document.getElementById('footer-name').innerText = CONFIG.serverName;
    
    // Populate Links
    document.getElementById('discord-link').href = CONFIG.discordInvite;
    document.getElementById('kofi-link').href = CONFIG.kofiUrl;

    // Fetch dynamic data from mock API endpoints
    fetchServerStatus();
    fetchStaffData();
});

// 2. Mobile Navigation Toggle
document.getElementById('hamburger').addEventListener('click', () => {
    document.getElementById('nav-links').classList.toggle('active');
});

// 3. Copy IP Functionality
function copyIP() {
    navigator.clipboard.writeText(CONFIG.serverIP).then(() => {
        const toast = document.getElementById('ip-toast');
        toast.style.opacity = 1;
        setTimeout(() => { toast.style.opacity = 0; }, 2000);
    });
}

// ==========================================
// API INTEGRATION PLACEHOLDERS
// When your Discord bot is ready, replace the 
// mock data below with actual fetch() requests.
// ==========================================

// 4. Fetch Server Status
async function fetchServerStatus() {
    try {
        /* // FUTURE IMPLEMENTATION:
        const response = await fetch(CONFIG.api.status);
        const data = await response.json();
        */
        
        // MOCK DATA (Simulating Bot response)
        const data = {
            online: true,
            players: 24,
            maxPlayers: 100
        };

        const dot = document.getElementById('status-dot');
        const text = document.getElementById('status-text');
        const count = document.getElementById('player-count');

        if (data.online) {
            dot.classList.add('online');
            dot.classList.remove('offline');
            text.innerText = "Online";
            count.innerText = `${data.players} / ${data.maxPlayers}`;
        } else {
            dot.classList.add('offline');
            dot.classList.remove('online');
            text.innerText = "Offline";
            count.innerText = "0 / 0";
        }
    } catch (error) {
        console.error("Error fetching server status:", error);
    }
}

// 5. Fetch Staff Data
async function fetchStaffData() {
    try {
        /*
        // FUTURE IMPLEMENTATION:
        const response = await fetch(CONFIG.api.staff);
        const data = await response.json();
        */
        
        // MOCK DATA (Simulating Bot response format you requested)
        const data = {
            owner: [{ username: "Notch", avatar: "https://mc-heads.net/avatar/Notch/80" }],
            provider: [{ username: "HostAdmin", avatar: "https://mc-heads.net/avatar/Steve/80" }],
            staff: [
                { username: "ModAlex", avatar: "https://mc-heads.net/avatar/Alex/80" },
                { username: "HelperDan", avatar: "https://mc-heads.net/avatar/DanTDM/80" }
            ]
        };

        const container = document.getElementById('staff-container');
        container.innerHTML = ""; // Clear loader

        // Helper function to build staff cards
        const createCard = (user, roleClass, roleName) => `
            <div class="staff-card">
                <img src="${user.avatar}" alt="${user.username}" class="staff-avatar">
                <h3>${user.username}</h3>
                <p class="${roleClass}">${roleName}</p>
            </div>
        `;

        data.owner.forEach(u => container.innerHTML += createCard(u, 'role-owner', 'Owner'));
        data.provider.forEach(u => container.innerHTML += createCard(u, 'role-provider', 'Provider'));
        data.staff.forEach(u => container.innerHTML += createCard(u, 'role-staff', 'Staff'));

    } catch (error) {
        console.error("Error fetching staff:", error);
        document.getElementById('staff-container').innerHTML = "<p>Could not load staff data.</p>";
    }
}

// 6. Application System (OAuth Mock)
function mockDiscordLogin() {
    /*
    // FUTURE IMPLEMENTATION:
    // Redirect user to Discord OAuth URL:
    // window.location.href = `https://discord.com/api/oauth2/authorize?client_id=${CONFIG.oauth.clientId}&redirect_uri=${CONFIG.oauth.redirectUri}&response_type=code&scope=identify`;
    */
    
    // MOCK LOGIN FLOW
    document.getElementById('auth-section').classList.add('hidden');
    document.getElementById('app-form').classList.remove('hidden');
}

function submitApplication() {
    const text = document.querySelector('#app-form textarea').value;
    if(text.trim() === "") return alert("Please fill out the application.");

    /*
    // FUTURE IMPLEMENTATION:
    // POST request to your Discord Bot/API containing the user's OAuth token and application text.
    */

    alert("Application successfully sent to the Discord moderation team!");
    document.querySelector('#app-form textarea').value = "";
    
    // Reset form for demo
    document.getElementById('auth-section').classList.remove('hidden');
    document.getElementById('app-form').classList.add('hidden');
}
