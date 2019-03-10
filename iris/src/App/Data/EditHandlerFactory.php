<?php

declare(strict_types=1);

namespace App\Data;

use Psr\Container\ContainerInterface;

class EditHandlerFactory
{
    public function __invoke(ContainerInterface $container) : EditHandler
    {

        $em = $container->get('doctrine.entity_manager.orm_default');
        
        return new EditHandler($em);

    }
}
