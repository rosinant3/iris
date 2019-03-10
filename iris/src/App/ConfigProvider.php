<?php

declare(strict_types=1);

namespace App;

use Zend\Authentication\AuthenticationService;

/**
 * The configuration provider for the App module
 *
 * @see https://docs.zendframework.com/zend-component-installer/
 */
class ConfigProvider
{
    /**
     * Returns the configuration array
     *
     * To add a bit of a structure, each section is defined in a separate
     * method which returns an array with its configuration.
     *
     */
    public function __invoke() : array
    {
        return [
            'dependencies' => $this->getDependencies(),
            'templates'    => $this->getTemplates(),
        ];
    }

    /**
     * Returns the container dependencies
     */
    public function getDependencies() : array
    {
        return [
            'invokables' => [
                Handler\PingHandler::class => Handler\PingHandler::class,
            ],
            'factories'  => [
                Handler\HomePageHandler::class => Handler\HomePageHandlerFactory::class,
                Handler\Admin::class => Handler\AdminFactory::class,
                RegAdmin\RegAdminAction::class => RegAdmin\RegAdminFactory::class,
                AuthenticationService::class => Handler\AuthenticationServiceFactory::class,
                Handler\MyAuthAdapter::class => Handler\MyAuthAdapterFactory::class,

                Login\LoginAction::class => Login\LoginActionFactory::class,
                Action\AuthAction::class => Action\AuthActionFactory::class,

                Data\ArticleGet::class => Data\ArticleGetFactory::class,
                Data\HomePageGet::class => Data\HomePageGetFactory::class,
                Data\AllDataGet::class => Data\AllDataGetFactory::class,
                Data\ImagesGet::class => Data\ImagesGetFactory::class,
                Data\EditHandler::class => Data\EditHandlerFactory::class,
            ],
        ];
    }

    /**
     * Returns the templates configuration
     */
    public function getTemplates() : array
    {
        return [
            'paths' => [
                'app'    => ['templates/app'],
                'error'  => ['templates/error'],
                'layout' => ['templates/layout'],
            ],
        ];
    }


}
