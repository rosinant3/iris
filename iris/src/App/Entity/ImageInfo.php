<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity
 * @ORM\Table(name="ImageInfo")
 */
class ImageInfo
{
     /**
     * @ORM\Id
     * @ORM\Column(name="image_id", type="integer")
     * @ORM\GeneratedValue(strategy="IDENTITY")
     * @var int
     */
    private $image_id;

    /**
     * @ORM\Column(name="filename", type="string", length=250)
     * @var string
     */
    private $filename;

     /**
     * @ORM\Column(name="directory", type="string", length=250)
     * @var string
     */

    private $directory;

     /**
     * @ORM\Column(name="dateZ", type="string", length=250)
     * @var string
     */

    private $dateZ;

    /**
     * Application constructor.
     * @param $filename
     */

    public function setFileName(string $name) { return $this->filename = $name; }
    public function setDirectory(string $directory) { return $this->directory = $directory; }
    public function setDate(string $date) { return $this->dateZ = $date; }

    public function getImageId() { return $this->image_id; }
    public function getFileName() { return $this->filename; }
    public function getDirectory() { return $this->directory; }
    public function getDate() { return $this->dateZ; }

}