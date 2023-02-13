import { cleanEnv, port, str } from 'envalid';

const validateEnv = () => {
    cleanEnv(process.env, {
        NODE_ENV: str(),
        PORT: port(),
        MYSQL_HOST: str(),
        MYSQL_PORT: port(),
        MYSQL_USER: str(),
        MYSQL_PASSWORD: str(),
        MYSQL_DB: str(),
        JWT_ACCESS_TOKEN_PRIVATE_KEY: str(),
        JWT_ACCESS_TOKEN_PUBLIC_KEY: str(),
        JWT_REFRESH_TOKEN_PRIVATE_KEY: str(),
        JWT_REFRESH_TOKEN_PUBLIC_KEY: str()
    });
};

export default validateEnv;
