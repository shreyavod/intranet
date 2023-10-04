import mysql from 'mysql2'
//new
// const db = mysql.createConnection({
//     host:'192.168.30.75',
//     user:'user',
//     password:'pass',
//     database:'ecart'   
// })

const db = mysql.createConnection({
    
    user:'root',
    password:'Shreya@1421',
    database:'usermanagement'   
})



export default db
