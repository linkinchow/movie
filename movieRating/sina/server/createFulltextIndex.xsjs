(function (){
    'use strict';
    //initialize variables
    var conn = null,
        body = '',
        prepStat = null;
    //initial database setup, create fulltext indizes
    try {
        //get connection
        conn = $.db.getConnection();
        prepStat = conn.prepareStatement('CREATE FULLTEXT INDEX TWEET_TA_TOKEN_I ON "MOVIE_RATING"."$TA_TWEETS_I" ("TA_TOKEN") SYNC SEARCH ONLY OFF');
        prepStat.execute();
        prepStat.close();
        prepStat = conn.prepareStatement('CREATE FULLTEXT INDEX TWEET_TA_TYPE_I ON "MOVIE_RATING"."$TA_TWEETS_I" ("TA_TYPE") SYNC SEARCH ONLY OFF');
        prepStat.execute();
        prepStat.close();
        prepStat = conn.prepareStatement('CREATE FULLTEXT INDEX TWEET_SOURCE_STR_I ON "MOVIE_RATING"."movieRating.data::movieRating.Tweets" ("source_str") SYNC SEARCH ONLY OFF');
        prepStat.execute();
        prepStat.close();
        prepStat = conn.prepareStatement('CREATE FULLTEXT INDEX TWEET_CREATED_AT_YEAR_I ON "MOVIE_RATING"."movieRating.data::movieRating.Tweets" ("created_at_year") SYNC SEARCH ONLY OFF');
        prepStat.execute();
        prepStat.close();
        prepStat = conn.prepareStatement('CREATE FULLTEXT INDEX TWEET_CREATED_AT_MONTH_I ON "MOVIE_RATING"."movieRating.data::movieRating.Tweets" ("created_at_month") SYNC SEARCH ONLY OFF');
        prepStat.execute();
        prepStat.close();
        prepStat = conn.prepareStatement('CREATE FULLTEXT INDEX TWEET_CREATED_AT_DAY_I ON "MOVIE_RATING"."movieRating.data::movieRating.Tweets" ("created_at_day") SYNC SEARCH ONLY OFF');
        prepStat.execute();
        prepStat.close();
        prepStat = conn.prepareStatement('CREATE FULLTEXT INDEX TWEET_CREATED_AT_HOUR_I ON "MOVIE_RATING"."movieRating.data::movieRating.Tweets" ("created_at_hour") SYNC SEARCH ONLY OFF');
        prepStat.execute();
        prepStat.close();
        prepStat = conn.prepareStatement('CREATE FULLTEXT INDEX TWEET_CREATED_AT_WEEK_I ON "MOVIE_RATING"."movieRating.data::movieRating.Tweets" ("created_at_week") SYNC SEARCH ONLY OFF');
        prepStat.execute();
        prepStat.close();
        prepStat = conn.prepareStatement('CREATE FULLTEXT INDEX MOVIE_TITLE_I ON "MOVIE_RATING"."movieRating.data::movieRating.Movies" ("title") SYNC SEARCH ONLY OFF');
        prepStat.execute();
        prepStat.close();
        prepStat = conn.prepareStatement('CREATE FULLTEXT INDEX MOVIE_MPAA_RATING_I ON "MOVIE_RATING"."movieRating.data::movieRating.Movies" ("mpaa_rating") SYNC SEARCH ONLY OFF');
        prepStat.execute();
        prepStat.close();
        prepStat = conn.prepareStatement('CREATE FULLTEXT INDEX MOVIE_YEAR_STR_I ON "MOVIE_RATING"."movieRating.data::movieRating.Movies" ("year_str") SYNC SEARCH ONLY OFF');
        prepStat.execute();
        prepStat.close();
        prepStat = conn.prepareStatement('CREATE FULLTEXT INDEX MOVIE_STUDIO_I ON "MOVIE_RATING"."movieRating.data::movieRating.Movies" ("studio") SYNC SEARCH ONLY OFF');
        prepStat.execute();
        prepStat.close();
        prepStat = conn.prepareStatement('CREATE FULLTEXT INDEX MOVIE_RELEASE_DATE_YEAR_I ON "MOVIE_RATING"."movieRating.data::movieRating.Movies" ("release_date_year") SYNC SEARCH ONLY OFF');
        prepStat.execute();
        prepStat.close();
        prepStat = conn.prepareStatement('CREATE FULLTEXT INDEX MOVIE_RELEASE_DATE_MONTH_I ON "MOVIE_RATING"."movieRating.data::movieRating.Movies" ("release_date_month") SYNC SEARCH ONLY OFF');
        prepStat.execute();
        prepStat.close();
        prepStat = conn.prepareStatement('CREATE FULLTEXT INDEX MOVIE_RELEASE_DATE_DAY_I ON "MOVIE_RATING"."movieRating.data::movieRating.Movies" ("release_date_day") SYNC SEARCH ONLY OFF');
        prepStat.execute();
        prepStat.close();
        prepStat = conn.prepareStatement('CREATE FULLTEXT INDEX MOVIE_RELEASE_DATE_WEEK_I ON "MOVIE_RATING"."movieRating.data::movieRating.Movies" ("release_date_week") SYNC SEARCH ONLY OFF');
        prepStat.execute();
        prepStat.close();
        // --- commit changes and close connection
        conn.commit();
        conn.close();
        body = 'fulltext index created';
        $.response.status = $.net.http.OK;
    }
    catch (e){
        // 289: index already exists, thats ok
        if(e.code && e.code !== 289){
            body = e.message;
            $.response.status = $.net.http.BAD_REQUEST;
        } else {
            body = 'fulltext index already exists';
            $.response.status = $.net.http.OK;
        }
    }
    $.response.contentType = 'text/plain';
    $.response.setBody(body);
}());