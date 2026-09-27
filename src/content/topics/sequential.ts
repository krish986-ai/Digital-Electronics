import { TopicItem } from '../../types';

export const SEQUENTIAL_TOPICS: TopicItem[] = [
  {
    id: 't_latches_flipflops',
    slug: 'sr-jk-flip-flops',
    unitId: 'sequential',
    unitTitle: 'Sequential Logic & Flip-Flops',
    unitNumber: 5,
    chapterNumber: 1,
    title: 'Latches vs. Flip-Flops: SR, JK & Race-Around Elimination',
    shortDescription: 'Bistable multivibrators, level vs edge triggering, SR invalid state, JK toggle mode, race-around condition, and Master-Slave JK architecture.',
    estimatedMinutes: 30,
    difficulty: 'Intermediate',
    tags: ['SR Latch', 'JK Flip-Flop', 'Race-Around', 'Master-Slave', 'Excitation Table'],
    overview: 'Unlike combinational circuits whose outputs depend solely on present inputs, sequential circuits possess internal memory: their present output depends on both present inputs and past history (stored internal state). The fundamental 1-bit memory cell is the bistable multivibrator. While latches are level-sensitive (transparent whenever clock is high), flip-flops are edge-triggered, sampling inputs strictly during instantaneous rising or falling clock transitions.',
    learningObjectives: [
      'Contrast combinational vs sequential circuits, and latches vs edge-triggered flip-flops.',
      'Explain the operation of SR latches and why S=1, R=1 produces an invalid/indeterminate state.',
      'Analyze the JK flip-flop toggle state and the physics of the race-around condition.',
      'Examine how the Master-Slave JK architecture completely eliminates race-around.',
      'Construct characteristic tables, excitation tables, and characteristic equations.',
    ],
    prerequisites: ['Combinational logic and standard logic gates.'],
    beginnerExplanation: 'Combinational logic is like a simple calculator: type 2 + 2 and it instantly shows 4; it doesn\'t remember what you typed 5 minutes ago. Sequential logic is like a stopwatch: it has memory! It remembers the elapsed seconds even when you release the start button. The simplest memory cell is two inverters connected in a circle: whatever number is inside circles forever! In an SR latch: S stands for SET (forces output to 1), and R stands for RESET (forces output to 0). In a JK flip-flop, J acts like Set and K acts like Reset, but if you turn BOTH on at the same time, it magically TOGGLES (flips between 0 and 1)!',
    deepTechnicalExplanation: 'SR Latch with NOR gates:\n- S=0, R=0: No Change (Q_{next} = Q)\n- S=0, R=1: Reset (Q_{next} = 0)\n- S=1, R=0: Set (Q_{next} = 1)\n- S=1, R=1: FORBIDDEN / INVALID. Both Q and Q\' are forced to 0, violating the fundamental invariant Q\' = NOT(Q). When inputs return to 00 simultaneously, circuit enters an unpredictable race condition.\n\nJK Flip-Flop Innovation: Replaces forbidden state by routing feedback Q\' back to the J gate and Q back to the K gate. When J=1, K=1, Q_{next} = Q\' (Toggle mode).\n\nThe Race-Around Condition:\nIn a level-triggered JK flip-flop, if clock pulse duration t_p > t_pd (propagation delay of the flip-flop), the newly toggled output feeds back to inputs while the clock is still HIGH. The flip-flop toggles back and forth uncontrollably during the single clock pulse, leaving the final state indeterminate when clock drops LOW!\n\nSolution — Master-Slave JK Flip-Flop:\nConsists of two separate flip-flops: a Master clocked by CLK, and a Slave clocked by inverted CLK (CLK\'). When CLK is HIGH, Master samples inputs while Slave is isolated. On the falling edge of CLK, Master is isolated and transfers its state to Slave. Output cannot feedback into Master while Slave updates, completely eliminating race-around.',
    technicalDefinition: 'A feedback-coupled bistable digital circuit capable of storing one binary digit of state, synchronized by an edge-sensitive clock trigger.',
    workingPrinciple: 'Cross-coupled feedback introduces a regenerative loop where output gain > 1, forcing circuit into one of two stable saturation states (Q=1, Q\'=0 or Q=0, Q\'=1).',
    diagrams: [
      {
        id: 'diag_jk_master_slave',
        title: 'Master-Slave JK Flip-Flop Architecture & Feedback Paths',
        type: 'schematic',
        caption: 'Circuit schematic illustrating how the master stage (clocked by CLK) and slave stage (clocked by inverted CLK) completely prevent race-around.',
        svgType: 'SR_AND_JK_MASTER_SLAVE',
      },
    ],
    lectureSections: [
      {
        id: 'sec_sr_physics_forbidden',
        title: 'Module 1: The Physics of Bistable Memory: Cross-Coupled NOR/NAND Latches & The Forbidden State',
        subtitle: 'Regenerative Gain, Metastable Traps and Invariant Violations (Q = Q\' = 0)',
        content: 'Combinational circuits are memoryless because their signal graph is strictly acyclic: outputs depend exclusively on present inputs. Introducing cross-coupled feedback introduces a regenerative loop where output gain A_v > 1. This positive feedback destabilizes the intermediate threshold voltage and forces the circuit into one of two permanent, saturated rails: State 1 (Q=1, Q\'=0) or State 0 (Q=0, Q\'=1).\n\nIn a standard NOR-based SR latch:\n• S=0, R=0: No Change (Hold previous state).\n• S=1, R=0: Set (Q forces to 1, Q\' forces to 0).\n• S=0, R=1: Reset (Q forces to 0, Q\' forces to 1).\n• S=1, R=1: FORBIDDEN / INVALID STATE. When both S=1 and R=1, both NOR gates force their outputs to 0 simultaneously! This violates the fundamental complementary invariant Q\' = NOT(Q). Even worse, when S and R return to 0 at the exact same instant, microscopic differences in gate delays and silicon noise cause the latch to oscillate wildly or resolve non-deterministically into a random state (a critical hardware race hazard).',
        formula: 'Q_{next} = S + R\' \\cdot Q \\quad (\\text{with constraint } S \\cdot R = 0)',
        keyPoints: [
          'Cross-coupling introduces positive feedback that latches binary state indefinitely.',
          'In a NOR SR latch, S=1 sets Q=1; R=1 resets Q=0; S=R=0 holds previous state.',
          'S=R=1 is strictly forbidden because both outputs become 0 and simultaneous release induces race conditions.',
        ],
        callout: {
          type: 'theorem',
          title: 'The Regenerative Loop Criterion',
          text: 'A bistable multivibrator requires a closed-loop small-signal voltage gain A_v > 1 at the midpoint voltage V_M. This positive feedback forces any microscopic thermal noise fluctuation to avalanche into a permanent saturated rail state.',
        },
      },
      {
        id: 'sec_jk_race_around',
        title: 'Module 2: The JK Flip-Flop Toggle State & The Race-Around Glitch Physics',
        subtitle: 'Feedback Inversion, Clock Pulse Width Constraints & Pulse-Triggered Hazards',
        content: 'The JK flip-flop eliminates the SR latch’s forbidden state by feeding the outputs back to the input gating AND gates: input J is gated with output Q\', and input K is gated with output Q. When J=1 and K=1, the circuit toggles its output state on every clock pulse: Q_{next} = Q\'.\n\nHowever, in a level-triggered JK flip-flop, a severe hardware anomaly occurs: the Race-Around Condition.\nIf the clock pulse duration t_p exceeds the gate propagation delay t_pd of the flip-flop (t_p > t_pd), the newly toggled output feeds back into the input AND gates while the clock is still HIGH! The circuit toggles again, and again, oscillating back and forth (1 -> 0 -> 1 -> 0...) like an astable multivibrator for the entire duration of the clock pulse. When the clock pulse finally falls LOW, the trapped output state is completely random and unpredictable!\n\nMathematical condition for race-around:\nt_p > t_{pd}.\nTo eliminate race-around, either clock pulse width must be nanosecond-short (impractical across temperature), or edge-triggered Master-Slave architectures must be employed.',
        formula: 'Q_{next} = J \\cdot Q\' + K\' \\cdot Q, \\quad \\text{Race-Around Hazard Condition: } t_p > t_{pd}',
        keyPoints: [
          'JK characteristic equation: Q_{next} = J Q\' + K\' Q.',
          'Toggle mode (J=1, K=1) is the physical basis of binary frequency division and digital counting.',
          'Race-around condition occurs strictly in level-triggered flip-flops when clock pulse duration t_p exceeds internal delay t_pd.',
        ],
        callout: {
          type: 'warning',
          title: 'The Level-Triggered Race Condition Trap',
          text: 'Never use level-triggered JK latches for toggle counting! If the clock remains HIGH for even 10 ns and gate delay is 2 ns, the latch will oscillate 5 times within a single clock cycle, corrupting the system state.',
        },
      },
      {
        id: 'sec_master_slave_jk',
        title: 'Module 3: The Master-Slave JK Architecture & Dual-Rank Clock Isolation',
        subtitle: 'Inverted Clock Steering, Two-Stage Isolation & Elimination of Race-Around',
        content: 'The Master-Slave JK flip-flop completely solves race-around by decoupling input sampling from output assertion using two separate latches clocked in complementary anti-phase:\n\n1. Master Stage: Clocked directly by the positive clock signal CLK.\n2. Slave Stage: Clocked by inverted clock /CLK (via an internal inverter).\n\nTwo-Phase Cycle Execution:\n• Phase 1 (CLK = 1, /CLK = 0): The Master latch is active and samples inputs J and K. The Slave latch is completely disabled and holds the external output pins Q and Q\' stable. Because the Slave is disabled, changes inside the Master CANNOT reach the external outputs, making feedback into the Master inputs physically impossible!\n• Phase 2 (CLK = 0, /CLK = 1): On the falling edge of CLK, the Master is disabled, locking out any further changes on the J and K pins. Simultaneously, the Slave is enabled, copying the Master\'s stored state onto external pins Q and Q\'.\n\nBecause the Master is isolated before the Slave updates, the output can NEVER race back into the inputs during the same clock cycle, guaranteeing glitch-free toggle operation regardless of how long the clock pulse remains HIGH.',
        formula: '\\text{Master State: } Y(t) = f(J, K, Q_{slave}), \\quad \\text{Slave Output: } Q(t+\\Delta) = Y(t) \\quad [\\text{on } \\text{CLK}\\downarrow]',
        keyPoints: [
          'Master samples inputs when CLK is HIGH; Slave transfers data to output when CLK falls LOW.',
          'At no instant in time are both Master and Slave transparent simultaneously.',
          'Eliminates race-around completely regardless of clock pulse width.',
          'Modern synchronous VLSI prefers edge-triggered D flip-flops with internal transmission gate feedback.',
        ],
        callout: {
          type: 'tip',
          title: 'The Master-Slave 1s Catching Phenomenon',
          text: 'In classic Master-Slave JK flip-flops, if a momentary noise spike occurs on J or K while CLK is HIGH, the Master latches that "1" (called 1s catching) and cannot discard it until the clock cycle ends. Modern designs eliminate this by using dynamic edge-triggered architectures.',
        },
      },
    ],
    truthTable: {
      headers: ['Clock', 'J', 'K', 'Q_{n+1} (Next State)', 'Operation Mode'],
      rows: [
        ['↑', 0, 0, 'Q_n', 'No Change (Hold)'],
        ['↑', 0, 1, 0, 'Reset'],
        ['↑', 1, 0, 1, 'Set'],
        ['↑', 1, 1, "Q_n'", 'Toggle (Invert)'],
      ],
      notes: 'Excitation Table: 0->0 (J=0, K=X); 0->1 (J=1, K=X); 1->0 (J=X, K=1); 1->1 (J=X, K=0).',
    },
    mathematicalExplanation: {
      equations: [
        "Q_{next} = J \\cdot Q' + K' \\cdot Q \\quad (\\text{JK Characteristic Equation})",
        "Q_{next} = S + R' \\cdot Q \\quad (\\text{with constraint } S \\cdot R = 0)",
        't_p < t_{pd} \\quad (\\text{Condition to prevent race-around in level trigger})',
      ],
    },
    solvedProblems: [
      {
        question: 'Determine the output Q of an edge-triggered JK flip-flop initially at Q=0 across 4 clock pulses if J=1, K=0 on pulse 1; J=0, K=1 on pulse 2; J=1, K=1 on pulse 3; J=1, K=1 on pulse 4.',
        solution: 'Initial: Q=0.\n- Pulse 1 (J=1, K=0): Set -> Q = 1.\n- Pulse 2 (J=0, K=1): Reset -> Q = 0.\n- Pulse 3 (J=1, K=1): Toggle -> Q = 1.\n- Pulse 4 (J=1, K=1): Toggle -> Q = 0.\nFinal sequence of states: 0 -> 1 -> 0 -> 1 -> 0.',
        explanation: 'Each active clock rising edge evaluates the instantaneous values of J and K.',
      },
    ],
    applications: [
      'Binary counters and frequency dividers (dividing clock frequency by 2 in toggle mode).',
      'Hardware state machines in controllers and CPU instruction decoders.',
    ],
    advantages: [
      'Eliminates the forbidden input dilemma of SR latches.',
      'Toggle mode provides effortless divide-by-2 frequency scaling.',
    ],
    limitations: [
      'Requires dual-latch master-slave layout or complex edge-detector pulse circuits, consuming roughly double the transistors of a simple latch.',
    ],
    commonMistakes: [
      'Confusing level-triggered latches with edge-triggered flip-flops: latches change whenever clock is 1; flip-flops change ONLY at the exact nanosecond of the rising (or falling) edge.',
    ],
    examPoints: [
      'JK Characteristic equation is Q_{n+1} = J Q\' + K\' Q.',
      'Race-around condition occurs when J=1, K=1, and clock pulse width t_p > t_pd.',
      'Master-Slave flip-flop is pulse-triggered / edge-triggered to prevent race-around.',
    ],
    vivaQuestions: [
      {
        question: 'What is the physical cause of the race-around condition, and name 3 distinct engineering methods to eliminate it.',
        answer: 'Cause: In level-triggered JK when J=K=1, clock duration t_p exceeds propagation delay t_pd, so toggled output feeds back while clock remains active. Three solutions: (1) Use edge-triggered flip-flops (narrow transition window < t_pd), (2) Master-Slave flip-flop topology, and (3) Introduce propagation delay line such that t_pd > t_p.',
      },
    ],
    relatedTopicSlugs: ['d-and-t-flip-flops', 'counter-circuits'],
  },
  {
    id: 't_d_t_flipflops',
    slug: 'd-and-t-flip-flops',
    unitId: 'sequential',
    unitTitle: 'Sequential Logic & Flip-Flops',
    unitNumber: 5,
    chapterNumber: 2,
    title: 'D (Data/Delay) and T (Toggle) Flip-Flops & Timing Parameters',
    shortDescription: 'D flip-flop transparent latch vs edge register, T flip-flop frequency division, setup time, hold time, and metastability.',
    estimatedMinutes: 25,
    difficulty: 'Intermediate',
    tags: ['D Flip-Flop', 'T Flip-Flop', 'Setup Time', 'Hold Time', 'Metastability'],
    overview: 'The D (Data or Delay) flip-flop is the undisputed workhorse of modern synchronous digital systems and microprocessors. It captures the value of the D input at the active clock edge and holds it until the next clock cycle. The T (Toggle) flip-flop toggles its state whenever T=1 on a clock tick, making it the fundamental atom of digital binary counters. This topic also demystifies the critical timing parameters: Setup Time (t_su), Hold Time (t_h), and Metastability.',
    learningObjectives: [
      'Construct a D flip-flop from an SR or JK flip-flop.',
      'Construct a T flip-flop from a JK or D flip-flop.',
      'Define Setup Time, Hold Time, and clock-to-Q propagation delay.',
      'Explain the physical mechanism of metastability and how multi-stage synchronizers resolve it.',
    ],
    prerequisites: ['SR and JK flip-flops.'],
    beginnerExplanation: 'A D flip-flop is like taking a snapshot with a camera. The "D" wire has continuous data moving on it. The moment you press the shutter (the Clock Rising Edge), the flip-flop takes a picture of whatever was on D (0 or 1) and displays it on Q. It ignores everything on D until the next clock photo! A T flip-flop is like a push-button flashlight: if T=0, pressing the clock does nothing (stays in its current state). If T=1, every single clock tap flips the light: ON -> OFF -> ON -> OFF.',
    deepTechnicalExplanation: 'D Flip-Flop:\nFormed by taking an SR flip-flop and connecting S = D and R = D\' (via an inverter). This ensures S and R can never be 1 at the same time, completely eliminating the invalid state. Characteristic equation: Q_{next} = D.\n\nT Flip-Flop:\nFormed by tying the J and K inputs of a JK flip-flop together (J = K = T). When T=0, Q_{next} = Q (Hold). When T=1, Q_{next} = Q\' (Toggle). Characteristic equation: Q_{next} = T ⊕ Q.\n\nTiming Violations and Metastability:\n- Setup Time (t_su): Data must be stable BEFORE clock edge.\n- Hold Time (t_h): Data must remain stable AFTER clock edge.\nIf an asynchronous signal violates t_su or t_h, the internal regenerative cross-coupled transistors receive insufficient charge, settling at a quasi-stable intermediate voltage between 0 and 1. The output can oscillate or stay indeterminate for an unbounded time before resolving randomly. Two-stage flip-flop synchronizers are used to reduce mean time between failures (MTBF).',
    technicalDefinition: 'A clock-synchronized 1-bit memory device where the next state is identically equal to the input literal D, functioning as an ideal unit-cycle delay element Z^{-1}.',
    workingPrinciple: 'D flip-flop transfer function: Q(k+1) = D(k). T flip-flop transfer function: Q(k+1) = T(k) ⊕ Q(k).',
    diagrams: [
      {
        id: 'diag_dff_timing',
        title: 'Edge-Triggered D Flip-Flop: Setup Time, Hold Time & Propagation Delay',
        type: 'waveform',
        caption: 'Detailed timing diagram showing the critical trigger edge, setup aperture t_setup, hold window t_hold, and clock-to-Q delay t_c→q.',
        svgType: 'D_FLIP_FLOP_TIMING',
      },
    ],
    lectureSections: [
      {
        id: 'sec_dff_pipeline_unit_delay',
        title: 'Module 1: The D Flip-Flop Workhorse: Transmission Gate Registers & Unit Delays',
        subtitle: 'Transparent Latches vs Edge-Triggered Registers in Pipeline Computing',
        content: 'The D (Data or Delay) flip-flop is the universal storage element in modern CPUs. It stores the input literal D at the active clock edge and holds it until the next cycle: Q_{next} = D. In CMOS standard cell libraries, edge-triggered D flip-flops are constructed using two transmission-gate latches in a Master-Slave configuration:\n• Positive Edge-Triggered DFF: When CLK is LOW, the Master transmission gate is open, allowing D to enter the Master latch. When CLK transitions from LOW to HIGH, the Master closes (trapping D) and the Slave opens, transferring the stored bit to output Q.\n\nIn digital signal processing (DSP) and CPU pipelines, a D flip-flop represents the z-domain unit delay operator z^{-1}, synchronizing pipeline stages (Fetch, Decode, Execute, Memory, Writeback).',
        formula: 'Q_{next} = D, \\quad H(z) = z^{-1} \\quad (\\text{Unit-Cycle Register Delay})',
        keyPoints: [
          'D flip-flop eliminates the invalid state of SR latches by setting S=D and R=D\'.',
          'Transparent latch (D Latch) is level-sensitive: output follows D while clock is HIGH.',
          'Edge-triggered D Flip-Flop updates only during the sub-nanosecond clock edge transition.',
          'Underpins register files, pipelining, cache arrays, and GPU streaming processors.',
        ],
        callout: {
          type: 'theorem',
          title: 'The D-Type Pipeline Invariant',
          text: 'In a synchronous pipeline running at clock frequency f_clk, a D flip-flop isolates combinational logic clouds, guaranteeing that combinational propagation delays from stage k cannot propagate into stage k+1 within the same clock period.',
        },
      },
      {
        id: 'sec_tff_frequency_divider',
        title: 'Module 2: The T Flip-Flop & Binary Frequency Division',
        subtitle: 'Modulo-2 Toggling, Rippling Dividers & High-Speed Clocks',
        content: 'The T (Toggle) flip-flop is formed by tying the J and K inputs of a JK flip-flop together (J=K=T) or connecting D = T ⊕ Q on a D flip-flop.\n• When T = 0: Q_{next} = Q (Hold state).\n• When T = 1: Q_{next} = Q\' (Toggle state).\n\nIf T is permanently tied to Logic 1, the flip-flop toggles its output state on every single active clock edge. Since one complete output cycle (HIGH and LOW) requires two incoming clock cycles, the output frequency is exactly half the clock frequency: f_{out} = f_{clk} / 2! Cascading n T flip-flops divides the frequency by 2^n, forming the foundation of digital quartz watches, timer peripherals, and baud rate generators.',
        formula: 'Q_{next} = T \\oplus Q = T Q\' + T\' Q, \\quad f_{out} = \\frac{f_{clk}}{2} \\quad (\\text{for } T=1)',
        keyPoints: [
          'T characteristic equation: Q_{next} = T ⊕ Q.',
          'When T=1, output frequency is exactly half the input clock frequency with 50% duty cycle.',
          'Cascading n T flip-flops divides frequency by 2^n: f_n = f_clk / 2^n.',
        ],
        callout: {
          type: 'tip',
          title: '50% Duty Cycle Restoration',
          text: 'Even if an incoming clock source has an irregular, asymmetrical duty cycle (e.g. 20% HIGH / 80% LOW), passing it through a T flip-flop configured in toggle mode (T=1) produces an output clock that is mathematically guaranteed to have an exact 50.0% duty cycle!',
        },
      },
      {
        id: 'sec_setup_hold_metastability',
        title: 'Module 3: Setup Time (t_su), Hold Time (t_h) & The Physics of Metastability',
        subtitle: 'The Timing Aperture, MTBF Exponential Scaling & Multi-Stage Synchronizers',
        content: 'In physical semiconductor circuits, transistors require a finite time to transfer charge and settle internal nodes. Every edge-triggered flip-flop requires a critical timing aperture around the clock edge:\n1. Setup Time (t_su): The minimum time the data input D must remain stable BEFORE the active clock edge.\n2. Hold Time (t_h): The minimum time the data input D must remain stable AFTER the active clock edge.\n3. Clock-to-Q Delay (t_cq): The time required for output Q to settle after the clock edge.\n\nIf an asynchronous signal transitions inside the setup/hold aperture (t_su + t_h), the internal cross-coupled inverters receive an incomplete charge packet, balancing precariously at the metastable midpoint voltage V_M. The output can hover in the forbidden indeterminate zone or oscillate wildly for an unpredictable duration before settling randomly to 0 or 1!\n\nTo safely interface asynchronous inputs (like pushbuttons or cross-clock-domain FIFO pointers), engineers implement Two-Stage (Dual-Rank) D Flip-Flop Synchronizers, dramatically multiplying the Mean Time Between Failures (MTBF).',
        formula: '\\text{MTBF} = \\frac{e^{\\frac{t_{settle} - t_{su}}{\\tau}}}{T_0 \\cdot f_{clk} \\cdot f_{data}}, \\quad f_{max} \\le \\frac{1}{t_{cq} + t_{comb,max} + t_{su}}',
        keyPoints: [
          'Setup/hold violations force flip-flops into metastability where settling time is theoretically unbounded.',
          'Maximum system clock frequency is strictly governed by: T_clk ≥ t_cq + t_comb + t_su.',
          'Two-stage synchronizers increase MTBF from seconds to thousands of years.',
        ],
        callout: {
          type: 'warning',
          title: 'The Asynchronous Cross-Clock Domain Trap',
          text: 'Never route a signal generated in one clock domain directly into combinational logic clocked by a different asynchronous clock domain! Always pass the signal through a two-stage D flip-flop synchronizer first to extinguish metastability before decoding.',
        },
      },
    ],
    truthTable: {
      headers: ['Clock', 'D', 'Q_{n+1}'],
      rows: [
        ['↑', 0, 0],
        ['↑', 1, 1],
      ],
      notes: 'T Flip-Flop: Clock ↑, T=0 -> Q_n; Clock ↑, T=1 -> Q_n\'.',
    },
    mathematicalExplanation: {
      equations: [
        'Q_{next} = D \\quad (\\text{D Characteristic Equation})',
        'Q_{next} = T \\oplus Q = T Q\' + T\' Q \\quad (\\text{T Characteristic Equation})',
        '\\text{MTBF} = \\frac{e^{t_r / \\tau}}{T_0 \\cdot f_{clk} \\cdot f_{data}}',
      ],
    },
    solvedProblems: [
      {
        question: 'Design a T flip-flop using a D flip-flop and external logic gates.',
        solution: 'From characteristic equations: For T flip-flop, Q_{next} = T ⊕ Q. For D flip-flop, Q_{next} = D. Therefore, set D = T ⊕ Q. Connect an XOR gate with inputs T and current output Q, and feed the XOR output into the D input of the flip-flop!',
        explanation: 'This is the standard conversion of a D flip-flop into a T flip-flop.',
      },
    ],
    applications: [
      'Pipeline registers in CPU pipelines (IF, ID, EX, MEM, WB stages).',
      'Shift registers, register files, and cache memory cells.',
      'Clock frequency division (connecting Q\' to D divides clock frequency by 2).',
    ],
    advantages: [
      'Simple single-data-line interface; ideal for routing buses on silicon.',
      'No indeterminate or forbidden input conditions.',
    ],
    limitations: [
      'Susceptible to metastability if asynchronous inputs are sampled without dual-rank synchronizers.',
    ],
    commonMistakes: [
      'Assuming that a flip-flop updates instantly on the clock edge: there is always a finite clock-to-Q delay (t_cq), typically 50ps to 2ns.',
    ],
    examPoints: [
      'D characteristic equation: Q_{n+1} = D.',
      'T characteristic equation: Q_{n+1} = T ⊕ Q.',
      'Connecting Q\' back to D creates a divide-by-2 frequency divider.',
    ],
    vivaQuestions: [
      {
        question: 'How do you reliably synchronize an asynchronous pushbutton input into a high-speed FPGA clocked at 100 MHz?',
        answer: 'By passing the pushbutton signal through a two-stage (or three-stage) cascaded D flip-flop synchronizer. The first flip-flop absorbs any metastability, allowing its output a full 10ns clock cycle to settle before the second flip-flop samples a clean digital 1 or 0.',
      },
    ],
    relatedTopicSlugs: ['sr-jk-flip-flops', 'counter-circuits'],
  },
];
