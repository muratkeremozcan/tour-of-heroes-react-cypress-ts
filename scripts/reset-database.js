const path = require('path')
const write = require('fs').writeFileSync

const filename = path.join(__dirname, '..', 'db.json')

const resetDatabase = () => {
  // overwrite the data file
  const db = {
    heroes: [
      {
        id: 'HeroAslaug',
        name: 'Aslaug',
        description: 'warrior queen',
      },
      {
        id: 'HeroBjorn',
        name: 'Bjorn Ironside',
        description: 'king of 9th century Sweden',
      },
      {
        id: 'HeroIvar',
        name: 'Ivar the Boneless',
        description: 'commander of the Great Heathen Army',
      },
      {
        id: 'HeroLagertha',
        name: 'Lagertha the Shieldmaiden',
        description: 'aka Hlaðgerðr',
      },
      {
        id: 'HeroRagnar',
        name: 'Ragnar Lothbrok',
        description: 'aka Ragnar Sigurdsson',
      },
      {
        id: 'HeroThora',
        name: 'Thora Town-hart',
        description: 'daughter of Earl Herrauðr of Götaland',
      },
    ],
    villains: [
      {
        id: 'VillainMadelyn',
        name: 'Madelyn',
        description: 'the cat whisperer',
      },
      {
        id: 'VillainHaley',
        name: 'Haley',
        description: 'pen wielder',
      },
      {
        id: 'VillainElla',
        name: 'Ella',
        description: 'fashionista',
      },
      {
        id: 'VillainLandon',
        name: 'Landon',
        description: 'Mandalorian mauler',
      },
    ],
  }
  const str = JSON.stringify(db, null, 2) + '\n'
  write(filename, str)
}

resetDatabase()
