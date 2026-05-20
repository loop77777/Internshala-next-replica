export default function InternshipCard({ item }) {
  return (
    <article className="card">
      <h3>{item.title}</h3>
      <p className="company">{item.company}</p>

      {/* Keep primary internship details grouped for quick scanning. */}
      <div className="meta">
        <span>{item.location}</span>
        <span>{item.duration ? `${item.duration} months` : "Duration not specified"}</span>
        <span>{item.stipendText}</span>
      </div>

      <div className="footer">
        <span>{item.postedLabel}</span>
      </div>
    </article>
  );
}