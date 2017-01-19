var TwitterPackage = require('twitter')
var dotenv = require('dotenv')
dotenv.load()

var secret = {
  consumer_key:         process.env.CONSUMER_KEY,
  consumer_secret:      process.env.CONSUMER_SECRET,
  access_token_key:         process.env.ACCESS_TOKEN,
  access_token_secret:  process.env.ACCESS_TOKEN_SECRET
}
var Twitter = new TwitterPackage(secret)

Twitter.post('statuses/update', {status: 'I like Pizza!'}, function(error, tweet, response) {
  if (error) {
    console.log(error)
  }
  console.log(tweet)        // log the tweet body
  console.log(response)     // log the raw response object
})
