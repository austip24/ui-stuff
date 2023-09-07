import fs from "fs";
import * as csv from "csv";

export const readCSVFile = async (filePath: string) => {
	return new Promise((resolve, reject) => {
		let isFirstLine: boolean = true;
		let headers: string[];
		const formattedData: any[] = [];
		fs.createReadStream(filePath)
			.pipe(csv.parse())
			.on("data", (data: string[]) => {
				if (isFirstLine) {
					isFirstLine = false;
					headers = data;
					return;
				}

				let row: any = {};

				data.forEach((d: string, i) => {
					const header = headers[i].trim();
					row[header] = d;
				});

				formattedData.push(row);
			})
			.on("end", () => {
				console.log("Finished Reading File", filePath);
				resolve(formattedData);
			})
			.on("error", (error) => {
				console.error("Error reading CSV file: ", error);
				reject(formattedData);
			});
	});
};
