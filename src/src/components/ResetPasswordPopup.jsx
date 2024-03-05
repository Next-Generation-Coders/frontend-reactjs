// components
import Popup from '@components/Popup';
import {toast} from 'react-toastify';

// hooks
import {useForm} from 'react-hook-form';
import {usePasswordReset} from '@hooks/usePasswordReset.js'
// utils
import classNames from 'classnames';
import PropTypes from 'prop-types';

const ResetPasswordPopup = ({open, onClose}) => {
    const {register, handleSubmit, formState: {errors}, reset} = useForm();

    const {resetPassword, error , isLoading} = usePasswordReset();

    const handleClose = () => {
        reset();
        onClose();
    }

    const onSubmit = async (data) => {
        await resetPassword(data.email)
        handleClose();
    }

    return (
        <Popup open={open} onClose={handleClose}>
            <div className="d-flex flex-column g-20">
                <div className="d-flex flex-column g-10">
                    <h2>Reset Password</h2>
                    <p>
                        Enter your email address below and we'll send you a new password to log in with.
                    </p>
                </div>
                <div className="d-flex flex-column g-16">
                    <form className="d-flex g-10" onSubmit={handleSubmit(onSubmit)}>
                        <input className={classNames('field', {'field--error': errors.email})}
                               type="text"
                               placeholder="example@domain.com"
                               {...register('email', {required: true, pattern: /^\S+@\S+$/i})}/>
                        <button disabled={isLoading} className="btn">Send</button>
                        {error && <div>{error}</div>}
                    </form>
                    <p className="text-12">
                        If you don't receive an email within a few minutes, please check your spam folder.
                    </p>
                </div>
            </div>
        </Popup>
    )
}

ResetPasswordPopup.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired
}

export default ResetPasswordPopup