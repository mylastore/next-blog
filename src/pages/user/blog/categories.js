import {useState, useEffect} from 'react'
import {api} from '../../../actions/api'
import Layout from "../../../components/Layout";
import AuthComponent from "../../../components/auth/AuthComponent";
import handleAuthSSR from "../../../actions/authSSR";

const Category = ({token}) => {
  const [visibility, setVisibility] = useState(false)
  const [values, setValues] = useState({
    name: '',
    categories: [],
    reload: false,
    gotCategories: false
  });

  const {name, categories, reload, gotCategories} = values;

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
      setVisibility(true)
      return setValues({...values, categories: res, gotCategories: res.length > 0})

    } catch (err) {
      return flash(err.message, 'danger')
    }

  }

  const showCategories = () => {
    return categories.map((c, i) => {
      return (
        <button
          onDoubleClick={() => deleteConfirm(c.slug)}
          title="Double click to delete"
          key={i}
          className="btn btn-outline-primary mr-1 ml-1 mt-3"
        >
          {c.name}
        </button>
      );
    });
  };
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
      setValues({...values, name: '', reload: !reload})
      return flash(res.message, 'success')
    } catch (err) {
      return flash(err.message, 'danger')
    }

  }

  const createCategory = async e => {
    e.preventDefault();
    try {
      const res = await api("POST", "category", {name}, token)
      if (res.status >= 400) {
        return flash(res.message, 'danger')
      }
      setValues({...values, name: '', reload: !reload})
      return flash('Category was created.', 'success')
    } catch (err) {
      return flash(err.message, 'danger')
    }
  }

  const handleChange = e => {
    flash('')
    setValues({...values, name: e.target.value});
  };

  const newCategoryFom = () => (
    <form onSubmit={createCategory}>
      <div className="form-group">
        <label className="text-muted">Name</label>
        <input type="text" className="form-control" onChange={handleChange} value={name} required/>
      </div>
      <div>
        <button type="submit" className="btn btn-primary">
          Create
        </button>
      </div>
      <br/>
      {gotCategories && (
        <p className="alert alert-info"><i className="fas fa-info-circle"> </i>&nbsp; Double click on a category to
          delete it.</p>
      )}
    </form>
  );

  return (
    visibility &&
    <Layout>
      <section>
        <div className="container-fluid">
          <AuthComponent>
            {newCategoryFom()}
            {showCategories()}
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