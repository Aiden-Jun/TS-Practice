import express from 'express';
const app = express();
const port = 3000;

app.get('/add-user', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  return res.json({});
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
