import React, { useState } from 'react';
import { ListGroup, Button, Image } from 'react-bootstrap';
import { User } from '../types';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { apiBaseUrl, blobBaseUrl } from '../constants';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle, faEdit } from '@fortawesome/free-solid-svg-icons';

interface Props {
    loggedInUser: User|null|undefined;
}

const ProfileView: React.FC<Props> = ({ loggedInUser }: Props) => {
    const { username } = useParams<{username: string}>();
    const [ user, setUser ] = useState<User|undefined>(undefined);
    const [profilePic, setProfilePic] = useState<File|undefined>(undefined);
    const [showEdit, setShowEdit] = useState<boolean>(false);

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

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e?.target?.files && e.target.files.length !== 0) {
            setProfilePic(e.target.files[0]);
        }
    }

    const handleUpload = async () => {
        if (profilePic) {
            let form = new FormData();
            form.append("profile", profilePic);
            const res = await axios.post(`${apiBaseUrl}/upload/profile/${user?.username}`, form);
            if (res.data) {
                console.log(res.data);
                setUser(res.data);
            }
        }
    }

    if (!user) {
        return (
            <div>Profile</div>
        )
    }

    return (
        <div >
            <div className="d-flex flex-row " style={{ marginTop: 40}}>
                {
                user.profilePicUrl ? 
                        <Image src={`${blobBaseUrl}/pics/${user.username}/profile.png`} rounded height="200px"/>
                        :
                        <FontAwesomeIcon icon={faUserCircle} size="10x"/>
                    }

            <div>
                {
                    loggedInUser?.userId == user.userId ? 
                    <Button onClick={() => setShowEdit(!showEdit)} title="Change Picture" size="sm" variant="outline-primary" style={{ margin: "5px"}}>
                        <FontAwesomeIcon icon={faEdit} />
                    </Button>
                    : null
                }        
                {
                loggedInUser?.userId === user.userId && showEdit ? 
                <div>
                    <input type="file" onChange={handleImageChange} />
                    <Button onClick={handleUpload}>Submit</Button>
                </div>
                : null
                }

                <h3 className="mt-auto">{user.name}</h3>
            </div>
            </div>
            {
                user.lists?.map((l, index) =>
                    l.recipes && l.recipes.length > 0 ?
                    <div style={{ margin: "20px"}} key={l.title + index}>
                        <h4>{l.title}</h4>
                        <ListGroup>
                            {
                                l.recipes?.map((r, rIndex) => 
                                    <ListGroup.Item key={r.recipeId + rIndex}>
                                        <Link to={`/recipes/${r.recipeId}`} >
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