<?php

declare(strict_types=1);

namespace App\Data;

use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use Psr\Http\Server\MiddlewareInterface;
use Psr\Http\Server\RequestHandlerInterface;
use Zend\Diactoros\Response\JsonResponse;
use App\Entity\ImageInfo;
use Doctrine\ORM\EntityManager;

class ImagesGet implements MiddlewareInterface
{
    /**
     * {@inheritDoc}
     */

    private $entityManager;

    private $id; 
    private $filename;
    private $directory;
    private $date;

    private $images;

    public function __construct(EntityManager $entityManager)
    {

        $this->entityManager = $entityManager;

    }
 
 
    public function process(ServerRequestInterface $request, RequestHandlerInterface $handler) : ResponseInterface
    {

        if ($_SERVER['REQUEST_METHOD'] === 'GET') {

            $qb = $this->entityManager->createQueryBuilder();

            $qb->select('u')
            ->from('App\Entity\ImageInfo', 'u')
            ->add('orderBy', 'u.image_id DESC');

            $query = $qb->getQuery();
            $row = $query->getResult();

            $this->images = Array();

            foreach ($row as $value) {

                $this->id = $value->getImageId();
                $this->filename = $value->getFileName();
                $this->directory = $value->getDirectory();
                $this->date = $value->getDate();

                $data = [ 
                
                    'id' => $this->id,
                    'filename' => $this->filename,
                    'directory' => $this->directory,
                    'date' => $this->date
    
                ];

                array_push($this->images, $data);

            }

            return new JsonResponse(json_encode([

               'images' => $this->images
            
            ]));
        }

        if ($_SERVER['REQUEST_METHOD'] === 'POST') {

            $body = $request->getParsedBody();

            if(isset($body['directory'])) {

            $direct = 'uploads' . '/' . $body['directory'] . '/';

            $qb = $this->entityManager->createQueryBuilder();

            $qb->select('u')
            ->from('App\Entity\ImageInfo', 'u')
            ->where('u.directory = :directory')
            ->setParameter('directory', $direct)
            ->add('orderBy', 'u.image_id DESC');

            $query = $qb->getQuery();
            $row = $query->getResult();

            $this->images = Array();

            foreach ($row as $value) {

                $this->id = $value->getImageId();
                $this->filename = $value->getFileName();
                $this->directory = $value->getDirectory();
                $this->date = $value->getDate();

                $data = [ 
                
                    'id' => $this->id,
                    'filename' => $this->filename,
                    'directory' => $this->directory,
                    'date' => $this->date
    
                ];

                array_push($this->images, $data);

            }

            return new JsonResponse(json_encode([

               'images' => $this->images
            
            ]));

 
            }

            if (isset($body['id']) && isset($body['date']) && isset($body['filename'])) {

                $qb = $this->entityManager->createQueryBuilder();

                $path = $_SERVER['DOCUMENT_ROOT'] . $body['directory2'] . $body['filename'];

                unlink($path);
                
                $qb->delete('App\Entity\ImageInfo', 'u')
                ->where(
                    
                        'u.image_id = :id', 
                        'u.filename = :filename',
                        'u.dateZ = :date'
                        
                        )
                ->setParameter('id', $body['id'])
                ->setParameter('filename', $body['filename'])
                ->setParameter('date', $body['date']);
  
                $query = $qb->getQuery();
                $row = $query->getResult();

                return new JsonResponse(json_encode([

                    'deleted' => 'deleted'

                 ]));
        
            }

            if (isset($body['directory6'])) {

                $direc = $_SERVER['DOCUMENT_ROOT'] . $body['directory6'];

                rmdir($direc);

                return new JsonResponse(json_encode([

                    'deleted' => 'deleted'

                 ]));

            }

    }

}

}
