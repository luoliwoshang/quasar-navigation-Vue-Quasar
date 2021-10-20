import store from "../store"
const changeTheme = ({ type }) => {
    let { theme } = store.state.moduleStyle
    let current_theme = theme[type]
    Object.keys(current_theme).forEach((property, index) => {
        document.documentElement.style.setProperty(`--${property}`, current_theme[property]);
    })
}
const isDark = () => {
    return window.matchMedia('(prefers-color-scheme: dark)').matches
}
const set_overall_style = ({ property, value }) => {
    document.documentElement.style.setProperty(`--${property}`,value);
}
const listenDrakMode = () => {
    const dark = 'dark'
    const light = 'light'
    if (isDark()) {
        changeTheme({ type: dark })
    } else {
        changeTheme({ type: light })
    }
    window.matchMedia('(prefers-color-scheme: dark)').addListener(({ matches }) => {
        matches ? changeTheme({ type: dark }) : ''
    })
    window.matchMedia('(prefers-color-scheme: light)').addListener(({ matches }) => {
        matches ? changeTheme({ type: light }) : ''
    })
}
const unListenDrakMode = () => {
    window.matchMedia('(prefers-color-scheme: dark)').addListener(() => { })
    window.matchMedia('(prefers-color-scheme: light)').addListener(() => { })
}
export {
    changeTheme,
    listenDrakMode,
    unListenDrakMode,
    set_overall_style
}