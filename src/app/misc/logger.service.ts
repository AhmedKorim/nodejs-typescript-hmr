import {inspect} from 'util';
import {WinstonLogger} from "@app/misc/winston.service";


enum Color {
	Reset = '\x1b[0m',
	Bright = '\x1b[1m',
	Dim = '\x1b[2m',
	Underscore = '\x1b[4m',
	Blink = '\x1b[5m',
	Reverse = '\x1b[7m',
	Hidden = '\x1b[8m',
	FgBlack = '\x1b[30m',
	FgRed = '\x1b[31m',
	FgGreen = '\x1b[32m',
	FgYellow = '\x1b[33m',
	FgBlue = '\x1b[34m',
	FgMagenta = '\x1b[35m',
	FgCyan = '\x1b[36m',
	FgWhite = '\x1b[37m',
	BgBlack = '\x1b[40m',
	BgRed = '\x1b[41m',
	BgGreen = '\x1b[42m',
	BgYellow = '\x1b[43m',
	BgBlue = '\x1b[44m',
	BgMagenta = '\x1b[45m',
	BgCyan = '\x1b[46m',
	BgWhite = '\x1b[47m',
}

export class LoggerService {
	private static logger = WinstonLogger.getInstance().getLogger();

	constructor(private context: string) {
	}

	get Logger() {
		return LoggerService.logger;
	}

	public log(message: string): void {
		const currentDate = new Date();
		this.Logger.info(message, {
			timestamp: currentDate.toISOString(),
			context: this.context,
		});
		this.formatedLog('info', message);
	}

	public logDebug(...args: any[]): void {
		/* tslint:disable */
		console.group('Debug');
		console.log(...args);
		console.groupEnd();
		/* tslint:enable */
	}

	public error(message: string, trace?: any): void {
		const currentDate = new Date();
		const traceString = inspect(trace, {
			breakLength: 100,
			maxArrayLength: 15,
			depth: 4,
			colors: false,
		});
		this.Logger.error(`${message}`, {
			timestamp: currentDate.toISOString(),
			context: this.context,
			trace: traceString || 'trace not provided !',
		});
		this.formatedLog('error', message, traceString);
	}

	public warn(message: string): void {
		const currentDate = new Date();
		this.Logger.warn(message, {
			timestamp: currentDate.toISOString(),
			context: this.context,
		});
		this.formatedLog('warn', message);
	}

	public trace(message: string): void {
		this.formatedLog('trace', message);
	}

	private formatedLog(level: string, message: string, error?: any): void {
		let result = '';
		const currentDate = new Date();
		// tslint:disable-next-line:max-line-length
		const time = `${currentDate.getHours()}:${currentDate.getMinutes()}:${currentDate.getSeconds()}`;

		switch (level) {
			case 'info':
				result = `${Color.FgCyan}[INFO]${Color.Reset}${time} [${this.context}] ${message}`;
				break;
			case 'error':
				result = `${Color.FgRed}[ERR]${Color.Reset}${time} [${this.context}] ${
					message.length > 0 ? message : 'No Error Message Provided!'
				}`;
				break;
			case 'trace':
				result = `${Color.FgGreen}[TRACE]${Color.Reset}${time} [${this.context}] ${message}`;
				break;
			case 'warn':
				result = `${Color.FgYellow}[WARN]${Color.Reset}${time} [${this.context}] ${message}`;
				break;
			default:
				break;
		}
		if (error) {
			// disable error logging while testing!
			// tslint:disable-next-line:no-console
			console.error(result);
		} else {
			// tslint:disable-next-line:no-console
			console.log(result);
		}
	}
}
