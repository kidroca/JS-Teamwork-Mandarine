var movieDatabase = (function () {
	var TITLE_MIN_LENGTH = 2,
		TITLE_MAX_LENGTH = 50,
		TITLE_ILLEGAL_CHARS = /[^\w\s]/,
		database = {},
		movies = ['id0'],
		titles = ['id0'],
		properties = ['id0'];

	function Movie(title, propertiesObject) {
		this.title = title;
		this.properties = propertiesObject;
		// To be eddited 'properties' will be replaced with
		// Example:
		// this.genre = propertiesObject.genre
		// this.duration = propertiesObject.duration
	}

	Object.defineProperties(Movie, {
		title: {
		    get: function() {
		        return this._title;
		    },
		
		    set: function(val) {
		        validator.validateString(val, TITLE_MIN_LENGTH, TITLE_MAX_LENGTH, TITLE_ILLEGAL_CHARS, 'Movie Title');
		
		        this._title = val;
		
		        return this;
		    },
		
		    enumerable: true
		},
	});

	function addToDatabase(title, propertiesObject)	{
		var movie = new Movie(title, propertiesObject);

		movie.id = movies.length;
		movies.push(movie);
		titles.push(movie.title);
		properties.push(movie.properties);
	}

	function removeFromDatabase(movieId) {
		validator.validatePositiveNumber(movieId, 'Movie ID');
		if (movieId < movies.length) {
			movies.splice(movieId, 1);
			titles.splice(movieId, 1);
			properties.splice(movieId, 1);
		} else {
			throw new Error('Requested movie ID is outside the bounds of the collection');
		}
	
		return this;
	}

	function getTitles() {
		var titlesCopy = titles.slice(1);
		return titlesCopy;
	}

	function getProperties() {
		var propertiesCopy = properties.slice(1);
		return propertiesCopy;
	}

	function getPropertyNames() {
		var moviePropertyNames = 
			Object.keys(properties[1])
				.filter(function(property) {
					if (isNaN(properties[1][property])) {
						return false;
					}

					return true;
				});

		return moviePropertyNames;		
	}

	function getMovie(idOrTitle) {
		if (isNaN(idOrTitle)) {
			getMovieByTitle(idOrTitle);
		} else {
			getMovieById(idOrTitle);
		}
	}

	function getMovieById(id) {
		validator.validatePositiveNumber(id, 'Movie ID');
		if (id < movies.length) {
			return movies[id];
		} else {
			throw new Error('Requested movie ID is outside the bounds of the collection');
		}
	}

	function getMovieByTitle(title) {
		var indexOfMovie;
		validator.validateString(val, TITLE_MIN_LENGTH, TITLE_MAX_LENGTH, TITLE_ILLEGAL_CHARS, 'Movie Title');

		indexOfMovie = titles.indexOf(title);

		if (indexOfMovie !== -1) {
			return movies[indexOfMovie];
		} else {
			return null;
		}
	}

	database = {
		addNew: addToDatabase,
		remove: removeFromDatabase,
		getTitles: getTitles,
		getProperties: getProperties,
		getPropertyNames: getPropertyNames,
		getMovie: getMovie
	};

	return database;
})(); 