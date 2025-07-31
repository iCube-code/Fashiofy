import "./Spinner.css"

function Spinner({ size = 25 }) {
    return (
        <div className='spinner' style={{
            width: `${size}px`,
            height: `${size}px`
        }}>
        </div>
    )
}

export default Spinner