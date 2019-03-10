const worker = {

    printImages: function printImages(dataS) {

        let order = {};

        for (let i = 0; i < dataS.images.length; i++) {

            if ("/" + dataS.images[i].directory in order) {

                order["/" + dataS.images[i].directory].push({

                    filename: dataS.images[i].filename,
                    id: dataS.images[i].id,
                    date: dataS.images[i].date

                })

            }

            else {

                order["/" + dataS.images[i].directory] = [{

                    filename: dataS.images[i].filename,
                    id: dataS.images[i].id,
                    date: dataS.images[i].date

                }]

            }

        }

        players.container.innerHTML = '';

        for (let key in order) {

            if (order.hasOwnProperty(key)) {

                let dir = document.createElement("h5");
                    dir.appendChild(

                    document.createTextNode(key)

                );
                    dir.style.marginTop = "0.5rem";
                    dir.style.marginBottom = "0.5rem";

                let cont = document.createElement("div");
                    cont.style.display = "flex";
                    cont.style.flexDirection = "column";
                    cont.appendChild(dir);

                let content = document.createElement("div");
                    content.style.display = "flex";
                    content.style.flexDirection = "row";
                    content.className = "row";

                for (let i = 0; i < order[key].length; i++) {

                    let div = document.createElement("div");
                        div.className = "col-sm-3 picture";
                        div.style.display = "flex";
                        div.style.flexDirection = "column";
                        div.title = `id: ${order[key][i].id} | date: ${order[key][i].date}`;
                        div.queryId = order[key][i].id;
                        div.queryDate = order[key][i].date;

                    let imageContainer = document.createElement("div");
                        imageContainer.style.position = "relative";
                        imageContainer.style.padding = "0px";

                    let image = document.createElement("img");
                        image.src = key + order[key][i].filename;
                        image.style.width = "100%";
                        image.style.position = "relative";
                        image.style.zIndex = "1";
                        image.style.borderRadius = "5px";

                    let erase = document.createElement("div");
                        erase.style.position = "absolute";
                        erase.style.top = "0";
                        erase.style.bottom = "0";
                        erase.style.left = "0";
                        erase.style.right = "0";
                        erase.style.zIndex = "2";
                        erase.style.opacity = 0;
                        erase.style.display = "flex";
                        erase.style.justifyContent = "center";
                        erase.style.flexDirection = "column";
                        erase.style.textAlign = "center";
                        erase.style.borderRadius = "5px";
                        erase.style.verticalAlign = "center";
                        erase.style.backgroundColor = "rgb(255, 0, 0, 0.5)";
                        erase.style.cursor = "pointer";
                        erase.style.color = "white";
                        erase.style.webkitTransitionPropery = "opacity";
                        erase.style.webkitTransitionDuration = "700ms";
                        erase.style.transitionProperty = "opacity";
                        erase.style.transitionDuration = "700ms";
                        erase.appendChild(

                            document.createTextNode("Remove")
    
                        );

                    imageContainer.addEventListener("mouseenter", function(){

                       erase.style.opacity = 1;
         
                    })

                    imageContainer.addEventListener("mouseleave", function(){

                        erase.style.opacity = 0;

                    })

                    imageContainer.addEventListener("click", function() {

                        players.delete(cont, imageContainer)

                    });

                    imageContainer.appendChild(image);
                    imageContainer.appendChild(erase);

                    let filename = document.createElement("div");
                        filename.style.wordWrap = "break-word";
                        filename.style.borderBottomStyle = "solid";


                    filename.appendChild(

                        document.createTextNode(order[key][i].filename)

                    );

                    div.appendChild(imageContainer);
                    div.appendChild(filename);

                    content.appendChild(div);    

                }

                cont.appendChild(content);
                players.container.appendChild(cont);

            }

        }

    }

}

const players = Object.create(worker);

players.button = document.getElementById("getbutton");
players.container = document.getElementsByClassName("imagedump")[0];
players.getImages =  function getImages() {

        let myHeaders = new Headers();

        fetch("/getimages", {
                method: "GET",
                headers : myHeaders,
            }).then((res) => res.json())
            .then((data) =>  {

            let dataS = JSON.parse(data);

            players.printImages(dataS);

            })
            .catch((err)=>console.log(err)) 

    };

players.delete = function removeImage(parent, myThis) {

        let id = myThis.parentNode.queryId;
        let date = myThis.parentNode.queryDate;
        let filename = myThis.parentNode.children[1].innerHTML;
        let directory = myThis.parentNode.parentNode.parentNode.firstChild.innerHTML;

        let container = myThis.parentNode.parentNode.children;

        let urlparameters = `directory2=${directory}&id=${id}&date=${date}&filename=${filename}`;

        fetch("/getimages", {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    // "Content-Type": "application/x-www-form-urlencoded",
                },
                body: urlparameters
            }).then((res) => res.json())
            .then((data) =>  {

            let dataS = JSON.parse(data);

            if(dataS.deleted === 'deleted') {

                myThis.parentNode.remove();

            }
                
            if (container === undefined || container.length === 0) {

                let directoryparameter = `directory6=${directory}`;

                fetch("/getimages", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded",
                        // "Content-Type": "application/x-www-form-urlencoded",
                    },
                    body: directoryparameter
                }).then((res) => res.json())
                .then((data) =>  {
                    
                    let dataP = JSON.parse(data);

                    if (dataP.deleted === "deleted") {

                        parent.remove();

                    }
       
                })
                .catch((err)=>console.log(err)) 

            }

            })
            .catch((err)=>console.log(err)) 

};

players.directoryForm = document.getElementsByClassName("directoryform")[0],
players.findDirectory = function findDirectory(e) {

        e.preventDefault();

        let directory = e.target.directory.value;

        let urlparameters = `directory=${directory}`;

        fetch("/getimages", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                // "Content-Type": "application/x-www-form-urlencoded",
            },
            body: urlparameters,
        }).then((res) => res.json())
        .then((data) =>  {

            let dataS = JSON.parse(data);

            players.printImages(dataS);

            if (dataS.images.length === 0) {

                let div = document.createElement("div");
                    div.style.textAlign = "center";
                    div.appendChild(

                        document.createTextNode(

                            `Directory '${directory}' not found.`

                        )

                    )

                players.container.appendChild(div);

            }

            else {

                players.printImages(dataS);

            }

        })
        .catch((error) => {console.log(error);})

}

players.button.addEventListener("click", players.getImages);
players.directoryForm.addEventListener("submit", players.findDirectory);