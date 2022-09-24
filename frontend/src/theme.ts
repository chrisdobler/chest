import { red } from '@mui/material/colors';
import { createTheme, Theme } from '@mui/material/styles';
import brown from '@material-ui/core/colors/brown';

// A custom theme for this app
const theme = createTheme({
    palette: {
        primary: {
            main: brown[500],
            light: '#6366F1',
        },
        info: {
            main: '#6366F1',
        },
        secondary: {
            light: '#D1D5DB',
            main: '#4B5563',
            dark: '#6B7280',
        },
        error: {
            main: red.A400,
        },
    },
    shadows: [] as unknown as Theme['shadows'],
});

export default theme;
