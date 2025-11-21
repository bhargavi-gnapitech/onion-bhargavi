 const geographicArea = {
   ID: "13",
  Market: "Mesa"
};
const arg1 ={
  UUB:{
     'Name':'Test',
     'Ground': 'Yes',
     'FRC': '85C',
  }
};

const arg = {
  formData: {
      'Why?': 'For Testing',
      'Why now?': 'For Immediate Need',
      'What?': 'Testing Purpose',
      'Where?': 'Location',
      'Why this way?': 'Efficiency',
      'Contractor': 'Dycom',
     'Geographic Area': geographicArea  // ✅ Assigning the predefined object
  }
};


module.exports = { arg ,arg1, geographicArea}                           //Exporting for Easy Access

