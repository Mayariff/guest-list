import React from 'react';
import UserList from "./UserList/UserList";

const UserPage = () => {
    return (
        <div>
            <input type={'text'}/>
            <button>Find user</button>
            <UserList />
        </div>
    );
};

export default UserPage;