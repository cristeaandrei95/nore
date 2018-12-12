import { VirtualModule } from "@nore/webpack";

const toSource = data => JSON.stringify(data);

export default async (bundle, nore) => {
	const name = "@nore/variables.json";
	const variables = await nore.variables.load();

	const virtualModule = new VirtualModule({
		name: name,
		source: toSource(variables),
	});

	nore.on("variables:change", async variables => {
		// trigger webpack compilation restart
		virtualModule.write(name, toSource(variables));
	});

	return {
		plugins: [virtualModule],
	};
};
