const {createProxyMiddleware} = require("http-proxy-middleware")

module.exports = app =>{
    app.use(
        createProxyMiddleware('/login/user/login',{
            target: 'https://cliente.biotronica.tech',
            changeOrigin: true,
        })
    )
}

//https://cliente.biotronica.tech/