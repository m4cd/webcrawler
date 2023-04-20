const { test, expect } = require('@jest/globals')
const { normalizedURL } = require('./crawl.js')
const { getURLsFromHTML } = require('./crawl.js')


//Normalized URL
test('capital letters removal', () => {
  const answer = "wagslane.dev/path"
  expect(normalizedURL("https://WAGSlane.Dev/path")).toEqual(answer);
});

test('slash at the end', () => {
  const answer = "wagslane.dev/path"
  expect(normalizedURL("https://wagslane.dev/path/")).toEqual(answer);
});

//get URLS from html
test('relative to absolute', () => {
  const baseURL = "https://wagslane.dev"
  const htmlBody = `<html>
  <head>
  <title>test</title>
  </head>
  <body>
  <a href="/test1.html"><span>test1</span></a>
  </body>
  </html>`
  const answer = ["https://wagslane.dev/test1.html"]
  expect(getURLsFromHTML(htmlBody, baseURL)).toEqual(answer)
});

test('absolute', () => {
  const baseURL = "https://wagslane.dev"
  const htmlBody = `<html>
  <head>
  <title>test</title>
  </head>
  <body>
  <a href="https://wagslane.dev/test1.html"><span>test1</span></a>
  </body>
  </html>`
  const answer = ["https://wagslane.dev/test1.html"]
  expect(getURLsFromHTML(htmlBody, baseURL)).toEqual(answer)
});


test('both', () => {
  const baseURL = "https://wagslane.dev"
  const htmlBody = `<html>
  <head>
  <title>test</title>
  </head>
  <body>
  <a href="/test1.html"><span>test1</span></a>
  <a href="https://wagslane.dev/test2.html"><span>test2</span></a>
  </body>
  </html>`
  const answer = ["https://wagslane.dev/test1.html", "https://wagslane.dev/test2.html"]
  expect(getURLsFromHTML(htmlBody, baseURL)).toEqual(answer)
});


test('error', () => {
  const baseURL = "https://wagslane.dev"
  const htmlBody = `<html>
  <head>
  <title>test</title>
  </head>
  <body>
  <a href="test1/path"><span>test1</span></a>
  </body>
  </html>`
  const answer = []
  expect(getURLsFromHTML(htmlBody, baseURL)).toEqual(answer)
});