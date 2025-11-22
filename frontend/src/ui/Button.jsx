export default function Button({ children, onClick, variant = "black" }) {
    const base = "px-4 py-2 rounded-xl transition-all duration-200 active:scale-[0.97] shadow-sm";
    
    const variants = {
      black: "bg-neutral-900 text-white hover:bg-neutral-800",
      grey: "bg-neutral-700 text-white hover:bg-neutral-600"
    };
  
    return (
      <button onClick={onClick} className={`${base} ${variants[variant]}`}>
        {children}
      </button>
    );
  }
  