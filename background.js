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
          `https://www.google.com/search?q=site%3Aexamtopics.com+%22exam+CSA+topic+1+question+${number + i}+discussion%22`,
          `https://www.bing.com/search?q=site%3Aexamtopics.com+%22exam+CSA+topic+1+question+${number + i}+discussion%22`,
          `https://duckduckgo.com/?t=h_&q=site%3Aexamtopics.com+%22exam+CSA+topic+1+question+${number + i}+discussion%22`,
          `https://search.brave.com/search?q=site%3Aexamtopics.com+%22exam+CSA+topic+1+question+${number + i}+discussion%22`,
          `https://swisscows.com/en/web?query=site%3Aexamtopics.com+%22exam+CSA+topic+1+question+${number + i}+discussion%22`,
          `https://search.yahoo.com/search?p=site%3Aexamtopics.com+%22exam+CSA+topic+1+question+${number + i}+discussion%22`,
          // `https://yandex.com/search/?text=site%3Aexamtopics.com+%22exam+CSA+topic+1+question+${number + i}+discussion%22`,
          // `https://coccoc.com/search?query=exam+CSA+topic+1+question+${number + i}+discussion+site%3Aexamtopics.com`,
        ];
        chrome.tabs.create({ url: urls[i % urls.length] });
      }, i * 1000);
    }
    sendResponse({ number: number });
  }
  return true;
});
