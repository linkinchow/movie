function searchTweets() {
	var baseURL = "/search/tweets.json?lang=en&result_type=recent&count=100";
	var token = "<YOUR BEARER TOKEN>";

	var destination = $.net.http.readDestination("movieRating.services", "twitterApi");
	var client = new $.net.http.Client();
	var request, response, result, tweets, max_id_str;

	var conn = $.db.getConnection();
	var pstmtSelectMovies = conn.prepareStatement('SELECT "id", "hashtag", "since_id" FROM "MOVIE_RATING"."movieRating.data::movieRating.Movies" WHERE DAYS_BETWEEN("release_date", CURRENT_DATE) BETWEEN 0 AND 6 ORDER BY "release_date" DESC');
	var pstmtUpdateMovies = conn.prepareStatement('UPDATE "MOVIE_RATING"."movieRating.data::movieRating.Movies" SET "since_id" = ? WHERE "id" = ?');
	var pstmtTweets = conn.prepareStatement('INSERT INTO "MOVIE_RATING"."movieRating.data::movieRating.Tweets" ("id", "created_at", "text", "source", "user_screen_name", "user_profile_image_url", "longitude", "latitude", "movie_id", "timestamp") VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)');

	var rs = pstmtSelectMovies.executeQuery();
	while (rs.next()) {
		try {
			request = new $.net.http.Request($.net.http.GET, baseURL + "&q=" + rs.getString(2) + "&since_id=" + rs.getString(3));
			request.headers.set('Authorization', token);
			response = client.request(request, destination).getResponse();
			result = JSON.parse(response.body.asString());
			tweets = result.statuses;
			max_id_str = result.search_metadata.max_id_str;
			
			if (tweets.length === 1) {
				pstmtTweets.setString(1, tweets[0].id_str);
				pstmtTweets.setTimestamp(2, tweets[0].created_at.slice(4, 20) + tweets[0].created_at.slice(-4), "MON DD HH24:MI:SS YYYY");
				pstmtTweets.setString(3, tweets[0].text);
				//pstmtTweets.setString(4, tweets[0].source.slice(tweets[0].source.indexOf(">") + 1, tweets[0].source.lastIndexOf("<")));
				pstmtTweets.setString(4, tweets[0].source);
				pstmtTweets.setString(5, tweets[0].user.screen_name);
				pstmtTweets.setString(6, tweets[0].user.profile_image_url);
				if (tweets[0].coordinates === null) {
					pstmtTweets.setNull(7);
					pstmtTweets.setNull(8);
				} else {
					pstmtTweets.setDecimal(7, tweets[0].coordinates.coordinates[0]);
					pstmtTweets.setDecimal(8, tweets[0].coordinates.coordinates[1]);
				}
				pstmtTweets.setInteger(9, rs.getInteger(1));
				pstmtTweets.setTimestamp(10, new Date());
				pstmtTweets.execute();
			} else if (tweets.length > 1) {
				pstmtTweets.setBatchSize(tweets.length);
				
				for (var i in tweets) {
					pstmtTweets.setString(1, tweets[i].id_str);
					pstmtTweets.setTimestamp(2, tweets[i].created_at.slice(4, 20) + tweets[i].created_at.slice(-4), "MON DD HH24:MI:SS YYYY");
					pstmtTweets.setString(3, tweets[i].text);
					//pstmtTweets.setString(4, tweets[i].source.slice(tweets[i].source.indexOf(">") + 1, tweets[i].source.lastIndexOf("<")));
					pstmtTweets.setString(4, tweets[i].source);
					pstmtTweets.setString(5, tweets[i].user.screen_name);
					pstmtTweets.setString(6, tweets[i].user.profile_image_url);
					if (tweets[i].coordinates === null) {
						pstmtTweets.setNull(7);
						pstmtTweets.setNull(8);
					} else {
						pstmtTweets.setDecimal(7, tweets[i].coordinates.coordinates[0]);
						pstmtTweets.setDecimal(8, tweets[i].coordinates.coordinates[1]);
					}
					pstmtTweets.setInteger(9, rs.getInteger(1));
					pstmtTweets.setTimestamp(10, new Date());
					pstmtTweets.addBatch();
				}
				
				pstmtTweets.executeBatch();
			}
			
			//Update "since_id" of the movie
			pstmtUpdateMovies.setString(1, max_id_str);
			pstmtUpdateMovies.setInteger(2, rs.getInteger(1));
			pstmtUpdateMovies.executeUpdate();
		} catch (e) {
			
		}
	}

	conn.commit();
	rs.close();
	pstmtSelectMovies.close();
	pstmtUpdateMovies.close();
	pstmtTweets.close();
	conn.close();
}