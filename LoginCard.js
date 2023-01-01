import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import { forgotPassword, signInUser } from './firebaseConfig';

export default function LoginCard(props) {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("")
    const [dialog, setDialogVisible] = useState(false)

    const authenticateUser = () => {
        signInUser(username,password)
    }

    const openDialog = () => {
        setDialogVisible(true)
    }

    const closeDialog = () => {
        setDialogVisible(false)
    }

    const sendResetLink = () => {
        forgotPassword(email)
        closeDialog()
    }

    return (
        <Box sx={{ boxShadow: 10 }} style={{ width: 400, height: 400, borderRadius: 5, backgroundColor: "rgba(255,255,255,0.2)", backdropFilter: "blur(4px)" }}>
            <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center" }}>
                <Typography variant="h4" style={{ paddingTop: "18px", color: "#005DAA" }}>
                    Login to HealthTogether
                </Typography>
                <div style={{ width: "60%", marginTop: "auto", marginBottom: "auto" }}>
                    <TextField autoFocus onChange={(event) => { setUsername(event.target.value) }} label="Username" variant="standard" size="small" style={{ borderRadius: 5, marginTop: 18, marginBottom: 8, width: "100%" }} />
                    <TextField onChange={(event) => { setPassword(event.target.value) }} label="Password" type="password" autoComplete="current-password" variant="standard" size="small" style={{ borderRadius: 5, marginTop: 8, marginBottom: 18, width: "100%" }} />
                    <Typography variant="caption">
                        <Button size="small" disableRipple onClick={openDialog} style={{ textTransform: "none", backgroundColor: "rgba(0,0,0,0)",color:"rgb(255,22,35)" }}>
                            Forgot password?
                        </Button>
                    </Typography>
                </div>
                <Button onClick={authenticateUser} variant="contained" style={{ marginTop: "auto", marginBottom: "18px", width: "70%", textTransform: "none", background: "linear-gradient(45deg, rgb(0,75,173), rgb(255,22,35))" }}>
                    Login
                </Button>
                <Typography variant="caption" style={{ paddingBottom: "18px" }}>
                    Don't have an account? <a style={{ color: "rgb(255,22,35)" }} href="/newUser">Create one</a> today!
                </Typography>
            </div>
            <Dialog open={dialog} onClose={closeDialog}>
                <DialogTitle>
                    Reset Password
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        To recieve a reset link, please enter your email address here. We
                        will send an email which will provide instructions on how to reset your account
                    </DialogContentText>
                    <TextField autoFocus onChange={(event) => { setEmail(event.target.value) }} label="Email" variant="standard" size="small" style={{ borderRadius: 5, marginTop: 18, marginBottom: 8, width: "100%" }} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={closeDialog}>
                        Cancel
                    </Button>
                    <Button onClick={sendResetLink}>
                        Send Reset Link
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    )
}