import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Input from '@mui/material/Input';
import ListItem from '@mui/material/ListItem';
import Slider from '@mui/material/Slider';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { RadioGroup } from '@mui/material';
import { useState } from 'react';
import Radio from '@mui/material/Radio';
import FormControlLabel from '@mui/material/FormControlLabel';
import { createUser } from './firebaseConfig';
import Switch from '@mui/material/Switch'

export default function LoginCard(props) {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [userType, setUserType] = useState("patient")
    const [data, setData] = useState("")





    const createAccount = () => {
        createUser(username, password, userType,data)
    }

    return (
        <Box sx={{ boxShadow: 10 }} style={{ width: 400, height: 400, borderRadius: 5, backgroundColor: "rgba(255,255,255,0.2)", backdropFilter: "blur(4px)" }}>
            <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center" }}>
                <Typography variant="h4" style={{ paddingTop: "18px", color: "#005DAA" }}>
                    Create a new account
                </Typography>
                <div style={{ width: "60%", marginTop: "auto", marginBottom: "auto" }}>
                    <TextField autoFocus onChange={(event) => { setUsername(event.target.value) }} label="Username" variant="standard" size="small" style={{ borderRadius: 5, marginTop: 18, marginBottom: 8, width: "100%" }} />
                    <TextField onChange={(event) => { setPassword(event.target.value) }} label="Password" type="password" autoComplete="current-password" variant="standard" size="small" style={{ borderRadius: 5, marginTop: 8, marginBottom: 18, width: "100%" }} />
                    <RadioGroup row value={userType} onChange={(event) => setUserType(event.target.value)}>
                        <FormControlLabel value="patient" control={<Radio />} label="Patient" />
                        <FormControlLabel value="doctor" control={<Radio />} label="Doctor" />
                    </RadioGroup>
                    <TextField onChange={(event) => { setData(event.target.value) }} label={userType == "patient" ? "Enter your previous ailments" : "Enter your medical field"} variant="standard" size="small" style={{ borderRadius: 5, marginTop: 8, marginBottom: 18, width: "100%" }} />
                </div>
                <Button onClick={createAccount} variant="contained" style={{ marginTop: "auto", marginBottom: "18px", width: "70%", textTransform: "none", background: "linear-gradient(45deg, rgb(0,75,173), rgb(255,22,35))" }}>
                    Sign up
                </Button>
                <Typography variant="caption" style={{ paddingBottom: "18px" }}>
                    Already have an account? <a style={{ color: "rgb(255,22,35)" }} href="/login">Login</a> right now!
                </Typography>
            </div>

        </Box>
    )
}