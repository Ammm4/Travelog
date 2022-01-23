import React, { useState } from 'react';
import { Container, CloseModalBtn } from './PostModal';
import DeleteBox from './DeleteBox';
import DeleteBox1 from './DeleteBox1';

import { MdClear } from "react-icons/md";

export default function ProfileModal({ setShowModal }) {
  const [ showConfirm, setShowConfirm ] = useState(false);

  const handleDeleteProfile = (e) => {
    e.preventDefault();
    setShowConfirm(true);
  }
  return <Container>
          <CloseModalBtn onClick={(e) => setShowModal(false)}><MdClear /></CloseModalBtn>
          {
            !showConfirm ? 
              <DeleteBox 
                title="Delete Profile" 
                setModal={setShowModal} 
                handleDeletePost={handleDeleteProfile}/>
              :
              <DeleteBox1 
                setShowModal={setShowModal}
              />
          }
          

  </Container>;
}
