<?php

declare(strict_types=1);

namespace App\Data;

use Psr\Container\ContainerInterface;
use Zend\Expressive\Helper\UrlHelper;

class AllDataGetFactory
{
    public function __invoke(ContainerInterface $container) : AllDataGet
    {
        
        $em = $container->get('doctrine.entity_manager.orm_default');
        $url = $container->get(UrlHelper::class);

        return new AllDataGet($em, $url);

    }
}
