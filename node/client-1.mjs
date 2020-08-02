import dagdb from 'dagdb'

async function run () {
  try {
    const db6 = await dagdb.open('https://dagdb.localhost:9503/api/0/')
    // const db6 = await dagdb.open('http://localhost:9505/')
    console.log('Read from remote', await db6.get('hello'))

  } catch (e) {
    console.error('Catch', e)
  }
}
run()
