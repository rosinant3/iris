<?php

declare(strict_types=1);

namespace App\Handler;

use Psr\Container\ContainerInterface;
use Zend\Expressive\Router\RouterInterface;

class AdminFactory
{

 
    public function __invoke(ContainerInterface $container) : Admin
    {

        $em = $container->get('doctrine.entity_manager.orm_default');

        return new Admin($em);
        
    }

   

}
