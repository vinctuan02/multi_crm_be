import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as fs from 'fs/promises';
import * as Handlebars from 'handlebars';
import * as path from 'path';

@Injectable()
export class MessageService {
	constructor(private configService: ConfigService) {}

	async renderTemplateFromFile<T>(
		fileName: string,
		data: T,
	): Promise<string> {
		const env = this.configService.get<string>('NODE_ENV');

		const basePath =
			env === 'production'
				? path.resolve(__dirname, '..')
				: path.resolve(__dirname, '../../../src/notification');

		const filePath = path.join(basePath, fileName);
		const templateContent = await fs.readFile(filePath, 'utf-8');
		const template = Handlebars.compile(templateContent);

		return template(data);
	}
}
