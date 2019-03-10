<?php

declare(strict_types=1);

namespace App\RegAdmin;

use Psr\Container\ContainerInterface;
use Zend\Expressive\Router\RouterInterface;

class RegAdminFactory
{

 
    public function __invoke(ContainerInterface $container) : RegAdminAction
    {

        $em = $container->get('doctrine.entity_manager.orm_default');

        return new RegAdminAction($em);

    }

   

}
