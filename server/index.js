const express = require('express');
const path = require('path');
const fs = require('fs');

const router = express.Router;

const app = express();
const port = 3001;

// run static content the folder "public"
// app.use(express.static('public'));
app.use(express.static(path.join(__dirname, '../public')));


app.use(express.urlencoded({ extended: true }));
app.use(express.json());  

// execute file index.html
app.get('https://manager-reports.vercel.app/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public', 'index.html'));
})

app.post('/api/read-all-datas', (req, res) => {
  const folder = req.body.folder;
  const depedency = req.body.depedency;

  console.log(folder, depedency, req.body);

  const result = findDepedencySync(folder, depedency);

  res.header("Access-Control-Allow-Origin", "*");
  res.json(result);
})

const findDepedencySync = (folder, depedency, root = folder) => {
  const files = fs.readdirSync(folder);
  const results = [];

  console.log('CHAMEI', files)

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    console.log(file);
    if (file.startsWith('node_modules') || file.startsWith('.git') || file.startsWith('coverage')) {
      continue;
    }

    const pathComplet = path.join(folder, file);
    const pathRelative = path.relative(root, pathComplet);
    const stats = fs.statSync(pathComplet);

    if (stats.isDirectory()) {
      const aboutResult = findDepedencySync(pathComplet, depedency, root);
      results.push(...aboutResult);
    } else {
      const lines = fs.readFileSync(pathComplet, { encoding: 'utf-8' }).split('\n');

      for (let l = 0; l < lines.length; l++) {
        let line = lines[l];

        if (line.includes(depedency)) {
          line = filterOnClass(line);

          const object = {
            file: file,
            usedDepedency: line,
            pathRelative: pathRelative
          }

          results.push(object);
          break;

        }

      }
    }

  }
  console.log(results)

  return results;
}

const filterOnClass = (words) => {
  const onlyClass = /\{([\s\S]*?)\}/;
  const removeSpace = /\s/g;

  if (onlyClass.test(words)) {
    const classList = words.match(onlyClass)[1];
    return classList.replace(removeSpace, '').split(',');
  }

  return [];
}

// run the server
app.listen(port, () => {
  console.log(`server run in port ${port}`);
})
