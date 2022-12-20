import fs from "fs";
import axios from "axios";
import path from "path";
import inquirer from "inquirer";
import {
	createSticker,
	sendSticker
} from "./app.js";

async function run() {
	try {

		let readdir = await fs.readdirSync(path.join(process.cwd()));

		if (readdir.includes("sticker.webp")) {
			await fs.unlinkSync(path.join(process.cwd(), "sticker.webp"));
		}
		if (readdir.includes("download.png")) {
			await fs.unlinkSync(path.join(process.cwd(), "download.png"));
		}
		if (readdir.includes("metadata.exif")) {
			await fs.unlinkSync(path.join(process.cwd(), "metadata.exif"));
		}

		inquirer
			.prompt([{
				name: "file",
				type: "input",
				message: "Digite o caminho ou URL: ",
			},
			{
				name: "author",
				type: "input",
				message: "Nome do Author: ",
			},
			{
				name: "packname",
				type: "input",
				message: "Nome do pack: ",
			},
			{
				name: "number",
				type: "input",
				message: "Enviar para (número whatsapp): ",
			},
			])
			.then(async (answer) => {

				if (answer.file.includes("http://") || answer.file.includes("https://")) {

					axios({
						method: "GET",
						url: answer.file,
						responseType: "stream"
					}).then(res => {

						res.data.pipe(fs.createWriteStream("download.png"));

						res.data.on("end", async() => {
							console.log("\ndownload complete\n");

							await createSticker({
								path: path.join(process.cwd(), "download.png"),
								savePath: path.join(process.cwd(), "sticker.webp"),
								author: answer.author,
								packname: answer.packname
							});

							console.log("Sticker Criado, enviando...");

							await sendSticker(answer.number);

						});
					});

				} else {

					await createSticker({
						path: path.join(answer.file),
						savePath: path.join(process.cwd(), "sticker.webp"),
						author: answer.author,
						packname: answer.packname
					});

					console.log("Sticker Criado, enviando...");

					await sendSticker(answer.number);

				}

			});

	} catch(err) {
		console.log(err.stack);
	}
}
run();