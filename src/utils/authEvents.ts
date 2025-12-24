export const AUTH_UPDATE_EVENT = 'auth-update';

export const dispatchAuthUpdate = () => {
    window.dispatchEvent(new Event(AUTH_UPDATE_EVENT));
};

export const listenToAuthUpdate = (callback: () => void) => {
    window.addEventListener(AUTH_UPDATE_EVENT, callback);
    return () => window.removeEventListener(AUTH_UPDATE_EVENT, callback);
};
