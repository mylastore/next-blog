import React, {useState, useEffect} from 'react'
import {api} from '../../../actions/api'
import Layout from "../../../components/Layout";
import AuthComponent from "../../../components/auth/AuthComponent"
import handleAuthSSR from "../../../actions/authSSR"
import {Form, Formik} from 'formik'
import {CategoryTagSchema} from "../../../actions/schemas"
import {FormInput} from "../../../components/Form"

const Category = ({token}) => {
  const [categoryValues, setCategoryValues] = useState({
    categories: [],
    reload: false
  });

  const {categories, reload} = categoryValues;

  useEffect(() => {
    (async () => {
      await getCategories()
    })()
  }, [reload])

  const getCategories = async () => {
    try {
      const res = await api('GET', 'category')
      if (res.status >= 400) {
        return flash(res.message, 'danger')
      }
      return setCategoryValues({...categoryValues, categories: res})

    } catch (err) {
      return flash(err.message, 'danger')
    }

  }

  const showCategories = () => {
    return categories.map((c, i) => {
      return (
          <span
            onDoubleClick={() => deleteConfirm(c.slug)}
            title="Double click to delete"
            key={i}
            className="btn btn-outline-primary btn-sm mt-1 mr-1"
          >
            {c.name}
          </span>
      )
    })
  }

  const deleteConfirm = async slug => {
    if (window.confirm('Are you sure you want to delete this category?')) {
      await deleteCategory(slug);
    }
  };

  const deleteCategory = async slug => {
    try {
      const res = await api('DELETE', `category/${slug}`, {}, token)
      if (res.status >= 400) {
        return flash(res.message, 'danger')
      }
      setCategoryValues({...categoryValues, reload: !reload})
      return flash(res.message, 'success')
    } catch (err) {
      return flash(err.message, 'danger')
    }

  }

  const createCategory = async values => {
    try {
      const res = await api("POST", "category", values, token)
      if (res.status >= 400) {
        return flash(res.message, 'danger')
      }
      setCategoryValues({...categoryValues, reload: !reload})
      return flash('Category was created.', 'success')
    } catch (err) {
      return flash(err.message, 'danger')
    }
  }

  const newCategoryFom = () => (
    <Formik
      initialValues={{name: ''}}
      validationSchema={CategoryTagSchema}
      onSubmit={async (values, actions) => {
        await createCategory(values)
        actions.resetForm({
          values: {name: ''}
        })
      }}
    >
      <Form>
        <FormInput name="name" type="text" label="Category Name"/>
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
                {newCategoryFom()}
              </div>
              <div className="col-md-6">
                {categories.length > 0 && (
                  <p className="alert alert-info mt-2"> <span
                    className="symbol">&#33; </span>Double click on a category to delete it</p>
                )}
                <style jsx>{`
                  .symbol{
                    font-weight: bold;
                    color: inherit;
                    margin-right: 2px;    
                  }        
                `}</style>
                {showCategories()}
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

export default Category;
