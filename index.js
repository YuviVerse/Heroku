const   express = require('express'),
        controller = require('./controller.js'),
        app = express(),
        port = process.env.PORT || 5000;
        
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.all('*', (req, res, next) => {
    console.log("New user loged in");
    next();
})
app.get('/getAllCompetitors', (req, res) => {
    controller.getAllCompetitors(res);
});
app.post('/setCompetitorHeight', (req, res) => {
    controller.editCompetitor(req, res);
});
app.put('/getCompetitorAgeWeight', (req, res) => {
    controller.getCompetitorAgeWeight(req, res);
});
app.get('/api', (req, res) => {
    res.redirect("https://documenter.getpostman.com/view/5663684/Rzn9rg6L");
})
app.all('*', (req, res) => {
    res.json("Wrong route");
})
app.listen(port, () => {
    console.log(`Listening on port: ${port}`);
});