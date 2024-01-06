import { forwardRef } from "react"


const ChildComponent = forwardRef(function ChildComponent(props,ref) {
  return (
    <div ref={ref} >id : {props.name}</div>
  )
})

export default ChildComponent