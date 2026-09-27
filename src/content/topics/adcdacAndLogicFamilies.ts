import { TopicItem } from '../../types';

export const ADC_DAC_AND_LOGIC_TOPICS: TopicItem[] = [
  {
    id: 't_dac_adc',
    slug: 'dac-and-adc-converters',
    unitId: 'adc-dac',
    unitTitle: 'Data Converters (DAC & ADC)',
    unitNumber: 8,
    chapterNumber: 1,
    title: 'Data Converters: DACs (R-2R Ladder) & ADCs (Flash, SAR)',
    shortDescription: 'Binary weighted vs R-2R ladder DACs, flash vs successive approximation ADCs, quantization error, and Nyquist sampling theorem.',
    estimatedMinutes: 25,
    difficulty: 'Intermediate',
    tags: ['DAC', 'ADC', 'R-2R Ladder', 'Flash ADC', 'SAR ADC', 'Quantization'],
    overview: 'Because the physical world is inherently continuous (sound waves, temperature, pressure, light) while computers operate strictly on discrete binary numbers, data converters bridge the analog and digital universes. Digital-to-Analog Converters (DACs) convert binary words into continuous voltage or current. Analog-to-Digital Converters (ADCs) periodically sample continuous waveforms and quantize them into discrete digital codes.',
    learningObjectives: [
      'Compare Binary Weighted Resistor DACs with R-2R Ladder DACs.',
      'Calculate DAC output voltage, resolution (1 LSB), and settling time.',
      'Explain the conversion mechanisms of Flash ADCs and Successive Approximation Register (SAR) ADCs.',
      'Understand Quantization Error (±1/2 LSB) and calculate theoretical Signal-to-Noise Ratio (SNR).',
    ],
    prerequisites: ['Operational amplifiers (inverting summer) and binary representation.'],
    beginnerExplanation: 'Think of a DAC like a digital piano synthesizer: the computer sends the number 440, and the DAC turns it into a smooth sound wave vibrating 440 times a second to play note A. An ADC is like a microphone connected to a digital camera: it takes thousands of snapshots per second of an incoming audio wave, measuring the exact voltage height of the wave at each instant and recording it as a binary number (e.g. 10110010).',
    deepTechnicalExplanation: 'DAC Architectures:\n1. Binary Weighted Resistor DAC: Uses resistors R, 2R, 4R, 8R... in an op-amp inverting summer. Major drawback: For 12+ bits, the range of resistor values spans 4096:1, which is impossible to fabricate accurately on integrated circuits due to thermal drift.\n2. R-2R Ladder DAC: Uses only TWO resistor values (R and 2R) arranged in a repetitive ladder. The current splits evenly by half at every node. Highly manufacturable on silicon and exhibits superior temperature tracking.\n\nADC Architectures:\n1. Flash ADC: Uses 2^n - 1 analog comparators and a precision resistor voltage divider to compare the input against all threshold levels simultaneously. Blazing fast (1 clock cycle conversion, >1 GHz), but hardware complexity scales exponentially (an 8-bit flash ADC requires 255 comparators).\n2. Successive Approximation Register (SAR) ADC: Uses a binary search algorithm with an internal DAC and a single comparator. Takes exactly n clock cycles for an n-bit conversion. Excellent compromise of high resolution (12-18 bits) and moderate power.\n3. Dual-Slope Integrating ADC: Integrates input voltage then de-integrates reference voltage. Immune to noise and power line hum (50/60 Hz rejection), but slow; ideal for digital multimeters (DMMs).',
    technicalDefinition: 'A mixed-signal interface mapping between a continuous real-valued Hilbert space V(t) and a discrete finite algebraic code space {0, 1}^n.',
    workingPrinciple: 'In R-2R Ladder: The Thevenin equivalent resistance looking into each ladder node is always R, regardless of ladder length. Each switch connects 2R to ground or virtual ground, scaling output current by 1/2^k for bit k.',
    diagrams: [
      {
        id: 'diag_r2r_dac',
        title: '4-Bit R-2R Ladder Digital-to-Analog Converter (DAC) Circuit',
        type: 'schematic',
        caption: 'Op-amp inverting summer with precision R-2R resistor network requiring only two component values.',
        svgType: 'R2R_LADDER_DAC',
      },
      {
        id: 'diag_flash_adc',
        title: '3-Bit High-Speed Flash ADC with Resistor Ladder & Priority Encoder',
        type: 'schematic',
        caption: 'Ultra-fast 1-clock-cycle conversion using 7 analog comparators and 8-resistor reference voltage divider.',
        svgType: 'FLASH_ADC_COMPARATOR_LADDER',
      },
    ],
    lectureSections: [
      {
        id: 'sec_dac_r2r_weighted',
        title: 'Module 1: Digital-to-Analog Converters: Weighted Resistor vs R-2R Ladder Networks',
        subtitle: 'Precision Resistor Matching, Thevenin Resistive Invariants & Virtual Ground Summers',
        content: 'Real-world physical quantities (sound, voltage, mechanical force) are continuous analog phenomena, while microprocessors process finite binary words. Digital-to-Analog Converters (DACs) translate an n-bit binary code (b1, b2, ..., bn) into a proportional continuous analog voltage or current.\n\nTwo classical architectures exist:\n1. Binary-Weighted Resistor DAC: Employs resistors with values R, 2R, 4R, 8R, ..., 2^{n-1}R summing into the virtual ground of an inverting operational amplifier.\n   • Fatal flaw: For a 16-bit converter, the resistor span is 2^{15} = 32,768:1! Fabricating resistors spanning from 10 kΩ to 327 MΩ on a single monolithic silicon die with identical thermal temperature coefficients is physically impossible.\n2. R-2R Resistor Ladder DAC: Solves the component-spread dilemma by employing only TWO precision resistor values (R and 2R) arranged in a repetitive ladder network.\n   • Thevenin Invariant: The equivalent resistance looking into ANY node of the ladder toward the termination is exactly R!\n   • Each bit switch steers a current of I/2^k into the summing node or ground.\n   • Highly manufacturable: thin-film laser-trimmed silicon resistors achieve extreme temperature tracking and monotonic linearity up to 24 bits.',
        formula: 'V_{out} = -V_{ref} \\cdot \\sum_{k=1}^n \\frac{b_k}{2^k}, \\quad \\text{Step Size (1 LSB)} = \\frac{V_{FS}}{2^n - 1}',
        keyPoints: [
          'Binary-weighted DACs fail at high resolutions due to extreme resistor value spread (2^n:1).',
          'R-2R ladder requires only two resistor values (R and 2R), making it standard in IC manufacturing.',
          'The inverting operational amplifier maintains virtual ground (0V) at the summing junction.',
        ],
        callout: {
          type: 'theorem',
          title: 'The Thevenin Ladder Invariant',
          text: 'At every single junction node of an R-2R ladder, the resistance looking down toward the terminating resistor is identically equal to 2R in parallel with 2R, which equals R. This guarantees that current divides exactly in half (1:1) at each successive stage.',
        },
      },
      {
        id: 'sec_adc_flash_vs_sar',
        title: 'Module 2: High-Speed Analog-to-Digital Conversion: Flash vs Successive Approximation (SAR)',
        subtitle: 'Parallel Comparator Arrays, Binary Search Trees & Quantization Noise',
        content: 'Analog-to-Digital Converters (ADCs) periodically sample continuous waveforms and quantize them into discrete digital numbers.\n\nTwo primary architectures dominate modern electronics:\n1. Flash (Parallel) ADC: Employs a precision voltage divider with 2^n resistors and 2^n - 1 high-speed analog comparators.\n   • Speed: Ultra-fast 1-clock-cycle conversion (>5 Giga-samples/sec in radar and oscilloscopes).\n   • Hardware Cost: Scales exponentially with bit resolution! A 3-bit Flash ADC needs 7 comparators; an 8-bit Flash ADC needs 255 comparators; a 16-bit Flash ADC would require 65,535 comparators (impractical die size and power). A priority encoder compresses the thermometer code into binary.\n2. Successive Approximation Register (SAR) ADC: Executes a binary search algorithm using a single comparator, a SAR control register, and an internal DAC.\n   • Cycle 1: Sets MSB to 1 (testing midpoint V_FS / 2). If V_in > DAC output, keeps MSB=1; else resets to 0.\n   • Cycle 2 to n: Tests next significant bits sequentially.\n   • Conversion Latency: Takes exactly n clock cycles for an n-bit conversion.\n   • Perfect balance of moderate speed (1-10 MSPS), high resolution (12-18 bits), and micro-watt power consumption in IoT sensors.',
        formula: 'N_{comparators}(Flash) = 2^n - 1, \\quad T_{conv}(SAR) = n \\, T_{clk}, \\quad \\text{SNR}_{ideal} = 6.02N + 1.76 \\text{ dB}',
        keyPoints: [
          'Flash ADC converts in 1 clock cycle but requires 2^n - 1 comparators.',
          'SAR ADC uses a binary search algorithm requiring exactly n clock cycles.',
          'Quantization error (±1/2 LSB) creates theoretical SNR limit: SNR = 6.02N + 1.76 dB.',
        ],
        callout: {
          type: 'tip',
          title: 'Thermometer-to-Binary Conversion in Flash ADCs',
          text: 'In a Flash ADC, as analog voltage rises, comparators turn ON from the bottom up like mercury in a thermometer (e.g. 0000111). A digital priority encoder detects the highest 1-transition and converts this thermometer code into a standard binary number.',
        },
      },
      {
        id: 'sec_nyquist_aliasing_dualslope',
        title: 'Module 3: Nyquist Sampling Theorem, Aliasing & Dual-Slope Integrating ADCs',
        subtitle: 'Anti-Aliasing Low-Pass Filters, 50/60 Hz Hum Rejection & Digital Multimeters',
        content: 'Harry Nyquist and Claude Shannon established that to reconstruct a continuous band-limited analog signal without distortion, the sampling rate f_s must be strictly greater than twice the highest frequency component present in the signal:\nf_s > 2 · f_{max} (Nyquist Criterion).\n\n• If high-frequency noise above f_s / 2 enters the ADC, it "folds back" into the lower frequency spectrum as false, distorted ghost frequencies (aliasing) that can NEVER be separated or removed digitally! Therefore, an analog Low-Pass Anti-Aliasing Filter is placed immediately before every ADC.\n\nDual-Slope Integrating ADC:\nUsed in precision Digital Multimeters (DMMs).\n• Phase 1: Integrates input voltage V_in for a fixed time T1.\n• Phase 2: Discharges the capacitor with reference voltage -V_ref until the output hits 0V (time T2).\n• Because V_in / V_ref = T2 / T1, conversion accuracy is independent of the integrator capacitor and resistor values (component tolerances cancel out!).\n• Setting integration time T1 to an exact multiple of 20 ms (50 Hz) or 16.6 ms (60 Hz) provides infinite theoretical rejection of electrical AC mains hum!',
        formula: 'f_s > 2 \\cdot f_{max}, \\quad V_{in} = -V_{ref} \\cdot \\frac{T_2}{T_1}, \\quad \\text{Mains Rejection } = \\infty \\text{ at } T_1 = k / f_{line}',
        keyPoints: [
          'Sampling rate must satisfy f_s > 2 · f_max to avoid irreversible aliasing distortion.',
          'Anti-aliasing analog low-pass filter is mandatory before ADC sampling.',
          'Dual-slope ADCs are slow but provide extreme precision and eliminate 50/60 Hz power-line hum.',
        ],
        callout: {
          type: 'warning',
          title: 'The Aliasing Strobe Effect in Motion',
          text: 'A classic visual example of aliasing is when helicopter blades or car wheels appear to spin backwards on video: the camera frame rate (sampling rate) is lower than twice the rotation speed, folding the high rotation frequency back into a false negative low frequency.',
        },
      },
    ],
    mathematicalExplanation: {
      equations: [
        'V_{out} = -V_{ref} \\sum_{i=1}^n \\frac{b_i}{2^i}',
        '\\text{Resolution (Step Size)} = \\frac{V_{FS}}{2^n - 1}',
        '\\text{Flash Comparators} = 2^n - 1',
        '\\text{SNR}_{ideal} = 6.02N + 1.76 \\text{ dB}',
      ],
    },
    solvedProblems: [
      {
        question: 'An 8-bit Flash ADC has a full-scale analog input range of 0 to 5.10 V. (a) How many comparators are required? (b) What is the step size / resolution?',
        solution: '(a) Comparators required = 2^n - 1 = 2^8 - 1 = 255 comparators.\n(b) Step size (1 LSB) = V_FS / 2^n = 5.10 V / 256 = 0.01992 V ≈ 19.92 mV.',
        explanation: 'Every 19.92 mV increase in input switches on the next higher comparator in the Flash array.',
      },
    ],
    applications: [
      'Digital audio interfaces (24-bit 192 kHz high-res DACs/ADCs).',
      'Medical MRI and CT scan imaging systems.',
      'Software-Defined Radio (SDR) and radar transceivers.',
    ],
    advantages: [
      'Enables computers to perceive and actuate the real continuous world.',
    ],
    limitations: [
      'Aliasing occurs if sampling frequency is less than twice the highest signal frequency (f_s < 2 * f_max, violating Nyquist).',
    ],
    commonMistakes: [
      'Calculating DAC step size using 2^n instead of (2^n - 1) for a DAC: with 2 bits (4 states: 00, 01, 10, 11), there are only 3 steps between zero and full scale.',
    ],
    examPoints: [
      'R-2R ladder requires only two resistor values: R and 2R.',
      'An n-bit Flash ADC requires 2^n - 1 comparators and converts in 1 clock cycle.',
      'An n-bit SAR ADC requires n clock cycles for conversion.',
    ],
    vivaQuestions: [
      {
        question: 'Why is an anti-aliasing low-pass analog filter placed immediately before an ADC?',
        answer: 'To attenuate all frequency components above the Nyquist cutoff frequency (f_s / 2). If frequencies above half the sample rate enter the ADC, they fold back into the audible/visible band as false low-frequency distortion artifacts (aliases) that can never be removed digitally.',
      },
    ],
    relatedTopicSlugs: ['digital-logic-families', 'intro-to-digital-electronics'],
  },
  {
    id: 't_logic_families',
    slug: 'digital-logic-families',
    unitId: 'logic-families',
    unitTitle: 'Digital Logic Families & ICs',
    unitNumber: 9,
    chapterNumber: 1,
    title: 'Digital Logic Families: TTL, CMOS & ECL Technologies',
    shortDescription: 'Transistor-Transistor Logic, Complementary MOS, Emitter-Coupled Logic, power-delay product, fan-out, and voltage compatibility.',
    estimatedMinutes: 20,
    difficulty: 'Intermediate',
    tags: ['TTL', 'CMOS', 'ECL', 'Fan-Out', 'Propagation Delay', 'Power Dissipation'],
    overview: 'Digital logic circuits can be constructed using various semiconductor manufacturing technologies, referred to as logic families. The most historically prominent families are TTL (Transistor-Transistor Logic, based on bipolar junction transistors), ECL (Emitter-Coupled Logic, for ultra-high-speed non-saturating switching), and CMOS (Complementary Metal-Oxide Semiconductor, based on complementary N-channel and P-channel MOSFETs). Today, CMOS powers over 99% of all integrated circuits.',
    learningObjectives: [
      'Compare TTL, CMOS, and ECL across speed, power, noise margin, and fan-out.',
      'Explain why CMOS consumes virtually zero static power and why dynamic power scales with frequency (P = C·V²·f).',
      'Understand the principles of non-saturating ECL logic for sub-nanosecond speeds.',
      'Calculate the Speed-Power Product (Figure of Merit) for logic families.',
    ],
    prerequisites: ['Basic transistor operation.'],
    beginnerExplanation: 'Different logic families are like different car engines: TTL is like a dependable diesel engine (tough, but drinks steady fuel). ECL is like a Formula 1 racing car: insanely fast, but burns enormous power and gets extremely hot. CMOS is like a modern electric hybrid: when the car is stopped at a red light, it uses ZERO battery! CMOS only uses electrical energy when its transistors are actively switching back and forth. Because modern laptops have billions of transistors that sit idle between keystrokes, CMOS makes battery-powered smartphones and laptops possible!',
    deepTechnicalExplanation: 'Comprehensive Comparison Metrics:\n1. TTL (7400 series): Bipolar BJTs in saturation/cutoff. Propagation delay ~10ns. Static power dissipation ~10mW per gate. Noise margin 0.4V. Fan-out typically 10.\n2. CMOS (4000 & 74HC/HCT/LVC): P-MOS and N-MOS complementary pairs. Static power dissipation is virtually zero (nano-watts) due to open circuit in steady state. Dynamic power dissipation: P_{dyn} = C_L * V_{DD}^2 * f. Noise margin is wide (typically 30% to 40% of VDD). Fan-out is extremely high (>50) at low frequencies, limited primarily by capacitive load at high frequencies.\n3. ECL (Emitter-Coupled Logic): Uses differential pairs of BJTs operating strictly in active linear mode (NEVER saturated). Because transistors never enter saturation, there is zero minority carrier storage delay, achieving sub-nanosecond switching (<0.5ns). However, it consumes high continuous static power (~25mW per gate) and uses negative supply voltages (-5.2V) to minimize noise injection.',
    technicalDefinition: 'A category of integrated circuit fabrication processes defined by physical semiconductor device topology, logic thresholds, and switching dynamics.',
    workingPrinciple: 'In CMOS: A logic 1 turns ON NMOS pull-down and turns OFF PMOS pull-up. In steady state, there is never a direct DC conduction path from VDD to ground.',
    diagrams: [
      {
        id: 'diag_cmos_vtc',
        title: 'CMOS Inverter Transistor Topology & Voltage Transfer Characteristic (VTC)',
        type: 'schematic',
        caption: 'Complementary PMOS pull-up and NMOS pull-down switching network with rail-to-rail output swing and zero static DC power.',
        svgType: 'CMOS_INVERTER_AND_VTC',
      },
      {
        id: 'diag_ttl_7400',
        title: 'Standard TTL 7400 NAND Gate with Multi-Emitter BJT & Totem-Pole Stage',
        type: 'schematic',
        caption: 'Bipolar transistor switching circuitry showing multi-emitter Q1 input, Q2 phase splitter, and Q3-Q4 totem-pole active driver.',
        svgType: 'TTL_NAND_7400_INTERNAL',
      },
    ],
    lectureSections: [
      {
        id: 'sec_cmos_physics_power_law',
        title: 'Module 1: CMOS Switching Physics & Rail-to-Rail Transistor Mechanics',
        subtitle: 'Complementary PMOS/NMOS Pairs, Zero DC Idle Power & The Quadratic Power Law',
        content: 'Over 99% of modern computer chips are fabricated using Complementary Metal-Oxide Semiconductor (CMOS) technology.\n\nA CMOS gate consists of two complementary halves:\n1. Pull-Up Network (PUN): P-channel MOSFETs connecting output to V_DD. PMOS conducts when gate voltage is LOW (0V).\n2. Pull-Down Network (PDN): N-channel MOSFETs connecting output to GND. NMOS conducts when gate voltage is HIGH (V_DD).\n\nZero DC Static Dissipation:\nBecause the inputs drive both PMOS and NMOS simultaneously, when the input is 1, PDN is ON and PUN is OFF; when the input is 0, PUN is ON and PDN is OFF. In steady state, there is NEVER a direct DC conduction path from V_DD to Ground! Current flows only in the pico-ampere leakage range.\n\nDynamic Power Dissipation:\nEnergy is consumed only when charging and discharging parasitic gate capacitances during switching transitions:\nP_{dynamic} = α · C_L · V_{DD}^2 · f_{clock}.\nBecause dynamic power scales quadratically with supply voltage (V_DD^2), reducing V_DD from 5V down to 0.8V in modern processors reduces dynamic power by over 97%!',
        formula: 'P_{dynamic} = \\alpha \\cdot C_L \\cdot V_{DD}^2 \\cdot f_{clk}, \\quad P_{static} = I_{leakage} \\cdot V_{DD} \\approx 0',
        keyPoints: [
          'CMOS gates consume virtually zero static power because PMOS and NMOS are never simultaneously ON in steady state.',
          'Outputs swing rail-to-rail: V_OH ≈ V_DD and V_OL ≈ GND.',
          'Dynamic power scales quadratically with supply voltage: P = C · V^2 · f.',
          'Modern FinFET transistors combat quantum tunneling leakage at sub-3nm nodes.',
        ],
        callout: {
          type: 'theorem',
          title: 'The CMOS Rail-to-Rail Swing Property',
          text: 'Unlike bipolar TTL transistors which lose ~0.7V across diode junctions, MOSFET channels in steady state carry zero current, so there is zero IR voltage drop across the switch. Thus, V_OH reaches exactly V_DD and V_OL reaches exactly GND.',
        },
      },
      {
        id: 'sec_ttl_totem_pole_physics',
        title: 'Module 2: TTL Bipolar Architectures (7400 Series) & Totem-Pole Output Stages',
        subtitle: 'Multi-Emitter Input BJTs, Phase Splitters & Active Pull-Up Switching',
        content: 'Transistor-Transistor Logic (TTL), pioneered by Texas Instruments in the 1960s with the 7400 series, revolutionized computing with bipolar junction transistors (BJTs).\n\nInternal 3-Stage Operation of a Standard TTL NAND Gate:\n1. Multi-Emitter Input Transistor (Q1): Acts as an AND gating junction. If ANY input is held LOW (0V), current from V_CC through resistor R1 flows out the emitter, robbing base drive from the phase splitter Q2.\n2. Phase Splitter Transistor (Q2): Produces two complementary out-of-phase voltages at its collector and emitter.\n3. Totem-Pole Output Driver (Q3 and Q4):\n   • Pull-Up Transistor (Q4): Connects output toward V_CC through resistor R4 and diode D1.\n   • Pull-Down Transistor (Q3): Connects output directly to Ground.\n   The totem-pole stage provides active drive in BOTH directions (sinking and sourcing current), charging parasitic capacitances much faster than passive pull-up resistors.\n\nTTL Voltage Thresholds & Noise Margin:\n• V_OH = 2.4V, V_OL = 0.4V, V_IH = 2.0V, V_IL = 0.8V.\n• High Noise Margin: NM_H = 2.4V - 2.0V = 0.4V.\n• Low Noise Margin: NM_L = 0.8V - 0.4V = 0.4V.',
        formula: 'NM_H = V_{OH} - V_{IH} = 0.4V, \\quad NM_L = V_{IL} - V_{OL} = 0.4V, \\quad \\text{Fan-Out} = \\frac{I_{OL}}{I_{IL}} = 10',
        keyPoints: [
          'Standard TTL 7400 uses multi-emitter bipolar transistors for input gating.',
          'Totem-pole output actively drives both HIGH and LOW transitions.',
          'Standard TTL noise margin is 0.4V for both states.',
          'Floating TTL inputs naturally drift HIGH because base current pulls the emitter up.',
        ],
        callout: {
          type: 'warning',
          title: 'Floating TTL Inputs vs CMOS Inputs',
          text: 'An unconnected TTL input floats to a weak logic HIGH because internal resistors pull the base up. In contrast, an unconnected CMOS input acts as an antenna that floats to the mid-rail threshold, turning both PMOS and NMOS ON simultaneously and burning out the chip!',
        },
      },
      {
        id: 'sec_ecl_speed_power_product',
        title: 'Module 3: ECL Non-Saturating Logic, Figure of Merit & Inter-Family Interfacing',
        subtitle: 'Current-Steering Differential Amplifiers, Speed-Power Product & Level Shifting',
        content: 'Emitter-Coupled Logic (ECL) is the fastest of all silicon bipolar logic families, achieving sub-nanosecond propagation delays (<200 picoseconds).\n\nThe Secret to ECL Speed: Non-Saturating Operation\nIn standard TTL, transistors are driven deep into saturation. When switching OFF, minority carriers trapped in the base region take several nanoseconds to recombine (storage time delay t_s). ECL eliminates saturation entirely! Transistors operate strictly as a current-steering differential amplifier pair in the active linear region. Current is steered between two paths without ever saturating either transistor, completely eradicating storage time delay!\n• Drawback: High continuous static power consumption (~25-50 mW per gate) and uses negative supply voltages (-5.2V) to shield against ground noise.\n\nSpeed-Power Product (SPP) / Figure of Merit:\nTo compare the overall engineering efficiency of logic families, engineers compute the Speed-Power Product:\nSPP = t_pd × P_diss (measured in Picojoules, pJ).\nA lower SPP signifies a technologically superior, more power-efficient logic family!',
        formula: '\\text{SPP} = t_{pd} \\times P_{diss} \\quad (\\text{pJ}), \\quad \\text{Storage Time } t_s = 0 \\quad (\\text{Non-Saturated BJT})',
        keyPoints: [
          'ECL is the fastest silicon bipolar family because transistors never enter saturation (zero storage delay).',
          'ECL consumes high static power and uses negative power supply voltages (-5.2V).',
          'Speed-Power Product (SPP = t_pd · P_diss) is the universal figure of merit for logic families.',
          'Interfacing TTL and CMOS requires voltage level shifters (e.g. 74HCT series accepts TTL levels at CMOS voltage).',
        ],
        callout: {
          type: 'tip',
          title: 'The 74HCT Compatibility Bridge',
          text: 'When upgrading legacy TTL circuit boards with modern CMOS chips, standard 74HC chips fail because CMOS V_IH (3.5V) exceeds TTL V_OH (2.7V). The 74HCT series is specifically engineered with modified input thresholds to accept TTL voltage levels while running on CMOS technology!',
        },
      },
    ],
    truthTable: {
      headers: ['Parameter', 'Standard TTL', 'High-Speed CMOS (74HC)', 'ECL'],
      rows: [
        ['Device Technology', 'BJT (Saturated)', 'MOSFET (CMOS)', 'BJT (Non-Saturated)'],
        ['Propagation Delay', '10 ns', '8 - 12 ns', '< 1 ns (Fastest)'],
        ['Power (Static)', '10 mW', '~nW (Near Zero)', '25 - 50 mW (Highest)'],
        ['Noise Margin', '0.4 V (Low)', '1.5 V at 5V (Excellent)', '0.2 V (Lowest)'],
        ['Fan-Out', '10', '> 50 (at DC)', '25'],
      ],
      notes: 'CMOS is the universal industry standard for LSI, VLSI, and ULSI microprocessor systems.',
    },
    mathematicalExplanation: {
      equations: [
        'P_{dyn} = C_L \\cdot V_{DD}^2 \\cdot f_{clk}',
        '\\text{Speed-Power Product (SPP)} = t_{pd} \\times P_{diss} \\quad (\\text{Joules or pJ})',
        '\\text{Fan-Out} = \\min\\left(\\frac{I_{OH}}{I_{IH}}, \\frac{I_{OL}}{I_{IL}}\\right)',
      ],
    },
    solvedProblems: [
      {
        question: 'A CMOS gate operating at 3.3 V drives a total capacitive load of 25 pF at a clock frequency of 100 MHz. Calculate the dynamic power dissipation.',
        solution: 'P_dyn = C_L * V_DD^2 * f = (25 × 10^-12 F) * (3.3 V)^2 * (100 × 10^6 Hz) = 25e-12 * 10.89 * 1e8 = 0.0272 Watts = 27.2 mW.',
        explanation: 'Notice that dynamic power scales with the SQUARE of the supply voltage; this is why modern CPUs reduced voltage from 5V down to 1.0V and lower.',
      },
    ],
    applications: [
      'CMOS: All modern smartphones, CPUs, GPUs, FPGAs, and SSD controllers.',
      'ECL: Ultra-fast optical fiber transceivers and high-energy physics particle detectors.',
      'TTL: Legacy aerospace and military avionics hardware.',
    ],
    advantages: [
      'CMOS offers immense integration density (tens of billions of transistors on a single die) and minimal thermal idle dissipation.',
    ],
    limitations: [
      'CMOS devices are vulnerable to electrostatic discharge (ESD) and can undergo destructive latch-up if input voltages exceed supply rails.',
    ],
    commonMistakes: [
      'Assuming CMOS always uses less power than TTL: at extremely high switching frequencies (hundreds of MHz), CMOS dynamic power P = C·V²·f can exceed TTL power!',
    ],
    examPoints: [
      'ECL is the fastest logic family because its transistors operate in the active non-saturated region.',
      'CMOS has the highest fan-out and lowest static power dissipation.',
    ],
    vivaQuestions: [
      {
        question: 'What is CMOS latch-up, and how do modern IC layouts prevent it?',
        answer: 'Latch-up is the accidental triggering of a parasitic SCR (silicon-controlled rectifier formed by p-n-p-n junctions between adjacent PMOS and NMOS wells), creating a low-impedance short circuit between VDD and GND that burns out the chip. It is prevented by using guard rings, retrograde wells, and strict layout spacing rules.',
      },
    ],
    relatedTopicSlugs: ['intro-to-digital-electronics', 'dac-and-adc-converters'],
  },
];
