<?php

declare(strict_types=1);

use Psr\Container\ContainerInterface;
use Zend\Expressive\Application;
use Zend\Expressive\MiddlewareFactory;
use Zend\Expressive\Helper\BodyParams\BodyParamsMiddleware;
use Zend\Expressive\Authentication\AuthenticationMiddleware;
/**
 * Setup routes with a single request method:
 *
 * $app->get('/', App\Handler\HomePageHandler::class, 'home');
 * $app->post('/album', App\Handler\AlbumCreateHandler::class, 'album.create');
 * $app->put('/album/:id', App\Handler\AlbumUpdateHandler::class, 'album.put');
 * $app->patch('/album/:id', App\Handler\AlbumUpdateHandler::class, 'album.patch');
 * $app->delete('/album/:id', App\Handler\AlbumDeleteHandler::class, 'album.delete');
 *
 * Or with multiple request methods:
 *
 * $app->route('/contact', App\Handler\ContactHandler::class, ['GET', 'POST', ...], 'contact');
 *
 * Or handling all request methods:
 *
 * $app->route('/contact', App\Handler\ContactHandler::class)->setName('contact');
 *
 * or:
 *
 * $app->route(
 *     '/contact',
 *     App\Handler\ContactHandler::class,
 *     Zend\Expressive\Router\Route::HTTP_METHOD_ANY,
 *     'contact'
 * );
 */
return function (Application $app, MiddlewareFactory $factory, ContainerInterface $container) : void {
   
    $app->get('/', App\Handler\HomePageHandler::class, 'home');
    $app->get('/notes[/{id}]',  App\Handler\HomePageHandler::class, 'dynamic');

    $app->route('/article', App\Data\ArticleGet::class, ['POST'], 'article');

    $app->route('/homep', App\Data\HomePageGet::class, ['GET'], 'homep');
    $app->route('/alldataget', App\Data\AllDataGet::class, ['GET'], 'alldataget');
    $app->route('/getimages', App\Data\ImagesGet::class, ['GET', 'POST'], 'getImg');
    $app->route('/edit', App\Data\EditHandler::class, ['POST'], 'edit');

    $app->route('/login', App\Login\LoginAction::class, ['GET', 'POST'], 'login');
    $app->route('/admin', 
            
    [Zend\Expressive\Helper\BodyParams\BodyParamsMiddleware::class, 
    App\Login\AuthAction::class,
    App\Handler\Admin::class], 
    
    ['GET', 'POST']);

/*
    $app->route('/register', 
            
    [Zend\Expressive\Helper\BodyParams\BodyParamsMiddleware::class, 
    App\RegAdmin\RegAdminAction::class], 
    
    ['POST']);

*/
    
    $app->get('/api/ping', App\Handler\PingHandler::class, 'api.ping');

};
