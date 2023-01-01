import SideBar from "./Sidebar"
import { useState, useEffect } from "react"
import ChatWindow from "./ChatWindow"
import Content from './Content'
import { getPatient, getUser } from "./firebaseConfig"

export default function Dashboard(props) {
  const [openChatsIds, setOpenChatsIds] = useState([])
  const [userType, setUserType] = useState("")
  const [userData, setUserData] = useState("")
  const [patients, setPatients] = useState([])
  const [idx1, setIdx1] = useState(0)
  const [idx2, setIdx2] = useState(0)

  const addPatient = (obj) => {
    const temp = [...patients]
    temp.push(obj)
    setPatients(temp)
  }

  const load = () => {
    getUser(props.user.uid, setUserType, setOpenChatsIds,setUserData).then((data) => {
      const userPatients = data[0]
      const type = data[1]
      if(type=="doctor" && userPatients.length!=0){
        for(var patient in userPatients){
          getPatient(userPatients[patient]["patientId"],addPatient)
        }
      }
    })
  }

  useEffect(() => {
    load()
  }, [])

  return (
    <div style={{ width: "100vw", height: "100vh", backgroundColor: "black", overflow: "hidden" }}>
      <SideBar setIdx1={setIdx1} setIdx2={setIdx2} chats={openChatsIds} user={props.user}/>
      <Content chats={openChatsIds.length>0?[openChatsIds[idx1],openChatsIds[idx2]]:[]} user={props.user} userType={userType} patients={patients} reload={load}/>
    </div>
  )
}
