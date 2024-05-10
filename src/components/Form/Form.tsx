import { ChangeEvent, useState } from 'react';
import './Form.css'

const loginData = {
    email: 'jmanuelc369@gmail.com',
    password: '12345'
}

function Form(){
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [showData, setShowData] = useState<boolean>(false);

    // const handleInputChange = (stateUpdate) => {
    //     return (event) => {
    //         stateUpdate(event.target.value);
    //     }
    // }

    const handleOnEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    }
    
    const handleOnPasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);

    }

    const handleOnClick = () =>{
        if(!showData){
            if(email === loginData.email && password === loginData.password){
                setShowData(true);
            }
            else{
                alert("Credenciales incorrectas.");
            }

        }
        else{
            setShowData(!showData)
            
        }
        
    }

    return (
        <>
            <section className='dataContainer'>
                {showData && (
                        <p>Bienvenido: {email}</p>   
                )}
            </section>
            <section>
                <div className="inputDiv">
                    <input type="email" id="email" name="email" value={email} placeholder="Correo" className="loginInput" onChange={handleOnEmailChange}/>
                    <input type="password" id="password" name="password"  value={password} placeholder="Contraseña" className="loginInput" onChange={handleOnPasswordChange}/>
                </div>
                <button onClick={handleOnClick}>
                    {
                        showData ? "Salir" : "Enviar"
                    }
                </button>
            </section>
        </>
    );
}


export default Form;