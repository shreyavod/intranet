import { Box, Button, FormControl, Grid,  InputLabel, MenuItem, OutlinedInput, Paper, Select, Stack,  Typography } from '@mui/material'
import React, { useState } from 'react'
import NavBar from '../../Comman/NavBar/NavBar';
import axios from 'axios'
import {  ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css' 


function AddCompany() {
  const [addCompData, setAddCompData] = useState({
    companyName:'',
    companyEmail:'',
    companyAddress:'',
    companyStatus:''
  })
  
  const handleAddFormData=(e)=>{
    console.log(e.target.name)
    setAddCompData({...addCompData,[e.target.name]:e.target.value})
  }
  const handleResetCompForm=()=>{
    console.log(addCompData)
    setAddCompData({
    companyName:'',
    companyEmail:'',
    companyAddress:'',
    companyStatus:''
    })
  }

  const handleSubmitCompForm = async(e) =>{
    e.preventDefault()
    // const id = toast.loading("Please wait...")
    // axios.post('/api/addcompany', addCompData)
    // .then(()=>toast.update(id, { render: "All is good", type: "success", isLoading: false }))
    let msg=''
    try{
    const result =  
    await toast.promise(
    
       axios.post('/api/addcompany', addCompData),
       
      {

        pending: {
          render(){
            return('Adding Company')
          }
          },
        success:  { render(){
          return(`${msg} `)
        }
        },
        error:{
        render(){
          return(`${msg}`)
        }
        }
      }
      
  )
  msg=(result.data)
    console.log(result)
    handleResetCompForm()
  }
 catch (err){
  msg=(err.response.data)
  
}
  }
  
  return (
    <>
    
      <NavBar />
     
      <Box component='main' sx={{ flexGrow: 1, p: 3, mt: 8, ml: { xs: 8 } }}>
        <div style={{ height: '80vh', width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
          <Grid container sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <Grid item sm={12} lg={12} md={12}>
            <Typography variant='h5' component={'h5'} m={1} textAlign={'center'} >Add Company</Typography>
              <Paper elevation={5} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: { xs: '30ch', md: '50ch' }, height: { xs: '55ch', md: '55ch' } }}>
                
                <Box component={'form'} onSubmit={handleSubmitCompForm} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: { xs: '25ch', md: '40ch' }, height: { sm: '25ch', md: '50ch' }, p: 1 }}>
                  <FormControl fullWidth sx={{ mb: 2 }} variant="outlined">
                    <InputLabel required htmlFor="outlined-adornment-company">Company Name</InputLabel>
                    <OutlinedInput
                      name='companyName'
                      value={addCompData.companyName}
                      required={true}
                      id="outlined-adornment-company"
                      type={'text'}
                      label="Company Name"
                      placeholder='enter comapany name'
                      onInput={handleAddFormData}
                    />
                  </FormControl>
                  <FormControl fullWidth sx={{ mb: 2 }} variant="outlined">
                    <InputLabel required htmlFor="outlined-adornment-comp_email">Email</InputLabel>
                    <OutlinedInput
                      name='companyEmail'
                      value={addCompData.companyEmail}
                      required={true}
                      id="outlined-adornment-comp_email"
                      type={'email'}
                      label="Email"
                      placeholder='enter company email'
                      onInput={handleAddFormData}

                    />
                  </FormControl>
                  <FormControl fullWidth sx={{ mb: 2 }} variant="outlined">
                    <InputLabel required htmlFor="outlined-adornment-comp_addr">Company Address</InputLabel>
                    <OutlinedInput
                      name='companyAddress'
                      value={addCompData.companyAddress}
                      required={true}
                      multiline
                      id="outlined-adornment-comp_addr"
                      type={'text'}
                      label="Company Address"
                      minRows={4}
                      maxRows={4}
                      placeholder="enter company address"
                      onInput={handleAddFormData}

                    />
                  </FormControl>

                  
                  <FormControl sx={{ mb: 2 }} fullWidth variant="outlined" >
                    <InputLabel  required>Status</InputLabel>
                    <Select
                      label="Status"
                      name="companyStatus"
                      value={addCompData.companyStatus}
                      required
                      onChange={handleAddFormData}

                    >
                      <MenuItem value="active">Active</MenuItem>
                      <MenuItem value="denied">Denied</MenuItem>
                    </Select>
                  </FormControl>


                  <Stack spacing={5} direction="row" sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                    <Button variant="outlined" color='success' type='submit' >ADD</Button>
                    <Button variant="outlined" color='error' onClick={handleResetCompForm} >Clear</Button>
                  </Stack>

                </Box>
              </Paper>
            </Grid>

          </Grid>

        </div>
      </Box>
      
        <ToastContainer />
    </>
  )
}

export default AddCompany