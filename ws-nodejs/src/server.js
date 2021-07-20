const express = require('express');

//ejecutar el framwork de express y guardar en una variable
const app = express();

//middleware morgan
const morgan = require('morgan');

//path
const path = require('path');

//configuracion
app.set('port', process.env.PORT || 8080);
app.set('json spaces', 2);

// archivos estaticos, archivo que se mostrar al iniciar la aplicacion en este caso el index.html
app.use(express.static(path.join(__dirname, 'public')));

//ver por consola lo que me llega del servidor
//el parametro que recibe es el tipo de formato para visualizar los datos por consola
app.use(morgan('dev'));

//permitir al servidor entender formatos json
app.use(express.json());

//permitir al servidor entender datos de un formlario y entender datos de texto planos, 
//inputs etc. nada pesado de imagenes 
app.use(express.urlencoded({extended: false}));

const user_routes = require('./routes/user_ws');

//reoutes
app.use('/userApi', user_routes);

// start server
app.listen(app.get('port'), () => {
    console.log('Server running on port ' + app.get('port'));
});
