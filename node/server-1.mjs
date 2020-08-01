import http from 'http'
import dagdb from 'dagdb'
import createHandler from 'dagdb/server.js'

async function run () {
  const db = await dagdb.create('inmem')
  await db.set('hello', 'world5 via http').update()
  const { Block, store, updater } = db
  const handler = createHandler(Block, store, updater)
  // const handler = createHandler(db)


  const server = http.createServer(handler)
  server.listen(9505)
}
run()
