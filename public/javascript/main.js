const folder = document.querySelector('#folder');
const depdency = document.querySelector('#depdency');
const button = document.querySelector('.button-find')
const tableCount = document.querySelector('.table-count');
// error(false);

const labelError = document.querySelector('.error');

 // form
 const tBody = document.querySelector('.tbody-list');

button.addEventListener('click', () => {
  error(false);
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

  isActiveLoader(true);

  fetch('/api/read-all-datas', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: payload
  })
    .then(response => response.json())
    .then(data => {

      isActiveLoader(false);
      console.log(data)

      //  creatted table 
      tBodyClass(data);

      countTotal(data);
    }).catch (err => {
      error(true);
    })
}

const error = (isError) => {
  if (isError) {
    labelError.style.display = "block";
    labelError.style.color = "red";
    return;
  }

  labelError.style.display = "none";
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

  entries.sort((a, b) => b[1] - a[1]);

  const sortedObj = {};

  for (let [key, value] of entries) {
    sortedObj[key] = value;
  }

  return sortedObj;
}

const isActiveLoader = (active) => {
  const loader = document.querySelector('.loader');
  console.log(loader)
  if (active) {
    loader.style.display = 'block';
    console.log("Desativadoo");
    return;
  }

  loader.style.display = 'none';

}






console.log(folder, depdency)