import React from 'react';
import { Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import { ExpandMore } from '@mui/icons-material';
import * as SX from './sideBar';

const SideBar = () => {
  return (
    <div>
      {' '}
      <Accordion sx={SX.accordionSX}>
        <AccordionSummary expandIcon={<ExpandMore />}>Test</AccordionSummary>
        <AccordionDetails>Testeer</AccordionDetails>
      </Accordion>
    </div>
  );
};

export default SideBar;
