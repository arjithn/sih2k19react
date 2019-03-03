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
    value: 0
  },
  {
    label: "Deemed University-Government",
    value: 0.1
  },
  {
    label: "Deemed University-Private",
    value: 0.20000000000000004
  },
  {
    label: "Central University",
    value: 0.30000000000000004
  },
  {
    label: "State Private University",
    value: 0.4
  },
  {
    label: "Deemed University-Government Aided",
    value: 0.5000000000000001
  },
  {
    label: "Institute of National Importance",
    value: 0.6000000000000001
  },
  {
    label: "State Open University",
    value: 0.7000000000000001
  },
  {
    label: "Central Open University",
    value: 0.8
  },
  {
    label: "Institute under State Legislature Act",
    value: 0.9
  },
  {
    label: "Others",
    value: 1
  }
];
