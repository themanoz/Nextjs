export default function Demo() {
  return (
    <section id="demo" className="py-10 sm:py-20 md:py-32 container text-center">
      <div className="max-w-4xl mx-auto place-items-center px-4 sm:px-6 lg:px-8">
        <h2 className="text-lg sm:text-xl md:text-2xl lg:text-4xl font-semibold w-full sm:w-3/4 md:w-2/5 mx-auto">
          See GitTrek in Action
        </h2>
        <p className="mt-2 text-xs sm:text-sm md:text-base lg:text-lg font-normal w-full sm:w-3/4 md:w-2/3 lg:w-full mx-auto text-muted-foreground">
          Watch a quick demo to discover how GitTrek can streamline your workflow.
        </p>

        <div className="mt-8 flex justify-center">
          <div className="w-full max-w-md sm:max-w-lg md:max-w-2xl aspect-video rounded-xl overflow-hidden border shadow-lg">
            <iframe
              src="https://www.youtube.com/embed/your-demo-video"
              title="GitTrek Demo"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
