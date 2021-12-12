// Update with your config settings.

module.exports = {

  development: {
    client: 'mysql',
    connection: {
      database: 'wa_services',
      user:     'root',
      password: ''
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'mysql',
    connection: {
      database: 'wa_services',
      user:     'autoresp_wa',
      password: 'tahubladak'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};
