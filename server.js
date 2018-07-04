var express = require('express');    //Express Web Server 
var busboy = require('connect-busboy'); //middleware for form/file upload
var path = require('path');     //used for file path
var fs = require('fs-extra');       //File System - for file manipulation

var app = express();
app.use(busboy());
app.use(express.static(path.join(__dirname, 'public')));

/* ========================================================== 
Create a Route (/upload) to handle the Form submission 
(handle POST requests to /upload)
Express v4  Route definition
============================================================ */
app.route('/upload')
    .post(function (req, res, next) {

        var fstream;
        req.pipe(req.busboy);
        req.busboy.on('file', function (fieldname, file, filename) {

            if (filename == undefined || filename == "") {
                return res.redirect('/'); 
            } 

            console.log("Uploading: " + filename);

            //Path where image will be uploaded
            // fstream = fs.createWriteStream(__dirname + '/public/img/' + filename);
            fstream = fs.createWriteStream(__dirname + '/public/img/' + "image.png");
            file.pipe(fstream);
            fstream.on('close', function () {    
                // console.log("Upload Finished of " + filename);              
                console.log("Upload Finished of " + "image.png");              

                // return res.redirect(307, '/listDir'); // 307 - redirects POST
                return res.redirect('/imageView.html'); 

            });
        });
        
    });

var server = app.listen(3030, function() {
    console.log('Listening on port %d', server.address().port);
});

app.post('/listDir', function(req, res) {
    console.log("bla nahuy");

    const directory = './public/img/';

    // List files in directory
    fs.readdir(directory, (err, files) => {
        files.forEach(file => {
          console.log("\n\n");
          console.log(file);      
        });
        // deleteFiles(directory);
      })
    // res.sendStatus(200);
    return res.redirect('/imageView.html');
  });
  

function deleteFiles(directory) {
    fs.readdir(directory, (err, files) => {
        if (err) throw err;
        for (const file of files) {
            fs.unlink(path.join(directory, file), err => {
            if (err) throw err;
            });
        }
    });
}

///////////////////////////////////
// PYTHON
///////////////////////////////////

app.post('/process', callName);
 
function callName(req, res) {
     
    var sys = require('util');

    var projectPath = __dirname;  // Users/yujin/Desktop/nodePytonWithNN
    var imagePath = __dirname + "/public/img/image.png"; // Users/yujin/Desktop/nodePytonWithNN/public/img/image.png

    console.log("projectPath: " + projectPath.toString());
    console.log("Image Path: " + imagePath.toString());

    var spawn = require("child_process").spawn;
          
    var process = spawn('python',["./Python_NN/app_image_caption.py",
    // var process = spawn('python',["./Python_NN/test.py",
                                projectPath.toString(),
                                imagePath.toString()] );
 
    // Takes stdout data from script which executed
    // with arguments and send this data to res object
    process.stdout.on('data', function(data) {
        console.log("\n\nResponse from python: " + data.toString());

        // var retryButton = "<form action=\"/\" method=\"get\"><button>Retry</button></form>";
        // var comment = "<img src=\"/img/image.png\" width=\"500\"><div class=\"messages\">" + data.toString() + "</div>";
        // comment = comment + retryButton;
        // res.send(comment);

        res.send(data.toString());

    })
    
}

