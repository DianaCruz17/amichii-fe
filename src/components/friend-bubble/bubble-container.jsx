function bubblesPositions(count, cols, size, gap) {
  const step = size + gap;
  const rowOffset = step * (Math.sqrt(3) / 2) + 30;

  return Array.from({ length: count }, (_, i) => {
    const col = i % cols;
    const row = Math.floor(i / cols);
    const isOddRow = row % 2 === 1;

    return {
      x: col * step + (isOddRow ? step / 2 : 0),
      y: row * rowOffset,
    };
  });
}

function BubbleGrid({ items, cols = 5, size = 52, gap = 6, renderItem }) {
  const step = size + gap;
  const rowOffset = step * (Math.sqrt(3) / 2);
  const rows = Math.ceil(items.length / cols);
  const maxCols = Math.min(items.length, cols);

  const containerW = maxCols * step + (rows > 1 ? step / 2 : 0) + size;
  const containerH = rows * rowOffset + size;

  const positions = bubblesPositions(items.length, cols, size, gap);

  return (
    <div className='relative' style={{ width: containerW, height: containerH }}>
      {items.map((item, i) => (
        <div
          key={i}
          className='absolute'
          style={{
            left: positions[i].x,
            top: positions[i].y,
            width: size,
            height: size,
          }}
        >
          {renderItem(item, i)}
        </div>
      ))}
    </div>
  );
}

export default BubbleGrid;
