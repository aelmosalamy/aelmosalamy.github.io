"use strict"

// Capturing dynamic elements
var newQuote = document.getElementById("new-quote")
var tweetQuote = document.getElementById("tweet-quote")
var quoteText = document.getElementById("text")
var quoteAuthor = document.getElementById("author")
var quoteBox = document.getElementById("quote-box")
var quoteBoxContent = document.getElementById("box-content")

// Init
window.onload = () => {
  // Creating a global variable 'request'
  window.request = new XMLHttpRequest()
  request.addEventListener('load', () => {
  // request.response is an Object that only exists after request 'load'
  // Parsing the response string
  window.jsonQuoteData = JSON.parse(request.response)
  // Capturing the "quotes" list inside our JSON Object
  window.quotes = jsonQuoteData["quotes"]
  displayNewQuote(quotes)
  })
  // Sending our request to fetch 'quotes.json' from the server
  request.open("GET", "./quotes.json")
  request.send()
}

// New quote onclick handler
newQuote.onclick = () => {
  // Stylishly fade the quoteBox's inner contents and reveal after DOM has been tweaked
  // Total transition time 400ms
  quoteBoxContent.classList.add("fade") // 200ms to finish
  setTimeout(() => {
    displayNewQuote(quotes) // Display a new quote
    quoteBoxContent.classList.remove("fade") // another 200ms to finish
  }, 200) // Remove .fade after transition completion
}

// Given a list of quotes, randomly choose one then tweek the DOM to display it
const displayNewQuote = (quotes) => {
  var quoteIndex = Math.floor(Math.random() * quotes.length)
  var quote = quotes[quoteIndex]
  var text, author
  [text, author] = [quote[0], quote[1]]
  setQuote(text, author)
  // Change the href of tweet-quote button
  var newHref = `https://twitter.com/intent/tweet?hashtags=quotes,wisdom&text=${text + ' - ' + author}`
  tweetQuote.href = newHref
}

// Given a quote's text and author, tweek the DOM to display each parameter
const setQuote = (text, author) => {
  quoteText.innerHTML = text
  quoteAuthor.innerHTML = author
}