chrome.runtime.onInstalled.addListener(function () {
  chrome.action.onClicked.addListener(function (tab) {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      files: ['content.js']
    });
  });
});

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action === 'createTabs') {
    let number = request.number;
    for (let i = 0; i < 10; ++i) {
      setTimeout(() => {
        var urls = [
          `https://www.google.com/search?q=`,
          `https://www.bing.com/search?q=`,
          `https://duckduckgo.com/?t=h_&q=`,
          `https://search.brave.com/search?q=`,
          `https://swisscows.com/en/web?query=`,
          `https://search.yahoo.com/search?p=`,
        ];
        const query = `site%3Aexamtopics.com+%22exam+CAD+topic+1+question+${number + i}+discussion%22`
        chrome.tabs.create({ url: urls[i % urls.length] + query });
      }, i * 2000);
    }
    sendResponse({ number: number });
  }
  return true;
});
