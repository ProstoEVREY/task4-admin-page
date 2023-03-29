import React, {useContext, useState} from 'react';
import {observer} from "mobx-react-lite";
import {Link, useLocation, useNavigate} from "react-router-dom";
import {Context} from "../index";
import {login, registration} from "../http/userApi";
import {Button, Card, Container, Form} from "react-bootstrap";

const AuthPage = observer(() => {
    const location = useLocation()
    const {user} = useContext(Context)
    const isLogin = location.pathname === '/login' || location.pathname ==='/'

    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    const click = async () => {
        try {
            let data;
            if (isLogin){
                data = await login(email, password)
            }
            else{
                data = await registration(email, password, username)
            }
            user.setUser(user)
            user.setIsAuth(true)
            navigate('/users')
        }
        catch(e){
            alert("No such user exists. Please sign up or enter correct data")
        }
    }


    return (
        <Container
            className="d-flex justify-content-center align-items-center"
            style={{height:window.innerHeight-54}}
        >
            <Card style={{width:600}} className="p-5">
                <h2 className="m-auto"> {isLogin ? 'Authorization' : 'Registration'}</h2>
                <Form className="d-flex flex-column align-items-center">
                    <Form.Control
                        className="mt-3"
                        placeholder="Enter your email address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <Form.Control
                        className="mt-3"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        type='password'
                    />
                    {
                        !isLogin ? <div>
                            <Form.Control
                                className="mt-3 d-flex flex-column align-items-center"

                                style={{width:539,background:"#E9F0FE"}}
                                placeholder="Enter your name"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div> : <></>
                    }
                    <div className="d-inline container-fluid p-2 flex-row mt-3 justify-content-between">
                            {isLogin ? <div className="pl-3 mt-4">
                                Not a user? <Link to='/register'>Sign up</Link>
                            </div> : <div className="pl-3 mt-4">
                                Already have an account? <Link to='/login'>Sign in</Link>
                            </div>}
                    </div>
                    <Button variant="outline-success" className="mt-3 align-self-end m-3"
                            onClick={click}
                    >
                        {isLogin ? "Log In" : "Register"}
                    </Button>
                </Form>
            </Card>
        </Container>
    );
});

export default AuthPage;