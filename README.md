## Introduction

A simple Node.js command-line application to manage employee records with:
- Add, list, and search employees
- Store data in SQLite
- Display salaries in USD and local currencies using live exchange rates
- Input validation for reliable data entry
- Fully formatted CLI with Prettier + ESLint checks

## Features

- Add new employees with name, email, start date, salary, and currency
- Search employees by ID or name
- List all employees with salary in USD and local currency
- Active/inactive employee status
- Automatic currency conversion using API data

## Installation & Usage

Clone the repository:
```bash
git clone https://github.com/armsah/employee-cli-manager.git
cd employee-cli-manager

Add your currency API key in currency.js:
headers.append('apikey', 'YOUR_API_KEY_HERE');

Run the API with following commands:
```bash
>> node index.js list
>> node index.js add
>> node index.js search-by-id
>> node index.js search-by-name


