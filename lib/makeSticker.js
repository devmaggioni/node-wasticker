import ffmpeg from "fluent-ffmpeg";

const makeSticker = (path, savePath) => new Promise((resolve, reject)=> {
	try {
		if (!path || !savePath) throw new Error("miss parameters");

		if (path.endsWith("jpeg") || path.endsWith("jpg") || path.endsWith("png")) {

			ffmpeg(path)
				.size("256x?").aspect("4:3")
				.save(savePath)
				.on("end", function(err) {
					if (err) reject(err);
					resolve(true);
				});

		} else if (path.endsWith("mp4" || path.endsWith("gif"))) {

			ffmpeg(path)
				.noAudio()
				.duration(10)
				.size("512x?").aspect("4:3")
				.save(savePath)
				.on("end", function(err) {
					if (err) reject(err);
					resolve(true);
				});

		}

	} catch(err) {
		reject(err);
	}
});

export default makeSticker;