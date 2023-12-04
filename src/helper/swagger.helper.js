const swaggerDefinition = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'Testing FGA Issue',
            version: '1.0.0',
            description: 'Your API description',
        },
        servers: [
            {
                url: process.env.BASE_URL,
            },
            {
                url: 'http://localhost:3000',
            },

        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'apiKey',
                    in: 'header',
                    name: "Authorization",
                    description: "Input your Token for Get Access",
                    bearerFormat: 'JWT'
                }
            }
        }
    },
    apis: [
        './src/routes/v2/auth.route.js',
        './src/routes/v2/admin.route.js',
        './src/routes/v2/user.route.js',
        './src/routes/v2/bank.account.route.js',
        './src/routes/v2/transaction.route.js',
    ],

}

module.exports = swaggerDefinition