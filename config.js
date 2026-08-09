// js/config.js
const CONFIG = {
    // Server Details
    serverName: "VanillaCraft",
    serverIP: "play.vanillacraft.net",
    mcVersion: "1.21.x",
    shortDescription: "A pure, atmospheric vanilla survival experience.",
    
    // External Links
    discordInvite: "https://discord.gg/your-invite",
    kofiUrl: "https://ko-fi.com/your-kofi",
    
    // API Endpoints (Point these to your Discord Bot's API later)
    api: {
        status: "/mock/status",       // Replace with: https://api.yoursite.com/status
        staff: "/mock/staff",         // Replace with: https://api.yoursite.com/staff
        application: "/mock/apply"    // Replace with: https://api.yoursite.com/apply
    },

    // Discord OAuth (For applications)
    oauth: {
        clientId: "YOUR_DISCORD_CLIENT_ID",
        redirectUri: "https://your-website.com/apply" 
        // Note: Actual OAuth verification must happen on your bot/backend for security.
    }
};
