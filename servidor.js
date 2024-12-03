const mysql = require('mysql2');

// Configuración de la conexión a la base de datos
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root', // Cambia al usuario que configuraste
    password: 'Admin', // Cambia a la contraseña correcta
    database: 'BancoDB'
});

// Conectar a la base de datos
connection.connect((err) => {
    if (err) {
        console.error('Error al conectar a la base de datos:', err);
        return;
    }
    console.log('Conexión exitosa a la base de datos BancoDB');
});

// Consultas requeridas
const consultas = [
    {
        titulo: 'Listado de todas las cuentas creadas',
        query: 'SELECT * FROM cuentas;'
    },
    {
        titulo: 'Listado de todos los clientes creados',
        query: 'SELECT * FROM clientes;'
    },
    {
        titulo: 'Listado de todas las cuentas que están asociadas a clientes',
        query: `
            SELECT cuentas.id_cuenta, cuentas.tipo_cuenta, clientes.nombre AS cliente, cuentas.saldo
            FROM cuentas
            JOIN clientes ON cuentas.id_cliente = clientes.id_cliente;
        `
    },
    {
        titulo: 'Listado de todos los clientes que no tienen cuentas asociadas',
        query: `
            SELECT clientes.id_cliente, clientes.nombre
            FROM clientes
            LEFT JOIN cuentas ON clientes.id_cliente = cuentas.id_cliente
            WHERE cuentas.id_cliente IS NULL;
        `
    }
];

// Ejecutar las consultas y mostrar resultados
consultas.forEach((consulta) => {
    connection.query(consulta.query, (err, results) => {
        if (err) {
            console.error(`Error al ejecutar la consulta "${consulta.titulo}":`, err);
            return;
        }
        console.log(`\n** ${consulta.titulo} **`);
        console.table(results); // Mostrar los resultados en formato tabla
    });
});

// Cerrar la conexión después de ejecutar las consultas
setTimeout(() => {
    connection.end((err) => {
        if (err) {
            console.error('Error al cerrar la conexión:', err);
            return;
        }
        console.log('Conexión cerrada.');
    });
}, 2000);
