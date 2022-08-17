import axios from 'axios';
import { baseUrl } from '../../utils/Utils';

// eslint-disable-next-line import/no-anonymous-default-export
export default{
 

    dashBoardSliderImage: async function (){
        try{
            const response = await axios.get(`${baseUrl}/tracker/dashboard/sliderimage`);
            return response.data;
        }catch(error){
            throw error;
        }
    }
}