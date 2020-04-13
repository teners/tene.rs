function getEmojiByTheme(theme: string): string {
    return theme === 'dark' ? '🌚' : '🌞';
}

function toggleTheme() {
    console.log('toggle')
    let storageTheme = localStorage.getItem('theme')
    let theme = storageTheme === 'dark' ? 'light' : 'dark'
    document.getElementById('app-root').className = `theme-${theme}`
    document.getElementById('toggle-theme').innerHTML = `toggle theme ${getEmojiByTheme(theme)}`
    localStorage.setItem('theme', theme)
}

export function initTheme() {
    console.log('init')
    let storageTheme: string = localStorage.getItem('theme')
    let mediaTheme: string = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'light' : 'dark'
    if (!storageTheme) {
        localStorage.setItem('theme', mediaTheme)
    }
    let theme: string = storageTheme || mediaTheme
    document.getElementById('app-root').className = `theme-${theme}`
    let toggleButton = document.getElementById('toggle-theme')
    toggleButton.onclick = toggleTheme
    toggleButton.innerHTML = `toggle theme ${getEmojiByTheme(theme)}`
}