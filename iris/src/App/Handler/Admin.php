<?php

declare(strict_types=1);

namespace App\Handler;

use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use Psr\Http\Server\MiddlewareInterface;
use Psr\Http\Server\RequestHandlerInterface;
use Zend\Expressive\Twig\TwigRenderer;
use Zend\Diactoros\Response\HtmlResponse;
use Zend\Diactoros\Response\JsonResponse;
use App\Form\TypeWriter;
use Doctrine\ORM\EntityManager;
use App\Entity\ImageInfo;
use App\Entity\Articles;
use Doctrine\DBAL\Exception\UniqueConstraintViolationException;
use Zend\Authentication\AuthenticationService;

class Admin implements MiddlewareInterface
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
       
        $renderer = new TwigRenderer();
        $renderer->addPath('templates/app');
        
        $typeWriterObject = new TypeWriter();
        $fullForm = $typeWriterObject->printWriter();

        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
     
            if(isset($_FILES['articlepics'])) {

                $body = $request->getParsedBody();
                $articleImages = $_FILES['articlepics'];
                $directory = trim($body['directory']);
                $date = trim($body['date']);

                $article = array(   'directory' => $directory,
                                    'articleImg' => $articleImages,
                                    'date' => $date
                                );

                $formVal = $typeWriterObject->validateForm($article);

    
                if (empty($formVal)) {

                    $imageInf = $typeWriterObject->imageUpload($article);  
                    $total = count($imageInf['files']);
        
                for ($i = 0; $i < $total; $i++) {

                    $imageTable = new ImageInfo();
                    $imageTable->setFileName($imageInf['files'][$i]);
                    $imageTable->setDirectory($imageInf['directory']);
                    $imageTable->setDate($imageInf['date']);

                    $filename = $imageTable->getFileName();
                    $directory = $imageTable->getDirectory();
                    $date = $imageTable->getDate();
             
                    $this->entityManager->persist($imageTable, $filename);
                    $this->entityManager->persist($imageTable, $directory);
                    $this->entityManager->persist($imageTable, $date);
                    $this->entityManager->flush();
               
                };
             
                return new JsonResponse(json_encode(['Uploaded' => 'Uploaded']));
                   
              
                }

                else {

                 return new JsonResponse(json_encode(['formval' => $formVal]));
        

                }

	        }

            else if (isset($_FILES['preview'])) {
                
                $rid;
                $body = $request->getParsedBody();

                $title = trim($body['title']);
                $description = trim($body['description']);
                $date = trim($body['date']);
                $category = trim($body['category']);
                $article_body = trim($body['article_body']);
                $author = trim($body['author']);
                $preview = $_FILES['preview'];
      
                $article = array(   'title' => $title,
                                    'description' => $description,
                                    'date' => $date,
                                    'category' => $category,
                                    'article_body' => $article_body,
                                    'author' => $author,
                                    'preview' => $preview,
                                );

                $formVal = $typeWriterObject->validateForm($article);


                if (empty($formVal)) {

                    $Articles = new Articles();
                    $imageInf = $typeWriterObject->imageUpload($article);  
                    $total = count($imageInf['files']);

                    $qb = $this->entityManager->createQueryBuilder();

                    $qb->select('u')
                    ->from('App\Entity\ImageInfo', 'u')
                    ->where('u.filename = :filename')
                    ->setParameter('filename', $imageInf['files'][0]);

                    $query = $qb->getQuery();
                    $row = $query->getResult();

                    $duplicate_checker = Array();

                    foreach ($row as $value) {

                        $this->filename = $value->getFileName();

                        array_push($duplicate_checker, $this->filename);
        
                    }

                    if (empty($duplicate_checker)) {

                        for ($i = 0; $i < $total; $i++) {

                            $imageTable = new ImageInfo();
                            $imageTable->setFileName($imageInf['files'][$i]);
                            $imageTable->setDirectory('uploads/preview/');
                            $imageTable->setDate($imageInf['date']);
        
                            $filename = $imageTable->getFileName();
                            $directory = $imageTable->getDirectory();
                            $date = $imageTable->getDate();
                     
                            $this->entityManager->persist($imageTable, $filename);
                            $this->entityManager->persist($imageTable, $directory);
                            $this->entityManager->persist($imageTable, $date);
                            $this->entityManager->flush();
                       
                        };

                    }

                    $queryid = $this->entityManager->createQueryBuilder()
                    ->select('MAX(a.id)') 
                    ->from('App\Entity\Articles', 'a')
                    ->getQuery();
        
                    $total = $queryid->getResult();

                    $urlTitle = strtolower(preg_replace('/\s+/', '-', $title));

                    if (empty($total)) {
                        
                        $total = 0;
                        $id = uniqid();
                        $rid = $urlTitle . '-' . $total . $id;    

                    }

                   if (!empty($total)) {

                        foreach ($total as $value) {
           
                            foreach ($value as $string) {

                                $id = uniqid();
                                $rid = $urlTitle . '-' . $string . $id;    
 
                            }
                        }
                    }

                    $previewLoc = $imageInf['directory'];

                    $Articles->setTitle($title);
                    $Articles->setDescription($description);
                    $Articles->setDate($date);
                    $Articles->setCategory($category);
                    $Articles->setArticleBody($article_body);
                    $Articles->setAuthor($author);
                    $Articles->setPreview($previewLoc);
                    $Articles->setUrl($rid);
                
                    $title2 = $Articles->getTitle();
                    $description2 = $Articles->getDescription();
                    $date2 = $Articles->getDate();
                    $category2 = $Articles->getCategory();
                    $article_body2 = $Articles->getArticleBody();
                    $author = $Articles->getAuthor();
                    $preview2 = $Articles->getPreview();
                    $url = $Articles->getUrl($rid);
               
                    $this->entityManager->persist($Articles, $title2);
                    $this->entityManager->persist($Articles, $description2);
                    $this->entityManager->persist($Articles, $date2);
                    $this->entityManager->persist($Articles, $category2);
                    $this->entityManager->persist($Articles, $article_body2);
                    $this->entityManager->persist($Articles, $author);
                    $this->entityManager->persist($Articles, $preview2);
                    $this->entityManager->persist($Articles, $url);
                    $this->entityManager->flush();
                    
                    return new JsonResponse(json_encode(['Posted' => 'Article Posted!']));
        
                }

                else {

                     return new JsonResponse(json_encode(['formval' => $formVal]));
    
                }
            }
        }
    
        else if (($_SERVER['REQUEST_METHOD'] === 'GET')) {

            return new HtmlResponse(

                $renderer->render('admin.html.twig', 
                array('fullForm' => $fullForm))
            
            );
        }
    }
}
