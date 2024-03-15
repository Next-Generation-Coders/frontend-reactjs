// components
import PasswordInput from '@components/PasswordInput';
import Spring from '@components/Spring';
import {Fragment} from 'react';

// hooks
import {useForm, Controller} from 'react-hook-form';
import {useSignup} from "@hooks/useSignUp";
// utils
import classNames from 'classnames';
import {NavLink} from "react-router-dom";


const SignUpForm = ({standalone = true}) => {

    const {signup,error,isLoading} = useSignup();

    const {register, handleSubmit, formState: {errors}, control, watch} = useForm({
        defaultValues: {
            fullname: '',
            lastName: '',
            email: '',
            age : '',
            phone : '',
            password: '',
            passwordConfirm: ''
        }
    });

    const Wrapper = standalone ? Fragment : Spring;
    const wrapperProps = standalone ? {} : {className: 'card card-padded'};

    //Function on submit !
    const onSubmit = async (data) => {
        await signup(data.email, data.password,data.phone,data.age,data.fullname)
    }

    return (
        <Wrapper {...wrapperProps}>
            <div className="d-flex flex-column g-4">
                <h3>Create new account</h3>
                <p className="text-12">Fill out the form below to create a new account</p>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="d-flex flex-column g-20" style={{margin: '20px 0 30px'}}>
                    <input className={classNames('field', {'field--error': errors.fullname})}
                           type="text"
                           placeholder="Full Name"
                           {...register('fullname', {required: true})}/>
                   <input className={classNames('field', {'field--error': errors.age})}
                           type="text"
                           placeholder="Age"
                           {...register('age', {required: true})}/>
                   <input className={classNames('field', {'field--error': errors.phone})}
                           type="text"
                           placeholder="Phone number"
                           {...register('phone', {required: true})}/>



                    <input className={classNames('field', {'field--error': errors.email})}
                           type="text"
                           placeholder="E-mail"
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
                    <Controller control={control}
                                name="passwordConfirm"
                                rules={{
                                    required: true,
                                    validate: value => value === watch('password')
                                }}
                                render={({field: {ref, onChange, value}, fieldState: {error}}) => (
                                    <PasswordInput
                                        className={classNames('field', {'field--error': error})}
                                        value={value}
                                        onChange={e => onChange(e.target.value)}
                                        placeholder="Confirm password"
                                        innerRef={ref}/>
                                )}
                    />
                </div>
                    <div style={{
                        justifyContent:"center",
                        textAlign:"center",
                        alignContent:"center",
                    }}>
                        <button disabled={isLoading} type="submit" className="btn w-100">Create account</button>
                    </div>
                    {error && <div className="__progress-bar--error" >{error}</div>}
                    <br/><br/>
                <div style={{
                    justifyContent:"center",
                    textAlign:"center",
                    alignContent:"center"
                }}>
                    <NavLink to="/login" >
                        <button disabled={isLoading} className="text-button text-button--sm">
                            Already have an account?<b> Sign in</b>
                        </button>
                    </NavLink>
                </div>


            </form>
        </Wrapper>
    )
}

export default SignUpForm