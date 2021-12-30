var spintax = require('mel-spintax');
const spin = async (val, cb ) => {
	let res = await spintax.unspin(val);
	await cb(res)
}

module.exports = spin