const addMovieModel = document.getElementById('add-modal');
const startAddMovieButton = document.querySelector('header button');
const backdrop = document.getElementById('backdrop');
const cancelAddMovieButton = addMovieModel.querySelector('.btn--passive');

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

const cancelAddMovie = () => {
	toggleMovieModal();
};

startAddMovieButton.addEventListener('click', toggleMovieModal);
backdrop.addEventListener('click', backdropClickHandler);
cancelAddMovieButton.addEventListener('click', cancelAddMovie);
