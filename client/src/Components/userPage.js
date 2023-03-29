import React, {useEffect, useState} from 'react';
import {Button, InputGroup, Nav, Table, Form, ButtonGroup, FormGroup, Container} from "react-bootstrap";
import {blockUser, deleteUser, getUsers} from '../http/userApi'
import {BsFillTrash3Fill} from 'react-icons/bs'
import {FiLogOut} from 'react-icons/fi'
import {useNavigate} from "react-router-dom";
import dateFormat from 'dateformat'

const UserPage = () => {
    const [users,setUsers] = useState([])
    const [isCheckAll, setIsCheckAll] = useState(false);
    const [isCheck, setIsCheck] = useState([]);
    const navigate = useNavigate()
    const fetch = async () => {
        return await getUsers();
        }
    useEffect( ()=> {
            fetch().then(response => {
                setUsers(response)
            }).catch(e => {
                console.log(e)
            })
    },[])
    const handleSelectAll = () => {
        setIsCheckAll(!isCheckAll);
        setIsCheck(users.map(li => li.id));
        if (isCheckAll) {
            setIsCheck([]);
        }
    };

    const handleSelect = user => {
        return function(){
            if(isCheck.includes(user.id)){
                isCheck.filter(item => item !== user.id)
            }
            else{
                setIsCheck([...isCheck, user.id]);
            }
        }
    };
    const blockFn = async () => {
        if(!isCheck.length){
            alert("No user selected")
        }
        isCheck.forEach(user => {
            blockUser(user.id)
        })
    }
    const deleteFn = async() => {
        if(!isCheck.length){
            alert("No user selected")
        }
        isCheck.forEach(user => {
            deleteUser(user.email)
        })
    }
    const logOut = () => {
        navigate('/')
    }

    return (
        <Container className="p-3">
            <div className="justify-content-center d-flex">
                    <h2>Admin toolbar</h2>
            </div>
            <Nav>
                <div className="p-3">
                    <Form style={{width:100}}>
                        <Form.Check type="checkbox" onChange={handleSelectAll} label={"Select All"}/>
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
                                type="checkbox"
                                onChange={() => {
                                    handleSelect(user)}
                                }
                                defaultChecked={isCheck.includes(user.id)}
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