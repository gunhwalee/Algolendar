export default function SelectBox({ text }: { text: string }) {
  return (
    <div>
      <label>
        <input type="checkbox" name={text} />
        <span>{text}</span>
      </label>
    </div>
  );
}
