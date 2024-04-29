// components
import PasswordInput from '@components/PasswordInput';
import BasicCheckbox from '@ui/BasicCheckbox';
import ResetPasswordPopup from '@components/ResetPasswordPopup';
import { FcGoogle } from "react-icons/fc";

// hooks
import {useForm, Controller} from 'react-hook-form';
import {useEffect, useState} from 'react';

// utils
import classNames from 'classnames';
import {useLogin} from "@hooks/useLogin";
import {NavLink} from "react-router-dom";

const LoginForm = () => {
    const [open, setOpen] = useState(false);
    const {login,error,isLoading}= useLogin();

    const {register, handleSubmit, formState: {errors}, control} = useForm({
        defaultValues: {
            email: '',
            password: '',
            rememberMe: false
        }
    });
    const onSubmit = async (data) => {
        await login(data.email,data.password);
    };
    useEffect(() => {
        const handleKeyPress = (event) => {
            if (event.key === 'Enter') {
                event.preventDefault();
                handleSubmit(onSubmit)();
            }
        };

        // Add event listener to the form
        document.querySelector('form').addEventListener('keypress', handleKeyPress);

        return () => {
            // Cleanup: remove event listener when component unmounts
            document.querySelector('form').removeEventListener('keypress', handleKeyPress);
        };
    }, [handleSubmit, onSubmit]);


    const handleResetPassword = e => {
        e.preventDefault();
        setOpen(true);
    }

    return (
        <>
            <h1>Account login</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="d-flex flex-column g-10" style={{margin: '20px 0 30px'}}>
                    <div className="d-flex flex-column g-20">
                        <input className={classNames('field', {'field--error': errors.email})}
                               type="text"
                               placeholder="Email"
                               {...register('email', {required: true, pattern: /^\S+@\S+$/i})}/>
                        <Controller control={control}
                                    name="password"
                                    rules={{required: true}}
                                    render={({field: {ref, onChange, value}, fieldState: {error}}) => (
                                        <PasswordInput
                                            className={classNames('field', {'field--error': error})}
                                            value={value}
                                            onChange={e => onChange(e.target.value)}
                                            placeholder="Password"
                                            innerRef={ref}/>
                                    )}
                        />
                    </div>
                    <div className="d-flex align-items-center g-10">
                        <Controller control={control}
                                    name="rememberMe"
                                    render={({field: {ref, onChange, value}}) => (
                                        <BasicCheckbox id="rememberMe"
                                                       checked={value}
                                                       onChange={e => onChange(e.target.checked)}
                                                       innerRef={ref}/>
                                    )}
                        />
                        <label htmlFor="rememberMe">Remember me</label>
                    </div>
                </div>
                {error && <div style={{
                    color:"red",
                    fontWeight:"bold",
                    textAlign:"center",
                    margin:"20px"
                }}>{error}</div>}
                <br/>
                <div className="d-flex justify-content-between align-items-center">
                    <button style={{backgroundColor:"#FDCA40",color:"black",width:"40%"}} disabled={isLoading} className="btn btn--sm" type="submit">
                       Login
                    </button>
                    <button disabled={isLoading} className="text-button text-button--sm" onClick={handleResetPassword}>
                        Reset password
                    </button>
                </div>
            </form>
            <br/>
            <br/>
            <hr/>
            <br/>
            <br/>
            <div >
                <form className="d-flex justify-content-center align-items-end" action="http://localhost:3000/auth/google" >
                    <button className="btn justify-content-between">
                        <p>Sign in with</p> <span><FcGoogle /></span>
                    </button></form>
                <br/>
                <div style={{
                    justifyContent:"center",
                    textAlign:"center",
                    alignContent:"center"
                }}>
                    <NavLink to="/sign-up" >
                        <button disabled={isLoading} className="text-button text-button--sm">
                            Don't have an account?<b> Register</b>
                        </button>
                    </NavLink>
                </div>


                <ResetPasswordPopup open={open} onClose={() => setOpen(false)}/>
            </div>
        </>
    )
}

export default LoginForm