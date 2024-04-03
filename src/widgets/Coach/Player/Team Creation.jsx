import { useState, useRef, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import Submenu from '@ui/Submenu';
import useSubmenu from '@hooks/useSubmenu';
import classNames from 'classnames';
import LazyImage from '@components/LazyImage';
import user from '@assets/user.png';
import styles from '../styles.module.scss';
import {useAuthContext} from "@hooks/useAuthContext";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import useTeamLogo from "@hooks/useTeamLogo";
const Team = () => {
  const {USER} = useAuthContext();
  const { anchorEl, open, handleClick, handleClose } = useSubmenu();
  const { setFile ,file, handleFile ,formData} = useTeamLogo();
  const inputRef = useRef(null);
  const [teams, setTeams] = useState([]);
  const [userId, setUserId] = useState([]);
  const navigate = useNavigate();
  

  

  const checkTeam_manager = async (coachId) => {
    try {
      const response = await fetch(`http://localhost:3000/Team/checkTeam_manager/${coachId}`);
      const data = await response.json();
      return data.exists;
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  async function updateTeam(coachId) {
    try {
      const response = await fetch(`http://localhost:3000/Team/updateXTeam/${coachId}`, {
        method: 'PUT',
      });
      return true; 
    } catch (error) {
      console.error(error);
      return false; 
    }
  }



  const addNewTeam = async (newTeamData) => {
    try {
      const userResponse = await axios.get(`http://localhost:3000/User/getbyemail?email=${USER.email}`);
      const userId = userResponse.data._id;
      const response = await fetch(`http://localhost:3000/Team/add/${userId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(newTeamData)
      });
      const data = await response.json();
      setTeams([...teams, data]); // Add the new team to the existing teams
    } catch (error) {
      console.error(error);
    }
  };

  const triggerInput = () => inputRef.current?.click();

  const submenuActions = [
    {
      label: 'Upload',
      icon: 'upload',
      onClick: triggerInput,
    },
    {
      label: 'Remove',
      icon: 'trash',
      onClick: () => setFile(null)
    }
  ];

  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  const onSubmit = async (data) => {
    const newTeamData = {
      name: data.fullname,
      logo: file, // Assuming file is the selected file object
    };
  
    const userResponse = await axios.get(`http://localhost:3000/User/getbyemail?email=${USER.email}`);
    const userId = userResponse.data._id;
  
    try {
      //const formData = new FormData();
      formData.append('name', newTeamData.name);
      //formData.append('team', file);
      
      const response = await fetch(`http://localhost:3000/Team/add/${userId}`, {
        method: 'POST',
        body: formData,
      });
  
      if (response.ok) {
        const teamData = await response.json();
        setTeams([...teams, teamData]);
        reset();
        toast.success('Your team has been successfully saved!');
        navigate.go(0);
      } else {
        toast.error('Failed to save team. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  }
  

  useEffect(() => {
    async function fetchData() {
      const userResponse = await axios.get(`http://localhost:3000/User/getbyemail?email=${USER.email}`);
      const userId = userResponse.data._id;
      setUserId(userId)
    }
    fetchData();
  }, []);

  return (
    <form className={`d-flex flex-column align-items-center`} onSubmit={handleSubmit(onSubmit)}>
      <br />
      <div className={styles.wrapper} title="Click to upload a Team Logo">
        <input type="file" name="team" onChange={handleFile} ref={inputRef} hidden />
        <div>
          {file ? (
            <LazyImage className={styles.img} src={file} alt="Team Logo" />
          ) : (
            <LazyImage className={styles.img} src={user} alt="Default User" />
          )}
        </div>
        <button className={styles.button} onClick={handleClick} aria-label="Open menu">
          <i className="icon-camera" />
        </button>
        <Submenu open={open} onClose={handleClose} anchorEl={anchorEl} actions={submenuActions} />
      </div>
      <br/>
      <div>
        <input className={classNames('field', { 'field--error': errors.fullname })}
          type="text"
          placeholder="Team Name"
          {...register('fullname', { required: true })} />
        {errors.fullname && <span className="error-message">Team name is required</span>}
      </div>
      <div className={styles.footer}>
        <button className="btn" type="submit">Save Team</button>
        <button className="btn btn--outlined" type="button" onClick={reset}>Cancel</button>
        {/* <Link to={`/add-new-player/`}>    // f button clicked save team or cancel it will redirect to add new player so it can do the check of the 
                                                  team manager if he has a team or not   
                                            <Button style={{ backgroundColor: 'red' }} ><b style={{ color: 'white' }}>View Profile</b></Button>
                                        </Link> */}
      </div>
    </form>
  );
}

export default Team;
