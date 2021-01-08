import Layout from "../../../../components/Layout"
import AuthComponent from "../../../../components/auth/AuthComponent"
import handleAuthSSR from "../../../../actions/authSSR"
import {withRouter} from "next/router"
import React, {useEffect, useState} from "react"
import {api, apiForm} from "../../../../actions/api"
import {IMG} from "../../../../config"
import 'suneditor/dist/css/suneditor.min.css'
import dynamic from "next/dynamic"
const SunEditor = dynamic(() => import('suneditor-react'), {ssr: false})

const UpdateBlog = ({router, token}) => {
  const [visibility, setVisibility] = useState(false)
  const [editorContent, setEditorContent] = useState('')
  const [categories, setCategories] = useState([])
  const [tags, setTags] = useState([])
  const [checkedCat, setCheckedCat] = useState([])
  const [checkedTag, setCheckedTag] = useState([])
  const [values, setValues] = useState({
    formData: '',
    title: '',
    avatar: '',
    imgID: '',
    content: ''
  })
  const {formData, title, avatar, imgID} = values

  useEffect(() => {

    (async () => {
      //imgInput = document.getElementById('img-input')

      await initBlog()
      await initCategories()
      await initTags()
    })()
  }, [router])

  const initBlog = async () => {
    const slug = router.query.slug
    if (slug) {
      try {
        const res = await api('GET', `getblog/${slug}`)
        if (res.status >= 400) {
          return flash(res.message, 'danger')
        }
        setVisibility(true)
        setValues({...values, title: res.title, avatar: res.avatar, imgID: res.imgID, formData: new FormData()})
        setEditorContent(res.content)
        setCategoriesArray(res.categories)
        return setTagsArray(res.tags)
      } catch (err) {
        return flash(err.message, 'danger')
      }

    }
  }

  const setCategoriesArray = blogCategories => {
    let ca = [];
    blogCategories.map((c, i) => {
      ca.push(c._id);
    })
    setCheckedCat(ca)
  }

  const setTagsArray = blogTags => {
    let ta = [];
    blogTags.map((t, i) => {
      ta.push(t._id)
    });
    setCheckedTag(ta)
  }

  const initCategories = async () => {
    try {
      const res = await api('GET', 'category')
      if (res.status >= 400) {
        return flash(res.message, 'danger')
      }
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

  const isCatChecked = c => {
    const result = checkedCat.indexOf(c)
    return result !== -1;
  }

  const isTagChecked = c => {
    const result = checkedTag.indexOf(c)
    return result !== -1;
  }

  const showCategories = () => {
    return (
      categories && categories.map((c, i) => (
        <li key={i} className="list-unstyled">
          <label className="form-check-label" style={{cursor: 'pointer'}}>
            <input onChange={handleCatChecked(c._id)} checked={isCatChecked(c._id)} type="checkbox" className="mr-2"/>
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
            <input onChange={handleTagChecked(t._id)} checked={isTagChecked(t._id)} type="checkbox" className="mr-2"/>
            {t.name}
          </label>
        </li>
      ))
    )
  }

  const handleChange = name => async e => {
    if (avatar !== 'seo-default.webp' && name === 'avatar') {
      await deleteImage()
    }
    let value = name === 'avatar' ? e.target.files[0] : e.target.value

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

  const handleContent = e => {
    formData.set('content', e)
  }

  const updateBlog = async e => {
    e.preventDefault()
    try {
      const res = await apiForm('PATCH', `blog/${router.query.slug}`, formData, token)
      if (res.status >= 400) {
        return flash(res.message)
      }
      setValues({...values, avatar: res.avatar})
      return flash('Blog was updated.', 'success')
    } catch (err) {
      return flash(err.message)
    }
  }

  const handleImageUploadBefore = (files, info, uploadHandler) => {
    const formData = new FormData()
    formData.append('avatar', files[0])
    apiForm('POST', 'blog/images', formData, token)
      .then((res) => {
        if (res && res.status >= 400) {
          uploadHandler()
          return flash(res.message)
        }
        uploadHandler(res)
      })
  }

  const sunEditorHtml = () => (
    formData &&
    <SunEditor
      onImageUploadBefore={handleImageUploadBefore}
      setContents={editorContent}
      onChange={handleContent}
      setOptions={{
        height: 200,
        buttonList: [['undo', 'redo'],
          ['fontSize', 'formatBlock', 'align', 'bold', 'underline', 'italic'],
          ['list'], ['image'], ['link'], ['table'], ['horizontalRule'],
          ['showBlocks'], ['codeView'], ['hiliteColor'], ['fontColor'], ['fullScreen'],
          ['preview']]
      }}
    />
  )


  const blogForm = () => {
    return (
      <form onSubmit={updateBlog}>
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

  const deleteImage = async () => {
    try {
      const res = await api('POST', `blogs/delete-img/${router.query.slug}`, {imgID}, token)
      if (res.status >= 400) {
        return flash(res.message)
      }
      setValues({...values, avatar: 'seo-default.webp'})
      return console.log(res.message)
    } catch (err) {
      return flash(err.message)
    }
  }

  return (
    visibility &&
    <Layout>
      <AuthComponent>
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
                <input id="img-input" onChange={handleChange('avatar')} type="file" name="avatar"
                       accept="image/png, image/jpeg" hidden/>
              </label>
              {`${IMG}/${avatar}` === `${IMG}/seo-default.webp` ? (
                <img id="output" alt="image-preview" src={`${IMG}/${avatar}`}
                     style={{width: '70px', height: 'auto', display: 'block'}}/>
              ) : (
                <div>
                  <img id="output" alt="image-preview" src={`${IMG}/${avatar}`}
                       style={{width: '70px', height: 'auto', display: 'block'}}/>
                  <br/>
                  <button onClick={deleteImage} className="btn btn-danger btn-sm">DELETE</button>
                </div>
              )
              }
            </div>
          </div>
          <style jsx>{`
        .scroll{
          max-height: 200px;
          overflow-y: auto;
          padding-left: 10px;
        }
        .list-unstyled:hover{
          cursor: pointer;
        }
      `}</style>
        </div>
      </AuthComponent>
    </Layout>
  )

}

export async function getServerSideProps({req}) {
  return await handleAuthSSR(req)
}

export default withRouter(UpdateBlog)