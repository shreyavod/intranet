import {
    Box,
    Button,
    FormControl,
    Grid,
    TextField,
    InputLabel,
    MenuItem,
    OutlinedInput,
    Paper,
    Select,
    Stack,
    Typography,
} from "@mui/material";
import React, { useState } from "react";
import NavBar from "../../Comman/NavBar/NavBar";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import moment from 'moment';

function AddUser() {
    const [addUserData, setAddUserData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        select_company: "",
        gender: "",
        country: "",
        about_yourself: "",
        birth_date: "",
        emp_access: "",
        emp_status: "",
    });
    //   firstname,lastname, email,select_company,gender, country,about_yourself,birth_date,emp_access, emp_status
    const handleAddFormData = (e) => {
        console.log(e.target.name);
        setAddUserData({ ...addUserData, [e.target.name]: e.target.value });
    };

    const handleSetDate = (e) => {
        // console.log(moment(e?.['$d']).format("YYYY-MM-DD"));
        setAddUserData({ ...addUserData, ['birth_date']: moment(e?.['$d']).format("YYYY-MM-DD") });
    };

    const handleResetCompForm = () => {
        console.log(addUserData);
        setAddUserData({
            firstName: "",
            lastName: "",
            email: "",
            select_company: "",
            gender: "",
            country: "",
            about_yourself: "",
            birth_date: "",
            emp_access: "",
            emp_status: "",
        });
    };

    //   const handleSubmitCompForm = async(e) =>{
    //     e.preventDefault()
    //     // const id = toast.loading("Please wait...")
    //     // axios.post('/api/addcompany', addUserData)
    //     // .then(()=>toast.update(id, { render: "All is good", type: "success", isLoading: false }))
    //     let msg=''
    //     try{
    //     const result =
    //     await toast.promise(

    //        axios.post('/api/adduser', addUserData),

    //       {

    //         pending: {
    //           render(){
    //             return('Adding User')
    //           }
    //           },
    //         success:  { render(){
    //           return(`${msg} `)
    //         }
    //         },
    //         error:{
    //         render(){
    //           return(`${msg}`)
    //         }
    //         }
    //       }

    //   )
    //   msg=(result.data)
    //     console.log(result)
    //     handleResetCompForm()
    //   }
    //  catch (err){
    //   msg=(err.response.data)

    // }
    //   }
    const handleSubmitCompForm = async (e) => {
      console.log(addUserData);
        e.preventDefault();
        // const id = toast.loading("Please wait...")
        // axios.post('/api/addcompany', addUserData)
        // .then(()=>toast.update(id, { render: "All is good", type: "success", isLoading: false }))
        let msg = "";
        try {
            const result = await toast.promise(
                axios.post("/api/adduser", addUserData),
                // axios.post("http://localhost:8080/api/adduser", addUserData),

                {
                    pending: {
                        render() {
                            return "Adding User";
                        },
                    },
                    success: {
                        render() {
                            return `${msg} `;
                        },
                    },
                    error: {
                        render() {
                            return `${msg}`;
                        },
                    },
                }
            );
            msg = result.data;
            console.log(result);
            handleResetCompForm();
        } catch (err) {
            msg = err.response.data;
        }
    };

    return (
        <>
            <NavBar />

            <Box
                component="main"
                sx={{ flexGrow: 1, p: 3, mt: 8, ml: { xs: 8 } }}
            >
                <div
                    style={{
                        height: "80vh",
                        width: "100%",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <Grid
                        container
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        <Grid item sm={12} lg={12} md={12}>
                            {/* <Typography variant='h5' component={'h5'} m={25} textAlign={'center'} >Add User</Typography>
            //   <Paper elevation={15} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: { xs: '50ch', md: '50ch' }, height: { xs: '50ch', md: '105ch' } }}> */}

                            <Typography
                                variant="h5"
                                component={"h5"}
                                sx={{ mt: 60, mb: 1 }}
                                textAlign={"center"}
                            >
                                Add User
                            </Typography>
                            <Paper
                                elevation={5}
                                sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    width: { xs: "50ch", md: "80ch" },
                                    height: { xs: "55ch", md: "105ch" },
                                }}
                            >
                                <Box
                                    component={"form"}
                                    onSubmit={handleSubmitCompForm}
                                    sx={{
                                        display: "flex",
                                        padding: "100",
                                        flexDirection: "column",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        width: { xs: "15ch", md: "60ch" },
                                        height: { sm: "15ch", md: "150ch" },
                                        p: 1,
                                    }}
                                >
                                    {/* <Typography variant='h5' component={'h5'}  sx={{mt:60}} textAlign={'center'} >Add User</Typography> */}
                                    <FormControl
                                        fullWidth
                                        sx={{ mb: 2 }}
                                        variant="outlined"
                                    >
                                        <InputLabel
                                            required
                                            htmlFor="outlined-adornment-company"
                                        >
                                            First Name
                                        </InputLabel>
                                        <OutlinedInput
                                            name="firstName"
                                            value={addUserData.firstName}
                                            required={true}
                                            id="outlined-adornment-company"
                                            type={"text"}
                                            label="First Name"
                                            placeholder="enter first name"
                                            onInput={handleAddFormData}
                                        />
                                    </FormControl>
                                    <FormControl
                                        fullWidth
                                        sx={{ mb: 2 }}
                                        variant="outlined"
                                    >
                                        <InputLabel
                                            required
                                            htmlFor="outlined-adornment-company"
                                        >
                                            Last Name
                                        </InputLabel>
                                        <OutlinedInput
                                            name="lastName"
                                            value={addUserData.lastName}
                                            required={true}
                                            id="outlined-adornment-company"
                                            type={"text"}
                                            label="Last Name"
                                            placeholder="enter last name"
                                            onInput={handleAddFormData}
                                        />
                                    </FormControl>

                                    <FormControl
                                        fullWidth
                                        sx={{ mb: 2 }}
                                        variant="outlined"
                                    >
                                        <InputLabel
                                            required
                                            htmlFor="outlined-adornment-comp_email"
                                        >
                                            Email
                                        </InputLabel>
                                        <OutlinedInput
                                            name="email"
                                            value={addUserData.email}
                                            required={true}
                                            id="outlined-adornment-comp_email"
                                            type={"email"}
                                            label="Email"
                                            placeholder="enter company email"
                                            onInput={handleAddFormData}
                                        />
                                    </FormControl>
                                    <FormControl
                                        sx={{ mb: 2 }}
                                        fullWidth
                                        variant="outlined"
                                    >
                                        <InputLabel required>
                                            Select Company
                                        </InputLabel>
                                        <Select
                                            label="Select Company"
                                            name="select_company"
                                            value={addUserData.select_company}
                                            required
                                            onChange={handleAddFormData}
                                        >
                                            <MenuItem value="Brightcomgroup Global">
                                                Brightcomgroup Global
                                            </MenuItem>
                                            <MenuItem value="Brightcomgroup India">
                                                Brightcomgroup India
                                            </MenuItem>
                                        </Select>
                                    </FormControl>
                                    <FormControl
                                        sx={{ mb: 2 }}
                                        fullWidth
                                        variant="outlined"
                                    >
                                        <InputLabel required>Gender</InputLabel>
                                        <Select
                                            label="Gender"
                                            name="gender"
                                            value={addUserData.gender}
                                            required
                                            onChange={handleAddFormData}
                                        >
                                            <MenuItem value="Female">
                                                Female
                                            </MenuItem>
                                            <MenuItem value="Male">
                                                Male
                                            </MenuItem>
                                        </Select>
                                    </FormControl>

                                    <FormControl sx={{ mb: 2 }} fullWidth variant="outlined">
                                        <LocalizationProvider
                                            dateAdapter={AdapterDayjs}>
                                            <DemoContainer
                                                components={["DatePicker"]}
                                            >
                                                <DatePicker 
                                                  label="Birth Date" 
                                                  name="birth_date"
                                                  // value={addUserData.birth_date}
                                                  // dateFormat="dd/MM/YYYY"
                                                  dateFormat="YYYY/MM/DD"
                                                  required={true}
                                                  onChange={handleSetDate} 
                                                />
                                            </DemoContainer>
                                        </LocalizationProvider>
                                    </FormControl>

                                    <FormControl
                                        sx={{ mb: 2 }}
                                        fullWidth
                                        variant="outlined"
                                    >
                                        <InputLabel required>
                                            Country
                                        </InputLabel>
                                        <Select
                                            label="Country"
                                            name="country"
                                            value={addUserData.country}
                                            required
                                            onChange={handleAddFormData}
                                        >
                                            <MenuItem value="India">
                                                India
                                            </MenuItem>
                                            <MenuItem value="France">
                                                France
                                            </MenuItem>
                                            <MenuItem value="UK">UK</MenuItem>
                                            <MenuItem value="US">US</MenuItem>
                                            <MenuItem value="Germany">
                                                Germany
                                            </MenuItem>
                                            <MenuItem value="Israel">
                                                Israel
                                            </MenuItem>
                                        </Select>
                                    </FormControl>

                                    <FormControl
                                        fullWidth
                                        sx={{ mb: 2 }}
                                        variant="outlined"
                                    >
                                        <TextField
                                            id="outlined-multiline-static"
                                            label="About Yourself"
                                            name="about_yourself"
                                            onChange={handleAddFormData}
                                            value={addUserData.about_yourself}
                                            multiline
                                            rows={4}
                                            defaultValue=""
                                        />
                                    </FormControl>

                                    <FormControl
                                        sx={{ mb: 2 }}
                                        fullWidth
                                        variant="outlined"
                                    >
                                        <InputLabel required>Access</InputLabel>
                                        <Select
                                            label="Access"
                                            name="emp_access"
                                            value={addUserData.emp_access}
                                            required
                                            onChange={handleAddFormData}
                                        >
                                            <MenuItem value="User">
                                                User
                                            </MenuItem>
                                            <MenuItem value="Admin">
                                                Admin
                                            </MenuItem>
                                            <MenuItem value="HR">HR</MenuItem>
                                            <MenuItem value="Manager">
                                                Manager
                                            </MenuItem>
                                            <MenuItem value="Team Lead">
                                                Team Lead
                                            </MenuItem>
                                        </Select>
                                    </FormControl>

                                    <FormControl
                                        sx={{ mb: 2 }}
                                        fullWidth
                                        variant="outlined"
                                    >
                                        <InputLabel required>Status</InputLabel>
                                        <Select
                                            label="Status"
                                            name="emp_status"
                                            value={addUserData.emp_status}
                                            required
                                            onChange={handleAddFormData}
                                        >
                                            <MenuItem value="Active">
                                                Active
                                            </MenuItem>
                                            <MenuItem value="Denied">
                                                Denied
                                            </MenuItem>
                                            <MenuItem value="Resign">
                                                Resign
                                            </MenuItem>
                                        </Select>
                                    </FormControl>

                                    <Stack
                                        spacing={5}
                                        direction="row"
                                        sx={{
                                            display: "flex",
                                            justifyContent: "center",
                                            width: "100%",
                                        }}
                                    >
                                        <Button
                                            variant="outlined"
                                            color="success"
                                            type="submit"
                                        >
                                            ADD
                                        </Button>
                                        <Button
                                            variant="outlined"
                                            color="error"
                                            onClick={handleResetCompForm}
                                        >
                                            Clear
                                        </Button>
                                    </Stack>
                                </Box>
                            </Paper>
                        </Grid>
                    </Grid>
                </div>
            </Box>

            <ToastContainer />
        </>
    );
}

export default AddUser;
