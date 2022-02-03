import React, { useState } from "react";
import DatePicker from "react-datepicker";
import moment from "moment";
import {
  CButton,
  CInputGroupPrepend

} from '@coreui/react'

import CIcon from '@coreui/icons-react'
import "./DateTime.css";

import "react-datepicker/dist/react-datepicker.css";

// CSS Modules, react-datepicker-cssmodules.css
// import 'react-datepicker/dist/react-datepicker-cssmodules.css';

const DateTime = (props) => {

  //  var handleToUpdate  = () =>  props.handleToUpdate;
 
  
  const [startDate, setStartDate] = useState(undefined);
  const [endDate, setEndDate] = useState(undefined);
  const [selectionComplete, toggleSelectionComplete] = useState(false);
  

  const handleDateChange = date => {
    if (!selectionComplete && !startDate) {
      //on first date selection, set the start date

      setStartDate(date);
      return;
    }

    if (!selectionComplete && startDate && !endDate) {
      //on second date selection, set the end date

      setEndDate(date);
      toggleSelectionComplete(true);
      const startdate1=moment(startDate).format('YYYY/MM/DD');
      const enddate2= moment(date).format('YYYY/MM/DD');

      props.handleToUpdate({startdate1,enddate2})
      //do stuff with date range

      return;
    }

    if (selectionComplete && startDate && endDate) {
      //on third date selection, begin selection of a new date range
      //reset the start date and clear the end date.

      setStartDate(date);
      setEndDate(undefined);
      toggleSelectionComplete(false);
      return;
    }
  };

  const handleSelect = date => {
    //onChange is not fired if selecting same date - workaround to fire handleDateChange
    if (!selectionComplete && startDate && !endDate && sameDay(date, startDate)) {
      handleDateChange(date);
    }
  };

  const sameDay = (d1, d2) => {
    return d1.getFullYear() === d2.getFullYear() && d1.getMonth() === d2.getMonth() && d1.getDate() === d2.getDate();
  };

  return (
    
      <div className="date-range">
        
        <DatePicker 
      // onChange={() => handleToUpdate('someArgs')}
      selected={startDate} 
      onChange={handleDateChange} 
      onSelect={handleSelect}
      selectsEnd={Boolean(startDate)} 
      startDate={startDate} 
      endDate={endDate} 
      customInput={props.customInput}
      // customInput={<CInputGroupPrepend><CButton size="lg"  color="warning"><CIcon name="cil-calendar"/> Custom Date {startDate ? moment(startDate).format('DD/MM/YYYY')+'-' : ''} {endDate ? moment(endDate).format('DD/MM/YYYY') : ''}
      // </CButton></CInputGroupPrepend>}
      // inline
    >
       </DatePicker>
      </div>
   
  );
};

export default DateTime;