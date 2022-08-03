import React, {Fragment, useEffect, useState} from 'react';
import {useDispatch} from "react-redux";
import {clearErrors, updatePassword} from "../../actions/userAction";
import {useSelector} from "react-redux";
import {Link, useNavigate} from "react-router-dom";
import {UPDATE_PASSWORD_RESET} from "../../constants/userConstants";
import { useAlert } from "react-alert";


const UpdatePassword = () => {
    const dispatch = useDispatch();
    const alert = useAlert();

    const [oldPassword,setOldPassword] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    // Getting data from store
    const {user}  =  useSelector((state) => state.user)
    console.log(typeof user)

    function onFormSubmit(e){
        e.preventDefault();
        const changePasswordObj = {
            'oldPassword':oldPassword,
            'newPassword':password,
            'confirmPassword':confirmPassword
        }
        // const isOldPasswordCorrect = user.comparePassword(oldPassword);
        // console.log(isOldPasswordCorrect)
        dispatch(updatePassword(changePasswordObj))
    }

    const { error, isUpdated  } = useSelector((state) => state.profile);
    const navigate = useNavigate();
    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
        if (isUpdated) {
            alert.success("Password Updated Successfully");

            navigate("/account");

            dispatch({
                type: UPDATE_PASSWORD_RESET,
            });
        }
    }, [dispatch, error, navigate,alert, isUpdated]);


    return (
       <Fragment>
           <form className='form-control form ' onSubmit={onFormSubmit}>
               <input type='password' placeholder='Password'
                      onChange={(e)=>{setOldPassword(e.target.value)}}
                      required
                      value={oldPassword}
               />
               <input type='password' placeholder='New Password'
                      onChange={(e)=>{setPassword(e.target.value)}}
                      required
                      value={password}
               />
               <Link to='/password/forgot'>Forgot Password</Link>
               <input type='password' placeholder='Confirm Password'
                      onChange={(e)=>{setConfirmPassword(e.target.value)}}
                      required/>
               <button type='submit' className='btn btn-success'>Submit</button>
           </form>
       </Fragment>
    );
};

export default UpdatePassword;
