import Layout from "../../../components/Layout"
import React, {useState, useEffect} from 'react'
import Router, {withRouter} from 'next/router'
import {apiForm, api} from '../../../actions/api'
import 'suneditor/dist/css/suneditor.min.css'
import handleAuthSSR from "../../../actions/authSSR"
import AuthComponent from "../../../components/auth/AuthComponent"
import dynamic from "next/dynamic"
import {Form, Formik} from 'formik'
import {FormCheckbox, FormInput} from "../../../components/Form"
import * as Yup from "yup";

const SunEditor = dynamic(() => import('suneditor-react'), {ssr: false})

const CreateBlog = ({token, router}) => {
  const [categories, setCategories] = useState([])
  const [tags, setTags] = useState([])
  const [formValues, setFormValues] = useState({
    formData: '',
    editorContent: '',
    showImg: false
  })
  const {showImg, formData, editorContent} = formValues

  useEffect(() => {
    (async () => {
      await initCategories()
      await initTags()
    })()
    setFormValues({...formValues, formData: new FormData()})
  }, [router])


  const initCategories = async () => {
    try {
      const res = await api('GET', 'category')
      if (res.status >= 400) {
        return flash(res.message, 'warning')
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

  const handleFeatureImage = name => e => {
    const value = name === 'avatar' ? e.target.files[0] : e.target.value
    formData.set(name, value)
    //setValues({...values, [name]: value, formData})

    if (e.target.files) {
      setFormValues({...formValues, showImg: true})
      let reader = new FileReader();
      reader.onload = function () {
        const output = document.getElementById('output');
        output.src = reader.result;
      }
      reader.readAsDataURL(e.target.files[0])
    }
  }

  const saveBlog = async () => {
    try {
      const res = await apiForm('POST', 'blog', formData, token)
      if (res.status >= 400) {
        return flash(res.message, 'danger')
      }
      setFormValues({
        ...formValues,
        showImg: false,
        formData: '',
        editorContent: ''
      })
      await Router.push(`/user/preview/${res.slug}`)
    } catch (err) {
      return flash(err, 'danger')
    }
  }

  const handleContent = e => {
    formData.set('content', e)
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
      .catch((err) => {
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
      <div>
        <Formik
          enableReinitialize={true}
          initialValues={{title: '', published: false, categories: [], tags: []}}
          validationSchema={
            Yup.object().shape({
              title: Yup.string().min(2).max(60).required('Required')
            })
          }
          onSubmit={async (values, actions) => {
            await formData.set('published', values.published)
            await formData.set('tags', values.tags)
            await formData.set('categories', values.categories)
            await formData.set('title', values.title)

            const res = await saveBlog()
            if (res.status <= 400) {
              actions.resetForm({
                values: {title: '', categories: [], tags: []}
              })
            }
          }}
        >
          {({values}) => (
            <Form className={'mb-4 mt-4'}>
              <div className="row">
                <div className="col-md-8">
                  <FormInput name="title" type="text" label="Title"/>
                  <div className="form-group">
                    {sunEditorHtml()}
                  </div>
                  <FormCheckbox name="published" id="published">Published</FormCheckbox>
                  {`${values.published}`}
                </div>
                <div className="col-md-4">
                  <h5>Categories</h5>
                  <hr/>
                  <div className="scroll mb-2">
                    {categories && categories.map((c, i) => (
                      <FormCheckbox key={i} name="categories" id={c._id} value={c._id}>{c.name}</FormCheckbox>
                    ))
                    }
                  </div>
                  <h5>Tags</h5>
                  <hr/>
                  <div className="scroll">
                    {tags && tags.map((t, i) => (
                      <FormCheckbox key={i} name="tags" id={t._id} value={t._id} >{t.name}</FormCheckbox>
                    ))
                    }
                  </div>
                  <hr/>
                  <h5>Feature Image</h5>
                  <p><small className="text-muted">Max size 5mb</small></p>
                  <label className="btn btn-outline-info">
                    Select Image
                    <input onChange={handleFeatureImage('avatar')} type="file" name="avatar"
                           accept="image/png, image/jpeg image/webp"
                           hidden/>
                  </label>
                  <br/>
                  <img id="output" alt="image-preview"
                       style={{width: '100px', height: 'auto', display: showImg ? '' : 'none'}}/>
                </div>
              </div>
              <button type="submit" className={'btn btn-primary'}>Save</button>
            </Form>
          )}
        </Formik>
      </div>
    )
  }

  return (
    <Layout>
      <section>
        <div className="container-fluid">
          <AuthComponent>
            {categories.length > 0 && tags.length > 0 ?
              <div>
                <h2>Create Blog</h2>
                <div className="container-fluid">
                  {blogForm()}
                  <style jsx>{`
                .scroll{
                  max-height: 200px;
                  overflow-y: auto;
                  padding-left: 10px;
                }
              `}</style>
                </div>
              </div>
              :
              <div><strong>No categories or tags found!</strong> <br/>Create a category and tag in order to create your
                first blog.</div>
            }
          </AuthComponent>
        </div>
      </section>
    </Layout>
  )
}

export async function getServerSideProps({req}) {
  return await handleAuthSSR(req)
}

export default withRouter(CreateBlog)
