import './index.scss';
import Success from './components/Success';
import Users from './components/Users';
import React, { useState, useEffect } from 'react';

type User = {
   id: number,
   email: string,
   first_name: string,
   last_name: string,
   avatar: string,
};

const App = () => {

    const [users, setUsers] = useState<User[]>([]);
    const [invites, setInvites] = useState<number[]>([]);
    const [isLoading, setLoading] = useState<boolean>(true);
    const [success, setSuccess] = useState<boolean>(false);
    const [searchValue, setSearchValue] = useState<string>('');


    useEffect(() => {
        fetch('https://reqres.in/api/users')
            .then((res) => res.json())
            .then((json) => {
            setUsers(json.data);
        }).catch(err => {
            console.warn(err);
            alert('Ошибка при получении пользователей')
        }).finally(() => setLoading(false));
    }, []);


    const onChangeSearchValue = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(event.target.value);
    };

    const onClickInvite = (id: number) => {
        if (invites.includes(id)) {
            setInvites(prev => prev.filter(_id => _id !== id))
        } else {
            setInvites(prev => [...prev, id]);
        };
    };

    const onClickSendInvites = () => {
        setSuccess(true);
    };

    return (
        <div className="App">
            {
                success ? (
                    <Success count={invites.length} />
                ) : (
                    <Users 
                        onChangeSearchValue={onChangeSearchValue}
                        searchValue={searchValue} 
                        items={users} 
                        isLoading={isLoading}
                        invites={invites}
                        onClickInvite={onClickInvite}
                        onClickSendInvites={onClickSendInvites}
                    />
                )
            }
        </div>
    );
};

export default App;
