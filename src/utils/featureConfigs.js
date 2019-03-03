export const transformPreferences = pref => {
  const reqBody = {};
  const keys = Object.keys(pref);
  return keys.reduce((reqBody, key) => {
    if (Array.isArray(pref[key])) {
      const x = pref[key];
      x.forEach(function(element) {
        reqBody[element["id"]] = 1;
      });
    } else
      reqBody[pref[key]["id"]] = pref[key]["value"] ? pref[key]["value"] : 1;
    return reqBody;
  }, {});
};

export const infrastructureOptions = [
  { id: 5, label: "hostel count" },
  { id: 17, label: "cafeteria", disabled: true },
  { id: 6, label: "playground", disabled: false },
  { id: 7, label: "auditorium" },
  { id: 8, label: "theatre" },
  { id: 9, label: "library" },
  { id: 10, label: "laboratory" },
  { id: 11, label: "conference hall" },
  { id: 12, label: "health center" },
  { id: 13, label: "gymnasium" },
  { id: 15, label: "common room" },
  { id: 16, label: "computer center" },
  { id: 18, label: "guest house" }
];

export const researchOptions = [
  { id: 22, label: "no of journals" },
  { id: 10, label: "laboratory" },
  { id: 9, label: "library" },
  { id: 23, label: "opportunity cell" }
];

export const academicsOptions = [
  { id: 105, label: "student faculty ratio" },
  { id: 24, label: "student intake" },
  { id: 9, label: "library" },
  { id: 10, label: "laboratory" },
  { id: 21, label: "teaching staff" },
  { id: 4, label: "offers distant course" },
  { id: 16, label: "computer center" }
];

export const univTypeOptions = [
  {
    label: "ALL Types",
    value: 0
  },
  {
    label: "State Public University",
    value: "State Public University"
  },
  {
    label: "Deemed University-Government",
    value: "Deemed University-Government"
  },
  {
    label: "Deemed University-Private",
    value: "Deemed University-Private"
  },
  {
    label: "Central University",
    value: "Central University"
  },
  {
    label: "State Private University",
    value: "State Private University"
  },
  {
    label: "Deemed University-Government Aided",
    value: "Deemed University-Government Aided"
  },
  {
    label: "Institute of National Importance",
    value: "Institute of National Importance"
  },
  {
    label: "State Open University",
    value: "State Open University"
  },
  {
    label: "Central Open University",
    value: "Central Open University"
  },
  {
    label: "Institute under State Legislature Act",
    value: "Institute under State Legislature Act"
  },
  {
    label: "Others",
    value: "Others"
  }
];
