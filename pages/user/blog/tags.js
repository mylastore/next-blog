import { useState, useEffect } from 'react'
import {api} from '../../../actions/api'
import Layout from "../../../components/Layout";
import AuthComponent from "../../../components/auth/AuthComponent";
import handleAuthSSR from "../../../actions/authSSR";

const Tag = ({token}) => {
  const [visibility, setVisibility] = useState(false)
  const [values, setValues] = useState({
    name: '',
    tags: [],
    reload: false,
    gotTags: false
  });

  const { name, tags, reload, gotTags } = values;

  useEffect(() => {
    (async ()=> {
      await getTags()
    })()
   }, [reload]);

  const getTags = async () => {
    try{
      const res = await api('GET', 'tag',)
      if(res.status >= 400){
        return flash(res.message, 'danger')
      }
      setVisibility(true)
      return setValues({ ...values, tags: res, gotTags: res.length > 0 })
    }catch (err){
      return flash(err.message, 'danger')
    }
  }

  const showTags = () => {
    return tags.map((t, i) => {
      return (
        <button
          onDoubleClick={() => deleteConfirm(t.slug)}
          title="Double click to delete"
          key={i}
          className="btn btn-outline-primary mr-1 ml-1 mt-3"
        >
          {t.name}
        </button>
      )
    })
  }

  const deleteConfirm = async slug => {
    if (window.confirm('Are you sure you want to delete this tag?')) {
      await deleteTag(slug)
    }
  }

  const deleteTag = async slug => {
    try{
      const res = await api('DELETE', `tag/${slug}`, {}, token)
      if(res.status >= 400){
        return flash(res.message, 'danger')
      }
      setValues({ ...values, name: '', reload: !reload })
      return flash(res.message, 'success')
    }catch (err){
      return flash(err.message, 'danger')
    }
  }

  const createTag = async e => {
    e.preventDefault();
    try{
      const res = await api("POST", "tag", { name }, token)
      if(res.status >= 400){
        return flash(res.message, 'danger')
      }
      setValues({ ...values, name: '', reload: !reload, gotTags: res.length > 0})
      return flash("Tag created successfully.", "success")
    }catch (err){
    return flash(err.message, 'danger')
    }

  }

  const handleChange = e => {
    flash('')
    setValues({ ...values, name: e.target.value, removed: '' });
  };

  const newTagFom = () => (
    <form onSubmit={createTag}>
      <div className="form-group">
        <label className="text-muted">Name</label>
        <input type="text" className="form-control" onChange={handleChange} value={name} required />
      </div>
      <div>
        <button type="submit" className="btn btn-primary">
          Create
        </button>
      </div>
      <br/>
      {gotTags && (
      <p className="alert alert-info"><i className="fas fa-info-circle"> </i>&nbsp; Double click on a tag to delete it.</p>
      )}
    </form>
  );

  return (
    visibility &&
    <Layout>
      <section>
        <div className="container-fluid">
          <AuthComponent>
        {newTagFom()}
        {showTags()}
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