// styling
import styles from './styles.module.scss';

// components
import Spring from '@components/Spring';
import {useAuthContext} from "@hooks/useAuthContext";

const UserInfo = () => {

    const {USER} = useAuthContext()

    const data = USER ? [
        {'E-mail': USER.email},
        {'Phone': '+216 '+USER.phone},
        {'Address Wallet': USER.addressWallet},
        {'Age': USER.age},
        {'Location': USER.country.label+' , '+USER.city.label}
    ] : [
        "COULDN'T LOAD DATA"
    ]


    return (
        <Spring className="card d-flex flex-column g-14 card-padded">
            <h3>Profile info</h3>
            <ul className="d-flex flex-column justify-content-between flex-1 g-10">
                {
                    data.map((item, index) => {
                        return (
                            <li className={styles.item} key={index}>
                                <span className="text-700 text-header">
                                    {Object.keys(item)[0]}:
                                </span>
                                <span className={`${styles.value} text-overflow`}>
                                    {Object.values(item)[0]}
                                </span>
                            </li>
                        )
                    })
                }
            </ul>
        </Spring>
    )
}

export default UserInfo