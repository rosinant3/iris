<?php declare(strict_types=1);

namespace App\Migrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 * ./vendor/bin/doctrine-migrations migrations:migrate;
 */
final class Version20181030200904 extends AbstractMigration
{
    public function up(Schema $schema) : void
    {

        $options = array('autoincrement' => true);
        $table = $schema->createTable("Users");
        $table->addColumn("id", 'integer', $options);
        $table->addColumn("username", "string", ["length" => 250]);
        $table->addColumn("password", "string", ["notnull" => false]);
        $table->addColumn("role", "string", ["notnull" => false]);
 
        $table->setPrimaryKey(["id"]);

    }

    public function down(Schema $schema) : void
    {
        $schema->dropTable('Users');

    }
}
