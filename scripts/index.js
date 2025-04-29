const path = require('path');
const fs = require('fs');
const pdf = require('pdf-parse');

// get first argument
const arg = process.argv[2] || './TETUAN.pdf';
const pdf_path = path.resolve(__dirname, arg);

let dataBuffer = fs.readFileSync(pdf_path);

let isVoterNext = false;
let sql =
	'INSERT INTO voter(`name`, address, barangay, cluster_no, assign_no, precinct_no, building, room) VALUES';
const cluster = {
	567: {
		room: 'K - MARCOS',
		building: "NEAR PRINCIPAL'S OFFICE",
		precinct: ['1385A', '1385B', '1386A', '1386B']
	},
	568: {
		room: 'IV - BALAN',
		building: 'NEW BUILDING (GRADE 6)',
		precinct: ['1387A', '1388A', '1389A', '1390A']
	},
	569: {
		room: 'IC - ANOVA',
		building: 'NEW BUILDING (GRADE 6)',
		precinct: ['1390B', '1391A', '1392A', '1393A']
	},
	570: {
		room: 'IV - ENAD',
		building: 'NEW BUILDING (GRADE 6)',
		precinct: ['1394A', '1395A', '1396A', '1397A']
	},
	571: {
		room: 'IV - HAYUDINI',
		building: 'NEW BUILDING (GRADE 5)',
		precinct: ['1398A', '1399A', '1400A', '1401A']
	},
	572: {
		room: 'IV - SANTOS',
		building: 'NEW BUILDING (GRADE 5)',
		precinct: ['1402A', '1402B', '1403A', '1404A']
	},
	573: {
		room: 'IV - GUTIERREZ',
		building: 'NEW BUILDING (GRADE 5)',
		precinct: ['1405A', '1406A', '1407A', '1408A']
	},
	574: {
		room: 'I - MONDRAGON',
		buidling: 'GRADE 1 BUILDING',
		precinct: ['1409A', '1410A', '1411A', '1412A']
	},
	575: {
		room: 'I - MENDOZA',
		building: 'GRADE 1 BUILDING',
		precinct: ['1413A', '1414A', '1415A', '1415B']
	},
	576: {
		room: 'I - AMMAK',
		building: 'GRADE 1 BUILDING',
		precinct: ['1416A', '1417A', '1418A', '1419A']
	},
	577: {
		room: 'I - LARDIZABAL',
		building: 'GRADE 1 BUILDING',
		precinct: ['1419B', '1420A', '1421A', '1422A']
	},
	578: {
		room: 'II - HADJIRI',
		building: 'GRADE 2 BUILDING',
		precinct: ['1423A', '1424A', '1425A', '1426A']
	},
	579: {
		room: 'II - SUICO',
		building: 'GRADE 2 BUILDING',
		precinct: ['1427A', '1427B', '1428A', '1429A']
	},
	580: {
		room: 'II - ABDULA',
		building: 'GRADE 2 BUILDING',
		precinct: ['1430A', '1431A', '1432A', '1433A']
	},
	581: {
		room: 'II - BUCOY',
		building: 'GRADE 2 BUILDING',
		precinct: ['1433B', '1434A', '1435A', '1436A']
	},
	582: {
		room: 'LSEN - VILLANUEVA',
		building: 'SPED - LWD BUILDING',
		precinct: ['1437A', '1438A', '1439A', '1440A', '1441A']
	},
	583: {
		room: 'LSEN - GARGAR',
		building: 'SPED - LWD BUILDING',
		precinct: ['1442A', '1443A', '1444A', '1445A', '1446A']
	},
	584: {
		room: 'PG - BUCOY',
		building: 'SPED - PG BUILDING',
		precinct: ['1447A', '1448A', '1449A', '1450A', '1451A']
	},
	585: {
		room: 'PG - LLADONES',
		building: 'SPED - PG BUILDING',
		precinct: ['1452A', '1453A', '1454A', '1455A', '1455B']
	},
	586: {
		room: 'II - APARRE',
		building: 'GRADE 3 BUILDING',
		precinct: ['1456A', '1457A', '1458A', '1459A', '1460A']
	},
	587: {
		room: 'II - AUX',
		building: 'GRADE 3 BUILDING',
		precinct: ['1461A', '1462A', '1463A', '1464A', '1465A']
	},
	588: {
		room: 'I - AMAHOY',
		building: 'GRADE 3 BUILDING',
		precinct: ['1466A', '1467A', '1468A', '1469A', '1470A']
	},
	589: {
		room: 'K - TRIAGO',
		building: 'NEAR CONFERENCE ROOM',
		precinct: ['1471A', '1471B', '1472A', '1472B']
	}
};

function getCluster(precinct_no) {
	const found = Object.entries(cluster).find((e) =>
		e[1].precinct.find((p) => p === precinct_no)
	);
	return { ...cluster[found[0]], cluster_no: found[0] };
}

let precinct_no = '';
let _cluster = {};
// default render callback
function render_page(pageData) {
	//check documents https://mozilla.github.io/pdf.js/
	let render_options = {
		//replaces all occurrences of whitespace with standard spaces (0x20). The default value is `false`.
		normalizeWhitespace: false,
		//do not attempt to combine same line TextItem's. The default value is `false`.
		disableCombineTextItems: true
	};
	return pageData.getTextContent(render_options).then(function (textContent) {
		let lastY,
			text = '',
			line = '',
			isVoterList = false;
		for (let item of textContent.items) {
			if (lastY == item.transform[5] || !lastY) {
				text += '|' + item.str;
				line += '|' + item.str;
			} else {
				text += '\n' + item.str;

				if (text.search("No.|Voter's Name") > -1) {
					isVoterList = true;
				}
				if (line.search('Prec :') > -1) {
					precinct_no = line.split(':')[1].trim();
					_cluster = getCluster(precinct_no);
				}
				if (isVoterNext && line.search('Date:') > -1) {
					isVoterNext = false;
				} else if (isVoterNext) {
					if (line.split('|').length === 3) {
						const [assign_no, address, name] = line.split('|');
						sql += `("${name}", "${address}", "TETUAN", "${_cluster.cluster_no}", "${assign_no}", "${precinct_no}", "${_cluster.building}", "${_cluster.room}"),`;
					}
				} else if (!isVoterNext && line.search('PCVL') > -1) {
					isVoterNext = true;
				}
				line = item.str;
			}
			lastY = item.transform[5];
		}
		return text;
	});
}

let options = {
	pagerender: render_page
	// max: 1,
};

pdf(dataBuffer, options).then(function (data) {
	//use new format
	const finalSql = sql.slice(0, -1);
	console.log(finalSql);
	fs.writeFile('./insertVoters.sql', finalSql, (err) => {
		if (err) {
			console.error(err);
			return;
		}
		//file written successfully
	});
});
