import React from 'react';
import { useReduxSelector, useReduxDispatch } from '../../../../utils';
import { FormGroup, FormGroupInput } from '../GlobalComponents/StyledComponents/Containers';
import { travelFormSelect } from '../../../../constants';
import { InputsGroupHeading } from '../GlobalComponents/StyledComponents/Headings';
import { Select, InputLabel } from '../GlobalComponents/StyledComponents/Inputs';
import { editPostInfo } from '../../../../redux/globals/globalActions';
import ErrorDisplay from '../../../../GlobalComponents/Components/Error';
import Asterisk from '../../../../GlobalComponents/Components/Asterisk';
  
export default function TravellerForm({ errorRef }) {
  const { Globals: { postInfo: { travellerInfo, errors }} } = useReduxSelector();
  const dispatch = useReduxDispatch();
  const handleTravellerInfo = (e) => {
    travellerInfo[e.target.name] = e.target.value;
    dispatch(editPostInfo('travellerInfo', travellerInfo))
  }
  return (
    <FormGroup>
          <InputsGroupHeading>Travel Details: </InputsGroupHeading>
          {
            travelFormSelect.map(item => {
              const { optionName, options } = item;
              return (
                <FormGroupInput key={optionName}>
                  <InputLabel htmlFor={ optionName }>{ optionName === 'travelType' ? 'Type of Travel' : 'Length of the Holiday' }<Asterisk /></InputLabel>
                  <Select id={ optionName }
                    name={ optionName }
                    value={ travellerInfo[optionName] }
                    onChange = {(e) => handleTravellerInfo(e) }
                    errors = { errors && errors[optionName] } >
                     {
                      options.map((item, i) => <option key={ item }value={item} disabled={ i === 0 ? true : false }>{ item }</option>)   
                     }       
                   </Select>
                  { errors && errors[optionName] && <ErrorDisplay errorRef={ errors.errorMarker === optionName ? errorRef : null}>{errors[optionName]}</ErrorDisplay>}
                </FormGroupInput>
              )
            })
          }
        </FormGroup>
  )
}
