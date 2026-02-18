import clsx from 'clsx';

const Input = ({ label, error, className, ...props }) => {
    return (
        <div className={className}>
            {label && (
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    {label}
                </label>
            )}
            <input
                className={clsx(
                    'w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-colors',
                    {
                        'border-red-500 focus:border-red-500 focus:ring-red-500': error,
                    }
                )}
                {...props}
            />
            {error && <p className="mt-1 text-xs text-danger">{error}</p>}
        </div>
    );
};

export default Input;
