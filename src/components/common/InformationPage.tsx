export default function InformationPage({ text }: { text: string }) {
  return (
    <section className="w-pageWidth h-full p-12">
      <div className="pb-4 mb-8 border-b border-gray-800">
        <h2 className="text-white text-3xl mb-4">{text}</h2>
      </div>
    </section>
  );
}
