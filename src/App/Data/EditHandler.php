<?php

declare(strict_types=1);

namespace App\Data;

use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use Psr\Http\Server\MiddlewareInterface;
use Psr\Http\Server\RequestHandlerInterface;
use Zend\Diactoros\Response\JsonResponse;
use App\Entity\Articles;
use Doctrine\ORM\EntityManager;
use App\Form\TypeWriter;

class EditHandler implements MiddlewareInterface
{
    /**
     * {@inheritDoc}
     */

     private $entityManager;

    public function __construct(EntityManager $entityManager)
    {

        $this->entityManager = $entityManager;

    }
 
 
    public function process(ServerRequestInterface $request, RequestHandlerInterface $handler) : ResponseInterface
    {

        if ($_SERVER['REQUEST_METHOD'] === 'POST') {

            $body = $request->getParsedBody();

            if (isset($body['del_ind'])) {

                $identifier = trim($body['del_ind']);

                $qb = $this->entityManager->createQueryBuilder();

                $qb->delete('App\Entity\Articles', 'u')
                ->where(
                        
                    'u.url = :identifier'
                            
                )
                ->setParameter('identifier', $identifier);

                $query = $qb->getQuery();
                $query->execute();

                return new JsonResponse(json_encode([

                    'deleted' => 'deleted'
    
                ]));    

            }

            else if (isset($body['updated_body']) && isset($body['url'])) {

                    $updated_body = trim($body['updated_body']);
                    $url_identifier = trim($body['url']);

                    $qb = $this->entityManager->createQueryBuilder();

                    $qb->update('App\Entity\Articles', 'u')
                    ->set('u.article_body', ':updated_body')
                    ->where( 'u.url = :identifier')
                    ->setParameter('identifier', $url_identifier)
                    ->setParameter('updated_body', $updated_body)
                    ->getQuery()
                    ->execute();

                    return new JsonResponse(json_encode([

                        'updated' => 'updated'
    
                    ]));    

            }

            else {

                return new JsonResponse(json_encode([

                    'errpr' => 'error'

                ]));    

            }

        }

    }

}
