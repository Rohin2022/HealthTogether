import { List, ListItem, ListItemAvatar, ListItemButton, ListItemText, Avatar, Button } from '@mui/material';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import React, { useState, useEffect } from 'react';
import ChatWindow from "./ChatWindow";
import { getRecommendedDoctors, getRecommendedPatients, joinChat } from './firebaseConfig'

export default function Content(props) {
  const [ailment, setAilment] = useState("")
  const [recommendedDoctors, setRecommendedDoctors] = useState([])
  const [recommendedPatients, setRecommendedPatients] = useState([])
  const [patients, setPatients] = useState([])

  useEffect(() => {
    if (props.userType == "patient") {
      findOthers()
    }
  }, [props.userType])

  const findOthers = () => {
    getRecommendedDoctors(props.user.uid, ailment, setRecommendedDoctors)
    getRecommendedPatients(props.user.uid, ailment, setRecommendedPatients)
  }

  const addChat = (doctor, otherIsDoctor) => {
    joinChat(props.user.email, doctor.email, props.user.uid, doctor.uuid, otherIsDoctor)
    props.reload()
  }

  return (
    <div style={{ width: "calc(100vw - 250px)", height: "100vh", marginLeft: "auto" }}>
      <div style={{ textAlign: "left", paddingTop: 72, paddingLeft: 54, height: "calc(100vh - 72px)", paddingRight: 54 }}>
        <Typography variant="h5" style={{ color: "white" }}>
          Hello {props.user.email}
        </Typography>

        {props.userType == "patient" ?
          <React.Fragment>
            <div style={{ display: "flex", alignItems: "center", gap: 36 }}>
              <TextField focused onChange={(event) => { setAilment(event.target.value) }} label="Enter current ailments" variant="standard" sx={{ input: { color: 'white' } }} style={{ borderRadius: 5, marginTop: 18, marginBottom: 8, width: "100%" }} />
              <Button variant="contained" onClick={findOthers}>
                Search
              </Button>
            </div>
            <div style={{ width: "100%", height: "100%", display: "flex", paddingTop: 36, justifyContent: "space-evenly" }}>
              <div style={{ width: "45%", height: "100%", alignItems: "center", display: "flex", flexDirection: "column" }}>
                <Typography variant="h6" style={{ color: "white", textAlign: "center" }}>
                  Connect with a doctor
                </Typography>
                <List style={{ width: "100%", display: "flex", flexDirection: "column", gap: "9px" }}>
                  {recommendedDoctors.map((doctor) => {
                    return (
                      <ListItem disableGutters disablePadding style={{ color: "white", borderRadius: 15, backgroundColor: "rgb(50,57,77)" }}>
                        <ListItemButton style={{ borderRadius: 15 }} onClick={() => addChat(doctor, true)}>
                          <ListItemAvatar>
                            <Avatar style={{ backgroundColor: "rgb(0,75,173)" }}>{doctor.email.charAt(0).toUpperCase()}</Avatar>
                          </ListItemAvatar>
                          <div style={{ display: "flex", flexDirection: "column" }}>
                            <Typography textAlign="left" noWrap style={{ width: "100%" }}>{`Doctor ${doctor.email}`}</Typography>
                            <Typography textAlign="left" noWrap style={{ width: "100%", color: "lightgray", fontSize: 15 }}>{`Specialities: ${doctor.data} care`}</Typography>
                          </div>
                        </ListItemButton>
                      </ListItem>
                    )
                  })}
                </List>
              </div>
              <div style={{ width: "45%", height: "100%" }}>
                <Typography variant="h6" style={{ color: "white", textAlign: "center" }}>
                  Connect with a patient
                </Typography>
                <List style={{ width: "100%" }}>
                  {recommendedPatients.map((patient) => {
                    return (
                      <ListItem disableGutters disablePadding style={{ color: "white", borderRadius: 15, backgroundColor: "rgb(50,57,77)" }}>
                        <ListItemButton style={{ borderRadius: 15 }} onClick={() => addChat(patient, false)} >
                          <ListItemAvatar>
                            <Avatar style={{ backgroundColor: "rgb(0,75,173)" }}>{patient.email.charAt(0).toUpperCase()}</Avatar>
                          </ListItemAvatar>
                          <div style={{ display: "flex", flexDirection: "column" }}>
                            <Typography textAlign="left" noWrap style={{ width: "100%" }}>{`Patient ${patient.email}`}</Typography>
                            <Typography textAlign="left" noWrap style={{ width: "100%", color: "lightgray", fontSize: 15 }}>{`Ailments: ${patient.data}`}</Typography>
                          </div>
                        </ListItemButton>
                      </ListItem>
                    )
                  })}
                </List>
              </div>
            </div>
          </React.Fragment>
          :
          <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", paddingTop: 36 }}>
            <Typography variant="h6" style={{ color: "white" }}>
              Your patients
            </Typography>
            <List style={{ width: "100%", display: "flex", flexDirection: "column", gap: "9px", paddingTop: 18 }}>
              {props.patients.map((patient) => {
                return (
                  <ListItem disableGutters disablePadding style={{ color: "white", borderRadius: 15, backgroundColor: "rgb(50,57,77)" }}>
                    <ListItemButton style={{ borderRadius: 15 }}>
                      <ListItemAvatar>
                        <Avatar style={{ backgroundColor: "rgb(0,75,173)" }}>{patient.email.charAt(0).toUpperCase()}</Avatar>
                      </ListItemAvatar>
                      <div style={{ display: "flex", flexDirection: "column" }}>
                        <Typography textAlign="left" noWrap style={{ width: "100%" }}>{`Patient ${patient.email}`}</Typography>
                        <Typography textAlign="left" noWrap style={{ width: "100%", color: "lightgray", fontSize: 15 }}>{`Ailments: ${patient.data}`}</Typography>
                      </div>
                    </ListItemButton>
                  </ListItem>
                )
              })}
            </List>
          </div>

        }

      </div>
      <div style={{ position: "absolute", height: "300px", right: 0, bottom: 0, paddingBottom: 9, display: "flex", gap: 9, paddingRight: 9 }}>

        {props.chats.map((chatId, idx) => {
          return (
            <ChatWindow id={chatId.chatId} idx={idx} key={idx} uid={props.user.uid} ailment={ailment} isDoctor={props.userType=="doctor"}/>

          )
        })}


      </div>
    </div>
  )
}
