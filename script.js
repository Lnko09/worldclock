function updateClocks() {
  const cards = document.querySelectorAll(".card");
  cards.forEach((card) => {
    const timeZone = card.getAttribute("data-zone");
    const now = new Date().toLocaleString("en-US", { timeZone });
    const dateObj = new Date(now);
    
    const time = dateObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const date = dateObj.toLocaleDateString();

    card.querySelector(".time").textContent = time;
    card.querySelector(".date").textContent = date;
  });
}

// Parallax effect
window.addEventListener('scroll', () => {
  document.querySelectorAll('.parallax').forEach(el => {
    const speed = parseFloat(el.dataset.speed);
    el.style.transform = `translateY(${window.scrollY * speed}px)`;
  });
});

// Update clocks every minute
updateClocks();
setInterval(updateClocks, 60000);
