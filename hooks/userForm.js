import {useState} from "react"

export const useForm = initialValues => {
  const [userValues, userChange] = useState(initialValues)

  return [userValues, e => {
    userChange({
      ...userValues,
      [e.target.name]: e.target.value
    })
  }]

}