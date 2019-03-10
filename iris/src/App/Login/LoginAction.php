<?php

declare(strict_types=1);

namespace App\Login;

use App\Handler\MyAuthAdapter;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use Psr\Http\Server\MiddlewareInterface;
use Psr\Http\Server\RequestHandlerInterface;
use Zend\Expressive\Twig\TwigRenderer;
use Zend\Diactoros\Response\HtmlResponse;
use Zend\Diactoros\Response\JsonResponse;
use Zend\Expressive\Template\TemplateRendererInterface;
use Zend\Diactoros\Response\RedirectResponse;
use Zend\Authentication\AuthenticationService;

class LoginAction implements MiddlewareInterface
{
    /**
     * {@inheritDoc}
     */

    private $auth;
    private $authAdapter;
    private $template;


    public function __construct( TemplateRendererInterface $template,
    AuthenticationService $auth,
    MyAuthAdapter $authAdapter)
    {
        
        $this->template    = $template;
        $this->auth        = $auth;
        $this->authAdapter = $authAdapter;

    }
  
    public function process(ServerRequestInterface $request, 
    RequestHandlerInterface $handler) : ResponseInterface
    {

        if ($request->getMethod() === 'POST') {

            return $this->authenticate($request);

        }

        return new HtmlResponse($this->template->render('app::login'));
       
    }

    public function authenticate(ServerRequestInterface $request)
    {

        $params = $request->getParsedBody();

        if (empty($params['username']) || $params['username'] === "") {

            return new HtmlResponse($this->template->render('app::login', [

                'error' => 'The username cannot be empty',

            ]));
        }

        if (empty($params['password']) || $params['password'] === "") {

            return new HtmlResponse($this->template->render('app::login', [
                'username' => $params['username'],
                'error'    => 'The password cannot be empty',
            ]));

        }

        $this->authAdapter->setUsername($params['username']);
        $this->authAdapter->setPassword($params['password']);

        $result = $this->auth->authenticate();

        if (!$result->isValid()) {

            return new HtmlResponse($this->template->render('app::login', [

                'username' => $params['username'],
                'error'    => 'The credentials provided are not valid',

            ]));
        }

        return new RedirectResponse('/admin');
    }

}
