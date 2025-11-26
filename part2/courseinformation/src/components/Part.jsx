

const Part = ({parts}) => {
    console.log("parts data in Part: ", parts)

    return <p key={parts.id}>{parts.name} {parts.exercises}</p>

}

export default Part