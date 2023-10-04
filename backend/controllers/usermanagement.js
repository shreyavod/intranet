import db from "../config/connectiondb.js"

export const adduser = (req,res)=>{
    console.log(req.body)
    const values=[req.body.firstName,req.body.lastName,req.body.email,req.body.select_company,req.body.gender,req.body.country,req.body.about_yourself,req.body.birth_date,req.body.emp_access,req.body.emp_status]

    const q='INSERT INTO user_data (firstname,lastname, email, select_company, gender, country, about_yourself, birth_date, emp_access, emp_status) values(?)'
    db.query(q,[values],(err,result)=>{
        if (err){
            res.status(500).json('error occured try again!')
        }else{
            res.status(200).json('user added successfully')
        }
        // res.status(200).json('user added successfully')
    })
    // db.query('select * from user_data where firstname=?',req.body.companyName,(err,result)=>{
    //     if (err){
    //         console.log(err)
    //         res.status(500).json('error occured try again!')
    //     }
    //     else{
    //         if (result.length===0){
    //             const q='insert into addcompany(company_name,company_email,company_address,company_status) values(?)'
    //             db.query(q,[values],(err,result)=>{
    //                 if (err){
    //                     if(err.errno===1062){
    //                     console.log(err)
    //                     res.status(406).json('company name already exist!')
    //                     }
    //                     else{
    //                         res.status(500).json('error occured try again!')
    //                     }
    //                 }
    //                 res.status(200).json('company added successfully')
    //             })

    //         }
    //         else{
    //             res.status(406).json('company name already exist!')
    //         }
    //     }
        
    // })
    
    //res.status(200).json('compnay name already exist')

}

export const viewusers = (req,res)=>{
    const q = 'select * from user_data;';
    // let results = await db.promise().query(checkUserNameQ);
    db.query(q,(err,result)=>{
        if (err) throw err
        console.log(result)
        if (err) return res.json({ error: err.sqlMessage });
        else return res.json({ result });
    })
    // const q='select * from addcompany'
    // db.query(q,(err,result)=>{
    //     if (err){
    //         //console.log(err)
    //         res.status(500).json('error occured!')
    //     }
    //     else{
    //         //console.log(result)
    //         res.status(200).json(result)
            
           
    //     }
    // })
}

export const editusers = (req,res) =>{
    console.log(req.params)
    // const values = [req.body.firstname,req.body.lastname,req.body.company_email,req.body.company_address,req.body.company_status,req.params.id]
    let DOB = req.body.birth_date?.split('T')?.[0] || req.body.birth_date || '';
    const values=[req.body.firstname,req.body.lastname,req.body.email,req.body.select_company,req.body.gender,req.body.country,req.body.about_yourself,DOB,req.body.emp_access,req.body.emp_status,req.params.id]

    // const q = 'update addcompany set company_name=?,company_email=?,company_address=?,company_status=? where id=?'
    const q = 'update user_data set firstname=?,lastname=?,email=?,select_company=?,gender=?,country=?,about_yourself=?,birth_date=?,emp_access=?,emp_status=? where id=?'
   // const q='INSERT INTO user_data (firstname,lastname, email, select_company, gender, country, about_yourself, birth_date, emp_access, emp_status) values(?)'

    db.query(q,values,(error,result)=>{
        if(error){
            console.log(error)
            if(error.errno===1062){
                res.status(500).json('user data already exists!')
            }
            else{
            res.status(500).json('error occured!')
            }
        }
        else{
            console.log(result)
            res.status(200).json('user details updated successfully')
        }
    })
   
}

export const resignusers = async (req,res) =>{
    console.log(req.params)
    // const values = [req.body.firstname,req.body.lastname,req.body.company_email,req.body.company_address,req.body.company_status,req.params.id]
    // let results = await db.promise().query(q);
    // const q = 'update addcompany set company_name=?,company_email=?,company_address=?,company_status=? where id=?'
   // const q='INSERT INTO user_data (firstname,lastname, email, select_company, gender, country, about_yourself, birth_date, emp_access, emp_status) values(?)'

    let errorFlag = false;
    for(let i=0; i<req.body.length; i++){
        let e = req.body?.[i];
        let DOB = e.birth_date?.split('T')?.[0] || e.birth_date || '';
        const values=[e.firstname,e.lastname,e.email,e.select_company,e.gender,e.country,e.about_yourself,DOB,e.emp_access,'Resign',e.id];
        const q = 'update user_data set firstname=?,lastname=?,email=?,select_company=?,gender=?,country=?,about_yourself=?,birth_date=?,emp_access=?,emp_status=? where id=?'
        try {
            let results = await db.promise().query(q, values);
        } catch (err) {
            errorFlag = true;
            break;
        }
    }
    if(errorFlag) {
        res.status(500).json('error occured!')
    }else {
        res.status(200).json('users resign updated successfully')
    }


    // req.body.forEach(async e => {
    //     let DOB = e.birth_date?.split('T')?.[0] || e.birth_date || '';
    //     const values=[e.firstname,e.lastname,e.email,e.select_company,e.gender,e.country,e.about_yourself,DOB,e.emp_access,'Resign',e.id];
    //     const q = 'update user_data set firstname=?,lastname=?,email=?,select_company=?,gender=?,country=?,about_yourself=?,birth_date=?,emp_access=?,emp_status=? where idd=?'
    //     try {
    //         let results = await db.promise().query(q, values);
    //     } catch (err) {
    //         errorFlag = true;
    //         res.status(500).json('error occured!')
    //     }
    // })


    // db.query(q,values,(error,result)=>{
    //     if(error){
    //         console.log(error)
    //         if(error.errno===1062){
    //             res.status(500).json('user data already exists!')
    //         }
    //         else{
    //             res.status(500).json('error occured!')
    //         }
    //     }
    //     else{
    //         console.log(result)
    //         res.status(200).json('user details updated successfully')
    //     }
    // })
   
}

// export const deletecompany=(req,res)=>{
//     console.log(req.body)
//     const q='delete from addcompany where id in (?)'
//     db.query(q,[req.body.id],(err,result)=>{
        
//         if(err) {
//             console.log(err)
//             res.status(500).json(err)
//         }
//         else{
//             console.log(result)
//             res.status(200).json('Company Deleted Successfully')
//         }
//     })
//     //res.status(500).json('from delete')
// }
// export const adduser = async(req,res)=>{
//     console.log(req);
//     let username = req?.body?.username || '';
//     let email = req?.body?.email || '';
//     let access = req?.body?.access || '';
//     let status = req?.body?.status || '';
//     if(!username || !email || !access || !status) {
//         res.status(404).json({
//             'status': 'Error',
//             'message': 'Field missing'
//         });
//         return;
//     }
//     const checkUserNameQ = `select * from user_data where username = "${username}";`;
//     const checkEmailQ = `select * from user_data where email = "${email}";`;
//     const insertQuery = `INSERT INTO user_data (username, email, emp_access, emp_status) VALUES('${username}', '${email}', '${access}', '${status}');`
//     // const checkUserNameQ = `select * from user_data;`;
//     let results = await db.promise().query(checkUserNameQ);
//     if(results.length == 0) {
//         res.status(404).json({
//             'status': 'Error',
//             'message': 'DB error'
//         });
//         return;
//     }
//     let checkUserNameValid = results?.[0]?.length > 0 ? false : true;
//     if(!checkUserNameValid) {
//         res.status(406).json({
//             'status': 'Error',
//             'message': 'Username Unavailable'
//         });
//         return;
//     }

//     results = await db.promise().query(checkEmailQ);
//     if(results.length == 0) {
//         res.status(404).json({
//             'status': 'Error',
//             'message': 'DB error'
//         });
//         return;
//     }
//     let checkEmailValid = results?.[0]?.length > 0 ? false : true;
//     if(!checkEmailValid) {
//         res.status(406).json({
//             'status': 'Error',
//             'message': 'Email Unavailable'
//         });
//         return;
//     }

//     if(checkUserNameValid && checkEmailValid) {
//         results = await db.promise().query(insertQuery);
//         if(results && results?.[0] && results[0].affectedRows == 1){
//             res.status(200).json({
//                 'status': 'Success',
//                 'message': 'User added'
//             });
//             return;
//         }
//     }

// }