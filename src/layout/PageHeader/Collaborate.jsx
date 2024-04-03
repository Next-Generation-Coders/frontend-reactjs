// styling
import styles from './styles.module.scss';

// hooks
import {useThemeProvider} from '@contexts/themeContext';
import classNames from "classnames";
import {Controller, useForm} from "react-hook-form";
import Role from "@utils/Role";
import {GiWhistle} from "react-icons/gi";
import {GrUserManager} from "react-icons/gr";
import {MdManageAccounts} from "react-icons/md";
import {FaUserPen} from "react-icons/fa6";
import CustomIconSelect from "@ui/CustomIconSelect";
import {useRoleRequest} from "@hooks/useRoleRequest";
import {useAuthContext} from "@hooks/useAuthContext";
import {useEffect} from "react";


const Collaborate = () => {
    const {theme} = useThemeProvider();
    const {submitRequest, isLoading, checkRequest, request, fetching} = useRoleRequest();
    const {USER} = useAuthContext()
    const {control, handleSubmit, register, reset, formState: {errors}} = useForm();
    let pending;
    const ROLE_OPTIONS = [
        {value: Role.REFEREE, label: 'Referee', icon: <GiWhistle/>},
        {value: Role.ORGANIZER, label: 'Organizer', icon: <GrUserManager/>},
        {value: Role.COACH, label: 'Coach', icon: <FaUserPen/>},
        {value: Role.TEAM_MANAGER, label: 'Team manager', icon: <MdManageAccounts/>},
    ]
    const onSubmit = async (data) => {
        await submitRequest(data.role)
    }
    useEffect(() => {
        async function fetchData() {
            await checkRequest()
        }

        fetchData()
    }, [isLoading]);
    return (
        isLoading || fetching?
            <div className="box" style={{
                width: '50px',
                height: '50px'
            }}>

            </div>
            :
            (!fetching && !request) ?
                <form onSubmit={handleSubmit(onSubmit)} className={`${styles[theme]} d-flex flex-row g-20`}>
                    <Controller name="role"
                                control={control}
                                rules={{required: true}}
                                className={classNames('field', {'field--error': errors.role})}
                                render={({field}) => (
                                    <CustomIconSelect
                                        value={field.value}
                                        variant='basic'
                                        onChange={field.onChange}
                                        innerRef={field.ref}
                                        options={ROLE_OPTIONS}
                                        placeholder="Collaborate..."
                                    />
                                )}/>
                    <input type="submit" className="btn"/>
                </form> : request.result === 'PENDING' ? <div>Your request is pending...</div> :
                    <form onSubmit={handleSubmit(onSubmit)} className={`${styles[theme]} d-flex flex-row g-20`}>
                        <Controller name="role"
                                    control={control}
                                    rules={{required: true}}
                                    className={classNames('field', {'field--error': errors.role})}
                                    render={({field}) => (
                                        <CustomIconSelect
                                            value={field.value}
                                            variant='basic'
                                            onChange={field.onChange}
                                            innerRef={field.ref}
                                            options={ROLE_OPTIONS}
                                            placeholder="Collaborate..."
                                        />
                                    )}/>
                        <input type="submit" className="btn"/>
                    </form>
    )
}

export default Collaborate