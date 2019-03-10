<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity
 * @ORM\Table(name="Articles")
 */
class Articles
{
     /**
     * @ORM\Id
     * @ORM\Column(name="id", type="integer")
     * @ORM\GeneratedValue(strategy="IDENTITY")
     * @var int
     */
    private $id;

    /**
     * @ORM\Column(name="title", type="string", length=250)
     * @var string
     */
    private $title;

     /**
     * @ORM\Column(name="description", type="string", length=250)
     * @var string
     */

    private $description;

     /**
     * @ORM\Column(name="dateZ", type="string", length=250)
     * @var string
     */

    private $dateZ;

      /**
     * @ORM\Column(name="category", type="string", length=250)
     * @var string
     */

    private $category;

      /**
     * @ORM\Column(name="article_body", type="string", length=65535)
     * @var string
     */

    private $article_body;


      /**
     * @ORM\Column(name="author", type="text", length=250)
     * @var string
     */

    private $author;

      /**
     * @ORM\Column(name="preview", type="string", length=250)
     * @var string
     */

    private $preview;

        /**
     * @ORM\Column(name="url", type="string", length=65535)
     * @var string
     */

    private $url;


    /**
     * Application constructor.
     * @param $filename
     */

     

    public function setTitle(string $title) { return $this->title = $title; }
    public function setDescription(string $description) { return $this->description = $description; }
    public function setDate(string $date) { return $this->dateZ = $date; }
    public function setCategory(string $category) { return $this->category = $category; }
    public function setArticleBody(string $article_body) { return $this->article_body = $article_body; }
    public function setAuthor(string $author) { return $this->author = $author; }
    public function setPreview(string $preview) { return $this->preview = $preview; }
    public function setUrl(string $url) { return $this->url = $url; }

    public function getTitle() { return $this->title; }
    public function getDescription() { return $this->description; }
    public function getDate() { return $this->dateZ; }
    public function getCategory() { return $this->category; }
    public function getArticleBody() { return $this->article_body; }
    public function getAuthor() { return $this->author; }
    public function getPreview() { return $this->preview; }
    public function getUrl() { return $this->url; }
    public function getId() { return $this->id; }

}