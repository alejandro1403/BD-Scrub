const { Pool } = require('pg');
const Router = require('express-promise-router');

const pool = new Pool({
  user: 'ntclgsjm',
  host: 'lallah.db.elephantsql.com',
  database: 'ntclgsjm',
  password: 'jbkOeEj_oUqZHxNumqU6ELkHuOr0maDy',
  port: 5432,
});

const router = new Router();
// export our router to be mounted by the parent application
module.exports = router;

router.get('/consultatotalpacientes', async (req, res) => {
  const { id } = req.body
  const { rows } = await pool.query('SELECT * FROM pacientes');
  res.send(rows);
});

router.post('/actualizarpaciente', async (req, res) => {
  const { id, nombre, numid } = req.body;
  await pool.query(
    `UPDATE pacientes
     SET nombre = '${nombre}', numid= '${numid}'
     WHERE id = '${id}'`
  );
  res.send('ACTUALIZADO OK !!!');
});

router.delete('/borrarpaciente', async (req, res) => {
  const { id } = req.body
  const { rows } = await pool.query(`DELETE FROM pacientes WHERE id='${id}'`);
  res.send('BORRADO OK !!!');
});

router.put('/insertarpacientes', async (req, res) => {
  const { id, nombre, numid } = req.body;
  await pool.query(
    `INSERT INTO pacientes(id, nombre, numid) VALUES('${id}','${nombre}','${numid}')`
  );
  res.send('GUARDADO OK !!!');
});