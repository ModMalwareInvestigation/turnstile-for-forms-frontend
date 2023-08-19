/**
 * Form with questions for users to fill out
 */
export type Form = {
    /**
     * ID of the form, used in the URL params (?form=id) to determine which form to load in the iframe
     */
    id: string
    /**
     * Title of the form, set as the window and iframe titles
     */
    title: string
    /**
     * URL of the form
     * This must be the full link, not a short link
     */
    url: URL
    /**
     * Integer ID of the form's "Session ID" field where the session ID should be filled
     */
    sessionFieldId: number
}

/**
 * Form for storing Turnstile tokens
 */
export type TokenForm = {
    /**
     * URL of the form
     * This must be the full link, not a short link
     */
    url: URL
    /**
     * Integer ID of the form's "Session ID" field where the session ID should be filled
     */
    sessionFieldId: number
    /**
     * Integer ID of the form's "Token" field where the session ID should be filled
     */
    tokenFieldId: number
}

/**
 * Cloudflare turnstile site key
 */
const siteKey: string = '0x4AAAAAAAHNDYDRhoMcahuG'
const forms: Form[] = [
    {
        id: 'contact',
        title: 'Contact Us',
        url: new URL('https://docs.google.com/forms/d/e/1FAIpQLSdnTRLpSW2z451ZA7pgj1M7vA552eVD0Y_oLdmIneK5Oiv8sg/viewform?embedded=true'),
        sessionFieldId: 2010591669
    },
    {
        id: 'report',
        title: '',
        url: new URL('https://docs.google.com/forms/d/e/1FAIpQLSdTHGyHaDBumycyNg6PLbUe5w73HzIs3B2XV2kDp5S9Wo6Gyg/viewform?embedded=true'),
        sessionFieldId: 285977826
    }
]
const tokenForm: TokenForm = {
    url: new URL('https://docs.google.com/forms/d/e/1FAIpQLSeMe14zQmr4bno6jGhEIYUHXhxDuAVU0IKoPqGkzJzZcmI-XA'),
    sessionFieldId: 1960260929,
    tokenFieldId: 262722734
}

export {
    siteKey,
    forms,
    tokenForm
}