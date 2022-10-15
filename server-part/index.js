const express = require('express')
    const cors = require("cors")
    app = express(),
    mongoose = require('mongoose'),
    UsersRoutes=require('./routes/UsersRoutes')
    EventsRoutes=require('./routes/EventsRoutes')
    TodosRoutes=require('./routes/TodosRoutes')
    require("dotenv").config({ path: "./.env" });
// to print incoming requests from mongoose in the terminal
mongoose.set('debug',true)
// =================== setting to use the body of a request ===================
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(cors())

// connecting to mongo and checking if DB is running
async function connecting(){
try {
    await mongoose.connect(process.env.MONGO)
    console.log('Ready to fight')
} catch ( error ) {
    console.log('Houston , we have a PROBLEM !!!');
}
}
connecting()
// end of connecting to mongo and checking if DB is running

// routes
app.use('/users', UsersRoutes);
app.use("/events", EventsRoutes)
app.use("/todos",TodosRoutes)


// Set the server to listen on port 3000
PORT= process.env.PORT || 4040
app.listen(PORT, () => console.log(`server on duty`))