const express = require("express");
const app = express();

app.get('/', (req, res) => {
    res.send('Hello Express!');
  });

app.get('/burgers', (req, res) => {
    res.send('We have juicy cheese burgers!');
  });

app.get('/test', (req, res) => {
    res.send('test!');
  });

app.get('/sum', (req,res) => {
  
    var numbers=true;

    const a = req.query.a;
    const b = req.query.b;

    if (!a || !b || isNaN(a) || isNaN(b))
        return res.status(400).send("Numbers values for a and b must be provided");
    
    res.send(`The result of a + b is: ${Number(a) + Number(b)}`);
});

app.get('/cipher', (req,res) => {

    const cipher = req.query.cipher;
    var shift = req.query.shift;

    if (!cipher || !shift || isNaN(shift))
        return res.status(400).send("This api requires cipher as text and shift as a number");

    shift=Math.floor(shift);

    retstr="";
    for (var i=0; i<cipher.length; i++) {
        retstr = retstr.concat(String.fromCharCode(cipher.charCodeAt(i) + shift));
    }

    res.send(`The cipher is ${retstr}`);        

});

function arrayOfNumbers(arr) {

    retval=false;

    for (var i=0; i<arr.length; i++) {

        if (isNaN(arr[i]))
            return retval;       
    }

    return true;

}

app.get('/lotto', (req, res) => {

    var arr = req.query.arr;

    if (!arr || (arr.length < 6) || !arrayOfNumbers(arr))
        return res.status(400).send("This api requires an array(arr) of 6 numbers");

    arr = arr.map(a => Number(a));

    var randomArr = [];

    for (var i=0; i<6; i++) {

        randomArr.push(Math.floor((20 * Math.random()) + 1));
    }

    var matchCount = 0;

    var retstr = `Your numbers are: ${arr}<br>`;
    retstr = retstr.concat(`The random numbers are: ${randomArr}<br><br>`);

    for (i=0; i<6; i++) {

        if (arr.indexOf(randomArr[i]) != -1) {
            matchCount++;
        }
    }

    switch(matchCount) {
        case 4:
            retstr = retstr.concat("Congratulations, you win a free ticket")
            break;
        case 5:
            retstr = retstr.concat("Congratulations! You win $100!")
            break;
        case 6:
            retstr = retstr.concat("Wow! Unbelievable! You could have won the mega millions!")
            break;
        default:
            retstr = retstr.concat("Sorry, you lose");
    }

    res.send(retstr);
});

app.listen(8000, () => {
    console.log("Express server is listening on port 8000!");
});