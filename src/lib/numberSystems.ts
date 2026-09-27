// Comprehensive Number System and Digital Arithmetic Library

export interface BaseConversionResult {
  decimal: string;
  binary: string;
  octal: string;
  hexadecimal: string;
  steps: string[];
}

export function convertFromDecimal(decStr: string): BaseConversionResult {
  const num = parseFloat(decStr);
  if (isNaN(num)) {
    return { decimal: '0', binary: '0', octal: '0', hexadecimal: '0', steps: ['Invalid number input'] };
  }

  const isNegative = num < 0;
  const absNum = Math.abs(num);
  const intPart = Math.floor(absNum);
  const fracPart = absNum - intPart;

  // Integer conversions
  const binInt = intPart.toString(2);
  const octInt = intPart.toString(8);
  const hexInt = intPart.toString(16).toUpperCase();

  // Fraction conversions (up to 6 digits)
  let binFrac = '';
  let f = fracPart;
  for (let i = 0; i < 6 && f > 0; i++) {
    f *= 2;
    const digit = Math.floor(f);
    binFrac += digit.toString();
    f -= digit;
  }

  const prefix = isNegative ? '-' : '';
  const finalBin = binFrac ? `${prefix}${binInt}.${binFrac}` : `${prefix}${binInt}`;
  const finalOct = `${prefix}${octInt}`;
  const finalHex = `${prefix}${hexInt}`;

  const steps = [
    `Decimal value: ${decStr}`,
    `Integer part (${intPart}) divided successively by 2: Binary = ${binInt}`,
    fracPart > 0
      ? `Fractional part (${fracPart}) multiplied successively by 2: .${binFrac}`
      : 'No fractional component.',
    `Integer part (${intPart}) in Octal (base 8): ${octInt}₈`,
    `Integer part (${intPart}) in Hexadecimal (base 16): 0x${hexInt}₁₆`,
  ];

  return {
    decimal: decStr,
    binary: finalBin,
    octal: finalOct,
    hexadecimal: finalHex,
    steps,
  };
}

export function convertFromBinary(binStr: string): BaseConversionResult {
  const clean = binStr.trim();
  if (!/^[01]+(\.[01]+)?$/.test(clean)) {
    return { decimal: '0', binary: '0', octal: '0', hexadecimal: '0', steps: ['Binary must contain only 0s and 1s'] };
  }

  const parts = clean.split('.');
  const intPart = parseInt(parts[0], 2);
  let fracPart = 0;

  if (parts[1]) {
    for (let i = 0; i < parts[1].length; i++) {
      if (parts[1][i] === '1') {
        fracPart += Math.pow(2, -(i + 1));
      }
    }
  }

  const totalDec = intPart + fracPart;
  return convertFromDecimal(totalDec.toString());
}

export function computeComplements(value: number, bitWidth: 4 | 8 | 16) {
  const maxUnsigned = Math.pow(2, bitWidth) - 1;
  const minSigned = -Math.pow(2, bitWidth - 1);
  const maxSigned = Math.pow(2, bitWidth - 1) - 1;

  const isOutOfRange = value < minSigned || value > maxSigned;

  // Unsigned binary of magnitude
  const absVal = Math.abs(value);
  const rawBin = absVal.toString(2).padStart(bitWidth, '0');

  let onesComp = '';
  let twosComp = '';

  if (value >= 0) {
    onesComp = rawBin;
    twosComp = rawBin;
  } else {
    // 1's complement: invert all bits
    onesComp = rawBin
      .split('')
      .map((b) => (b === '0' ? '1' : '0'))
      .join('');

    // 2's complement: 1's comp + 1
    const intTwos = (parseInt(onesComp, 2) + 1) & maxUnsigned;
    twosComp = intTwos.toString(2).padStart(bitWidth, '0');
  }

  return {
    value,
    bitWidth,
    minSigned,
    maxSigned,
    isOutOfRange,
    rawBinary: rawBin,
    onesComplement: onesComp,
    twosComplement: twosComp,
    hexRepresentation: parseInt(twosComp, 2).toString(16).toUpperCase().padStart(bitWidth / 4, '0'),
  };
}

export function performBinaryAddition(binA: string, binB: string) {
  const maxLen = Math.max(binA.length, binB.length);
  const a = binA.padStart(maxLen, '0');
  const b = binB.padStart(maxLen, '0');

  let carry = 0;
  let result = '';
  const carryHistory: number[] = [];

  for (let i = maxLen - 1; i >= 0; i--) {
    const bitA = parseInt(a[i], 10);
    const bitB = parseInt(b[i], 10);
    const sum = bitA + bitB + carry;
    result = (sum % 2).toString() + result;
    carry = Math.floor(sum / 2);
    carryHistory.unshift(carry);
  }

  const finalResult = carry > 0 ? '1' + result : result;
  return {
    a,
    b,
    result: finalResult,
    overflowCarry: carry,
    decA: parseInt(a, 2),
    decB: parseInt(b, 2),
    decResult: parseInt(finalResult, 2),
  };
}

export function binaryToGray(bin: string): string {
  let gray = bin[0];
  for (let i = 1; i < bin.length; i++) {
    const bPrev = parseInt(bin[i - 1], 10);
    const bCurr = parseInt(bin[i], 10);
    gray += (bPrev ^ bCurr).toString();
  }
  return gray;
}

export function grayToBinary(gray: string): string {
  let bin = gray[0];
  for (let i = 1; i < gray.length; i++) {
    const bPrev = parseInt(bin[i - 1], 10);
    const gCurr = parseInt(gray[i], 10);
    bin += (bPrev ^ gCurr).toString();
  }
  return bin;
}

export function decimalToBCD(dec: number): string {
  const str = Math.abs(Math.floor(dec)).toString();
  return str
    .split('')
    .map((digit) => parseInt(digit, 10).toString(2).padStart(4, '0'))
    .join(' ');
}
