import '../styles/loginPage.css'


const Input = (props: any) => {
    const { type, placeHolder, value, onChange} = props;
    return (
        <input 
            className='input'
            type= {type} 
            placeholder= {placeHolder} 
            value={value}
            onChange={onChange}
            />
    );
}

export default Input;