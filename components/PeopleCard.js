import React,{useState} from 'react';
import { Checkbox, Flex, Text, IconButton, Input,Select, Button } from '@chakra-ui/react';
import { DeleteIcon, EditIcon, CheckIcon } from '@chakra-ui/icons';
import { useDispatch, useSelector } from 'react-redux';
import { saveEditedUser, deleteUser, selectRow } from '../utils/tableSlice';

function PeopleCard({user}) {

    const dispatch = useDispatch();


        const { id, name: initialName, email: initialEmail, role: initialRole} = user;

        const selectedRows = useSelector((state)=>state.table.selectedRows);
        

        const [isEditing, setIsEditing] = useState(false);

        const [name, setName] = useState(initialName);
        const [email, setEmail] = useState(initialEmail);
        const [role, setRole] = useState(initialRole);

        const handleEditToggle = () => {
            setIsEditing(!isEditing);
        };

        const handleSave = () => {
            dispatch(saveEditedUser({id,name,email,role}));
            setIsEditing(false);
        };

        const handleDelete = ()=>{
            dispatch(deleteUser(id));
            console.log("deleted")
        }

    const handleRowSelect = (isChecked) => {
        dispatch(selectRow({id, isChecked}));
    };


        return (
            <Flex align="center" justify="space-between" p={4} borderWidth="1px" borderRadius="md" mb={4} backgroundColor={selectedRows?.includes(id) ? 'gray.200' : 'white'}>

                <Checkbox isChecked={selectedRows?.includes(id)} onChange={(e) => handleRowSelect(e.target.checked)} />
                
                {isEditing ? (
                    <>
                        <Input value={name} ml={2} onChange={(e) => setName(e.target.value)} />
                        <Input value={email} ml={2} onChange={(e) => setEmail(e.target.value)} />
                        <Select value={role} ml={2} mr={2} onChange={(e) => setRole(e.target.value)}>
                            <option value="admin">Admin</option>
                            <option value="member">Member</option>
                        </Select>
                    </>
                ) : (
                    <>
                        <Text fontWeight="bold" ml={2}>{name}</Text>
                        <Text ml={2}>{email}</Text>
                        <Text ml={2}>{role}</Text>
                    </>
                )}
                <Flex align="center" justify="space-between" p={2} borderWidth="1px" borderRadius="md" mb={2}>
                    <Button
                        className={`edit ${isEditing ? 'save' : ''}`} 
                        colorScheme={isEditing ? 'green' : 'blue'}
                        onClick={isEditing ? handleSave : handleEditToggle}
                        mr={2}
                    >
                        {isEditing ? <CheckIcon /> : <EditIcon />}
                    </Button>
                    <Button className="delete" colorScheme="red" onClick={handleDelete}>
                        <DeleteIcon />
                    </Button>
                </Flex>
                
            </Flex>
        );
    };



export default PeopleCard;