const boldPattern = /(\*\*.+?\*\*)/g;

const renderInlineMarkdown = (text) =>
  String(text || "")
    .split(boldPattern)
    .filter(Boolean)
    .map((part, index) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        return (
          <strong key={`${part}-${index}`} className="font-bold">
            {part.slice(2, -2)}
          </strong>
        );
      }

      return <span key={`${part}-${index}`}>{part}</span>;
    });

const flushList = (items, type, blocks) => {
  if (!items.length) return;

  const ListTag = type === "ordered" ? "ol" : "ul";
  const listClass =
    type === "ordered"
      ? "list-decimal space-y-1 pl-4"
      : "list-disc space-y-1 pl-4";

  blocks.push(
    <ListTag key={`list-${blocks.length}`} className={listClass}>
      {items.map((item, index) => (
        <li key={`${item}-${index}`} className="pl-1">
          {renderInlineMarkdown(item)}
        </li>
      ))}
    </ListTag>,
  );
};

const AssistantMessageText = ({ text }) => {
  const lines = String(text || "").split(/\r?\n/);
  const blocks = [];
  let listItems = [];
  let listType = null;

  lines.forEach((line) => {
    const trimmed = line.trim();

    if (!trimmed) {
      flushList(listItems, listType, blocks);
      listItems = [];
      listType = null;
      return;
    }

    const orderedMatch = trimmed.match(/^\d+\.\s+(.+)$/);
    const bulletMatch = trimmed.match(/^[-*]\s+(.+)$/);

    if (orderedMatch || bulletMatch) {
      const nextType = orderedMatch ? "ordered" : "bullet";

      if (listType && listType !== nextType) {
        flushList(listItems, listType, blocks);
        listItems = [];
      }

      listType = nextType;
      listItems.push(orderedMatch?.[1] || bulletMatch?.[1]);
      return;
    }

    flushList(listItems, listType, blocks);
    listItems = [];
    listType = null;

    blocks.push(
      <p key={`paragraph-${blocks.length}`}>{renderInlineMarkdown(trimmed)}</p>,
    );
  });

  flushList(listItems, listType, blocks);

  return <div className="space-y-2">{blocks}</div>;
};

export default AssistantMessageText;