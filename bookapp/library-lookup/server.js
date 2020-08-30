const express = require('express');
const fs = require('fs');
const sqlite = require('sql.js');

const filebuffer = fs.readFileSync('db/library.sqlite3');

const db = new sqlite.Database(filebuffer);

const app = express();

app.set('port', (process.env.PORT || 3001));

// Express only serves static assets in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
}

const COLUMNS =  [ 'name', 'author_last', 'author_first', 'id' ];

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
console.log(sql_command)
console.log(r)
  if (r[0]) {
    res.json(
      r[0].values.map((entry) => {
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
    );
  } else {
    res.json([]);
  }
});

app.listen(app.get('port'), () => {
  console.log(`Find the server at: http://localhost:${app.get('port')}/`); // eslint-disable-line no-console
});
