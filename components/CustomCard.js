export default function CustomCard({ title, component }) {
  return (
    <div className="home-card">
      <h3 className="card-title">{title}</h3>
      {component}
    </div>
  );
}
