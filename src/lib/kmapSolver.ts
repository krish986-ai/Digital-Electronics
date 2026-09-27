// Interactive K-Map solver for 2, 3, and 4 variables
// Generates Gray-code grid, identifies prime implicants (quads, pairs, octets, singletons),
// and outputs minimal SOP expression with explanation.

export type CellValue = 0 | 1 | 'X';

export interface KMapGroup {
  id: string;
  size: number;
  cells: number[]; // minterm indices
  color: string;
  term: string; // e.g. "A'C"
  description: string;
}

export interface KMapResult {
  variables: string[];
  grid: {
    rowLabels: string[];
    colLabels: string[];
    cellMatrix: {
      mintermIndex: number;
      value: CellValue;
      groups: string[]; // group IDs covering this cell
    }[][];
  };
  groups: KMapGroup[];
  minimizedSOP: string;
  steps: string[];
}

const PALETTE = [
  'border-blue-500 bg-blue-500/15 text-blue-400',
  'border-emerald-500 bg-emerald-500/15 text-emerald-400',
  'border-amber-500 bg-amber-500/15 text-amber-400',
  'border-purple-500 bg-purple-500/15 text-purple-400',
  'border-rose-500 bg-rose-500/15 text-rose-400',
  'border-cyan-500 bg-cyan-500/15 text-cyan-400',
];

export function solveKMap(
  numVars: 2 | 3 | 4,
  minterms: number[],
  dontCares: number[] = []
): KMapResult {
  const varsMap: Record<number, string[]> = {
    2: ['A', 'B'],
    3: ['A', 'B', 'C'],
    4: ['A', 'B', 'C', 'D'],
  };
  const variables = varsMap[numVars];
  const totalCells = Math.pow(2, numVars);

  // Minterm cell values
  const cellValues: Record<number, CellValue> = {};
  for (let i = 0; i < totalCells; i++) {
    if (minterms.includes(i)) {
      cellValues[i] = 1;
    } else if (dontCares.includes(i)) {
      cellValues[i] = 'X';
    } else {
      cellValues[i] = 0;
    }
  }

  // Row & Col setup with Gray code
  let rowLabels: string[] = [];
  let colLabels: string[] = [];
  let cellIndices: number[][] = [];

  if (numVars === 2) {
    // Rows: A (0, 1), Cols: B (0, 1)
    rowLabels = ["A = 0 (A')", 'A = 1 (A)'];
    colLabels = ["B = 0 (B')", 'B = 1 (B)'];
    cellIndices = [
      [0, 1],
      [2, 3],
    ];
  } else if (numVars === 3) {
    // Rows: A (0, 1), Cols: BC (00, 01, 11, 10 Gray Code)
    rowLabels = ["A = 0 (A')", 'A = 1 (A)'];
    colLabels = ["B'C' (00)", "B'C (01)", "BC (11)", "BC' (10)"];
    cellIndices = [
      [0, 1, 3, 2],
      [4, 5, 7, 6],
    ];
  } else {
    // 4-vars: Rows: AB (00, 01, 11, 10), Cols: CD (00, 01, 11, 10)
    rowLabels = ["A'B' (00)", "A'B (01)", "AB (11)", "AB' (10)"];
    colLabels = ["C'D' (00)", "C'D (01)", "CD (11)", "CD' (10)"];
    cellIndices = [
      [0, 1, 3, 2],
      [4, 5, 7, 6],
      [12, 13, 15, 14],
      [8, 9, 11, 10],
    ];
  }

  // Grouping logic for essential prime implicants
  const onesAndXs = new Set([...minterms, ...dontCares]);
  const essentialMinterms = new Set(minterms);

  if (essentialMinterms.size === 0) {
    return {
      variables,
      grid: buildGrid(rowLabels, colLabels, cellIndices, cellValues, []),
      groups: [],
      minimizedSOP: '0',
      steps: ['No minterms active. Output is permanently 0.'],
    };
  }

  if (minterms.length === totalCells) {
    return {
      variables,
      grid: buildGrid(rowLabels, colLabels, cellIndices, cellValues, []),
      groups: [
        {
          id: 'grp_all',
          size: totalCells,
          cells: Array.from({ length: totalCells }, (_, i) => i),
          color: PALETTE[0],
          term: '1',
          description: `All ${totalCells} cells are covered, expression reduces to 1.`,
        },
      ],
      minimizedSOP: '1',
      steps: ['All cells in map contain 1. Output is permanently 1.'],
    };
  }

  // Find all valid rectangular power-of-2 groups
  const potentialGroups: { cells: number[]; term: string; size: number }[] = [];
  const sizesToTry = [16, 8, 4, 2, 1].filter((s) => s <= totalCells);

  // Helper to convert minterm index to binary string
  const toBin = (idx: number) => idx.toString(2).padStart(numVars, '0');

  // Find common term among cells
  const getCommonTerm = (cells: number[]): string => {
    if (cells.length === totalCells) return '1';
    let term = '';
    for (let bit = 0; bit < numVars; bit++) {
      const firstBit = toBin(cells[0])[bit];
      const allSame = cells.every((c) => toBin(c)[bit] === firstBit);
      if (allSame) {
        const varName = variables[bit];
        term += firstBit === '1' ? varName : `${varName}'`;
      }
    }
    return term || '1';
  };

  // Enumerate all subsets that form legal toroid power-of-2 K-map blocks
  const legalBlocks = generateLegalBlocks(numVars);

  for (const block of legalBlocks) {
    if (block.every((cell) => onesAndXs.has(cell))) {
      // Must contain at least one true minterm (not only don't-cares)
      if (block.some((cell) => essentialMinterms.has(cell))) {
        potentialGroups.push({
          cells: block,
          term: getCommonTerm(block),
          size: block.length,
        });
      }
    }
  }

  // Sort groups by size descending
  potentialGroups.sort((a, b) => b.size - a.size);

  // Greedy set-cover selection
  const selectedGroups: KMapGroup[] = [];
  const coveredOnes = new Set<number>();
  let paletteIdx = 0;

  for (const candidate of potentialGroups) {
    const coversNew = candidate.cells.some(
      (c) => essentialMinterms.has(c) && !coveredOnes.has(c)
    );
    if (coversNew) {
      const gid = `grp_${paletteIdx + 1}`;
      selectedGroups.push({
        id: gid,
        size: candidate.size,
        cells: candidate.cells,
        color: PALETTE[paletteIdx % PALETTE.length],
        term: candidate.term,
        description: `Group of ${candidate.size} cells: [${candidate.cells.join(', ')}] simplifies to ${candidate.term}`,
      });
      candidate.cells.forEach((c) => {
        if (essentialMinterms.has(c)) coveredOnes.add(c);
      });
      paletteIdx++;
      if (coveredOnes.size === essentialMinterms.size) break;
    }
  }

  // Remove any redundant group if all its 1-cells are already covered by other groups
  const finalGroups = selectedGroups.filter((grp, idx) => {
    const otherGroupsCells = new Set<number>();
    selectedGroups.forEach((other, oIdx) => {
      if (idx !== oIdx) {
        other.cells.forEach((c) => {
          if (essentialMinterms.has(c)) otherGroupsCells.add(c);
        });
      }
    });
    // Check if grp has at least one unique 1
    const hasUnique = grp.cells.some(
      (c) => essentialMinterms.has(c) && !otherGroupsCells.has(c)
    );
    return hasUnique;
  });

  const minimizedSOP =
    finalGroups.length > 0 ? finalGroups.map((g) => g.term).join(' + ') : '0';

  const steps = [
    `Identified active minterms: Σm(${minterms.join(', ') || 'none'})${
      dontCares.length ? ` with Don't Cares d(${dontCares.join(', ')})` : ''
    }.`,
    `Constructed ${numVars}-variable Karnaugh map using adjacent Gray code indexing.`,
    ...finalGroups.map(
      (g, i) =>
        `Step ${i + 1}: Formed maximal group of ${g.size} cells {${g.cells.join(
          ', '
        )}} eliminating varying variables → Prime Implicant: ${g.term}.`
    ),
    `Final Minimal Sum of Products (SOP): F = ${minimizedSOP}`,
  ];

  const grid = buildGrid(rowLabels, colLabels, cellIndices, cellValues, finalGroups);

  return {
    variables,
    grid,
    groups: finalGroups,
    minimizedSOP,
    steps,
  };
}

function buildGrid(
  rowLabels: string[],
  colLabels: string[],
  cellIndices: number[][],
  cellValues: Record<number, CellValue>,
  groups: KMapGroup[]
) {
  const cellMatrix = cellIndices.map((row) =>
    row.map((mintermIndex) => {
      const covering = groups
        .filter((g) => g.cells.includes(mintermIndex))
        .map((g) => g.id);
      return {
        mintermIndex,
        value: cellValues[mintermIndex],
        groups: covering,
      };
    })
  );

  return {
    rowLabels,
    colLabels,
    cellMatrix,
  };
}

function generateLegalBlocks(numVars: 2 | 3 | 4): number[][] {
  const blocks: number[][] = [];
  const rows = numVars === 2 ? 2 : numVars === 3 ? 2 : 4;
  const cols = numVars === 2 ? 2 : 4;

  let matrix: number[][];
  if (numVars === 2) {
    matrix = [
      [0, 1],
      [2, 3],
    ];
  } else if (numVars === 3) {
    matrix = [
      [0, 1, 3, 2],
      [4, 5, 7, 6],
    ];
  } else {
    matrix = [
      [0, 1, 3, 2],
      [4, 5, 7, 6],
      [12, 13, 15, 14],
      [8, 9, 11, 10],
    ];
  }

  // Legal dimensions (height x width) that are powers of 2
  const dimensions: [number, number][] = [];
  const heights = [1, 2, 4].filter((h) => h <= rows);
  const widths = [1, 2, 4].filter((w) => w <= cols);

  for (const h of heights) {
    for (const w of widths) {
      if ([1, 2, 4, 8, 16].includes(h * w)) {
        dimensions.push([h, w]);
      }
    }
  }

  // Sort largest blocks first
  dimensions.sort((a, b) => b[0] * b[1] - a[0] * a[1]);

  for (const [h, w] of dimensions) {
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const cells: number[] = [];
        for (let dr = 0; dr < h; dr++) {
          for (let dc = 0; dc < w; dc++) {
            const rowIdx = (r + dr) % rows;
            const colIdx = (c + dc) % cols;
            cells.push(matrix[rowIdx][colIdx]);
          }
        }
        cells.sort((a, b) => a - b);
        // Avoid duplicate cell sets
        const key = cells.join(',');
        if (!blocks.some((b) => b.join(',') === key)) {
          blocks.push(cells);
        }
      }
    }
  }

  return blocks;
}
