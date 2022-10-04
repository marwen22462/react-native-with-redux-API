import {User} from './userListSlice'
type ResponseKind = 'success' | 'failure';

type NetworkResponse <T> = {
kind : ResponseKind;
Body?: T;
};

export const fetchUsers = async (): Promise <NetworkResponse<User[]>> => {
const response =await fetch (
    `https://dummyjson.com/users`, 
    {
        methode: 'GET',
        // Header: {
        //     Accept: 'application/json', 'Content-Type': 'application/json'
        // },
    },
);
if (response.ok) {
    const json = await response.json();
    
    return {
        kind:'success',
        Body: json.users,
    };

}else {
    return {
        kind: 'failure'
    }
}
}