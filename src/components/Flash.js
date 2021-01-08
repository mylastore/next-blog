import React, {useEffect, useState} from 'react'
import Bus from '../actions/bus'

const Flash = () => {
  let [visibility, setVisibility] = useState(false);
  let [message, setMessage] = useState('');
  let [type, setType] = useState('');

  useEffect(() => {
    Bus.on('flash', ({message, type}) => {
      if(message === ''){
        return setVisibility(false)
      }
      setVisibility(true);
      setMessage(message);
      setType(type);
    });

  }, []);

  useEffect(() => {
    if (document.querySelector('.close') !== null) {
      document.querySelector('.close').addEventListener('click', () => {
        setVisibility(false)
      })
    }

  },)

  return (
    visibility &&
      <div className={`alert alert-${type} alert-dismissible fade show message`} role={type}>
        {message}
        <button type="button" className="close" data-dismiss="alert" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
    </div>
  )
}

export default Flash
