import React, { useEffect, useState} from 'react';
import './main.css';

import api from '../services/api';

export default function Main(){
    const [user, setUser] = useState([]);
    const [slide, setSlide] = useState(0);

    useEffect( () => {
        async function loadUsers(){
            const response = await api.get('/');
            const temp = response.data.users;
            setUser(temp);
        }
        loadUsers();
    },[slide]);

    useEffect(() => {
        var i = 0

        const elementos = window.document.getElementsByClassName("slide");
        
        if(elementos.length){
            elementos[slide].style.visibility = "visible";
            
            for(i = 0; i < (elementos.length);i++ ){
                if(i!=slide){
                    elementos[i].style.visibility = "hidden";
                    
                }
            }
        }
        
    });

    return(

         <ul className = "main-container">
             <h1>Comuniki</h1>

            {user.map( user => 
                < li className='slide' key={user.name}>
                    <img src={user.photo} alt={user.name} />
                    <footer>
                        <p id="nome">Nome:<br/> <strong>{user.name}</strong></p>
                        <p id="email" >Email:<br/> <strong>{user.email}</strong></p>
                    </footer>
                </li >
            )}            

            
                <button className="ant" onClick=
                    {
                        slide!=0 ? (
                            () => setSlide(slide - 1)
                        ) : (
                            () => setSlide((window.document.getElementsByClassName('slide').length) - 1)
                        )
                    } 
                >&#10094;</button>

                <button className="prox" onClick=
                    {
                        slide == ((window.document.getElementsByClassName('slide').length) - 1) ? (
                            () => setSlide(0)
                        ) : (
                            () => setSlide(slide + 1)
                        )
                    }
                >&#10095;</button>

                
        
        </ul >

    );
}
