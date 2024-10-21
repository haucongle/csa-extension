document.getElementById('searchButton').addEventListener('click', function() {
  var number = document.getElementById('questionNumber').value;
  var url = `https://www.google.com/search?q=site%3Aexamtopics.com+exam+CSA+topic+1+question+${number}+discussion`;
  chrome.tabs.create({ url: url });
});

document.getElementById('printButton').addEventListener('click', function() {
  chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    chrome.scripting.executeScript({
      target: { tabId: tabs[0].id },
      function: printPage
    });
  });
});

document.getElementById('questionNumber').addEventListener('keypress', function(event) {
  if (event.key === 'Enter') {
    document.getElementById('searchButton').click();
  }
});

function printPage() {
  const buttons = document.querySelectorAll('a.reveal-solution');
  buttons.forEach(button => { button.click(); });
  document.querySelector('div.footer-cert').remove();
  document.querySelector('footer#rs-footer').remove();
  document.querySelector('body > div.sec-spacer.pt-50 > div > div:nth-child(5) > div > div.discussion-page-comments-section').remove();
  document.querySelector('div.contrib__ulimited').remove();
  document.querySelector('div.action-row-container').remove();
  document.querySelector('div.full-width-header').remove();
  setTimeout(() => window.print(), 500);
}
