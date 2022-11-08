const express = require('express');
const path = require('path');
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, '../client/dist')));


let PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Listening at Port: ${PORT}`);
})