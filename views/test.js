<!doctype html>
<html>
    <head>
        <title>{{title}}</title>
        <link rel="stylesheet" type="text/css" href="css/style.css">
        <script type="text/javascript" src="./views/webapp.js"></script>

    </head>
    <body>
        <h1>{{title}}</h1>
        <h1>Example Data: {{EXAMPLEDATA}}</h1>
        <p> <a href="http://html5boilerplate.com/">HTML5 Boilerplate</a> but for a node express application. Get a server running with these simple commands:</p>
        <div class="code">
            <p>npm install -g nodeboilerplate</p>
            <p>mkdir mysite && cd mysite</p>
            <p>nodeboilerplate</p>
            <p>npm install</p>
            <p>node app.js</p>
        </div>
        <p>The beginning of the project was with NodeBoilerplate, with Natureal included in. On top of that I want to run My music content in the brower, not the Server!!!</p>
        <p>Because it is counter intuitive to us now - but CLIENTCENTRIC is the way to go.</p>
        {{> github.mustache}}
    </body>
</html>
