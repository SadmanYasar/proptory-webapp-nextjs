/* eslint-disable no-console */
const info = (...params: any) => {
    if (process.env.NODE_ENV === 'production') {
        return;
    }

    if (process.env.NODE_ENV !== 'test') {
        console.log(...params);
    }
};

const error = (...params: any) => {
    if (process.env.NODE_ENV === 'production') {
        return;
    }

    if (process.env.NODE_ENV !== 'test') {
        console.log(...params);
    }
};

const logger = {
    info,
    error,
};

export default logger;