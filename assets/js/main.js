// Copy IP Function
function copyIP() {
    navigator.clipboard.writeText("novanetsmp.site");
    const btn = document.getElementById("copy-btn");
    btn.innerText = "IP COPIED!";
    setTimeout(() => { btn.innerText = "COPY IP"; }, 2000);
}

// Fetch Live Server Status
async function fetchServerStatus() {
    const statusText = document.getElementById("status-text");
    const playerCount = document.getElementById("player-count");
    const mcVersion = document.getElementById("mc-version");

    if(!statusText) return; // Only run if on homepage

    try {
        const response = await fetch("https://api.mcsrvstat.us/3/novanetsmp.site");
        const data = await response.json();

        if (data.online) {
            statusText.innerHTML = `<span class="status-online">ONLINE</span>`;
            playerCount.innerText = `${data.players.online} / ${data.players.max}`;
            mcVersion.innerText = data.version || "Latest";
        } else {
            statusText.innerHTML = `<span class="status-offline">OFFLINE</span>`;
            playerCount.innerText = "0 / 0";
            mcVersion.innerText = "Unknown";
        }
    } catch (error) {
        statusText.innerHTML = `<span class="status-offline">ERROR</span>`;
    }
}

// Store Submission Form
async function submitPurchase(e) {
    e.preventDefault();
    const btn = document.getElementById('purchase-btn');
    btn.innerText = "Processing...";
    
    const formData = {
        ign: document.getElementById('ign').value,
        item: document.getElementById('item').value,
        ref: document.getElementById('ref').value
    };

    try {
        const res = await fetch('/api/purchase', {
            method: 'POST',
            body: JSON.stringify(formData)
        });
        const data = await res.json();
        alert(data.message);
        btn.innerText = "Submit Payment";
        document.getElementById('store-form').reset();
    } catch (err) {
        alert("Failed to submit request.");
        btn.innerText = "Submit Payment";
    }
}

document.addEventListener("DOMContentLoaded", () => {
    fetchServerStatus();
    const storeForm = document.getElementById('store-form');
    if(storeForm) storeForm.addEventListener('submit', submitPurchase);
});