test:
	node apple-music.test.js
	node discogs.test.js
	node spotify.test.js

dev:
	sls deploy --stage dev

prod: test
	sls deploy --stage production
