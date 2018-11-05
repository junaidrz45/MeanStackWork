import express from 'express';
import cors from 'cors';
import bodyparser from 'body-parser';
import mongoose from 'mongoose';
import Issue from './model/Issue';

const app = express();
const router = express.Router();

app.use(cors());
app.use(bodyparser.json());

mongoose.connect('mongodb://localhost:27017/issues');

const connection = mongoose.connection;

 connection.once('open', () =>{
     console.log('MongoDB data base connection established successfully.');
 });

app.route('/issues').get((req,res) => {
     Issue.find((err,issues) =>{
         if(err)
             console.log(err);
         else {
             //console.log("Returning JSON")
             res.json(issues);
         }
    });
});

// get request with parameter
app.route('/issues/:id').get((req, res) => {
    Issue.findById(req.params.id,(error, issues) => {
        if(error)
            console.log(error);
        else {
            res.json(issues);
        }
    });
});


// create new issue
app.route('/issues/add').post((req, res) => {
    let issue = new Issue(req.body);
    issue.save().then(issue => {
        res.status(200).json({'issue': 'Added Successfully : '+issue.title});
    }).catch(err => {
        res.status(400).send('failed to create new record');
    });
});


app.route('/issues/update/:id').post((req,res) =>{
    Issue.findById(req.params.id,(err , issue) =>{
        if(!issue)
            //return next(new Error('Could not load document'));
            res.json('Document Not found');
        else{
            issue.title = req.body.title;
            issue.responsible = req.body.responsible;
            issue.description = req.body.description;
            issue.severity = req.body.severity;
            issue.status = req.body.status;

            issue.save().then(issue => {
                res.json('update done');
            }).catch( err => {
                res.status(400).send('Update failed');
            });
        }
    });
});

app.route('/issues/delete/:id').get((req,res) => {
    Issue.findByIdAndRemove({_id:req.params.id},(err,issue) =>{
        if(err)
            res.json(err);
        else
            res.json('Record removed SuccessFully : '+req.params.id);
    });
});


app.use('/',router);
//app.get('/', (req,res) => res.send("Hello World"));
app.listen(4000,() => console.log('Express Server running on port 4000'));

