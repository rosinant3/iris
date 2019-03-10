<?php declare(strict_types=1);

namespace App\Migrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 * ./vendor/bin/doctrine-migrations migrations:migrate;
 */
final class Version20181023105525 extends AbstractMigration
{
    public function up(Schema $schema) : void
    {

        $options = array('autoincrement' => true);
        $table = $schema->createTable("ImageInfo");
        $table->addColumn("image_id", 'integer', $options);
        $table->addColumn("filename", "string", ["length" => 250]);
        $table->addColumn("directory", "string", ["notnull" => false]);
        $table->addColumn("dateZ", "string", ["notnull" => false]);
 
        $table->setPrimaryKey(["image_id"]);

    }

    public function down(Schema $schema) : void
    {
        
        $schema->dropTable('ImageInfo');

    }
}
