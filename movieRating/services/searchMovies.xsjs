function hashtag(title) {
	return "#" + title.split(":")[0].replace(/\W/g, "");
}

function searchMovies() {
	var baseURL = "/lists/movies/opening.json?limit=50&country=us";
	var apikey = "<YOUR API KEY>";

	var destination = $.net.http.readDestination("movieRating.services", "rottenTomatoesApi");
	var client = new $.net.http.Client();
	var request = new $.net.http.Request($.net.http.GET, baseURL + "&apikey=" + apikey);
	var response = client.request(request, destination).getResponse();
	var movies = JSON.parse(response.body.asString()).movies;

	if (movies) {
		var movie;
		var conn = $.db.getConnection();
		var pstmtMovies = conn.prepareStatement('INSERT INTO "MOVIE_RATING"."movieRating.data::movieRating.Movies" ("id", "title", "year", "mpaa_rating", "runtime", "release_date", "synopsis", "poster", "studio", "hashtag", "timestamp", "since_id") VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)');
		var pstmtGenres = conn.prepareStatement('INSERT INTO "MOVIE_RATING"."movieRating.data::movieRating.Genres" ("movie_id", "genre") VALUES (?, ?)');
		var pstmtAbridgedCast = conn.prepareStatement('INSERT INTO "MOVIE_RATING"."movieRating.data::movieRating.AbridgedCast" ("movie_id", "cast") VALUES (?, ?)');
		var pstmtAbridgedDirectors = conn.prepareStatement('INSERT INTO "MOVIE_RATING"."movieRating.data::movieRating.AbridgedDirectors" ("movie_id", "director") VALUES (?, ?)');

		for (var i in movies) {
			try {
				request = new $.net.http.Request($.net.http.GET, "/movies/" + movies[i].id + ".json?apikey=" + apikey);
				response = client.request(request, destination).getResponse();
				movie = JSON.parse(response.body.asString());
				
				//Movie
				pstmtMovies.setInteger(1, movie.id);
				pstmtMovies.setString(2, movie.title);
				pstmtMovies.setInteger(3, movie.year, 10);
				pstmtMovies.setString(4, movie.mpaa_rating);
				pstmtMovies.setString(5, movie.runtime + "");
				pstmtMovies.setDate(6, movie.release_dates.theater, "YYYY-MM-DD");
				pstmtMovies.setString(7, movie.synopsis);
				pstmtMovies.setString(8, movie.posters.thumbnail);
				pstmtMovies.setString(9, movie.studio === undefined ? "" : movie.studio);
				pstmtMovies.setString(10, hashtag(movie.title));
				pstmtMovies.setTimestamp(11, new Date());
				pstmtMovies.setString(12, '0');
				pstmtMovies.execute();
				
				//Genres
				if (movie.genres) {
					for (var i in movie.genres) {
						pstmtGenres.setInteger(1, movie.id);
						pstmtGenres.setString(2, movie.genres[i]);
						pstmtGenres.execute();
					}
				}
				
				//AbridgedCast
				if (movie.abridged_cast) {
					for (var i in movie.abridged_cast) {
						pstmtAbridgedCast.setInteger(1, movie.id);
						pstmtAbridgedCast.setString(2, movie.abridged_cast[i].name);
						pstmtAbridgedCast.execute();
					}
				}
				
				//AbridgedDirectors
				if (movie.abridged_directors) {
					for (var i in movie.abridged_directors) {
						pstmtAbridgedDirectors.setInteger(1, movie.id);
						pstmtAbridgedDirectors.setString(2, movie.abridged_directors[i].name);
						pstmtAbridgedDirectors.execute();
					}
				}
			} catch (e) {
				
			}
		}

		pstmtMovies.close();
		pstmtGenres.close();
		pstmtAbridgedCast.close();
		pstmtAbridgedDirectors.close();
		conn.commit();
		conn.close();
	}
}