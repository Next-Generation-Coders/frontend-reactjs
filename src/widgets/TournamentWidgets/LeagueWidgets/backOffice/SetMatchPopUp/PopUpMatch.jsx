// Popup.jsx
import React from 'react';
import { FaUser, FaClock, FaMapMarkerAlt } from 'react-icons/fa';
import styles from './styles.module.css';

const Popup = ({ onClose }) => {
  return (
    <div className={styles.popup}>
      <div className={styles.popupContent}>
        <h2>Match Details</h2>
        <div className={styles.inputGroup}>
          <label>
            <FaUser className={styles.icon} />
            Number of Players:
            <input type="number" />
          </label>
        </div>
        <div className={styles.inputGroup}>
          <label>
            <FaClock className={styles.icon} />
            Match Time:
            <input type="text" />
          </label>
        </div>
        <div className={styles.inputGroup}>
          <label>
            <FaMapMarkerAlt className={styles.icon} />
            Match Location:
            <input type="text" />
          </label>
        </div>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default Popup;
