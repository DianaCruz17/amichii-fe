function Title({ size, text }) {
  const sizeClasses = {
    2: 'text-2xl p-2 text-center',
    4: 'text-6xl p-2 text-center text-cyan-700',
    default: 'text-xl p-2 text-center',
  };

  const classesToApply = sizeClasses[size] || sizeClasses['default'];
  return <p className={classesToApply}>{text}</p>;
}

export default Title;
