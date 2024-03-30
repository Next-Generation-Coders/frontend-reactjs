import Spring from '@components/Spring';

import { useRef, useState , } from 'react';
import {toast} from 'react-toastify';
import {useForm} from 'react-hook-form';
import useTourLogo from '@hooks/useTourLogo';
// utils
import classNames from 'classnames';
import styles from './styles.module.scss'
import TournamentAccessSelector from './selectorAccess';
import TournamentFORCSelector from './comOrfriendselector';
import useSubmenu from '@hooks/useSubmenu';
import LazyImage from '@components/LazyImage';
import Submenu from '@ui/Submenu';

const DetailsForm  = ({ standalone = true, formData, setFormData,onSubmit }) => {
    const { register, formState: { errors }, handleSubmit } = useForm({
        defaultValues: formData
    });;

    const handleFormSubmit = (data) => {
        
     
        if(!selectedAccess){
        toast.error("Select the access type to your tournament")
     };
     if(!selectedType){
        toast.error("Select the state of your tournament")
     };
     if(!file){
        toast.error("Select the logo of your tournament")
     }
     

        onSubmit({ ...data, access: selectedAccess,FriOrComp :selectedType, logo : file });
       
    };
    const {setFile,file,loading,setLoading} = useTourLogo(formData);
    const {anchorEl, open, handleClick, handleClose} = useSubmenu();
    const inputRef = useRef(null);

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
    ]
    


    const Wrapper = standalone ? 'div' : Spring;
    const wrapperProps = standalone ? {className: 'card card-padded'} : {};
    

    
   

    
    const [selectedType, setSelectedType] = useState(null);
    const handleSelecFORCStatus = (status) => {
        setSelectedType(status);
    };

    const [selectedAccess, setSelectedAccess] = useState(null);
    
    const handleSelectAccess = (access) => {
        setSelectedAccess(access);
    };


   /* const handleFile = (e) => {
       console.log(e.target.files[0])
        onSubmit({ ...formData, logo: e.target.files[0] });
    };*/
    const handleFile = (e) => {
        // get the file object from the event
        const file = e.target.files[0];

        // check if a file was selected; if not, exit the function
        if (!file) {
            toast.error("Please select a file")
            return;
        }
        // check if the file type is supported (JPEG, PNG, or WEBP); if not, show an error message and exit the function
        if (file.type !== 'image/jpeg' && file.type !== 'image/png' && file.type !== 'image/webp') {
            toast.error("File type not supported")
            return;
        }

        // create a new FileReader object
        const reader = new FileReader();
        // read the file as a data URL
        reader.readAsDataURL(file);
        // set up an error handler for the reader
        reader.onerror = () => {
            toast.error('Something went wrong. Please try again.');
        }
        // set up a loading indicator while the file is being loaded
        reader.onloadstart = () => setLoading(true);


        reader.onloadend = async () => {
            try {
                setFile(reader.result);
                setLoading(false);
            } catch (error) {
                setLoading(false)
                console.error('Error uploading logo:', error.message);
            }
        };
    }

    return (
        <div className="container">
        <Wrapper {...wrapperProps}>
            <div className="d-flex flex-column g-4">
                        <h2>Tournament Details</h2>
                        <p className="text-12">Fill out the form below to create a new Tournament</p>
                    </div>
            <form onSubmit={handleSubmit(handleFormSubmit)}>
                <div className="d-flex flex-column g-20" style={{margin: '20px 0 30px'}}>
                    <input className={classNames('field', {'field--error': errors.title})}
                           type="text"
                           placeholder="Your tournament title"
                           {...register('title', {required: true})}/>
                   <input className={classNames('field', {'field--error': errors.trophy})}
                           type="text"
                           placeholder="Trophy"
                           {...register('trophy', {required: true})}/>
                  
                         <div >
                         <TournamentAccessSelector onSelectAccess={handleSelectAccess} />
                 <TournamentFORCSelector onSelecttournamentType={handleSelecFORCStatus}  />
<br></br> 
<div className={styles.wrapper} title="Click to upload a Team Logo">
        <input type="file" onChange={handleFile} ref={inputRef} hidden />
        <div>
          {file ? (
            <LazyImage className={styles.img} src={file} alt="Team Logo" />
          ) : (<div></div>
        //    <LazyImage className={styles.img} src={user} alt="Default User" />
          )}
        </div>
        <button className={styles.button} onClick={handleClick} aria-label="Open menu">
          <i className="icon-camera" />
        </button>
        <Submenu open={open} onClose={handleClose} anchorEl={anchorEl} actions={submenuActions} />
      </div>
                 </div>
                 <button class="btn" type='onSubmit'>Validate    <span style={{ marginLeft: '10px' }} className='text-xl font-bold text-white'>&#10003;</span></button>
                </div>
                
                    


            </form>
        </Wrapper>
        </div>
    )
}

export default DetailsForm