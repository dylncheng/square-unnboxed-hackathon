import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material'
import { Box } from '@mui/system';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import React from 'react'


const services = {

}



export default function Services({ services }) {
    return (
        <>
            <FormControl>
                <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    defaultValue="none"
                    name="service"
                >
                { Object.keys(services).map((name) => {
                    return (
                        <Accordion sx={{ minWidth: '80%', mb:"10px" }} color="secondary">
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                            >
                                {name}
                            </AccordionSummary>
                            <AccordionDetails>
                                    {services[name].map((service) => {
                                        return(
                                            <Box>
                                                <FormControlLabel value={service} control={<Radio />} label={service} />
                                            </Box> 
                                        )
                                    })}
                            </AccordionDetails>
                        </Accordion>
                        )
                    }) }
                </RadioGroup>
            </FormControl>
        </>
 
        
    )
}
