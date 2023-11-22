import './style.scss'

const Logo = ({width}: {width: number}) => {
    console.log(width)
    return(
        <div className="logo" style={{width: `${width}%`}}></div>
    )
}

export default Logo