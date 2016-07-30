const conf = require('./conf');
module.exports = (verification, email) =>
    `<html>
        <head>
            <style type="text/css">
                a {
                    font-size: 2em
                }
                .clicker {
                    width: 200px;
                }
            </style>
        </head>
        <body>
            <h1>Welcome to Uni Salad!</h1>
            <p>Before you can start you need to verify your email address</p>
             <div class="clicker">
                <a href=${conf.apiEndpoint}/verify?email=${email}&verification=${verification}>Verify Email</a>
             </div>
        </body>
    </html>
    `