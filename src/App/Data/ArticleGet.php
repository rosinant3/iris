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

class ArticleGet implements MiddlewareInterface
{
    /**
     * {@inheritDoc}
     */

    private $entityManager;
    private $url;

    private $title; 
    private $description;
    private $date;
    private $category;
    private $articleBody;
    private $author;
    private $preview;


    private $multipleArticles;
    private $id;
    private $isempty;

    public function __construct(EntityManager $entityManager)
    {

        $this->entityManager = $entityManager;

    }
 
 
    public function process(ServerRequestInterface $request, RequestHandlerInterface $handler) : ResponseInterface
    {

        if ($_SERVER['REQUEST_METHOD'] === 'POST') {

            $body = $request->getParsedBody();
            $typeWriterObject = new TypeWriter;

            if (isset($body['searchname'])) { 

                $searchName = trim($body['searchname']);
                $article = array(  'title' => $searchName );

                $formVal = $typeWriterObject->validateForm($article);

                if (empty($formVal)) {

                $this->title = "%" . $searchName . "%";

                $this->multipleArticles = Array();

                $qb = $this->entityManager->createQueryBuilder();

                $qb->select('u')
                ->from('App\Entity\Articles', 'u')
                ->where('u.title LIKE :title')
                ->add('orderBy', 'u.id DESC')
                ->setParameter('title', $this->title);
    
                $query = $qb->getQuery();
                $row = $query->getResult();

                foreach ($row as $value) {

                    $this->title = $value->getTitle();
                    $this->description = $value->getDescription();
                    $this->date = $value->getDate();
                    $this->category = $value->getCategory();
                    $this->articleBody = $value->getArticleBody();
                    $this->author = $value->getAuthor();
                    $this->preview = $value->getPreview();
                    $this->url = $value->getUrl();
                    $this->id = $value->getId();

                    $data = [ 
                    
                        'title' => $this->title,
                        'description' => $this->description,
                        'date' => $this->date,
                        'category' => $this->category,
                        'articleBody' => $this->articleBody,
                        'author' => $this->author,
                        'preview' => $this->preview,
                        'url' => $this->url,
                        'id' => $this->id

        
                    ];
    
                    array_push($this->multipleArticles, $data);
    
                }

                if (empty($this->multipleArticles)) {

                    $this->isempty = true;

                }

                return new JsonResponse(json_encode([

                    'searchResult' => $this->multipleArticles,
                    'isempty' => $this->isempty
    
                ]));
        
                }


                else {

                    return new JsonResponse(json_encode([

                        'err' => "Invalid input"
    
                    ]));

                }
                


            }

            else {

            $qb = $this->entityManager->createQueryBuilder();

            $url2 = trim($body['url']);
            $this->url = $url2;

            $qb->select('u')
            ->from('App\Entity\Articles', 'u')
            ->where('u.url = :url')
            ->setParameter('url', $this->url);

            $query = $qb->getQuery();
            $row = $query->getResult();


            foreach ($row as $value) {
           
                $this->title = $value->getTitle();
                $this->description = $value->getDescription();
                $this->date = $value->getDate();
                $this->category = $value->getCategory();
                $this->articleBody = $value->getArticleBody();
                $this->author = $value->getAuthor();

            }


            return new JsonResponse(json_encode([

                'title' => $this->title,
                'description' => $this->description,
                'date' => $this->date,
                'category' => $this->category,
                'articlebody' => $this->articleBody,
                'author' => $this->author,
            
            ]));
        }

    }

}

}
