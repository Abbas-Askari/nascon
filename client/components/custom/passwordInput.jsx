import { useState } from "react"
import { EyeNoneIcon, EyeOpenIcon } from "@radix-ui/react-icons";
import { Input } from "../ui/input";

export const PasswordInput = ({placeholder, field, ...props}) => {
  const [show, setShow] = useState(false)
  return (
    <Input {...props} type={`${show ? "text": "password"}`} placeholder={placeholder} {...field} 
    icon={show ? <EyeOpenIcon onClick={() => setShow(!show)}/> : <EyeNoneIcon onClick={() => setShow(!show)}/>}/>
  )
}
