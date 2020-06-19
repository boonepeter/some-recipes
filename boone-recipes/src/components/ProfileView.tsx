import React, { useState } from 'react';
import { CardColumns, Spinner } from 'react-bootstrap';
import { Recipe, User, RecipeList } from '../types';
import Preview from './Preview'
import { useLocation, useParams } from 'react-router-dom';
import axios from 'axios';
import { apiBaseUrl } from '../constants';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';


const ProfileView: React.FC = () => {
    const { username } = useParams<{username: string}>();
    const [ user, setUser ] = useState<User|undefined>(undefined);
    React.useEffect(() => {
        const findLists = async () => {
            if (!username) {
                return;
            }
            const fullUser = await axios.get<User|undefined>(`${apiBaseUrl}/users/${username}`)
            if (fullUser) {
                setUser(fullUser.data);
                console.log('fullUser', fullUser.data)
            }
        }
        findLists();
    }, [ username ])

    if (!user) {
        return (
            <div>Profile</div>
        )
    }
    return (
        <div >
            <div className="d-flex flex-row " style={{ marginTop: 40}}>
            <FontAwesomeIcon size="10x" icon={faUserCircle} />
            <h3 className="mt-auto">{user.name}</h3>
            </div>
            <ul>
                { 
                  user.lists?.map(l => 
                     <li key={l.title} >{l.title}</li> 
                  )
                }
            </ul>
        </div>
    )
  
}

export default ProfileView