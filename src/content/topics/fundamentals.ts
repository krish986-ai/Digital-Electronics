import { TopicItem } from '../../types';

export const FUNDAMENTAL_TOPICS: TopicItem[] = [
  {
    id: 't_intro_digital',
    slug: 'intro-to-digital-electronics',
    unitId: 'fundamentals',
    unitTitle: 'Fundamentals & Number Systems',
    unitNumber: 1,
    chapterNumber: 1,
    title: 'Introduction to Digital Electronics & Logic Levels',
    shortDescription: 'Core differences between analog and discrete signals, noise margins, logic high/low voltage bands, and the transistor switch principle.',
    estimatedMinutes: 18,
    difficulty: 'Beginner',
    tags: ['Analog vs Digital', 'Logic Levels', 'Noise Margin', 'Binary Signal', 'Transistor Switch'],
    overview: 'Digital electronics is the foundational discipline of modern computer engineering, operating strictly on discrete quantized binary voltage states: Logic 1 (HIGH) and Logic 0 (LOW). Unlike continuous analog systems where physical voltages accumulate electromagnetic interference, thermal noise, and component drift at every cascaded stage, digital gates regenerate crisp, standardized binary voltages at every single transition. This signal regeneration enables billions of semiconductor switches on microprocessors like Apple M-series, Intel Core, and ARM processors to compute without bit corruption.',
    learningObjectives: [
      'Differentiate between analog continuous waveforms and discrete quantized digital signals.',
      'Understand the four critical threshold voltages: V_OH, V_OL, V_IH, and V_IL.',
      'Calculate high-state and low-state noise margins (NM_H and NM_L) to verify noise immunity.',
      'Explain how MOSFETs and BJTs operate in saturation and cutoff to act as electronic switches.',
      'Analyze the forbidden indeterminate threshold zone and its hazards in digital hardware.',
    ],
    prerequisites: ['Basic concept of electrical voltage, current, and Ohm’s Law.'],
    beginnerExplanation: 'Think of an analog signal like an inclined ramp or a dimmable light switch: you can set the knob to any continuous brightness between 0% and 100%. If a small motor vibration or electrical surge hits the wire, the brightness wobbles slightly, and that error stays forever because the circuit has no way to tell whether you intended 49.8% or 50.1%!\n\nA digital signal is like a crisp binary rocker switch: it is either completely ON or completely OFF. Even if electrical static causes the wire voltage to fluctuate between 4.5V and 4.8V, the receiver recognizes anything above 2.0V as an unambiguous TRUE (1). Because the gate only checks whether the signal is in the HIGH bucket or the LOW bucket, small noise is completely eliminated at every stage!',
    deepTechnicalExplanation: 'In semiconductor logic families (such as 5V TTL, 3.3V LVCMOS, and 1.2V FinFET logic), the continuous voltage spectrum [0V, V_DD] is formally partitioned into four standardized threshold parameters:\n\n1. V_OH (Output High Level): The absolute minimum voltage guaranteed at a transmitting gate\'s output pin when asserting logic 1 (e.g., 2.4V for standard 5V TTL; 4.9V for 5V CMOS).\n2. V_OL (Output Low Level): The absolute maximum voltage guaranteed at a transmitting gate\'s output pin when asserting logic 0 (e.g., 0.4V for TTL; 0.1V for CMOS).\n3. V_IH (Input High Level): The lowest input voltage that a receiving gate is guaranteed to reliably interpret as logic 1 (e.g., 2.0V for TTL).\n4. V_IL (Input Low Level): The highest input voltage that a receiving gate is guaranteed to reliably interpret as logic 0 (e.g., 0.8V for TTL).\n\nThe difference between the driver output capability and the receiver input requirement defines the Noise Margin:\n• High-Level Noise Margin: NM_H = V_OH - V_IH (for TTL: 2.4V - 2.0V = 0.4V)\n• Low-Level Noise Margin: NM_L = V_IL - V_OL (for TTL: 0.8V - 0.4V = 0.4V)\n\nIf electrical noise or crosstalk pulls a wire into the indeterminate region between V_IL and V_IH, the circuit enters a forbidden state. In CMOS gates, this causes both the PMOS pull-up and NMOS pull-down transistors to conduct simultaneously, resulting in massive shoot-through current, thermal overheating, and potential logic metastability.',
    technicalDefinition: 'A digital system is a discrete-time, discrete-amplitude physical realization where state variables take values from a finite Boolean alphabet {0, 1}, implemented using threshold-switched semiconductor devices operating between saturation and cutoff.',
    workingPrinciple: 'Field-Effect Transistors (MOSFETs) or Bipolar Junction Transistors (BJTs) are operated strictly in their extreme non-linear regimes: deep saturation (conducting, low-resistance path to GND or VDD) and cutoff (open-circuit, high-resistance state). This produces highly non-linear, regenerative voltage transfer characteristics (VTC) with large small-signal gain in the transition region.',
    diagrams: [
      {
        id: 'diag_logic_levels',
        title: 'Driver Output vs Receiver Input Threshold Bands & Noise Margins',
        type: 'schematic',
        caption: 'Detailed voltage mapping diagram showing V_OH, V_OL, V_IH, V_IL, and the central forbidden indeterminate zone.',
        svgType: 'LOGIC_LEVELS_VTC',
      },
    ],
    lectureSections: [
      {
        id: 'sec_analog_vs_digital',
        title: 'Module 1: Continuous Analog Signals vs. Discrete Quantized Logic',
        subtitle: 'Signal Regeneration & Immunity to Cumulative Electromagnetic Interference',
        content: 'Physical systems in nature are governed by continuous variables: temperature, pressure, acoustic pressure, and electromagnetic fields. Early analog computers used operational amplifier integrator circuits to process continuous voltages. However, analog systems suffer from a fatal flaw: every stage of amplification or transmission irrevocably injects thermal Johnson noise, shot noise, and drift.\n\nIn a digital system, voltages are quantized into two standardized binary equivalence classes: Logic 0 and Logic 1. Because logic gates possess high non-linear small-signal voltage gain in their transition region, any slight voltage deviation (e.g. 4.6V instead of 5.0V) is actively restored to nominal levels by the next gate. This regenerative property enables billions of cascading logic operations across microprocessors without accumulation of error.',
        keyPoints: [
          'Analog signals suffer cumulative degradation; digital signals regenerate at every gate.',
          'Binary quantization maps an infinite continuum of voltages into two robust states {0, 1}.',
          'Regeneration relies on high non-linear small-signal gain in the switching region.',
        ],
        callout: {
          type: 'theorem',
          title: 'The Regeneration Theorem',
          text: 'A digital gate with non-linear voltage transfer characteristics (gain |dV_out / dV_in| > 1 in transition) actively attenuates noise in the valid HIGH and LOW bands, restoring signal fidelity infinitely.',
        },
      },
      {
        id: 'sec_thresholds_noise_margin',
        title: 'Module 2: Standard Threshold Voltages & Noise Margin Analysis',
        subtitle: 'V_OH, V_OL, V_IH, V_IL and Noise Budget Calculation',
        content: 'To interface logic gates reliably across circuit boards, semiconductor consortia (IEEE, JEDEC) standardize four voltage thresholds:\n\n1. V_OH (Output High): Minimum voltage driver outputs for Logic 1 (TTL: 2.4V, CMOS: 4.9V).\n2. V_OL (Output Low): Maximum voltage driver outputs for Logic 0 (TTL: 0.4V, CMOS: 0.1V).\n3. V_IH (Input High): Minimum voltage receiver needs to recognize Logic 1 (TTL: 2.0V, CMOS: 3.5V).\n4. V_IL (Input Low): Maximum voltage receiver permits to recognize Logic 0 (TTL: 0.8V, CMOS: 1.5V).\n\nThe safety buffer between what the driver outputs and what the receiver requires is called the Noise Margin:\n• NM_H = V_OH - V_IH (High-Level Noise Margin)\n• NM_L = V_IL - V_OL (Low-Level Noise Margin)\n\nThe overall system noise immunity is strictly limited by the weaker state: min(NM_H, NM_L).',
        formula: 'NM_H = V_{OH} - V_{IH}, \\quad NM_L = V_{IL} - V_{OL}, \\quad \\Delta V_{margin} = \\min(NM_H, NM_L)',
        keyPoints: [
          'TTL standard margins: NM_H = 2.4V - 2.0V = 0.4V; NM_L = 0.8V - 0.4V = 0.4V.',
          'CMOS 5V margins: NM_H = 4.9V - 3.5V = 1.4V; NM_L = 1.5V - 0.1V = 1.4V (superior noise immunity).',
          'Interconnect noise (cross-talk, ground bounce) must never exceed the minimum noise margin.',
        ],
        callout: {
          type: 'warning',
          title: 'The Forbidden Indeterminate Region',
          text: 'Any signal hovering between V_IL and V_IH triggers undefined logic outputs, oscillation, and simultaneous conduction of both PMOS and NMOS transistors, leading to catastrophic thermal shoot-through current.',
        },
      },
      {
        id: 'sec_switching_physics',
        title: 'Module 3: MOSFET Switching Physics & Power Scaling Laws',
        subtitle: 'Cutoff, Saturation, and the Quadratic Dynamic Power Law',
        content: 'Digital logic gates are realized using Field-Effect Transistors (MOSFETs) acting as electronic switches. In modern Complementary MOS (CMOS) logic, PMOS transistors form a pull-up network to V_DD, and NMOS transistors form a pull-down network to Ground.\n\nIn steady-state (either HIGH or LOW), one of the networks is completely cut off, meaning zero DC current flows from V_DD to Ground. Power is consumed almost exclusively during transition when charging and discharging parasitic gate capacitances:\nP_dynamic = α · C_L · V_DD² · f_clk.\n\nBecause dynamic power dissipation scales with the SQUARE of supply voltage (V_DD²), the semiconductor industry historically lowered voltages from 5.0V to 3.3V, 1.8V, 1.2V, and down to 0.75V in modern FinFET processor nodes.',
        formula: 'P_{dynamic} = \\alpha \\cdot C_{load} \\cdot V_{DD}^2 \\cdot f_{clock}',
        keyPoints: [
          'CMOS gates consume virtually zero static power at DC idle.',
          'Dynamic power scales quadratically with supply voltage V_DD².',
          'Lowering V_DD reduces heat exponentially but shrinks noise margin, requiring differential routing.',
        ],
        callout: {
          type: 'tip',
          title: 'PCB Design Rule of Thumb',
          text: 'Always place a 0.1 µF ceramic decoupling capacitor as physically close as possible to the V_DD pin of every digital IC to suppress high-frequency supply voltage rail bounce during switching.',
        },
      },
    ],
    mathematicalExplanation: {
      equations: [
        'NM_H = V_{OH} - V_{IH}',
        'NM_L = V_{IL} - V_{OL}',
        '\\Delta V_{noise,max} = \\min(NM_H, NM_L)',
        'P_{dynamic} = \\alpha \\cdot C_{load} \\cdot V_{DD}^2 \\cdot f_{clock}',
      ],
      derivationSteps: [
        'High-state noise margin NM_H is the maximum negative-going noise spike that can superimpose onto a HIGH wire (V_OH) without dropping below the receiving gate\'s threshold (V_IH).',
        'Low-state noise margin NM_L is the maximum positive-going noise glitch that can superimpose onto a LOW wire (V_OL) without exceeding the receiving gate\'s threshold (V_IL).',
        'The overall noise immunity of a digital system is dictated by the smaller of the two margins: min(NM_H, NM_L).',
      ],
    },
    solvedProblems: [
      {
        question: 'An advanced low-power CMOS logic family operating at V_DD = 3.3V specifies V_OH = 3.0V, V_IH = 2.0V, V_OL = 0.2V, and V_IL = 0.8V. (a) Calculate NM_H and NM_L. (b) Determine the maximum peak-to-peak noise voltage the interconnect bus can tolerate.',
        solution: 'Step 1: Calculate High Noise Margin:\nNM_H = V_OH - V_IH = 3.0V - 2.0V = 1.0V.\n\nStep 2: Calculate Low Noise Margin:\nNM_L = V_IL - V_OL = 0.8V - 0.2V = 0.6V.\n\nStep 3: Determine System Noise Immunity:\nThe overall noise immunity is constrained by the weakest state: min(1.0V, 0.6V) = 0.6V.',
        explanation: 'A noise glitch of up to 1.0V on a HIGH line will still leave the input at >= 2.0V (safe 1). However, on a LOW line, a positive noise pulse exceeding 0.6V will elevate the line above 0.8V into the forbidden zone, corrupting the bit. Thus, the system is low-state noise limited.',
      },
      {
        question: 'Explain why reducing power supply voltage V_DD from 5V down to 1.2V in modern mobile processors dramatically reduces dynamic power, but degrades noise margin.',
        solution: 'Dynamic switching power scales quadratically with voltage: P = C · V_DD^2 · f. Reducing V_DD from 5V to 1.2V reduces dynamic power by a factor of (1.2 / 5)^2 = 0.0576 (a 94.2% reduction in heat!).\nHowever, because the total voltage span is compressed from 5V to 1.2V, the noise margins shrink from ~1.5V down to ~0.2V, requiring sophisticated PCB shielding and differential signaling.',
        explanation: 'Engineering is always an optimization trade-off between power dissipation and electromagnetic noise immunity.',
      },
    ],
    interactiveChecks: [
      {
        question: 'In a digital system with V_OH = 2.7V, V_IH = 2.0V, V_OL = 0.4V, and V_IL = 0.8V, what is the low-level noise margin NM_L?',
        options: ['0.7V', '0.4V', '1.6V', '1.2V'],
        correctIndex: 1,
        hint: 'Use the formula NM_L = V_IL - V_OL.',
        explanation: 'NM_L = V_IL - V_OL = 0.8V - 0.4V = 0.4V. This means any positive noise spike greater than 0.4V on a LOW wire will push the line into the forbidden indeterminate zone.',
      },
      {
        question: 'What happens physically inside a CMOS logic gate if an input pin is left unconnected (floating)?',
        options: [
          'The gate permanently outputs a stable logic 0.',
          'The gate functions as an ideal resistor.',
          'High input impedance causes ambient static charges to float the input near V_DD/2, causing both PMOS and NMOS to conduct simultaneously and overheat.',
          'The input voltage automatically grounds itself to 0V.',
        ],
        correctIndex: 2,
        hint: 'CMOS gates have glass-like silicon dioxide gate insulation with 10^12 ohms impedance.',
        explanation: 'Because MOS gates have nearly infinite DC resistance (10^12 ohms), a floating pin acts as an antenna. It drifts to the mid-rail threshold (~V_DD/2) where both pull-up PMOS and pull-down NMOS turn ON at the same time, producing huge shoot-through current (I_dd) and destroying the IC.',
      },
    ],
    applications: [
      'Modern microprocessors (billions of logic gates switching synchronously at multi-GHz frequencies).',
      'Solid-state drive (SSD) flash memory arrays and DDR5 SDRAM.',
      'Automotive engine control units (ECUs) operating in extreme electrical noise environments.',
      'Lossless digital communication protocols (PCI Express, USB 4, HDMI, Ethernet).',
    ],
    advantages: [
      'High noise immunity due to non-linear regenerative voltage transfer characteristics.',
      'Zero cumulative degradation over arbitrary numbers of processing or transmission stages.',
      'Extremely high integration density (billions of transistors per square millimeter in silicon).',
      'Programmable via Hardware Description Languages (VHDL, Verilog, SystemVerilog).',
    ],
    limitations: [
      'Physical sensors and actuators (temperature, sound, pressure, radio waves) are analog, requiring ADC/DAC converters.',
      'High-frequency switching creates parasitic dynamic power dissipation (P = C·V²·f) and radio-frequency interference.',
    ],
    commonMistakes: [
      'Leaving unused CMOS inputs floating on breadboards or PCBs: always tie unused inputs to V_DD or GND!',
      'Assuming Logic 1 is exactly 5V and Logic 0 is exactly 0V; in real hardware, they are valid voltage bands with tolerances.',
      'Forgetting that noise margins depend on fan-out loading: driving too many inputs degrades V_OH and elevates V_OL.',
    ],
    examPoints: [
      'Remember the four threshold variables: V_OH, V_OL, V_IH, V_IL.',
      'Standard TTL Noise Margin is 0.4V for both high and low states.',
      'Standard 5V CMOS Noise Margin is much wider: typically 1.0V to 1.5V (superior noise immunity).',
      'Digital noise margin is defined as min(NM_H, NM_L).',
    ],
    vivaQuestions: [
      {
        question: 'Why does CMOS logic offer substantially higher noise margins than TTL logic?',
        answer: 'CMOS outputs swing rail-to-rail: V_OH is almost exactly V_DD (4.99V) and V_OL is almost exactly 0V (0.01V) because MOSFET channels in saturation have negligible voltage drop at low currents. TTL uses bipolar transistors with a forward diode drop (V_BE) and saturation drop (V_CE,sat), limiting V_OH to ~2.7V.',
      },
      {
        question: 'What is the "forbidden zone" in digital circuits, and what occurs when a signal enters it?',
        answer: 'The forbidden zone is the indeterminate voltage range between V_IL and V_IH. In this zone, the circuit output is undefined, logic gates may oscillate wildly, and in CMOS gates, both PMOS and NMOS conduct simultaneously, causing massive shoot-through current and chip degradation.',
      },
    ],
    relatedTopicSlugs: ['number-systems', 'boolean-algebra-laws', 'logic-families-ttl-cmos'],
  },
  {
    id: 't_number_systems',
    slug: 'number-systems',
    unitId: 'fundamentals',
    unitTitle: 'Fundamentals & Number Systems',
    unitNumber: 1,
    chapterNumber: 2,
    title: 'Number Systems: Binary, Octal, Hexadecimal & Decimal',
    shortDescription: 'Positional radix arithmetic, fractional radix conversions, and fast base 2 <-> base 8 <-> base 16 grouping techniques.',
    estimatedMinutes: 22,
    difficulty: 'Beginner',
    tags: ['Radix Conversion', 'Binary', 'Hexadecimal', 'Octal', 'Fractions', 'Nibbles'],
    overview: 'Positional number systems express quantities by multiplying digits with powers of a base (radix r). In digital computers, binary (base 2) is the fundamental native hardware language. Because binary numbers quickly become long and unwieldy for human engineers to read, octal (base 8, groups of 3 bits) and hexadecimal (base 16, groups of 4 bits) are universally adopted as compact human-readable representations for memory addresses and machine instructions.',
    learningObjectives: [
      'Convert between decimal, binary, octal, and hexadecimal number systems for both integer and fractional values.',
      'Master the 3-bit (octal) and 4-bit (hexadecimal) direct grouping technique without intermediate decimal steps.',
      'Understand how binary fractions represent real numbers and identify repeating rational sequences.',
      'Apply hexadecimal representation to computer memory addressing, IPv6, and machine instructions.',
    ],
    prerequisites: ['Basic integer powers and long division.'],
    beginnerExplanation: 'In our familiar decimal system (base 10), each column represents a power of 10: units (10^0), tens (10^1), hundreds (10^2). In binary (base 2), each column doubles: 1, 2, 4, 8, 16, 32, 64, 128. So the binary number 1011 means one 8, zero 4s, one 2, and one 1 (8 + 2 + 1 = 11 in decimal).\n\nHexadecimal uses digits 0-9 and letters A-F to represent numbers 10-15 in a single digit. Exactly 4 binary bits (called a nibble) map to 1 hex digit. For example, binary 1111 0010 converts directly to F2 in hex! You never need to do complex math: just group bits in fours!',
    deepTechnicalExplanation: 'A general number N in radix r is expressed by the power series expansion:\nN_r = sum_{i=-m}^{n-1} d_i · r^i = d_{n-1}·r^{n-1} + ... + d_1·r^1 + d_0·r^0 + d_{-1}·r^{-1} + ... + d_{-m}·r^{-m}\nwhere 0 <= d_i < r are the digit coefficients.\n\nInteger Conversion (Decimal to Radix r):\nExecuted via successive division by r. The remainder of each division produces the next digit d_i, collected in reverse order (least significant digit first, most significant digit last) until the quotient is zero.\n\nFractional Conversion (Decimal to Radix r):\nExecuted via successive multiplication by r. The integer part of each multiplication product represents the next fractional coefficient d_{-i}, recorded in forward order (left to right). If the fractional product does not reach exactly zero, the number forms a non-terminating periodic repeating sequence in radix r.',
    technicalDefinition: 'A radix-r positional notation system represents any real number as an ordered sequence of coefficients d_k in the range 0 <= d_k < r, where each position possesses an exponential positional weight of r^k.',
    workingPrinciple: 'Direct Base-2^k Grouping: Because 8 = 2^3 and 16 = 2^4, any binary bit-stream can be converted to octal by grouping bits into triplets (3 bits) starting from the binary radix point, or to hexadecimal by grouping into nibbles (4 bits). No intermediate decimal conversion is required.',
    diagrams: [
      {
        id: 'diag_radix_map',
        title: 'Direct 4-Bit Nibble Grouping Architecture (Binary ↔ Hexadecimal)',
        type: 'schematic',
        caption: 'Diagram illustrating how 16-bit binary words divide cleanly into four 4-bit nibbles corresponding to hex digits 0xD6B5.',
        svgType: 'RADIX_NIBBLE_MAP',
      },
    ],
    lectureSections: [
      {
        id: 'sec_radix_power_series',
        title: 'Module 1: Positional Radix Notation & Formal Power Series',
        subtitle: 'The Universal Base-r Mathematical Formulation',
        content: 'Every positional numbering system expresses an arbitrary real number N as an ordered sum of weighted digit coefficients d_k in radix r:\nN_r = ∑ (d_k · r^k).\n\nIn Decimal (r=10), weights are powers of 10. In Binary (r=2), weights are powers of 2 (... 128, 64, 32, 16, 8, 4, 2, 1 . 0.5, 0.25, 0.125 ...). In Hexadecimal (r=16), weights are powers of 16 (1, 16, 256, 4096...). Hexadecimal adopts letters A through F to represent numeric values 10 through 15 in a single character, preventing ambiguity with multi-digit decimal numbers.',
        formula: 'N_r = \\sum_{i=-m}^{n-1} d_i \\cdot r^i = d_{n-1} r^{n-1} + \\dots + d_0 r^0 + d_{-1} r^{-1} + \\dots + d_{-m} r^{-m}',
        keyPoints: [
          'A radix-r system uses r unique symbols from 0 to (r - 1).',
          'Position relative to the radix point determines exponential weight r^k.',
          'Binary bits grow exponentially: n bits can represent 2^n distinct unsigned values (0 to 2^n - 1).',
        ],
        callout: {
          type: 'theorem',
          title: 'Maximum Representable Unsigned Value',
          text: 'An n-bit binary register can represent exactly 2^n unique discrete values spanning from 0 up to (2^n - 1). For example, an 8-bit byte represents 256 values: 0 to 255.',
        },
      },
      {
        id: 'sec_direct_grouping',
        title: 'Module 2: Direct Power-of-2 Grouping (Binary ↔ Octal ↔ Hexadecimal)',
        subtitle: 'Eliminating Intermediate Decimal Arithmetic',
        content: 'A major breakthrough in computer science is the realization that since 8 = 2³ and 16 = 2⁴, conversions between Binary, Octal, and Hexadecimal do NOT require tedious long division through decimal!\n\n• Binary to Octal: Partition bits into groups of 3 (triplets) starting from the binary point.\n• Binary to Hexadecimal: Partition bits into groups of 4 (nibbles) starting from the binary point.\n• Leading zeros are padded on the integer part (far left), and trailing zeros are padded on the fractional part (far right).\n\nExample: Binary 1101 0110 1011 0101 breaks into nibbles 1101 (D), 0110 (6), 1011 (B), 0101 (5) = 0xD6B5 in one effortless visual step!',
        keyPoints: [
          '1 Hex digit = exactly 4 binary bits (1 nibble). 2 Hex digits = 1 byte (8 bits).',
          '1 Octal digit = exactly 3 binary bits.',
          'Always group outwards from the radix point: leftward for integers, rightward for fractions.',
        ],
        callout: {
          type: 'tip',
          title: 'Direct Hex Memory Inspection',
          text: 'When debugging memory in GDB or inspecting network packets in Wireshark, memory dumps are displayed in hexadecimal because two hex characters exactly represent one 8-bit memory byte.',
        },
      },
      {
        id: 'sec_fractional_hazard',
        title: 'Module 3: Fractional Conversions & Non-Terminating Binary Expansion',
        subtitle: 'The Root Cause of Floating-Point Rounding Inaccuracies',
        content: 'Integer conversion from decimal to radix r uses successive division by r (remainders collected bottom-to-top). Fractional conversion uses successive multiplication by r (integer parts collected top-to-bottom).\n\nA critical surprise for beginner engineers is that simple decimal fractions like 0.1 and 0.2 CANNOT be represented exactly in finite binary! Multiplying 0.1 by 2 yields:\n0.1 × 2 = 0.2 (0)\n0.2 × 2 = 0.4 (0)\n0.4 × 2 = 0.8 (0)\n0.8 × 2 = 1.6 (1)\n0.6 × 2 = 1.2 (1)\n0.2 × 2 = 0.4 (0) ... infinite repeating loop: 0.0001100110011...!\nThis fundamental mathematical reality is why IEEE 754 floating-point math in programming languages (like 0.1 + 0.2 = 0.30000000000000004) produces rounding artifacts.',
        keyPoints: [
          'A fraction terminates in radix r if and only if its denominator\'s prime factors divide r.',
          'Decimal fractions with prime factor 5 (like 1/10 = 0.1) never terminate in base 2.',
          'Financial and banking software uses BCD (Binary Coded Decimal) to eliminate fractional binary roundoff.',
        ],
        callout: {
          type: 'warning',
          title: 'The Padding Trap in Fractional Grouping',
          text: 'When converting fractional binary 0.101 to hex, padding MUST occur on the right: 0.1010_2 = 0.A_16. Padding on the left gives 0.0101_2 = 0.5_16, which corrupts the number by an error of 50%!',
        },
      },
    ],
    mathematicalExplanation: {
      equations: [
        'N_r = \\sum_{i=-m}^{n-1} d_i \\cdot r^i',
        '2^3 = 8 \\implies 1 \\text{ Octal Digit} \\equiv 3 \\text{ Binary Bits}',
        '2^4 = 16 \\implies 1 \\text{ Hex Digit} \\equiv 4 \\text{ Binary Bits (Nibble)}',
        '\\text{Max unsigned integer with } n \\text{ bits} = 2^n - 1',
      ],
      derivationSteps: [
        'To convert from binary to hexadecimal, align bits relative to the radix point.',
        'For integers, group bits in sets of 4 moving leftward from the radix point, padding leading zeros as needed.',
        'For fractions, group bits in sets of 4 moving rightward from the radix point, padding trailing zeros as needed.',
      ],
    },
    solvedProblems: [
      {
        question: 'Convert decimal 109.625 to (a) Binary, (b) Octal, and (c) Hexadecimal using direct grouping.',
        solution: 'Step 1: Convert Integer Part (109):\n109 / 2 = 54 rem 1\n54 / 2 = 27 rem 0\n27 / 2 = 13 rem 1\n13 / 2 = 6 rem 1\n6 / 2 = 3 rem 0\n3 / 2 = 1 rem 1\n1 / 2 = 0 rem 1\nReading remainders bottom-to-top: 109_10 = 1101101_2.\n\nStep 2: Convert Fractional Part (0.625):\n0.625 × 2 = 1.25 -> integer 1\n0.250 × 2 = 0.50 -> integer 0\n0.500 × 2 = 1.00 -> integer 1\nReading integers top-to-bottom: 0.625_10 = 0.101_2.\nComplete Binary = 1101101.101_2.\n\nStep 3: Convert to Octal (Group in 3s from radix point):\n(001)(101)(101) . (101) = 155.5_8.\n\nStep 4: Convert to Hexadecimal (Group in 4s from radix point):\n(0110)(1101) . (1010) = 6D.A_16.',
        explanation: 'Notice how the fractional part 0.101 binary is padded on the right with a zero to form a full 4-bit nibble (1010 = A). Padding on the left would corrupt the value!',
      },
    ],
    interactiveChecks: [
      {
        question: 'What is the hexadecimal representation of the binary byte 11001011?',
        options: ['0xCB', '0xBC', '0xAB', '0xD3'],
        correctIndex: 0,
        hint: 'Split into two nibbles: 1100 and 1011.',
        explanation: '1100 = 8+4 = 12 (0xC). 1011 = 8+2+1 = 11 (0xB). Combining both nibbles yields 0xCB.',
      },
    ],
    applications: [
      'Microprocessor memory addressing (e.g. 0x00000000 to 0xFFFFFFFF in 32-bit architecture).',
      'Network MAC addresses (e.g. 48-bit hex formatted as 00:1A:2B:3C:4D:5E).',
      'HTML/CSS Web color codes (e.g. #3B82F6 = Red 59, Green 130, Blue 246).',
      'Machine code instruction opcodes in assembler listings and disassemblers.',
    ],
    advantages: [
      'Hexadecimal reduces 32-bit binary strings (11000000101010000000000100000001) down to 8 clean characters (0xC0A80101).',
      'Zero round-off conversion errors between base 2, base 8, and base 16 because all are powers of 2.',
    ],
    limitations: [
      'Common decimal fractions like 0.1 and 0.2 become non-terminating repeating fractions in binary (0.0001100110011...), causing floating-point rounding errors in CPU calculations.',
    ],
    commonMistakes: [
      'Padding zeros on the wrong side of fractional numbers: 0.101 binary padded to a nibble MUST be 0.1010 (0.A), never 0.0101 (0.5)!',
      'Confusing hex letters: A=10, B=11, C=12, D=13, E=14, F=15.',
    ],
    examPoints: [
      'Know the powers of 2 by heart: 2^0=1, 2^4=16, 2^8=256, 2^10=1024 (1K), 2^16=65536 (64K), 2^20=1M, 2^32=4G.',
      '1 byte = 8 bits = 2 hex digits = range 0x00 to 0xFF (0 to 255 unsigned).',
    ],
    vivaQuestions: [
      {
        question: 'Why did octal (base 8) become less popular than hexadecimal (base 16) in modern computer architecture?',
        answer: 'Early computers used word sizes that were multiples of 3 bits (like 12-bit, 18-bit, or 36-bit PDP mainframes), matching octal perfectly. Modern computers standardise on 8-bit bytes, 16-bit words, 32-bit dwords, and 64-bit qwords. Since byte sizes are divisible by 4, hexadecimal (nibbles) maps seamlessly into computer byte memory without splitting across byte boundaries.',
      },
    ],
    relatedTopicSlugs: ['intro-to-digital-electronics', 'binary-arithmetic-complements'],
  },
  {
    id: 't_binary_arithmetic',
    slug: 'binary-arithmetic-complements',
    unitId: 'fundamentals',
    unitTitle: 'Fundamentals & Number Systems',
    unitNumber: 1,
    chapterNumber: 3,
    title: 'Binary Arithmetic, 1’s & 2’s Complement, and Signed Overflow',
    shortDescription: 'Addition, subtraction via 2’s complement addition, signed magnitude vs 2’s complement, and hardware overflow detection.',
    estimatedMinutes: 25,
    difficulty: 'Intermediate',
    tags: ['2s Complement', '1s Complement', 'Signed Arithmetic', 'Overflow Flag', 'ALU Architecture'],
    overview: 'In digital arithmetic logic units (ALUs), performing both addition and subtraction using separate physical circuits would waste silicon area and increase propagation delay. By utilizing radix complement (2\'s complement) arithmetic, subtraction (A - B) is converted into simple addition: A + (-B). This topic explains 1\'s and 2\'s complement systems, signed vs unsigned ranges, end-around carry in 1\'s complement, and the V (overflow) condition in signed arithmetic.',
    learningObjectives: [
      'Calculate 1\'s and 2\'s complements of n-bit binary numbers.',
      'Perform binary addition and subtraction using 2\'s complement.',
      'Identify signed arithmetic overflow using the XOR of carry-in and carry-out of the MSB.',
      'Compare signed-magnitude, 1\'s complement, and 2\'s complement number representations.',
    ],
    prerequisites: ['Basic binary number system.'],
    beginnerExplanation: 'Imagine an odometer in an old car that rolls backward past 000: it shows 999. In binary, if you have a 4-bit counter at 0000 and count down by 1, it wraps to 1111! In 2\'s complement, we treat 1111 as -1. The most significant bit (the leftmost bit) acts as a sign indicator: 0 means positive, 1 means negative. To make any positive number negative, invert all bits (0s become 1s, 1s become 0s) and add 1. Subtracting 7 - 5 is simply adding 7 + (-5). The hardware never needs to subtract; it only adds!',
    deepTechnicalExplanation: 'In an n-bit 2\'s complement system, the numerical value is given by: Value = -d_{n-1} * 2^{n-1} + sum_{i=0}^{n-2} d_i * 2^i. Notice the MSB has a negative weight. The range for n bits is -2^{n-1} to +(2^{n-1} - 1). For example, 8 bits covers -128 to +127. There is exactly one representation for zero (00000000), unlike 1\'s complement which suffered from +0 and -0 dual representations.\n\nSigned Overflow Condition: An overflow occurs when the sum of two numbers of the same sign produces a result of the opposite sign (e.g. (+70) + (+80) = -106 in 8-bit). At the logic gate level, Overflow Flag V = C_{in}(MSB) XOR C_{out}(MSB).',
    technicalDefinition: 'The 2\'s complement of an n-bit integer N is defined as (2^n - N). It is mathematically equivalent to (1\'s complement + 1).',
    workingPrinciple: 'When adding A and (-B), the ALU computes A + (2^n - B) = 2^n + (A - B). If A >= B, the 2^n term generates a carry-out of 1 from the MSB, which is simply discarded in modular arithmetic, leaving the correct positive difference (A - B).',
    diagrams: [
      {
        id: 'diag_twos_comp',
        title: '4-Bit Modulo-16 2\'s Complement Wheel & Hardware Overflow Boundary',
        type: 'schematic',
        caption: 'Circular state diagram illustrating positive (0 to +7) and negative (-1 to -8) representations and the overflow boundary.',
        svgType: 'TWOS_COMPLEMENT_RING',
      },
    ],
    lectureSections: [
      {
        id: 'sec_signed_representations',
        title: 'Module 1: Signed Integer Encodings & The Zero Ambiguity Problem',
        subtitle: 'Comparing Signed-Magnitude, 1\'s Complement, and 2\'s Complement',
        content: 'Digital arithmetic units must represent both positive and negative quantities using strictly two physical voltage levels. Historically, three encodings were explored:\n\n1. Signed-Magnitude: MSB is the sign (0=pos, 1=neg), remaining bits are magnitude. Major flaws: dual representations for zero (+0 = 0000, -0 = 1000) and requires separate, complex hardware subtractors.\n2. 1\'s Complement: Inverts all bits to negate. Still suffers from dual zero (+0 = 0000, -0 = 1111) and requires an extra "end-around carry" addition cycle, slowing down the ALU.\n3. 2\'s Complement (Universal Standard): Negates by taking 1\'s complement and adding 1. Solves all problems: exactly ONE representation for zero (0000), seamless hardware subtraction using simple adder circuits, and asymmetry gives one extra negative value: range for n bits is -2^(n-1) to +(2^(n-1) - 1).',
        formula: 'X_{2\'s} = -d_{n-1} \\cdot 2^{n-1} + \\sum_{i=0}^{n-2} d_i \\cdot 2^i',
        keyPoints: [
          '2\'s complement assigns a NEGATIVE positional weight to the Most Significant Bit (-2^(n-1)).',
          '8 bits spans -128 to +127. Notice -128 has no positive counterpart (+128 requires 9 bits!).',
          'Zero is unique: 00000000. Inverting and adding 1 wraps cleanly back to 00000000 with carry discarded.',
        ],
        callout: {
          type: 'theorem',
          title: 'Fast 2\'s Complement Shortcut Rule',
          text: 'To find the 2\'s complement of any binary word by inspection: scan the bits from right to left (LSB to MSB). Keep all zeros and the very first 1 unchanged. Invert all remaining bits to the left!',
        },
      },
      {
        id: 'sec_subtraction_mechanics',
        title: 'Module 2: Radix Subtraction via Addition & Modular Carry Discard',
        subtitle: 'Why ALUs Never Need Separate Subtractor Hardware',
        content: 'The core reason 2\'s complement is universally implemented across all CPU architectures (Intel x86, ARM, RISC-V) is that subtraction (A - B) is mathematically equivalent to adding the radix complement:\nA - B = A + (2^n - B) = 2^n + (A - B).\n\nIf A ≥ B, the true difference (A - B) is positive, and the sum exceeds 2^n. The carry-out bit from the MSB (representing 2^n) is simply discarded in standard modular arithmetic, leaving the exact correct positive difference!\nIf A < B, no carry-out is generated, and the resulting bit pattern is already the correct negative number in 2\'s complement format.',
        keyPoints: [
          'Subtraction A - B is executed as A + B\' + 1.',
          'In 2\'s complement subtraction, a carry-out of 1 means NO borrow was needed (A ≥ B).',
          'A single adder circuit performs both addition and subtraction with zero extra ALU latency.',
        ],
        callout: {
          type: 'tip',
          title: 'The Inverted Carry Borrow Flag',
          text: 'In x86 and ARM processors, the Carry Flag (CF) during subtraction acts as a Borrow Flag. In x86, CF = NOT(Carry Out): CF = 0 indicates A ≥ B, while CF = 1 indicates an unsigned underflow borrow occurred.',
        },
      },
      {
        id: 'sec_overflow_detection',
        title: 'Module 3: Signed Overflow Detection & The XOR Boundary Trap',
        subtitle: 'V = C_in(MSB) ⊕ C_out(MSB) Hardware Gate Realization',
        content: 'A critical distinction in computer engineering is the difference between Carry and Overflow:\n• Carry Flag (C): Indicates unsigned arithmetic overflow past 2^n - 1.\n• Overflow Flag (V / OF): Indicates signed arithmetic overflow past the boundary [-2^(n-1), 2^(n-1) - 1].\n\nSigned overflow occurs when two positive numbers sum to a negative number (e.g. +70 + +80 = -106 in 8 bits), or two negative numbers sum to a positive number. At the silicon gate level, this is detected with extreme elegance using a single XOR gate connected to the carry-in and carry-out of the sign bit:\nV = C_in(MSB) ⊕ C_out(MSB).\nIf the carry entering the sign bit does not match the carry leaving it, the sign bit was corrupted by arithmetic overflow!',
        formula: 'V = C_{n-1} \\oplus C_n',
        keyPoints: [
          'Adding opposite signed numbers (+A and -B) can NEVER produce an overflow.',
          'Overflow occurs ONLY when adding two operands of the SAME sign yields a result of OPPOSITE sign.',
          'The single XOR gate V = C_in ⊕ C_out is active on every single instruction cycle in modern CPUs.',
        ],
        callout: {
          type: 'warning',
          title: 'Ariane 5 Rocket Explosion (1996)',
          text: 'The famous $500M Ariane 5 Flight 501 rocket failure was caused by an unhandled 64-bit floating-point to 16-bit signed integer overflow! The number 32,768 exceeded +32,767, wrapping to -32,768 and crashing the guidance computer.',
        },
      },
    ],
    mathematicalExplanation: {
      equations: [
        "1's \\text{ Comp}(N) = (2^n - 1) - N \\quad (\\text{bitwise NOT})",
        "2's \\text{ Comp}(N) = 1's \\text{ Comp}(N) + 1 = 2^n - N",
        '\\text{Range: } -2^{n-1} \\le X \\le +(2^{n-1} - 1)',
        'V = C_{n-1} \\oplus C_n',
      ],
      derivationSteps: [
        'Proof that adding 2\'s complement yields correct subtraction:',
        'A - B = A + (-B) = A + (2^n - B) = 2^n + (A - B).',
        'If A >= B, the result is >= 2^n, producing a carry out of 1. Dropping the 2^n end carry leaves (A - B).',
        'If A < B, no carry out is produced, and the result is 2^n - (B - A), which is the correct negative result in 2\'s complement format.',
      ],
    },
    solvedProblems: [
      {
        question: 'Subtract decimal 9 from decimal 14 using 8-bit 2\'s complement arithmetic.',
        solution: '+14 = 00001110_2. +9 = 00001001_2.\nFind -9:\nInvert bits of +9 -> 11110110\nAdd 1 -> 11110111 (-9 in 2\'s complement).\n\nNow add:\n  00001110 (+14)\n+ 11110111 (-9)\n--------------\n(1)00000101 (+5)\nDiscard the end carry 1.\nFinal Result = 00000101_2 = +5 decimal.',
        explanation: 'The presence of the end carry out of MSB indicates that the result is positive and correct.',
      },
      {
        question: 'In an 8-bit 2\'s complement ALU, compute (+70) + (+80) and check if signed overflow occurs.',
        solution: '+70 = 01000110_2.\n+80 = 01010000_2.\nAdding:\n  01000110 (+70)\n+ 01010000 (+80)\n--------------\n  10010110 (-106 in signed 2\'s complement!)\n\nCheck Overflow Flag V:\nCarry into MSB (bit 7): C_in = 1\nCarry out of MSB (bit 7): C_out = 0\nV = C_in ⊕ C_out = 1 ⊕ 0 = 1 (OVERFLOW DETECTED!)',
        explanation: 'Because two positive numbers yielded a negative result, the true sum (+150) exceeded the maximum positive 8-bit limit (+127). The hardware sets the V flag.',
      },
    ],
    interactiveChecks: [
      {
        question: 'In an 8-bit signed 2\'s complement system, what is the decimal value of 10000000?',
        options: ['-0', '+128', '-128', '-1'],
        correctIndex: 2,
        hint: 'Remember the asymmetric range: -2^(n-1) to +(2^(n-1) - 1).',
        explanation: 'In 8 bits, 10000000 represents the most negative value: -2^7 = -128. Its positive counterpart +128 cannot be represented in 8 bits.',
      },
      {
        question: 'What Boolean logic gate computes the signed arithmetic overflow flag V from the carry into the MSB (C_in) and carry out of the MSB (C_out)?',
        options: ['AND gate', 'OR gate', 'XOR gate', 'NAND gate'],
        correctIndex: 2,
        hint: 'Overflow occurs if and only if C_in differs from C_out.',
        explanation: 'Overflow occurs when C_in != C_out. This inequality is implemented in hardware with an XOR gate: V = C_in ⊕ C_out.',
      },
    ],
    applications: [
      'All modern CPU Arithmetic Logic Units (x86, ARM, RISC-V).',
      'Digital signal processing (DSP) audio mixing and FIR/IIR filter calculations.',
      'Graphics processing units (GPUs) and floating-point co-processors.',
    ],
    advantages: [
      'Only one zero representation (00000000), avoiding duplicate zero comparison logic in CPU condition codes.',
      'Adder hardware executes both addition and subtraction with zero extra silicon latency.',
    ],
    limitations: [
      'Asymmetric range: -128 to +127 in 8 bits. Attempting to negate -128 produces an overflow!',
    ],
    commonMistakes: [
      'Confusing unsigned carry flag (C) with signed overflow flag (V). Carry indicates unsigned range wrap; V indicates signed 2\'s complement wrap.',
    ],
    examPoints: [
      'In 2\'s complement, n bits range is -2^(n-1) to +(2^(n-1) - 1).',
      'Overflow occurs IF AND ONLY IF carry into MSB != carry out of MSB (C_in XOR C_out = 1).',
      'To negate any 2\'s complement number: invert all bits and add 1.',
    ],
    vivaQuestions: [
      {
        question: 'Why did modern computers completely abandon 1\'s complement in favor of 2\'s complement?',
        answer: '1\'s complement had two major engineering flaws: (1) It had two zeros (+0 as 0000 and -0 as 1111), requiring extra CPU cycles for zero comparison, and (2) Subtraction required an "end-around carry" adder stage, adding latency and silicon complexity.',
      },
    ],
    relatedTopicSlugs: ['number-systems', 'adders-and-subtractors'],
  },
];
