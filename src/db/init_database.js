/* eslint-disable import/prefer-default-export */
import sequelize from './sequelize';

// When syncing tables, this corresponds to the 'force' option.
// force: true will drop the table if it already exists
const overwriteExistingTables = true;
export async function defineTables() {
  // Make all calls to initialize tables here!
  await sequelize.Credentials.sync({ force: overwriteExistingTables });
}


/**
 * ---------------------------- MAIN ----------------------------
 * The main function only gets run if this file is run as a script
 */
async function main() {
  try {
    // First, we need to initialize the data model
    await sequelize.initSequelize();

    // Then, define the tables and set initial values
    await defineTables();
  } catch (err) {
    console.error('Database did not initialize correctly:', err);
    process.exit(1);
  }

  console.log('Database was successfully initialized!');
  process.exit(0);
}


// ---------------- If this is running as a script, call main ----------------
if (!module.parent) {
  main();
}
