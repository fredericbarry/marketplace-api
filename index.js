import { app } from "./src/app.js";
import { APP_HOST, APP_PORT } from "./src/configs/app.config.js";
import { logInfo } from "./src/utils/logger.js";

app.listen(APP_PORT, () => {
    logInfo(`App listening at http://${APP_HOST}:${APP_PORT}/`);
});
