const editor = {

    change: function change() {

                let preview = document.getElementsByClassName("unique")[0].children;
                let body = document.getElementById("article");
  
                if (this.id === "editor") {

                    items.articles.setAttribute("class", "navigation menuitem activemenuitem");
                    items.typewriter.setAttribute("class", "navigation menuitem");
                    items.hidetypewriter.style.display = "none";
                    items.hideeditor.style.display = "block";
                    body.innerHTML = "";
                    items.articlesContainer.innerHTML = "";
                    items.container.innerHTML = "";

                    for (let i = 0; i < preview.length; i++) {

                        if (preview[i].id === "category") {

                            continue;

                        }

                        else {

                            preview[i].innerHTML = "";
        
                        }
                
                    }

                }

                if (this.id === "typewriter2") {

                    items.typewriter.setAttribute("class", "navigation menuitem activemenuitem");
                    items.articles.setAttribute("class", "navigation menuitem");
                    items.hidetypewriter.style.display = "block";
                    items.hideeditor.style.display = "none";
                    items.articlesContainer.innerHTML = "";
                    body.innerHTML = "";

                    for (let i = 0; i < preview.length; i++) {

                        if (preview[i].id === "category") {

                            continue;

                        }

                        else {

                            preview[i].innerHTML = "";
        
                        }
                    }
                }
            },

    create: function createEditor() {

                let container = items.container;
                let editor = document.createElement("div");
                editor.setAttribute("class", "editor");

                let formTitle = document.createElement("Form");
                let title = document.createElement("input");
                    title.setAttribute("class", "form-control");
                    title.type = "text";
                    title.placeholder = "Title";
                    title.name = "title";
                    title.disabled = true;
                    title.id = "edittitle";
                    title.style.marginBottom = "0.5rem";

                    formTitle.appendChild(title);
        
                let formDescription = document.createElement("form");
                let description = document.createElement("input");
                    description.setAttribute("class", "form-control");
                    description.type = "text";
                    description.name = "description";
                    description.placeholder = "Description";
                    description.disabled = true;
                    description.id = "editdescription";
                    description.style.marginBottom = "0.5rem";
            
                    formDescription.appendChild(description);

                let formDate = document.createElement("form");
                let date = document.createElement("input");
                    date.setAttribute("class", "form-control");
                    date.type = "text";
                    date.name = "date";
                    date.placeholder = "Date";
                    date.disabled = true;
                    date.id = "editdate";
            
                    formDate.appendChild(date);

                let formCategory = document.createElement("form");
                let category = document.createElement("select");
                    category.setAttribute("class", "select-menu");
                    category.name = "category";
                    category.id = "editcategory";

                let notes = document.createElement("option");
                    notes.appendChild(
                
                        document.createTextNode("Notes")

                    )

                let projects = document.createElement("option");
                    projects.appendChild(

                        document.createTextNode("Projects")

                )

                    projects.selected = true;
                    category.disabled = true;

                category.appendChild(notes);
                category.appendChild(projects);
                category.style.marginRight = "2rem";
    
                formCategory.appendChild(category);

                let formBody = document.createElement("form");
                let body = document.createElement("textarea");
                let submitBody = document.createElement("input");
                    body.setAttribute("class", "form-control tbody");
                    submitBody.type = "submit";
                    submitBody.value = "Change Body";
                    body.name = "article_body";
                    body.id = "editbody";
                    submitBody.setAttribute("class", "imagebutton changebutton");
                    body.type = "text";
                    body.placeholder = `<img src(uploads/directory/(imagename).jpg)
                        class(left/right/center)
                        <p></p>
                        <h5></h5>
                        <ul></ul>
                        <ol></ol>
                        etc.`;
                    body.disabled = true;
                    submitBody.disabled = true;

                formBody.appendChild(body);
                formBody.appendChild(submitBody);


                formBody.addEventListener('submit', function(e) {

                    e.preventDefault();

                    let value = e.target.article_body.value;
                    let identifier = e.target.article_body.identifier;

                    let urlparameters = `updated_body=${value}&url=${identifier}`;

                        fetch("/edit", {

                            method: "POST",
                            headers: {

                                "Content-Type": "application/x-www-form-urlencoded",
                                // "Content-Type": "application/x-www-form-urlencoded",

                            },
                            body: urlparameters,

                        }).then((res) => res.json())
                        .then((data) =>  {

                            let dataP = JSON.parse(data);

                            if (dataP.updated === "updated") {

                                body.disabled = true;
                                submitBody.disabled = true;
                                body.value = "";
                                title.value = "";
                                description.value = "";
                                author.value = "";
                                date.value = "";
                                writer.articlebody.innerHTML = "";
                                writer.title2.innerHTML = "";
                                writer.description2.innerHTML = "";
                                writer.date.innerHTML = "";
                                writer.author2.innerHTML = "";
                                
                            }
 
                        })

                })

                let formPreview = document.createElement("form");
                let preview = document.createElement("input");
                    preview.style.marginBottom = "0.5rem";
                    preview.name = "preview";
                    preview.type = "file";
                    preview.id = "editpreview";
            
                formPreview.appendChild(

                    document.createTextNode("Preview Image:  ")

                )

                formPreview.appendChild(preview);
                preview.disabled = true;

                let formAuthor = document.createElement("form");
                let author = document.createElement("input");
                    author.setAttribute("class", "form-control");
                    author.type = "text";
                    author.name = "author";
                    author.placeholder = "Author";
                    author.disabled = true;
                    author.id = "editauthor";
            
                formAuthor.appendChild(author);
    
                editor.appendChild(formTitle);
                editor.appendChild(formDescription);
                editor.appendChild(formDate);
                editor.appendChild(formCategory);
                editor.appendChild(formBody);
                editor.appendChild(formPreview);
                editor.appendChild(formAuthor);

                container.appendChild(editor);

                return {

                    title: title,
                    description: description,
                    date: date,
                    category: category,
                    body: body,
                    bodybutton: submitBody,
                    preview: preview,
                    author: author

                }
        },

    searchForm: function searchForm() {

                    items.articlesContainer.style.marginTop = "2rem";
                    items.articlesContainer.style.marginBottom = "2rem";

                let results = document.createElement("div");
                    results.id = "articlesresult";
                    results.style.height = "50vh";
                    results.style.borderRadius = "5px";
                    results.style.borderStyle = "solid";
                    results.style.borderColor = "rgb(116, 116, 182)";
                    results.style.overflow = "scroll";
                    results.style.padding = "1rem";

                let form = document.createElement("form");
                    form.style.display = "flex";
                    form.style.flexDirection = "row";
                    form.style.marginBottom = "1rem";
                    form.addEventListener("submit", items.searchForArticle);

                let input = document.createElement("input");
                    input.type = "text";
                    input.required = true;
                    input.name = "article_name";
                    input.setAttribute("class", "form-control");
                    input.style.display = "inline-block";
                    input.placeholder = "Search for article...";

                form.appendChild(input);
            

                let button = document.createElement("input");
                    button.type = "submit";
                    button.value = "Search";
                    button.style.display = "inline-block";
                    button.setAttribute("class", "imagebutton");
                    button.style.marginLeft = "1rem";
            
                form.appendChild(button);

                items.articlesContainer.appendChild(form);
                items.articlesContainer.appendChild(results);

                items.callers.insertBefore(items.articlesContainer, items.callers.childNodes[0]);

                return form;

            },

    searchForArticle: function searchForArticle(name, editor) {

                        let urlparameters = `searchname=${name}`;

                        let container = document.getElementById("articlesresult");

                        fetch("/article", {

                            method: "POST",
                            headers: {

                                "Content-Type": "application/x-www-form-urlencoded",
                                // "Content-Type": "application/x-www-form-urlencoded",

                            },
                            body: urlparameters,

                        }).then((res) => res.json())
                        .then((data) =>  {

                        let dataP = JSON.parse(data);

                        let articles = dataP.searchResult;

                        if (dataP.err === "Invalid input") {

                            container.innerHTML = '';
                            container.appendChild(

                                document.createTextNode("Invalid input.")

                            );
                        }

                        if (articles && articles.length > 0) {

                            container.innerHTML = '';

                            for (i = 0; i < articles.length; i++) {

                                items.createList(container, articles[i], editor);
    
                            }

                        }

                        if (typeof name === "string" && articles.length === 0) {

                            container.innerHTML = "";

                            let error = document.createElement("div");
                            error.appendChild(

                            document.createTextNode(

                                `Article '${name}' not found.`

                            )

                            )

                            error.style.textAlign = "center";

                            container.appendChild(error);

                        }

                        })
                        .catch((err)=>console.log(err)) 


                    },

    createList: function createList(cont, info, editor) {

                    let listItem = document.createElement("div");
                        listItem.style.display = "flex";
                        listItem.style.justifyContent = "space-between";
                        listItem.style.marginBottom = "2rem";
                        listItem.style.padding = "0.5rem";
                        listItem.style.borderBottomStyle = "solid";
                        listItem.style.borderBottomWidth = "1px";

                    let listId = document.createElement("span");
                        listId.appendChild(

                            document.createTextNode(info.id)

                        )

                    let listTitle = document.createElement("span");
                        listTitle.appendChild(

                            document.createTextNode(info.title)

                        )

                    let editArticle = document.createElement("i");
                        editArticle.setAttribute("class", "far fa-edit");
                        editArticle.style.cursor = "pointer";

                    editArticle.addEventListener("click", function() {

                        editor.body.disabled = false;
                        editor.bodybutton.disabled = false;

                        editor.title.value = info.title;
                        writer.title2.innerHTML =  info.title;
                        editor.title.identifier = info.url;

                        editor.description.value = info.description;
                        writer.description2.innerHTML = info.description;
                        editor.description.identifier = info.url;

                        editor.date.value = info.date;
                        writer.date.innerHTML = info.date;
                        editor.date.identifier = info.url;

                        editor.category.value = info.category;
                        writer.category.innerHTML = info.category;

                        editor.body.value = info.articleBody;
                        writer.articlebody.innerHTML = info.articleBody;
                        editor.body.identifier = info.url;

                        editor.author.value = info.author;
                        writer.author2.innerHTML = info.author;
                        editor.author.identifier = info.url;

                        editor.preview.previous = info.preview;
                        editor.preview.identifier = info.url;

                    })

        
                    let deleteArticle = document.createElement("i");
                    deleteArticle.setAttribute("class", "fas fa-trash");
                    deleteArticle.style.color = "red";
                    deleteArticle.style.cursor = "pointer";

                    deleteArticle.addEventListener("click", function() {

                        if (confirm(`Are you sure you want to delete ${info.title}?`)) {
            
                            let urlparameters = `del_ind=${info.url}`;

                            fetch("/edit", {

                                method: "POST",
                                headers: {
                                    "Content-Type": "application/x-www-form-urlencoded",
                                    // "Content-Type": "application/x-www-form-urlencoded",
                                },
                                body: urlparameters
                            }).then((res) => res.json())
                            .then((data) =>  {

                            let dataP = JSON.parse(data);

                            if (dataP.deleted === "deleted") {

                                listItem.remove();

                            }


                            })
                            .catch((err)=>console.log(err)) 

                        } else {   }

                    })

                    listItem.appendChild(listId);
                    listItem.appendChild(listTitle);
                    listItem.appendChild(editArticle);
                    listItem.appendChild(deleteArticle);

                    cont.appendChild(listItem);


                },

    createEditor: function createEditor() {

                    let editor = items.create();
                    let searchForm = items.searchForm();

                    searchForm.addEventListener("submit", function(e) {

                    e.preventDefault();
                    let name = e.target.article_name.value;

                    items.searchForArticle(name, editor);

                    })

                    editor.body.addEventListener("keyup", function() {

                        writer.articlebody.innerHTML = editor.body.value;

                    });
         
                }

}

const items = Object.create(editor);

    items.articles = document.getElementById("editor");
    items.typewriter = document.getElementById("typewriter2");

        items.articles.addEventListener("click", items.change);
        items.typewriter.addEventListener("click", items.change);

    items.hidetypewriter = document.getElementsByClassName("hidetypewriter")[0];
    items.hideeditor = document.getElementById("hideeditor");

        items.articles.addEventListener("click", items.createEditor);

    items.container = document.getElementsByClassName("container5")[0];

    items.callers = document.getElementById("callers");
    items.articlesContainer = document.createElement("div");