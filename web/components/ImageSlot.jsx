// Плейсхолдер под реальное изображение.
// Когда появится фото/скриншот — замените этот компонент на next/image:
//   <Image src="/your.jpg" alt="..." fill style={{objectFit:'cover'}} />
export default function ImageSlot({ label, style, className = "" }) {
  return (
    <div className={`image-slot ${className}`.trim()} style={style} role="img" aria-label={label}>
      <span>{label}</span>
    </div>
  );
}
