var debugButtonActive = false;
var soundButtonActive = true;
chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {

    if (localStorage.getItem("Sensitivity") != null) {
        document.getElementById('SensInput').value = localStorage.getItem("Sensitivity");
    }

    if (localStorage.getItem("SoundButtonState") == "disabled") {
        soundButtonActive = false;
        document.getElementById('SoundButton').innerText = "Enable sound";
    }

    if (localStorage.getItem("DebugButtonState") == "enabled") {
        debugButtonActive = true;
        document.getElementById('DebugButton').innerText = "Disable debug cameras";
    }

    document.getElementById('DebugButton').onclick = function () {
        debugButtonActive = !debugButtonActive;
        if (debugButtonActive) {
            document.getElementById('DebugButton').innerText = "Disable debug cameras";
            localStorage.setItem("DebugButtonState", "enabled");
            chrome.tabs.sendMessage(tabs[0].id, "ShowDebug");
        } else {
            document.getElementById('DebugButton').innerText = "Enable debug cameras";
            localStorage.setItem("DebugButtonState", "disabled");
            chrome.tabs.sendMessage(tabs[0].id, "HideDebug");
        }
    };

    document.getElementById('SoundButton').onclick = function () {
        soundButtonActive = !soundButtonActive;
        if (soundButtonActive) {
            document.getElementById('SoundButton').innerText = "Disable sound";
            localStorage.setItem("SoundButtonState", "enabled");
            chrome.tabs.sendMessage(tabs[0].id, "EnableSound");
        } else {
            document.getElementById('SoundButton').innerText = "Enable sound";
            localStorage.setItem("SoundButtonState", "disabled");
            chrome.tabs.sendMessage(tabs[0].id, "DisableSound");
        }
    };

    document.getElementById('SensInput').addEventListener('input', function () {
        chrome.tabs.sendMessage(tabs[0].id, "SensChange " + document.getElementById('SensInput').value);
        localStorage.setItem("Sensitivity", document.getElementById('SensInput').value);
    })
});
