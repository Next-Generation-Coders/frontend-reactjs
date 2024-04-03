// hooks
import React, { useState, useEffect } from 'react';

// utils
import PropTypes from 'prop-types';
import {useAuthContext} from "@hooks/useAuthContext";
import axios from 'axios';
const Like = ({ playerId, isLiked, withText, readonly, qty, color = 'red', isCartAction }) => {
    const [liked, setLiked] = useState(isLiked);
    const [likesCount, setLikesCount] = useState(qty);
    const { USER } = useAuthContext();
  
    const handleClick = async () => {
      if (!readonly) {
        setLiked(!liked);
  
        const userResponse = await axios.get(`http://localhost:3000/User/getbyemail?email=${USER.email}`);
        const userId = userResponse.data._id;
        
        await fetch(`http://localhost:3000/User/likedBy/${playerId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userId: userId,
          }),
        });
  
        setLikesCount(prevLikesCount => prevLikesCount + (liked ? -1 : 1));
      }
    };
  
    useEffect(() => {
      async function fetchLikes() {
        try {
          const userResponse = await axios.get(`http://localhost:3000/User/getbyemail?email=${USER.email}`);
          const userId = userResponse.data._id;
          const CheckResponse = await fetch(`http://localhost:3000/User/checkLiked/${playerId}/${userId}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          });
          const data = await CheckResponse.json();
          const liked = data.isLiked;
          setLiked(liked);
  
          const qty = data.qty;
          setLikesCount(qty);
        } catch (error) {
          console.error(error);
        }
      }
  
      fetchLikes();
    }, []);
  
    return (
      <button
        className={isCartAction ? 'like icon-btn icon-btn--cart' : 'like'}
        onClick={handleClick}
        disabled={readonly}
        aria-label={liked ? 'Unlike' : 'Like'}
      >
        <span className={`like_icon ${color}`}>
          <i className="icon-heart-regular" />
          <i className="icon-heart-solid" style={{ opacity: liked ? 1 : 0 }} />
        </span>
        {withText && <span className="like_text h6">{likesCount}</span>}
      </button>
    );
  };
  
  Like.propTypes = {
    playerId: PropTypes.string.isRequired,
    isLiked: PropTypes.bool,
    withText: PropTypes.bool,
    readonly: PropTypes.bool,
    qty: PropTypes.number,
    color: PropTypes.oneOf(['red', 'light']),
    isCartAction: PropTypes.bool,
  };

export default Like;
