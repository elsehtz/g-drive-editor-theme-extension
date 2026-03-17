const toggle = document.getElementById('toggle');

// Load saved state (default: enabled)
chrome.storage.sync.get({ darkModeEnabled: true }, (data) => {
    toggle.checked = data.darkModeEnabled;
});

toggle.addEventListener('change', () => {
    const enabled = toggle.checked;
    chrome.storage.sync.set({ darkModeEnabled: enabled }, () => {
        // Reload the active Google Docs tab so the content script re-runs
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            if (tabs[0] && tabs[0].url && tabs[0].url.includes('docs.google.com')) {
                chrome.tabs.reload(tabs[0].id);
            }
        });
    });
});
