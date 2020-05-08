const addMovieModel = document.getElementById('add-modal');
const startAddMovieButton = document.querySelector('header button');

const toggleMovieModal = () => {
	addMovieModel.classList.toggle('visible');
};

startAddMovieButton.addEventListener('click', toggleMovieModal);
