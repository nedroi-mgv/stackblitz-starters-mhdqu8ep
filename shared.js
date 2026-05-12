/* shared.js - CONTROLLO ACCESSI MGV DEFINITIVO */

const userRole = localStorage.getItem('mgv_role');
const currentPage = window.location.pathname.split("/").pop() || "dashboard.html";

// 1. Protezione Accesso Base
if (!userRole && !window.location.href.includes("index.html")) { 
    window.location.href = "index.html"; 
}

// 2. Definizione Permessi Semplificata
const accessRules = {
    "admin": ["dashboard.html", "parco.html", "officina.html", "commerciale.html", "direzione.html"],
    "officina": ["dashboard.html", "officina.html"],
    "commerciale": ["dashboard.html", "commerciale.html"] 
};

// 3. Funzione Logout
function logout() {
    localStorage.removeItem('mgv_role');
    window.location.href = "index.html";
}

// 4. Render Sidebar (Filtra solo i link principali)
function renderSidebar() {
    const sidebarContainer = document.querySelector('.sidebar');
    if (!sidebarContainer) return;

    const links = [
        { href: "dashboard.html", icon: "📊", text: "Dashboard" },
        { href: "parco.html", icon: "🚗", text: "Parco Veicoli" },
        { href: "officina.html", icon: "🔧", text: "Officina Prep" },
        { href: "commerciale.html", icon: "🤝", text: "Area Commerciale" },
        { href: "direzione.html", icon: "📈", text: "Direzione" }
    ];

    let html = `
        <div style="padding: 40px 20px; text-align:center;">
            <h2 style="color:#c5a059; letter-spacing:4px; font-weight: 900; margin:0;">MGV</h2>
        </div>
        <div style="display: flex; flex-direction: column; height: calc(100vh - 160px);">
            <div style="flex-grow: 1;">
    `;

    links.forEach(link => {
        const allowed = accessRules[userRole] || [];
        if (allowed.includes(link.href)) {
            const isActive = currentPage === link.href ? "active" : "";
            html += `<a href="${link.href}" class="nav-link ${isActive}">${link.icon} ${link.text}</a>`;
        }
    });

    html += `
            </div>
            <div class="nav-link" onclick="logout()" style="color:#ff4d4d; border-top:1px solid #222; cursor:pointer; margin-top: auto; padding: 20px 30px; font-weight: bold;">
                ✖ LOGOUT
            </div>
        </div>
    `;

    sidebarContainer.innerHTML = html;
}

document.addEventListener('DOMContentLoaded', renderSidebar);