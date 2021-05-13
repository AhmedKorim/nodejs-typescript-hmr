import {LoggerService} from "@app/misc/logger.service";

type HMRModule =  NodeModule & { hot?: any };
if ((module as HMRModule ).hot) (module as HMRModule).hot.accept();

const appLogger = new LoggerService('app');
async function main(){
	appLogger.log('change this');
}


main().catch(appLogger.error);
