import dagdb from 'dagdb'

async function run () {
  try {
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
  } catch (e) {
    console.error('Catch', e)
  }
}
run()
