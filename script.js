// Wechsel zwischen Dark und Light Mode
function toggleDarkLightMode() {
    document.body.classList.toggle("dark-mode");
}

// Liste der Server mit ihren IPs und Ports
const servers = [
    { name: "OPPRO.NET", ip: "node1.yourhoster.at", port: 7755 },
    { name: "Cytooxien", ip: "cytooxien.de", port: 25565 },
    { name: "Srino", ip: "srino.net", port: 25565 },
    { name: "OPSUCHT", ip: "opsucht.net", port: 25565 },
    { name: "Griefergames", ip: "griefergames.de", port: 25565 },
    { name: "Nightlife", ip: "noch nicht verfügbar.", port: 25565 }
];

// Funktion zum Abrufen des Serverstatus
async function getServerStatus(ip, port) {
    try {
        const response = await fetch(`https://mcapi.us/server/status?ip=${ip}&port=${port}`);
        const data = await response.json();
        return {
            online: data.online,
            players: data.players,
            version: data.version,
            ping: data.ping,
            uptime: data.uptime
        };
    } catch (error) {
        return {
            online: false,
            players: { now: '-', max: '-' },
            version: '-',
            ping: '-',
            uptime: '-'
        };
    }
}

// Funktion zum Abrufen des Serverlogos

// Funktion zum Überprüfen des Serverstatus
async function checkAllServerStatuses() {
    const container = document.getElementById("server-status-container");
    container.innerHTML = ''; // Alte Daten löschen

    for (const server of servers) {
        const serverData = await getServerStatus(server.ip, server.port);

        const serverDiv = document.createElement("div");
        serverDiv.classList.add("server-container");

        const serverStatus = document.createElement("div");
        serverStatus.classList.add("server-status");
        serverStatus.textContent = `${server.name}: ${serverData.online ? 'Online' : 'Offline'}`;
        serverStatus.classList.add(serverData.online ? "online" : "offline");

        const infoDiv = document.createElement("div");
        infoDiv.classList.add("info");

        infoDiv.innerHTML = `
            <div>IP: ${server.ip}</div>
            <div>Spieler online: ${serverData.players.now || '-'}</div>
            <div>Maximale Spieler: ${serverData.players.max || '-'}</div>
            <div>Version: ${serverData.version || '-'}</div>
            <div>Ping: ${serverData.ping || '-'}</div>
            <div>Uptime: ${serverData.uptime || '-'}</div>
        `;

        serverDiv.appendChild(serverStatus);
        serverDiv.appendChild(infoDiv);
        container.appendChild(serverDiv);
    }
}
