const container = document.getElementsByClassName('container')[0];
const dragArea = document.getElementsByClassName('dragArea')[0];
const fileInp = document.getElementById('file');
const extraText1 = document.querySelector('#extraText1');
const extraText2 = document.querySelector('#extraText2');
let file;
//when items are dragged over to upload area
function handleDragover(e){
    e.preventDefault();
    document.getElementById('uploadText').innerHTML = 'Please Release to upload';
    //console.log('file inside');
    extraText1.innerHTML = '';
    extraText2.innerHTML = '';
}

dragArea.addEventListener('dragover',handleDragover);

//when file os dragged outside
function handleDragleave(e){
    e.preventDefault();
    document.getElementById('uploadText').innerHTML = 'Drag and Drop here';
    //console.log('file outside the area');
}

dragArea.addEventListener('dragleave',handleDragleave);

//when file is dropped
function handleDrop(e){
    e.preventDefault();
    console.log('file dropped');
    //console.log(e);
    file = e.dataTransfer.files[0];
    //console.log(file);
    displayFile();
}

dragArea.addEventListener('drop',handleDrop);


//click event on div
function divClick(){
    fileInp.click();
}
dragArea.addEventListener('click',divClick);

fileInp.addEventListener('change',function (){
    file = this.files[0];
    displayFile();
});

function displayFile(){
    let fileType = file.type;
    let allowed = ['image/jpeg','image/png','img/jpg'];
    if(allowed.includes(fileType)){
        let fileReader = new FileReader();
        fileReader.onload = ()=>{
            let fileUrl = fileReader.result;
            //console.log(fileReader);
            //console.log(fileUrl);
            let newDiv = document.createElement('div');
            newDiv.classList.add('uploaded_image');
            let newImg = document.createElement('img');
            newImg.src = fileUrl;
            newDiv.appendChild(newImg);
            dragArea.appendChild(newDiv);
            document.getElementById('uploadText').innerHTML = 'Uploaded!!';
            extraText1.innerHTML = '';
            extraText2.innerHTML = '';
        }
        fileReader.readAsDataURL(file);
    }else{
        //alert('Your file type is not supported YA DODO!!');
        let fileName = file.name;
        let newDiv = document.createElement('div');
            newDiv.classList.add('uploaded_image');
            newDiv.innerHTML = '<i class="fas fa-5x fa-file-pdf"></i>';
            dragArea.appendChild(newDiv);
            document.getElementById('uploadText').innerHTML = `${fileName.toUpperCase()} Uploaded!!`;
            extraText1.innerHTML = '';
            extraText2.innerHTML = '';
    }
    removeHandler();
}

function removeHandler(){
    dragArea.removeEventListener('click',divClick);
    dragArea.removeEventListener('dragover',handleDragover);
    dragArea.removeEventListener('dragleave',handleDragleave);
    dragArea.removeEventListener('drop',handleDrop);
}

