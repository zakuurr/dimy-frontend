/* eslint-disable react/prop-types */

function Button({className = '', children, type = 'button', ...props}) {
  return (
    <button
        {...props}
        className={
             className
        }
        type={type}
    >
        {children}
    </button>
  )
}

export default Button;