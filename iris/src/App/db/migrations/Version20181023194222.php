<?php declare(strict_types=1);

namespace App\Migrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 * ./vendor/bin/doctrine-migrations migrations:migrate;
 * 
 */
final class Version20181023194222 extends AbstractMigration
{
    public function up(Schema $schema) : void
    {
        
        $options = array('autoincrement' => true);
        $table = $schema->createTable("Articles");
        $table->addColumn("id", 'integer', $options);
        $table->addColumn("title", "string", ["notnull" => false, "length" => 250]);
        $table->addColumn("description", "string", ["notnull" => false]);
        $table->addColumn("category", "string", ["notnull" => false]);
        $table->addColumn("article_body", "text", ["notnull" => false]);
        $table->addColumn("author", "string", ["notnull" => false]);
        $table->addColumn("preview", "string", ["notnull" => false]);
        $table->addColumn("dateZ", "string", ["notnull" => false]);
        $table->addColumn("url", "string", ["notnull" => false]);
 
        $table->setPrimaryKey(["id"]);

    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs

    }
}
