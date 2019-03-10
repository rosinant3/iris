<?php

// In src/Auth/src/MyAuthAdapter.php:

namespace App\Handler;

use Zend\Authentication\Adapter\AdapterInterface;
use Zend\Authentication\Result;
use Doctrine\ORM\EntityManager;
use App\Entity\Users;
use Zend\Diactoros\Response\JsonResponse;

class MyAuthAdapter implements AdapterInterface
{
    private $password;
    private $username;
    private $entityManager;

    public function __construct(EntityManager $entityManager)
    {

        $this->entityManager = $entityManager;

    }

    public function setPassword(string $password) : void
    {
        $this->password = $password;
    }

    public function setUsername(string $username) : void
    {
        $this->username = $username;
    }

    /**
     * Performs an authentication attempt
     *
     * @return Result
     */
    public function authenticate()
    {
    
    // Retrieve the user's information (e.g. from a database)
    // and store the result in $row (e.g. associative array).
    // If you do something like this, always store the passwords using the
    // PHP password_hash() function!

        $qb = $this->entityManager->createQueryBuilder();
      
        $qb->select('u')
        ->from('App\Entity\Users', 'u')
        ->where('u.username = :name')
        ->setParameter('name', $this->username);

        $query = $qb->getQuery();
        $row = $query->getResult();

        foreach ($row as $value) {
           
            $username = $value->getUsername();

            if ($username === $this->username) {
    
                if (password_verify($this->password, $value->getPassword())) {
    
                    return new Result(Result::SUCCESS, $value);
    
                }
    
                else {
    
                    return new Result(Result::FAILURE_CREDENTIAL_INVALID, $this->username);
    
                }
            }
        }
   
        return new Result(Result::FAILURE_CREDENTIAL_INVALID, $this->username);

    }
}