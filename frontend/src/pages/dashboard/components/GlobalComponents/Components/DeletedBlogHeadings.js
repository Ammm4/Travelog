import React from 'react';
import { BlogDelete } from '../StyledComponents/Headings';
import {AiOutlineStop} from 'react-icons/ai';
export default function DeletedBlogHeadings({ blogType }) {
  return (
    <BlogDelete>
      <AiOutlineStop /> {blogType} Deleted
    </BlogDelete>
  )
}
