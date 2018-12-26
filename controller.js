const   mongoose = require('mongoose'),
        competitor = require('./competitor');

const   url = process.env.MLAB_URL,
        options = {
            useNewUrlParser: true,
            useCreateIndex: true,
            user: process.env.DB_USER,
            pass: process.env.DB_PASS
        };

mongoose.connect(url,options)
    .then(
        () => {
            console.log("connected");
        },
        err => {
            console.log(`connection error: ${err}`);
        }
 );

 module.exports ={
    //  Geting all Competitors in the DB
    async getAllCompetitors(res){
        await competitor.find({},(err,result) => {
            if (err){
                console.log(`getAll Error: ${err}`)
                return;
            }
            if (result){
                res.json(result);
            }
            else
                res.status(404).send("Can't find Competitor");
        })
    },

    // Edit competitor height
    async editCompetitor(req,res){
        const height = req.body.height;
        if (height < 130 || height > 230 || !height){
            console.log("invalid height");
            res.json("Please enter normal height between 130 to 230")
        }
        await competitor.updateOne({id: req.body.id},{$set:{height: height } },{},(err,result) => {
            if (err){
                console.log(`Error: ${err}`);
                return;
            } 
            else {
                if (result)
                    res.json("Updated");
                else
                    res.json("Can't find Competitor")
            }
        })     
    },

    // Getting competitor age and weight
    async getCompetitorAgeWeight(req,res){
        const age    = req.body.age,
              weight = req.body.weight;
        if (age < 35 || age > 120 || weight < 50 || weight > 200){
            console.log("Invalid age or weight");
            res.json("Invalid Age or Weight, please choose age between 35 and 120, and weight between 50 to 200");
            return;
        }
        await competitor.find({age: age, weight: weight}, (err,result) => {
            if (err) {
                console.log(`Error: ${err}`);
                return;
            }
            if (result)
                res.json(result)
            else
                res.json("can't find Competitor")
        })
    },
}