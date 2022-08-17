import axios from 'axios';
import { baseUrl } from '../../utils/Utils';

 // eslint-disable-next-line import/no-anonymous-default-export
export default {
    userSinUp : async function (userInfo){
        try{
            const response = await axios.post(`${baseUrl}/tracker/signup`, userInfo);
            return response.data;
        }catch (error){
            throw error;
        }
    },  

    userLogin : async function (credentials){
        try{
            const response = await axios.post(`${baseUrl}/tracker/login`, credentials);
            return response.data;
        }catch (error){
            throw error;
        }
    },
    forgotPassword: async function(emailID){
        try{
            const response = await axios.post(`${baseUrl}/forgot/password/${emailID}`);
            return response.data;
        }catch(error){
            throw error;
        }
    },
    newPassword: async function(email, password){
        try{
            const response = await axios.patch(`${baseUrl}/edit/password/${email}`,{'password':password});
            return response.data;
        }catch(error){
            throw error;
        }
    },
    verifyPassword: async function(otp, email){
        try{
            const response = await axios.get(`${baseUrl}/forgot/password/verify/otp/${otp}/${email}`);
            return response.data;
        }catch(error){
            throw error;
        }
    }
}