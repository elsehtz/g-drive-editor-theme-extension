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

function applyDarkMode() {
    for (let el of document.querySelectorAll('[class*="kix-appview"]')) {
        el.style.backgroundColor = colorPalette[Math.floor(Math.random() * 2)];
    }


    // for (let el of document.querySelectorAll('[class*="docs-"]')) {
    //     el.style.backgroundColor = colorPalette[Math.floor(Math.random() * 5)];
    // }

    for (let el of document.querySelectorAll('[class*="navigation-"]')) {
        el.style.backgroundColor = colorPaletteMap[el.style.backgroundColor];
    }


    // for (let el of document.querySelectorAll('[class*="goog-toolbar-button-outer-box"]')) {
    //     el.style.backgroundColor = colorPalette[Math.floor(Math.random() * 5)];
    // }
    for (let el of document.querySelectorAll('[class*="navigation-"]')) {
        // el.style.backgroundColor = colorPalette[Math.floor(Math.random() * 2)];
        if (defaultDrivePallets.includes(el.style.backgroundColor)) {
            el.style.backgroundColor = colorPaletteMap[el.style.backgroundColor];
        }
    }

    // for (let el of document.querySelectorAll('canvas')) {
    //     // el.style.backgroundColor = colorPalette[2];
    //     el.style.filter = "invert(1) hue-rotate(180deg)";

    // }


    // for (let el of document.querySelectorAll('[class*="kix-page-paginated"]')) {
    //     el.style.backgroundColor = colorPalette[2];
    // }


    for (let el of document.querySelectorAll('div')) {
        if (defaultDrivePallets.includes(el.style.backgroundColor)) {
            el.style.backgroundColor = colorPaletteMap[el.style.backgroundColor];
        }
    }
}

chrome.storage.sync.get({ darkModeEnabled: true }, (data) => {
    if (data.darkModeEnabled) {
        applyDarkMode();
    }
});
