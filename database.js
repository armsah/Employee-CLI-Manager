import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

let _db;

// Create the table if it doesn't exist
const createTable = async (db) => {
  const query = `CREATE TABLE IF NOT EXISTS employees (
    id INTEGER PRIMARY KEY,
    email TEXT NOT NULL,
    firstName TEXT NOT NULL,
    lastName TEXT NOT NULL,
    salaryUSD INTEGER,
    localCurrency TEXT NOT NULL,
    startDate TEXT NOT NULL,
    isActive INTEGER
  )`;
  await db.run(query);
};

// Get a single database connection (singleton)
export const getConnection = async () => {
  if (!_db) {
    _db = await open({ filename: 'data.sqlite3', driver: sqlite3.Database });
    await createTable(_db);
  }
  return _db;
};

// Close connection on process exit
export const closeConnection = async () => {
  if (_db) {
    await _db.close();
    _db = undefined;
  }
};

process.on('exit', async () => {
  if (_db) await closeConnection();
});

// Fetch all employees from the DB
export const getAllEmployees = async () => {
  const db = await getConnection();
  const rows = await db.all('SELECT * FROM employees');

  // Convert DB rows to proper objects
  const employees = rows.map((r) => ({
    ...r,
    isActive: Boolean(r.isActive),
    startDate: new Date(r.startDate),
  }));

  return employees;
};

// Insert a new employee
export const insertEmployee = async (employee) => {
  const db = await getConnection();
  const insertQuery = `INSERT INTO employees (
    id,
    email,
    firstName,
    lastName,
    salaryUSD,
    localCurrency,
    startDate,
    isActive
  ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;

  const values = [
    employee.id,
    employee.email,
    employee.firstName,
    employee.lastName,
    employee.salaryUSD,
    employee.localCurrency.toUpperCase(),
    employee.startDate.toISOString(),
    Number(employee.isActive),
  ];

  await db.run(insertQuery, values);
};
