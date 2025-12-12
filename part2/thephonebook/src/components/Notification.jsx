
const Notification = ({message}) => {
    if (message === null) {
        return null
    }

    console.log(message)

    let styleNotif = ''

    if (message.includes('added') || message.includes('updated')) {
        styleNotif = 'addUpdate'
    }
    
    if (message.includes('removed') || message.includes('failed')  ){
        styleNotif = 'error'
    }

  

    return (
        <div className={styleNotif}>
            {message}
        </div>
    )
}


export default Notification