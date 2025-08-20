import { signOut } from "firebase/auth"
import {auth} from '../../firebase'

export default function Chat({user}){
    return(
        <div>
            <h1>Logged in</h1>
            <h2>Welcome {user.email}</h2>
            <button onClick={()=> signOut(auth)}>Logout</button>
        </div>
    )
}