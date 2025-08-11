const testimonials = [
  {
    name: "John Doe",
    feedback: "GitTrek changed how I track my GitHub projects!",
  },
  {
    name: "Jane Smith",
    feedback: "Super useful for managing multiple repositories.",
  },
];

export default function Testimonials() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center text-white mb-12">
          What Developers Say
        </h2>
        <div className="space-y-12">
          {testimonials.map((t, index) => (
            <div
              key={index}
              className="flex flex-col md:flex-row rounded-xl border border-slate-800 shadow-lg overflow-hidden"
            >
              <div className="p-8 flex flex-col justify-center md:w-2/3 text-left">
                <p className="text-lg text-white italic">{t.feedback}</p>
                <h3 className="mt-4 text-xl font-semibold text-white">
                  {t.name}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
