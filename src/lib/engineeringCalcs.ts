// Digital Engineering Calculators

export function calculateDAC(nBits: number, vRef: number, digitalInputDec: number) {
  const totalLevels = Math.pow(2, nBits);
  const maxCode = totalLevels - 1;
  const clampedInput = Math.min(Math.max(0, digitalInputDec), maxCode);
  const stepSize = vRef / maxCode; // 1 LSB
  const vOut = stepSize * clampedInput;
  const resolutionPercentage = (1 / maxCode) * 100;

  return {
    nBits,
    vRef,
    digitalInputDec: clampedInput,
    totalLevels,
    maxCode,
    stepSizeV: stepSize,
    vOutV: vOut,
    resolutionPercentage,
    binaryCode: clampedInput.toString(2).padStart(nBits, '0'),
    formula: `V_{out} = V_{ref} \\times \\frac{\\text{Code}}{2^N - 1}`,
  };
}

export function calculateADC(nBits: number, fullScaleVoltage: number, analogInputV: number) {
  const totalLevels = Math.pow(2, nBits);
  const lsbVoltage = fullScaleVoltage / totalLevels;
  const clampedV = Math.min(Math.max(0, analogInputV), fullScaleVoltage);
  const digitalCode = Math.min(Math.floor(clampedV / lsbVoltage), totalLevels - 1);
  const quantizedVoltage = digitalCode * lsbVoltage;
  const quantizationError = clampedV - quantizedVoltage;
  const maxQuantizationError = lsbVoltage / 2;
  const snrDb = 6.02 * nBits + 1.76;

  return {
    nBits,
    fullScaleVoltage,
    analogInputV: clampedV,
    totalLevels,
    lsbVoltage,
    digitalCode,
    binaryCode: digitalCode.toString(2).padStart(nBits, '0'),
    quantizedVoltage,
    quantizationError,
    maxQuantizationError,
    snrDb,
  };
}

export function calculateClockTiming(tpdNs: number, setupNs: number, skewNs: number = 0) {
  const minClockPeriodNs = tpdNs + setupNs + skewNs;
  const maxFrequencyMhz = (1 / (minClockPeriodNs * 1e-9)) / 1e6;

  return {
    tpdNs,
    setupNs,
    skewNs,
    minClockPeriodNs,
    maxFrequencyMhz: Math.round(maxFrequencyMhz * 100) / 100,
    formula: `T_{clk} \\ge t_{pd} + t_{setup} + t_{skew}, \\quad f_{max} = \\frac{1}{T_{clk}}`,
  };
}

export function calculate555Timer(r1Ohms: number, r2Ohms: number, cFarads: number) {
  const tHigh = 0.693 * (r1Ohms + r2Ohms) * cFarads;
  const tLow = 0.693 * r2Ohms * cFarads;
  const period = tHigh + tLow;
  const frequencyHz = 1.44 / ((r1Ohms + 2 * r2Ohms) * cFarads);
  const dutyCyclePercent = ((r1Ohms + r2Ohms) / (r1Ohms + 2 * r2Ohms)) * 100;

  return {
    r1Ohms,
    r2Ohms,
    cFarads,
    tHighSec: tHigh,
    tLowSec: tLow,
    periodSec: period,
    frequencyHz: Math.round(frequencyHz * 100) / 100,
    dutyCyclePercent: Math.round(dutyCyclePercent * 10) / 10,
  };
}

export function calculateNoiseMargins(vOh: number, vIh: number, vIl: number, vOl: number) {
  const nmH = vOh - vIh; // High-level noise margin
  const nmL = vIl - vOl; // Low-level noise margin

  return {
    vOh,
    vIh,
    vIl,
    vOl,
    nmH: Math.round(nmH * 1000) / 1000,
    nmL: Math.round(nmL * 1000) / 1000,
    isHValid: nmH > 0,
    isLValid: nmL > 0,
  };
}
