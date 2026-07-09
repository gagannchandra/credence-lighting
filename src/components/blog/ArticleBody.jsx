export default function ArticleBody({ blocks }) {
  if (!blocks || !Array.isArray(blocks)) return null;

  return (
    <div className="max-w-none">
      {blocks.map((block, index) => {
        switch (block.type) {
          case "paragraph":
            return (
              <p key={index} className="mb-6 text-white/70 text-lg leading-relaxed">
                {block.content}
              </p>
            );
          case "heading2":
            return (
              <h2 
                key={index} 
                id={block.content.toLowerCase().replace(/[^a-z0-9]+/g, '-')} 
                className="text-fluid-h2 font-serif text-[#c8a96b] mt-12 mb-6"
              >
                {block.content}
              </h2>
            );
          case "heading3":
            return (
              <h3 
                key={index} 
                id={block.content.toLowerCase().replace(/[^a-z0-9]+/g, '-')} 
                className="text-2xl md:text-3xl font-serif text-[#c8a96b] mt-10 mb-4"
              >
                {block.content}
              </h3>
            );
          case "quote":
            return (
              <blockquote key={index} className="border-l-4 border-[#c8a96b] pl-6 my-10 italic text-xl md:text-2xl font-serif text-white/90">
                "{block.content}"
              </blockquote>
            );
          case "callout":
            return (
              <div key={index} className="bg-[#c8a96b]/10 border border-[#c8a96b]/30 p-6 rounded-xl my-8">
                <p className="text-[#c8a96b] m-0 font-medium text-lg">{block.content}</p>
              </div>
            );
          case "image":
            return (
              <figure key={index} className="my-10">
                <img src={block.url} alt={block.caption || ""} className="w-full rounded-2xl" />
                {block.caption && (
                  <figcaption className="text-center text-sm text-white/50 mt-3">{block.caption}</figcaption>
                )}
              </figure>
            );
          case "list":
            return (
              <ul key={index} className="list-disc list-inside mb-6 text-white/70 text-lg leading-relaxed space-y-2">
                {block.items.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            );
          case "table":
            return (
              <div key={index} className="overflow-x-auto mb-8 border border-white/10 rounded-xl">
                <table className="w-full text-left text-white/80">
                  <thead className="bg-white/5 border-b border-white/10">
                    <tr>
                      {block.headers.map((header, i) => (
                        <th key={i} className="px-6 py-4 font-serif text-[#c8a96b]">{header}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {block.rows.map((row, i) => (
                      <tr key={i} className="border-b border-white/5 last:border-0 hover:bg-white/[0.02]">
                        {row.map((cell, j) => (
                          <td key={j} className="px-6 py-4">{cell}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );
          default:
            return null;
        }
      })}
    </div>
  );
}
