import { TopicItem } from '../../types';

export const REGISTERS_AND_COUNTERS_TOPICS: TopicItem[] = [
  {
    id: 't_shift_registers',
    slug: 'shift-registers',
    unitId: 'registers',
    unitTitle: 'Shift Registers',
    unitNumber: 6,
    chapterNumber: 1,
    title: 'Shift Registers: SISO, SIPO, PISO, PIPO & Universal 74194',
    shortDescription: 'Serial vs parallel data movement, clock cycle latencies, bi-directional shifting, and 4-bit Universal Shift Register architecture.',
    estimatedMinutes: 25,
    difficulty: 'Intermediate',
    tags: ['Shift Register', 'SISO', 'SIPO', 'PISO', 'PIPO', '74194'],
    overview: 'A register is a group of flip-flops used to store multi-bit binary words. When the flip-flops are interconnected such that binary data shifts from one stage to the next on every clock pulse, it forms a Shift Register. Depending on how data enters and exits the register, shift registers are classified into four fundamental configurations: Serial-In Serial-Out (SISO), Serial-In Parallel-Out (SIPO), Parallel-In Serial-Out (PISO), and Parallel-In Parallel-Out (PIPO).',
    learningObjectives: [
      'Compare the 4 shift register architectures regarding clock cycle latency and pin count.',
      'Explain the working of SIPO registers in deserializing serial communications (UART/SPI).',
      'Understand the control modes (Hold, Shift Right, Shift Left, Parallel Load) of the 74194 Universal Shift Register.',
    ],
    prerequisites: ['D flip-flops and timing diagrams.'],
    beginnerExplanation: 'Think of a bucket brigade fighting a fire: people stand in a line passing water buckets hand-to-hand with every whistle blow (clock tick). That is a Serial-In Serial-Out (SISO) register: bits enter one by one, shift through the line, and come out the other end. If people can dump their buckets simultaneously onto the ground, that is Serial-In Parallel-Out (SIPO)—like receiving an 8-bit letter one letter per second, and then reading the entire 8-letter word all at once! A Universal Shift Register can pass buckets to the right, pass to the left, fill all buckets at once, or hold still.',
    deepTechnicalExplanation: 'Shift Register Latencies for n bits:\n1. SISO: Requires n clock pulses to load data serially, and n clock pulses to retrieve it (Total: 2n clock pulses). Used for serial delay lines.\n2. SIPO: Requires n clock pulses to load data serially; all n bits are available simultaneously in parallel immediately on the nth clock edge. Fundamental to UART serial receivers and SPI peripherals.\n3. PISO: Loads all n bits in 1 clock pulse using parallel load multiplexers, then requires (n - 1) clock pulses to shift data out serially. Used in serial transmitters.\n4. PIPO: Loads in 1 clock pulse, reads in 1 clock pulse. Maximum speed, standard buffer register in ALUs.\n\nUniversal Shift Register (IC 74194):\nUses 4 D flip-flops with 4-to-1 multiplexers on each D input controlled by mode select lines S1, S0:\n- S1=0, S0=0: No Change (Hold, outputs recirculated)\n- S1=0, S0=1: Shift Right (Q_{i+1} gets Q_i, MSB gets serial input)\n- S1=1, S0=0: Shift Left (Q_{i-1} gets Q_i, LSB gets serial input)\n- S1=1, S0=1: Parallel Load (Direct input from external data lines D0-D3).',
    technicalDefinition: 'A cascaded synchronous linear sequence of storage flip-flops where each bit is transferred to its neighbor on successive active clock transitions.',
    workingPrinciple: 'D_i = Q_{i-1} on the active clock edge. For bidirectional shifting, a 2:1 or 4:1 multiplexer selects whether D_i connects to Q_{i-1} (right shift) or Q_{i+1} (left shift).',
    diagrams: [
      {
        id: 'diag_shift_modes',
        title: 'Shift Register Configurations (SISO, SIPO, PISO, PIPO) & 74194 Modes',
        type: 'schematic',
        caption: 'Architectural comparison of serial vs parallel data movement latencies and 74HC194 universal shift register control modes.',
        svgType: 'SHIFT_REGISTERS_4MODES',
      },
    ],
    lectureSections: [
      {
        id: 'sec_shift_topologies_siso_pipo',
        title: 'Module 1: The 4 Fundamental Shift Topologies (SISO, SIPO, PISO, PIPO)',
        subtitle: 'Data Movement Latencies, Pin-Count Trade-offs & Bus Serialization',
        content: 'A register is a collection of flip-flops storing multi-bit binary words. When cascaded linearly so that each flip-flop transfers its contents to its neighbor on successive clock pulses, it forms a Shift Register.\n\nThe four operational classes represent distinct latency vs pin-count engineering trade-offs:\n1. Serial-In Serial-Out (SISO): 1 input wire, 1 output wire. Requires n clock cycles to load data serially, and n clock cycles to read it out (Total: 2n clock cycles). Operates primarily as an exact hardware digital delay line.\n2. Serial-In Parallel-Out (SIPO): 1 input wire, n output wires. Requires n clock cycles to load serially; upon the n-th clock edge, all n bits appear simultaneously in parallel on the output pins. SIPO is the core deserializer in UART receivers, SPI peripherals, and high-density LED matrix drivers (such as the 74HC595).\n3. Parallel-In Serial-Out (PISO): n input wires, 1 output wire. Uses internal 2:1 multiplexers to load all n bits in a single clock cycle, then shifts the word out serially over (n - 1) clock cycles. Used in UART transmitters and video serializers.\n4. Parallel-In Parallel-Out (PIPO): n input wires, n output wires. Loads in 1 clock cycle and reads out immediately in 1 clock cycle. Maximum throughput; standard scratchpad registers inside CPU ALUs.',
        formula: '\\text{SISO Latency} = 2n \\, T_{clk}, \\quad \\text{SIPO Latency} = n \\, T_{clk}, \\quad \\text{PISO Shift Time} = (n - 1) \\, T_{clk}, \\quad \\text{PIPO Latency} = 1 \\, T_{clk}',
        keyPoints: [
          'SIPO converts high-latency serial bit streams into wide parallel data words.',
          'PISO compresses wide parallel words onto single-wire serial transmission channels.',
          'PIPO provides zero-latency parallel buffering in CPU register files.',
        ],
        callout: {
          type: 'theorem',
          title: 'The Shift-Multiply Invariant',
          text: 'Shifting an unsigned binary word left by 1 bit position is mathematically identical to multiplying the integer by 2 (Q << 1 = 2Q). Shifting right by 1 bit position is mathematically identical to integer division by 2 (Q >> 1 = ⌊Q / 2⌋).',
        },
      },
      {
        id: 'sec_universal_shift_74194',
        title: 'Module 2: The Universal Shift Register Architecture (IC 74194)',
        subtitle: '4-to-1 Multiplexer Steering, Bidirectional Movement & Parallel Loading',
        content: 'The 4-bit Bidirectional Universal Shift Register (such as the standard TTL 74194 / CMOS 74HC194) integrates all four data movement modes into a single monolithic silicon chip.\n\nArchitecture:\nEach of the 4 D flip-flops has its D input driven by a 4-to-1 multiplexer controlled by Mode Select lines S1 and S0:\n• Mode 00 (Hold / Inhibit): The MUX recirculates the flip-flop\'s own output Q_i back to its D_i input. The stored state remains unchanged regardless of clock pulses.\n• Mode 01 (Shift Right): The MUX routes the output of the preceding stage Q_{i-1} to D_i, while the first stage D0 receives the Serial Data Right (SR) input pin.\n• Mode 10 (Shift Left): The MUX routes the output of the succeeding stage Q_{i+1} to D_i, while the last stage D3 receives the Serial Data Left (SL) input pin.\n• Mode 11 (Parallel Load): The MUX disconnects internal shift paths and routes external parallel data pins (A, B, C, D) directly to inputs D0-D3, loading the entire 4-bit word in a single synchronous clock transition.',
        formula: 'D_i = S_1\' S_0\' Q_i + S_1\' S_0 Q_{i-1} + S_1 S_0\' Q_{i+1} + S_1 S_0 I_i',
        keyPoints: [
          'Mode 00 = Hold, Mode 01 = Shift Right, Mode 10 = Shift Left, Mode 11 = Parallel Load.',
          'Asynchronous Master Reset (/MR) pin clears all 4 flip-flops immediately to 0 regardless of clock.',
          'Multiple 74194 ICs can be cascaded to construct 8-bit, 16-bit, or 64-bit universal shift registers.',
        ],
        callout: {
          type: 'tip',
          title: 'Cascading Bidirectional Shift Registers',
          text: 'To cascade two 4-bit 74194s into an 8-bit bidirectional register: connect Q3 of the low chip to the SR input of the high chip (for right shifts), and connect Q4 of the high chip to the SL input of the low chip (for left shifts).',
        },
      },
      {
        id: 'sec_lfsr_prng',
        title: 'Module 3: Linear Feedback Shift Registers (LFSR) & Pseudo-Random Number Generation',
        subtitle: 'Characteristic Polynomials, Galois vs Fibonacci Fields & Cryptography',
        content: 'A Linear Feedback Shift Register (LFSR) is a shift register whose input bit is a linear function (typically XOR or XNOR) of two or more of its taps.\n\n• Maximum-Length Sequence (m-sequence): If the feedback taps correspond to a primitive polynomial of degree n over the Galois Field GF(2), the LFSR will cycle through exactly 2^n - 1 non-zero states before repeating!\n• The all-zeros state (00...0) is an illegal lockup state in XOR LFSRs because XOR(0, 0) = 0.\n\nLFSR applications span the entire computing landscape:\n1. Built-In Self-Test (BIST): Generates deterministic pseudo-random test vectors to test billions of transistors inside ASICs without bulky external automatic test equipment (ATE).\n2. Cyclic Redundancy Check (CRC): Computes polynomial check sums for Ethernet, USB, and SATA data packets.\n3. Direct-Sequence Spread Spectrum (DSSS): Generates Gold codes and PN-sequences in GPS satellite navigation and CDMA mobile networks.',
        formula: 'P(x) = x^n + \\sum_{i=1}^{n-1} c_i x^i + 1, \\quad \\text{Period } N_{max} = 2^n - 1',
        keyPoints: [
          'An n-bit LFSR generates a pseudo-random sequence of maximum period 2^n - 1.',
          'The all-zeros state 000...0 must be prevented in XOR LFSRs to avoid infinite lockup.',
          'Fibonacci LFSRs compute XOR feedback in the input path; Galois LFSRs apply XOR feedback in parallel between stages for higher clock speeds.',
        ],
        callout: {
          type: 'warning',
          title: 'LFSRs are Not Cryptographically Secure',
          text: 'Although LFSR sequences pass statistical randomness tests, the Berlekamp-Massey algorithm can deduce the entire feedback polynomial and seed state from only 2n consecutive output bits! Modern cryptography uses ChaCha20 or AES-CTR instead of pure LFSRs.',
        },
      },
    ],
    mathematicalExplanation: {
      equations: [
        '\\text{Bit Shift Right: } Q_i(t+1) = Q_{i-1}(t)',
        '\\text{Bit Shift Left: } Q_i(t+1) = Q_{i+1}(t)',
        '\\text{Clock Latency (SIPO)} = n \\text{ cycles}',
      ],
    },
    solvedProblems: [
      {
        question: 'An 8-bit serial bit stream 10110010 is fed into an 8-bit SIPO shift register clocked at 1 MHz. How many microseconds are required before the full byte is available on the parallel output pins?',
        solution: 'An 8-bit SIPO requires exactly 8 clock cycles to shift in 8 bits. Clock period T = 1 / 1 MHz = 1 microsecond. Total time = 8 × 1 µs = 8 microseconds.',
        explanation: 'On the 8th rising clock edge, all 8 bits are simultaneously settled and valid on outputs Q0 through Q7.',
      },
    ],
    applications: [
      'Universal Asynchronous Receiver-Transmitter (UART) and Serial Peripheral Interface (SPI).',
      'Driving 7-segment and matrix LED displays using minimal MCU GPIO pins (e.g. 74HC595 SIPO register).',
      'Hardware arithmetic: shifting left by 1 bit multiplies by 2; shifting right divides by 2.',
    ],
    advantages: [
      'Converts wide, expensive multi-wire parallel buses into single-wire serial transmission.',
    ],
    limitations: [
      'Serial transmission is inherently slower by a factor of n compared to parallel transfers.',
    ],
    commonMistakes: [
      'Assuming PIPO registers shift data: PIPO registers are pure parallel storage buffers; they do not shift data between adjacent stages unless configured as a universal shift register.',
    ],
    examPoints: [
      '74194 mode control: 00 = Hold, 01 = Shift Right, 10 = Shift Left, 11 = Parallel Load.',
      'SIPO takes n clock cycles to load; PISO takes (n-1) cycles to shift out.',
    ],
    vivaQuestions: [
      {
        question: 'How does an arithmetic right shift differ from a logical right shift in a register?',
        answer: 'A logical right shift always fills the vacated MSB with 0 (used for unsigned numbers). An arithmetic right shift copies the original sign bit (MSB) into the vacated position (sign extension), preserving negative values in 2\'s complement arithmetic division by 2.',
      },
    ],
    relatedTopicSlugs: ['d-and-t-flip-flops', 'counter-circuits'],
  },
  {
    id: 't_counters',
    slug: 'counter-circuits',
    unitId: 'counters',
    unitTitle: 'Counters & State Machines',
    unitNumber: 7,
    chapterNumber: 1,
    title: 'Digital Counters: Asynchronous Ripple, Synchronous & MOD-N Design',
    shortDescription: 'Ripple counters, cumulative glitch delays, synchronous up/down counters, state transition diagrams, excitation K-maps, Ring and Johnson counters.',
    estimatedMinutes: 30,
    difficulty: 'Intermediate',
    tags: ['Ripple Counter', 'Synchronous Counter', 'MOD Counter', 'Johnson Counter', 'State Diagram'],
    overview: 'Counters are sequential circuits that cycle through a predetermined sequence of binary states upon application of clock pulses. Counters are classified by clocking methodology into Asynchronous (Ripple) Counters—where the output of one flip-flop clocks the next—and Synchronous Counters—where all flip-flops share a common clock. The number of discrete states a counter visits before repeating is called its Modulus (MOD).',
    learningObjectives: [
      'Contrast asynchronous ripple counters with synchronous parallel-clocked counters.',
      'Identify cumulative propagation delay glitches in ripple counters.',
      'Design arbitrary MOD-N synchronous counters using JK or D flip-flops, excitation tables, and K-maps.',
      'Explain Ring Counters and Johnson (Twisted-Ring) Counters.',
    ],
    prerequisites: ['JK and T flip-flops, excitation tables, and K-maps.'],
    beginnerExplanation: 'Think of an asynchronous ripple counter like falling dominoes: the clock knocks over the first flip-flop, the first knocks over the second, the second knocks over the third! Because each flip-flop waits for the one before it, the ripple takes time to travel down the line, which can cause momentary fake numbers ("glitches"). In a synchronous counter, a conductor blows a whistle and ALL flip-flops march forward simultaneously in perfect lockstep! No waiting, no domino lag, and no glitches.',
    deepTechnicalExplanation: 'Asynchronous (Ripple) Counter Limitations:\nIn an n-bit ripple counter, each flip-flop has clock-to-Q delay t_pd. The total settling delay is n * t_pd. For the counter to operate reliably, the clock period must satisfy: T_{clk} >= n * t_pd, or f_{max} <= 1 / (n * t_pd). Furthermore, during intermediate state transitions (e.g. 011 -> 100), the counter momentarily passes through spurious transient states (011 -> 010 -> 000 -> 100) lasting a few nanoseconds, triggering false decoding spikes in output decoders.\n\nSynchronous Counter Design Procedure:\n1. Determine required flip-flops: 2^{k-1} < N <= 2^k.\n2. Draw State Diagram and State Transition Table (Present State -> Next State).\n3. Use Flip-Flop Excitation Tables (e.g. JK: 0->0: 0,X; 0->1: 1,X; 1->0: X,1; 1->1: X,0).\n4. Plot K-maps for each J and K input literal.\n5. Derive minimal SOP expressions and synthesize the logic network.\n\nRing vs Johnson Counters:\n- Ring Counter: Straight circular shift of a single 1 (1000 -> 0100 -> 0010 -> 0001). For n flip-flops, MOD = n (only 4 states for 4 bits; wasteful).\n- Johnson (Twisted-Ring) Counter: Complementary feedback (Q\' of last stage feeds D of first). State sequence: 0000 -> 1000 -> 1100 -> 1110 -> 1111 -> 0111 -> 0011 -> 0001 -> 0000. For n flip-flops, MOD = 2n (8 states for 4 bits).',
    technicalDefinition: 'A finite state machine (FSM) whose state transitions form a deterministic closed cyclic directed graph with a state cycle length of MOD N.',
    workingPrinciple: 'In synchronous binary up-counters: Flip-flop k toggles if and only if ALL preceding less-significant flip-flops are currently 1 (T_k = Q_0 · Q_1 · ... · Q_{k-1}).',
    diagrams: [
      {
        id: 'diag_ripple_waveforms',
        title: '4-Bit Asynchronous Ripple Counter: Cumulative Delay & Glitch Spikes',
        type: 'waveform',
        caption: 'Timing waveforms showing sequential division by 2, 4, 8, 16 and cumulative ripple propagation delay N × t_pd.',
        svgType: 'RIPPLE_COUNTER_4BIT_WAVEFORMS',
      },
      {
        id: 'diag_sync_counter',
        title: '4-Bit Synchronous Up Counter with Parallel Lookahead Carry Logic',
        type: 'schematic',
        caption: 'Parallel clocked design eliminating cumulative delay using common clock and high-speed T-gate carry chain.',
        svgType: 'SYNCHRONOUS_UP_DOWN_COUNTER',
      },
    ],
    lectureSections: [
      {
        id: 'sec_ripple_counters_glitches',
        title: 'Module 1: Asynchronous (Ripple) Counters & Cumulative Glitch Latencies',
        subtitle: 'Cascaded Clocking, MOD-2^n Division & Transient Output Hazards',
        content: 'In an Asynchronous (Ripple) Counter, the external clock signal is applied ONLY to the least significant bit (LSB) flip-flop. Every subsequent flip-flop is clocked by the output (Q or /Q) of the preceding stage!\n\nBecause each flip-flop is configured in toggle mode (T=1 or J=K=1), each stage divides the frequency of its clock input by 2. Thus, an n-bit ripple counter naturally counts from 0 to 2^n - 1.\n\nThe Fatal Ripple Defect: Cumulative Propagation Delay\nEach flip-flop introduces a finite clock-to-Q delay t_pd. The carry ripple must sequentially propagate down the entire chain. For n stages:\nT_{total} = n · t_pd.\nFor reliable operation, the clock period must satisfy T_{clk} ≥ n · t_pd, which severely caps maximum clock frequency: f_{max} ≤ 1 / (n · t_pd).\n\nFurthermore, during transitions involving multiple bit flips (e.g. 0111 -> 1000), intermediate transient states (0111 -> 0110 -> 0100 -> 0000 -> 1000) occur for several nanoseconds. Connecting an external decoder to these ripple lines produces spurious decoding glitches that can falsely trigger downstream logic!',
        formula: 'f_{max,ripple} \\le \\frac{1}{n \\cdot t_{pd}}, \\quad T_{settle} = n \\cdot t_{pd}',
        keyPoints: [
          'Ripple counters apply clock exclusively to stage 0; stage i+1 is clocked by stage i.',
          'Total propagation delay scales linearly with bit width: n · t_pd.',
          'Transient decoding glitches occur during multi-bit transitions, making ripple counters unsuitable for glitch-sensitive systems.',
        ],
        callout: {
          type: 'warning',
          title: 'The Asynchronous Reset Glitch Trap',
          text: 'To make a MOD-10 ripple counter, beginner students often connect Q3 and Q1 (count 10 = 1010) into a NAND gate to trigger the asynchronous clear (/CLR). However, state 10 exists for only 5-10 ns before clearing, creating a narrow voltage glitch spike that can fail to reset some flip-flops due to threshold variation!',
        },
      },
      {
        id: 'sec_sync_counters_carry_chains',
        title: 'Module 2: Synchronous Binary Counters & Lookahead Carry Networks',
        subtitle: 'Parallel Clocking, Excitation Equations & Constant-Delay Scaling',
        content: 'Synchronous Counters eliminate cumulative ripple delays and output glitches by connecting the system clock in parallel to EVERY flip-flop simultaneously! All stages update on the exact same clock edge in perfect lockstep.\n\nT-Flip-Flop Toggle Conditions:\nIn a binary up-counter (0000 -> 0001 -> 0010 -> 0011 -> 0100 ...), a bit toggles IF AND ONLY IF all lower-order bits are currently 1:\n• T0 = 1 (toggles on every single clock cycle)\n• T1 = Q0 (toggles whenever Q0 is 1)\n• T2 = Q0 · Q1 (toggles whenever both Q0 and Q1 are 1)\n• T3 = Q0 · Q1 · Q2 (toggles whenever Q0, Q1, and Q2 are all 1)\n• General Stage k: T_k = Q0 · Q1 · ... · Q_{k-1}\n\nBecause all flip-flops toggle at the exact same instant, the output settling time is simply the single-stage clock-to-Q delay t_cq!\nThe maximum clock frequency is constrained only by the single flip-flop delay plus the carry gating logic:\nf_{max,sync} = 1 / (t_{cq} + t_{comb} + t_{su}), independent of counter width!',
        formula: 'T_k = \\prod_{j=0}^{k-1} Q_j, \\quad f_{max,sync} = \\frac{1}{t_{cq} + t_{AND} + t_{setup}}',
        keyPoints: [
          'All flip-flops share a single master clock, updating simultaneously with zero cumulative ripple.',
          'Bit k toggles only when all preceding bits Q0..Q_{k-1} are 1.',
          'Synchronous counters completely eliminate intermediate transient decoding spikes.',
          'Standard synchronous counter ICs include the 74HC161 (binary) and 74HC160 (decade).',
        ],
        callout: {
          type: 'theorem',
          title: 'The Glitch-Free Synchronous Guarantee',
          text: 'Because state transitions occur simultaneously across all bits within a picosecond of the clock edge, output decoders sample stable states, guaranteeing 100% glitch-free output operation.',
        },
      },
      {
        id: 'sec_ring_johnson_modn',
        title: 'Module 3: Ring Counters, Johnson (Twisted-Ring) Counters & MOD-N Synthesis',
        subtitle: 'Shift-Based State Machines, Decoding Simplicity & State Lockout Protection',
        content: 'Shift registers can be configured into specialized cyclic counters by connecting the output of the final stage back to the serial input of the first stage:\n\n1. Ring Counter: Straight feedback (Q of last stage connects to D of first stage). An initial "1" is preloaded and circulates continuously: 1000 -> 0100 -> 0010 -> 0001 -> 1000.\n   • Modulus: MOD = n (an n-bit ring counter has only n states).\n   • Major advantage: Zero decoding logic required! Each state is decoded directly on its own flip-flop output wire.\n\n2. Johnson (Twisted-Ring) Counter: Complementary feedback (Q\' of last stage connects to D of first stage). State sequence: 0000 -> 1000 -> 1100 -> 1110 -> 1111 -> 0111 -> 0011 -> 0001 -> 0000.\n   • Modulus: MOD = 2n (an n-bit Johnson counter provides 2n distinct states, twice that of a ring counter!).\n   • Decoding advantage: Any state can be decoded using a simple 2-input AND gate.\n\n3. Arbitrary MOD-N Counter Synthesis:\nTo design an arbitrary sequence (e.g. MOD-5, MOD-12):\nStep 1: Determine flip-flops needed: 2^{k-1} < N ≤ 2^k.\nStep 2: Construct Present-State to Next-State transition table.\nStep 3: Apply flip-flop excitation tables (JK or D).\nStep 4: Minimize excitation equations using K-maps.\nStep 5: Verify self-starting behavior to prevent infinite lockup in unused states!',
        formula: '\\text{MOD}_{Ring} = n, \\quad \\text{MOD}_{Johnson} = 2n, \\quad \\text{Johnson Decode: } S_k = Q_i \\cdot \\overline{Q_j}',
        keyPoints: [
          'Ring counter cycles n states; Johnson counter cycles 2n states.',
          'Johnson counter requires only 2-input AND gates for state decoding, regardless of counter length.',
          'Self-starting design ensures unused states automatically converge back into the valid counting cycle upon power-up.',
        ],
        callout: {
          type: 'tip',
          title: 'The Self-Starting Johnson Counter Logic',
          text: 'In an unhardened 4-bit Johnson counter, there are 16 - 8 = 8 unused states. If electrical noise drops the machine into state 0101, it cycles through the 8 illegal states in an infinite lockup loop! Connecting D0 = Q3\' · (Q1\' + Q2) forces any illegal state back into the legal sequence within 2 clock cycles.',
        },
      },
    ],
    mathematicalExplanation: {
      equations: [
        '2^{k-1} < \\text{MOD } N \\le 2^k',
        '\\text{Ripple } f_{max} = \\frac{1}{n \\cdot t_{pd}}',
        '\\text{Synchronous } f_{max} = \\frac{1}{t_{pd} + t_{comb} + t_{setup}}',
        '\\text{MOD(Ring)} = n, \\quad \\text{MOD(Johnson)} = 2n',
      ],
    },
    solvedProblems: [
      {
        question: 'Design a MOD-6 synchronous up-counter using T flip-flops counting 0 -> 1 -> 2 -> 3 -> 4 -> 5 -> 0.',
        solution: 'For MOD-6, 2^2 < 6 <= 2^3, so 3 flip-flops (Q2, Q1, Q0) are required. States 6 and 7 are unused (Don\'t Cares). Plotting K-maps for T2, T1, T0:\n- T0: Toggles on states 0, 1, 2, 3, 4; resets on 5 -> T0 = 1 (except state 5 resets to 0, so T0 = (Q2·Q0)\' or simply T0=1 when using synchronous reset).\n- T1: Toggles when Q0=1 unless Q2=1 -> T1 = Q2\' · Q0.\n- T2: Toggles to 1 on state 3 (Q1Q0=11), toggles to 0 on state 5 (Q0=1) -> T2 = Q1·Q0 + Q2·Q0.',
        explanation: 'When clock pulse 6 arrives at state 101, the counter synchronously transitions back to state 000.',
      },
    ],
    applications: [
      'Digital wristwatches, stopwatch frequency scalers, and timebase generators.',
      'Program Counters (PC) in microprocessors that increment instruction addresses.',
      'Industrial event counters and optical tachometers (measuring motor RPM).',
    ],
    advantages: [
      'Synchronous counters eliminate decoding glitches and operate at dramatically higher clock frequencies than ripple counters.',
    ],
    limitations: [
      'Synchronous counters require wide AND gates for higher-order stages, causing fan-in limitations.',
    ],
    commonMistakes: [
      'Designing a ripple counter with asynchronous clear to reset at count N: the transient count N appears for a few nanoseconds before clearing, producing an electrical glitch spike on the clear line.',
    ],
    examPoints: [
      'A 4-bit Ring counter has 4 states (MOD 4); a 4-bit Johnson counter has 8 states (MOD 8).',
      'In an up-counter using negative-edge triggered flip-flops, connect Q to the clock of the next stage.',
    ],
    vivaQuestions: [
      {
        question: 'What is a "lockout" state in an arbitrary MOD counter, and how is it prevented?',
        answer: 'Lockout occurs if noise pushes the counter into an unused state (e.g. states 6 or 7 in a MOD-6 counter) and the next-state logic circulates endlessly within those unused states without ever returning to the main counting cycle. It is prevented by designing next-state logic to force all unused states back to state 0 (self-starting counter).',
      },
    ],
    relatedTopicSlugs: ['sr-jk-flip-flops', 'shift-registers'],
  },
];
