import ffmpeg from "fluent-ffmpeg";
import { promises as fs } from "fs";

const makeSticker = (path, savePath) => new Promise((resolve, reject)=> {
	try {
		if (!path || !savePath) throw new Error("miss parameters");

		if (path.endsWith("jpeg") || path.endsWith("jpg") || path.endsWith("png")) {

			ffmpeg(path)
				.size("256x?").aspect("1:1")
				.save(savePath)
				.on("end", function(err) {
					if (err) reject(err);
					resolve(true);
				});

		}
		else if (path.endsWith("mp4")) {

			ffmpeg(path)
				.noAudio()
				.duration(10)
				.size("512x?").aspect("1:1")
				.save(savePath)
				.on("end", function(err) {
					if (err) reject(err);
					resolve(true);
				});

		}
		else if (path.endsWith("gif")){
			
			ffmpeg(path)
				.noAudio()
				.duration(10)
				.size("512x?").aspect("1:1")
				.save("giftomp4.mp4")
				.on("end", function(err) {
					if (err) reject(err);
					
					ffmpeg("giftomp4.mp4")
						.noAudio()
						.duration(10)
						.size("512x?").aspect("1:1")
						.save(savePath)
						.on("end", async function(err) {
							if (err) reject(err);
							await fs.unlink("giftomp4.mp4");
							resolve(true);
						});
				
				}); 
			
		} else {
			console.log("Formato inválido.");
			resolve(false);
		}

	} catch(err) {
		reject(err);
	}
});

export default makeSticker;