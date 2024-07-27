const ribbonsData = [
  {
    id: '01-meritorious-achievement',
    name: 'Meritorious Achievement',
    imagePath: 'images/ribbons/01-meritorious-achievement.jpg',
    precedence: 1,
    description: 'Awarded, WHEN EARNED, to any NJROTC cadet who distinguishes him/herself only by outstanding meritorious achievement or performance of a meritorious act.'
  },
  {
    id: '02-distinguished-unit',
    name: 'Distinguished Unit',
    imagePath: 'images/ribbons/02-distinguished-unit.jpg',
    precedence: 2,
    description: 'Awarded to cadets who were unit members during the academic year in which the school earned Distinguished Unit status.'
  },
  {
    id: '03-distinguished-cadet',
    name: 'Distinguished Cadet',
    imagePath: 'images/ribbons/03-distinguished-cadet.jpg',
    precedence: 3,
    description: 'Awarded yearly to one cadet in each year group with the highest combined average for overall scholastic standing and aptitude.'
  },
  {
    id: '04-honor-cadet',
    name: 'Honor Cadet',
    imagePath: 'images/ribbons/04-honor-cadet.jpg',
    precedence: 4,
    description: 'Awarded yearly to one cadet in each year group with the highest overall academic achievement in school.'
  },
  {
    id: '05-cadet-achievement',
    name: 'Cadet Achievement',
    imagePath: 'images/ribbons/05-cadet-achievement.jpg',
    precedence: 5,
    description: 'Awarded, when earned, to any cadet who distinguishes him/herself by outstanding achievement or sustained superior performance.'
  },
  {
    id: '06-unit-achievement',
    name: 'Unit Achievement',
    imagePath: 'images/ribbons/06-unit-achievement.jpg',
    precedence: 6,
    description: 'Awarded to cadets in good standing who were unit members during the academic year in which the school earned the Unit Achievement status as determined by the Area Manager. Awarded only to those units that demonstrated exceptional performance but did not qualify for Distinguished Unit status.'
  },
  {
    id: '07-aptitude',
    name: 'Aptitude',
    imagePath: 'images/ribbons/07-aptitude.jpg',
    precedence: 7,
    description: 'Awarded to the top 10% of the cadets based on evaluation of academic performance of assigned jobs, conduct, unit involvement, attendance, and overall aptitude.'
  },
  {
    id: '08-naval-science-4-outstanding-cadet',
    name: 'NS4 Outstanding Cadet',
    imagePath: 'images/ribbons/08-naval-science-4-outstanding-cadet.jpg',
    precedence: 8,
    description: 'Awarded yearly to outstanding cadets in Naval Science 4 based on citizenship, academic performance, personal appearance and conduct.'
  },
  {
    id: '09-naval-science-3-outstanding-cadet',
    name: 'NS3 Outstanding Cadet',
    imagePath: 'images/ribbons/09-naval-science-3-outstanding-cadet.jpg',
    precedence: 9,
    description: 'Awarded yearly to outstanding cadets in Naval Science 3 based on citizenship, academic performance, personal appearance and conduct.'
  },
  {
    id: '10-naval-science-2-outstanding-cadet',
    name: 'NS2 Outstanding Cadet',
    imagePath: 'images/ribbons/10-naval-science-2-outstanding-cadet.jpg',
    precedence: 10,
    description: 'Awarded yearly to outstanding cadets in Naval Science 2 based on citizenship, academic performance, personal appearance and conduct.'
  },
  {
    id: '11-naval-science-1-outstanding-cadet',
    name: 'NS1 Outstanding Cadet',
    imagePath: 'images/ribbons/11-naval-science-1-outstanding-cadet.jpg',
    precedence: 11,
    description: 'Awarded yearly to outstanding cadets in Naval Science 1 based on citizenship, academic performance, personal appearance and conduct.'
  },
  {
    id: '12-exemplary-conduct',
    name: 'Exemplary Conduct',
    imagePath: 'images/ribbons/12-exemplary-conduct.jpg',
    precedence: 12,
    description: 'Awarded early to each cadet who demonstrates exemplary conduct for the year.'
  },
  {
    id: '13-academic-award',
    name: 'Academic Award',
    imagePath: 'images/ribbons/13-academic-award.jpg',
    precedence: 13,
    description: 'Awarded twice yearly to all cadets that wear their uniform on all required occasions and have an average of 90% + on inspection and not received an inspection grade below an "A". (this award can be received 3 times in a year based on the results of the NJROTC Area Manager during annual inspection)'
  },
  {
    id: '14-exemplary-personal-appearance',
    name: 'Exemplary Personal Appearance',
    imagePath: 'images/ribbons/14-exemplary-personal-appearance.jpg',
    precedence: 14,
    description: 'Awarded twice a year to any cadet who meets or exceeds physical fitness standards to be given to you at a later time.'
  },
  {
    id: '15-physical-fitness',
    name: 'Physical Fitness',
    imagePath: 'images/ribbons/15-physical-fitness.jpg',
    precedence: 15,
    description: 'Awarded when earned to all cadets earning one hour or more participation in at least three separate, non-social NJROTC sponsored events or activities (to include ushering at school events, flag detail, attendance at drill, field/athletic meets, and attendance on field trips).'
  },
  {
    id: '16-participation',
    name: 'Participation',
    imagePath: 'images/ribbons/16-participation.jpg',
    precedence: 16,
    description: 'Unit Service and each subsequent award is earned when a cadet performs superior service to unit. The award may be for sustained service at a level above that normally required of other cadets or it may be for a specific act(s) of superior service.'
  },
  {
    id: '17-unit-service',
    name: 'Unit Service',
    imagePath: 'images/ribbons/17-unit-service.jpg',
    precedence: 17,
    description: 'Community Service ribbons and each subsequent NJROTC award are earned after 12 hrs of properly documented volunteer service.'
  },
  {
    id: '18-community-service',
    name: 'Community Service',
    imagePath: 'images/ribbons/18-community-service.jpg',
    precedence: 18,
    description: 'Awarded when earned, to each cadet in good standing who has been a member of the Academic Team.'
  },
  {
    id: '19-drill-team',
    name: 'Drill Team',
    imagePath: 'images/ribbons/19-drill-team.jpg',
    precedence: 19,
    description: 'The drill team ribbon may be awarded to all cadets that earn 3 drill team pts, which include parades, meets, and other performances.'
  },
  {
    id: '20-color-guard',
    name: 'Color Guard',
    imagePath: 'images/ribbons/20-color-guard.jpg',
    precedence: 20,
    description: 'Awarded when earned to any cadet in good standing who has performed as a member of the color guard for 3 events.'
  },
  {
    id: '21-rifle-team',
    name: 'Rifle Team',
    imagePath: 'images/ribbons/21-rifle-team.jpg',
    precedence: 21,
    description: 'Awarded when earned to any cadet in good standing who has entered competition including all air-operated weapons.'
  },
  {
    id: '22-orienteering',
    name: 'Orienteering',
    imagePath: 'images/ribbons/22-orienteering.jpg',
    precedence: 22,
    description: 'Awarded when earned to any cadet in good standing who has entered competition.'
  },
  {
    id: '23-recruiting',
    name: 'Recruiting',
    imagePath: 'images/ribbons/23-recruiting.jpg',
    precedence: 23,
    description: 'Inter-Service Competition - Awarded to a cadet who has entered any inter-service, national level competition, such as CyberPatriot, JLAB, etc.; or for any SeaPerch Competition, regardless of service sponsorship. This ribbon cannot be awarded in addition to, or in lieu of, another team-specific ribbon. For example: It cannot be awarded for competing in a local, Area or postal multi-service drill, academic, marksmanship or orienteering meet.'
  },
  {
    id: '24-basic-leadership-training',
    name: 'Basic Leadership Training',
    imagePath: 'images/ribbons/24-basic-leadership-training.jpg',
    precedence: 24,
    description: 'Awarded when earned to any cadet that is instrumental in the enrollment of two students or is part of a recruiting effort.'
  },
  {
    id: '25-sea-cruise',
    name: 'Sea Cruise',
    imagePath: 'images/ribbons/25-sea-cruise.jpg',
    precedence: 25,
    description: 'Awarded to any cadet upon completion of an at sea cruise (vessel must cast off lines and be underway).'
  },
];

export default ribbonsData;
