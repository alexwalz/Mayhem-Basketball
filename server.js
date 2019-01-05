const express         = require('express');
const path            = require('path');
const bodyParser      = require('body-parser');
const config          = require('./config');
const cors            = require('cors');
const app             = express();
const router          = express.Router();
const db_url          = process.env.MONGODB_URI || config.dbUri
const AWS             = require('aws-sdk');
const fs              = require('fs');
const fileType        = require('file-type');
const bluebird        = require('bluebird');
const multiparty      = require('multiparty');
const port            = process.env.PORT || 5000;


require('dotenv').config();
require('./server/models').connect(db_url);

app.use(express.static(path.join(__dirname, 'client/build')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());



//////////////////// AWS FILE UPLOADS //////////////////////

  
// configure the keys for accessing AWS
AWS.config.update({
    accessKeyId: process.env.AWS_KEY,
    secretAccessKey: process.env.AWS_SECRET
  });
  
  // configure AWS to work with promises
  AWS.config.setPromisesDependency(bluebird);
  
  // create S3 instance
  const s3 = new AWS.S3();
  
  // abstracts function to upload a file returning a promise
  const uploadFile = (buffer, name, type) => {
    const params = {
      ACL: 'public-read',
      Body: buffer,
      Bucket: process.env.S3_BUCKET,
      ContentType: type.mime,
      Key: `${name}.${type.ext}`
    };
    return s3.upload(params).promise();
  };
  
  // Define POST route
  app.post('/api/files', (request, response) => {
    const form = new multiparty.Form();
      form.parse(request, async (error, fields, files) => {
        if (error) throw new Error(error);
        try {
          const path = files.file[0].path;
          const buffer = fs.readFileSync(path);
          const type = fileType(buffer);
          const timestamp = Date.now().toString();
          const fileName = `bucketFolder/${timestamp}-lg`;
          const data = await uploadFile(buffer, fileName, type);
          return response.status(200).send(data);
        } catch (error) {
            console.log(error)
          return response.status(400).send(error);
        }
      });

  });

  ////////////////////  END OF AWS FILE UPLOADS //////////////////////



var allowedOrigins = [
    'http://localhost:3000',
    'http://localhost:5000',
];



app.use(cors({
    origin: function (origin, callback) {
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) === -1) {
            var msg = 'The CORS policy for this site does not ' +
                `allow access from the specified Origin: ${origin}`;
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    }
}));



// Routes
const apiRoutes             = require('./server/routes/api-routes');
const apiRoutesUsers        = require('./server/routes/api-users');
const apiRoutesAuth         = require('./server/routes/api-auth');
const apiRoutesPlayers      = require('./server/routes/api-players');



app.use('/api', apiRoutes);
app.use('/api/users', apiRoutesUsers);
app.use('/api/auth', apiRoutesAuth);
app.use('/api/players', apiRoutesPlayers);




router.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname + '/client/build/index.html'));
});




app.use(router)

app.listen(port, function () {
    console.log(`server running on port ${port}`);
});