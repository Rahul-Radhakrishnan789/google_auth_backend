const express = require('express')
const app = express()
const cors = require('cors')
const morgan = require('morgan')
const fetch = (...args) =>
          import("node-fetch").then(({default:fetch}) => fetch(...args))

          

const CLIENT_ID = "7c094a1449a6640bbc50";
const CLIENT_SECRET = "570367e5433f4dc516bb561b5f0afab935b934b8"


require('dotenv').config(); 


const corsOptions = {
    origin: 'http://localhost:5173', 
  };
  
app.use(cors(corsOptions));  
app.use(express.json())
app.use(morgan('dev'));

//github login step 1

app.get('/getAccessToken',async (req,res) => {


    const params = "?client_id=" + CLIENT_ID + "&client_secret=" + CLIENT_SECRET + "&code=" + req.query.code

    await fetch("https://github.com/login/oauth/access_token" + params, {
        method:"POST",
        headers:{
            "Accept":"application/json"
        }
    }).then((response) => {
        return response.json()
    }).then((data) => {
        console.log("data",data)
        return res.json(data)
    })
})

// github get userData step 2

app.get('/getUserData',async (req,res) => {


    await fetch("https://api.github.com/user" , {
        method:"GET",
        headers:{
            "Authorization": req.get("Authorization")
        }
    }).then((response) => {
        return response.json()
    }).then((data) => {
        console.log(data)
        return res.json(data)
    })
})



// if you are creating a backend logic with useGoogleLogin

// app.post('/api/auth/google', (req, res) => {
//     const { token } = req.body;
//     const client_id = '203571099479-rksr2l7odk6d8m71nrk8n2g1jv5aerpo.apps.googleusercontent.com';
//     const client_secret = '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';
//     const redirect_uri = 'http://localhost:5173';
//     const grant_type = 'authorization_code';
  
//     fetch('<https://oauth2.googleapis.com/token>', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/x-www-form-urlencoded',
//       },
//       body: new URLSearchParams({
//         code,
//         client_id,
//         client_secret,
//         redirect_uri,
//         grant_type,
//       }),
//     })
//     .then(response => response.json())
//     .then(tokens => {
//       // Send the tokens back to the frontend, or store them securely and create a session
//       res.json(tokens);
//     })
//     .catch(error => {
//       // Handle errors in the token exchange
//       console.error('Token exchange error:', error);
//       res.status(500).json({ error: 'Internal Server Error' });
//     });
//   });
  

  app.listen(2000,() =>{
    console.log("server listening on port 2000")
})