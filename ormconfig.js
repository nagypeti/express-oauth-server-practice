const env = process.env.NODE_ENV || 'development';

const config = {
    developement: {
        type: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'postgres',
        password: 'postgres',
        database: 'default',
        entities: ['app/entities/*.ts'],
        migrations: ['db/migrations/*.js'],
        cli: {
            migrationsDir: 'db/migrations'
        },
        logging: false,
        synchronize: true,
    },
    production: {
        type: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'postgres',
        password: 'postgres',
        database: 'default',
        entities: ['build/entities/*.js'],
        migrations: ['db/migrations/*.js'],
        cli: {
            migrationsDir: 'db/migrations'
        },
        logging: false,
        synchronize: true,
    },
};

module.exports = config[env] || config['developement'];
