<?php
// in src/Auth/src/AuthenticationServiceFactory.php:

namespace App\Handler;

use Interop\Container\ContainerInterface;
use Zend\Authentication\AuthenticationService;

class AuthenticationServiceFactory
{
    public function __invoke(ContainerInterface $container)
    {

        return new AuthenticationService(

            null,
            $container->get(MyAuthAdapter::class)
            
        );
    }
}