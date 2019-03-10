<?php

declare(strict_types=1);

namespace App\RegAdmin;

use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use Psr\Http\Server\MiddlewareInterface;
use Psr\Http\Server\RequestHandlerInterface;
use Zend\Diactoros\Response\JsonResponse;
use Doctrine\ORM\EntityManager;
use App\Entity\Users;
use Doctrine\DBAL\Exception\UniqueConstraintViolationException;


class RegAdminAction implements MiddlewareInterface
{
    /**
     * {@inheritDoc}
     */

    private $entityManager;


    public function __construct(EntityManager $entityManager)
    {

        $this->entityManager = $entityManager;

     
    }
 
    public function process(ServerRequestInterface $request, 
    RequestHandlerInterface $handler) : ResponseInterface
    {

        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
     
            $Users = new Users();
            $username = 'Admin';
            $password = '1234password';
            $spassword = password_hash($password, PASSWORD_DEFAULT);
            $role = 'ADMIN';

            $Users->setUsername($username);
            $Users->setPassword($spassword);
            $Users->setRole($role);
         
            $Username2 = $Users->getUsername();
            $Password2 = $Users->getPassword();
            $Role2 = $Users->getRole();
 
            $this->entityManager->persist($Users, $Username2);
            $this->entityManager->persist($Users, $Password2);
            $this->entityManager->persist($Users, $Role2);
            $this->entityManager->flush();
            
            return new JsonResponse(json_encode(['formval' => 'User Created.']));
        
        }

}

}
