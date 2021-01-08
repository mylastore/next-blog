import React, {useState, useEffect} from 'react'
import {api} from '../../../actions/api'
import Layout from "../../../components/Layout";
import AuthComponent from "../../../components/auth/AuthComponent"
import handleAuthSSR from "../../../actions/authSSR"
import {Form, Formik} from 'formik'
import {CategoryTagSchema} from "../../../actions/schemas"
import {FormInput} from "../../../components/Form"

const Tag = ({token}) => {
  const [tagValues, setTagValues] = useState({
    tags: [],
    reload: false
  })

  const {tags, reload} = tagValues

  useEffect(() => {
    (async () => {
      await getTags()
    })()
  }, [reload]);

  const getTags = async () => {
    try {
      const res = await api('GET', 'tag',)
      if (res.status >= 400) {
        return flash(res.message, 'danger')
      }
      return setTagValues({...tagValues, tags: res})
    } catch (err) {
      return flash(err.message, 'danger')
    }
  }

  const showTags = () => {
    return tags.map((t, i) => {
      return (
          <span
            onDoubleClick={() => deleteConfirm(t.slug)}
            title="Double click to delete"
            key={i}
            className="btn btn-outline-primary btn-sm mt-1 mr-1"
          >
            {t.name}
          </span>
      )
    })
  }

  const deleteConfirm = async slug => {
    if (window.confirm('Are you sure you want to delete this tag?')) {
      await deleteTag(slug)
    }
  }

  const deleteTag = async slug => {
    try {
      const res = await api('DELETE', `tag/${slug}`, {}, token)
      if (res.status >= 400) {
        return flash(res.message, 'danger')
      }
      setTagValues({...tagValues, reload: !reload})
      return flash(res.message, 'success')
    } catch (err) {
      return flash(err.message, 'danger')
    }
  }

  const createTag = async values => {
    try {
      const res = await api("POST", "tag", values, token)
      if (res.status >= 400) {
        return flash(res.message, 'danger')
      }
      setTagValues({...tagValues, reload: !reload})
      return flash("Tag created successfully.", "success")
    } catch (err) {
      return flash(err.message, 'danger')
    }
  }

  const newTagFom = () => (
    <Formik
      initialValues={{name: ''}}
      validationSchema={CategoryTagSchema}
      onSubmit={async (values, actions) => {
        await createTag(values)
        actions.resetForm({
          values: {name: ''}
        })
      }}
    >
      <Form>
        <FormInput name="name" type="text" label="Tag Name"/>
        <button type="submit" className={'btn btn-primary'}>Create</button>
      </Form>
    </Formik>
  )

  return (
    <Layout>
      <section>
        <div className="container-fluid">
          <AuthComponent>
            <div className="row">
              <div className="col-md-6">
                {newTagFom()}
              </div>
              <div className="col-md-6">
                {tags.length > 0 && (
                  <p className="alert alert-info mt-2"><span className="symbol">&#33; </span>Double click on a tag to delete it</p>
                )}
                <style jsx>{`
                  .symbol{
                    font-weight: bold;
                    color: inherit;
                    margin-right: 2px;    
                  }        
                `}</style>
                {showTags()}
              </div>
            </div>
          </AuthComponent>
        </div>
      </section>
    </Layout>
  )
}

export async function getServerSideProps({req}) {
  return await handleAuthSSR(req)
}

export default Tag;
