import {forms, siteKey, tokenForm, TokenForm} from "./config.ts";

const privacyNotice: HTMLDivElement = document.getElementById('privacyNotice')! as HTMLDivElement;
const privacyNoticeAccept: HTMLButtonElement = document.getElementById('privacyNoticeAccept')! as HTMLButtonElement;
const formFrame: HTMLIFrameElement = document.getElementById('formFrame')! as HTMLIFrameElement;
const turnstileDiv: HTMLDivElement = document.getElementById('turnstile')! as HTMLDivElement;
const messagePopup: HTMLDivElement = document.getElementById('messagePopup')! as HTMLDivElement;
const messageDismiss: HTMLButtonElement = document.getElementById('messageDismiss')! as HTMLButtonElement;

const formId = new URLSearchParams(window.location.search).get('form');
const sessionId = crypto.randomUUID();
let formTitle: string | null = null;
let formUrl: string | null = null;
let formFieldId: number;
let firstRun: boolean = true;

if (typeof formId != null) {
    for (let form of forms) {
        if (form.id === formId) {
            formTitle = form.title;
            formUrl = form.url.toString();
            formFieldId = form.sessionFieldId;
            document.head.title = form.title;
            break;
        }
    }
}

turnstileDiv.style.display = 'none';
formFrame.style.display = 'none';
formFrame.style.opacity = '0';
messagePopup.style.display = 'none';
messagePopup.style.opacity = '0';
messageDismiss.addEventListener('click', onMessageDismiss);
privacyNoticeAccept.addEventListener('click', onPrivacyNoticeAccept);

if (formTitle) {
    document.getElementById('privacyNoticeFormTitle')!.innerText = formTitle;
}

if (formUrl) {
    // if using synchronous loading, will be called once the DOM is ready
    // @ts-ignore
    turnstile.ready(function () {
        // @ts-ignore
        turnstile.render('#turnstile', {
            'sitekey': siteKey,
            'cData': sessionId,
            'callback': function (token: string) {
                if (firstRun) {
                    turnstileDiv.classList.add('turnstileFadeOut');
                    // @ts-ignore
                    turnstileDiv.onanimationend = (event) => {
                        turnstileDiv.style.opacity = '0';
                        turnstileDiv.style.display = 'none';
                        turnstileDiv.classList.remove('turnstileFadeOut');
                    }
                    formFrame.title = `Google Form titled ${formTitle}`
                    formFrame.src = formUrl + `&entry.${formFieldId}=${sessionId}`;
                    formFrame.style.display = '';
                    formFrame.classList.add('formFrameFadeIn');
                    // @ts-ignore
                    formFrame.onanimationend = (event) => {
                        formFrame.style.opacity = '1';
                        formFrame.classList.remove('formFrameFadeIn');
                    }
                    firstRun = false;
                }
                console.debug(`Challenge Success ${token}`);
                submitToken(tokenForm, sessionId, token);
            },
            'error-callback': function () {
                if (messagePopup.style.display === 'none') {
                    showMessage('Error', 'Verification failed. Please refresh the page and try again.');
                }
            },
            'execution': 'execute'
        });
    });
} else {
    showMessage('Error', 'Form ID missing or invalid\nPlease ask the person who sent you this link for a new link.');
}

function onPrivacyNoticeAccept() {
    privacyNotice.style.display = 'none';
    turnstileDiv.style.display = '';
    // @ts-ignore
    turnstile.execute();
}

function onMessageDismiss() {
    messagePopup.classList.add('messagePopupFadeOut');
    // @ts-ignore
    messagePopup.onanimationend = (event) => {
        messagePopup.style.opacity = '0';
        messagePopup.style.display = 'none';
        messagePopup.classList.remove('messagePopupFadeOut');
    }
}

function showMessage(title: string, text: string) {
    document.getElementById('messageTitle')!.innerText = title;
    document.getElementById('messageText')!.innerText = text;
    messagePopup.style.display = '';
    messagePopup.classList.add('messagePopupFadeIn');
    // @ts-ignore
    messagePopup.onanimationend = (event) => {
        messagePopup.style.opacity = '1';
        messagePopup.classList.remove('messagePopupFadeIn');
    }
}

function submitToken(tokenForm: TokenForm, sessionId: string, token: string) {
    const tokenFormUrl = `${tokenForm.url}/formResponse?entry.${tokenForm.sessionFieldId}=${sessionId}&entry.${tokenForm.tokenFieldId}=${token}&submit=Submit`
    const request = new XMLHttpRequest();

    request.open('GET', tokenFormUrl, true);
    request.send();
}