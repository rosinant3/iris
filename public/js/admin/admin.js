/* FETCH-POSTING DATA */

const fetchFunk = {

    sendForm: function sendForm(data) {
        let myHeaders = new Headers();

        fetch("/admin", {
                method: "POST",
                headers : myHeaders,
                body: data,
    processData: false, // NEEDED, DON'T OMIT THIS
    // ... Other options like success and etc
            }).then((res) => res.json())
            .then((data) =>  {

               let dataS = JSON.parse(data);
           
                if (dataS.Posted === "Article Posted!") {
                
                    writer.posted.innerHTML = "";

                        for (var item of writer.form.children) {
                            
                           if (item.name === "category") {

                            continue;

                           }

                            if (item.name === "date") {

                            continue;

                           }

                           if (item.name === "button") {

                            continue;

                           }

                           else {

                            item.value = ``;
                            

                           }

                        }

                        writer.articlebody.innerHTML = "";
                        writer.title2.innerHTML = "";
                        writer.description2.innerHTML = "";
                        writer.date.innerHTML = "";
                        writer.author2.innerHTML = "";
            
                    let posted = document.createElement("li");
                        posted.appendChild(

                            document.createTextNode("Article Posted!")

                        )

                    writer.posted.appendChild(posted);

                }

                else {
	
                    let err = document.createElement("ul");
                    

                   	writer.errors.innerHTML = "";

                    for (let i = 0; i < dataS.formval.length; i++) {

			let list = document.createElement("li");

                        let text = document.createTextNode(
                            
                            dataS.formval[i]
                            
                            )
                        
                        list.appendChild(text);
                        err.appendChild(list);

                    }


		    
                    writer.errors.appendChild(err);

                } 

            })
            .catch((err)=>console.log(err)) 

    },
    sendImages: function sendImages(data) {
        
        let myHeaders = new Headers();
      
        fetch("/admin", {
                method: "POST",
                headers : myHeaders,
                body: data,
                processData: false, // NEEDED, DON'T OMIT THIS
                //... Other options like success and etc
            }).then((res) => res.json())
            .then((data) =>  {

            let dataS = JSON.parse(data);
           
            if (dataS.Uploaded === "Uploaded") {
                
                writer.fileuploadform.children[1].value = '';
                writer.fileuploadform.children[2].value = '';
                writer.fileuploadform.children[3].value = '';
                writer.errors.innerHTML = ``;

            }

            else {

                let err = ``;
            
                for (let i = 0; i < dataS.formval.length; i++) {

                    err += `<li>${dataS.formval[i]}</li>`;

                }

                writer.errors.appendChild(err);

            }
            })
            .catch((err)=>console.log(err)) 

    },
}

const writer = Object.create(fetchFunk);

const realDate = moment().format("DD MMM YYYY");

writer.title = document.getElementById("input_title");
writer.description = document.getElementById("input_description");
writer.date_form =  document.getElementById("input_date");

writer.date_form.value = realDate;

writer.body = document.getElementById("input_body");
writer.author = document.getElementById("input_author");
writer.articlebody = document.getElementById("article");
writer.title2 = document.getElementById("title");
writer.description2 = document.getElementById("description");

writer.date = document.getElementById("date");
writer.date.innerHTML = realDate;

writer.dirdate = document.getElementById("dirdate");
writer.author2 = document.getElementById("authorname");
writer.select = document.getElementById("input_category");
writer.category = document.getElementById("category");
writer.posted = document.getElementById("posted");
writer.form = document.getElementById("typewriter");
writer.errors = document.getElementById("errors");
writer.fileuploadform = document.getElementsByClassName("fileUploadForm")[0];

writer.author.addEventListener("keyup", function() {

    writer.author2.innerHTML =  writer.author.value;

});

writer.select.addEventListener("change", function() {
    
    writer.category.innerHTML =  writer.select.value;

});

writer.title.addEventListener("keyup", function() {

    writer.title2.innerHTML =  writer.title.value;

});

writer.description.addEventListener("keyup", function() {

    writer.description2.innerHTML =  writer.description.value;

});

writer.body.addEventListener("keyup", function() {

    writer.articlebody.innerHTML = writer.body.value;

});

writer.form.addEventListener("submit", function(e) {

    e.preventDefault();
    let formData = new FormData(e.target);
    writer.sendForm(formData);

});

writer.fileuploadform.addEventListener("submit", function(e) {

    e.preventDefault();
    let formData = new FormData(e.target);
    writer.sendImages(formData);

});
