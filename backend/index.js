const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql2');
const req = require('express/lib/request');
const res = require('express/lib/response');

const app = express();

app.use(cors());
app.use(bodyparser.json());



const db = mysql.createConnection({

    host: 'localhost',
    user: 'root',
    password: 'H@rd2F@nd',
    database: 'formregister',
    port: 3306

});



db.connect(err => {

    if (err) { console.log(err, 'db err'); }
    console.log('database connected...');

})

// Getting data 

app.get('/persons', (req, res) => {

    let qr = 'select * from persons ';

    db.query(qr, (err, result) => {

        if (err) {
            console.log(err, 'errs');

        }
        if (result.length > 0) {
            res.send({
                message: 'all persons data',
                data: result

            });
        }
    });


});





app.post('/persons', (req, res) => {

    console.log(req.body, 'createdata');


    let fisrtname = req.body.fisrtname;
    let lastName = req.body.lastname;
    let email = req.body.email;
    let dob = req.body.dob;
    let phone = req.body.phone;


    let qr = `insert into persons(fisrtname,lastname,email,dob,phone)
         values('${fisrtname}','${lastName}','${email}','${dob}','${phone}')`;

    db.query(qr, (err, result) => {
        if (err) { console.log(err); }
        console.log(result, 'result')
        res.send({
            message: 'Registation success',

        });

    });


});
app.put('/persons/:id', (req, res) => {

    console.log(req.body, 'updatedata');

    let gID = req.params.id;
    let fisrtname = req.body.fisrtname;
    let lastName = req.body.lastname;
    let email = req.body.email;
    let dob = req.body.dob;
    let phone = req.body.phone;
    let qr = `update persons set fisrtname ='${fisrtname}',lastname ='${lastName}',email='${email}' ,dob='${dob}',phone='${phone}'
              where id =${gID}`;

    db.query(qr, (err, result) => {
        if (err) { console.log(err); }

        res.send({

            message: 'Data Updated Successfully'

        });

    });
})
app.delete('/persons/:id', (req, res) => {

    let qID = req.params.id;

    let qr = `delete from persons where id ='${qID}'`;
    db.query(qr, (err, results) => {
        if (err) { console.log(err); }


        res.send(
            {
                message: 'DATA DELECTED....'
            }
        )
    });
});





app.listen(3005, () => {
    console.log('serve running');
}
);

