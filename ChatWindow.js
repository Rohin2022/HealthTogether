import CloseIcon from '@mui/icons-material/Close';
import MinimizeIcon from '@mui/icons-material/Minimize';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import SendIcon from '@mui/icons-material/Send';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, List, ListItem, ListItemText, Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import { onValue, ref } from "firebase/database";
import React, { useEffect, useState } from 'react';
import { db, sendMessage } from './firebaseConfig';
import { getAdditionalInfo, getDrugRecommendations } from './utilityFunctions';
import MedicationIcon from '@mui/icons-material/Medication';

export default function ChatWindow(props) {
    const [message, setMessage] = useState("")
    const [chats, setChats] = useState([])
    const [hide, setHide] = useState(false)
    const [dialogOpen, setDialogOpen] = useState(false)
    const [additionalInfo, setAdditionalInfo] = useState("")

    const startAI = () => {
        setDialogOpen(!dialogOpen)
        getAdditionalInfo(props.ailment).then(data => setAdditionalInfo(data))
    }
    const updateChats = (cs) => {
        setChats(cs)
    }

    const getRecommendations = () => {
        getDrugRecommendations(message).then(data => {
            console.log(data)
            const firstFive = data.map(x => x["drugName"])
            setDialogOpen(!dialogOpen)
            setAdditionalInfo(firstFive.join(", "))
        })
    }

    var chatRef = ref(db, 'chats/' + props.id + "/chats")
    useEffect(() => {
        onValue(chatRef, (data) => updateChats(Object.values(data.val())))
    }, [])

    return (
        <div style={{ overflow: "hidden", width: "300px", height: "300px", backgroundColor: "rgb(50,57,77)", zIndex: 1000, borderRadius: 15, display: hide ? "none" : "flex", flexDirection: "column", justifyContent: "space-between" }}>
            <div style={{ width: "calc(100% - 18px)", height: "40px", backgroundColor: "rgb(0,75,173)", borderTopLeftRadius: 15, borderTopRightRadius: 15, display: "flex", alignItems: "center", justifyContent: "space-between", paddingLeft: 9, paddingRight: 9 }}>
                <Typography variant="h6" style={{ fontSize: "16px", paddingLeft: 8, color: "white" }}>
                    {props.chatName}
                </Typography>
                <div>
                    <IconButton size="small">
                        <MinimizeIcon style={{ color: "white", marginTop: -15 }} size="small" />
                    </IconButton>
                    <IconButton onClick={() => setHide(true)} size="small">
                        <CloseIcon style={{ color: "white" }} />
                    </IconButton>
                </div>
            </div>
            <div style={{ width: "calc(100% - 21px)", height: "177px", overflowY: "scroll", borderLeft: "5px solid rgb(0,75,173)", borderRight: "5px solid rgb(0,75,173)", paddingLeft: 4, paddingRight: 4, paddingTop: 9, paddingBottom: 9 }}>
                <List disablePadding style={{ width: "274px", height: "177px", }}>
                    {chats.map((chat, idx) => {
                        return (
                            <ListItem style={{ width: "45%", marginBottom: 9, backgroundColor: "rgb(0,75,173)", marginLeft: chat.sender === props.uid ? "auto" : "", borderRadius: 15, borderBottomLeftRadius: chat.sender === props.uid ? 15 : 0, borderBottomRightRadius: chat.sender === props.uid ? 0 : 15 }}>
                                <ListItemText key={idx} style={{ color: "white", width: "100%", textAlign: chat.sender === props.uid ? "right" : "left" }}>
                                    <Typography style={{ fontSize: 13, textAlign: "left" }}>
                                        {chat.message}
                                    </Typography>
                                </ListItemText>
                            </ListItem>
                        )
                    })}
                </List>
            </div>
            <div style={{ height: 105, paddingBottom: 4, backgroundColor: "rgb(0,75,173)", borderBottomLeftRadius: 15, borderBottomRightRadius: 15 }}>
                <div style={{ width: "calc(100% - 18px)", height: "40px", display: "flex", alignItems: "center", justifyContent: "space-between", paddingLeft: 9, paddingRight: 9 }}>
                    <IconButton size="small">
                        <PhotoCameraIcon style={{ color: "white" }} />
                    </IconButton>
                    <div>
                        {props.isDoctor ?
                            <IconButton onClick={getRecommendations} size="small" style={{ color: "white" }}>
                                <MedicationIcon style={{ color: "white" }} />
                            </IconButton>
                            :
                            <IconButton onClick={startAI} size="small" style={{ color: "white" }}>
                                AI
                            </IconButton>

                        }
                        <IconButton onClick={() => sendMessage(props.id, message, props.uid)} size="small">
                            <SendIcon style={{ color: "white" }} />
                        </IconButton>
                    </div>
                </div>
                <textarea onChange={(event) => setMessage(event.target.value)} placeholder="Reply..." style={{ width: "calc(100% - 36px)", height: "65px", borderBottomRightRadius: 15, borderBottomLeftRadius: 15, backgroundColor: "rgb(0,75,173", color: "white" }} />
            </div>
            <Dialog open={dialogOpen} onClose={startAI}>
                <DialogTitle>
                    {props.isDoctor?"Possible Drugs":"Additional information on"} {props.isDoctor?props.message: props.ailment}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {additionalInfo}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={startAI}>
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}
