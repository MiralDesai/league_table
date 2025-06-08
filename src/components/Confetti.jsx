const Confetti = () => {
  const confettiCount = 150;
  const colors = ['#f44336', '#e91e63', '#9c27b0', '#673ab7', '#3f51b5', '#2196f3', '#03a9f4', '#00bcd4', '#009688', '#4caf50', '#ffeb3b', '#ffc107', '#ff9800'];

  return (
    <>
      <style>
        {`
            @keyframes fall {
              0% { 
                transform: translateY(-20vh) translateX(var(--x-start)) rotate3d(var(--r-axis-x), var(--r-axis-y), var(--r-axis-z), 0deg);
                opacity: 0; 
              }
              10% { opacity: 1; }
              90% { opacity: 1; }
              100% { 
                transform: translateY(120vh) translateX(var(--x-end)) rotate3d(var(--r-axis-x), var(--r-axis-y), var(--r-axis-z), 720deg); 
                opacity: 0;
              }
            }
            .confetti-piece {
              position: absolute;
              opacity: 0;
              animation: fall ease-in forwards infinite;
            }
          `}
      </style>
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-50 overflow-hidden">
        {Array.from({ length: confettiCount }).map((_, index) => {
          const style = {
            left: `${Math.random() * 100}%`,
            width: `${Math.random() * 8 + 6}px`,
            height: `${Math.random() * 10 + 10}px`,
            backgroundColor: colors[Math.floor(Math.random() * colors.length)],
            borderRadius: `${Math.random() > 0.5 ? '50%' : '0'}`,
            '--x-start': `${Math.random() * 20 - 10}vw`,
            '--x-end': `${Math.random() * 20 - 10}vw`,
            '--r-axis-x': Math.random(),
            '--r-axis-y': Math.random(),
            '--r-axis-z': Math.random(),
            animationDuration: `${Math.random() * 3 + 5}s`,
            animationDelay: `${Math.random() * 5}s`,
          };
          return <div key={index} className="confetti-piece" style={style}></div>;
        })}
      </div>
    </>
  );
};

export default Confetti;
