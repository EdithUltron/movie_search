import { ThemeOptions } from '@mui/material';
import { ThemeOptions } from "@mui/material/styles";

declare module '@mui/material/styles' {

    interface Theme{
        status: {
            danger:String
        }
    }

    interface ThemeOptions{
        status: {
            danger:React.CSSProperties['color']
        }
    }
}