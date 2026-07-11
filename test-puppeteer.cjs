const puppeteer = require('puppeteer');
const express = require('express');
const path = require('path');

const app = express();
app.use(express.static(path.join(__dirname, 'dist')));

const server = app.listen(3000, async () => {
  console.log('Server started');
  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();
  
  page.on('console', msg => console.log('PAGE LOG:', msg.text()));
  page.on('pageerror', error => console.log('PAGE ERROR:', error.message));
  page.on('requestfailed', request => console.log('REQUEST FAILED:', request.url(), request.failure().errorText));
  
  console.log('Navigating to http://localhost:3000/');
  await page.goto('http://localhost:3000/');
  
  await new Promise(r => setTimeout(r, 5000));
  
  const content = await page.content();
  console.log('CONTENT LENGTH:', content.length);
  
  await browser.close();
  server.close();
});
