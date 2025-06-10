function updateClocks() {
  document.querySelectorAll('.card').forEach(card => {
    const zone = card.getAttribute('data-zone');
    const time = new Date().toLocaleTimeString("en-GB", {
      timeZone: zone,
      hour: "2-digit",
      minute: "2-digit",
      hour12: false
    });
    const date = new Date().toLocaleDateString("en-GB", {
      timeZone: zone,
      day: "2-digit",
      month: "long",
      year: "numeric"
    });

    card.querySelector(".time").textContent = time;
    card.querySelector(".date").textContent = date;
  });
}

setInterval(updateClocks, 1000);
updateClocks();
