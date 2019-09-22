/** global: browser */
/* global browser */
/* eslint-env browser */

// require('downloadjs')(data, strFileName, strMimeType);
import * as download from 'downloadjs';

function getCurrentWindowTabs() {
  return browser.tabs.query({ currentWindow: true });
}

function listInformation() {
  getCurrentWindowTabs().then((tabs) => {
    const toml = document.getElementById('lakespace-draft');
    toml.value = "[draft]\nbrowser = 'firefox'\ntabs = [\n";
    tabs.forEach((tab) => {
      toml.value += `\t"${tab.url}",\n`;
    });
    toml.value += ']';
  });
}

document.addEventListener('DOMContentLoaded', listInformation);

document.addEventListener('click', (e) => {
  if (e.target.id === 'tabs-export') {
    const toml = document.getElementById('lakespace-draft');
    download(toml.value, 'lakespace.toml', 'text/plain');
  }

  e.preventDefault();
});
