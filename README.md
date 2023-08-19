# Turnstile for Forms Frontend

This is the frontend for [Turnstile for Forms](https://github.com/ModMalwareInvestigation/turnstile-for-forms).
It is a wrapper for Google forms that serves the Cloudflare Turnstile challenge and sends the resulting token to the backend.

# Usage
A working [Turnstile for Forms](https://github.com/ModMalwareInvestigation/turnstile-for-forms) instance and
specially configured forms are required. Please see the link for instructions.

## Requirements
### Node and NPM
This project requires Node 18.17.1 LTS or higher and a package manager such as NPM, yarn, or PNPM.

| NPM Script | Description                                                                        |
|------------|------------------------------------------------------------------------------------|
| dev        | launches a preview of the site that automatically updates when the HTML is changed |
| build      | compiles the typescript into `./dist` with the HTML                                |
| preview    | Previews the production version of the site                                        |

## Setup
### Getting Google Form Field IDs
Google Form field IDs are numeric IDs that the front end requires to pre-fill fields in the form.

1. Open your form from Google Forms or Google Drive to enter the form editor.
2. Click the three dots in the top right corner and click "Get pre-filled link"
3. Fill in the "Session ID" field (and the "Token" field if the form is the token form)
4. Click "Get link" at the bottom then "Copy Link" in the pop-up.
5. Paste the link into a text editor and note the entry parameters (e.g. `entry.1234567=abc`). The number is the field ID.

### Configuration
1. Fill in `src/config.ts` according to the comments provided in the file. An example configuration is provided below for reference.
    ```ts
        const siteKey: string = '0x4AAAAAAAAAAAAAAAAA'
        const forms: Form[] = [
            {
                id: 'contact',
                title: 'Contact Us',
                url: new URL('https://docs.google.com/forms/d/e/example/viewform?embedded=true'),
                sessionFieldId: 1234567890
            },
            {
                id: 'report',
                title: 'Submit Report',
                url: new URL('https://docs.google.com/forms/d/e/example2/viewform?embedded=true'),
                sessionFieldId: 1234567890
            }
        ]
        const tokenForm: TokenForm = {
            url: new URL('https://docs.google.com/forms/d/e/example'),
            sessionFieldId: 1234567890,
            tokenFieldId: 1234567890
        }
    ```
2. Change the page title in `index.html` and the privacy notice to your liking. If you change any of the elements referred to in `src/main.ts`, don't forget to change the references as well.
3. Build the project using `npm build` (command varies by package manager)
4. Upload the files in `dist` to your hosting provider of choice (e.g. Firebase)
5. Test the Cloudflare challenge and response validation