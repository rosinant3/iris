<?php
// In src/Auth/src/MyAuthAdapterFactory.php:

namespace App\Handler;

use Interop\Container\ContainerInterface;
use Zend\Authentication\AuthenticationService;

class MyAuthAdapterFactory
{
    public function __invoke(ContainerInterface $container)
    {
        
        $em = $container->get('doctrine.entity_manager.orm_default');
        // Retrieve any dependencies from the container when creating the instance
        return new MyAuthAdapter($em);
        
    }
}