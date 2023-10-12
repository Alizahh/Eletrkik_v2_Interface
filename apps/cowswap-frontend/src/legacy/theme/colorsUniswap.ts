import { Colors } from 'legacy/theme/styled'

export function colorsUniswap(darkMode: boolean): Colors {
  return {
    darkMode,
    // base
    white: '#FFFFFF',
    black: '#000000',

    // text
    text1: darkMode ? '#FFFFFF' : '#000000',
    text2: darkMode ? '#C3C5CB' : '#565A69',
    text3: darkMode ? '#8F96AC' : '#6E727D',
    text4: darkMode ? '#B2B9D2' : '#C3C5CB',
    text5: darkMode ? '#2C2F36' : '#EDEEF2',
    text6: darkMode ? '#C5DAEF' : '#00000099',
    textSecondary: darkMode ? '#98A1C0': '#000000',
    backgroundOutline: darkMode ? '#D2D9EE' : '#D2D9EE',
    deprecated_yellow3: darkMode ? '#5D4204' : '#5D4204',
    textPrimary: darkMode ? '#0D111C': '#0D111C',
    deprecated_text4: darkMode ? '#B8C0DC' : '#98A1C0',

    // backgrounds / greys
    bg0: darkMode ? '#191B1F' : '#FFF',
    bg1: darkMode ? '#212429' : '#F7F8FA',
    bg2: darkMode ? '#2C2F36' : '#EDEEF2',
    bg3: darkMode ? '#40444F' : '#CED0D9',
    bg4: darkMode ? '#565A69' : '#888D9B',
    bg5: darkMode ? '#6C7284' : '#888D9B',
    bg6: darkMode ? '#1A2028' : '#6C7284',
    backgroundSurface: darkMode ? '#FFFFFF' : '#FFFFFF',
    backgroundInteractive: darkMode ? '#E8ECFB': '#E8ECFB',
    accentAction: darkMode ? '#4C82FB': '#4C82FB',
    deprecated_bg1: darkMode ? '#131A2A' : '#F5F6FC',
    accentActionSoft: darkMode ? '#4C82FB':'#4C82FB',
    deprecated_bg4: darkMode ? '#5D6785': '#98A1C0',
    textTertiary: darkMode ? '#5D6785': '#98A1C0',
    accentCritical : darkMode ? '#FD766B' : '#FD766B',
    accentSuccess: darkMode ? '#76D191' : '#76D191',
    accentWarning: darkMode ?  '#EEB317': '#EEB317',
    accentTextDarkPrimary: darkMode ? '#0D111C' : '#0D111C',
    accentFailure: darkMode ? '#FD766B': '#FD766B',
    brandedGradient: 'linear-gradient(139.57deg, #FF79C9 4.35%, #FFB8E2 96.44%);',
    promotionalGradient: 'radial-gradient(101.8% 4091.31% at 0% 0%, #4673FA 0%, #9646FA 100%);',

    // mod
    bg7: darkMode ? '#1F4471' : '#CEE7EF',

    //specialty colors
    modalBG: darkMode ? 'rgba(0,0,0,.425)' : 'rgba(0,0,0,0.3)',
    advancedBG: darkMode ? 'rgba(0,0,0,0.1)' : 'rgba(255,255,255,0.6)',

    //primary colors
    primary1: darkMode ? '#2172E5' : '#E8006F',
    primary2: darkMode ? '#3680E7' : '#FF8CC3',
    primary3: darkMode ? '#4D8FEA' : '#FF99C9',
    primary4: darkMode ? '#376bad70' : '#F6DDE8',
    primary5: darkMode ? '#153d6f70' : '#FDEAF1',

    // color text
    primaryText1: darkMode ? '#5090ea' : '#D50066',

    // secondary colors
    secondary1: darkMode ? '#2172E5' : '#E8006F',
    secondary2: darkMode ? '#17000b26' : '#F6DDE8',
    secondary3: darkMode ? '#17000b26' : '#FDEAF1',

    // other
    red1: darkMode ? '#FF4343' : '#DA2D2B',
    red2: darkMode ? '#F82D3A' : '#DF1F38',
    red3: '#D60000',
    green1: darkMode ? '#27AE60' : '#007D35',
    yellow1: '#E3A507',
    yellow2: '#FF8F00',
    yellow3: '#F3B71E',
    blue1: darkMode ? '#2172E5' : '#0068FC',
    blue2: darkMode ? '#5199FF' : '#0068FC',
    error: darkMode ? '#FD4040' : '#DF1F38',
    success: darkMode ? '#27AE60' : '#007D35',
    warning: '#FF8F00',

    // dont wanna forget these blue yet
    blue4: darkMode ? '#153d6f70' : '#C4D9F8',
    // blue5: darkMode ? '#153d6f70' : '#EBF4FF',
  } as Colors
}
