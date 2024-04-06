import Tooltip from '@mui/material/Tooltip';
import { styled } from '@mui/material/styles';

const CustomTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} componentsProps={{ tooltip: { className: className } }} />
))(`
    color: white;
    background-color: black;
    border: 2px solid white;
    font-size: 16px;
    padding: 7px 10px !important;
    font-family: Inter !important;
    border-radius: 8px;
`);

export default CustomTooltip;
