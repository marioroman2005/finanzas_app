import clsx from 'clsx';

const Card = ({ children, className, ...props }) => {
    return (
        <div
            className={clsx(
                'bg-white rounded-xl shadow-sm border border-gray-100 p-6',
                className
            )}
            {...props}
        >
            {children}
        </div>
    );
};

export default Card;
