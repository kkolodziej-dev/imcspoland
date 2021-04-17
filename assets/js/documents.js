document.addEventListener('DOMContentLoaded', () => {
    
    const DOCUMENT_FOLDER_PATH = 'https://github.com/kkolodziej-dev/imcspoland/raw/add_galery/images/documents/';
    const PHOTO_FOLDER_PATH = 'https://github.com/kkolodziej-dev/imcspoland/raw/add_galery/images/gallery/';
    //ToDo get list of available documents to loop through
    const DOCUMENT_NAMES_ARRAY = ['document1.pdf', 'document1.docx'];
    const PHOTO_NAMES_ARRAY = ['01.jpg','02.jpg','03.jpg','04.jpg','05.jpg','06.jpg'];

    let documentListElement = document.getElementById('documentList');
    let photoListElement = document.getElementById('photoList');

    //populate documents
    populateElementFields('documents');
    populateElementFields('gallery');
    
    function populateElementFields(flag) {
        let folderPath, elementList;
        switch (flag) {
            case 'documents':
                folderPath = DOCUMENT_FOLDER_PATH;
                elementList = DOCUMENT_NAMES_ARRAY;
                break;
            case 'gallery':
                folderPath = PHOTO_FOLDER_PATH;
                elementList = PHOTO_NAMES_ARRAY;
                break;
        }
        let elementArray = [];
        //construct the documents
        elementList.forEach(e => {
            let tempSpan = document.createElement("span");
            tempSpan.className = "icon minor style6 fad fa-file-alt";
            tempSpan.innerText = e;
            setEventListeners(tempSpan, folderPath);
            let tempLi = document.createElement("li");
            tempLi.appendChild(tempSpan);
            elementArray.push(tempLi);
        })

        //append ready document objects to the document list element
        elementArray.forEach(e => {
            switch (flag) {
                case 'documents':
                    documentListElement.appendChild(e);
                    break;
                case 'gallery':
                    photoListElement.appendChild(e);
                    break;
            } 
        })
    }
    
    function setEventListeners(e, folderPath) {
        e.addEventListener('click', () =>  {
            download(folderPath, e.innerText);
        });
        
        e.addEventListener('mouseover', () => {
            e.style.cursor = 'pointer';
        })
    }
    
    function download(folderPath, elementName) {
        let element = document.createElement('a');
        element.setAttribute('href', folderPath + elementName);
        element.style.display = 'none';
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
      }
    });
    
    