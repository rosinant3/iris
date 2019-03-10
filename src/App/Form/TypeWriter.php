<?php

// src/Form/UserType.php
namespace App\Form;

class TypeWriter {

    public function printWriter() {
        
        $images = $this->options();

        $input = $this->formInput();
        $impInp = implode(' ', $input);

        $select = $this->formSelect();
        $textArea = $this->formTextArea();
        $file = $this->formFile();
        $autSub = $this->formAutSub();

        $writer = array($impInp,
        $select, $textArea, $file, $autSub);

        $fullWriter = implode(' ', $writer);
        $form = '<form id="typewriter" class="hidetypewriter" >'.$fullWriter.'</form>';

        $div = '<div>'.$images.''.$form.'</div>';

        return $div;

    }    

    private function options() {

        $header = '
        
        ';

        return $header;

    }

    private function formInput() {

        $title = '<input    type="text"
        class="form-control"
        id="input_title"
        placeholder="Title"
        name="title"
        style="margin-bottom: 0.5rem" 
        required 
        />';
        $description = '<input 
        type="text"
        row="1"
        id="input_description"
        class="form-control"
        placeholder="Description"
        name="description" 
        style="margin-bottom: 0.5rem" 
        required 
        />';
        $date = '<input  
        type="text"
        row="1"
        id="input_date"
        class="form-control"
        placeholder="Date: ex. 26 Aug 2018"
        name="date"
        readonly
        />';

        $input = array($title, $description, $date);

        return $input;

    }
    
    private function formSelect() {

        $options = array('Notes' => 'Notes', 'Projects' => 'Projects');

        $selectMenu = '<select required id="input_category" class="select-menu" name="category">
        <option value="Notes">'. $options['Notes'] .'</option>
        <option selected value="Projects">'. $options['Projects'] .'</option>
        </select>';

        return $selectMenu;

    }

    private function formTextArea() {
        
        $textArea = '<textarea id="input_body" required name="article_body" 
        id="area" placeholder="<img src(uploads/directory/(imagename).jpg)
        class(left/right/center)
        <p></p>
        <h5></h5>
        <ul></ul>
        <ol></ol>
        etc.
        " class="form-control tbody"></textarea>

        ';

        return $textArea;

    }

    private function formFile() {

        $file = '<label>Preview Image (1260/720):</label>
        <input required type="file" name="preview[]" id="image"></br>';

        return $file;

    }

    private function formAutSub() {

        $author = '<input    type="text"
        class="form-control"
        placeholder="Author"
        name="author" 
        required 
        id="input_author"
        />
        <input type="submit"
        value="Send" name="button" class="button imagebutton"/>';

        return $author;

    }

    public function validateForm(array $data) {

        $errors = array();
        $options = array('Notes' => 'Notes', 'Projects' => 'Projects');
        $fileVal;

        if (isset($data['preview'])) {

            $fileVal = $this->fileHandler($data['preview']);

        }

        if (isset($data['articlepics'])) {

            $fileVal = $this->fileHandler($data['articlepics']);

        }

        if (isset($data['title'])) {

          
            if (strlen($data['title']) === 0 || $data['title'] === "") {

                array_push($errors, 'Title filed is required.');

            }
        }

        if (isset($data['description'])) {

          
            if (strlen($data['description']) === 0 || $data['description'] === "") {
    
                array_push($errors, 'Description filed is required.');
    
            } 
        }

        if (isset($data['directory'])) {

          
            if (strlen($data['directory']) === 0 || $data['directory'] === "") {
        
                array_push($errors, 'Directory filed is required.');
        
            }     
        }

        if (isset($data['date'])) {

            if (strlen($data['date']) === 0 || $data['date'] === "") {
            
                array_push($errors, 'Date filed is required.');
            
            }          
        }

        if (isset($data['category'])) {

            if (!(in_array($data['category'], $options, true))) {
                
                array_push($errors, 'Invalid category.');
                
            }              
        }

        if (isset($data['article_body'])) {

            if (strlen($data['article_body']) === 0 || $data['article_body'] === "") {
                    
                    array_push($errors, 'Article filed is required.');
                    
            }                  
        }

        if (isset($data['author'])) {

            if (strlen($data['author']) === 0 || $data['author'] === "") {
                        
                array_push($errors, 'Author filed is required.');
                        
            }                      
        }
           

        if (!(empty($fileVal))) {

            array_push($errors, 'Invalid File.');

        }

            return $errors;

    }

    public function fileHandler(array $file) {

        $errors = array();
        $total = count($file['name']);

        for ($i = 0; $i < $total; $i++) {
        
            $file_name = $file['name'][$i];
            $file_size = $file['size'][$i];
            $file_tmp = $file['tmp_name'][$i];
            $file_type= $file['type'][$i];
            $file_explode = explode('.', $file_name);
            $file_ext= strtolower(end($file_explode));

            $expensions= array("jpeg","jpg","png");

            if (in_array($file_ext,$expensions)=== false){

                $errors[]= "Invalid file.";
                
             }
   
        }

        return $errors;

    }

    public function imageUpload($image) {

        $currentDir = getcwd();
        $total;
        $uploadDirectory;

        $fileName = array();
        $uploadDir;
        $date = $image['date'];
        $realImg;

        if (isset($image['articleImg'])) {

            $uploadDir = 'uploads/'.$image['directory'].'/';

                $createDirectory = $_SERVER["DOCUMENT_ROOT"] . "/uploads/" . $image['directory'] . '/';

                if (!file_exists($createDirectory)) {

                    mkdir($createDirectory, 0777, true);
                  
                }

                $direc = $_SERVER['DOCUMENT_ROOT'] . '/uploads/' . $image['directory'] . '/';

                $uploadDirectory = $createDirectory;
                $total = count($image['articleImg']['name']);
                $realImg = $image['articleImg'];

            }

            if (isset($image['preview'])) {
               
                $uploadDirectory  = $_SERVER["DOCUMENT_ROOT"] . "/uploads/preview/";

                if (!file_exists($uploadDirectory)) {

                    mkdir($uploadDirectory, 0777, true);
                  
                }

                $total = count($image['preview']['name']);
                $realImg = $image['preview'];
                $uploadDir = 'uploads/preview/'.$image['preview']['name'][0];


            }

            for ($i = 0; $i < $total; $i++) {

                $direc = $_SERVER['DOCUMENT_ROOT'] . '/uploads/' . $realImg['name'][$i] . '/';

                if (!file_exists($direc)) {

                    $uploadPath = $uploadDirectory . basename($realImg['name'][$i]); 
                    $file_tmp = $realImg['tmp_name'][$i];
                    $didUpload = move_uploaded_file($file_tmp , $uploadPath);
                    array_push($fileName, $realImg['name'][$i]);    
                  
                }

            }

            $realInfo = array(  'files' => $fileName,
                                'directory' => $uploadDir,
                                'date' => $date);

            return $realInfo;
    
        }

}
