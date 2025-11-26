
import Content from "./Content"
import Header from "./Header"

const Course = ({course}) => {
    console.log("Course file props: ", course.name)
    return (
      <>
    
        <Header course={course.name} />
        <Content parts={course.parts}/>
     
      </>
    )

}

export default Course