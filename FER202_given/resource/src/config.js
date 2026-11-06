export const API = 'http://localhost:9000';

export const getUser = () => {
    try {
        return JSON.parse(localStorage.getItem('user'));
    } catch {
        return null;
    }
};
