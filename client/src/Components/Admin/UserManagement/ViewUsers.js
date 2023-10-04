// referenece: 1.https://www.npmjs.com/package/react-data-table-ViewUsers 2.https://react-data-table-ViewUsers.netlify.app/


import { Backdrop, Box, Button, Card, Container, Dialog, DialogActions, DialogContent, DialogTitle, Divider, Drawer, FormControl, InputLabel, List, ListItem, ListItemText, MenuItem, OutlinedInput, Paper, Select, Slide, Stack, TextField, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import DataTable from 'react-data-table-component';
import { defaultThemes } from 'react-data-table-component';
import NavBar from '../../Comman/NavBar/NavBar';
import SearchIcon from '@mui/icons-material/Search';
import axios from 'axios';
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css' 
import { Delete } from '@mui/icons-material';
import { useMemo } from 'react';




const customStyles = {
	header: {
		style: {
			minHeight: '56px',
		},
	},

	headRow: {
		style: {

			borderTopStyle: 'solid',
			borderTopWidth: '1px',
			borderTopColor: defaultThemes.default.divider.default,
		},
	},
	headCells: {
		style: {
			fontSize: '14px',
			'&:not(:last-of-type)': {
				borderRightStyle: 'solid',
				borderRightWidth: '1px',
				borderRightColor: defaultThemes.default.divider.default,
			},
		},
	},
	cells: {
		style: {
			'&:not(:last-of-type)': {

				borderRightStyle: 'solid',
				borderRightWidth: '1px',
				borderRightColor: defaultThemes.default.divider.default,
			},

		},
	},
};
const ViewUsers = () => {
	const [selectedRows, setSelectedRows] = React.useState([]);
	const [toggleCleared, setToggleCleared] = React.useState(false);
	const [data, setData] = React.useState([]);
	const [viewDrawerOpen, setViewDrawerOpen] = useState(false)
	const [editDialogOpen, setEditDialogOpen] = useState(false)
	const [filteredUser, setFilteredUser] = useState(data)
	const [viewUserData, setViewUserData] = useState({})
	const [editUserData, setEditUserData] = useState({
		firstname:'',
		lastname:'',
		email:'',
		emp_access:'',
		emp_status:'',
		select_company:'',
		gender:'',
		country:'',
		about_yourself:'',
		birth_date:'',


	})
	const [loader, setLoader] = useState(true)

// 'id', 'firstname', 'lastname', 'email', 'select_company', 'gender', 'country', 'about_yourself', 'birth_date', 'emp_access', 'emp_status

	//column names creation
	const columns = [
        {
            name: "User Name",
            selector: (row) => `${row.firstname || ""} ${row.lastname || ""}`,
            sortable: true,
            center: true,
        },
        {
            name: "Email",
            selector: (row) => row.email,
            center: true,
        },
        {
            name: "Status",
            selector: (row) => row.emp_status,
            center: true,
        },
        {
            name: "Access",
            selector: (row) => row.emp_access,
            center: true,
        },
        {
            name: "Action",
            cell: (row) => (
                <Stack
                    display={"flex"}
                    spacing={1.5}
                    direction={"row"}
                    height={30}
                >
                    <Button
                        variant="outlined"
                        size="small"
                        onClick={() => handleEditButton(row)}
                    >
                        EDIT
                    </Button>{" "}
                    {/* <Divider orientation="vertical" flexItem />
                    <Button
                        color="error"
                        variant="outlined"
                        size="small"
                        onClick={() => handleViewButton(row)}
                    >
                        Resign
                    </Button> */}
                    <Divider orientation="vertical" flexItem />
                    <Button
                        color="success"
                        variant="outlined"
                        size="small"
                        onClick={() => handleViewButton(row)}
                    >
                        View
                    </Button>
                </Stack>
            ),
            ignoreRowClick: true,
            allowOverflow: true,
            center: true,
            minWidth: "300px",
        },
    ];

	//taking company data from api
	useEffect(() => {
		
		axios.get('/api/ViewUsers/')
			.then(res => {
				console.log(res)
				
				setData(res.data.result)
				setFilteredUser(res.data.result)
				setLoader(false)
				// setEditUserData({...editUserData,lastname:res.data.result.lastname})
				
				
				
			})
			.catch(err => {
				console.log(err)
				setLoader(false)
			})
	}, [toggleCleared,editDialogOpen])



	//handling view button
	const handleViewButton = (row) => {
		setViewDrawerOpen(true)
		//console.log(row)
		setViewUserData(row)

	}

	//company deatails

	const userDetailView = useMemo(() => {
		const handleViewButtonDrawerToggleClosing = () => {
			setViewDrawerOpen(!viewDrawerOpen);
			setViewUserData({})
		};

		return (
			<Drawer
				anchor={'right'}
				open={viewDrawerOpen}
				onClose={handleViewButtonDrawerToggleClosing}
				variant="temporary"
				sx={{
					width: 350,
					'& .MuiDrawer-paper': {
						width: 350,
						marginTop: 6
					}
				}}
			>
				<div style={{ height: '90vh', width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
					<Paper elevation={5} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: { xs: '35ch', md: '35ch' }, height: { xs: '55ch', sm: '55ch', md: '95ch' } }}>

						<Typography variant='h6' component={'h6'} m={0.5} mt={9} p={0.5} border={'1.5px solid black'} >User Details</Typography>

						<List sx={{ width: '100%', display: "flex", margin: 0, flexDirection: 'column' }}>
							<ListItem sx={{ display: 'flex', justifyContent: 'flex-end' }}>

								<ListItemText
								>
									<Container sx={{ display: 'flex', justifyContent: 'flex-end' }}>
										<Typography
											sx={{ display: 'inline' }}
											component="span"
											variant="body1"
											color="text.primary"

										><u>Status</u> :</Typography>
										{
											viewUserData.emp_status?.toLowerCase() === 'active' ?
												<>
													<Typography
														sx={{ color: 'green', m: 0.5 }}
														component="span"
														variant="body2"

													> {viewUserData.emp_status}</Typography>
												</>
												:
												<>
													<Typography
														sx={{ m: 0.5, color: 'red' }}
														component="span"
														variant="body2"
													>{viewUserData.emp_status}</Typography>
												</ >
										}
									</Container>
								</ListItemText>




							</ListItem>
							<ListItem alignItems="flex-start" >

								<ListItemText

									secondary={
										<>
											<Typography
												sx={{ display: 'inline' }}
												component="span"
												variant="body1"
												color="text.primary"
												mr={0.5}
											>
												First Name:
											</Typography>
											{viewUserData.firstname}
										</>
									}
								/>
							</ListItem>
							<ListItem alignItems="flex-start" >

								<ListItemText

									secondary={
										<>
											<Typography
												sx={{ display: 'inline' }}
												component="span"
												variant="body1"
												color="text.primary"
												mr={0.5}
											>
												Last Name:
											</Typography>
											{viewUserData.lastname}
										</>
									}
								/>
							</ListItem>
							
							<ListItem alignItems="flex-start">
								<ListItemText
									secondary={
										<>
											<Typography
												sx={{ display: 'inline' }}
												component="span"
												variant="body1"
												color="text.primary"
												mr={0.5}
											>
												Email:
											</Typography>
											{viewUserData.email}
										</>
									}
								/>
							</ListItem>
							<ListItem alignItems="flex-start">
								<ListItemText
									secondary={
										<>
											<Typography
												sx={{ display: 'inline' }}
												component="span"
												variant="body1"
												color="text.primary"
												mr={0.5}
											>
												Company:
											</Typography>
											{viewUserData.select_company}
										</>
									}
								/>
							</ListItem>
							<ListItem alignItems="flex-start">
								<ListItemText
									secondary={
										<>
											<Typography
												sx={{ display: 'inline' }}
												component="span"
												variant="body1"
												color="text.primary"
												mr={0.5}
											>
												Gender:
											</Typography>
											{viewUserData.gender}
										</>
									}
								/>
							</ListItem>
							<ListItem alignItems="flex-start">
								<ListItemText
									secondary={
										<>
											<Typography
												sx={{ display: 'inline' }}
												component="span"
												variant="body1"
												color="text.primary"
												mr={0.5}
											>
												Date of Birth:
											</Typography>
											{viewUserData.birth_date?.split('T')?.[0] }
										</>
									}
								/>
							</ListItem>
							<ListItem alignItems="flex-start">
								<ListItemText
									secondary={
										<>
											<Typography
												sx={{ display: 'inline' }}
												component="span"
												variant="body1"
												color="text.primary"
												mr={0.5}
											>
												Country:
											</Typography>
											{viewUserData.country}
										</>
									}
								/>
							</ListItem>
							<ListItem alignItems="flex-start">
								<ListItemText
									secondary={
										<>
											<Typography
												sx={{ display: 'inline' }}
												component="span"
												variant="body1"
												color="text.primary"
												mr={0.5}
											>
												About Yourself:
											</Typography>
											{viewUserData.about_yourself}
										</>
									}
								/>
							</ListItem>

							<ListItem alignItems="flex-start">
								<ListItemText
									secondary={
										<>
											<Typography
												sx={{ display: 'inline' }}
												component="span"
												variant="body1"
												color="text.primary"
												mr={0.5}
											>
												Access:
											</Typography>
											{viewUserData.emp_access}
										</>
									}
								/>
							</ListItem>
							{/* <ListItem alignItems="flex-start">
								<ListItemText
									secondary={
										<>
											<Typography
												sx={{ display: 'inline' }}
												component="span"
												variant="body1"
												color="text.primary"
												mr={0.5}
											>
												Status:
											</Typography>
											{viewUserData.emp_status}
										</>
									}
								/>
							</ListItem> */}
						</List>
					</Paper>
				</div>
			</Drawer>
		)
	}, [viewDrawerOpen, viewUserData])

	//edit button
	const handleEditButton = (row) =>{
		console.log(row)
		setEditDialogOpen(true)
		setEditUserData(row)


	}
	
	//company edit view
	const userEditView = useMemo(()=>{
		const handleEditDialogClose = () =>{
			setEditDialogOpen(false)
		}
		const handleEdit = async(e) =>{
			e.preventDefault()
			console.log(editUserData)
			let msg = ''
			try {
				const result = await toast.promise(
					axios.put(`/api/editusers/${editUserData.id}`,editUserData),
					{
						pending: {
							render() {
								return ('Updating User')
							}
						},
						success: {
							render() {
								setEditDialogOpen(false)
								return (`${msg} `)
							}
						},
						error: {
							render() {
								return (`${msg}`)
							}
						}
					}

				)
				msg = (result.data)
				//console.log(result)
			}
			catch (err) {
				msg = (err.response.data)

			}
		

		}
		return(
			<>
			<Dialog
			open={editDialogOpen}
			onClose={handleEditDialogClose}
			
			
			
			>
				<DialogTitle>Edit Users</DialogTitle>
				<DialogContent dividers={true}>
				<Paper elevation={1} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: { sm: '50ch', md: '50ch' }, height: { sm: '30ch', md: '75ch' } }}>
                
                <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: { sm: '45ch', md: '40ch' }, height: { sm: '25ch', md: '45ch' }, p: 1 }}>
                  <form id='editcompany' onSubmit={handleEdit} >
				  <FormControl fullWidth sx={{ mb: 2 }} variant="outlined">
                    <InputLabel required htmlFor="outlined-adornment-editcompany">First Name</InputLabel>
                    <OutlinedInput
                      required={true}
                      id="outlined-adornment-editcompany"
                      type={'text'}
                      label="First Name"
					  name="firstName"
					  value={editUserData.firstname}
					  onInput={(e)=>setEditUserData({...editUserData,firstname:e.target.value})}
                      placeholder='enter first name'
                      
                     /> 
                  </FormControl>
				  <FormControl fullWidth sx={{ mb: 2 }} variant="outlined">
                    <InputLabel required htmlFor="outlined-adornment-editcompany">Last Name</InputLabel>
                    <OutlinedInput
                      required={true}
                      id="outlined-adornment-editcompany"
                      type={'text'}
                      label="Last Name"
					  name="lastName"
					  value={editUserData.lastname}
					  onInput={(e)=>setEditUserData({...editUserData,lastname:e.target.value})}
                      placeholder='enter  name'
                      
                     /> 
                  </FormControl>
                

				  
                  <FormControl fullWidth sx={{ mb: 2 }} variant="outlined">
                    <InputLabel required htmlFor="outlined-adornment-editcomp_email">Email</InputLabel>
                    <OutlinedInput
                      name='email'
					  value={editUserData.email}
					  onInput={(e)=>setEditUserData({...editUserData,email:e.target.value})}
                      required={true}
                      id="outlined-adornment-editcomp_email"
                      type={'email'}
                      label="Email"
                    //   placeholder='enter user email'
                      

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
                                            value={editUserData.select_company}
					  onChange={(e)=>setEditUserData({...editUserData,select_company:e.target.value})}
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
                                            value={editUserData.gender}
					  onChange={(e)=>setEditUserData({...editUserData,gender:e.target.value})}
					
                                        >
                                            <MenuItem value="Female">
                                                Female
                                            </MenuItem>
                                            <MenuItem value="Male">
                                                Male
                                            </MenuItem>
                                        </Select>
                                    </FormControl>
				  
									{/* <FormControl sx={{ mb: 2 }} fullWidth variant="outlined">
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
                                                  required
                                                  onChange={handleSetDate} 
                                                />
                                            </DemoContainer>
                                        </LocalizationProvider>
                                    </FormControl> */}
			    <FormControl sx={{ mb: 2 }} fullWidth variant="outlined" >
                    <InputLabel  required>Country</InputLabel>
                    <Select
					  name='country'
                      label="Country"
                      required
					  value={editUserData.country}
					  onChange={(e)=>setEditUserData({...editUserData,country:e.target.value})}
					//   placeholder='Status'
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


				  <FormControl sx={{ mb: 2 }} fullWidth variant="outlined" >
                    <InputLabel  required>Status</InputLabel>
                    <Select
					  name='userstatus'
                      label="Status"
                      required
					  value={editUserData.emp_status}
					  onChange={(e)=>setEditUserData({...editUserData,emp_status:e.target.value})}
					//   placeholder='Status'
                    >
						
                      <MenuItem value="Active">Active</MenuItem>
                      <MenuItem value="Denied">Denied</MenuItem>
					  <MenuItem value="Resign">Resign</MenuItem>

                    </Select>
                  </FormControl>

				  

                 


                  <FormControl sx={{ mb: 2 }} fullWidth variant="outlined" >
                    <InputLabel  required>Access</InputLabel>
                    <Select
					  name='useraccess'
                      label="Access"
                      required
					  value={editUserData.emp_access}
					  onChange={(e)=>setEditUserData({...editUserData,emp_access:e.target.value})}
                    >
                    <MenuItem value="User">User</MenuItem>
                    <MenuItem value="Admin">Admin</MenuItem>
                    <MenuItem value="HR">HR</MenuItem>
                     <MenuItem value="Manager">                                                Manager
                                            </MenuItem>
                                            <MenuItem value="Team Lead">
                                                Team Lead
                                            </MenuItem>
                    </Select>
                  </FormControl>

                  
                  
				  </form>
                  

                </Box>
              </Paper>
				</DialogContent>
				<DialogActions>
					<Button  color='error' onClick={handleEditDialogClose}>Cancel</Button>
					<Button  color='success' type='submit' form='editcompany' >Update</Button>
				</DialogActions>

			</Dialog>
			</>
		)
	},[editDialogOpen,editUserData])

	//table searchbar
	const subHeaderViewUsersMemo = React.useMemo(() => {
		const handleSearch = (e) => {
			//console.log(e.target.value)
			console.log(e)			
			const filteredData = data.filter(d => (`${d.firstname} ${d.lastname}`)?.toLowerCase()?.includes((e?.target?.value).toLowerCase()))
			//console.log(filteredUser)
			setFilteredUser(filteredData)

		}

		return (
			<Box>
				<TextField variant='outlined' size='small' placeholder='search users' onInput={handleSearch} InputProps={{ endAdornment: <SearchIcon /> }} />
			</Box>

		);
	}, [data]);

	//row selection
	const handleRowSelected = React.useCallback(state => {
		// console.log(`hi ${state.selectedRows}`);
		setSelectedRows(state.selectedRows);
	}, []);

	//handling selected row operation
	const contextActions = React.useMemo(() => {
		const handleDelete = async () => {
			console.log(selectedRows.map(details => details.id))
			console.log(selectedRows)
			let msg = ''
			try {
				const result = await toast.promise(
					axios.post(`/api/resignusers/`, selectedRows),
					{
						pending: {
							render() {
								return ('Deleting User')
							}
						},
						success: {
							render() {
								setToggleCleared(!toggleCleared)
								return (`${msg} `)
							}
						},
						error: {
							render() {
								return (`${msg}`)
							}
						}
					}

				)
				msg = (result.data)
			}
			catch (err) {
				msg = (err.response.data)

			}
		}

		return (
			<Button size='medium' key="delete" variant='contained' color='error' onClick={handleDelete} startIcon={<Delete />}>
				Resign
			</Button>
		);
	}, [selectedRows, toggleCleared]);

	return (
		<>
			<NavBar />
			<Box component='main' sx={{ flexGrow: 1, p: 3, mt: 8, ml: { xs: 8 } }}>
				<div style={{ height: '100%', width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
					<Typography variant='h5' component={'h5'} m={2} textAlign={'center'} >View Users</Typography>
					<div style={{ height: '400px', width: '95%' }}>
						<Card>
							<DataTable
								title=" "
								fixedHeader={true}
								fixedHeaderScrollHeight='250px'
								columns={columns}
								data={filteredUser}
								selectableRows
								contextActions={contextActions}
								onSelectedRowsChange={handleRowSelected}
								clearSelectedRows={toggleCleared}
								pagination
								dense
								subHeader
								subHeaderComponent={subHeaderViewUsersMemo}
								customStyles={customStyles}


							/>
						</Card>
					</div>
				</div>
			</Box>
			{userDetailView}
			{userEditView}
			<ToastContainer />
			<Backdrop
				sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
				open={loader}
			>
				<img src='gif2.gif' alt='loader' style={{ mixBlendMode: 'lighten' }} />
			</Backdrop>
		</>
	);
};

export default ViewUsers