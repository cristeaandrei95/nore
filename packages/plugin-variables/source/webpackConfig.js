import { VirtualModule } from "@nore/webpack";

const toSource = data => JSON.stringify(data);

export default async bundle => {
	const name = "@nore/variables.json";
	const variables = await bundle.variables.load();

	const virtualModule = new VirtualModule({
		name: name,
		source: toSource(variables),
	});

	bundle.on("variables", async variables => {
		// trigger webpack compilation restart
		virtualModule.write(name, toSource(variables));
	});

	return {
		plugins: [virtualModule],
	};
};
