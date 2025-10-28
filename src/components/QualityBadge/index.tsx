import s from "./style.module.css";

export default function QualityBadge({
  color,
  quality,
  category,
}: {
  color: string;
  quality: number;
  category: string;
}) {
  return (
    <div className={s.badge} style={{ backgroundColor: color || "#333" }}>
      <p>{quality}</p>
      <p>{category}</p>
      {/* <p className={s.category}></p> */}
    </div>
  );
}
