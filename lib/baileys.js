import Baileys from "@adiwajshing/baileys";
import path from "path";
import logger from "./logger.js";

const {
	default: makeWASocket,
	DisconnectReason,
	useMultiFileAuthState
} = Baileys;

const {
	state,
	saveCreds
} = await useMultiFileAuthState(path.join("baileys_files", "baileys_auth_info"));
  
export const Sock = () => makeWASocket({
	printQRInTerminal: true,
	auth: state,
	logger
});

export function reconnect(events, startFunction) {
	try {
		const update = events["connection.update"];
		const {
			connection,
			lastDisconnect
		} = update;
		if (connection === "close") {
			// reconnect if not logged out
			var _a,
				_b;
			if (((_b = (_a = lastDisconnect === null || lastDisconnect === void 0 ? void 0: lastDisconnect.error) === null || _a === void 0 ? void 0: _a.output) === null || _b === void 0 ? void 0: _b.statusCode) !== DisconnectReason.loggedOut) {
				startFunction();
			} else {
				console.log("Connection closed. You are logged out.");
			}
		}

		console.log("connection update", update);
	} catch(err) {
		throw new Error(err);
	}
}

export { saveCreds };