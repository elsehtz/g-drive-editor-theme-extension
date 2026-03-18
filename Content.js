let colorPalette = [
    "#323532",
    "#5A5D56",
    "#8F8A76",
    "#BB3524",
    "#BE4732",
]

let defaultDrivePallets = [
    "rgb(248, 250, 253)",
    "rgb(240, 244, 249)",
    "rgb(68, 71, 70)"
]

let colorPaletteMap = {
    "rgb(248, 250, 253)":"#323532",
    "rgb(240, 244, 249)":"#5A5D55",
    "rgb(68, 71, 70)":"#8F8A76",
}

let mapPalleteByClass = {
    'left-sidebar-container-content' :"#5A5D55",
    'docs-material' :  "#8F8A76",
    'kix-outlines-widget-header-container' : "#5A5D55", 
    'kix-outlines-widget-header-contents' : "#5A5D55", 
    'docs-titlebar-buttons': "#5A5D55",
}

function injectClassStyles() {
    const rules = Object.entries(mapPalleteByClass)
        .map(([className, color]) => `[class*="${className}"] { background-color: ${color} !important; }`)
        .join('\n');

    const overlayRules = `
        [class*="kix-page-paginated"] { filter: invert(1); }
        [class*="kix-cursor-caret"] { background-color: white !important; border-color: white !important; }
    `;

    const style = document.createElement('style');
    style.textContent = rules + overlayRules;
    document.head.appendChild(style);
}

function applyDarkMode() {
    for (let el of document.querySelectorAll('[class*="kix-appview"]')) {
        el.style.backgroundColor = colorPalette[0];
    }

    for (let el of document.querySelectorAll('[class*="navigation-"]')) {
        el.style.backgroundColor = colorPaletteMap[el.style.backgroundColor];
    }

    for (let el of document.querySelectorAll('[class*="navigation-"]')) {
        // el.style.backgroundColor = colorPalette[Math.floor(Math.random() * 2)];
        if (defaultDrivePallets.includes(el.style.backgroundColor)) {
            el.style.backgroundColor = colorPaletteMap[el.style.backgroundColor];
        }
    }

    for (let el of document.querySelectorAll('div')) {
        if (defaultDrivePallets.includes(el.style.backgroundColor)) {
            el.style.backgroundColor = colorPaletteMap[el.style.backgroundColor];
        }
    }

    for (let el of document.querySelectorAll('input')) {
        el.style.color = 'black';
    }
}

let debounceTimer;
const observer = new MutationObserver(() => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(applyDarkMode, 100);
});

chrome.storage.sync.get({ darkModeEnabled: true }, (data) => {
    if (data.darkModeEnabled) {
        injectClassStyles();
        applyDarkMode();
        observer.observe(document.body, { childList: true, subtree: true });
    }
});
