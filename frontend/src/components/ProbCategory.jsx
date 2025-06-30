const ProbCategory = ({ label, isActive, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={`h-[50%] flex justify-center items-center text-white text-md w-fit px-3 py-0.5 min-w-[5rem] rounded-[50%] border-2 border-[#c267ffbc] shadow-2xl bg-white/20 backdrop-blur-md
        ${isActive ? 'border-yellow-400' : ''} cursor-pointer`}
    >
      <h1>{label}</h1>
    </div>
  );
};

export default ProbCategory;
