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
		// North Phoenix — tightly above the Salt River (which runs at ~33.45)
		// Canvas clicks at 30%/70% land at ~33.488 and ~33.472, both clear of water
		'-112.0450,33.4600',
		'-112.0450,33.5000',
		'-112.0050,33.5000',
		'-112.0050,33.4600',
	],
	objectId: 'design',
	object: 'cabinet',
	objectId_pole: 'pole',
	objectId1: 'manhole',
	objectId2: 'building',
	poleCoordinate: [-112.025, 33.43256],

};

module.exports = { arg };