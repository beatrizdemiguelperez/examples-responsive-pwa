let table;
const lines = [];
let currentLine = 0;

document.addEventListener("DOMContentLoaded", (event) =>{
  console.log("DOM fully loaded and parsed");

  table = document.querySelector('#table tbody');

  getCsv();

  window.addEventListener('scroll', checkScroll);
});

function getCsv(){
  const csvFileUrl = 'https://raw.githubusercontent.com/josex2r/60fps-workshop/master/public/assets/example.csv';
  
  return fetch(csvFileUrl).then((response) => 
    response.text()
  ).then((text) => {
      processData(text);
  });
}


function processData(allText) {
  parseData(allText);

  checkScroll();
}

function checkScroll() {
  const wrapper = document.body;

  if (currentLine < lines.length &&
    wrapper.scrollHeight - window.outerHeight - 600 <= wrapper.scrollTop) {
    renderLine(lines[currentLine]);
    currentLine++;
    checkScroll();
  }
}

function renderLine(items) {
  table.appendChild(renderRow(items));
}

function renderRow(items) {
  const tr = document.createElement('tr');

  items.forEach(item => {
    const td = document.createElement('td');

    item.split('').forEach((char) => {
      let span = document.createElement('span');

      td.appendChild(span);

      new Array(10).fill(0).forEach(() => {
        const tmp = document.createElement('span');

        span.appendChild(tmp);

        span = tmp;
      });

      span.textContent = char;
    })

    tr.appendChild(td);
  });

  return tr;
}


function parseData(allText) {
  const allTextLines = allText.split(/\r/);
  const headers = allTextLines[0].split(',');

  for (let i=1; i<allTextLines.length; i++) {
    const data = allTextLines[i].split(',');

    if (data.length == headers.length) {
      const tarr = [];

      for (let j=0; j<headers.length; j++) {
        tarr.push(data[j]);
      }
      lines.push(tarr);
    }
  }
}
