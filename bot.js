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
var fiveMins  = ((1000 * 60) * 5)
var cachedTweet = ''

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
    console.log('Pizza Tags:' + hashtags)
  })
  stream.on('error', function(error) {
    console.log(error)
  })
})

Twitter.stream('statuses/filter', {track: '#PizzaAlien'}, function(stream) {
  stream.on('data', function(tweet) {
    var mentionUser = '@' + tweet.user.screen_name
    var mentionStrings = [
      'Hey ' + mentionUser + '... You got some pizza for THIS alien??', 
      'I\'d like to learn more about pizza here on Earth. Can you teach me ' + mentionUser + '?',
      'One thing is for sure. 2017 is the year the Galactic Pizza Prophecy will be fulfilled. Mark my words ' + mentionUser]
    var randomMsg = mentionStrings[Math.floor(Math.random() * mentionStrings.length)]
    
    Twitter.post('statuses/update', {status: randomMsg})
      .then(function(tweet) {
        console.log(tweet)
      })
      .catch(function(error) {
        throw error
      })
    })
  stream.on('error', function(error) {
    console.log(error)
  })
})

setInterval(function() {
  Twitter.get('search/tweets', {q: 'pizza'}, function(error, tweets, response) {
    var foundTweet = tweets.statuses[0].text
    if (foundTweet != cachedTweet) {
      console.log('Newest Search Result: ' + foundTweet)
      cachedTweet = foundTweet
    }
  })
}, fiveMins)
