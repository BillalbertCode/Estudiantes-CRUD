import env from 'dotenv'
import envar from 'env-var'
env.config()

export const envs ={
    PORT: envar.get('PORT').required().asPortNumber(),
    PUBLIC_PATH: envar.get('PUBLIC_PATH').default('public').asString(),
    DATABASE_JSON:envar.get('DATABASE_JSON').required().asString(),
    END_POINT:envar.get('END_POINT').required().asString()

}