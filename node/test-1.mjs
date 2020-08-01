import dagdb from 'dagdb'

async function run () {
  const db = await dagdb.create('inmem')

  await db.set('hello', 'world')
  console.log(await db.get('hello'))
}
run()
