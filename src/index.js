function element(id) {
    return document.getElementById(id);
}

function showElement(id) {
    element(id).style = '';
}

function hideElement(id) {
    element(id).style = 'display: none;';
}

function setText(id, text) {
    element(id).innerHTML = text;
}

function getMashapeKey() {
    return localStorage.getItem('stock-ticker-mashape-key');
}

function authenticateClicked() {
    console.log('Authenticate clicked');

    authenticationSuccess = false;
    if (authenticationSuccess) {
        hideElement('loginForm');
        showElement('settingsForm');
    } else {
        setText('loginInformationMessage', 'Invalid login! Try again, dude');
    }
}

function onLoaded() {
    if (!getMashapeKey()) {
        element('authenticateButton').onclick = authenticateClicked;
        showElement('loginForm');
        hideElement('settingsForm');
        element('loginInformationMessage').innerHTML = 'You need to log in (one time only) so we know it\'s really you...';
    } else {
        setText('loginInformationMessage', 'Basic settings for your stock ticker');
        showElement('settingsForm');
        hideElement('loginForm');
    }
}

window.onload = onLoaded;
