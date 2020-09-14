const express = require('express');
const fs = require('fs');
const sqlite = require('sql.js');

const filebuffer = fs.readFileSync('db/library.sqlite3');

const db = new sqlite.Database(filebuffer);
var bodyParser = require('body-parser')
 
var app = express()
 
// create application/json parser
var jsonParser = bodyParser.json()


app.set('port', (process.env.PORT || 3001));

// Express only serves static assets in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
}

const COLUMNS =  [ 'name', 'author_last', 'author_first', 'id' ];

function format_data(data){
  return data.values.map((entry) => {
    const e = {};
    COLUMNS.forEach((c, idx) => {
      // combine fat columns
      if (c.match(/^fa_/)) {
        e.fat_g = e.fat_g || 0.0;
        e.fat_g = (
          parseFloat(e.fat_g, 10) + parseFloat(entry[idx], 10)
        ).toFixed(2);
      } else {
        e[c] = entry[idx];
      }
    });
    return e;
  })
}

app.get('/api/books', (req, res) => {
  const query = req.query.query;
  const column = req.query.column;
  const sql_command = `select ${COLUMNS.join(', ')} from books where ${column} like '%${query}%' limit 100`
  //const sql_command = `select * from books where ${column} like '%${query}%' limit 100`
  if (!column | !query) {
    res.json({
      error: 'Missing required parameters `query` or `column`',
    });
    return;
  }

  // WARNING: Not for production use! The following statement
  // is not protected against SQL injections.
  const r = db.exec(sql_command);

  if (r[0]) {
    res.json(
      format_data(r[0])
    );
  } else {
    res.json([]);
  }
});

app.post('/api/books',jsonParser, (req, res) => {
  const body = req.body
  const name = body.name;
  const last = body.author_last
  const first = body.author_first
  const id = body.id
  if (!name | !last | !first | !id) {
    res.json({
      error: 'Incomplete Form',
    });
    return;
  }

  const sql_command = `INSERT INTO "main"."books"("name","author_last","author_first","id") VALUES ("${name}","${last}","${first}",${id})`
  
  const r = db.run(sql_command);
  console.log(sql_command)
  res.json({
    success: 'book created',
  })
});

app.put('/api/book/:id',jsonParser, (req, res) => {
  const id = req.params.id;
  var sql_command = `select ${COLUMNS.join(', ')} from books where id like '%${id}%' limit 1`
  //const sql_command = `select * from books where ${column} like '%${query}%' limit 100`
  if (!id) {
    res.json({
      error: 'Missing required parameter `id`',
    });
    return;
  }

  // WARNING: Not for production use! The following statement
  // is not protected against SQL injections.
  const r = db.exec(sql_command);

  if (!r[0]) {
    res.json({
      error: 'book not found',
    })
  }

  const body = req.body
  const name = body.name;
  const last = body.author_last
  const first = body.author_first
  if (!name | !last | !first | !id) {
    res.json({
      error: 'Incomplete Form',
    });
    return;
  }

  var sql_command = `UPDATE "main"."books" SET "name"="${name}" , "author_last" = "${last}" , "author_first" = "${first}" , "id" = ${id} WHERE "id"='${id}'`
  
  const s = db.run(sql_command);
  console.log(sql_command)
  res.json({
    success: 'book updated',
  })
});

app.listen(app.get('port'), () => {
  console.log(`Find the server at: http://localhost:${app.get('port')}/`); // eslint-disable-line no-console
});

//INSERT INTO "main"."books"("name","author_last","author_first","id") VALUES (NULL,NULL,NULL,NULL);
//UPDATE "main"."books" SET "name"=? WHERE "_rowid_"='197';