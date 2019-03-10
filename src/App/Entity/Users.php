<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity
 * @ORM\Table(name="Users")
 */
class Users
{
     /**
     * @ORM\Id
     * @ORM\Column(name="id", type="integer")
     * @ORM\GeneratedValue(strategy="IDENTITY")
     * @var int
     */
    private $id;

    /**
     * @ORM\Column(name="username", type="string", length=250)
     * @var string
     */
    private $username;

     /**
     * @ORM\Column(name="password", type="string", length=250)
     * @var string
     */

    private $password;

     /**
     * @ORM\Column(name="role", type="string", length=250)
     * @var string
     */

    private $role;

    /**
     * Application constructor.
     * @param $username
     */

    public function setUsername(string $name) { return $this->username = $name; }
    public function setPassword(string $password) { return $this->password = $password; }
    public function setRole(string $role) { return $this->role = $role; }

    public function getImageId() { return $this->id; }
    public function getUsername() { return $this->username; }
    public function getPassword() { return $this->password; }
    public function getRole() { return $this->role; }

}