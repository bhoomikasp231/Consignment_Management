import React from 'react';
import SlideShow from './SlideShow';

const HomePage = (props) => {
    const handleAddConsignmentBtnClick = () => {

        props.history.push({
            pathname:'/add-consignment'
        })
    }

    const handleConsigmentViewBtnClick = () => {
        props.history.push({
            pathname:'/view-edit-consignment'
        })
    }
    console.log('props', props);
    return(
        <div>
            <SlideShow/>
            <div className='btn-layout'>
    
            <button className='btn-view' onClick={handleAddConsignmentBtnClick}>Add Consignment</button>
            <button className='btn-view' onClick={handleConsigmentViewBtnClick}>View Consignment</button>
            <button className='btn-view' onClick={handleConsigmentViewBtnClick}>Edit Consignment</button>
            </div>
        </div>
    );
}

export default HomePage;