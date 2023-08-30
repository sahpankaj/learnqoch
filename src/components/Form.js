import React, { useContext } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Container from '@mui/material/Container';
import { FormContextProvider } from '../context/FormContext';

function Form() {
    const { formInput, handleInput, handleDateInput, handleSubmit, errors } = useContext(FormContextProvider);

    return (
        <Container component="main" maxWidth="xs">
            <Box
                className="form"
                sx={{
                    marginTop: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    padding: '0px 20px',
                }}
            >
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="firstName"
                        label="First Name"
                        name="firstName"
                        type="text"
                        autoFocus
                        size="normal"
                        value={formInput.firstName}
                        onChange={(e) => handleInput(e)}
                        error={!!errors.firstName}
                        helperText={errors.firstName}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="lastName"
                        label="Last Name"
                        type="text"
                        id="lastName"
                        value={formInput.lastName}
                        onChange={(e) => handleInput(e)}
                        error={!!errors.lastName}
                        helperText={errors.lastName}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        value={formInput.email}
                        onChange={(e) => handleInput(e)}
                        error={!!errors.email}
                        helperText={errors.email}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="phone"
                        label="Phone"
                        name="phone"
                        type="number"
                        value={formInput.phone}
                        onChange={(e) => handleInput(e)}
                        error={!!errors.phone}
                        helperText={errors.phone}
                    />
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer
                            components={[
                                'DatePicker',
                                'MobileDatePicker',
                                'DesktopDatePicker',
                                'StaticDatePicker',
                            ]}
                            sx={{ margin: '16px 0px 8px 0px' }}
                        >
                            <DatePicker
                                margin="normal"
                                label="DOB"
                                name="dob"
                                value={formInput.dob}
                                onChange={(date) => handleDateInput(date)}
                            />
                        </DemoContainer>
                    </LocalizationProvider>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        sx={{ mt: 3, mb: 2, backgroundColor: 'green' }}
                    >
                        Submit
                    </Button>
                </Box>
            </Box>
        </Container>
    );
}

export default Form;
