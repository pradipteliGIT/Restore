import '@material-ui/core/styles';

declare module '@mui/material/styles' {
  interface Palette {
    myCustomColor?: Palette['primary'];
  }
  interface PaletteOptions {
    myCustomColor?: PaletteOptions['primary'];
  }
}
