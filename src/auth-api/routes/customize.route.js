var express = require('express');
const router = express.Router();
const multer = require('multer');
let path = require('path');
const fs =require('fs');
var dataAccess = require('@pridevel/dataaccess');
var Customize = dataAccess.Customize;
var storage = multer.diskStorage({

    destination: function(req, file, cb) {
        cb(null,'./uploads');
    },
    filename: function(req, file, cb) {   
        cb(null, file.fieldname + '-' + Date.now()   + path.extname(file.originalname));
    }
});

let upload = multer({ storage: storage });

// configuring the upload file for creator fund 
router.post('/upload',upload.array('file',2),(req,res,next)=>
{
    const files = req.files;
    const fund_creator = req.body.name;
    // const fund_logo_image = req.file.filename;
    const text = req.body.editor_text;
    const arr = []
    for (let i = 0; i < req.files.length; i++) {
        let file = req.files[i].path
        arr.push(file)
      }
    if(!files)
    {
        const error = new Error("Please upload a file");
        error.httpStausCode = 400;
        return next(error);
    }
    else if(fund_creator === '' && text === '')
    {
        const error = new Error("Empty fields");
        error.httpStausCode = 400;
        return next(error);
    } 
    else{
        console.log('file path',req.files.path)
        const new_data = new Customize({
            fund_creator_name:fund_creator,
            fund_description:text,
            fund_creator_image_paths:arr
        });
        new_data.save()
        .then(() => res.json({success:'true',message:"Customized Data Added"}))
        .catch(err => res.status(400).json('Error: ' + err));
    }
});


// configure multi file routes
router.get('/upload-sample',(req,res)=>
{
    res.send("Customize api working");
    console.log(Customize);
});

module.exports = router;