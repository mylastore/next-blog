import React from 'react'
import dynamic from 'next/dynamic'

const SunEditor = dynamic(() => import('suneditor-react'), {ssr: false})
import 'suneditor/dist/css/suneditor.min.css'

const SunEditorComponent = () => {

  function ResizeImage (files, uploadHandler) {
    const uploadFile = files[0];
    console.log('uploadFile????', uploadFile)
    const img = document.createElement('img');
    const canvas = document.createElement('canvas');
    const reader = new FileReader();

    reader.onload = function (e) {
      img.src = e.target.result
      img.onload = function () {
        let ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0);

        const MAX_WIDTH = 400;
        const MAX_HEIGHT = 200;
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > MAX_WIDTH) {
            height *= MAX_WIDTH / width;
            width = MAX_WIDTH;
          }
        } else {
          if (height > MAX_HEIGHT) {
            width *= MAX_HEIGHT / height;
            height = MAX_HEIGHT;
          }
        }

        canvas.width = width;
        canvas.height = height;

        ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, width, height);

        canvas.toBlob(function (blob) {

          uploadHandler([new File([blob], uploadFile.name)])
        }, uploadFile.type, 1);
      }
    }

    reader.readAsDataURL(uploadFile);
  }

  return <SunEditor

    setOptions={{
      height: 200,
      buttonList: [['undo', 'redo'],
        ['fontSize', 'formatBlock', 'align', 'bold', 'underline', 'italic'],
        ['list'], ['image'], ['video'], ['link'], ['table'], ['horizontalRule'],
        ['showBlocks'], ['codeView'], ['hiliteColor'], ['fontColor'], ['fullScreen'],
        ['preview']]
    }}

  />

}

export default SunEditorComponent