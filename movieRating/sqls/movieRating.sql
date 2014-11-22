CALL "_SYS_REPO"."GRANT_ACTIVATED_ROLE"('movieRating.roles::Admin', '<YOUR USERNAME>');

CREATE FULLTEXT INDEX "MOVIE_RATING"."TWEETS_I" ON "MOVIE_RATING"."movieRating.data::movieRating.Tweets" ("text") CONFIGURATION 'EXTRACTION_CORE_VOICEOFCUSTOMER' ASYNC LANGUAGE DETECTION ('EN') TEXT ANALYSIS ON;
ALTER TABLE "MOVIE_RATING"."$TA_TWEETS_I" ADD CONSTRAINT TWEETS_FK FOREIGN KEY("id") REFERENCES "MOVIE_RATING"."movieRating.data::movieRating.Tweets"("id") ON DELETE CASCADE;

ALTER TABLE "MOVIE_RATING"."movieRating.data::movieRating.Tweets" ADD ("created_at_year" NVARCHAR(20) GENERATED ALWAYS AS TO_NVARCHAR("created_at", 'YYYY'));
ALTER TABLE "MOVIE_RATING"."movieRating.data::movieRating.Tweets" ADD ("created_at_month" NVARCHAR(20) GENERATED ALWAYS AS TO_NVARCHAR("created_at", 'MON'));
ALTER TABLE "MOVIE_RATING"."movieRating.data::movieRating.Tweets" ADD ("created_at_day" NVARCHAR(20) GENERATED ALWAYS AS TO_NVARCHAR("created_at", 'DD'));
ALTER TABLE "MOVIE_RATING"."movieRating.data::movieRating.Tweets" ADD ("created_at_hour" NVARCHAR(20) GENERATED ALWAYS AS TO_NVARCHAR("created_at", 'HH24'));
ALTER TABLE "MOVIE_RATING"."movieRating.data::movieRating.Tweets" ADD ("created_at_week" NVARCHAR(20) GENERATED ALWAYS AS TO_NVARCHAR("created_at", 'WW'));
ALTER TABLE "MOVIE_RATING"."movieRating.data::movieRating.Tweets" ADD ("source_str" NVARCHAR(200) GENERATED ALWAYS AS SUBSTR_BEFORE(SUBSTR_AFTER("source", '>'), '<'));

ALTER TABLE "MOVIE_RATING"."movieRating.data::movieRating.Movies" ADD ("release_date_year" NVARCHAR(20) GENERATED ALWAYS AS TO_NVARCHAR("release_date", 'YYYY'));
ALTER TABLE "MOVIE_RATING"."movieRating.data::movieRating.Movies" ADD ("release_date_month" NVARCHAR(20) GENERATED ALWAYS AS TO_NVARCHAR("release_date", 'MON'));
ALTER TABLE "MOVIE_RATING"."movieRating.data::movieRating.Movies" ADD ("release_date_day" NVARCHAR(20) GENERATED ALWAYS AS TO_NVARCHAR("release_date", 'DD'));
ALTER TABLE "MOVIE_RATING"."movieRating.data::movieRating.Movies" ADD ("release_date_week" NVARCHAR(20) GENERATED ALWAYS AS TO_NVARCHAR("release_date", 'WW'));
ALTER TABLE "MOVIE_RATING"."movieRating.data::movieRating.Movies" ADD ("year_str" NVARCHAR(20) GENERATED ALWAYS AS TO_NVARCHAR("year"));