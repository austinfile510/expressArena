const express = require("express");
const morgan = require("morgan");

const app = express();

// This is middleware that requests pass through
// on their way to the final handler
app.use(morgan("dev"));

//This is the final request handler
app.get("/", (req, res) => {
  res.send("Hello Express!");
});

app.get("/echo", (req, res) => {
  const responseText = `Here are some details of your request:
      Base URL: ${req.baseUrl}
      Host: ${req.hostname}
      Path: ${req.path}
    `;
  res.send(responseText);
});

app.get('/queryViewer', (req, res) => {
    console.log(req.query);
    res.end(); //do not send any data back to the client
  });

  app.get('/greetings', (req, res) => {
    //1. get values from the request
    const name = req.query.name;
    const race = req.query.race;
  
    //2. validate the values
    if(!name) {
      //3. name was not provided
      return res.status(400).send('Please provide a name');
    }
  
    if(!race) {
      //3. race was not provided
      return res.status(400).send('Please provide a race');
    }
  
    //4. and 5. both name and race are valid so do the processing.
    const greeting = `Greetings ${name} the ${race}, welcome to our kingdom.`;
  
    //6. send the response 
    res.send(greeting);
  });

app.get("/burgers", (req, res) => {
  res.send("We have juicy cheese burgers!");
});

app.get("/pizza/pepperoni", (req, res) => {
  res.send("Your pizza is on the way!");
});

app.get("/pizza/pineapple", (req, res) => {
  res.send("We don't serve that here. Never call again!");
});

app.get("/sum", (req, res) => {
  const a = parseInt(req.query.a);
  const b = parseInt(req.query.b);
  res.send("The sum of " + a + " and " + b + " is " + (a + b) + ".");
});

app.get("/cipher", (req, res) => {
  const text = req.query.text;
  const shift = parseInt(req.query.shift);
  let result = "";
  for (let i = 0; i < text.length; i++) {
    const charCode = text.charCodeAt(i);
    const encodedText = String.fromCharCode(charCode + shift);
    result += encodedText;
  }
  res.send(result);
});

app.get("/lotto", (req, res) => {
  const numbers = req.query.numbers;
  const lottoNumbers = {};
  let total = 0;
  for (let i = 0; i < 6; i++) {
    lottoNumbers[Math.floor(Math.random() * 20)] = true;
  }
  for (let i = 0; i < 6; i++) {
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
});

app.listen(8000, () => {
  console.log("Express server is listening on port 8000!");
});
