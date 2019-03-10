<?php

declare(strict_types=1);

namespace App\Login;

use App\Handler\MyAuthAdapter;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use Psr\Http\Server\MiddlewareInterface;
use Psr\Http\Server\RequestHandlerInterface;
use Zend\Diactoros\Response\RedirectResponse;
use Zend\Authentication\AuthenticationService;

class AuthAction implements MiddlewareInterface
{
    /**
     * {@inheritDoc}
     */

    private $auth;

    public function __construct(AuthenticationService $auth)
    {
       
        $this->auth = $auth;
     
    }
 
    public function process(ServerRequestInterface $request, 
    RequestHandlerInterface $handler) : ResponseInterface
    {

        if (! $this->auth->hasIdentity()) {

            return new RedirectResponse('/login');
            
        }

        $identity = $this->auth->getIdentity();
        return $handler->handle($request->withAttribute(self::class, $identity));
       
    }

}

