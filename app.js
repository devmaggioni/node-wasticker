
import {
	Sock,
	reconnect,
	saveCreds,
	logger,
	makeSticker,
	setExif
} from "./lib/index.js";

export async function createSticker({path, savePath, author, packname}){
	try {
    
		await makeSticker(path, savePath);
		await setExif(savePath, author, packname);

	} catch(err) {
		console.log(err);
	}
}

export const sendSticker = (tel) => {
	try {
		
		const sock = Sock();

		sock.ev.process(
			async(events) => {
				if (events["connection.update"]) {
        	//reconnect(events, sendSticker);
        	
        	const { connection } = events["connection.update"];
        	
					if(connection === "open") {
						
						await sock.sendMessage(tel + "@s.whatsapp.net", { sticker: { url: "./sticker.webp" }
						});
						console.log("Sticker Entregue ✓");
						sock.ws.close();
						
					}
					
				}

				if (events["creds.update"]) {
					await saveCreds();
				}
        
			});

		return sock;
    
	} catch(err) {
		console.log(err.stack);
	}
};