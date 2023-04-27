//Imports from packages
const express = require('express');
const mongoose = require('mongoose');
const adminRouter = require('./routes/admin');

//Import from other files
const authRouter = require('./routes/auth');
const productRouter = require('./routes/product');
const userRouter = require('./routes/user');

//Init
const PORT = 3000
const app = express();
const DB = "mongodb+srv://Tanmay:Tanmay%402001@cluster0.3bnbusc.mongodb.net/?retryWrites=true&w=majority";


app.get("/first", (req, res) => {
    res.status(200).json({
        type: "success",
        message: "server is up and running",
        data: null,
    });
});


//middleware
app.use(express.json());
app.use(authRouter);
app.use(productRouter);
app.use(adminRouter);
app.use(userRouter);

app.get("/hello-world", (req, res) => {
    res.send("Hello world");
});



async function main() {
    try {
        mongoose.set("strictQuery", false);
        await mongoose.connect(DB, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        console.log("database connected");

        app.listen(process.env.PORT || 3000, () => console.log(`Server listening on port ${PORT}`));
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

main();
