import clsx from 'clsx';

const Button = ({ children, variant = 'primary', className, ...props }) => {
    return (
        <button
            className={clsx('btn', {
                'btn-primary': variant === 'primary',
                'btn-secondary': variant === 'secondary',
                'btn-danger': variant === 'danger',
            }, className)}
            {...props}
        >
            {children}
        </button>
    );
};

export default Button;
