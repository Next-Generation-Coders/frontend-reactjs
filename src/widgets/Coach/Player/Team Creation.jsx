import { useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import Submenu from '@ui/Submenu';
import useFileReader from '@hooks/useFileReader';
import useSubmenu from '@hooks/useSubmenu';
import classNames from 'classnames';
import LazyImage from '@components/LazyImage';
import user from '@assets/user.png';
import styles from '../styles.module.scss';

const Team = () => {
  const { anchorEl, open, handleClick, handleClose } = useSubmenu();
  const { file, handleFile } = useFileReader();
  const inputRef = useRef(null);
  const [teams, setTeams] = useState([]);

  const checkCoach = async (coachId) => {
    try {
      const response = await fetch(`http://localhost:3000/Team/checkCoach/${coachId}`);
      /* if (!response.ok) {
        throw new Error('Failed to check coach');
      } */
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
  
      /* if (!response.ok) {
        throw new Error('Failed to update team');
      } */
  
      return true; 
    } catch (error) {
      console.error(error);
      return false; 
    }
  }



  const addNewTeam = async (newTeamData) => {
    try {
      const response = await fetch("http://localhost:3000/Team/add/65ec9ea8b7fc6d8a3d4f3536", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(newTeamData)
      });
      /* if (!response.ok) {
        throw new Error('Failed to add new team');
      } */
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
      onClick: () => handleFile(null)
    }
  ];

  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  const onSubmit = async (data) => {
    const newTeamData = {
      name: data.fullname,
      logo: "",//file,     // Assuming file is a URL or path to the uploaded logo image
      /* players: [],
      coach: "",
      staff: [],
      matches: [] */
    };
    const coachExists = await checkCoach("65ec9ea8b7fc6d8a3d4f3536");
    if (coachExists) {
      const shouldCreateTeam = window.confirm('A team already exists for this coach. Do you want to create a new team?');
  
      if (shouldCreateTeam) {
        await updateTeam("65ec9ea8b7fc6d8a3d4f3536");
        await addNewTeam(newTeamData);
        reset(); // Clear the form fields
        toast.success('Your team has been successfully saved!');
      } else {
        toast.info('Team creation canceled.');
      }
    } else {
      // Coach does not exist or is not assigned to a team
      await addNewTeam(newTeamData);
        reset(); // Clear the form fields
        toast.success('Your team has been successfully saved!');
      toast.error('Coach does not exist or is not assigned to a team!');
    }
  }

  return (
    <form className={`d-flex flex-column align-items-center`} onSubmit={handleSubmit(onSubmit)}>
      <br />
      <div className={styles.wrapper} title="Click to upload a Team Logo">
        <input type="file" onChange={handleFile} ref={inputRef} hidden />
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
      <br />
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
