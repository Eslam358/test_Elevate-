export const PageLayout = ({ children, title }) => (
    <div className="min-h-screen bg-cover bg-center flex items-center justify-center p-4" 
         style={{ backgroundImage: "url('https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1600')" }}>
      <div className="w-full max-w-4xl bg-white/70 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden flex flex-col h-[85vh]">
        <div className="bg-[#4A5C6A] p-4 text-center">
          <h1 className="text-white font-bold text-sm tracking-widest uppercase">{title}</h1>
        </div>
        {children}
      </div>
    </div>
  );