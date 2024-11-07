import '../styles/loginPage.css'

const Button = ({type,text}: any) => {
    
    return(
        <button className='buttonStyle' type={type}> {text}</button>
    );
}

export default Button;