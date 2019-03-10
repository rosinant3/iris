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
use Zend\Expressive\Helper\UrlHelper;

class HomePageGet implements MiddlewareInterface 
{
    /**
     * {@inheritDoc}
     */

    private $entityManager;
    private $helper;
    private $url;

    private $ptitle; 
    private $pdescription;
    private $ppreview;
    private $prealUrl;

    private $projects;

    private $notes;

    private $ntitle;
    private $ndescription;
    private $npreview;
    private $nrealUrl;
    private $ndate;

    public function __construct(EntityManager $entityManager, UrlHelper $helper)
    {

        $this->entityManager = $entityManager;
        $this->helper = $helper;

    }
 
 
    public function process(ServerRequestInterface $request, RequestHandlerInterface $handler) : ResponseInterface
    {

        if ($_SERVER['REQUEST_METHOD'] === 'GET') {

        // GETTING LAST 5 PROJECT ENTRIES

            $body = $request->getParsedBody();
            $qb = $this->entityManager->createQueryBuilder();
     
            $qb->select('u')
            ->from('App\Entity\Articles', 'u')
            ->where('u.category = :projects')
            ->setParameter('projects', "projects")
            ->add('orderBy', 'u.id DESC')
            ->setMaxResults( 5 );

            $query = $qb->getQuery();
            $row = $query->getResult();

            $this->projects = array();

            foreach ($row as $value) {
           
                $this->ptitle = $value->getTitle();
                $this->pdescription = $value->getDescription();
                $this->ppreview = $value->getPreview();
                $this->prealUrl = $value->getUrl();

                $realURL = $this->helper->generate('dynamic', ['id' => $this->prealUrl]);

                $data = array(

                    'title' => $this->ptitle,
                    'description' => $this->pdescription,
                    'preview' => $this->ppreview,
                    'url' => $realURL,

                );

                array_push($this->projects, $data);

            }

        // GETTING LAST TWO NOTES ENTRIES
    
            $qb2 = $this->entityManager->createQueryBuilder();
     
            $qb2->select('u')
            ->from('App\Entity\Articles', 'u')
            ->where('u.category = :notes')
            ->setParameter('notes', "notes")
            ->add('orderBy', 'u.id DESC')
            ->setMaxResults( 2 );

            $query2 = $qb2->getQuery();
            $row2 = $query2->getResult();

            $this->notes = array();

            foreach ($row2 as $value) {
           
                $this->ntitle = $value->getTitle();
                $this->ndescription = $value->getDescription();
                $this->npreview = $value->getPreview();
                $this->nrealUrl = $value->getUrl();
                $this->ndate = $value->getDate();

                $realURL = $this->helper->generate('dynamic', ['id' => $this->nrealUrl]);

                $data = array(

                    'title' => $this->ntitle,
                    'description' => $this->ndescription,
                    'preview' => $this->npreview,
                    'url' => $realURL,
                    'date' => $this->ndate
                );

                array_push($this->notes, $data);

            }

            return new JsonResponse(json_encode([

                'projects' => $this->projects,
                'notes' => $this->notes
            
            ]));

        }

    }

}
