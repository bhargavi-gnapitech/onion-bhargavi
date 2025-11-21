var arg = {
	designDetails: {
		// 'Name': 'cabinet',
		// 'Spec': 'Phoenix',
		// //'FRC':  '85C',
		// 'PSA': 'code_psa',
		
		// 'PON': 'clli',
		// 'Full Address': '3/25 moosapet',
		// 'House Number': '125',
		// 'Street Name': 'just now',
		// 'City': 'Hyd',
		// 'State': 'Telangana',
		// 'Postal Code': '516115',
		// 'Postal Code plus 4': '564365',
		// 'County':'India',
		
		'Job Name': 'Job: ' + Math.random(),
		Market: 'Phoenix',
		'Project Number': '12345',
		'PSA Code': 'code_psa',
		
		'AOP CLLI': 'clli',
		//'Est Completion Date': '10',
		'What?': 'what125',
		'Why now?': 'just now only',
		'Why this way?': 'only now',
		'Why?': 'This is why',
		'Where?': 'Here only ',
		//'Project Type': 'Draft',
	},
	manHole1: {
		'Name': 'U1',
		'Spec': 'Phoenix',
		
	},

	manHole: {
		'Name': 'U2',
		'Spec': 'Phoenix',
		
	},

	building: {
		'Name':'B1',
		'CLLI': 'Building',
		
		
	},
	
	design_coordinates: [
		// '-112.1448320,33.3997370',
		// '-112.1448320,33.5137381',
		// '-111.9879335,33.5137381',
		// '-111.9879335,33.3997370',

		// '-115.24779166397228, 35.98408919220398',
		// '-115.24387206209528, 35.98413549387428',
		// '-115.24382199463022, 35.982237104040735',
		// '-115.24770583328379, 35.982196588948725',
		
		' -112.02299325212928,32.919321842222445','-112.01563327059242,32.919249792768184','-112.0157191012809,32.91494473142251','-112.02464549288248,32.91534102197048'

	],
	objectId: 'design',
	object: 'cabinet',
	objectId_pole: 'pole',
	objectId1: 'manhole',
	objectId2: 'building',
	poleCoordinate: [-112.025, 33.43256],

};

module.exports = { arg };