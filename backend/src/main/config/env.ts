import 'dotenv/config';

export const env = {
  application: {
    mode: process.env.NODE_ENV as string,
  },
  cors: {
    production: {
      url: process.env.PRODUCTION_DEPLOY_URL as string,
      frontUrl: process.env.PRODUCTION_FRONT_DEPLOY_URL as string,
    },
    stage: {
      url: process.env.STAGE_DEPLOY_URL as string,
      frontUrl: process.env.STAGE_FRONT_DEPLOY_URL as string,
      appName: process.env.STAGE_FRONT_APP_NAME as string,
    },
  },
  httpServer: {
    port: parseInt(process.env.API_PORT as string, 10) || (3001 as number),
  },
  databases: {
    postgres: {
      url: `postgresql://${process.env.DATABASE_USERNAME}:${process.env.DATABASE_PASSWORD}@${process.env.DATABASE_HOST}:${process.env.DATABASE_PORT}/${process.env.DATABASE_NAME}?schema=public`,
      urlTest: `postgresql://${process.env.DATABASE_TEST_USERNAME}:${process.env.DATABASE_TEST_PASSWORD}@${process.env.DATABASE_TEST_HOST}:${process.env.DATABASE_TEST_PORT}/${process.env.DATABASE_TEST_NAME}?schema=public`,
    },
  },
  logs: {
    sentry: {
      url: process.env.SENTRY_URL as string,
    },
  },
  cloud: {
    cognito:
      process.env.NODE_ENV === 'test'
        ? {
            apiVersion: process.env.TEST_COGNITO_API_VERSION as string,
            region: process.env.TEST_COGNITO_REGION as string,
            accessKeyId: process.env.TEST_COGNITO_ACCESS_KEY_ID as string,
            secretAccessKey: process.env
              .TEST_COGNITO_SECRET_ACCESS_KEY as string,
            clientId: process.env.TEST_COGNITO_CLIENT_ID as string,
            userPoolId: process.env.TEST_COGNITO_USER_POOL_ID as string,
          }
        : {
            apiVersion: process.env.COGNITO_API_VERSION as string,
            region: process.env.COGNITO_REGION as string,
            accessKeyId: process.env.COGNITO_ACCESS_KEY_ID as string,
            secretAccessKey: process.env.COGNITO_SECRET_ACCESS_KEY as string,
            clientId: process.env.COGNITO_CLIENT_ID as string,
            userPoolId: process.env.COGNITO_USER_POOL_ID as string,
          },
  },
  storage: {
    bucketName: process.env.AWS_BUCKET_NAME as string,
    region: process.env.AWS_BUCKET_REGION as string,
    accessKeyId: process.env.AWS_BUCKET_ACCESS_KEY_ID as string,
    secretAccessKey: process.env.AWS_BUCKET_SECRET_ACCESS_KEY as string,
  },
};
