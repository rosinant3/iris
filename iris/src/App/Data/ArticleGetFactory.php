<?php

declare(strict_types=1);

namespace App\Data;

use Psr\Container\ContainerInterface;

class ArticleGetFactory
{
    public function __invoke(ContainerInterface $container) : ArticleGet
    {

        $em = $container->get('doctrine.entity_manager.orm_default');
        
        return new ArticleGet($em);

    }
}
