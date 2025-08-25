var http = require('http');
const express = require('express');
const app = express(); 
const cors = require('cors');
const fs = require('fs');
const config = require("./config/config");
const db = require("./config/db");

// var bodyParser = require('body-parser');
// app.use(bodyParser.urlencoded({ extended: false })); 
// app.use(bodyParser.json({ extended: true }));

app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(express.static('public')); 

// var credentials = {
//   key: fs.readFileSync('/etc/letsencrypt/live/nodeserver.mydevfactory.com/privkey.pem', 'utf8'),
//   cert: fs.readFileSync('/etc/letsencrypt/live/nodeserver.mydevfactory.com/fullchain.pem', 'utf8')
// };

// var server = require('https').createServer(credentials, app);
var server = http.createServer(app);

const multiparty = require("multiparty");  
app.use((req, res, next) => {
    if (req.headers["content-type"] && req.headers["content-type"].includes("multipart/form-data")) {
        let form = new multiparty.Form(); 
        const arrayParam = ["facilities"];

        form.parse(req, function (err, fields, files) { 
            let bodyData = {};
            for (let key in fields) {
            if (arrayParam.includes(key)) {
                bodyData[key] = JSON.parse(fields[key]);
            } else {
                bodyData[key] = fields[key][0];
            }
            }
            req.body = bodyData;
            // console.log('bodyData', req.body);
            // console.log('files', files);
            req.files = files;
            return next();
        });
    } else {
      return next();
    }
  });


app.use(cors());

const adminRouter = require("./routes/admin.route");
const frontendRouter = require("./routes/frontend.route");

app.use('/api/admin/', adminRouter);
app.use('/api/web/', frontendRouter);
 
server.listen(config.port, (req, res) => {
    console.log('Running...')
})
server.timeout = 25164000;
