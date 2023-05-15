const folder = document.querySelector('#folder');
const depdency = document.querySelector('#depdency');
const button = document.querySelector('.button-find')
const tableCount = document.querySelector('.table-count');


 // form
 const tBody = document.querySelector('.tbody-list');

button.addEventListener('click', () => {
  console.log(folder, depdency)
  postData();
})

function postData() {

  const folderValue = folder.value;
  const depdencyValue = depdency.value;


  // console.log(depdencyValue, folderValue)

  const payload = JSON.stringify({
    folder: folderValue,
    depedency: depdencyValue
  })

  console.log(payload)

  cleanTable();

  fetch('/api/read-all-datas', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: payload
  })
    .then(response => response.json())
    .then(data => {
      console.log(data)

      //  creatted table 
      tBodyClass(data);

      countTotal(data);



    })
}

function tBodyClass(data) {
  tBody.innerHTML = "";

  if (data.length) {
    data.forEach(item => {
      tBody.innerHTML += `
        <tr>
          <td>${item.file}</td>
          <td>${item.usedDepedency}</td>
          <td>${item.pathRelative}</td>
        </tr>
      `
    })
  } else {

  }
}

const countTotal = (data) => {
  let result = {};

  data.forEach(obj => {
    obj.usedDepedency.forEach(str => {
      result[str] = (result[str] || 0) + 1;
    });
  });

  result = sortObjectByValue(result);

  tbodyCount(result);
  
}

const tbodyCount = (result) => {
  const thead = document.createElement('thead');
  const tbody = document.createElement('tbody');

  const headerRow = document.createElement('tr');
  const headerCol1 = document.createElement('th');
  const headerCol2 = document.createElement('th');

  headerCol1.innerHTML = "name";
  headerCol2.innerText = "Counts";

  // tableCount.setAttribute('class')

  headerRow.appendChild(headerCol1);
  headerRow.appendChild(headerCol2);

  thead.appendChild(headerRow);

  tableCount.appendChild(thead);

  Object.keys(result).forEach(key => {
    const bodyRow = document.createElement('tr');
    const bodyCol1 = document.createElement('td');
    const bodyCol2 = document.createElement('td');

    bodyCol1.innerText = key;
    bodyCol2.innerText = result[key];

    bodyRow.appendChild(bodyCol1)
    bodyRow.appendChild(bodyCol2)

    tbody.appendChild(bodyRow);
  });

  tableCount.appendChild(tbody);
}

const cleanTable = () => {
  tBody.innerHTML = "";
  tableCount.innerHTML = '';
}

const sortObjectByValue = (obj) => {
  const entries = Object.entries(obj);

  entries.sort((a, b) => a[1] - b[1]);

  const sortedObj = {};

  for (let [key, value] of entries) {
    sortedObj[key] = value;
  }

  return sortedObj;
}






console.log(folder, depdency)