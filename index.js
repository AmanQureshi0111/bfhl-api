const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Helper functions
function isNumeric(str) {
  return !isNaN(str) && !isNaN(parseFloat(str));
}

function alternatingCaps(str) {
  let result = "";
  for (let i = 0; i < str.length; i++) {
    result += i % 2 === 0 ? str[i].toUpperCase() : str[i].toLowerCase();
  }
  return result;
}


app.get("/", (req, res) => {
    res.send("BFHL server is running!");
});


// API route
app.post("/bfhl", (req, res) => {
  try {
    const inputArray = req.body.data;

    if (!inputArray || !Array.isArray(inputArray)) {
      return res.status(200).json({ is_success: false });
    }

    let odd_numbers = [];
    let even_numbers = [];
    let alphabets = [];
    let special_characters = [];
    let sum = 0;

    inputArray.forEach((item) => {
      if (isNumeric(item)) {
        let num = parseInt(item);
        sum += num;
        if (num % 2 === 0) {
          even_numbers.push(item.toString());
        } else {
          odd_numbers.push(item.toString());
        }
      } else if (/^[a-zA-Z]+$/.test(item)) {
        alphabets.push(item.toUpperCase());
      } else {
        special_characters.push(item);
      }
    });

    // Make concat string
    let concat = alphabets.join("");
    let reversed = concat.split("").reverse().join("");
    let concat_string = alternatingCaps(reversed);

    res.status(200).json({
      is_success: true,
      user_id: "aman_qureshi_25022004",  
      email: "amanq7362@gmail.com",      
      roll_number: "22BCB0111",        
      odd_numbers,
      even_numbers,
      alphabets,
      special_characters,
      sum: sum.toString(),
      concat_string,
    });
  } catch (error) {
    res.status(200).json({ is_success: false, message: error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
