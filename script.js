const clocks = document.querySelectorAll('.clock');

// Use a free weather API like Open-Meteo or WeatherAPI if you have a key
const weatherData = {
  "America/Edmonton": "🌤️ 18°C",
  "Africa/Lusaka": "☀️ 25°C",
  "America/Detroit": "⛅ 22°C",
  "Europe/Paris": "🌧️ 19°C"
};

function updateClock(clock, zone) {
  const now = new Date();
  const time = new Date(now.toLocaleString("en-US", { timeZone: zone }));
  const hours = time.getHours();
  const minutes = time.getMinutes();
  const seconds = time.getSeconds();

  const hourDeg = ((hours % 12) + minutes / 60) * 30;
  const minuteDeg = (minutes + seconds / 60) * 6;
  const secondDeg = seconds * 6;

  if (!clock.querySelector('.hour')) {
    // Create hands and labels
    ['hour', 'minute', 'second'].forEach(type => {
      const el = document.createElement('div');
      el.className = `hand ${type}`;
      clock.appendChild(el);
    });

    const digital = document.createElement('div');
    digital.className = 'digital';
    clock.appendChild(digital);

    const weather = document.createElement('div');
    weather.className = 'weather';
    weather.textContent = weatherData[zone] || "🌡️ Loading...";
    clock.appendChild(weather);
  }

  clock.querySelector('.hour').style.transform = `rotate(${hourDeg}deg)`;
  clock.querySelector('.minute').style.transform = `rotate(${minuteDeg}deg)`;
  clock.querySelector('.second').style.transform = `rotate(${secondDeg}deg)`;

  const digital = clock.querySelector('.digital');
  const hourStr = (hours % 12 || 12).toString().padStart(2, '0');
  const minuteStr = minutes.toString().padStart(2, '0');
  const period = hours >= 12 ? 'PM' : 'AM';

  digital.innerHTML = `${hourStr}:${minuteStr} <span class="period">${period}</span>`;
}

function updateAllClocks() {
  clocks.forEach(clock => {
    const zone = clock.getAttribute('data-city');
    updateClock(clock, zone);
  });
}

setInterval(updateAllClocks, 1000);
updateAllClocks();
