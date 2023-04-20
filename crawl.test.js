const { test, expect } = require('@jest/globals')
const { normalizedURL } = require('./crawl.js')

answer = "wagslane.dev/path"

test('capital letters removal', () => {
    expect(normalizedURL("https://WAGSlane.Dev/path")).toBe(answer);
  });

  test('slash at the end', () => {
    expect(normalizedURL("https://wagslane.dev/path/")).toBe(answer);
  });