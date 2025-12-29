const connecttoMongo=require('./db');
const express=require('express');
var cors=require('cors');
connecttoMongo();
const app=express();
app.use(cors({
  origin: '*', // ya specific 'http://localhost:3000'
  credentials: true
}));
app.use(express.json());
app.get('/check', (req, res) => {
  // ...removed unnecessary log...
  res.send("Hello from backend!");
});
app.use('/api/auth',require('./routes/auth.js'));
app.use('/api/notes',require('./routes/notes.js'));
app.get('/health',(req,res)=>{
  return res.json({hello:"good"});
}); // Added closing parenthesis here
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  // ...removed unnecessary log...
});
