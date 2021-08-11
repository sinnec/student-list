import React from 'react'

const TextField = ( {className, placeholder, value, onChange} ) => {
    return (
      <div className={className}>
        <input
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        />
      </div>
    )
}

export default TextField