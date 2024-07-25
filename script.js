const apiURL = 'https://api.coingecko.com/api/v3/coins/markets';
const currency = 'usd';
const container = document.getElementById('crypto-list');
const themeToggle = document.getElementById('theme-toggle');

// Fetch and display crypto data
async function fetchCryptoData() {
    try {
        const response = await fetch(`${apiURL}?vs_currency=${currency}&order=market_cap_desc&per_page=10&page=1&sparkline=false`);
        const data = await response.json();
        displayCryptoData(data);
    } catch (error) {
        console.error('Error fetching crypto data:', error);
    }
}

function displayCryptoData(cryptos) {
    container.innerHTML = '';
    cryptos.forEach(crypto => {
        const cryptoItem = document.createElement('div');
        cryptoItem.classList.add('crypto-item');

        // Add light/dark mode class
        const currentMode = document.body.classList.contains('dark-mode') ? 'dark-mode' : 'light-mode';
        cryptoItem.classList.add(currentMode);

        const img = document.createElement('img');
        img.src = crypto.image;
        img.alt = crypto.name;

        const name = document.createElement('span');
        name.classList.add('crypto-name');
        name.textContent = crypto.name;

        const price = document.createElement('span');
        price.classList.add('crypto-price');
        price.textContent = `$${crypto.current_price.toFixed(2)}`;

        cryptoItem.appendChild(img);
        cryptoItem.appendChild(name);
        cryptoItem.appendChild(price);

        container.appendChild(cryptoItem);
    });
}

// Toggle between light and dark mode
function toggleTheme() {
    const isDarkMode = document.body.classList.contains('dark-mode');
    if (isDarkMode) {
        document.body.classList.remove('dark-mode');
        document.body.classList.add('light-mode');
        document.querySelectorAll('.crypto-item').forEach(item => item.classList.add('light-mode'));
        document.querySelectorAll('.crypto-item').forEach(item => item.classList.remove('dark-mode'));
        themeToggle.innerHTML = "<i class='bx bx-moon'></i>";
    } else {
        document.body.classList.remove('light-mode');
        document.body.classList.add('dark-mode');
        document.querySelectorAll('.crypto-item').forEach(item => item.classList.add('dark-mode'));
        document.querySelectorAll('.crypto-item').forEach(item => item.classList.remove('light-mode'));
        themeToggle.innerHTML = "<i class='bx bx-sun'></i>";
    }
}

themeToggle.addEventListener('click', toggleTheme);

fetchCryptoData();
