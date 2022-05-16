import React from 'react';
import { useReduxSelector, useReduxDispatch } from '../../../../utils'
import { FormGroup, FormGroupInput } from '../GlobalComponents/StyledComponents/Containers';
import { InputsGroupHeading } from '../GlobalComponents/StyledComponents/Headings';
import { Select, InputLabel } from '../GlobalComponents/StyledComponents/Inputs';
import { editPostInfo } from '../../../../redux/globals/globalActions';
import { CgAsterisk } from "react-icons/cg";

export default function TravellerForm() {
  const { Globals: { postInfo: { travellerInfo }} } = useReduxSelector();
  const dispatch = useReduxDispatch();
  const handleTravellerInfo = (e) => {
    travellerInfo[e.target.name] = e.target.value;
    dispatch(editPostInfo('travellerInfo', travellerInfo))
  }
  return (
    <FormGroup>
          <InputsGroupHeading>Travel Details: </InputsGroupHeading>
          <FormGroupInput>
            <InputLabel htmlFor="travelType">Type of Travel<CgAsterisk style={{color:'#007bff'}}/></InputLabel>
            <Select id="travelType" 
               name="travelType"
               value={ travellerInfo.travelType }
               onChange = {(e) => handleTravellerInfo(e) }
               >
              <option value='' disabled>Select Type</option>
              <option value="Solo Travel">Solo Travel</option>
              <option value="Travel with Friends">Travel with Friends</option>
              <option value="Family Travel">Family Travel</option>
              <option value="Travel with Group">Travel with Group</option>
              <option value="Luxury Travel">Luxury Travel</option>
              <option value="Adventure Travel">Adventure Travel</option>
              <option value="Business Travel">Business Travel</option>          
            </Select>
          </FormGroupInput>
          <FormGroupInput>
            <InputLabel htmlFor="time">Length of the Holiday<CgAsterisk style={{color:'#007bff'}} /></InputLabel>
            <Select id="time" name="time" value = { travellerInfo.time } 
              onChange = {(e) => handleTravellerInfo(e) }>
              <option disabled>Select No. of Days</option>
              <option value=''>0</option>
              <option value="1 day">1 day</option>
              <option value="2 days">2 days</option>
              <option value="3 days">3 days</option>
              <option value="4 days">4 days</option>
              <option value="5 days">5 days</option>
              <option value="6 days">6 days</option>
              <option value="1 week">1 week</option>
              <option value="8 days">8 days</option>
              <option value="9 days">9 days</option>
              <option value="10 days">10 days</option>
              <option value="2 weeks">2 weeks</option>
              <option value="3 weeks">3 weeks</option>
              <option value="4 weeks">4 weeks</option>
            </Select>
          </FormGroupInput>
        </FormGroup>
  )
}
