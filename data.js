import fs from 'node:fs/promises';
import path from 'node:path';

const DATA_FILE = path.resolve('./data.json');

// Load employees from JSON file
export const loadData = async () => {
  console.log('Loading employees from JSON...');
  try {
    const fileData = await fs.readFile(DATA_FILE, 'utf-8');
    const employees = JSON.parse(fileData);

    // Convert startDate strings back to Date objects
    return employees.map(e => ({
      ...e,
      startDate: new Date(e.startDate),
      isActive: Boolean(e.isActive)
    }));
  } catch (err) {
    if (err.code === 'ENOENT') {
      console.warn('No data.json file found. Returning empty array.');
      return [];
    }
    console.error('Cannot load employees from JSON:', err);
    throw err;
  }
};

// Write employees to JSON file
export const writeData = async (employees) => {
  console.log('Writing employees to JSON...');
  try {
    // Convert startDate to ISO strings for consistency
    const dataToWrite = employees.map(e => ({
      ...e,
      startDate: e.startDate.toISOString()
    }));
    await fs.writeFile(DATA_FILE, JSON.stringify(dataToWrite, null, 2), 'utf-8');
  } catch (err) {
    console.error('Cannot write employees to JSON:', err);
    throw err;
  }
};
