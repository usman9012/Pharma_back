// noinspection JSCheckFunctionSignatures

let createError = require('http-errors');
let express = require('express');
const session = require('express-session')
let mongoStore = require('connect-mongo')(session)
let path = require('path');
let cookieParser = require('cookie-parser');
let mongoose = require('mongoose')
let passport = require('passport')

require('./config/authStrategies')(passport)


// route setup
const logOut = require('./routes/Login/logOut')
const logIn = require('./routes/Login/login');
const login = require('./routes/Login/employeeLogin');
const signUp = require('./routes/usersSignUp');
const medicine = require('./routes/employee Menu/medicine')
const employee = require('./routes/empoyeeSignUp')
const customerMenu = require('./routes/customer Menu/customerMenu')
const employeeMenu = require('./routes/employee Menu/employeeMenu')
const index = require('./routes/index')
const allMedicine = require('./routes/employee Menu/allMedicine')
const deleteMedicine = require('./routes/employee Menu/deleteItem')
const orderMedicine = require('./routes/customer Menu/orderMedicine')
let app = express();
const  profile = require('./routes/customer Menu/uploadPic')
const flash = require('connect-flash')

// Db connection
mongoose.connect(
    'mongodb+srv://usman:usman@cluster0.pnrfz.mongodb.net/<PHARMA>?retryWrites=true&w=majority',
    {useNewUrlParser:true, useUnifiedTopology:true, useCreateIndex:true},

).then(()=>{
         app.listen(3000)}
    )
    .catch(error=>console.log(error))

module.exports = app;




// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({

    secret: '7861',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 3000000 *60
    },
    store: new mongoStore({
        mongooseConnection: mongoose.connection,
        collection: 'session',
        ttl: 28800
      })
    }

))
app.use(passport.initialize())
app.use(passport.session())
app.use(flash())
/**app.use((req, res, next)=>{

})**/


// route use

app.use(logIn);
app.use(login);
app.use(signUp);
app.use(medicine);
app.use(employee);
app.use(customerMenu);
app.use(employeeMenu);
app.use(logOut);
app.use(index);
app.use(allMedicine);
app.use(deleteMedicine);
app.use(orderMedicine);
app.use(profile);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
