const colorCodes = [
  {
    name: 'TURQUOISE',
    code: '#1abc9c',
    img:
      'http://blog.visme.co/wp-content/uploads/2017/07/50-Beautiful-and-Minimalist-Presentation-Backgrounds-07.jpg',
  },
  {
    name: 'NEPHRITIS',
    code: '#27ae60',
    img:
      'http://blog.visme.co/wp-content/uploads/2017/07/50-Beautiful-and-Minimalist-Presentation-Backgrounds-09.jpg',
  },
  {
    name: 'EMERALD',
    code: '#2ecc71',
    img:
      'http://blog.visme.co/wp-content/uploads/2017/07/50-Beautiful-and-Minimalist-Presentation-Backgrounds-019.jpg',
  },
  {
    name: 'WISTERIA',
    code: '#8e44ad',
    img:
      'http://blog.visme.co/wp-content/uploads/2017/07/50-Beautiful-and-Minimalist-Presentation-Backgrounds-011.jpg',
  },
  {
    name: 'GREEN SEA',
    code: '#16a085',
    img:
      'http://blog.visme.co/wp-content/uploads/2017/07/50-Beautiful-and-Minimalist-Presentation-Backgrounds-03.jpg',
  },
  {
    name: 'PETER RIVER',
    code: '#3498db',
    img:
      'http://blog.visme.co/wp-content/uploads/2017/07/50-Beautiful-and-Minimalist-Presentation-Backgrounds-052.jpg',
  },
  {
    name: 'AMETHYST',
    code: '#9b59b6',
    img:
      'https://images.pexels.com/photos/131634/pexels-photo-131634.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
  },
  {
    name: 'BELIZE HOLE',
    code: '#2980b9',
    img: 'https://cdn.pixabay.com/photo/2017/07/07/18/55/background-2482325_960_720.jpg',
  },
  { name: 'CARROT', code: '#e67e22' },
  { name: 'WET ASPHALT', code: '#34495e' },
  { name: 'MIDNIGHT BLUE', code: '#2c3e50' },
  { name: 'SUN FLOWER', code: '#f1c40f' },
  { name: 'ALIZARIN', code: '#e74c3c' },
  { name: 'CLOUDS', code: '#ecf0f1' },
  { name: 'CONCRETE', code: '#95a5a6' },
  { name: 'ORANGE', code: '#f39c12' },
  { name: 'PUMPKIN', code: '#d35400' },
  { name: 'POMEGRANATE', code: '#c0392b' },
  { name: 'SILVER', code: '#bdc3c7' },
  { name: 'ASBESTOS', code: '#7f8c8d' },
]

export const getNextColor = index => colorCodes[index % 8].code
export const getNextBG = index => colorCodes[index % 8].img
