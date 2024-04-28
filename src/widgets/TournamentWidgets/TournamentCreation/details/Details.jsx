import Spring from '@components/Spring';
import React, { useRef, useState } from 'react';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import useTourLogo from '@hooks/useTourLogo';
import classNames from 'classnames';
import styles from './styles.module.scss';
import TournamentAccessSelector from './selectorAccess';
import TournamentFORCSelector from './comOrfriendselector';
import useSubmenu from '@hooks/useSubmenu';
import LazyImage from '@components/LazyImage';
import Submenu from '@ui/Submenu';
import { RiVerifiedBadgeFill } from "react-icons/ri";

const DetailsForm = ({ standalone = true, formData, setFormData, onSubmit }) => {
    const { register, formState: { errors }, handleSubmit } = useForm({
        defaultValues: formData
    });

    const [formSubmitted, setFormSubmitted] = useState(false);

    const handleFormSubmit = (data) => {
        if (!selectedAccess) {
            toast.error("Select the access type to your tournament")
            return;
        };
        if (!selectedType) {
            toast.error("Select the state of your tournament")
            return;
        };

        onSubmit({ ...data, access: selectedAccess, FriOrComp: selectedType, logo: file });
        toast.success("Form submitted successfully!");
        setFormSubmitted(true);
    };

    const { setFile, file, loading, setLoading } = useTourLogo(formData);
    const { anchorEl, open, handleClick, handleClose } = useSubmenu();
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
    const wrapperProps = standalone ? { className: 'card card-padded' } : {};

    const [selectedType, setSelectedType] = useState(null);
    const handleSelecFORCStatus = (status) => {
        setSelectedType(status);
    };

    const [selectedAccess, setSelectedAccess] = useState(null);
    const handleSelectAccess = (access) => {
        setSelectedAccess(access);
    };


    const handleFile = (e) => {
        const file = e.target.files[0];
        if (!file) {
            toast.error("Please select a file")
            return;
        }
        if (file.type !== 'image/jpeg' && file.type !== 'image/png' && file.type !== 'image/webp') {
            toast.error("File type not supported")
            return;
        }
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onerror = () => {
            toast.error('Something went wrong. Please try again.');
        }
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
        <div className={classNames("container", { [styles.blurred]: formSubmitted })}>


            <Wrapper {...wrapperProps}>
                <div className="d-flex flex-column g-4">
                    <h2 style={{ paddingLeft: "40px" }}>Tournament Details
                    {formSubmitted ? (
                        <RiVerifiedBadgeFill style={{marginLeft:"20px",color:"green"}} />
                    ) : null}
                    </h2>
                    <p className="text-12">Fill out the form below to create a new Tournament</p>
                </div>

                <form onSubmit={handleSubmit(handleFormSubmit)} >
                    <div className="d-flex flex-column g-20" style={{ margin: '20px 0 30px' }}>
                        <input
                            className={classNames('field', { 'field--error': errors.title })}
                            type="text"
                            placeholder="Your tournament title"
                            {...register('title', { required: true })}
                        />

                        <input
                            className={classNames('field', { 'field--error': errors.trophy })}
                            type="text"
                            placeholder="Trophy"
                            {...register('trophy', { required: true })}
                        />

                        <TournamentAccessSelector onSelectAccess={handleSelectAccess} />
                        <TournamentFORCSelector onSelecttournamentType={handleSelecFORCStatus} />

                        <div className={styles.wrapper} title="Click to upload a Team Logo">
                            <input type="file" onChange={handleFile} ref={inputRef} hidden />
                            <div>
                                {file ? (
                                    <LazyImage className={styles.img} src={file} alt="Team Logo" />
                                ) : (
                                    <div></div>
                                )}
                            </div>
                            <button className={styles.button} onClick={handleClick} aria-label="Open menu">
                                <i className="icon-camera" />
                            </button>
                            <Submenu open={open} onClose={handleClose} anchorEl={anchorEl} actions={submenuActions} />
                        </div>

                        <button
                            className="btn"
                            type="submit"
                            style={{ backgroundColor: "#FDCA40", color: "black" }}
                            disabled={!selectedAccess || !selectedType}
                        >
                            Validate <span style={{ marginLeft: '10px' }} className='text-xl font-bold text-white'>&#10003;</span>
                        </button>

                    </div>
                </form>
            </Wrapper>
        </div>
    )
}

export default DetailsForm;
