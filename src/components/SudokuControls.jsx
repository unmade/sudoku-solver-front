import React from "react";
import { Box, Button } from "grommet";
import { Erase, Info, Redo, Undo, StatusGood, FormClose } from "grommet-icons";


const SudokuControls = ({ nextStep }) => (
    <Box>
        <Box direction="row" pad="small" gap="medium" align="center">
            <Box round="full" overflow="hidden" background="brand">
                <Button icon={<Undo />} hoverIndicator/>
            </Box>
            <Box round="full" overflow="hidden" background="brand">
                <Button icon={<Redo />} hoverIndicator/>
            </Box>
            <Box round="full" overflow="hidden" background="brand">
                <Button icon={<Erase />} hoverIndicator/>
            </Box>
            <Box round="full" overflow="hidden" background="brand">
                <Button icon={<Info />} hoverIndicator onClick={nextStep} />
            </Box>
        </Box>
    </Box>
)

export default SudokuControls;
