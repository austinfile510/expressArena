const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send('Hello Express!');
  });

app.get('/sum', (req, res) => {
    const a = parseInt(req.query.a);
    const b = parseInt(req.query.b);
    res.send('The sum of ' + a + ' and ' + b + ' is ' + (a+b)  + '.');
})

app.get('/cipher', (req, res) => {
    const text = req.query.text;
    const shift = parseInt(req.query.shift);
    let result = "";
    for (let i=0; i < text.length; i++) {
        const charCode = text.charCodeAt(i);
        const encodedText = String.fromCharCode(charCode+shift);
        result += encodedText;
    }
    res.send(result);
})

app.get('/lotto', (req, res) => {
    const numbers = req.query.numbers;
    const lottoNumbers = {};
    let total = 0;
    for (let i=0; i < 6; i++) {
        lottoNumbers[Math.floor(Math.random() * 20)] = true;
    }
    for (let i=0; i < 6; i++) {
        if (lottoNumbers[numbers[i]] == true) {
            total++;
        }
    }
    if (total == 6) {
        res.send("Wow! Unbelievable! You could have won the mega millions!");
    } else if (total == 5) {
        res.send("Congratulations! You win $100!");
    } else if (total == 4) {
        res.send("Congratulations, you win a free ticket.");
    } else {
        res.send("Sorry, you lose.");
    }
})

app.listen(8000, () => {
    console.log('Express server is listening on port 8000!');
})