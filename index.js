const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const cors = require('cors');
const errorHandler = require('./middleware/error');

//connect DB
connectDB();
const app = express();
app.use(express.json());
app.use(cors());
dotenv.config();

const PORT = process.env.PORT || 5000;

app.get("/", function(req, res){
    res.send("<h1>Hello World</h1>");
})

app.use("/auth", require('./routes/auth'));
app.use("/private", require('./routes/private'));

app.use(errorHandler);

const server = app.listen(PORT, () => {console.log(`Server started in ${PORT}`)});

process.on("unhandledRejection", (err, promise) => {
    console.log(`Logged Error: ${err}`);
    server.close(() => process.exit(1));
});
