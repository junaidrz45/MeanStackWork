import express from 'express';
import cors from 'cors';
import bodyparser from 'body-parser';
import mongoose from 'mongoose';
import Issue from './model/Issue';

const app = express();
const router = express.Router();

app.use(cors);
app.use(bodyparser.json);

mongoose.connect('mongodb://localhost:27017/issues',{useNewUrlParser:true});

const connection = mongoose.connection;

connection.once('open', () =>{
    console.log('MongoDB data base connection established successfully.');
});

router.route('/issues').get((req,res) => {
     Issue.find((err,issues) =>{
         if(err)
             console.log(err);
         else {
             console.log("Returning JSON")
             res.json(issues);
         }
    });
});

router.route('issues/:id').get((req,res) =>{
    Issue.findById(req.param.id,(req,issues) =>{
       if(err)
           console.log(err);
       else {
           console.log("Returnign JSONS")
           res.json(issues);
       }
    });
});

router.route('issues/add').post((req,res) =>{
    let issue = new Issue(req.body);
    issue.save()
        .then( issue => {
            res.status(200).json({'issue' : 'Added successfully'});
        })
        .catch(err =>{
            res.status(400).send('Failed to create new Record');
        });
});

router.route('issues/update/:id').post((req,res) =>{
    Issue.findById(req.param.id,(err , issue) =>{
        if(!issue)
            return next(new Error('Could not load document'));
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

router.route('issues/delete/:id').get((req,res) => {
    Issue.findByIdAndRemove({_id:req.param.id},(err,issue) =>{
        if(err)
            res.json(err);
        else
            res.json('Record removed SuccessFully : '+req.param.id);
    });
});


app.use('/',router);
//app.get('/', (req,res) => res.send("Hello World"));
app.listen(4000,() => console.log('Express Server running on port 4000'));

