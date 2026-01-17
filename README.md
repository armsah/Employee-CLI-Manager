# Employee CLI Manager

A simple **Node.js command-line application** to manage employee records.

---

## Introduction

This application allows you to:

- Add, list, and search employees
- Store data in **SQLite**
- Display salaries in **USD** and local currencies using live exchange rates
- Validate input for reliable data entry
- Work with a fully formatted CLI using **Prettier + ESLint**

---

## Features

- Add new employees with name, email, start date, salary, and currency
- Search employees by **ID** or **name**
- List all employees with salary in USD and local currency
- Track active/inactive employee status
- Automatic currency conversion using an external API

---

## Installation

Clone the repository:

```bash
git clone https://github.com/armsah/employee-cli-manager.git
cd employee-cli-manager

Install dependencies:

npm install


Add your currency API key in currency.js:

headers.append('apikey', 'YOUR_API_KEY_HERE');

Usage

Run the CLI with the following commands:

# List all employees
node index.js list

# Add a new employee
node index.js add

# Search for an employee by ID
node index.js search-by-id

# Search for employees by name
node index.js search-by-name

