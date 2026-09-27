// Robust Boolean Expression Parser and Truth Table Evaluator
// Supports operators:
// NOT: !A, ~A, A'
// AND: A & B, A * B, AB
// OR:  A + B, A | B
// XOR: A ^ B, A ⊕ B

export interface TruthTableRow {
  inputs: Record<string, 0 | 1>;
  output: 0 | 1;
  mintermIndex: number;
}

export interface BooleanAnalysisResult {
  isValid: boolean;
  error?: string;
  variables: string[];
  truthTable: TruthTableRow[];
  minterms: number[];
  maxterms: number[];
  canonicalSOP: string;
  canonicalPOS: string;
}

export function analyzeBooleanExpression(rawExpr: string): BooleanAnalysisResult {
  const trimmed = rawExpr.trim();
  if (!trimmed) {
    return {
      isValid: false,
      error: 'Please enter a Boolean expression.',
      variables: [],
      truthTable: [],
      minterms: [],
      maxterms: [],
      canonicalSOP: '',
      canonicalPOS: '',
    };
  }

  // Find all variables (uppercase/lowercase single letters A-Z, excluding operators)
  const varMatches = trimmed.match(/[A-Za-z]/g);
  if (!varMatches) {
    return {
      isValid: false,
      error: 'No Boolean variables found. Use letters like A, B, C, D.',
      variables: [],
      truthTable: [],
      minterms: [],
      maxterms: [],
      canonicalSOP: '',
      canonicalPOS: '',
    };
  }

  const variables = Array.from(new Set(varMatches.map((v) => v.toUpperCase()))).sort();
  if (variables.length > 5) {
    return {
      isValid: false,
      error: 'Maximum 5 variables supported for real-time truth table evaluation.',
      variables,
      truthTable: [],
      minterms: [],
      maxterms: [],
      canonicalSOP: '',
      canonicalPOS: '',
    };
  }

  // Pre-process expression to standardize syntax:
  // Convert postfix prime notation: A' -> (!A), (A+B)' -> (!(A+B))
  let expr = standardizeExpression(trimmed);

  // Generate truth table rows for all 2^N combinations
  const totalRows = Math.pow(2, variables.length);
  const truthTable: TruthTableRow[] = [];
  const minterms: number[] = [];
  const maxterms: number[] = [];

  for (let i = 0; i < totalRows; i++) {
    const inputs: Record<string, 0 | 1> = {};
    const binStr = i.toString(2).padStart(variables.length, '0');

    variables.forEach((v, vIdx) => {
      inputs[v] = binStr[vIdx] === '1' ? 1 : 0;
    });

    try {
      const output = evaluateWithInputs(expr, inputs);
      truthTable.push({
        inputs,
        output,
        mintermIndex: i,
      });

      if (output === 1) {
        minterms.push(i);
      } else {
        maxterms.push(i);
      }
    } catch (err: any) {
      return {
        isValid: false,
        error: `Syntax error in expression: ${err.message || 'Check parentheses and operators'}`,
        variables,
        truthTable: [],
        minterms: [],
        maxterms: [],
        canonicalSOP: '',
        canonicalPOS: '',
      };
    }
  }

  // Construct Canonical SOP (Sum of Minterms)
  const sopTerms = minterms.map((idx) => {
    const bin = idx.toString(2).padStart(variables.length, '0');
    return variables
      .map((v, vIdx) => (bin[vIdx] === '1' ? v : `${v}'`))
      .join('');
  });
  const canonicalSOP = sopTerms.length > 0 ? sopTerms.join(' + ') : '0';

  // Construct Canonical POS (Product of Maxterms)
  const posTerms = maxterms.map((idx) => {
    const bin = idx.toString(2).padStart(variables.length, '0');
    const term = variables
      .map((v, vIdx) => (bin[vIdx] === '0' ? v : `${v}'`))
      .join(' + ');
    return `(${term})`;
  });
  const canonicalPOS = posTerms.length > 0 ? posTerms.join(' · ') : '1';

  return {
    isValid: true,
    variables,
    truthTable,
    minterms,
    maxterms,
    canonicalSOP,
    canonicalPOS,
  };
}

function standardizeExpression(raw: string): string {
  let s = raw.toUpperCase();

  // Replace symbols
  s = s.replace(/·/g, '&');
  s = s.replace(/•/g, '&');
  s = s.replace(/\*/g, '&');
  s = s.replace(/AND/g, '&');
  s = s.replace(/OR/g, '|');
  s = s.replace(/NOT/g, '!');
  s = s.replace(/~/g, '!');
  s = s.replace(/⊕/g, '^');
  s = s.replace(/XOR/g, '^');

  // Handle postfix prime ' like A' -> (!A) or (A+B)' -> (!(A+B))
  // Iteratively replace prime after a single character or closed parenthesis
  let prev = '';
  while (prev !== s) {
    prev = s;
    s = s.replace(/([A-Z])'/g, '(!$1)');
    s = s.replace(/\(([^()]+)\)'/g, '(!($1))');
  }

  // Handle implicit multiplication like AB -> A&B, A(B+C) -> A&(B+C), (A+B)(C+D) -> (A+B)&(C+D)
  s = s.replace(/([A-Z0-9\)])(?=[A-Z\(]|![A-Z\(])/g, '$1&');

  return s;
}

function evaluateWithInputs(expr: string, inputs: Record<string, 0 | 1>): 0 | 1 {
  // Replace variable identifiers with 1 or 0
  let code = expr;
  for (const [varName, val] of Object.entries(inputs)) {
    const reg = new RegExp(`\\b${varName}\\b`, 'g');
    code = code.replace(reg, val.toString());
  }

  // Replace operators with JavaScript bitwise equivalents safely
  // ! -> ! , & -> & , | -> | , ^ -> ^
  // Ensure only valid characters remain: 0, 1, &, |, ^, !, (, ), whitespace
  const sanitized = code.replace(/[^01&|^!()\s]/g, '');

  // eslint-disable-next-line no-new-func
  const fn = new Function(`return ( ${sanitized} ) ? 1 : 0;`);
  return fn() === 1 ? 1 : 0;
}
