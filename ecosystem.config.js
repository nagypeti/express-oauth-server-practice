module.exports = {
    apps: [
        {
            name: 'backend-template',
            script: './build/index.js',
            env: {
                NODE_ENV: 'production',
            },
        },
    ],
};
