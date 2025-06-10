const timeZones = document.querySelectorAll('.clock-wrapper');

function updateClock(clock, timeZone) {
  const now = new Date();
  const localeTime = timeZone
    ? new Date(now.toLocaleString("en-US", { timeZone }))
    : now;

  const seconds = localeTime.getSeconds();
  const minutes = localeTime.getMinutes();
  const hours = localeTime.getHours();

  // Digital time
  const timeStr = localeTime.toLocaleTimeString('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });

  // Create clock face if not yet created
  if (!clock.querySelector('.clock-face')) {
    clock.innerHTML += `
      <div class="clock-face">
        <div class="hand hour"></div>
        <div class="hand minute"></div>
        <div class="hand second"></div>
      </div>
      <div class="digital"></div>
    `;
  }

  const hourHand = clock.querySelector('.hour');
  const minuteHand = clock.querySelector('.minute');
  const secondHand = clock.querySelector('.second');
  const digital = clock.querySelector('.digital');

  hourHand.style.transform = `rotate(${(hours % 12) * 30 + minutes / 2}deg)`;
  minuteHand.style.transform = `rotate(${minutes * 6}deg)`;
  secondHand.style.transform = `rotate(${seconds * 6}deg)`;

  digital.textContent = timeStr;
}

function updateAllClocks() {
  timeZones.forEach((clock) => {
    const zone = clock.getAttribute('data-zone');
    updateClock(clock, zone || undefined);
  });
}

setInterval(updateAllClocks, 1000);
updateAllClocks();
