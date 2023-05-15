const folder = document.querySelector('#folder');
const depdency = document.querySelector('#depdency');
const button = document.querySelector('.button-find')

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
    })
}



console.log(folder, depdency)