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
    const [ profilePic, setProfilePic ] = useState<File|undefined>(undefined);
    const [ showEdit, setShowEdit ] = useState<boolean>(false);

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
                setProfilePic(undefined);
                setShowEdit(false);
            }
        }
    }

    if (!user) {
        return (
            <div>Profile</div>
        )
    }
    return (
        <div className="container">
            <div className="row" >
                <div className='col sm auto' style={{maxWidth:'180px'}}>
                  <div className='row' style={{display: 'grid'}}>
                    <div style={{gridColumn: 1, gridRow: 1}}>

                    {
                        user.profilePicUrl ? 
                        <Image src={`${blobBaseUrl}/pics/${user.username}/profile.png`} style={{borderRadius: "50%"}} height="175px"/>
                        :
                        <FontAwesomeIcon icon={faUserCircle} size="10x"/>
                    }
                    </div>
                    <div className='layer1' style={{gridColumn: 1, gridRow: 1, alignSelf: 'end'}}>
                    {
                        loggedInUser?.userId === user.userId ? 
                        <Button onClick={() => setShowEdit(!showEdit)} title="Change Picture" size="sm" variant="light">
                            <FontAwesomeIcon icon={faEdit} />
                        </Button>
                        : null
                    }
                    </div>
                  </div>
                </div>
                <div className='col align-self-end'>
                  <h3 className="mt-auto">{user.name}</h3>
                </div>
            </div>
            <div className='row'>
              {
                loggedInUser?.userId === user.userId && showEdit ? 
                <div>
                  <input type="file" onChange={handleImageChange} />
                  {
                    profilePic ?
                      <Button size='sm' onClick={handleUpload}>Save</Button>
                      : null
                  }
                </div>
                : null
              }

            </div>
            <div className='row'>
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
        </div>
    )
}

export default ProfileView