import React, { useEffect } from 'react';
import { ErrorContainer } from '../StyledComponents/Error';

export default function ErrorDisplay({ errorRef, children }) {
  useEffect(() => {
    if(!errorRef) return;
    errorRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
  },[errorRef])
  return (
    <ErrorContainer ref={errorRef}>
       {children}
    </ErrorContainer>
  )
}