<?php
use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

require __DIR__ . '/../vendor/autoload.php';
spl_autoload_register(function ($classname) {
    require __DIR__ . '/../classes/' . $classname . '.php';
});

// Instantiate the app
//PROD more restricted
//$settings = require __DIR__ . '/../site/settings_prod.php';
$settings = require __DIR__ . '/../site/settings_dev.php';
$app = new \Slim\App($settings);

// Set up dependencies
//PROD more restricted
//require __DIR__ . '/../source/dependencies_prod.php';
require __DIR__ . '/../source/dependencies_dev.php';

// Register middleware
//PROD more restricted
//require __DIR__ . '/../source/middleware_prod.php';
//require __DIR__ . '/../source/middleware_dev.php';

// Register routes
//PROD more restricted
//require __DIR__ . '/../source/routes_prod.php';
require __DIR__ . '/../source/routes_dev.php';

// Run app
$app->run();