const MONGODB_URI = process.env.NODE_ENV === 'test'
    ? process.env.TEST_MONGO_URI
    : process.env.MONGO_URI;

const config = {
    MONGODB_URI,
}

export default config;