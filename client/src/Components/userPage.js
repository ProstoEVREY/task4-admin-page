import React, {useEffect, useState} from 'react';
import {Button, Nav, Table, Form, ButtonGroup, Container} from "react-bootstrap";
import {blockUser, deleteUser, getUsers} from '../http/userApi'
import {BsFillTrash3Fill} from 'react-icons/bs'
import {FiLogOut} from 'react-icons/fi'
import {useNavigate} from "react-router-dom";
import dateFormat from 'dateformat'
import jwtDecode from "jwt-decode";

const UserPage = () => {
    const [users,setUsers] = useState([])
    const [isCheckAll, setIsCheckAll] = useState(false);
    const [isCheck, setIsCheck] = useState([]);
    const [toNavigate,setToNavigate] = useState(false)
    const navigate = useNavigate()
    const decoded =  jwtDecode(localStorage.getItem('token'))

    const fetch = async () => {
        return await getUsers();
        }
    useEffect( ()=> {
            fetch().then(response => {
                setUsers(response)
                // setUsers(users.sort((a, b) => (a.id > b.id) ? 1 : -1))
            }).catch(e => {
                console.log(e)
            })
            if(toNavigate){
            navigate('/')
            }
    },[isCheck,toNavigate])
    const handleSelectAll = e => {
        setIsCheckAll(!isCheckAll);
        setIsCheck(users.map(li => li.id.toString()));
        if (isCheckAll) {
            setIsCheck([]);
        }
    };

    const handleSelect = e => {
        const {id,checked} = e.target
        setIsCheck([...isCheck, id]);
        if (!checked) {
            setIsCheck(isCheck.filter(item => item !== id));
        }
    };
    const blockFn = async () => {
        if(!isCheck.length){
            alert("No user selected")
        }
        for(let id of isCheck){
            await blockUser(id).catch(e => console.log(e))
        }
        alert("Operation complete")
        if(isCheck.includes(decoded.id.toString())){
            setToNavigate(true)
        }
        setIsCheck([])
    }
    const deleteFn = async() => {
        if(!isCheck.length){
            alert("No user selected")
        }
        for(let id of isCheck){
            await deleteUser(id).catch(e => console.log(e))
        }
        alert("Operation complete")
        if(isCheck.includes(decoded.id.toString())){
            setToNavigate(true)
        }
        setIsCheck([])
    }
    const allPresent = () => {
        let ids = []
        users.forEach(user => {
            ids.push(user.id.toString())
        })
        return JSON.stringify(isCheck.sort()) === JSON.stringify(ids.sort())
    }
    const logOut = () => {
        navigate('/')
    }

    if(decoded.status === "BLOCKED"){
        return (
            <div>
                <h2>FORBIDDEN</h2>
                <Button onClick={() => {
                    navigate('/')
                }
                }>Back to login screen</Button>
            </div>
        )
    }

    return (
        <Container className="p-3">
            <div className="justify-content-center d-flex">
                    <h2>Admin toolbar</h2>
            </div>
            <Nav>
                <div className="p-3">
                    <Form style={{width:100}}>
                        <Form.Check type="checkbox"
                                    onChange={handleSelectAll}
                                    checked={isCheckAll || allPresent()}
                                    id={"Select All"}
                                    label={"Select All"}/>
                    </Form>
                </div>
                <div className="justify-content-end">
                    <ButtonGroup>
                        <Button
                            variant="danger"
                            onClick={blockFn}>
                            Block/Unblock
                        </Button>
                        <Button variant="danger" onClick={deleteFn}>
                            <BsFillTrash3Fill />
                        </Button>
                        <Button variant="warning"
                                onClick={logOut}>
                            <FiLogOut />
                        </Button>
                    </ButtonGroup>
                </div>
            </Nav>
            <div className="align-self-center align-items-center">
            <Table bordered hover>
                <thead>
                <tr>
                    <th>Select</th>
                    <th>Id</th>
                    <th>User Name</th>
                    <th>Email</th>
                    <th>Registration Date</th>
                    <th>Last Login Date</th>
                    <th>Status</th>
                </tr>
                </thead>
                <tbody>
                {
                    users?.map((user) =>
                        <tr key={user.id}>
                        <th>
                            {<Form className="mb-3 justify-content-center">
                            <Form.Check
                                id={user.id}
                                type="checkbox"
                                checked={isCheck.includes(user.id.toString())}
                                onChange={(e) => {
                                    handleSelect(e)}
                                }
                            />
                        </Form>}
                        </th>
                        <th>{user.id}</th>
                        <th>{user.username}</th>
                        <th>{user.email}</th>
                        <th>{dateFormat(user.registrationDate)}</th>
                        <th>{dateFormat(user.lastLoginDate)}</th>
                        <th>{user.status}</th>
                        </tr>
                    )
                }
                </tbody>
            </Table>
            </div>
        </Container>
    );
};

export default UserPage;