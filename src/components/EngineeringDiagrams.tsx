import React, { useState } from 'react';
import { Layers, ZoomIn, Eye, Activity, Info, CheckCircle2 } from 'lucide-react';

interface DiagramProps {
  diagramId: string;
  title: string;
  caption?: string;
}

export const EngineeringDiagram: React.FC<DiagramProps> = ({
  diagramId,
  title,
  caption,
}) => {
  const [activeSignal, setActiveSignal] = useState<string | null>(null);
  const [zoom, setZoom] = useState<boolean>(false);

  // Render specific SVG diagram based on diagramId
  const renderSvgContent = () => {
    switch (diagramId) {
      case 'LOGIC_LEVELS_VTC':
        return (
          <svg viewBox="0 0 650 320" className="w-full h-auto max-h-[340px] select-none font-mono">
            {/* Background grids */}
            <rect x="0" y="0" width="650" height="320" fill="#0f172a" rx="12" />
            <line x1="80" y1="280" x2="600" y2="280" stroke="#334155" strokeWidth="2" />
            <line x1="80" y1="30" x2="80" y2="280" stroke="#334155" strokeWidth="2" />

            {/* Output Bands (Left Column) */}
            <text x="180" y="24" fill="#94a3b8" fontSize="12" fontWeight="bold" textAnchor="middle">
              DRIVER OUTPUT BANDS
            </text>

            {/* VOH Band */}
            <rect x="110" y="40" width="140" height="45" fill="#1e3a8a" stroke="#3b82f6" strokeWidth="2" rx="4" />
            <text x="180" y="66" fill="#60a5fa" fontSize="12" fontWeight="bold" textAnchor="middle">
              HIGH State (Logic 1)
            </text>
            <text x="180" y="80" fill="#93c5fd" fontSize="10" textAnchor="middle">
              V_OH(min) to V_DD (5.0V)
            </text>

            {/* Output Forbidden Zone */}
            <rect x="110" y="85" width="140" height="135" fill="#1e293b" stroke="#475569" strokeDasharray="4 4" rx="4" />
            <text x="180" y="155" fill="#64748b" fontSize="11" textAnchor="middle">
              Forbidden Output Zone
            </text>

            {/* VOL Band */}
            <rect x="110" y="220" width="140" height="50" fill="#064e3b" stroke="#10b981" strokeWidth="2" rx="4" />
            <text x="180" y="246" fill="#34d399" fontSize="12" fontWeight="bold" textAnchor="middle">
              LOW State (Logic 0)
            </text>
            <text x="180" y="260" fill="#a7f3d0" fontSize="10" textAnchor="middle">
              0V to V_OL(max) (0.4V)
            </text>

            {/* Receiver Input Bands (Right Column) */}
            <text x="460" y="24" fill="#94a3b8" fontSize="12" fontWeight="bold" textAnchor="middle">
              RECEIVER INPUT THRESHOLDS
            </text>

            {/* VIH Band */}
            <rect x="390" y="40" width="140" height="75" fill="#1e3a8a" stroke="#60a5fa" strokeWidth="2" rx="4" />
            <text x="460" y="75" fill="#60a5fa" fontSize="12" fontWeight="bold" textAnchor="middle">
              Valid HIGH Input
            </text>
            <text x="460" y="90" fill="#bfdbfe" fontSize="10" textAnchor="middle">
              V_IH(min) = 2.0V
            </text>

            {/* Intermediate Indeterminate Zone */}
            <rect x="390" y="115" width="140" height="85" fill="#450a0a" stroke="#ef4444" strokeDasharray="3 3" rx="4" />
            <text x="460" y="152" fill="#f87171" fontSize="11" fontWeight="bold" textAnchor="middle">
              Indeterminate Zone
            </text>
            <text x="460" y="168" fill="#fca5a5" fontSize="9" textAnchor="middle">
              Oscillation & Meta-stability
            </text>

            {/* VIL Band */}
            <rect x="390" y="200" width="140" height="70" fill="#064e3b" stroke="#34d399" strokeWidth="2" rx="4" />
            <text x="460" y="235" fill="#34d399" fontSize="12" fontWeight="bold" textAnchor="middle">
              Valid LOW Input
            </text>
            <text x="460" y="250" fill="#a7f3d0" fontSize="10" textAnchor="middle">
              V_IL(max) = 0.8V
            </text>

            {/* Noise Margin Arrows & Annotations */}
            {/* NM_H Arrow */}
            <line x1="255" y1="85" x2="385" y2="115" stroke="#38bdf8" strokeWidth="2" strokeDasharray="2 2" />
            <rect x="270" y="80" width="100" height="28" rx="6" fill="#0284c7" />
            <text x="320" y="98" fill="#ffffff" fontSize="10" fontWeight="bold" textAnchor="middle">
              NM_H = V_OH - V_IH
            </text>

            {/* NM_L Arrow */}
            <line x1="255" y1="220" x2="385" y2="200" stroke="#10b981" strokeWidth="2" strokeDasharray="2 2" />
            <rect x="270" y="205" width="100" height="28" rx="6" fill="#059669" />
            <text x="320" y="223" fill="#ffffff" fontSize="10" fontWeight="bold" textAnchor="middle">
              NM_L = V_IL - V_OL
            </text>

            {/* Voltage Scale Marks on Left Axis */}
            <text x="70" y="45" fill="#94a3b8" fontSize="10" textAnchor="end">5.0V</text>
            <text x="70" y="85" fill="#94a3b8" fontSize="10" textAnchor="end">2.7V</text>
            <text x="70" y="115" fill="#94a3b8" fontSize="10" textAnchor="end">2.0V</text>
            <text x="70" y="200" fill="#94a3b8" fontSize="10" textAnchor="end">0.8V</text>
            <text x="70" y="220" fill="#94a3b8" fontSize="10" textAnchor="end">0.4V</text>
            <text x="70" y="275" fill="#94a3b8" fontSize="10" textAnchor="end">0.0V</text>
          </svg>
        );

      case 'RADIX_NIBBLE_MAP':
        return (
          <svg viewBox="0 0 650 280" className="w-full h-auto max-h-[300px] select-none font-mono">
            <rect x="0" y="0" width="650" height="280" fill="#0f172a" rx="12" />
            <text x="325" y="28" fill="#94a3b8" fontSize="13" fontWeight="bold" textAnchor="middle">
              DIRECT 4-BIT NIBBLE GROUPING (BINARY ↔ HEXADECIMAL)
            </text>

            {/* 16-bit binary stream */}
            <text x="40" y="65" fill="#38bdf8" fontSize="11" fontWeight="bold">
              16-BIT BINARY WORD:
            </text>

            {/* Nibble 3 (MSB) */}
            <rect x="40" y="80" width="120" height="50" fill="#1e3a8a" stroke="#3b82f6" strokeWidth="2" rx="6" />
            <text x="100" y="102" fill="#60a5fa" fontSize="16" fontWeight="bold" textAnchor="middle">1 1 0 1</text>
            <text x="100" y="120" fill="#93c5fd" fontSize="10" textAnchor="middle">Weight: 8+4+0+1</text>

            {/* Nibble 2 */}
            <rect x="180" y="80" width="120" height="50" fill="#064e3b" stroke="#10b981" strokeWidth="2" rx="6" />
            <text x="240" y="102" fill="#34d399" fontSize="16" fontWeight="bold" textAnchor="middle">0 1 1 0</text>
            <text x="240" y="120" fill="#a7f3d0" fontSize="10" textAnchor="middle">Weight: 0+4+2+0</text>

            {/* Nibble 1 */}
            <rect x="320" y="80" width="120" height="50" fill="#4c1d95" stroke="#8b5cf6" strokeWidth="2" rx="6" />
            <text x="380" y="102" fill="#c084fc" fontSize="16" fontWeight="bold" textAnchor="middle">1 0 1 1</text>
            <text x="380" y="120" fill="#e9d5ff" fontSize="10" textAnchor="middle">Weight: 8+0+2+1</text>

            {/* Nibble 0 (LSB) */}
            <rect x="460" y="80" width="120" height="50" fill="#78350f" stroke="#f59e0b" strokeWidth="2" rx="6" />
            <text x="520" y="102" fill="#fbbf24" fontSize="16" fontWeight="bold" textAnchor="middle">0 1 0 1</text>
            <text x="520" y="120" fill="#fde68a" fontSize="10" textAnchor="middle">Weight: 0+4+0+1</text>

            {/* Convergence Arrows */}
            <path d="M 100 135 L 100 170" stroke="#3b82f6" strokeWidth="2" markerEnd="url(#arrow)" />
            <path d="M 240 135 L 240 170" stroke="#10b981" strokeWidth="2" />
            <path d="M 380 135 L 380 170" stroke="#8b5cf6" strokeWidth="2" />
            <path d="M 520 135 L 520 170" stroke="#f59e0b" strokeWidth="2" />

            {/* Hexadecimal Result Output */}
            <rect x="40" y="180" width="120" height="55" fill="#172554" stroke="#60a5fa" strokeWidth="2" rx="8" />
            <text x="100" y="210" fill="#93c5fd" fontSize="22" fontWeight="bold" textAnchor="middle">0xD</text>
            <text x="100" y="226" fill="#bfdbfe" fontSize="10" textAnchor="middle">Decimal 13</text>

            <rect x="180" y="180" width="120" height="55" fill="#022c22" stroke="#34d399" strokeWidth="2" rx="8" />
            <text x="240" y="210" fill="#6ee7b7" fontSize="22" fontWeight="bold" textAnchor="middle">0x6</text>
            <text x="240" y="226" fill="#a7f3d0" fontSize="10" textAnchor="middle">Decimal 6</text>

            <rect x="320" y="180" width="120" height="55" fill="#2e1065" stroke="#c084fc" strokeWidth="2" rx="8" />
            <text x="380" y="210" fill="#d8b4fe" fontSize="22" fontWeight="bold" textAnchor="middle">0xB</text>
            <text x="380" y="226" fill="#f3e8ff" fontSize="10" textAnchor="middle">Decimal 11</text>

            <rect x="460" y="180" width="120" height="55" fill="#451a03" stroke="#fcd34d" strokeWidth="2" rx="8" />
            <text x="520" y="210" fill="#fde68a" fontSize="22" fontWeight="bold" textAnchor="middle">0x5</text>
            <text x="520" y="226" fill="#fef3c7" fontSize="10" textAnchor="middle">Decimal 5</text>

            <text x="325" y="265" fill="#e2e8f0" fontSize="12" fontWeight="bold" textAnchor="middle">
              EQUIVALENT HEX WORD = 0xD6B5 (No decimal conversion needed!)
            </text>
          </svg>
        );

      case 'TWOS_COMPLEMENT_RING':
        return (
          <svg viewBox="0 0 650 340" className="w-full h-auto max-h-[350px] select-none font-mono">
            <rect x="0" y="0" width="650" height="340" fill="#0f172a" rx="12" />
            <text x="325" y="28" fill="#94a3b8" fontSize="13" fontWeight="bold" textAnchor="middle">
              4-BIT MODULO-16 COMPLEMENT WHEEL & SIGNED OVERFLOW
            </text>

            {/* Circular Orbit Ring */}
            <circle cx="240" cy="180" r="110" fill="none" stroke="#334155" strokeWidth="24" />

            {/* Positive Half (0 to +7) */}
            <path
              d="M 240 70 A 110 110 0 0 1 350 180"
              fill="none"
              stroke="#2563eb"
              strokeWidth="24"
            />
            {/* Negative Half (-1 to -8) */}
            <path
              d="M 240 70 A 110 110 0 0 0 130 180"
              fill="none"
              stroke="#dc2626"
              strokeWidth="24"
            />

            {/* Key Marker Points */}
            {/* Top: 0000 = 0 */}
            <circle cx="240" cy="70" r="16" fill="#0284c7" />
            <text x="240" y="74" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">0000</text>
            <text x="240" y="46" fill="#38bdf8" fontSize="12" fontWeight="bold" textAnchor="middle">0 (Zero)</text>

            {/* +7 (0111) */}
            <circle cx="350" cy="180" r="16" fill="#16a34a" />
            <text x="350" y="184" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">0111</text>
            <text x="400" y="184" fill="#4ade80" fontSize="12" fontWeight="bold">+7 (Max Pos)</text>

            {/* -8 (1000) Overflow Point */}
            <circle cx="130" cy="180" r="16" fill="#b91c1c" />
            <text x="130" y="184" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">1000</text>
            <text x="80" y="184" fill="#f87171" fontSize="12" fontWeight="bold">-8 (Min Neg)</text>

            {/* -1 (1111) */}
            <circle cx="160" cy="100" r="14" fill="#7f1d1d" />
            <text x="160" y="104" fill="#ffffff" fontSize="10" fontWeight="bold" textAnchor="middle">1111</text>
            <text x="115" y="95" fill="#fca5a5" fontSize="11" fontWeight="bold">-1</text>

            {/* Right Side Explanation Cards */}
            <rect x="440" y="60" width="190" height="85" fill="#1e293b" stroke="#3b82f6" rx="8" />
            <text x="450" y="82" fill="#60a5fa" fontSize="11" fontWeight="bold">SIGNED OVERFLOW TRAP:</text>
            <text x="450" y="102" fill="#94a3b8" fontSize="10">Adding (+7) + (+1):</text>
            <text x="450" y="118" fill="#cbd5e1" fontSize="10">0111 (+7) + 0001 (+1)</text>
            <text x="450" y="134" fill="#ef4444" fontSize="11" fontWeight="bold">= 1000 (-8) !! ERROR</text>

            <rect x="440" y="165" width="190" height="95" fill="#1e293b" stroke="#10b981" rx="8" />
            <text x="450" y="187" fill="#34d399" fontSize="11" fontWeight="bold">HARDWARE OVERFLOW RULE:</text>
            <text x="450" y="207" fill="#cbd5e1" fontSize="10">V = C_in(MSB) ⊕ C_out(MSB)</text>
            <text x="450" y="225" fill="#94a3b8" fontSize="9">If carry-in into sign bit does</text>
            <text x="450" y="238" fill="#94a3b8" fontSize="9">not match carry-out, V = 1.</text>
            <text x="450" y="252" fill="#a7f3d0" fontSize="9" fontWeight="bold">Only ONE zero (0000)!</text>
          </svg>
        );

      case 'KMAP_4VAR_OCTET':
        return (
          <svg viewBox="0 0 650 320" className="w-full h-auto max-h-[330px] select-none font-mono">
            <rect x="0" y="0" width="650" height="320" fill="#0f172a" rx="12" />
            <text x="325" y="26" fill="#94a3b8" fontSize="13" fontWeight="bold" textAnchor="middle">
              4-VARIABLE KARNAUGH MAP (GRAY-CODE ADJACENCY & MINIMAL SOP)
            </text>

            {/* Variable Labels */}
            <text x="90" y="65" fill="#f59e0b" fontSize="14" fontWeight="bold">AB \ CD</text>

            {/* Column Headers (CD) */}
            <text x="180" y="65" fill="#38bdf8" fontSize="13" fontWeight="bold" textAnchor="middle">00</text>
            <text x="240" y="65" fill="#38bdf8" fontSize="13" fontWeight="bold" textAnchor="middle">01</text>
            <text x="300" y="65" fill="#38bdf8" fontSize="13" fontWeight="bold" textAnchor="middle">11</text>
            <text x="360" y="65" fill="#38bdf8" fontSize="13" fontWeight="bold" textAnchor="middle">10</text>

            {/* Row Headers (AB) */}
            <text x="120" y="105" fill="#a78bfa" fontSize="13" fontWeight="bold">00</text>
            <text x="120" y="155" fill="#a78bfa" fontSize="13" fontWeight="bold">01</text>
            <text x="120" y="205" fill="#a78bfa" fontSize="13" fontWeight="bold">11</text>
            <text x="120" y="255" fill="#a78bfa" fontSize="13" fontWeight="bold">10</text>

            {/* Grid 4x4 */}
            <g stroke="#334155" strokeWidth="1.5">
              {[0, 1, 2, 3, 4].map((i) => (
                <React.Fragment key={i}>
                  <line x1="150" y1={80 + i * 50} x2="390" y2={80 + i * 50} />
                  <line x1={150 + i * 60} y1="80" x2={150 + i * 60} y2="280" />
                </React.Fragment>
              ))}
            </g>

            {/* Octet Colored Looping (Columns CD = 01 and 11, across all 4 rows) */}
            <rect
              x="214"
              y="84"
              width="112"
              height="192"
              rx="12"
              fill="rgba(59, 130, 246, 0.25)"
              stroke="#3b82f6"
              strokeWidth="2.5"
            />
            <text x="270" y="295" fill="#60a5fa" fontSize="11" fontWeight="bold" textAnchor="middle">
              Octet Loop (8 cells) → Eliminates A, B, C! Result = D
            </text>

            {/* Quad Corner Looping (00,00), (00,10), (10,00), (10,10) wrap-around */}
            <path
              d="M 152 82 L 175 82 A 1 1 0 0 1 175 105 L 152 105"
              fill="rgba(16, 185, 129, 0.25)"
              stroke="#10b981"
              strokeWidth="2"
            />
            <path
              d="M 388 82 L 365 82 A 1 1 0 0 0 365 105 L 388 105"
              fill="rgba(16, 185, 129, 0.25)"
              stroke="#10b981"
              strokeWidth="2"
            />

            {/* Cell Values (0 and 1) with Minterm Index Subscripts */}
            {/* Row 00 */}
            <text x="180" y="110" fill="#94a3b8" fontSize="13" textAnchor="middle">1 <tspan fontSize="8" fill="#64748b">m0</tspan></text>
            <text x="240" y="110" fill="#60a5fa" fontSize="14" fontWeight="bold" textAnchor="middle">1 <tspan fontSize="8" fill="#3b82f6">m1</tspan></text>
            <text x="300" y="110" fill="#60a5fa" fontSize="14" fontWeight="bold" textAnchor="middle">1 <tspan fontSize="8" fill="#3b82f6">m3</tspan></text>
            <text x="360" y="110" fill="#94a3b8" fontSize="13" textAnchor="middle">1 <tspan fontSize="8" fill="#64748b">m2</tspan></text>

            {/* Row 01 */}
            <text x="180" y="160" fill="#64748b" fontSize="13" textAnchor="middle">0 <tspan fontSize="8">m4</tspan></text>
            <text x="240" y="160" fill="#60a5fa" fontSize="14" fontWeight="bold" textAnchor="middle">1 <tspan fontSize="8" fill="#3b82f6">m5</tspan></text>
            <text x="300" y="160" fill="#60a5fa" fontSize="14" fontWeight="bold" textAnchor="middle">1 <tspan fontSize="8" fill="#3b82f6">m7</tspan></text>
            <text x="360" y="160" fill="#64748b" fontSize="13" textAnchor="middle">0 <tspan fontSize="8">m6</tspan></text>

            {/* Row 11 */}
            <text x="180" y="210" fill="#64748b" fontSize="13" textAnchor="middle">0 <tspan fontSize="8">m12</tspan></text>
            <text x="240" y="210" fill="#60a5fa" fontSize="14" fontWeight="bold" textAnchor="middle">1 <tspan fontSize="8" fill="#3b82f6">m13</tspan></text>
            <text x="300" y="210" fill="#60a5fa" fontSize="14" fontWeight="bold" textAnchor="middle">1 <tspan fontSize="8" fill="#3b82f6">m15</tspan></text>
            <text x="360" y="210" fill="#64748b" fontSize="13" textAnchor="middle">0 <tspan fontSize="8">m14</tspan></text>

            {/* Row 10 */}
            <text x="180" y="260" fill="#94a3b8" fontSize="13" textAnchor="middle">1 <tspan fontSize="8" fill="#64748b">m8</tspan></text>
            <text x="240" y="260" fill="#60a5fa" fontSize="14" fontWeight="bold" textAnchor="middle">1 <tspan fontSize="8" fill="#3b82f6">m9</tspan></text>
            <text x="300" y="260" fill="#60a5fa" fontSize="14" fontWeight="bold" textAnchor="middle">1 <tspan fontSize="8" fill="#3b82f6">m11</tspan></text>
            <text x="360" y="260" fill="#94a3b8" fontSize="13" textAnchor="middle">1 <tspan fontSize="8" fill="#64748b">m10</tspan></text>

            {/* Right Synthesis Proof Panel */}
            <rect x="420" y="80" width="210" height="190" fill="#1e293b" stroke="#475569" rx="8" />
            <text x="430" y="105" fill="#f59e0b" fontSize="11" fontWeight="bold">SYNTHESIS DERIVATION:</text>
            <text x="430" y="130" fill="#94a3b8" fontSize="10">Group 1 (Blue Octet):</text>
            <text x="430" y="146" fill="#60a5fa" fontSize="11" fontWeight="bold">Term 1 = D</text>

            <text x="430" y="175" fill="#94a3b8" fontSize="10">Group 2 (Green 4-Corners):</text>
            <text x="430" y="191" fill="#34d399" fontSize="11" fontWeight="bold">m0, m2, m8, m10 = B' · D'</text>

            <line x1="430" y1="210" x2="615" y2="210" stroke="#334155" />
            <text x="430" y="232" fill="#e2e8f0" fontSize="10">MINIMAL SOP EQUATION:</text>
            <text x="430" y="254" fill="#38bdf8" fontSize="13" fontWeight="bold">F(A,B,C,D) = D + B'D'</text>
          </svg>
        );

      case 'HALF_FULL_ADDER_SCHEMATIC':
        return (
          <svg viewBox="0 0 650 300" className="w-full h-auto max-h-[320px] select-none font-mono">
            <rect x="0" y="0" width="650" height="300" fill="#0f172a" rx="12" />
            <text x="325" y="26" fill="#94a3b8" fontSize="13" fontWeight="bold" textAnchor="middle">
              FULL ADDER IMPLEMENTATION VIA TWO HALF ADDERS + OR GATE
            </text>

            {/* Half Adder 1 Box */}
            <rect x="70" y="60" width="190" height="180" fill="#1e293b" stroke="#3b82f6" strokeWidth="2" strokeDasharray="4 4" rx="8" />
            <text x="165" y="80" fill="#60a5fa" fontSize="11" fontWeight="bold" textAnchor="middle">HALF ADDER 1</text>

            {/* Inputs A & B */}
            <text x="25" y="115" fill="#e2e8f0" fontSize="12" fontWeight="bold">A</text>
            <line x1="40" y1="110" x2="90" y2="110" stroke="#38bdf8" strokeWidth="2.5" />
            <text x="25" y="155" fill="#e2e8f0" fontSize="12" fontWeight="bold">B</text>
            <line x1="40" y1="150" x2="90" y2="150" stroke="#38bdf8" strokeWidth="2.5" />

            {/* HA1 XOR Gate */}
            <rect x="90" y="95" width="70" height="40" fill="#1d4ed8" rx="6" />
            <text x="125" y="120" fill="#ffffff" fontSize="12" fontWeight="bold" textAnchor="middle">XOR 1</text>

            {/* HA1 AND Gate */}
            <rect x="90" y="160" width="70" height="40" fill="#0284c7" rx="6" />
            <text x="125" y="185" fill="#ffffff" fontSize="12" fontWeight="bold" textAnchor="middle">AND 1</text>

            {/* Wire connections inside HA1 */}
            <line x1="60" y1="110" x2="60" y2="170" stroke="#38bdf8" strokeWidth="2" />
            <line x1="60" y1="170" x2="90" y2="170" stroke="#38bdf8" strokeWidth="2" />
            <line x1="75" y1="150" x2="75" y2="190" stroke="#38bdf8" strokeWidth="2" />
            <line x1="75" y1="190" x2="90" y2="190" stroke="#38bdf8" strokeWidth="2" />

            {/* Half Adder 2 Box */}
            <rect x="300" y="60" width="190" height="180" fill="#1e293b" stroke="#10b981" strokeWidth="2" strokeDasharray="4 4" rx="8" />
            <text x="395" y="80" fill="#34d399" fontSize="11" fontWeight="bold" textAnchor="middle">HALF ADDER 2</text>

            {/* Wire S1 = A ⊕ B */}
            <line x1="160" y1="115" x2="320" y2="115" stroke="#38bdf8" strokeWidth="2.5" />
            <text x="240" y="108" fill="#38bdf8" fontSize="10" textAnchor="middle">S1 = A ⊕ B</text>

            {/* Cin input */}
            <text x="250" y="155" fill="#e2e8f0" fontSize="12" fontWeight="bold">C_in</text>
            <line x1="280" y1="150" x2="320" y2="150" stroke="#f59e0b" strokeWidth="2.5" />

            {/* HA2 XOR Gate */}
            <rect x="320" y="100" width="70" height="40" fill="#047857" rx="6" />
            <text x="355" y="125" fill="#ffffff" fontSize="12" fontWeight="bold" textAnchor="middle">XOR 2</text>

            {/* HA2 AND Gate */}
            <rect x="320" y="160" width="70" height="40" fill="#059669" rx="6" />
            <text x="355" y="185" fill="#ffffff" fontSize="12" fontWeight="bold" textAnchor="middle">AND 2</text>

            {/* Final Sum Output */}
            <line x1="390" y1="120" x2="600" y2="120" stroke="#10b981" strokeWidth="3" />
            <circle cx="600" cy="120" r="5" fill="#10b981" />
            <text x="615" y="125" fill="#34d399" fontSize="14" fontWeight="bold">SUM = A ⊕ B ⊕ C_in</text>

            {/* Final Carry OR Gate */}
            <rect x="520" y="180" width="60" height="45" fill="#b45309" rx="6" />
            <text x="550" y="208" fill="#ffffff" fontSize="12" fontWeight="bold" textAnchor="middle">OR</text>

            {/* AND1 Carry wire to OR */}
            <line x1="160" y1="180" x2="220" y2="180" stroke="#38bdf8" strokeWidth="2" />
            <line x1="220" y1="180" x2="220" y2="260" stroke="#38bdf8" strokeWidth="2" />
            <line x1="220" y1="260" x2="500" y2="260" stroke="#38bdf8" strokeWidth="2" />
            <line x1="500" y1="260" x2="500" y2="210" stroke="#38bdf8" strokeWidth="2" />
            <line x1="500" y1="210" x2="520" y2="210" stroke="#38bdf8" strokeWidth="2" />

            {/* AND2 Carry wire to OR */}
            <line x1="390" y1="180" x2="520" y2="190" stroke="#10b981" strokeWidth="2" />

            {/* Final Carry Out */}
            <line x1="580" y1="202" x2="600" y2="202" stroke="#f59e0b" strokeWidth="3" />
            <circle cx="600" cy="202" r="5" fill="#f59e0b" />
            <text x="615" y="206" fill="#fbbf24" fontSize="13" fontWeight="bold">C_out = (A·B) + C_in·(A⊕B)</text>
          </svg>
        );

      case 'D_FLIP_FLOP_TIMING':
        return (
          <svg viewBox="0 0 650 320" className="w-full h-auto max-h-[340px] select-none font-mono">
            <rect x="0" y="0" width="650" height="320" fill="#0f172a" rx="12" />
            <text x="325" y="26" fill="#94a3b8" fontSize="13" fontWeight="bold" textAnchor="middle">
              EDGE-TRIGGERED D FLIP-FLOP: SETUP TIME, HOLD TIME & PROPAGATION DELAY
            </text>

            {/* Critical Clock Trigger Line (Positive Edge at x = 280) */}
            <line x1="280" y1="45" x2="280" y2="280" stroke="#f43f5e" strokeWidth="2" strokeDasharray="3 3" />
            <text x="280" y="42" fill="#fb7185" fontSize="10" fontWeight="bold" textAnchor="middle">
              TRIGGER EDGE ↑
            </text>

            {/* Setup Time Shaded Window [210 to 280] */}
            <rect x="220" y="55" width="60" height="225" fill="rgba(59, 130, 246, 0.15)" stroke="#3b82f6" strokeDasharray="2 2" />
            <text x="250" y="70" fill="#60a5fa" fontSize="10" fontWeight="bold" textAnchor="middle">
              t_setup
            </text>

            {/* Hold Time Shaded Window [280 to 330] */}
            <rect x="280" y="55" width="50" height="225" fill="rgba(245, 158, 11, 0.15)" stroke="#f59e0b" strokeDasharray="2 2" />
            <text x="305" y="70" fill="#fbbf24" fontSize="10" fontWeight="bold" textAnchor="middle">
              t_hold
            </text>

            {/* Signal 1: CLK Waveform */}
            <text x="30" y="115" fill="#e2e8f0" fontSize="12" fontWeight="bold">CLOCK</text>
            <path
              d="M 100 130 L 280 130 L 280 90 L 460 90 L 460 130 L 600 130"
              fill="none"
              stroke="#e2e8f0"
              strokeWidth="2.5"
            />

            {/* Signal 2: Data Input (D) Waveform */}
            <text x="30" y="180" fill="#38bdf8" fontSize="12" fontWeight="bold">DATA (D)</text>
            <path
              d="M 100 200 L 200 200 L 220 160 L 400 160 L 420 200 L 600 200"
              fill="none"
              stroke="#38bdf8"
              strokeWidth="2.5"
            />
            <text x="140" y="195" fill="#64748b" fontSize="9">Must remain stable!</text>

            {/* Signal 3: Output Q Waveform (with Propagation Delay t_cq) */}
            <text x="30" y="245" fill="#34d399" fontSize="12" fontWeight="bold">OUTPUT (Q)</text>
            <path
              d="M 100 265 L 340 265 L 355 225 L 600 225"
              fill="none"
              stroke="#34d399"
              strokeWidth="3"
            />

            {/* Propagation Delay Marker (from 280 to 345) */}
            <line x1="280" y1="240" x2="355" y2="240" stroke="#a78bfa" strokeWidth="2" markerEnd="url(#arrow)" />
            <text x="318" y="235" fill="#c084fc" fontSize="10" fontWeight="bold" textAnchor="middle">
              t_c→q
            </text>

            {/* Bottom Engineering Rules */}
            <rect x="80" y="285" width="490" height="25" fill="#1e293b" rx="6" />
            <text x="325" y="302" fill="#cbd5e1" fontSize="10" textAnchor="middle">
              TIMING CLOSURE FORMULA: T_clock &gt;= t_c→q + t_logic_comb + t_setup
            </text>
          </svg>
        );

      case 'RIPPLE_COUNTER_4BIT_WAVEFORMS':
        return (
          <svg viewBox="0 0 650 330" className="w-full h-auto max-h-[350px] select-none font-mono">
            <rect x="0" y="0" width="650" height="330" fill="#0f172a" rx="12" />
            <text x="325" y="26" fill="#94a3b8" fontSize="13" fontWeight="bold" textAnchor="middle">
              4-BIT ASYNCHRONOUS RIPPLE COUNTER (CUMULATIVE DELAY & GLITCHES)
            </text>

            {/* CLK Signal */}
            <text x="25" y="65" fill="#94a3b8" fontSize="11" fontWeight="bold">CLK IN</text>
            <path
              d="M 90 70 L 120 70 L 120 50 L 150 50 L 150 70 L 180 70 L 180 50 L 210 50 L 210 70 L 240 70 L 240 50 L 270 50 L 270 70 L 300 70 L 300 50 L 330 50 L 330 70 L 360 70 L 360 50 L 390 50 L 390 70 L 420 70 L 420 50 L 450 50 L 450 70 L 480 70 L 480 50 L 510 50 L 510 70 L 540 70 L 540 50 L 570 50 L 570 70 L 600 70"
              fill="none"
              stroke="#64748b"
              strokeWidth="2"
            />

            {/* Q0 (Div by 2) */}
            <text x="25" y="125" fill="#38bdf8" fontSize="11" fontWeight="bold">Q0 (LSB)</text>
            <path
              d="M 90 135 L 125 135 L 130 105 L 185 105 L 190 135 L 245 135 L 250 105 L 305 105 L 310 135 L 365 135 L 370 105 L 425 105 L 430 135 L 485 135 L 490 105 L 545 105 L 550 135 L 600 135"
              fill="none"
              stroke="#38bdf8"
              strokeWidth="2.5"
            />
            <text x="605" y="125" fill="#38bdf8" fontSize="10">f/2</text>

            {/* Q1 (Div by 4 with delta t lag) */}
            <text x="25" y="180" fill="#34d399" fontSize="11" fontWeight="bold">Q1</text>
            <path
              d="M 90 190 L 198 190 L 204 160 L 320 160 L 326 190 L 440 190 L 446 160 L 560 160 L 566 190 L 600 190"
              fill="none"
              stroke="#34d399"
              strokeWidth="2.5"
            />
            <text x="605" y="180" fill="#34d399" fontSize="10">f/4</text>

            {/* Q2 (Div by 8 with 2 delta t lag) */}
            <text x="25" y="235" fill="#f59e0b" fontSize="11" fontWeight="bold">Q2</text>
            <path
              d="M 90 245 L 334 245 L 342 215 L 576 215 L 584 245 L 600 245"
              fill="none"
              stroke="#f59e0b"
              strokeWidth="2.5"
            />
            <text x="605" y="235" fill="#f59e0b" fontSize="10">f/8</text>

            {/* Q3 (Div by 16 with 3 delta t cumulative ripple delay) */}
            <text x="25" y="290" fill="#f43f5e" fontSize="11" fontWeight="bold">Q3 (MSB)</text>
            <path
              d="M 90 300 L 594 300 L 600 270"
              fill="none"
              stroke="#f43f5e"
              strokeWidth="2.5"
            />
            <text x="605" y="290" fill="#f43f5e" fontSize="10">f/16</text>

            {/* Cumulative Ripple Delay Highlight Marker */}
            <line x1="120" y1="40" x2="120" y2="135" stroke="#475569" strokeDasharray="2 2" />
            <line x1="180" y1="40" x2="180" y2="190" stroke="#475569" strokeDasharray="2 2" />
            <line x1="300" y1="40" x2="300" y2="245" stroke="#475569" strokeDasharray="2 2" />

            {/* Bottom Caution Banner */}
            <text x="325" y="322" fill="#fca5a5" fontSize="10" fontWeight="bold" textAnchor="middle">
              CRITICAL LIMITATION: Total Ripple Delay = N × t_pd. Causes decoding spikes (glitches) at high speeds!
            </text>
          </svg>
        );

      case 'R2R_LADDER_DAC':
        return (
          <svg viewBox="0 0 650 300" className="w-full h-auto max-h-[320px] select-none font-mono">
            <rect x="0" y="0" width="650" height="300" fill="#0f172a" rx="12" />
            <text x="325" y="26" fill="#94a3b8" fontSize="13" fontWeight="bold" textAnchor="middle">
              4-BIT R-2R LADDER DIGITAL-TO-ANALOG CONVERTER (DAC)
            </text>

            {/* Ground termination resistor 2R */}
            <line x1="70" y1="180" x2="70" y2="130" stroke="#38bdf8" strokeWidth="2" />
            <rect x="60" y="130" width="20" height="40" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" rx="3" />
            <text x="50" y="155" fill="#38bdf8" fontSize="10" textAnchor="end">2R</text>
            <line x1="70" y1="180" x2="70" y2="200" stroke="#64748b" strokeWidth="2" />
            {/* Ground symbol */}
            <line x1="55" y1="200" x2="85" y2="200" stroke="#64748b" strokeWidth="2" />
            <line x1="60" y1="205" x2="80" y2="205" stroke="#64748b" strokeWidth="2" />

            {/* Node 0 */}
            <circle cx="120" cy="110" r="4" fill="#60a5fa" />
            <text x="120" y="95" fill="#93c5fd" fontSize="10" textAnchor="middle">Node 0</text>

            {/* Series Resistor R between 70 and 120 */}
            <line x1="70" y1="110" x2="90" y2="110" stroke="#38bdf8" strokeWidth="2" />
            <line x1="70" y1="130" x2="70" y2="110" stroke="#38bdf8" strokeWidth="2" />

            {/* Vertical Bit 0 (LSB) leg: 2R resistor */}
            <rect x="110" y="130" width="20" height="40" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" rx="3" />
            <text x="100" y="155" fill="#38bdf8" fontSize="10" textAnchor="end">2R</text>
            <line x1="120" y1="110" x2="120" y2="130" stroke="#38bdf8" strokeWidth="2" />
            <line x1="120" y1="170" x2="120" y2="200" stroke="#38bdf8" strokeWidth="2" />
            <circle cx="120" cy="200" r="4" fill="#38bdf8" />
            <text x="120" y="225" fill="#38bdf8" fontSize="11" fontWeight="bold" textAnchor="middle">D0 (LSB)</text>

            {/* Series Resistor R between Node 0 and Node 1 */}
            <line x1="120" y1="110" x2="140" y2="110" stroke="#38bdf8" strokeWidth="2" />
            <rect x="140" y="100" width="40" height="20" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" rx="3" />
            <text x="160" y="90" fill="#38bdf8" fontSize="10" textAnchor="middle">R</text>
            <line x1="180" y1="110" x2="210" y2="110" stroke="#38bdf8" strokeWidth="2" />

            {/* Node 1 */}
            <circle cx="210" cy="110" r="4" fill="#60a5fa" />
            <text x="210" y="95" fill="#93c5fd" fontSize="10" textAnchor="middle">Node 1</text>
            <rect x="200" y="130" width="20" height="40" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" rx="3" />
            <text x="190" y="155" fill="#38bdf8" fontSize="10" textAnchor="end">2R</text>
            <line x1="210" y1="110" x2="210" y2="130" stroke="#38bdf8" strokeWidth="2" />
            <line x1="210" y1="170" x2="210" y2="200" stroke="#38bdf8" strokeWidth="2" />
            <circle cx="210" cy="200" r="4" fill="#38bdf8" />
            <text x="210" y="225" fill="#38bdf8" fontSize="11" fontWeight="bold" textAnchor="middle">D1</text>

            {/* Series Resistor R between Node 1 and Node 2 */}
            <line x1="210" y1="110" x2="230" y2="110" stroke="#38bdf8" strokeWidth="2" />
            <rect x="230" y="100" width="40" height="20" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" rx="3" />
            <text x="250" y="90" fill="#38bdf8" fontSize="10" textAnchor="middle">R</text>
            <line x1="270" y1="110" x2="300" y2="110" stroke="#38bdf8" strokeWidth="2" />

            {/* Node 2 */}
            <circle cx="300" cy="110" r="4" fill="#60a5fa" />
            <text x="300" y="95" fill="#93c5fd" fontSize="10" textAnchor="middle">Node 2</text>
            <rect x="290" y="130" width="20" height="40" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" rx="3" />
            <text x="280" y="155" fill="#38bdf8" fontSize="10" textAnchor="end">2R</text>
            <line x1="300" y1="110" x2="300" y2="130" stroke="#38bdf8" strokeWidth="2" />
            <line x1="300" y1="170" x2="300" y2="200" stroke="#38bdf8" strokeWidth="2" />
            <circle cx="300" cy="200" r="4" fill="#38bdf8" />
            <text x="300" y="225" fill="#38bdf8" fontSize="11" fontWeight="bold" textAnchor="middle">D2</text>

            {/* Series Resistor R between Node 2 and Node 3 */}
            <line x1="300" y1="110" x2="320" y2="110" stroke="#38bdf8" strokeWidth="2" />
            <rect x="320" y="100" width="40" height="20" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" rx="3" />
            <text x="340" y="90" fill="#38bdf8" fontSize="10" textAnchor="middle">R</text>
            <line x1="360" y1="110" x2="390" y2="110" stroke="#38bdf8" strokeWidth="2" />

            {/* Node 3 (MSB) */}
            <circle cx="390" cy="110" r="4" fill="#60a5fa" />
            <text x="390" y="95" fill="#93c5fd" fontSize="10" textAnchor="middle">Node 3</text>
            <rect x="380" y="130" width="20" height="40" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" rx="3" />
            <text x="370" y="155" fill="#38bdf8" fontSize="10" textAnchor="end">2R</text>
            <line x1="390" y1="110" x2="390" y2="130" stroke="#38bdf8" strokeWidth="2" />
            <line x1="390" y1="170" x2="390" y2="200" stroke="#38bdf8" strokeWidth="2" />
            <circle cx="390" cy="200" r="4" fill="#f59e0b" />
            <text x="390" y="225" fill="#f59e0b" fontSize="11" fontWeight="bold" textAnchor="middle">D3 (MSB)</text>

            {/* Connection to Op-Amp Inverting Terminal */}
            <line x1="390" y1="110" x2="460" y2="110" stroke="#38bdf8" strokeWidth="2.5" />

            {/* Op-Amp Triangle */}
            <polygon points="460,80 460,160 530,120" fill="#1e293b" stroke="#10b981" strokeWidth="2" />
            <text x="470" y="115" fill="#ffffff" fontSize="14" fontWeight="bold">-</text>
            <text x="470" y="145" fill="#ffffff" fontSize="14" fontWeight="bold">+</text>

            {/* Ground Non-Inverting Terminal */}
            <line x1="460" y1="140" x2="430" y2="140" stroke="#64748b" strokeWidth="2" />
            <line x1="430" y1="140" x2="430" y2="160" stroke="#64748b" strokeWidth="2" />
            <line x1="420" y1="160" x2="440" y2="160" stroke="#64748b" strokeWidth="2" />

            {/* Feedback Resistor Rf = R */}
            <line x1="450" y1="110" x2="450" y2="60" stroke="#38bdf8" strokeWidth="2" />
            <line x1="450" y1="60" x2="480" y2="60" stroke="#38bdf8" strokeWidth="2" />
            <rect x="480" y="50" width="40" height="20" fill="#1e293b" stroke="#10b981" strokeWidth="2" rx="3" />
            <text x="500" y="42" fill="#10b981" fontSize="10" textAnchor="middle">Rf = R</text>
            <line x1="520" y1="60" x2="550" y2="60" stroke="#38bdf8" strokeWidth="2" />
            <line x1="550" y1="60" x2="550" y2="120" stroke="#38bdf8" strokeWidth="2" />

            {/* Output V_out */}
            <line x1="530" y1="120" x2="600" y2="120" stroke="#10b981" strokeWidth="3" />
            <circle cx="600" cy="120" r="5" fill="#10b981" />
            <text x="610" y="125" fill="#34d399" fontSize="13" fontWeight="bold">V_out</text>

            {/* Formula Banner */}
            <rect x="80" y="255" width="490" height="30" fill="#1e293b" rx="6" />
            <text x="325" y="275" fill="#38bdf8" fontSize="11" fontWeight="bold" textAnchor="middle">
              V_out = -V_ref × (D3/2 + D2/4 + D1/8 + D0/16) (Only 2 resistor values required!)
            </text>
          </svg>
        );

      case 'CMOS_INVERTER_AND_VTC':
        return (
          <svg viewBox="0 0 650 320" className="w-full h-auto max-h-[340px] select-none font-mono">
            <rect x="0" y="0" width="650" height="320" fill="#0f172a" rx="12" />
            <text x="325" y="26" fill="#94a3b8" fontSize="13" fontWeight="bold" textAnchor="middle">
              CMOS INVERTER CIRCUIT SCHEMATIC & VOLTAGE TRANSFER CHARACTERISTIC (VTC)
            </text>

            {/* Left Side: CMOS Transistor Schematic */}
            <text x="140" y="55" fill="#e2e8f0" fontSize="11" fontWeight="bold" textAnchor="middle">
              TRANSISTOR TOPOLOGY
            </text>

            {/* VDD Supply Rail */}
            <line x1="80" y1="70" x2="200" y2="70" stroke="#ef4444" strokeWidth="3" />
            <text x="140" y="65" fill="#ef4444" fontSize="10" fontWeight="bold" textAnchor="middle">V_DD (+5V / +3.3V)</text>

            {/* PMOS Transistor (Pull-Up Network) */}
            <line x1="140" y1="70" x2="140" y2="100" stroke="#ef4444" strokeWidth="2" />
            <rect x="120" y="100" width="40" height="40" fill="#1e293b" stroke="#3b82f6" strokeWidth="2" rx="4" />
            <circle cx="114" cy="120" r="5" fill="none" stroke="#3b82f6" strokeWidth="2" />
            <text x="140" y="125" fill="#60a5fa" fontSize="11" fontWeight="bold" textAnchor="middle">PMOS</text>

            {/* Common Output Wire */}
            <line x1="140" y1="140" x2="140" y2="180" stroke="#10b981" strokeWidth="2.5" />
            <circle cx="140" cy="160" r="4" fill="#10b981" />
            <line x1="140" y1="160" x2="220" y2="160" stroke="#10b981" strokeWidth="3" />
            <text x="230" y="165" fill="#34d399" fontSize="12" fontWeight="bold">V_out</text>

            {/* NMOS Transistor (Pull-Down Network) */}
            <rect x="120" y="180" width="40" height="40" fill="#1e293b" stroke="#10b981" strokeWidth="2" rx="4" />
            <text x="140" y="205" fill="#34d399" fontSize="11" fontWeight="bold" textAnchor="middle">NMOS</text>
            <line x1="140" y1="220" x2="140" y2="250" stroke="#64748b" strokeWidth="2" />

            {/* Ground Rail */}
            <line x1="100" y1="250" x2="180" y2="250" stroke="#64748b" strokeWidth="3" />
            <text x="140" y="270" fill="#64748b" fontSize="10" textAnchor="middle">GND (0V)</text>

            {/* Input Line V_in tied to both gates */}
            <line x1="50" y1="160" x2="90" y2="160" stroke="#38bdf8" strokeWidth="2.5" />
            <line x1="90" y1="120" x2="108" y2="120" stroke="#38bdf8" strokeWidth="2" />
            <line x1="90" y1="200" x2="120" y2="200" stroke="#38bdf8" strokeWidth="2" />
            <line x1="90" y1="120" x2="90" y2="200" stroke="#38bdf8" strokeWidth="2" />
            <text x="40" y="165" fill="#38bdf8" fontSize="12" fontWeight="bold">V_in</text>

            {/* Right Side: VTC Curve */}
            <text x="460" y="55" fill="#e2e8f0" fontSize="11" fontWeight="bold" textAnchor="middle">
              VOLTAGE TRANSFER CHARACTERISTIC (VTC)
            </text>

            {/* VTC Coordinate Axes */}
            <line x1="330" y1="260" x2="590" y2="260" stroke="#475569" strokeWidth="2" />
            <line x1="330" y1="70" x2="330" y2="260" stroke="#475569" strokeWidth="2" />
            <text x="590" y="280" fill="#94a3b8" fontSize="11">V_in</text>
            <text x="310" y="75" fill="#94a3b8" fontSize="11">V_out</text>

            {/* Transfer Curve Shape */}
            <path
              d="M 330 90 L 410 90 C 430 90, 440 100, 450 160 C 460 220, 470 260, 560 260"
              fill="none"
              stroke="#38bdf8"
              strokeWidth="3"
            />

            {/* Inverter Switching Threshold V_M = VDD/2 */}
            <circle cx="450" cy="160" r="5" fill="#f59e0b" />
            <line x1="450" y1="160" x2="450" y2="260" stroke="#f59e0b" strokeDasharray="3 3" />
            <text x="450" y="275" fill="#f59e0b" fontSize="10" textAnchor="middle">V_M = VDD/2</text>

            {/* 5 Operating Regions */}
            <text x="360" y="120" fill="#60a5fa" fontSize="9">Region I: NMOS Cutoff, PMOS Linear (Vout = VDD)</text>
            <text x="455" y="140" fill="#cbd5e1" fontSize="9">Region III: Both Saturation (Transition)</text>
            <text x="470" y="240" fill="#34d399" fontSize="9">Region V: NMOS Linear, PMOS Cutoff (Vout = 0)</text>

            <rect x="330" y="295" width="280" height="20" fill="#1e293b" rx="4" />
            <text x="470" y="309" fill="#a7f3d0" fontSize="9" textAnchor="middle">
              ZERO static DC power consumption in stable state!
            </text>
          </svg>
        );

      case 'DEMORGAN_AND_BUBBLE_LOGIC':
        return (
          <svg viewBox="0 0 650 330" className="w-full h-auto max-h-[350px] select-none font-mono">
            <rect x="0" y="0" width="650" height="330" fill="#0f172a" rx="12" />
            <text x="325" y="26" fill="#94a3b8" fontSize="13" fontWeight="bold" textAnchor="middle">
              DE MORGAN'S THEOREMS & BUBBLE LOGIC EQUIVALENCE
            </text>

            {/* Row 1: Theorem 1 (A · B)' = A' + B' */}
            <rect x="30" y="45" width="590" height="120" fill="#1e293b" stroke="#3b82f6" strokeWidth="1.5" rx="8" />
            <text x="45" y="68" fill="#60a5fa" fontSize="12" fontWeight="bold">
              THEOREM 1: (A · B)' = A' + B' (NAND Gate ≡ Bubbled OR Gate)
            </text>

            {/* NAND Gate on Left */}
            <text x="50" y="105" fill="#e2e8f0" fontSize="11" fontWeight="bold">A</text>
            <line x1="65" y1="100" x2="110" y2="100" stroke="#38bdf8" strokeWidth="2" />
            <text x="50" y="135" fill="#e2e8f0" fontSize="11" fontWeight="bold">B</text>
            <line x1="65" y1="130" x2="110" y2="130" stroke="#38bdf8" strokeWidth="2" />
            {/* Gate Body */}
            <path d="M 110 85 L 140 85 A 30 30 0 0 1 140 145 L 110 145 Z" fill="#1d4ed8" stroke="#60a5fa" strokeWidth="2" />
            <circle cx="174" cy="115" r="5" fill="#0f172a" stroke="#60a5fa" strokeWidth="2" />
            <line x1="179" y1="115" x2="225" y2="115" stroke="#38bdf8" strokeWidth="2.5" />
            <text x="235" y="120" fill="#93c5fd" fontSize="12" fontWeight="bold">(A·B)'</text>

            {/* Equals Symbol */}
            <text x="310" y="122" fill="#f59e0b" fontSize="24" fontWeight="bold" textAnchor="middle">≡</text>

            {/* Bubbled OR Gate on Right */}
            <text x="365" y="105" fill="#e2e8f0" fontSize="11" fontWeight="bold">A</text>
            <line x1="380" y1="100" x2="410" y2="100" stroke="#38bdf8" strokeWidth="2" />
            <circle cx="415" cy="100" r="4.5" fill="#0f172a" stroke="#f43f5e" strokeWidth="2" />
            <text x="365" y="135" fill="#e2e8f0" fontSize="11" fontWeight="bold">B</text>
            <line x1="380" y1="130" x2="410" y2="130" stroke="#38bdf8" strokeWidth="2" />
            <circle cx="415" cy="130" r="4.5" fill="#0f172a" stroke="#f43f5e" strokeWidth="2" />
            {/* OR Gate Body */}
            <path d="M 420 85 Q 435 115 420 145 Q 460 145 475 115 Q 460 85 420 85 Z" fill="#047857" stroke="#34d399" strokeWidth="2" />
            <line x1="475" y1="115" x2="520" y2="115" stroke="#34d399" strokeWidth="2.5" />
            <text x="530" y="120" fill="#a7f3d0" fontSize="12" fontWeight="bold">A' + B'</text>

            {/* Row 2: Theorem 2 (A + B)' = A' · B' */}
            <rect x="30" y="180" width="590" height="120" fill="#1e293b" stroke="#10b981" strokeWidth="1.5" rx="8" />
            <text x="45" y="203" fill="#34d399" fontSize="12" fontWeight="bold">
              THEOREM 2: (A + B)' = A' · B' (NOR Gate ≡ Bubbled AND Gate)
            </text>

            {/* NOR Gate on Left */}
            <text x="50" y="240" fill="#e2e8f0" fontSize="11" fontWeight="bold">A</text>
            <line x1="65" y1="235" x2="105" y2="235" stroke="#34d399" strokeWidth="2" />
            <text x="50" y="270" fill="#e2e8f0" fontSize="11" fontWeight="bold">B</text>
            <line x1="65" y1="265" x2="105" y2="265" stroke="#34d399" strokeWidth="2" />
            <path d="M 105 220 Q 120 250 105 280 Q 145 280 160 250 Q 145 220 105 220 Z" fill="#047857" stroke="#34d399" strokeWidth="2" />
            <circle cx="165" cy="250" r="5" fill="#0f172a" stroke="#34d399" strokeWidth="2" />
            <line x1="170" y1="250" x2="225" y2="250" stroke="#34d399" strokeWidth="2.5" />
            <text x="235" y="255" fill="#a7f3d0" fontSize="12" fontWeight="bold">(A+B)'</text>

            {/* Equals Symbol */}
            <text x="310" y="257" fill="#f59e0b" fontSize="24" fontWeight="bold" textAnchor="middle">≡</text>

            {/* Bubbled AND Gate on Right */}
            <text x="365" y="240" fill="#e2e8f0" fontSize="11" fontWeight="bold">A</text>
            <line x1="380" y1="235" x2="410" y2="235" stroke="#38bdf8" strokeWidth="2" />
            <circle cx="415" cy="235" r="4.5" fill="#0f172a" stroke="#f43f5e" strokeWidth="2" />
            <text x="365" y="270" fill="#e2e8f0" fontSize="11" fontWeight="bold">B</text>
            <line x1="380" y1="265" x2="410" y2="265" stroke="#38bdf8" strokeWidth="2" />
            <circle cx="415" cy="265" r="4.5" fill="#0f172a" stroke="#f43f5e" strokeWidth="2" />
            <path d="M 420 220 L 450 220 A 30 30 0 0 1 450 280 L 420 280 Z" fill="#1d4ed8" stroke="#60a5fa" strokeWidth="2" />
            <line x1="480" y1="250" x2="520" y2="250" stroke="#60a5fa" strokeWidth="2.5" />
            <text x="530" y="255" fill="#93c5fd" fontSize="12" fontWeight="bold">A' · B'</text>

            {/* Footer Rule */}
            <text x="325" y="318" fill="#e2e8f0" fontSize="10" textAnchor="middle">
              GOLDEN RULE: Break the bar, change the operator (AND ↔ OR), and cancel double bubbles (A'' = A).
            </text>
          </svg>
        );

      case 'LOGIC_GATES_PINOUT_AND_WAVEFORMS':
        return (
          <svg viewBox="0 0 650 330" className="w-full h-auto max-h-[350px] select-none font-mono">
            <rect x="0" y="0" width="650" height="330" fill="#0f172a" rx="12" />
            <text x="325" y="24" fill="#94a3b8" fontSize="13" fontWeight="bold" textAnchor="middle">
              LOGIC GATE SYMBOLS, DUAL-EDGE PROPAGATION DELAY & 7400 IC PINOUT
            </text>

            {/* Left Box: 7 Standard Gate Symbols Grid */}
            <rect x="25" y="40" width="280" height="275" fill="#1e293b" stroke="#334155" rx="8" />
            <text x="165" y="60" fill="#38bdf8" fontSize="11" fontWeight="bold" textAnchor="middle">
              IEEE STANDARD SYMBOLS
            </text>

            {/* Gate 1: AND */}
            <rect x="35" y="75" width="70" height="28" fill="#1d4ed8" rx="4" />
            <text x="70" y="93" fill="#ffffff" fontSize="10" fontWeight="bold" textAnchor="middle">AND: A·B</text>
            {/* Gate 2: OR */}
            <rect x="115" y="75" width="70" height="28" fill="#047857" rx="4" />
            <text x="150" y="93" fill="#ffffff" fontSize="10" fontWeight="bold" textAnchor="middle">OR: A+B</text>
            {/* Gate 3: NOT */}
            <rect x="195" y="75" width="60" height="28" fill="#b91c1c" rx="4" />
            <text x="225" y="93" fill="#ffffff" fontSize="10" fontWeight="bold" textAnchor="middle">NOT: A'</text>

            {/* Gate 4: NAND */}
            <rect x="35" y="115" width="75" height="28" fill="#6d28d9" rx="4" />
            <text x="72" y="133" fill="#ffffff" fontSize="10" fontWeight="bold" textAnchor="middle">NAND: (AB)'</text>
            {/* Gate 5: NOR */}
            <rect x="120" y="115" width="75" height="28" fill="#0e7490" rx="4" />
            <text x="157" y="133" fill="#ffffff" fontSize="10" fontWeight="bold" textAnchor="middle">NOR: (A+B)'</text>
            {/* Gate 6: XOR */}
            <rect x="205" y="115" width="85" height="28" fill="#c2410c" rx="4" />
            <text x="247" y="133" fill="#ffffff" fontSize="10" fontWeight="bold" textAnchor="middle">XOR: A⊕B</text>

            {/* 7400 IC DIP-14 Pinout on lower left */}
            <rect x="40" y="160" width="250" height="140" fill="#090d16" stroke="#475569" rx="6" />
            <text x="165" y="180" fill="#f59e0b" fontSize="11" fontWeight="bold" textAnchor="middle">
              74HC00 QUAD 2-INPUT NAND (DIP-14)
            </text>
            <circle cx="55" cy="195" r="4" fill="#3b82f6" />
            <text x="65" y="199" fill="#94a3b8" fontSize="9">Pin 1: 1A</text>
            <text x="65" y="217" fill="#94a3b8" fontSize="9">Pin 2: 1B</text>
            <text x="65" y="235" fill="#34d399" fontSize="9" fontWeight="bold">Pin 3: 1Y (Out)</text>
            <text x="65" y="253" fill="#94a3b8" fontSize="9">Pin 4: 2A</text>
            <text x="65" y="271" fill="#94a3b8" fontSize="9">Pin 5: 2B</text>
            <text x="65" y="289" fill="#ef4444" fontSize="9" fontWeight="bold">Pin 7: GND (0V)</text>

            <text x="175" y="199" fill="#ef4444" fontSize="9" fontWeight="bold">Pin 14: VCC (+5V)</text>
            <text x="175" y="217" fill="#94a3b8" fontSize="9">Pin 13: 4B</text>
            <text x="175" y="235" fill="#94a3b8" fontSize="9">Pin 12: 4A</text>
            <text x="175" y="253" fill="#34d399" fontSize="9" fontWeight="bold">Pin 11: 4Y (Out)</text>
            <text x="175" y="271" fill="#94a3b8" fontSize="9">Pin 10: 3B</text>
            <text x="175" y="289" fill="#94a3b8" fontSize="9">Pin 9: 3A</text>

            {/* Right Box: Waveform & Propagation Delay (t_PLH, t_PHL) */}
            <rect x="320" y="40" width="305" height="275" fill="#1e293b" stroke="#334155" rx="8" />
            <text x="472" y="60" fill="#38bdf8" fontSize="11" fontWeight="bold" textAnchor="middle">
              TIMING WAVEFORM & PROPAGATION DELAY (t_pd)
            </text>

            {/* Input Waveform Vin */}
            <text x="335" y="95" fill="#94a3b8" fontSize="10" fontWeight="bold">IN (A)</text>
            <path d="M 375 110 L 420 110 L 435 80 L 530 80 L 545 110 L 605 110" fill="none" stroke="#38bdf8" strokeWidth="2.5" />
            <text x="475" y="75" fill="#38bdf8" fontSize="9" textAnchor="middle">50% V_IH</text>

            {/* Inverter Output Waveform Vout (delayed inversion) */}
            <text x="335" y="175" fill="#34d399" fontSize="10" fontWeight="bold">OUT (A')</text>
            <path d="M 375 150 L 445 150 L 460 180 L 560 180 L 575 150 L 605 150" fill="none" stroke="#34d399" strokeWidth="2.5" />

            {/* Delay Markers */}
            {/* t_PHL */}
            <line x1="435" y1="95" x2="435" y2="185" stroke="#f43f5e" strokeDasharray="2 2" strokeWidth="1.5" />
            <line x1="452" y1="95" x2="452" y2="185" stroke="#f43f5e" strokeDasharray="2 2" strokeWidth="1.5" />
            <line x1="435" y1="130" x2="452" y2="130" stroke="#f43f5e" strokeWidth="2" />
            <text x="444" y="125" fill="#fb7185" fontSize="9" fontWeight="bold" textAnchor="middle">t_PHL</text>

            {/* t_PLH */}
            <line x1="540" y1="95" x2="540" y2="185" stroke="#fbbf24" strokeDasharray="2 2" strokeWidth="1.5" />
            <line x1="568" y1="95" x2="568" y2="185" stroke="#fbbf24" strokeDasharray="2 2" strokeWidth="1.5" />
            <line x1="540" y1="130" x2="568" y2="130" stroke="#fbbf24" strokeWidth="2" />
            <text x="554" y="125" fill="#fde68a" fontSize="9" fontWeight="bold" textAnchor="middle">t_PLH</text>

            {/* Explanation box */}
            <rect x="335" y="210" width="275" height="90" fill="#0f172a" rx="6" />
            <text x="345" y="230" fill="#e2e8f0" fontSize="10" fontWeight="bold">ENGINEERING PARAMETERS:</text>
            <text x="345" y="248" fill="#94a3b8" fontSize="9">• Average Delay: t_pd = (t_PLH + t_PHL) / 2</text>
            <text x="345" y="264" fill="#94a3b8" fontSize="9">• Standard 74HC: ~8ns to 12ns per gate</text>
            <text x="345" y="280" fill="#a7f3d0" fontSize="9">• Fan-Out = I_OL(max) / I_IL(max) ≥ 10 loads</text>
          </svg>
        );

      case 'UNIVERSAL_GATES_EQUIVALENTS':
        return (
          <svg viewBox="0 0 650 330" className="w-full h-auto max-h-[350px] select-none font-mono">
            <rect x="0" y="0" width="650" height="330" fill="#0f172a" rx="12" />
            <text x="325" y="24" fill="#94a3b8" fontSize="13" fontWeight="bold" textAnchor="middle">
              UNIVERSAL GATE IMPLEMENTATION MATRIX (NAND & NOR REALIZATIONS)
            </text>

            {/* Left Column: Realization using NAND Only */}
            <rect x="25" y="40" width="290" height="275" fill="#1e293b" stroke="#3b82f6" strokeWidth="1.5" rx="8" />
            <text x="170" y="62" fill="#60a5fa" fontSize="11" fontWeight="bold" textAnchor="middle">
              ALL GATES USING ONLY NAND (7400)
            </text>

            {/* NOT from NAND */}
            <rect x="35" y="75" width="270" height="42" fill="#0f172a" rx="5" />
            <text x="45" y="93" fill="#ffffff" fontSize="10" fontWeight="bold">NOT(A) = (A·A)'</text>
            <text x="45" y="107" fill="#60a5fa" fontSize="9">Inputs tied together → 1 NAND gate</text>
            <rect x="230" y="83" width="65" height="22" fill="#1d4ed8" rx="4" />
            <text x="262" y="98" fill="#ffffff" fontSize="9" fontWeight="bold" textAnchor="middle">1 GATE</text>

            {/* AND from NAND */}
            <rect x="35" y="125" width="270" height="42" fill="#0f172a" rx="5" />
            <text x="45" y="143" fill="#ffffff" fontSize="10" fontWeight="bold">AND(A,B) = ((A·B)')'</text>
            <text x="45" y="157" fill="#60a5fa" fontSize="9">NAND followed by inverter → 2 NAND gates</text>
            <rect x="230" y="133" width="65" height="22" fill="#1d4ed8" rx="4" />
            <text x="262" y="148" fill="#ffffff" fontSize="9" fontWeight="bold" textAnchor="middle">2 GATES</text>

            {/* OR from NAND */}
            <rect x="35" y="175" width="270" height="42" fill="#0f172a" rx="5" />
            <text x="45" y="193" fill="#ffffff" fontSize="10" fontWeight="bold">OR(A,B) = (A'·B')'</text>
            <text x="45" y="207" fill="#60a5fa" fontSize="9">Invert A, invert B, then NAND → 3 NAND gates</text>
            <rect x="230" y="183" width="65" height="22" fill="#1d4ed8" rx="4" />
            <text x="262" y="198" fill="#ffffff" fontSize="9" fontWeight="bold" textAnchor="middle">3 GATES</text>

            {/* XOR from NAND */}
            <rect x="35" y="225" width="270" height="50" fill="#0f172a" rx="5" />
            <text x="45" y="243" fill="#ffffff" fontSize="10" fontWeight="bold">XOR(A,B) = A(AB)' + B(AB)'</text>
            <text x="45" y="257" fill="#34d399" fontSize="9">Optimal 4-NAND structure (Reuses 1st gate!)</text>
            <text x="45" y="269" fill="#94a3b8" fontSize="8">Gate 1=(AB)'; Gates 2,3=[A·G1]', [B·G1]'</text>
            <rect x="230" y="235" width="65" height="22" fill="#059669" rx="4" />
            <text x="262" y="250" fill="#ffffff" fontSize="9" fontWeight="bold" textAnchor="middle">4 GATES</text>

            {/* Right Column: Realization using NOR Only */}
            <rect x="335" y="40" width="290" height="275" fill="#1e293b" stroke="#10b981" strokeWidth="1.5" rx="8" />
            <text x="480" y="62" fill="#34d399" fontSize="11" fontWeight="bold" textAnchor="middle">
              ALL GATES USING ONLY NOR (7402)
            </text>

            {/* NOT from NOR */}
            <rect x="345" y="75" width="270" height="42" fill="#0f172a" rx="5" />
            <text x="355" y="93" fill="#ffffff" fontSize="10" fontWeight="bold">NOT(A) = (A+A)'</text>
            <text x="355" y="107" fill="#34d399" fontSize="9">Inputs tied together → 1 NOR gate</text>
            <rect x="540" y="83" width="65" height="22" fill="#047857" rx="4" />
            <text x="572" y="98" fill="#ffffff" fontSize="9" fontWeight="bold" textAnchor="middle">1 GATE</text>

            {/* OR from NOR */}
            <rect x="345" y="125" width="270" height="42" fill="#0f172a" rx="5" />
            <text x="355" y="143" fill="#ffffff" fontSize="10" fontWeight="bold">OR(A,B) = ((A+B)')'</text>
            <text x="355" y="157" fill="#34d399" fontSize="9">NOR followed by inverter → 2 NOR gates</text>
            <rect x="540" y="133" width="65" height="22" fill="#047857" rx="4" />
            <text x="572" y="148" fill="#ffffff" fontSize="9" fontWeight="bold" textAnchor="middle">2 GATES</text>

            {/* AND from NOR */}
            <rect x="345" y="175" width="270" height="42" fill="#0f172a" rx="5" />
            <text x="355" y="193" fill="#ffffff" fontSize="10" fontWeight="bold">AND(A,B) = (A'+B')'</text>
            <text x="355" y="207" fill="#34d399" fontSize="9">Invert A, invert B, then NOR → 3 NOR gates</text>
            <rect x="540" y="183" width="65" height="22" fill="#047857" rx="4" />
            <text x="572" y="198" fill="#ffffff" fontSize="9" fontWeight="bold" textAnchor="middle">3 GATES</text>

            {/* XNOR from NOR */}
            <rect x="345" y="225" width="270" height="50" fill="#0f172a" rx="5" />
            <text x="355" y="243" fill="#ffffff" fontSize="10" fontWeight="bold">XNOR(A,B) via NOR</text>
            <text x="355" y="257" fill="#34d399" fontSize="9">Dual 4-NOR configuration yields XNOR!</text>
            <text x="355" y="269" fill="#94a3b8" fontSize="8">XOR from NOR requires 5 gates (XNOR + inverter)</text>
            <rect x="540" y="235" width="65" height="22" fill="#047857" rx="4" />
            <text x="572" y="250" fill="#ffffff" fontSize="9" fontWeight="bold" textAnchor="middle">4 GATES</text>

            {/* Bottom summary bar */}
            <rect x="35" y="283" width="580" height="22" fill="#090d16" rx="4" />
            <text x="325" y="298" fill="#fde68a" fontSize="9" fontWeight="bold" textAnchor="middle">
              EXAM MEMORY RULE: NAND XOR = 4 gates, NOR XOR = 5 gates; NOR XNOR = 4 gates, NAND XNOR = 5 gates.
            </text>
          </svg>
        );

      case 'DONT_CARE_BCD_MAP':
        return (
          <svg viewBox="0 0 650 320" className="w-full h-auto max-h-[340px] select-none font-mono">
            <rect x="0" y="0" width="650" height="320" fill="#0f172a" rx="12" />
            <text x="325" y="26" fill="#94a3b8" fontSize="13" fontWeight="bold" textAnchor="middle">
              DON'T-CARE OPTIMIZATION (BCD-TO-7-SEGMENT DECODER SEGMENT 'A')
            </text>

            {/* Variable Coordinates */}
            <text x="80" y="65" fill="#f59e0b" fontSize="14" fontWeight="bold">AB \ CD</text>
            <text x="170" y="65" fill="#38bdf8" fontSize="13" fontWeight="bold" textAnchor="middle">00</text>
            <text x="230" y="65" fill="#38bdf8" fontSize="13" fontWeight="bold" textAnchor="middle">01</text>
            <text x="290" y="65" fill="#38bdf8" fontSize="13" fontWeight="bold" textAnchor="middle">11</text>
            <text x="350" y="65" fill="#38bdf8" fontSize="13" fontWeight="bold" textAnchor="middle">10</text>

            <text x="110" y="105" fill="#a78bfa" fontSize="13" fontWeight="bold">00</text>
            <text x="110" y="155" fill="#a78bfa" fontSize="13" fontWeight="bold">01</text>
            <text x="110" y="205" fill="#a78bfa" fontSize="13" fontWeight="bold">11</text>
            <text x="110" y="255" fill="#a78bfa" fontSize="13" fontWeight="bold">10</text>

            {/* Grid */}
            <g stroke="#334155" strokeWidth="1.5">
              {[0, 1, 2, 3, 4].map((i) => (
                <React.Fragment key={i}>
                  <line x1="140" y1={80 + i * 50} x2="380" y2={80 + i * 50} />
                  <line x1={140 + i * 60} y1="80" x2={140 + i * 60} y2="280" />
                </React.Fragment>
              ))}
            </g>

            {/* Octet Loop (Rows 11 and 10 across all 4 columns: A=1) */}
            <rect x="144" y="184" width="232" height="92" rx="10" fill="rgba(244, 63, 94, 0.2)" stroke="#f43f5e" strokeWidth="2.5" />
            <text x="260" y="295" fill="#fb7185" fontSize="10" fontWeight="bold" textAnchor="middle">
              Octet Group (8 cells using X10..X15) → Term = A
            </text>

            {/* Cells Values */}
            {/* Row 00 */}
            <text x="170" y="110" fill="#60a5fa" fontSize="14" fontWeight="bold" textAnchor="middle">1 <tspan fontSize="8" fill="#64748b">m0</tspan></text>
            <text x="230" y="110" fill="#64748b" fontSize="14" textAnchor="middle">0 <tspan fontSize="8">m1</tspan></text>
            <text x="290" y="110" fill="#60a5fa" fontSize="14" fontWeight="bold" textAnchor="middle">1 <tspan fontSize="8" fill="#64748b">m3</tspan></text>
            <text x="350" y="110" fill="#60a5fa" fontSize="14" fontWeight="bold" textAnchor="middle">1 <tspan fontSize="8" fill="#64748b">m2</tspan></text>

            {/* Row 01 */}
            <text x="170" y="160" fill="#64748b" fontSize="14" textAnchor="middle">0 <tspan fontSize="8">m4</tspan></text>
            <text x="230" y="160" fill="#60a5fa" fontSize="14" fontWeight="bold" textAnchor="middle">1 <tspan fontSize="8" fill="#64748b">m5</tspan></text>
            <text x="290" y="160" fill="#60a5fa" fontSize="14" fontWeight="bold" textAnchor="middle">1 <tspan fontSize="8" fill="#64748b">m7</tspan></text>
            <text x="350" y="160" fill="#60a5fa" fontSize="14" fontWeight="bold" textAnchor="middle">1 <tspan fontSize="8" fill="#64748b">m6</tspan></text>

            {/* Row 11 (All Don't Care States 12, 13, 15, 14) */}
            <text x="170" y="210" fill="#f59e0b" fontSize="14" fontWeight="bold" textAnchor="middle">X <tspan fontSize="8">m12</tspan></text>
            <text x="230" y="210" fill="#f59e0b" fontSize="14" fontWeight="bold" textAnchor="middle">X <tspan fontSize="8">m13</tspan></text>
            <text x="290" y="210" fill="#f59e0b" fontSize="14" fontWeight="bold" textAnchor="middle">X <tspan fontSize="8">m15</tspan></text>
            <text x="350" y="210" fill="#f59e0b" fontSize="14" fontWeight="bold" textAnchor="middle">X <tspan fontSize="8">m14</tspan></text>

            {/* Row 10 (8, 9 are 1s; 11, 10 are Xs) */}
            <text x="170" y="260" fill="#60a5fa" fontSize="14" fontWeight="bold" textAnchor="middle">1 <tspan fontSize="8">m8</tspan></text>
            <text x="230" y="260" fill="#60a5fa" fontSize="14" fontWeight="bold" textAnchor="middle">1 <tspan fontSize="8">m9</tspan></text>
            <text x="290" y="260" fill="#f59e0b" fontSize="14" fontWeight="bold" textAnchor="middle">X <tspan fontSize="8">m11</tspan></text>
            <text x="350" y="260" fill="#f59e0b" fontSize="14" fontWeight="bold" textAnchor="middle">X <tspan fontSize="8">m10</tspan></text>

            {/* Derivation Analysis Panel */}
            <rect x="410" y="80" width="225" height="190" fill="#1e293b" stroke="#334155" rx="8" />
            <text x="420" y="105" fill="#f59e0b" fontSize="11" fontWeight="bold">BCD 7-SEGMENT 'a' MINIMIZATION:</text>
            <text x="420" y="128" fill="#94a3b8" fontSize="10">Without Don't-Cares (X=0):</text>
            <text x="420" y="144" fill="#ef4444" fontSize="10">Requires 5 complex 3-variable gates</text>

            <text x="420" y="172" fill="#34d399" fontSize="10" fontWeight="bold">With Don't-Cares (X=1 for grouping):</text>
            <text x="420" y="190" fill="#cbd5e1" fontSize="10">• Group 1 (Red Octet): A</text>
            <text x="420" y="206" fill="#cbd5e1" fontSize="10">• Group 2 (Quad): C</text>
            <text x="420" y="222" fill="#cbd5e1" fontSize="10">• Group 3 (Quad): BD</text>
            <text x="420" y="238" fill="#cbd5e1" fontSize="10">• Group 4 (Corners): B'D'</text>

            <line x1="420" y1="248" x2="620" y2="248" stroke="#334155" />
            <text x="420" y="264" fill="#38bdf8" fontSize="12" fontWeight="bold">a = A + C + BD + B'D'</text>
          </svg>
        );

      case 'QUINE_MCCLUSKEY_FLOWCHART':
        return (
          <svg viewBox="0 0 650 320" className="w-full h-auto max-h-[340px] select-none font-mono">
            <rect x="0" y="0" width="650" height="320" fill="#0f172a" rx="12" />
            <text x="325" y="26" fill="#94a3b8" fontSize="13" fontWeight="bold" textAnchor="middle">
              QUINE-MCCLUSKEY (TABULAR ALGORITHMIC MINIMIZATION)
            </text>

            {/* Stage 1: Group by Index of 1s */}
            <rect x="25" y="50" width="180" height="235" fill="#1e293b" stroke="#3b82f6" rx="6" />
            <text x="115" y="70" fill="#60a5fa" fontSize="10" fontWeight="bold" textAnchor="middle">STAGE 1: BINARY GROUPING</text>
            <text x="35" y="90" fill="#94a3b8" fontSize="9">Group 0 (no 1s):</text>
            <text x="40" y="105" fill="#e2e8f0" fontSize="9">m0: 0000 ✓</text>
            <line x1="35" y1="115" x2="195" y2="115" stroke="#334155" />
            <text x="35" y="130" fill="#94a3b8" fontSize="9">Group 1 (single 1):</text>
            <text x="40" y="145" fill="#e2e8f0" fontSize="9">m1: 0001 ✓ | m2: 0010 ✓</text>
            <text x="40" y="160" fill="#e2e8f0" fontSize="9">m8: 1000 ✓</text>
            <line x1="35" y1="170" x2="195" y2="170" stroke="#334155" />
            <text x="35" y="185" fill="#94a3b8" fontSize="9">Group 2 (two 1s):</text>
            <text x="40" y="200" fill="#e2e8f0" fontSize="9">m3: 0011 ✓ | m9: 1001 ✓</text>
            <text x="40" y="215" fill="#e2e8f0" fontSize="9">m10: 1010 ✓</text>
            <line x1="35" y1="225" x2="195" y2="225" stroke="#334155" />
            <text x="35" y="240" fill="#94a3b8" fontSize="9">Group 3 (three 1s):</text>
            <text x="40" y="255" fill="#e2e8f0" fontSize="9">m11: 1011 ✓</text>

            {/* Stage 2: Combine pairs with dash '-' */}
            <rect x="225" y="50" width="195" height="235" fill="#1e293b" stroke="#10b981" rx="6" />
            <text x="322" y="70" fill="#34d399" fontSize="10" fontWeight="bold" textAnchor="middle">STAGE 2: MATCH & MERGE (-)</text>
            <text x="235" y="90" fill="#cbd5e1" fontSize="9">Differ by 1 bit:</text>
            <text x="240" y="110" fill="#a7f3d0" fontSize="9">(0,1) : 000- ✓</text>
            <text x="240" y="125" fill="#a7f3d0" fontSize="9">(0,2) : 00-0 ✓</text>
            <text x="240" y="140" fill="#a7f3d0" fontSize="9">(0,8) : -000 ✓</text>
            <text x="240" y="165" fill="#38bdf8" fontSize="9">4-Cell Merges (Quad):</text>
            <text x="240" y="185" fill="#fbbf24" fontSize="9" fontWeight="bold">(0,1,8,9) : -00- (PI 1)</text>
            <text x="240" y="205" fill="#fbbf24" fontSize="9" fontWeight="bold">(0,2,8,10) : -0-0 (PI 2)</text>
            <text x="240" y="225" fill="#fbbf24" fontSize="9" fontWeight="bold">(2,3,10,11) : -01- (PI 3)</text>
            <text x="235" y="260" fill="#94a3b8" fontSize="8">Unchecked terms become Prime Implicants!</text>

            {/* Stage 3: Prime Implicant Table */}
            <rect x="440" y="50" width="185" height="235" fill="#1e293b" stroke="#f59e0b" rx="6" />
            <text x="532" y="70" fill="#fbbf24" fontSize="10" fontWeight="bold" textAnchor="middle">STAGE 3: PI COVERAGE TABLE</text>
            <text x="450" y="95" fill="#e2e8f0" fontSize="9">Minterms: 0 1 2 3 8 9 10 11</text>
            <line x1="450" y1="105" x2="615" y2="105" stroke="#334155" />
            <text x="450" y="125" fill="#60a5fa" fontSize="9">PI 1: B'C' [X X . . X X . .]</text>
            <text x="450" y="145" fill="#34d399" fontSize="9">PI 2: B'D' [X . X . X . X .]</text>
            <text x="450" y="165" fill="#f43f5e" fontSize="9">PI 3: B'C  [. . X X . . X X]</text>

            <rect x="448" y="185" width="170" height="85" fill="#0f172a" rx="4" />
            <text x="455" y="205" fill="#a7f3d0" fontSize="9" fontWeight="bold">ESSENTIAL PRIME IMPLICANTS:</text>
            <text x="455" y="222" fill="#e2e8f0" fontSize="8">m1 only in PI 1 → PI 1 is EPI</text>
            <text x="455" y="236" fill="#e2e8f0" fontSize="8">m3 only in PI 3 → PI 3 is EPI</text>
            <text x="455" y="255" fill="#38bdf8" fontSize="10" fontWeight="bold">F = B'C' + B'C = B'</text>
          </svg>
        );

      case 'MULTIPLEXER_4TO1_INTERNAL':
        return (
          <svg viewBox="0 0 650 330" className="w-full h-auto max-h-[350px] select-none font-mono">
            <rect x="0" y="0" width="650" height="330" fill="#0f172a" rx="12" />
            <text x="325" y="24" fill="#94a3b8" fontSize="13" fontWeight="bold" textAnchor="middle">
              4-TO-1 MULTIPLEXER (DATA SELECTOR) GATE-LEVEL LOGIC SCHEMATIC
            </text>

            {/* Data Inputs D0 - D3 on left */}
            <text x="30" y="75" fill="#38bdf8" fontSize="11" fontWeight="bold">D0</text>
            <line x1="55" y1="70" x2="270" y2="70" stroke="#38bdf8" strokeWidth="2" />

            <text x="30" y="135" fill="#38bdf8" fontSize="11" fontWeight="bold">D1</text>
            <line x1="55" y1="130" x2="270" y2="130" stroke="#38bdf8" strokeWidth="2" />

            <text x="30" y="195" fill="#38bdf8" fontSize="11" fontWeight="bold">D2</text>
            <line x1="55" y1="190" x2="270" y2="190" stroke="#38bdf8" strokeWidth="2" />

            <text x="30" y="255" fill="#38bdf8" fontSize="11" fontWeight="bold">D3</text>
            <line x1="55" y1="250" x2="270" y2="250" stroke="#38bdf8" strokeWidth="2" />

            {/* Select Lines S1 and S0 vertical distribution */}
            {/* S1 */}
            <text x="110" y="48" fill="#f59e0b" fontSize="11" fontWeight="bold">S1</text>
            <line x1="120" y1="55" x2="120" y2="300" stroke="#f59e0b" strokeWidth="2" />
            {/* Inverter for S1' */}
            <rect x="135" y="55" width="20" height="20" fill="#78350f" rx="3" />
            <text x="145" y="69" fill="#fde68a" fontSize="9" textAnchor="middle">N</text>
            <line x1="120" y1="65" x2="135" y2="65" stroke="#f59e0b" strokeWidth="1.5" />
            <line x1="155" y1="65" x2="170" y2="65" stroke="#fbbf24" strokeWidth="2" />
            <line x1="170" y1="65" x2="170" y2="300" stroke="#fbbf24" strokeWidth="2" strokeDasharray="3 3" />
            <text x="170" y="48" fill="#fbbf24" fontSize="10">S1'</text>

            {/* S0 */}
            <text x="200" y="48" fill="#10b981" fontSize="11" fontWeight="bold">S0</text>
            <line x1="210" y1="55" x2="210" y2="300" stroke="#10b981" strokeWidth="2" />
            {/* Inverter for S0' */}
            <rect x="225" y="55" width="20" height="20" fill="#064e3b" rx="3" />
            <text x="235" y="69" fill="#a7f3d0" fontSize="9" textAnchor="middle">N</text>
            <line x1="210" y1="65" x2="225" y2="65" stroke="#10b981" strokeWidth="1.5" />
            <line x1="245" y1="65" x2="255" y2="65" stroke="#34d399" strokeWidth="2" />
            <line x1="255" y1="65" x2="255" y2="300" stroke="#34d399" strokeWidth="2" strokeDasharray="3 3" />
            <text x="255" y="48" fill="#34d399" fontSize="10">S0'</text>

            {/* Four 3-input AND Gates */}
            {/* AND 0: S1' S0' D0 */}
            <rect x="270" y="60" width="70" height="35" fill="#1d4ed8" rx="5" />
            <text x="305" y="82" fill="#ffffff" fontSize="10" fontWeight="bold" textAnchor="middle">AND 0</text>

            {/* AND 1: S1' S0 D1 */}
            <rect x="270" y="120" width="70" height="35" fill="#1d4ed8" rx="5" />
            <text x="305" y="142" fill="#ffffff" fontSize="10" fontWeight="bold" textAnchor="middle">AND 1</text>

            {/* AND 2: S1 S0' D2 */}
            <rect x="270" y="180" width="70" height="35" fill="#1d4ed8" rx="5" />
            <text x="305" y="202" fill="#ffffff" fontSize="10" fontWeight="bold" textAnchor="middle">AND 2</text>

            {/* AND 3: S1 S0 D3 */}
            <rect x="270" y="240" width="70" height="35" fill="#1d4ed8" rx="5" />
            <text x="305" y="262" fill="#ffffff" fontSize="10" fontWeight="bold" textAnchor="middle">AND 3</text>

            {/* Wires from AND gates to 4-input OR gate */}
            <line x1="340" y1="77" x2="440" y2="135" stroke="#60a5fa" strokeWidth="2" />
            <line x1="340" y1="137" x2="440" y2="148" stroke="#60a5fa" strokeWidth="2" />
            <line x1="340" y1="197" x2="440" y2="162" stroke="#60a5fa" strokeWidth="2" />
            <line x1="340" y1="257" x2="440" y2="175" stroke="#60a5fa" strokeWidth="2" />

            {/* Final 4-input OR gate */}
            <path d="M 440 120 Q 460 155 440 190 Q 500 190 520 155 Q 500 120 440 120 Z" fill="#047857" stroke="#34d399" strokeWidth="2.5" />
            <line x1="520" y1="155" x2="600" y2="155" stroke="#10b981" strokeWidth="3" />
            <circle cx="600" cy="155" r="5" fill="#10b981" />
            <text x="610" y="160" fill="#34d399" fontSize="14" fontWeight="bold">Y (OUT)</text>

            {/* Bottom Equation */}
            <rect x="70" y="295" width="510" height="25" fill="#1e293b" rx="4" />
            <text x="325" y="312" fill="#fde68a" fontSize="10" fontWeight="bold" textAnchor="middle">
              Y = S1'·S0'·D0 + S1'·S0·D1 + S1·S0'·D2 + S1·S0·D3 (Shannon Expansion Engine)
            </text>
          </svg>
        );

      case 'DECODER_3TO8_ACTIVE_LOW':
        return (
          <svg viewBox="0 0 650 330" className="w-full h-auto max-h-[350px] select-none font-mono">
            <rect x="0" y="0" width="650" height="330" fill="#0f172a" rx="12" />
            <text x="325" y="24" fill="#94a3b8" fontSize="13" fontWeight="bold" textAnchor="middle">
              74HC138 3-TO-8 LINE DECODER WITH ACTIVE-LOW OUTPUTS & 3-PIN ENABLE
            </text>

            {/* Inputs on Left */}
            <rect x="30" y="50" width="140" height="250" fill="#1e293b" stroke="#3b82f6" rx="6" />
            <text x="100" y="70" fill="#60a5fa" fontSize="11" fontWeight="bold" textAnchor="middle">INPUT PINS</text>

            <text x="45" y="100" fill="#e2e8f0" fontSize="10" fontWeight="bold">A (LSB, Pin 1)</text>
            <text x="45" y="125" fill="#e2e8f0" fontSize="10" fontWeight="bold">B (Pin 2)</text>
            <text x="45" y="150" fill="#e2e8f0" fontSize="10" fontWeight="bold">C (MSB, Pin 3)</text>

            <line x1="35" y1="165" x2="165" y2="165" stroke="#334155" />
            <text x="100" y="185" fill="#f59e0b" fontSize="10" fontWeight="bold" textAnchor="middle">ENABLE GATING</text>
            <text x="45" y="205" fill="#a7f3d0" fontSize="9">G1 (Active-HIGH)</text>
            <text x="45" y="225" fill="#fca5a5" fontSize="9">/G2A (Active-LOW)</text>
            <text x="45" y="245" fill="#fca5a5" fontSize="9">/G2B (Active-LOW)</text>
            <text x="45" y="275" fill="#38bdf8" fontSize="8">E = G1 · /G2A' · /G2B'</text>

            {/* Central Decoder IC Block */}
            <rect x="220" y="45" width="190" height="260" fill="#090d16" stroke="#475569" strokeWidth="2" rx="8" />
            <text x="315" y="70" fill="#f59e0b" fontSize="13" fontWeight="bold" textAnchor="middle">
              74HC138 DECODER
            </text>
            <text x="315" y="88" fill="#94a3b8" fontSize="9" textAnchor="middle">
              Eight 4-Input NAND Gates
            </text>

            {/* Active Low Output Bubbles & Lines on Right */}
            {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => {
              const y = 105 + i * 24;
              return (
                <g key={i}>
                  <line x1="410" y1={y} x2="435" y2={y} stroke="#38bdf8" strokeWidth="2" />
                  <circle cx="438" cy={y} r="4" fill="#0f172a" stroke="#f43f5e" strokeWidth="1.5" />
                  <line x1="442" y1={y} x2="480" y2={y} stroke="#34d399" strokeWidth="2" />
                  <text x="490" y={y + 4} fill="#a7f3d0" fontSize="10" fontWeight="bold">
                    /Y{i} = (m{i}·E)' {i === 0 ? '(0V when selected!)' : ''}
                  </text>
                </g>
              );
            })}

            {/* Right Side Application Callout */}
            <rect x="420" y="45" width="205" height="45" fill="#1e293b" rx="6" />
            <text x="522" y="63" fill="#38bdf8" fontSize="10" fontWeight="bold" textAnchor="middle">CHIP SELECT / ADDRESS DECODING</text>
            <text x="522" y="78" fill="#94a3b8" fontSize="8" textAnchor="middle">Activates exactly ONE peripheral or RAM bank</text>
          </svg>
        );

      case 'SR_AND_JK_MASTER_SLAVE':
        return (
          <svg viewBox="0 0 650 330" className="w-full h-auto max-h-[350px] select-none font-mono">
            <rect x="0" y="0" width="650" height="330" fill="#0f172a" rx="12" />
            <text x="325" y="24" fill="#94a3b8" fontSize="13" fontWeight="bold" textAnchor="middle">
              MASTER-SLAVE JK FLIP-FLOP (COMPLETE RACE-AROUND ELIMINATION)
            </text>

            {/* Master Stage Box */}
            <rect x="40" y="45" width="240" height="235" fill="#1e293b" stroke="#3b82f6" strokeWidth="1.5" strokeDasharray="3 3" rx="8" />
            <text x="160" y="65" fill="#60a5fa" fontSize="11" fontWeight="bold" textAnchor="middle">
              MASTER STAGE (Active when CLK = 1)
            </text>

            {/* Inputs J, CLK, K */}
            <text x="15" y="95" fill="#e2e8f0" fontSize="11" fontWeight="bold">J</text>
            <line x1="25" y1="90" x2="80" y2="90" stroke="#38bdf8" strokeWidth="2" />

            <text x="10" y="165" fill="#fbbf24" fontSize="11" fontWeight="bold">CLK</text>
            <line x1="35" y1="160" x2="80" y2="160" stroke="#f59e0b" strokeWidth="2.5" />

            <text x="15" y="235" fill="#e2e8f0" fontSize="11" fontWeight="bold">K</text>
            <line x1="25" y1="230" x2="80" y2="230" stroke="#38bdf8" strokeWidth="2" />

            {/* Master NAND Gates */}
            <rect x="80" y="75" width="60" height="35" fill="#1d4ed8" rx="4" />
            <text x="110" y="96" fill="#ffffff" fontSize="9" fontWeight="bold" textAnchor="middle">NAND 1</text>

            <rect x="80" y="215" width="60" height="35" fill="#1d4ed8" rx="4" />
            <text x="110" y="236" fill="#ffffff" fontSize="9" fontWeight="bold" textAnchor="middle">NAND 2</text>

            {/* Master Cross-Coupled Latch */}
            <rect x="180" y="90" width="60" height="35" fill="#0284c7" rx="4" />
            <text x="210" y="112" fill="#ffffff" fontSize="9" fontWeight="bold" textAnchor="middle">NAND 3</text>

            <rect x="180" y="195" width="60" height="35" fill="#0284c7" rx="4" />
            <text x="210" y="217" fill="#ffffff" fontSize="9" fontWeight="bold" textAnchor="middle">NAND 4</text>

            {/* Clock Inverter to Slave */}
            <line x1="60" y1="160" x2="60" y2="290" stroke="#f59e0b" strokeWidth="2" />
            <line x1="60" y1="290" x2="330" y2="290" stroke="#f59e0b" strokeWidth="2" />
            <rect x="330" y="280" width="30" height="20" fill="#b91c1c" rx="3" />
            <text x="345" y="294" fill="#ffffff" fontSize="9" textAnchor="middle">NOT</text>
            <line x1="360" y1="290" x2="400" y2="290" stroke="#f43f5e" strokeWidth="2" />
            <line x1="400" y1="290" x2="400" y2="160" stroke="#f43f5e" strokeWidth="2" />
            <text x="405" y="280" fill="#f43f5e" fontSize="9">CLK' (Inverted)</text>

            {/* Slave Stage Box */}
            <rect x="360" y="45" width="240" height="235" fill="#1e293b" stroke="#10b981" strokeWidth="1.5" strokeDasharray="3 3" rx="8" />
            <text x="480" y="65" fill="#34d399" fontSize="11" fontWeight="bold" textAnchor="middle">
              SLAVE STAGE (Active on CLK Falling Edge ↓)
            </text>

            {/* Slave NAND Gates */}
            <rect x="420" y="80" width="60" height="35" fill="#047857" rx="4" />
            <text x="450" y="102" fill="#ffffff" fontSize="9" fontWeight="bold" textAnchor="middle">NAND 5</text>

            <rect x="420" y="205" width="60" height="35" fill="#047857" rx="4" />
            <text x="450" y="227" fill="#ffffff" fontSize="9" fontWeight="bold" textAnchor="middle">NAND 6</text>

            {/* Slave Latch */}
            <rect x="520" y="95" width="60" height="35" fill="#059669" rx="4" />
            <text x="550" y="117" fill="#ffffff" fontSize="9" fontWeight="bold" textAnchor="middle">NAND 7</text>

            <rect x="520" y="190" width="60" height="35" fill="#059669" rx="4" />
            <text x="550" y="212" fill="#ffffff" fontSize="9" fontWeight="bold" textAnchor="middle">NAND 8</text>

            {/* Final Outputs Q and Q' */}
            <line x1="580" y1="112" x2="625" y2="112" stroke="#34d399" strokeWidth="2.5" />
            <circle cx="625" cy="112" r="4" fill="#34d399" />
            <text x="635" y="116" fill="#34d399" fontSize="12" fontWeight="bold">Q</text>

            <line x1="580" y1="207" x2="625" y2="207" stroke="#38bdf8" strokeWidth="2.5" />
            <circle cx="625" cy="207" r="4" fill="#38bdf8" />
            <text x="635" y="211" fill="#38bdf8" fontSize="12" fontWeight="bold">Q'</text>

            {/* Long Feedback Loops from Slave back to Master */}
            <path d="M 610 112 L 610 35 L 70 35 L 70 220" fill="none" stroke="#38bdf8" strokeWidth="1.5" strokeDasharray="3 3" />
            <path d="M 605 207 L 605 315 L 65 315 L 65 100" fill="none" stroke="#34d399" strokeWidth="1.5" strokeDasharray="3 3" />

            <text x="325" y="322" fill="#cbd5e1" fontSize="9" textAnchor="middle">
              WHY RACE-AROUND IS ELIMINATED: Master & Slave are NEVER active at the same time!
            </text>
          </svg>
        );

      case 'SHIFT_REGISTERS_4MODES':
        return (
          <svg viewBox="0 0 650 330" className="w-full h-auto max-h-[350px] select-none font-mono">
            <rect x="0" y="0" width="650" height="330" fill="#0f172a" rx="12" />
            <text x="325" y="24" fill="#94a3b8" fontSize="13" fontWeight="bold" textAnchor="middle">
              SHIFT REGISTER TAXONOMY (SISO, SIPO, PISO, PIPO) & 74194 UNIVERSAL MODES
            </text>

            {/* SISO */}
            <rect x="25" y="45" width="280" height="60" fill="#1e293b" stroke="#3b82f6" rx="6" />
            <text x="35" y="65" fill="#60a5fa" fontSize="11" fontWeight="bold">1. SISO (Serial-In Serial-Out)</text>
            <text x="35" y="80" fill="#94a3b8" fontSize="9">Data In → [FF0] → [FF1] → [FF2] → [FF3] → Data Out</text>
            <text x="35" y="95" fill="#cbd5e1" fontSize="9">Latency: n pulses to load + n to retrieve = 2n pulses</text>

            {/* SIPO */}
            <rect x="25" y="115" width="280" height="60" fill="#1e293b" stroke="#10b981" rx="6" />
            <text x="35" y="135" fill="#34d399" fontSize="11" fontWeight="bold">2. SIPO (Serial-In Parallel-Out)</text>
            <text x="35" y="150" fill="#94a3b8" fontSize="9">Data In → [FF0] → [FF1] → [FF2] → [FF3] ↓ (All at once)</text>
            <text x="35" y="165" fill="#a7f3d0" fontSize="9">Latency: n pulses. Used in UART receivers & 74HC595</text>

            {/* PISO */}
            <rect x="25" y="185" width="280" height="60" fill="#1e293b" stroke="#f59e0b" rx="6" />
            <text x="35" y="205" fill="#fbbf24" fontSize="11" fontWeight="bold">3. PISO (Parallel-In Serial-Out)</text>
            <text x="35" y="220" fill="#94a3b8" fontSize="9">Parallel Inputs (D0..D3) loaded via MUX → Serial Out</text>
            <text x="35" y="235" fill="#fde68a" fontSize="9">Latency: 1 pulse load + (n-1) to shift. Used in transmitters</text>

            {/* PIPO */}
            <rect x="25" y="255" width="280" height="60" fill="#1e293b" stroke="#c084fc" rx="6" />
            <text x="35" y="275" fill="#c084fc" fontSize="11" fontWeight="bold">4. PIPO (Parallel-In Parallel-Out)</text>
            <text x="35" y="290" fill="#94a3b8" fontSize="9">D0..D3 loaded in 1 pulse → Q0..Q3 read in 1 pulse</text>
            <text x="35" y="305" fill="#e9d5ff" fontSize="9">Fastest register (1 clock latency). Standard CPU buffer</text>

            {/* Right Box: 74194 Universal Shift Register Mode Table */}
            <rect x="325" y="45" width="300" height="270" fill="#1e293b" stroke="#334155" rx="8" />
            <text x="475" y="70" fill="#38bdf8" fontSize="11" fontWeight="bold" textAnchor="middle">
              74HC194 4-BIT UNIVERSAL SHIFT REGISTER
            </text>

            {/* Mode Table */}
            <rect x="340" y="85" width="270" height="135" fill="#090d16" rx="6" />
            <text x="350" y="105" fill="#94a3b8" fontSize="9" fontWeight="bold">S1  S0  | CLOCK | OPERATING FUNCTION</text>
            <line x1="345" y1="112" x2="605" y2="112" stroke="#334155" />
            <text x="350" y="130" fill="#94a3b8" fontSize="9"> 0   0  |   ↑   | Hold / No Change (Loop output)</text>
            <text x="350" y="152" fill="#38bdf8" fontSize="9" fontWeight="bold"> 0   1  |   ↑   | Shift Right (Q0→Q1→Q2→Q3)</text>
            <text x="350" y="174" fill="#34d399" fontSize="9" fontWeight="bold"> 1   0  |   ↑   | Shift Left  (Q3→Q2→Q1→Q0)</text>
            <text x="350" y="196" fill="#f59e0b" fontSize="9" fontWeight="bold"> 1   1  |   ↑   | Parallel Load (D0..D3 → Q0..Q3)</text>

            <rect x="340" y="230" width="270" height="75" fill="#0f172a" rx="4" />
            <text x="350" y="250" fill="#cbd5e1" fontSize="9" fontWeight="bold">INTERNAL HARDWARE ARCHITECTURE:</text>
            <text x="350" y="268" fill="#94a3b8" fontSize="8">• Each D flip-flop is preceded by a 4:1 Multiplexer</text>
            <text x="350" y="282" fill="#94a3b8" fontSize="8">• Asynchronous active-low Master Reset (/CLR pin 1)</text>
            <text x="350" y="296" fill="#a7f3d0" fontSize="8">• Multiplying by 2: Shift Left; Dividing by 2: Shift Right</text>
          </svg>
        );

      case 'SYNCHRONOUS_UP_DOWN_COUNTER':
        return (
          <svg viewBox="0 0 650 330" className="w-full h-auto max-h-[350px] select-none font-mono">
            <rect x="0" y="0" width="650" height="330" fill="#0f172a" rx="12" />
            <text x="325" y="24" fill="#94a3b8" fontSize="13" fontWeight="bold" textAnchor="middle">
              4-BIT SYNCHRONOUS BINARY COUNTER (PARALLEL CARRY LOOKAHEAD)
            </text>

            {/* Common Clock Line running across all 4 stages */}
            <text x="25" y="285" fill="#fbbf24" fontSize="11" fontWeight="bold">COMMON CLK</text>
            <line x1="105" y1="280" x2="590" y2="280" stroke="#f59e0b" strokeWidth="2.5" />

            {/* Stage 0 (LSB) */}
            <rect x="80" y="70" width="90" height="150" fill="#1e293b" stroke="#3b82f6" strokeWidth="2" rx="6" />
            <text x="125" y="90" fill="#60a5fa" fontSize="11" fontWeight="bold" textAnchor="middle">FF 0 (LSB)</text>
            <text x="90" y="125" fill="#e2e8f0" fontSize="10">T0 = 1</text>
            <text x="145" y="125" fill="#38bdf8" fontSize="11" fontWeight="bold">Q0</text>
            <line x1="125" y1="220" x2="125" y2="280" stroke="#f59e0b" strokeWidth="2" />
            <circle cx="125" cy="280" r="3" fill="#f59e0b" />

            {/* Stage 1 */}
            <rect x="220" y="70" width="90" height="150" fill="#1e293b" stroke="#10b981" strokeWidth="2" rx="6" />
            <text x="265" y="90" fill="#34d399" fontSize="11" fontWeight="bold" textAnchor="middle">FF 1</text>
            <text x="230" y="125" fill="#e2e8f0" fontSize="10">T1</text>
            <text x="285" y="125" fill="#34d399" fontSize="11" fontWeight="bold">Q1</text>
            <line x1="265" y1="220" x2="265" y2="280" stroke="#f59e0b" strokeWidth="2" />
            <circle cx="265" cy="280" r="3" fill="#f59e0b" />

            {/* Carry wire Q0 -> T1 */}
            <line x1="160" y1="120" x2="225" y2="120" stroke="#38bdf8" strokeWidth="2" />

            {/* AND Gate 1 for Stage 2 (T2 = Q0 · Q1) */}
            <rect x="330" y="110" width="30" height="25" fill="#1d4ed8" rx="3" />
            <text x="345" y="127" fill="#ffffff" fontSize="9" textAnchor="middle">&amp;</text>
            <line x1="200" y1="60" x2="330" y2="115" stroke="#38bdf8" strokeWidth="1.5" />
            <line x1="300" y1="125" x2="330" y2="125" stroke="#34d399" strokeWidth="1.5" />

            {/* Stage 2 */}
            <rect x="375" y="70" width="90" height="150" fill="#1e293b" stroke="#f59e0b" strokeWidth="2" rx="6" />
            <text x="420" y="90" fill="#fbbf24" fontSize="11" fontWeight="bold" textAnchor="middle">FF 2</text>
            <text x="385" y="125" fill="#e2e8f0" fontSize="10">T2</text>
            <text x="440" y="125" fill="#fbbf24" fontSize="11" fontWeight="bold">Q2</text>
            <line x1="360" y1="122" x2="375" y2="122" stroke="#60a5fa" strokeWidth="2" />
            <line x1="420" y1="220" x2="420" y2="280" stroke="#f59e0b" strokeWidth="2" />
            <circle cx="420" cy="280" r="3" fill="#f59e0b" />

            {/* AND Gate 2 for Stage 3 (T3 = Q0 · Q1 · Q2) */}
            <rect x="480" y="110" width="30" height="25" fill="#1d4ed8" rx="3" />
            <text x="495" y="127" fill="#ffffff" fontSize="9" textAnchor="middle">&amp;</text>
            <line x1="360" y1="122" x2="480" y2="118" stroke="#60a5fa" strokeWidth="1.5" />
            <line x1="455" y1="125" x2="480" y2="128" stroke="#fbbf24" strokeWidth="1.5" />

            {/* Stage 3 (MSB) */}
            <rect x="525" y="70" width="90" height="150" fill="#1e293b" stroke="#f43f5e" strokeWidth="2" rx="6" />
            <text x="570" y="90" fill="#fb7185" fontSize="11" fontWeight="bold" textAnchor="middle">FF 3 (MSB)</text>
            <text x="535" y="125" fill="#e2e8f0" fontSize="10">T3</text>
            <text x="590" y="125" fill="#fb7185" fontSize="11" fontWeight="bold">Q3</text>
            <line x1="510" y1="122" x2="525" y2="122" stroke="#60a5fa" strokeWidth="2" />
            <line x1="570" y1="220" x2="570" y2="280" stroke="#f59e0b" strokeWidth="2" />
            <circle cx="570" cy="280" r="3" fill="#f59e0b" />

            {/* Bottom Performance Banner */}
            <rect x="40" y="298" width="570" height="24" fill="#090d16" rx="4" />
            <text x="325" y="314" fill="#a7f3d0" fontSize="9" fontWeight="bold" textAnchor="middle">
              ZERO ACCUMULATED RIPPLE DELAY: All 4 bits switch in unison on clock edge! f_max = 1 / (t_cq + t_and + t_su).
            </text>
          </svg>
        );

      case 'FLASH_ADC_COMPARATOR_LADDER':
        return (
          <svg viewBox="0 0 650 330" className="w-full h-auto max-h-[350px] select-none font-mono">
            <rect x="0" y="0" width="650" height="330" fill="#0f172a" rx="12" />
            <text x="325" y="24" fill="#94a3b8" fontSize="13" fontWeight="bold" textAnchor="middle">
              3-BIT HIGH-SPEED FLASH ANALOG-TO-DIGITAL CONVERTER (ADC)
            </text>

            {/* Resistor Reference Ladder on Left */}
            <text x="40" y="45" fill="#ef4444" fontSize="11" fontWeight="bold">V_REF (+5V)</text>
            <line x1="75" y1="50" x2="75" y2="295" stroke="#ef4444" strokeWidth="2" />
            <text x="40" y="310" fill="#64748b" fontSize="11" fontWeight="bold">GND (0V)</text>

            {/* Resistors R1..R8 Taps */}
            {[7, 6, 5, 4, 3, 2, 1].map((k) => {
              const y = 60 + (7 - k) * 32;
              return (
                <g key={k}>
                  {/* Resistor Block */}
                  <rect x="65" y={y - 8} width="20" height="16" fill="#1e293b" stroke="#ef4444" rx="2" />
                  <text x="50" y={y + 4} fill="#fca5a5" fontSize="8">{k}/8</text>
                  {/* Reference wire to comparator negative inverting pin */}
                  <line x1="85" y1={y} x2="160" y2={y} stroke="#ef4444" strokeWidth="1.5" />
                  {/* Comparator triangle */}
                  <polygon points={`160,${y - 12} 160,${y + 12} 205,${y}`} fill="#1e293b" stroke="#3b82f6" strokeWidth="1.5" />
                  <text x="165" y={y + 3} fill="#ef4444" fontSize="10">-</text>
                  <text x="165" y={y - 2} fill="#34d399" fontSize="9">+</text>
                  {/* Output line to Priority Encoder */}
                  <line x1="205" y1={y} x2="340" y2={y} stroke="#38bdf8" strokeWidth="2" />
                  <text x="270" y={y - 3} fill="#93c5fd" fontSize="9">Comp {k}</text>
                </g>
              );
            })}

            {/* Common Analog Input V_IN Bus */}
            <text x="100" y="45" fill="#34d399" fontSize="11" fontWeight="bold">ANALOG IN (V_in)</text>
            <line x1="135" y1="50" x2="135" y2="285" stroke="#34d399" strokeWidth="2.5" />
            {[7, 6, 5, 4, 3, 2, 1].map((k) => {
              const y = 60 + (7 - k) * 32;
              return (
                <line key={k} x1="135" y1={y - 6} x2="160" y2={y - 6} stroke="#34d399" strokeWidth="1.5" />
              );
            })}

            {/* Central 8:3 Priority Encoder */}
            <rect x="340" y="45" width="160" height="250" fill="#090d16" stroke="#f59e0b" strokeWidth="2" rx="8" />
            <text x="420" y="75" fill="#f59e0b" fontSize="12" fontWeight="bold" textAnchor="middle">
              74HC148 PRIORITY
            </text>
            <text x="420" y="92" fill="#fbbf24" fontSize="11" fontWeight="bold" textAnchor="middle">
              ENCODER (8-TO-3)
            </text>
            <text x="420" y="115" fill="#94a3b8" fontSize="8" textAnchor="middle">
              Translates Thermometer Code
            </text>
            <text x="420" y="128" fill="#94a3b8" fontSize="8" textAnchor="middle">
              (0000111) → Binary (011)
            </text>

            {/* Digital Outputs D2, D1, D0 */}
            <line x1="500" y1="120" x2="570" y2="120" stroke="#10b981" strokeWidth="2.5" />
            <circle cx="570" cy="120" r="4" fill="#10b981" />
            <text x="580" y="124" fill="#34d399" fontSize="11" fontWeight="bold">D2 (MSB)</text>

            <line x1="500" y1="160" x2="570" y2="160" stroke="#10b981" strokeWidth="2.5" />
            <circle cx="570" cy="160" r="4" fill="#10b981" />
            <text x="580" y="164" fill="#34d399" fontSize="11" fontWeight="bold">D1</text>

            <line x1="500" y1="200" x2="570" y2="200" stroke="#10b981" strokeWidth="2.5" />
            <circle cx="570" cy="200" r="4" fill="#10b981" />
            <text x="580" y="204" fill="#34d399" fontSize="11" fontWeight="bold">D0 (LSB)</text>

            {/* Performance Metric Callout */}
            <rect x="340" y="235" width="280" height="55" fill="#1e293b" rx="5" />
            <text x="350" y="254" fill="#38bdf8" fontSize="9" fontWeight="bold">FASTEST ADC ARCHITECTURE:</text>
            <text x="350" y="268" fill="#e2e8f0" fontSize="8">• 1 Clock Cycle conversion time (&gt; 1 Giga-Sample/sec)</text>
            <text x="350" y="282" fill="#fca5a5" fontSize="8">• Limitation: Hardware explodes exponentially (2^n - 1 comparators)</text>
          </svg>
        );

      case 'TTL_NAND_7400_INTERNAL':
        return (
          <svg viewBox="0 0 650 330" className="w-full h-auto max-h-[350px] select-none font-mono">
            <rect x="0" y="0" width="650" height="330" fill="#0f172a" rx="12" />
            <text x="325" y="24" fill="#94a3b8" fontSize="13" fontWeight="bold" textAnchor="middle">
              STANDARD TTL 7400 NAND GATE (MULTI-EMITTER BJT & TOTEM-POLE STAGE)
            </text>

            {/* VCC Supply Rail at Top */}
            <line x1="60" y1="55" x2="580" y2="55" stroke="#ef4444" strokeWidth="3" />
            <text x="325" y="48" fill="#ef4444" fontSize="11" fontWeight="bold" textAnchor="middle">V_CC (+5.0 V)</text>

            {/* Inputs A and B on multi-emitter Q1 */}
            <text x="25" y="110" fill="#38bdf8" fontSize="12" fontWeight="bold">IN A</text>
            <line x1="65" y1="105" x2="130" y2="105" stroke="#38bdf8" strokeWidth="2.5" />

            <text x="25" y="145" fill="#38bdf8" fontSize="12" fontWeight="bold">IN B</text>
            <line x1="65" y1="140" x2="130" y2="140" stroke="#38bdf8" strokeWidth="2.5" />

            {/* Multi-Emitter BJT Q1 Box */}
            <rect x="130" y="85" width="65" height="75" fill="#1e293b" stroke="#3b82f6" strokeWidth="2" rx="4" />
            <text x="162" y="115" fill="#60a5fa" fontSize="11" fontWeight="bold" textAnchor="middle">Q1</text>
            <text x="162" y="132" fill="#93c5fd" fontSize="8" textAnchor="middle">Dual Emitter</text>
            {/* Base Pull-up resistor 4k */}
            <rect x="155" y="55" width="16" height="30" fill="#0f172a" stroke="#ef4444" rx="2" />
            <text x="180" y="73" fill="#fca5a5" fontSize="9">4 kΩ</text>

            {/* Phase Splitter Transistor Q2 */}
            <line x1="195" y1="122" x2="270" y2="122" stroke="#38bdf8" strokeWidth="2" />
            <rect x="270" y="95" width="65" height="65" fill="#1e293b" stroke="#f59e0b" strokeWidth="2" rx="4" />
            <text x="302" y="125" fill="#fbbf24" fontSize="11" fontWeight="bold" textAnchor="middle">Q2</text>
            <text x="302" y="142" fill="#fde68a" fontSize="8" textAnchor="middle">Phase Splitter</text>
            {/* Collector Resistor 1.6k */}
            <rect x="295" y="55" width="16" height="40" fill="#0f172a" stroke="#ef4444" rx="2" />
            <text x="320" y="78" fill="#fca5a5" fontSize="9">1.6 kΩ</text>
            {/* Emitter Resistor 1k */}
            <rect x="295" y="160" width="16" height="35" fill="#0f172a" stroke="#64748b" rx="2" />
            <text x="320" y="180" fill="#cbd5e1" fontSize="9">1 kΩ</text>

            {/* Totem-Pole Output Stage (Right Box) */}
            <rect x="390" y="70" width="220" height="210" fill="#090d16" stroke="#10b981" strokeWidth="2" rx="8" />
            <text x="500" y="90" fill="#34d399" fontSize="11" fontWeight="bold" textAnchor="middle">
              TOTEM-POLE DRIVER STAGE
            </text>

            {/* Pull-Up Transistor Q3 */}
            <rect x="440" y="105" width="55" height="45" fill="#1e293b" stroke="#34d399" rx="4" />
            <text x="467" y="132" fill="#34d399" fontSize="11" fontWeight="bold" textAnchor="middle">Q3</text>
            {/* Current Limiting Resistor 130 ohms */}
            <rect x="460" y="55" width="14" height="30" fill="#0f172a" stroke="#ef4444" rx="2" />
            <text x="480" y="72" fill="#fca5a5" fontSize="9">130 Ω</text>

            {/* Level Shift Diode D1 */}
            <polygon points="460,165 474,165 467,177" fill="#f59e0b" />
            <line x1="460" y1="177" x2="474" y2="177" stroke="#f59e0b" strokeWidth="2" />
            <text x="485" y="174" fill="#fde68a" fontSize="9">D1</text>

            {/* Output Node Y */}
            <circle cx="467" cy="195" r="5" fill="#10b981" />
            <line x1="467" y1="195" x2="570" y2="195" stroke="#10b981" strokeWidth="3" />
            <circle cx="570" cy="195" r="5" fill="#10b981" />
            <text x="580" y="200" fill="#34d399" fontSize="13" fontWeight="bold">Y (OUT)</text>

            {/* Pull-Down Transistor Q4 */}
            <rect x="440" y="215" width="55" height="45" fill="#1e293b" stroke="#34d399" rx="4" />
            <text x="467" y="242" fill="#34d399" fontSize="11" fontWeight="bold" textAnchor="middle">Q4</text>

            {/* Ground Rail at Bottom */}
            <line x1="60" y1="290" x2="580" y2="290" stroke="#64748b" strokeWidth="3" />
            <text x="325" y="310" fill="#94a3b8" fontSize="11" fontWeight="bold" textAnchor="middle">GND (0 V)</text>

            {/* Bottom Operation Note */}
            <text x="325" y="325" fill="#cbd5e1" fontSize="9" textAnchor="middle">
              WORKING: When A=1, B=1 → Q1 turns OFF, Q2 turns ON → Q4 saturates (Pulls Y LOW to 0.2V, sinks up to 16mA).
            </text>
          </svg>
        );

      default:
        return (
          <div className="flex flex-col items-center justify-center p-8 text-center text-slate-400">
            <Layers className="h-10 w-10 text-blue-500 mb-2" />
            <span className="text-sm font-semibold text-white">{title}</span>
            <span className="text-xs text-slate-500 mt-1">High-Resolution Engineering Diagram</span>
          </div>
        );
    }
  };

  return (
    <div className="my-8 rounded-2xl border border-blue-200/80 dark:border-slate-800 bg-slate-950 overflow-hidden shadow-md">
      {/* Header bar */}
      <div className="flex items-center justify-between border-b border-slate-800 px-5 py-3 bg-slate-900/90 text-xs">
        <div className="flex items-center gap-2">
          <span className="inline-flex h-2 w-2 rounded-full bg-blue-500 animate-pulse" />
          <span className="font-bold text-white tracking-wide uppercase font-mono">{title}</span>
        </div>
        <div className="flex items-center gap-2 text-slate-400">
          <span className="text-[11px] font-mono bg-slate-800 px-2 py-0.5 rounded text-blue-400">
            ENGINEERING SCHEMATIC
          </span>
          <button
            onClick={() => setZoom(!zoom)}
            className="p-1 rounded hover:bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
            title="Toggle zoom"
          >
            <ZoomIn className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Diagram Canvas Body */}
      <div className={`p-4 sm:p-6 overflow-x-auto flex justify-center bg-slate-950 ${zoom ? 'scale-110 py-10' : ''} transition-transform`}>
        {renderSvgContent()}
      </div>

      {/* Caption & Explanatory Footer */}
      {caption && (
        <div className="border-t border-slate-800/80 px-5 py-3 bg-slate-900/60 text-xs text-slate-300 flex items-start gap-2.5">
          <Info className="h-4 w-4 text-blue-400 shrink-0 mt-0.5" />
          <p className="leading-relaxed font-sans">{caption}</p>
        </div>
      )}
    </div>
  );
};
