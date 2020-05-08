const addMovieModel = document.getElementById('add-modal');
const startAddMovieButton = document.querySelector('header button');
const backdrop = document.getElementById('backdrop');
const cancelAddMovieButton = addMovieModel.querySelector('.btn--passive');
const confirmAddMovieButton = cancelAddMovieButton.nextElementSibling;
const userInputs = addMovieModel.querySelectorAll('input');
const entryTextSection = document.getElementById('entry-text');

const movies = [];

const updateUI = () => {
	if (movies.length === 0) {
		entryTextSection.style.display = 'display';
	} else {
		entryTextSection.style.display = 'none';
	}
};

const renderNewMovieElement = (title, imageUrl, rating) => {
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

	const listRoot = document.getElementById('movie-list');
	listRoot.append(newMovieElement);
};

const toggleBackdrop = () => {
	backdrop.classList.toggle('visible');
};

const toggleMovieModal = () => {
	addMovieModel.classList.toggle('visible');
	toggleBackdrop();
};

const backdropClickHandler = () => {
	toggleMovieModal();
};

const clearMovieInput = () => {
	for (let usrInput of userInputs) {
		usrInput.value = '';
	}
};

const cancelAddMovieHandler = () => {
	toggleMovieModal();
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
		title: titleValue,
		image: imageUrlValue,
		rating: ratingValue,
	};

	movies.push(newMovie);
	console.log(movies);

	toggleMovieModal();
	clearMovieInput();
	renderNewMovieElement(newMovie.title, newMovie.image, newMovie.rating);
	updateUI();
};

startAddMovieButton.addEventListener('click', toggleMovieModal);
backdrop.addEventListener('click', backdropClickHandler);
cancelAddMovieButton.addEventListener('click', cancelAddMovieHandler);
confirmAddMovieButton.addEventListener('click', addMovieHandler);
