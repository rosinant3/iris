<?php

declare(strict_types=1);

namespace App\Data;

use Psr\Container\ContainerInterface;

class ImagesGetFactory
{
    public function __invoke(ContainerInterface $container) : ImagesGet
    {

        $em = $container->get('doctrine.entity_manager.orm_default');
        
        return new ImagesGet($em);

    }
}
