<?php

declare(strict_types=1);

namespace App\Login;

use Interop\Container\ContainerInterface;
use Zend\Authentication\AuthenticationService;
use Exception;


class AuthActionFactory
{

    public function __invoke(ContainerInterface $container) : AuthAction
    {

        return new AuthAction($container->get(AuthenticationService::class));

    }
    
}
