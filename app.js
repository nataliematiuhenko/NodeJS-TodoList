const helmet = require('helmet');
const bodyParser = require('body-parser')
const jsonParser = bodyParser.json()
const express = require('express');
const app = express();
const api = require('./routes');

app.use(express.json());
app.use(helmet());
app.use(jsonParser); 
app.use(bodyParser.urlencoded({ extended: false }));

// Authorization

app.use((req, res, next) => {
    console.log(req.headers.authorization);
    if(req.headers.authorization === "1111" ) {
        res => console.log("AUTH SUCCESS");
        next();
    } else {
        res.status(403);
        next('Authorization failed. Access denied');
     
    }
});

app.use('/api', api);


//error handler

app.use("", (err, req, res, next ) => {
    if (err === 'authorization failed') {
      res.status(403).json({ Error: err });
    } else {
      res.status(400).json({ Error: err });
    }
  });

const port = process.env.PORT || 3000

app.listen(port, () => console.log(`Listening to port ${port}`))