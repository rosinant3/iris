<?php

declare(strict_types=1);

namespace App\Login;

use App\Handler\MyAuthAdapter;
use Psr\Container\ContainerInterface;
use Zend\Expressive\Helper\UrlHelper;
use Zend\Expressive\Router\RouterInterface;
use Zend\Authentication\AuthenticationService;
use Zend\Expressive\Template\TemplateRendererInterface;

class LoginActionFactory
{

    public function __invoke(ContainerInterface $container) : LoginAction
    {

        return new LoginAction(

            $container->get(TemplateRendererInterface::class),
            $container->get(AuthenticationService::class),
            $container->get(MyAuthAdapter::class)

        );
    }

}
