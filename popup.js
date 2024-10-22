// Load the stored question number when the popup is opened
document.addEventListener('DOMContentLoaded', function() {
  var storedNumber = localStorage.getItem('questionNumber');
  if (storedNumber) {
    document.getElementById('questionNumber').value = storedNumber;
  }
});

document.getElementById('searchButton').addEventListener('click', function () {
  var number = document.getElementById('questionNumber').value;
  localStorage.setItem('questionNumber', number); // Store the value
  var url = `https://www.google.com/search?q=site%3Aexamtopics.com+%22exam+CSA+topic+1+question+${number}+discussion%22`;
  chrome.tabs.create({ url: url });
});

document.getElementById('printButton').addEventListener('click', function () {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.scripting.executeScript({
      target: { tabId: tabs[0].id },
      function: printPage
    });
  });
});

document.getElementById('questionNumber').addEventListener('keypress', function (event) {
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

  const style = document.createElement('style');
  style.textContent = `
    @media print {
      @page {
        size: A5 landscape;
      }
      div.sec-spacer {
        padding: 0 !important;
      }
    }
  `;
  document.head.append(style);

  setTimeout(() => window.print(), 500);
}
