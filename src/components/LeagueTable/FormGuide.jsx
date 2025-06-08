const FormGuide = ({ form }) => (
  <div className="flex justify-center items-center gap-1">
    {form.map((result, i) => {
      const color = result === 'W' ? 'bg-green-500' : result === 'L' ? 'bg-red-500' : 'bg-gray-400';
      return <span key={i} className={`block w-3 h-3 rounded-full ${color}`} title={result}></span>
    })}
  </div>
);

export default FormGuide;
