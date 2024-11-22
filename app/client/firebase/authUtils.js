import { auth } from './firebaseClient';

export const redirectIfNotLoggedIn = (redirectPath, onAuthenticated, navigate) => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
        if (!user) {
            if (navigate) {
                navigate(`/${redirectPath}`);
            } else {
                window.location.href = `/${redirectPath}`;
            }
        } else if (onAuthenticated) {
            onAuthenticated();
        }
    });

    return unsubscribe;
};