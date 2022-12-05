const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const https = require('https');

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

app.get("/", function(req, res){
    res.sendFile(__dirname + "/signup.html");
})

app.post("/", function(req, res){
    const firstName = req.body.fName;
    const lastName = req.body.lName;
    const email = req.body.email;

    const data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName
                }
            }
        ]
    }

    const jsonData = JSON.stringify(data);

    const url = "https://us13.api.mailchimp.com/3.0/lists/03db1089a9";
    const options = {
        method: "POST",
        auth: "Gaurav1:1d871daf1b4bd5f3a47e9c683d3594a7-us13"
    }

    const request = https.request(url, options, function(response){

        if(response.statusCode === 200){
            res.sendFile(__dirname + "/success.html");
        } else {
            res.sendFile(__dirname + "/failure.html");
        }



        // response.on("data", function(data){
        //     console.log(JSON.parse(data));
        // })
    })

    request.write(jsonData);
    request.end();

    //res.send("<h1><em>Cheers!! You're subscribed to the newsletter!!!</em></h1>")
});

app.post("/failure", function(req, res){
    res.redirect("/");
})


app.listen(process.env.PORT || 3000, function(req, res){
    console.log("The Server is running at port 3000")
})

//api key: 1d871daf1b4bd5f3a47e9c683d3594a7-us13
//listid 03db1089a9