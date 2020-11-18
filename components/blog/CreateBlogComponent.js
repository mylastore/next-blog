import React, {useState, useEffect} from 'react'
import Router, {withRouter} from 'next/router'
import {getCookie} from '../../actions/auth'
import dynamic from "next/dynamic"
import {apiForm, api} from '../../actions/api'

const SunEditor = dynamic(() => import('suneditor-react'), {ssr: false})
import 'suneditor/dist/css/suneditor.min.css'

const CreateBlog = ({router}) => {
  const [visibility, setVisibility] = useState(false)
  const [checkedCat, setCheckedCat] = useState([])
  const [checkedTag, setCheckedTag] = useState([])
  const [categories, setCategories] = useState([])
  const [tags, setTags] = useState([])
  const [values, setValues] = useState({
    formData: '',
    editorContent: '',
    title: '',
    showImg: false
  })
  const {showImg, formData, title, editorContent} = values

  useEffect(() => {
    (async () => {
      await initCategories()
      await initTags()
    })()
    setValues({...values, formData: new FormData()})
  }, [router])


  const initCategories = async () => {
    try {
      const res = await api('GET', 'category')
      if (res.status >= 400) {
        return flash(res.message, 'warning')
      }
      setVisibility(true)
      setCategories(res)
    } catch (err) {
      return flash(err.message, 'danger')
    }
  }

  const initTags = async () => {
    try {
      const res = await api('GET', 'tag')
      if (res.status >= 400) {
        return flash(res.message, 'danger')
      }
      setTags(res)
    } catch (err) {
      return flash(err.message, 'danger')
    }
  }

  const handleChange = name => e => {
    const value = name === 'avatar' ? e.target.files[0] : e.target.value
    formData.set('isForm', 'isForm')
    formData.set(name, value)
    setValues({...values, [name]: value, formData})

    if (e.target.files) {
      setValues({...values, showImg: true})
      let reader = new FileReader();
      reader.onload = function () {
        const output = document.getElementById('output');
        output.src = reader.result;
      }
      reader.readAsDataURL(e.target.files[0])
    }
  }

  const handleCatChecked = c => () => {
    const check = checkedCat.indexOf(c)
    const all = [...checkedCat]

    if (check === -1) {
      all.push(c)
    } else {
      all.splice(check, 1)
    }
    setCheckedCat(all)
    formData.set('categories', all)
  }

  const handleTagChecked = t => () => {
    const check = checkedTag.indexOf(t)
    const all = [...checkedTag]

    if (check === -1) {
      all.push(t)
    } else {
      all.splice(check, 1)
    }
    setCheckedTag(all)
    formData.set('tags', all)
  }

  const showCategories = () => {
    return (
      categories && categories.map((c, i) => (
        <li key={i} className="list-unstyled">
          <label className="form-check-label" style={{cursor: 'pointer'}}>
            <input onChange={handleCatChecked(c._id)} type="checkbox" className="mr-2"/>
            {c.name}
          </label>
        </li>
      ))
    )
  }

  const showTags = () => {
    return (
      tags && tags.map((t, i) => (
        <li key={i} className="list-unstyled">
          <label className="form-check-label" style={{cursor: 'pointer'}}>
            <input onChange={handleTagChecked(t._id)} type="checkbox" className="mr-2"/>
            {t.name}
          </label>
        </li>
      ))
    )
  }

  const saveBlog = async e => {
    e.preventDefault()
    try {
      const res = await apiForm('POST', 'blog', formData, getCookie('token'))
      if (res.status >= 400) {
        return flash(res.message, 'danger')
      }
      setValues({
        ...values,
        showImg: false,
        title: '',
        formData: '',
        editorContent: ''
      })
      await Router.push(`/admin/preview/${res.slug}`)
    } catch (err) {
      return flash(err.message, 'danger')
    }
  }

  const handleContent = e => {
    formData.set('content', e)
  }

  const handleImageUploadBefore = (files, info, uploadHandler) => {
    const formData = new FormData()
    formData.append('avatar', files[0])
    apiForm('POST', 'blog/images', formData, getCookie('token'))
      .then((res)=>{
        if (res && res.status >= 400) {
          uploadHandler()
          return flash(res.message)
        }
        uploadHandler(res)
      })
      .catch((err)=>{
        return flash(err)
      })
  }

  const sunEditorHtml = () => {
    return <SunEditor
      onImageUploadBefore={handleImageUploadBefore}
      placeholder={'Write something amazing...'}
      setContents={editorContent}
      onChange={handleContent}
      setOptions={{
        height: 250,
        buttonList: [['undo', 'redo'],
          ['fontSize', 'formatBlock', 'align', 'bold', 'underline', 'italic'],
          ['list'], ['image'], ['link'], ['table'], ['horizontalRule'],
          ['showBlocks'], ['codeView'], ['hiliteColor'], ['fontColor'], ['fullScreen'],
          ['preview']]
      }}

    />
  }

  const blogForm = () => {
    return (
      <form onSubmit={saveBlog} className={'mb-4 mt-4'}>
        <div className="form-group">
          <label className="text-muted">Title</label>
          <input type="text" className="form-control" value={title} onChange={handleChange('title')}/>
        </div>
        <div className="form-group">
          {sunEditorHtml()}
        </div>
        <div>
          <button type="submit" className="btn btn-primary">Publish</button>
        </div>
      </form>
    )
  }

  return (
    visibility &&
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-8">
          {blogForm()}
        </div>
        <div className="col-md-4">
          <h5>Categories</h5>
          <ul className='scroll'>{showCategories()}</ul>
          <hr/>
          <h5>Tags</h5>
          <ul className='scroll'>{showTags()}</ul>
          <hr/>
          <h5>Feature Image</h5>
          <p><small className="text-muted">Max size 5mb</small></p>
          <label className="btn btn-outline-info">
            Upload Image
            <input onChange={handleChange('avatar')} type="file" name="avatar" accept="image/png, image/jpeg image/webp"
                   hidden/>
          </label>
          <br/>
          <img id="output" alt="image-preview" style={{width: '100px', height: 'auto', display: showImg ? '' : 'none'}}/>
        </div>
      </div>

      <style jsx>{`
        .scroll{
          max-height: 200px;
          overflow-y: auto;
          padding-left: 10px;
        }
      `}</style>

    </div>
  )
}

export default withRouter(CreateBlog)