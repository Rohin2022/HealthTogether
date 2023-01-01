import LoginCard from "./LoginCard"
import logo from './Logo.png'
import CreateAccountCard from "./CreateAccountCard"

export default function LoginPage(props) {
    return (
        <div style={{ width: "100vw", height: "100vh", backgroundColor: "black",display:"flex",alignItems:"center",justifyContent:"center" }}>
            <div style={{ width: "90%", height: "90%", display: "flex", justifyContent: "space-between",alignItems:"center" }}>
                <img src={logo} style={{ height:"400px", flexBasis: "50%" }} />
                <div style={{ width: "50%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <CreateAccountCard />
                </div>
            </div>
        </div>
    )
}