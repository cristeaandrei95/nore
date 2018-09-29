export default `
	import Dumper from "dumper.js/src/dumper";

	console.dump = function dump (data) {
	  const dumper = new Dumper();
	  const output = dumper.generateDump(data)

	  console.log(output);
	}

	global.dump = (data) => {
		console.dump(data);
	  process.exit(0);
	};
`;
