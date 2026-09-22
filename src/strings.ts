export const strings = {
    greeting: 'CST \n studio.',
    drawTuto: 'Tap any of the four rangoli layers \nto customise floral states.',
    drawYourOwn: 'Create and download \nyour rangoli.',
    getStarted: 'Get started',
    homeAltText: 'A colorfull Rangoli is animating in and out.',
    drawTutoEyebrow: 'How to customise',
    drawTutoTitle: 'Tap any layer to change\nyour pattern.',
    drawTutoSkip: 'Got it',
    tutoAltText: 'On the Rangoli we can see interactive area focused.',
    drawAltText: 'The Rangoli is interactive.',
    saveAltText: 'Export and save yout Rangoli',
    shareTitle: 'Rangoli',
    shareText: '',
    shareUrl: 'https://www.apple.com/in/create-your-rangoli',
} as const

export type StringKey = keyof typeof strings

export function t(key: StringKey): string {
    return strings[key]
}
