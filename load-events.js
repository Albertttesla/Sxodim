fetch('events.json')
  .then(res => res.json())
  .then(data => {
    const container = document.getElementById('events-container');
    data.forEach(event => {
      const card = document.createElement('div');
      card.className = 'event-card';
      card.innerHTML = `
        <img class="event-image" src="${event.image}" alt="${event.title}">
        <div class="event-info">
          <h3>${event.title}</h3>
          <p>${event.description}</p>
          <span>${event.date}</span>
        </div>
      `;
      card.addEventListener('click', () => openModal(event));
      container.appendChild(card);
    });
  });

function openModal(event) {
  document.getElementById('modal-title').textContent = event.title;
  document.getElementById('modal-image').src = event.image;
  document.getElementById('modal-date').textContent = event.date;
  document.getElementById('modal-details').textContent = event.details;
  document.getElementById('modal').classList.remove('hidden');
}

document.getElementById('modal-close').addEventListener('click', () => {
  document.getElementById('modal').classList.add('hidden');
});
