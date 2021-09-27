// conexion a mysql
const mysql = require('mysql');
//
// host dinamicos  
// ---------------------------------------------------
// apuntando al primer servidor   
const HOST_NAME = ''; //  IP server1: 157.230.134.78 (aps.tkontrol.com) 

const config = {
  host     : HOST_NAME,
  user     : '',
  password : '',
  database : '',
  connectTimeout: 20000,
  acquireTimeout: 20000
};

// Create a MySQL pool
// Para la eficiencia, vamos a crear un pool de MySQL, 
// que nos permite utilizar múltiples conexiones a la vez en lugar de tener 
// que manualmente abrir y cerrar conexiones múltiples.
// Por último, a exportar la piscina de MySQL para poder utilizar la aplicación.

export const pool = mysql.createPool(config);



