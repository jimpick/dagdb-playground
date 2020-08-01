import dagdb from 'dagdb'

async function run () {
  let db = await dagdb.create('inmem')
  await db.set('hello', 'world2')
  db = await db.update()
  console.log(await db.get('hello'))

  const now = new Date()
  await db.set('big-value', {
    name: 'Mikeal Rogers',
    created: {
      year: now.getYear(),
      month: now.getMonth(),
      day: now.getDay()
    },
    hobbies: [ 'code', 'food', 'tea' ]
  })
  console.log('big-value', await db.get('big-value'))

  const link = await db.link({ name: 'Earth', size: 3958.8 })
  await db.set('mikeal', { name: 'Mikeal Rogers', planet: link })
  await db.set('chris', { name: 'Chris Hafey', planet: link })
  db = await db.update()

  const howBigIsYourPlanet = async key => {
    const person = await db.get(key)
    const planet = await person.planet()
    console.log(`${person.name} lives on a planet w/ a radius of ${planet.size}mi`)
  }
  await howBigIsYourPlanet('mikeal')
  // prints "Mikeal Rogers lives on a planet w/ a radius of 3958.8mi"
  await howBigIsYourPlanet('chris')
  // prints "Chris Hafey lives on a planet w/ a radius of 3958.8mi"

  const link1 = await db.link({ name: 'Earth', size: 3958.8 })
  const link2 = await db.link({ name: 'Earth', size: 3958.8 })
  console.log(link1.equals(link2))
  // prints true

  const samePlanet = async (key1, key2) => {
    const person1 = await db.get(key1)
    const person2 = await db.get(key2)
    if (person1.planet.equals(person2.planet)) {
      console.log(`${person1.name} is on the same planet as ${person2.name}`)
    } else {
      console.log(`${person1.name} is not on the same planet as ${person2.name}`)
    }
  }
  samePlanet('mikeal', 'chris')
  // prints "Mikeal Rogers is on the same planet as Chris Hafey"

  /*
  let db1 = await dagdb.create('inmem')
  let db2 = await dagdb.create('inmem')

  db1 = await db1.set('hello', 'world').update()
  db2 = await db2.set('db1', db1).update()

  console.log('Jim db1', db1, db1.root.toString())
  console.log('Jim db2', db2, db2.root.toString())
  const db3 = await db2.get('db1')
  console.log('Jim db3', db3, db3.root.toString())
  console.log('Jim get db1', await db1.get('hello'))
  console.log('Jim get db3', await db3.get('hello'))
  // prints "world"
  */

}
run()
