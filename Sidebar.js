import { ListSubheader, Tooltip } from '@mui/material';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { get, ref } from "firebase/database";
import React, { useEffect, useState } from 'react';
import { db, logout } from './firebaseConfig';
import logo from './Logo.png';

export default function SideBar(props) {
    const [selectedItem, setSelected] = useState(0)
    const [selectedItem2, setSelectedItem2] = useState(0)
    const [doctorChatsUserId, setDoctorChatsUserId] = useState([])
    const [doctorChatsOtherId, setDoctorChatsOtherId] = useState([])
    const [patientChatsUserId, setPatientChatsUserId] = useState([])
    const [patientChatsOtherId, setPatientChatsOtherId] = useState([])

    const setChoosen1 = (idx) => {
        setSelected(idx)
        props.setIdx1(idx)
    }

    const setChoosen2 = (idx) => {
        setSelectedItem2(idx)
        props.setIdx2(idx)
    }

    const drawerWidth = 250


    useEffect(() => {
        var chatRef = ref(db, 'chats')
        get(chatRef).then((data) => {
            const snapshot = data.val()
            const ids = Object.keys(snapshot)
            const values = Object.values(snapshot)
            const filtered = values.filter((obj, idx) => {
                console.log(ids[idx])
                console.log(props.chats)
                if (props.chats.includes(ids[idx])) {
                    return true
                }
                return false
            })
            console.log("settt")
            var userIds = []
            var otherIds = []
            var userIds2 = []
            var otherIds2 = []
            for (var i = 0; i < filtered.length; i++) {

                if (filtered[i]["otherIsDoctor"]) {
                    userIds.push(filtered[i]["userId"])
                    otherIds.push(filtered[i]["userOther"])
                }
                else {
                    userIds2.push(filtered[i]["userId"])
                    otherIds2.push(filtered[i]["userOther"])
                }
            }
            setDoctorChatsUserId(userIds)
            setDoctorChatsOtherId(otherIds)

            setPatientChatsUserId(userIds2)
            setPatientChatsOtherId(otherIds2)
        })

    }, [props.chats])


    return (
        <Drawer
            sx={{
                width: drawerWidth,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                    width: drawerWidth,
                    boxSizing: 'border-box',
                },
            }}
            PaperProps={{
                sx: {
                    background: "rgb(50,57,77)",
                    border: "none",
                    borderTopRightRadius: 15,
                    borderBottomRightRadius: 15
                }
            }}
            variant="permanent"
            anchor="left"

        >
            <Tooltip title="Sign out">
                <img onClick={logout} src={logo} style={{ width: 80, justifySelf: "left", paddingLeft: 18, marginTop: 18, cursor: "pointer" }} />
            </Tooltip>
            <Divider style={{ marginTop: 18 }} />
            <List subheader={<ListSubheader style={{ backgroundColor: "rgb(50,57,77)", color: "white", textAlign: "left" }}>Physician Conversations</ListSubheader>} style={{ marginTop: 0, display: 'flex', flexDirection: "column" }}>
                {doctorChatsUserId.map((chat, idx) => {
                    var userOther = doctorChatsOtherId[idx]
                    return (
                        <ListItem key={idx} disablePadding style={{ width: "90%", marginTop: idx == 0 ? 0 : 18, borderRadius: 15, marginLeft: "calc(10% / 2)", background: selectedItem == idx ? "rgb(0,75,173)" : "" }}>
                            <ListItemButton sx={{ "&:hover": { backgroundColor: "transparent", } }} disableRipple onClick={() => { setChoosen1(idx) }} style={{ borderRadius: 5 }}>
                                <ListItemText primary={chat.userId === props.user.uuid ? userOther : chat.userId} style={{ color: "white" }} />
                            </ListItemButton>
                        </ListItem>
                    )
                })}


            </List>
            <Divider style={{ marginTop: 18 }} />
            <List subheader={<ListSubheader style={{ backgroundColor: "rgb(50,57,77)", color: "white", textAlign: "left" }}>Patient Conversations</ListSubheader>} style={{ marginTop: 0, display: 'flex', flexDirection: "column" }}>
                {patientChatsUserId.map((chat, idx) => {
                    var userOther = patientChatsOtherId[idx]
                    console.log("WOOOHOOO")
                    return (
                        <ListItem key={idx} disablePadding style={{ width: "90%", marginTop: idx == 0 ? 0 : 18, borderRadius: 15, marginLeft: "calc(10% / 2)", background: selectedItem2 == idx ? "rgb(0,75,173)" : "" }}>
                            <ListItemButton sx={{ "&:hover": { backgroundColor: "transparent", } }} disableRipple onClick={() => { setChoosen2(idx) }} style={{ borderRadius: 5 }}>
                                <ListItemText primary={chat.userId === props.user.uuid ? userOther : chat.userId} style={{ color: "white" }} />

                            </ListItemButton>
                        </ListItem>
                    )
                })}
            </List>
        </Drawer>
    )
}