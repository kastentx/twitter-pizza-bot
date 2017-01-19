var TwitterPackage = require('twitter')
var dotenv = require('dotenv')
dotenv.load()

var secret = {
  consumer_key:         process.env.CONSUMER_KEY,
  consumer_secret:      process.env.CONSUMER_SECRET,
  access_token_key:     process.env.ACCESS_TOKEN,
  access_token_secret:  process.env.ACCESS_TOKEN_SECRET
}
var Twitter = new TwitterPackage(secret)

/* TEST TWEET.. UNCOMMENT THIS TO POST WHEN BOT IS RUN
 *
Twitter.post('statuses/update', {status: 'I like Pizza!'}, function(error, tweet, response) {
  if (error) {
    console.log(error)
  }
  console.log(tweet)        // log the tweet body
  console.log(response)     // log the raw response object
})
*/

Twitter.stream('statuses/filter', {track: '#pizza'}, function(stream) {
  stream.on('data', function(tweet) {
    var hashtags = tweet.entities.hashtags.map(function(entry) {
      return entry.text
    })
    console.log(hashtags)
  })
  stream.on('error', function(error) {
    console.log(error)
  })
})
