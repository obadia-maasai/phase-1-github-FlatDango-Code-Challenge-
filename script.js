let dataUrl = "http://localhost:3000/films";

document.addEventListener('DOMContentLoaded', () => {
  const filmsMenu = document.getElementById('films');
  
  function fetchMovieMenu() {
    fetch(dataUrl)
      .then(response => response.json())
      .then(data => {
        data.forEach(film => {
          const listItem = document.createElement('li');
          listItem.classList.add('film', 'item');
          listItem.textContent = film.title;
          listItem.addEventListener('click', () => showMovieDetails(film));
          filmsMenu.appendChild(listItem);
        });

        // Show the first movie's details by default
        if (data.length > 0) {
          showMovieDetails(data[0]);
        }
      })
      .catch(error => console.error('Error fetching movie data:', error));
  }

  function showMovieDetails(movie) {
    const titleElement = document.getElementById('title');
    const runtimeElement = document.getElementById('runtime');
    const showtimeElement = document.getElementById('showtime');
    const availableTicketsElement = document.getElementById('availableTickets');
    const descriptionElement = document.getElementById('description');
    const imageElement = document.getElementById('image');
    const buyTicketBtn = document.getElementById('buy-ticket');

    const availableTickets = movie.capacity - movie.tickets_sold;
    titleElement.textContent = movie.title;
    runtimeElement.textContent = `Run Time: ${movie.runtime} minutes`;
    showtimeElement.textContent = `Show Time: ${movie.showtime}`;
    availableTicketsElement.textContent = `Available Tickets: ${availableTickets}`;
    descriptionElement.textContent = `Description: ${movie.description}`;
    imageElement.src = movie.poster;

    buyTicketBtn.disabled = availableTickets === 0;
    buyTicketBtn.textContent = availableTickets === 0 ? 'Sold Out' : 'Buy Ticket';

    buyTicketBtn.addEventListener('click', () => {
      if (availableTickets > 0) {
        availableTickets--;
        availableTicketsElement.textContent = `Available Tickets: ${availableTickets}`;
        buyTicketBtn.disabled = availableTickets === 0;
        buyTicketBtn.textContent = availableTickets === 0 ? 'Sold Out' : 'Buy Ticket';
      }
    });
  }

  fetchMovieMenu();
});
