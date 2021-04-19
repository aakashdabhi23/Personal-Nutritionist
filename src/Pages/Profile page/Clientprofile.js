import React, { useRef } from 'react';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import InputAdornment from '@material-ui/core/InputAdornment';
import {db} from '../../firebase'
import './Clientprofile.css';
// import avatar from './user.png';
import Footer from '../../Components/Footer/footer'
import { Avatar } from '@material-ui/core';
import {useAuth} from '../../AuthContext'


export default function Clientprofile(props) {
    const user = useAuth()
    const name = useRef(null);
    const details = {
        height: 0,
        weight: 0,
        activity_level:0,
        gender:"Female",
        name:"Your Name goes here!",
        goal:1,
        age: 0,
        email:"",
        image:""
    };

    const [data,setdata] = React.useState(details);

    React.useEffect(() => {
        
        db.collection('Users').doc('Client')
        .collection('clientel')
        .doc('props.match.params.uid')
        .onSnapshot((snap)=>{
            setdata(snap.data());
        })

    }, [])
    name.current = data?.name
    const handlechange = ()=>{
        // change code
    }

    return (

    <div className="Profile">
        <div className="parent__container">

            <div className="profile__title">
                <h3> Your Profile </h3>
            </div>

            <div className="user_photo">
                <div className="Avatar">
                    <Avatar src={data?.image} style={{height:'100px', width:'100px'}}/>
                </div>
            </div>

            <div className="Info">
                <TextField id="username" label="Username" value={data?.name} variant="outlined" />
                <TextField id="Email" label="Email" value={data?.email} variant="outlined" type="email" />
                <TextField id="Password" label="Password" value="12345" variant="outlined" type="password" />
                <div className="numericals">
                    <TextField id="weight" label="Weight" value={data?.weight}
                           InputProps={{
                                endAdornment: <InputAdornment position="end">Kg</InputAdornment>,
                            }}
                            variant="outlined" />
                    <TextField id="height" label="Height" value={data?.height}
                           InputProps={{
                                endAdornment: <InputAdornment position="end">cm</InputAdornment>,
                            }}
                            variant="outlined" />
                    <TextField id="age" label="Age" value={data?.age}
                           InputProps={{
                                endAdornment: <InputAdornment position="end">years</InputAdornment>,
                            }}
                            variant="outlined" />
                </div>
                <TextField id="Goal_select" label="Goal" value={data?.goal} variant="outlined" placeholder="Maintain weight" select>
                            <MenuItem value="0">Maintain weight</MenuItem>
                            <MenuItem value="1">Lose weight</MenuItem>
                            <MenuItem value="2">Gain weight</MenuItem>
                </TextField>
                <TextField id="Activity_select" label="Activity" value={data?.activity_level} variant="outlined" placeholder="Moderate" select>
                            <MenuItem value="0">Moderate</MenuItem>
                            <MenuItem value="1">Light active</MenuItem>
                            <MenuItem value="2">Highly active</MenuItem>
                </TextField>
            </div>

            <div style={{width:'100%', display:'flex', justifyContent:'center'}}>
                <Button id='trial__but' onClick={handlechange} variant="filled" style={{ background: '#699DFF', fontFamily: 'Poppins, sans-serif', textTransform: 'capitalize', color: 'white'}}> 
                    Save Changes
                </Button>
            </div>
        </div>
        <Footer />
    </div>

  )
};
