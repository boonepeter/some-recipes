import React, { useState } from 'react';
import { ListGroup } from 'react-bootstrap';
import { User } from '../types';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { apiBaseUrl } from '../constants';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';

interface Props {
    loggedInUser: User|null|undefined;
}

const ProfileView: React.FC<Props> = ({ loggedInUser }: Props) => {
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
            {
                user.lists?.map(l =>
                    l.recipes && l.recipes.length > 0 ?
                    <div style={{ margin: "20px"}} key={l.title}>
                        <h4>{l.title}</h4>
                        <ListGroup>
                            {
                                l.recipes?.map(r => 
                                    <ListGroup.Item key={r.id}>
                                        <Link to={`/recipes/${r.id}`} >
                                            {r.title}
                                        </Link>
                                    </ListGroup.Item>)
                            }
                        </ListGroup>
                        
                    </div>
                    : null
                    )
            }
        </div>
    )
  
}

export default ProfileView