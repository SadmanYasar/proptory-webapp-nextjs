interface ButtonProps {
    type: 'submit' | 'button';
    text: string;
    disabled?: boolean;
    onClick?: () => void;
}

const Button = ({ type, text, disabled, onClick }: ButtonProps) => {
    if (type === 'submit') {
        return (
            <button className='w-full py-4 bg-pink-650 rounded-lg text-center text-xl text-white' type={type} disabled={disabled}>{text}</button>
        )
    }

    return (
        <button className='w-full py-4 bg-pink-650 rounded-lg text-center text-xl text-white' type={type} disabled={disabled} onClick={onClick}>{text}</button>
    )
}

export default Button;