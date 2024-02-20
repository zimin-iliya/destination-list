import * as React from 'react';
import Button from '@mui/material/Button';

export default function BasicButtons({text, onClick}) {
  return (
    <>
      <Button onClick={onClick} variant="contained">{text}</Button>
    </>
  );
}