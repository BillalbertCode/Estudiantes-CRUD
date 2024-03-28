import {envs} from './config/env.js'
import { startServer } from './server/server.js'
const main = () => {
    startServer({
        port: envs.PORT,
        public_path: envs.PUBLIC_PATH,
        data_base: envs.DATABASE_JSON,
        end_point: envs.END_POINT
    })
}

(async () => {
    main()
})()