import clsx from 'clsx';

const Input = ({ label, error, className, ...props }) => {
    return (
        <div className={className}>
            {label && <label className="label">{label}</label>}
            <input
                className={clsx('input', {
                    'border-danger': error,
                })}
                {...props}
            />
            {error && <span className="text-error">{error}</span>}
        </div>
    );
};

export default Input;
