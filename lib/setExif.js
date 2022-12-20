import fp from "fs";
import { exec } from "child_process";
const fs = fp.promises;

const addMetadata = (packname, author) => new Promise(async(resolve, reject) => {
	try {
		if (!packname) packname = " ";
		if (!author) author = " ";

		author = author.replace(/[^a-zA-Z0-9]/g, "");

		let json = {
			"sticker-pack-name": packname,
			"sticker-pack-publisher": author,
		};

		let littleEndian = Buffer.from([0x49, 0x49, 0x2A, 0x00, 0x08, 0x00, 0x00, 0x00, 0x01, 0x00, 0x41, 0x57, 0x07, 0x00]);

		let bytes = [0x00,
			0x00,
			0x16,
			0x00,
			0x00,
			0x00];
		let len = JSON.stringify(json).length;
		let last;

		if (len > 256) {
			len = len - 256;
			bytes.unshift(0x01);
		} else {
			bytes.unshift(0x00);
		}

		if (len < 16) {
			last = len.toString(16);
			last = "0" + len;
		} else {
			last = len.toString(16);
		}

		const buf2 = Buffer.from(last, "hex");
		const buf3 = Buffer.from(bytes);
		const buf4 = Buffer.from(JSON.stringify(json));

		const buffer = Buffer.concat([littleEndian, buf2, buf3, buf4]);

		await fs.writeFile("./metadata.exif", buffer);
		resolve("./metadata.exif");

	} catch(err) {
		reject(err);
	}
});

const setExif = (path, author, packname) => new Promise(async(resolve, reject) => {
	try {
		let exifFile = await addMetadata(author, packname);
		exec(`webpmux -set exif ${exifFile} ${path} -o ${path}`, (err) => {
			if (err) reject(err);
			resolve(true);
		});
	} catch(err) {
		reject(err);
	}
});

export default setExif;