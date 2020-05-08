const addMovieModel = document.getElementById('add-modal');
const startAddMovieButton = document.querySelector('header button');
const backdrop = document.getElementById('backdrop');
const cancelAddMovieButton = addMovieModel.querySelector('.btn--passive');
const confirmAddMovieButton = cancelAddMovieButton.nextElementSibling;
const userInputs = addMovieModel.querySelectorAll('input');
const entryTextSection = document.getElementById('entry-text');
const deleteMovieModal = document.getElementById('delete-modal');

const movies = [];

const updateUI = () => {
	if (movies.length === 0) {
		entryTextSection.style.display = 'display';
	} else {
		entryTextSection.style.display = 'none';
	}
};

const closeMovieDeletionModal = () => {
	toggleBackdrop();
	deleteMovieModal.classList.remove('visible');
};

deleteMovieHandler = (movieID) => {
	let movieIndex = 0;

	for (let movie of movies) {
		if (movie.id === movieID) {
			break;
		}
		movieIndex++;
	}

	movies.splice(movieIndex, 1);

	const listRoot = document.getElementById('movie-list');
	listRoot.children[movieIndex].remove();

	closeMovieDeletionModal();
};

const startMovieDeleteHandler = (movieID) => {
	deleteMovieModal.classList.add('visible');
	toggleBackdrop();

	const cancelDeletionButton = deleteMovieModal.querySelector(
		'.btn--passive'
	);
	const confirmDeletionButton = deleteMovieModal.querySelector(
		'.btn--danger'
	);

	cancelDeletionButton.addEventListener('click', closeMovieDeletionModal);
	confirmDeletionButton.addEventListener(
		'click',
		deleteMovieHandler.bind(null, movieID)
	);

	// deleteMovie()
};

const renderNewMovieElement = (id, title, imageUrl, rating) => {
	const newMovieElement = document.createElement('li');
	newMovieElement.className = 'movie-element';

	newMovieElement.innerHTML = `
        <div class="movie-element__image">
            <img src="${imageUrl}" alt="${title}" />
        </div>
        <div class="movie-element__info">
            <h2>${title}</h2>
            <p>${rating}/5 rating</p>
        </div>
    `;

	newMovieElement.addEventListener(
		'click',
		startMovieDeleteHandler.bind(null, id)
	);

	const listRoot = document.getElementById('movie-list');
	listRoot.append(newMovieElement);
};

const toggleBackdrop = () => {
	backdrop.classList.toggle('visible');
};

const closeMovieModal = () => {
	addMovieModel.classList.remove('visible');
};

const showMovieModal = () => {
	addMovieModel.classList.add('visible');
	toggleBackdrop();
};

const clearMovieInput = () => {
	for (let usrInput of userInputs) {
		usrInput.value = '';
	}
};

const cancelAddMovieHandler = () => {
	closeMovieModal();
	toggleBackdrop();
	clearMovieInput();
};

const addMovieHandler = () => {
	const titleValue = userInputs[0].value;
	const imageUrlValue = userInputs[1].value;
	const ratingValue = userInputs[2].value;

	if (
		titleValue.trim() === '' ||
		imageUrlValue.trim() === '' ||
		ratingValue.trim() === '' ||
		+ratingValue < 1 ||
		+ratingValue > 5
	) {
		alert('You should enter a valid input (rating between 1 and 5).');
	}

	const newMovie = {
		id: (Math.random() * 100000).toString(),
		title: titleValue,
		image: imageUrlValue,
		rating: ratingValue,
	};

	movies.push(newMovie);
	console.log(movies);
	closeMovieModal();
	toggleBackdrop();
	clearMovieInput();
	renderNewMovieElement(
		newMovie.id,
		newMovie.title,
		newMovie.image,
		newMovie.rating
	);
	updateUI();
};

const backdropClickHandler = () => {
	closeMovieModal();
	closeMovieDeletionModal();
	clearMovieInput();
};

startAddMovieButton.addEventListener('click', showMovieModal);
backdrop.addEventListener('click', backdropClickHandler);
cancelAddMovieButton.addEventListener('click', cancelAddMovieHandler);
confirmAddMovieButton.addEventListener('click', addMovieHandler);
