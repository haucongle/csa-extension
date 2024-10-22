chrome.runtime.onInstalled.addListener(function() {
  chrome.action.onClicked.addListener(function(tab) {
    chrome.scripting.executeScript({
      target: {tabId: tab.id},
      files: ['content.js']
    });
  });
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.action === 'createTabs') {
    let number = request.number;
    for (let i = 0; i < 10; ++i) {
      setTimeout(() => {
        var url = `https://www.google.com/search?q=site%3Aexamtopics.com+%22exam+CSA+topic+1+question+${number + i}+discussion%22`;
        chrome.tabs.create({ url: url });
      }, i * 2000);
    }
    sendResponse({status: 'done'});
  }
  return true;
});
