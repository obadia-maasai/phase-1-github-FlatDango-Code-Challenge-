
document.addEventListener('DOMContentLoaded', () => {
  const filmsMenu = document.getElementById('films');
  const moviePoster = document.getElementById('poster');
  const movieTitle = document.getElementById('title');
  const movieRuntime = document.getElementById('runtime');
  const movieShowtime = document.getElementById('showtime');
  const availableTickets = document.getElementById('available-tickets');
  const buyTicketBtn = document.getElementById('buy-ticket');

  // Function to fetch movie data from the server 
  function fetchMovieMenu() {
    
    const filmsEndpoint = 'http://localhost:3000/films';

    fetch(filmsEndpoint)
      .then((response) => response.json())
      .then((data) => {
        data.forEach((film) => {
          const listItem = document.createElement('li');
          listItem.classList.add('film', 'item');
          listItem.textContent = film.title;
          listItem.addEventListener('click', () => showMovieDetails(film));
          filmsMenu.appendChild(listItem);
        });

        // Show the first movie's details by default
        showMovieDetails(data[0]);
      })
      .catch((error) => console.error('Error fetching movie data:', error));
  }

  // Function to display movie details
  function showMovieDetails(movie, allMovies) {
    movieDetails.innerHTML=`
    <h2>${movie.title}</h2>
    <p>Runtime; ${movie.runtime}</p>
    <p>Showtime;${movie.showtime}</p>
    <p>AvailableTickets;${movie.capacity-tickets_sold}</p>
    <p>description;${movie.description}</p>
    <img src="${movie.poster};"alt="${movie.title}"/>  `
  

    // Enable or disable "Buy Ticket" button based on ticket availability
    if (remainingTickets > 0) {
      buyTicketBtn.disabled = false;
      buyTicketBtn.textContent = 'Buy Ticket';
    } else {
      buyTicketBtn.disabled = true;
      buyTicketBtn.textContent = 'Sold Out';
    }

    // Add an event listener to the "Buy Ticket" button
    buyTicketBtn.addEventListener('click', () => {
      if (remainingTickets > 0) {
        
        // Update the availableTickets text content and disable the button
        availableTickets.textContent = `Available Tickets: ${remainingTickets - 1}`;
        buyTicketBtn.disabled = true;
        buyTicketBtn.textContent = 'Sold Out';
      }
    });
  }

  
  fetchMovieMenu();
});
