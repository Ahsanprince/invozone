import React, { useState, useEffect } from 'react';
import { Grid, Box, Button, Card, CardContent, Typography, makeStyles } from '@material-ui/core';
import { AddCircle as Add } from '@material-ui/icons';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom'
import { userprofileFailure, userprofileStart, userprofileSuccess } from "../redux/userprofileRedux";
const useStyle = makeStyles(theme => ({
    container: {
        margin: '100px 110px',
        [theme.breakpoints.down('md')]: {
            marginTop: 110,
        },
    },
    picture: {
        textAlign: 'center',
        display: 'block',
        width: "160px",
        height: "160px",
        borderRadius: "80px"
    },
    spanstyle: { color: "red", marginTop: "10px" },
    addIcon: { marginLeft:65 },
}));
const initialPost = {
    gender: '',
    phonenumber: '',
    bio: '',
}
const CreateUserprofile = () => {
    const classes = useStyle();
    const dispatch = useDispatch();
    const history = useHistory();
    const user = useSelector((state) => state.user.currentUser);
    const [userprofiledata, setUserprofiledata] = useState(initialPost);
    const [imageurl, setImageurl] = useState('');
    const [profile, setProfile] = useState({});
    const [image, setImage] = useState('');
    const { isFetching, error } = useSelector((state) => state.userprofile);
    const imgbefore = `http://localhost:8000/${profile?.userprofile?.picture.slice(7,)}`
    const userid = user.id;
    const name = user.name;
    const email = user.email;
    useEffect(() => {
        const getImage = async () => {
            if (image) {
                var reader = new FileReader();
                reader.onloadend = function () {
                    setImageurl(reader.result)
                }
                reader.readAsDataURL(image);
            }
        }
        getImage();
    }, [image])
    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get(`http://localhost:8000/userprofile/${userid}`)
            setProfile(response.data);
        }
        fetchData()
    }, [])
    const saveUserprofile = async () => {
        await createUserprofile(dispatch, userprofiledata);
    }
    const handleChange = (e) => {
        setUserprofiledata({ ...userprofiledata, [e.target.name]: e.target.value });
    }
    const createUserprofile = async (dispatch, userprofile) => {
        dispatch(userprofileStart());
        try {
            const data = new FormData();
            data.append("picture", image);
            data.append("gender", userprofiledata.gender);
            data.append("phonenumber", userprofiledata.phonenumber);
            data.append("bio", userprofiledata.bio);
            const result = await axios.post(`http://localhost:8000/userprofile/${userid}`,
                data, {
                headers: {
                    Authorization: "Bearer " + JSON.parse(localStorage.getItem('currentUser')).accesstoken
                }
            }
            );
            console.log(result)
            dispatch(userprofileSuccess(result.data));
            alert('User Profile Saved Successfully');
            // history.push('/')
        } catch (err) {
            dispatch(userprofileFailure());
        }
    };
    return (
        <div className="Userprofile">
            <Grid className={classes.container}>
                <Card style={{ maxWidth: 450, padding: "20px 5px", margin: "0 auto" }}>
                    <CardContent>
                        <Typography gutterBottom variant="h5">
                            User Profile
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p" gutterBottom>
                            {name}
                        </Typography>
                        <div>
                        <img src={imageurl ? imageurl : imgbefore} alt="No Profile Picture" className={classes.picture} />
                        <label htmlFor="fileInput">
                            <Add className={classes.addIcon} fontSize="large" color="action" />
                        </label>
                        </div>
                        <Grid container spacing={1}>
                            <Grid xs={12} sm={6} item>
                                <input value={name} variant="outlined" disabled fullWidth />
                            </Grid>
                            <Grid xs={12} sm={6} item>
                                <input value={email} type='email' variant="outlined" disabled fullWidth />
                            </Grid>
                        </Grid>
                        <Grid container spacing={1}>
                            <Grid xs={12} sm={6} item>
                                <input
                                    type="file"
                                    id="fileInput"
                                    style={{ display: "none" }}
                                    onChange={(e) => setImage(e.target.files[0])}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <input defaultValue={profile?.userprofile?.gender} name='gender' placeholder="Enter gender" onChange={(e) => handleChange(e)} variant="outlined" fullWidth required />
                            </Grid>
                            <Grid item xs={12}>
                                <input defaultValue={profile?.userprofile?.phonenumber} name='phonenumber' type="number" onChange={(e) => handleChange(e)} placeholder="Enter phone number" variant="outlined" fullWidth required />
                            </Grid>
                            <Grid item xs={12}>
                                <input defaultValue={profile?.userprofile?.bio} name='bio' multiline rows={3} onChange={(e) => handleChange(e)} placeholder="Type your bio here" variant="outlined" fullWidth required />
                            </Grid>
                            <Grid item xs={12}>
                                <Button onClick={saveUserprofile} disabled={isFetching} variant="contained" color="primary" fullWidth>Save Changes</Button>
                            </Grid>
                            {error && <Box component="span" className={classes.spanstyle}>Userprofile not Saved!</Box>}
                        </Grid>
                    </CardContent>
                </Card>
            </Grid>
        </div>

    )
}
export default CreateUserprofile;